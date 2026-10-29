import express from 'express';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { GoogleGenAI, Type } from '@google/genai';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = Number(process.env.PORT) || 3000;

app.use(express.json());

// Initialize Google GenAI
const apiKey = process.env.GEMINI_API_KEY || '';
const ai = new GoogleGenAI({
  apiKey: apiKey,
  httpOptions: {
    headers: {
      'User-Agent': 'aistudio-build',
    },
  },
});

// Import serverAuth handlers
import {
  registerUser,
  authenticateUser,
  getUserByToken,
  updateUserProfile,
  resetUserPassword,
  deleteUserAccount,
  revokeToken,
} from './serverAuth.ts';

// Middleware to extract token
function authMiddleware(req: express.Request, res: express.Response, next: express.NextFunction) {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    res.status(401).json({ error: 'Authentication required' });
    return;
  }
  const token = authHeader.split(' ')[1];
  const user = getUserByToken(token);
  if (!user) {
    res.status(401).json({ error: 'Invalid or expired session. Please log in again.' });
    return;
  }
  (req as any).user = user;
  (req as any).token = token;
  next();
}

// Auth Endpoints
app.post('/api/auth/signup', (req, res) => {
  try {
    const { emailOrPhone, password, fullName, consentGiven, profileConsent } = req.body;
    if (!emailOrPhone || !password || !fullName) {
      res.status(400).json({ error: 'Full name, email/phone, and password are required.' });
      return;
    }
    if (password.length < 6) {
      res.status(400).json({ error: 'Password must be at least 6 characters long.' });
      return;
    }
    const hasConsent = Boolean(consentGiven || profileConsent);
    if (!hasConsent) {
      res.status(400).json({ error: 'Consent is required to store sensitive medical profile information.' });
      return;
    }

    const { user, token } = registerUser({ ...req.body, consentGiven: true });
    res.json({ success: true, user, token });
  } catch (err: any) {
    res.status(400).json({ error: err.message || 'Registration failed.' });
  }
});

app.post('/api/auth/login', (req, res) => {
  try {
    const { emailOrPhone, password } = req.body;
    if (!emailOrPhone || !password) {
      res.status(400).json({ error: 'Email/phone and password are required.' });
      return;
    }
    const { user, token } = authenticateUser(emailOrPhone, password);
    res.json({ success: true, user, token });
  } catch (err: any) {
    res.status(401).json({ error: err.message || 'Login failed.' });
  }
});

app.get('/api/auth/me', authMiddleware, (req, res) => {
  res.json({ success: true, user: (req as any).user });
});

app.put('/api/auth/profile', authMiddleware, (req, res) => {
  try {
    const user = (req as any).user;
    const updated = updateUserProfile(user.id, req.body);
    res.json({ success: true, user: updated, message: 'Profile updated successfully.' });
  } catch (err: any) {
    res.status(400).json({ error: err.message || 'Failed to update profile.' });
  }
});

app.post('/api/auth/forgot-password', (req, res) => {
  try {
    const { emailOrPhone, newPassword } = req.body;
    if (!emailOrPhone || !newPassword) {
      res.status(400).json({ error: 'Email/phone and new password are required.' });
      return;
    }
    if (newPassword.length < 6) {
      res.status(400).json({ error: 'New password must be at least 6 characters.' });
      return;
    }
    resetUserPassword(emailOrPhone, newPassword);
    res.json({ success: true, message: 'Password reset successfully. Please log in with your new password.' });
  } catch (err: any) {
    res.status(400).json({ error: err.message || 'Password reset failed.' });
  }
});

app.post('/api/auth/logout', authMiddleware, (req, res) => {
  revokeToken((req as any).token);
  res.json({ success: true, message: 'Logged out successfully.' });
});

app.delete('/api/auth/delete-account', authMiddleware, (req, res) => {
  try {
    const user = (req as any).user;
    deleteUserAccount(user.id);
    res.json({ success: true, message: 'Your account and all associated medical records have been permanently deleted.' });
  } catch (err: any) {
    res.status(500).json({ error: err.message || 'Failed to delete account.' });
  }
});

// Helper for reverse geocoding to human-readable address
app.get('/api/geocode', async (req, res) => {
  const { lat, lng } = req.query;
  if (!lat || !lng) {
    res.status(400).json({ error: 'lat and lng parameters are required' });
    return;
  }

  try {
    const response = await fetch(
      `https://nominatim.openstreetmap.org/reverse?format=json&lat=${encodeURIComponent(
        String(lat)
      )}&lon=${encodeURIComponent(String(lng))}&zoom=18&addressdetails=1`,
      {
        headers: {
          'User-Agent': 'SwasthSeva-Emergency-App/1.0',
        },
      }
    );
    if (!response.ok) {
      throw new Error('Geocoding service unavailable');
    }
    const data = await response.json();
    res.json({
      displayName: data.display_name || `Lat: ${lat}, Lng: ${lng}`,
      address: data.address || {},
    });
  } catch (err: any) {
    res.json({
      displayName: `Coordinates: ${Number(lat).toFixed(5)}, ${Number(lng).toFixed(5)}`,
      address: {},
    });
  }
});

// Fallback rule-based triage when Gemini API is unavailable or times out
function generateFallbackTriage(symptoms: string, preferredLang: string = 'auto') {
  const lower = symptoms.toLowerCase();
  const isHindiOrHinglish =
    preferredLang === 'hindi' ||
    preferredLang === 'hinglish' ||
    /dard|chhati|khoon|saans|bukhar|ulti|beh|chot|chhot|jalan|chakkar|gira|sar|sir|kutte|saanp|jal/i.test(symptoms);

  // Check critical red flags
  const isCritical =
    lower.includes('chest') ||
    lower.includes('heart') ||
    lower.includes('chhati') ||
    lower.includes('snake') ||
    lower.includes('saanp') ||
    lower.includes('breath') ||
    lower.includes('saans') ||
    lower.includes('unconscious') ||
    lower.includes('behosh') ||
    lower.includes('severe bleed') ||
    lower.includes('stroke') ||
    lower.includes('poison') ||
    lower.includes('choking') ||
    lower.includes('electric');

  const isModerate =
    lower.includes('burn') ||
    lower.includes('jal') ||
    lower.includes('cut') ||
    lower.includes('dog') ||
    lower.includes('kutta') ||
    lower.includes('fracture') ||
    lower.includes('sprain') ||
    lower.includes('vomit') ||
    lower.includes('ulti') ||
    lower.includes('fever') ||
    lower.includes('bukhar');

  if (isCritical) {
    return {
      urgency: 'RED',
      urgencyLevelLabel: isHindiOrHinglish
        ? 'Critical Emergency (तुरंत 112 / 108 पर कॉल करें)'
        : 'Critical Emergency - Call 112 / 108 Now',
      detectedLanguage: isHindiOrHinglish ? 'Hinglish' : 'English',
      triageSummary: isHindiOrHinglish
        ? 'यह एक गंभीर आपातकालीन स्थिति (Red Flag) हो सकती है। बिना देरी किए नजदीकी अस्पताल के इमरजेंसी विभाग से संपर्क करें।'
        : 'Potential life-threatening medical emergency detected. Immediate emergency medical intervention is required.',
      immediateSteps: isHindiOrHinglish
        ? [
            '1. तुरंत 112 या 108 पर कॉल करके एम्बुलेंस बुलाएं।',
            '2. मरीज को शांत रखें, सीधे बैठने दें (W-पोजीशन) और तंग कपड़े ढीले करें।',
            '3. मरीज को अकेला न छोड़ें और श्वसन (breathing) पर नजर रखें।',
            '4. अगर सांस रुक जाए तो तुरंत हैंड्स-ओनली CPR (छाती पर 100-120/min दबाव) शुरू करें।',
          ]
        : [
            '1. Immediately call National Emergency 112 or Ambulance 108.',
            '2. Keep patient calm, seated comfortably semi-upright, and loosen restrictive collars.',
            '3. Never leave patient unattended; monitor pulse and consciousness.',
            '4. If patient becomes unresponsive or stops breathing, start continuous Hands-Only CPR immediately.',
          ],
      whatToAvoid: isHindiOrHinglish
        ? [
            'मरीज को चलने या भारी श्रम न करने दें।',
            'बेहोशी की हालत में पानी या भोजन मुंह में न डालें।',
            'खुद गाड़ी चलाकर अस्पताल जाने की कोशिश न करें; एम्बुलेंस का उपयोग करें।',
          ]
        : [
            'Do not allow patient to exert themselves or walk.',
            'Do not administer oral fluids or solid food if drowsy or unconscious.',
            'Do not attempt to drive yourself to the ER; wait for emergency paramedics.',
          ],
      emergencyAction: isHindiOrHinglish
        ? 'तुरंत 112 या 108 डायल करें या नजदीकी ट्रॉमा सेंटर पहुंचें।'
        : 'Call 112 or 108 immediately or transport via ambulance to nearest trauma ICU.',
      suggestedMedicinesOrRemedies: ['Chew Aspirin 300mg if suspected heart attack (unless allergic)'],
      isLifeThreatening: true,
    };
  }

  if (isModerate) {
    return {
      urgency: 'YELLOW',
      urgencyLevelLabel: isHindiOrHinglish
        ? 'Urgent Medical Attention (शीघ्र डॉक्टर से संपर्क करें)'
        : 'Urgent Attention Needed',
      detectedLanguage: isHindiOrHinglish ? 'Hinglish' : 'English',
      triageSummary: isHindiOrHinglish
        ? 'स्थिति गंभीर हो सकती है। प्राथमिक उपचार करें और 2-4 घंटे के अंदर क्लिनिक या डॉक्टर को दिखाएं।'
        : 'Condition requires prompt clinical medical attention and active first-aid management.',
      immediateSteps: isHindiOrHinglish
        ? [
            '1. प्रभावित अंग को साफ पानी से धीरे-धीरे धोएं (जलन या कटने पर)।',
            '2. घाव पर साफ रोगाणुरहित पट्टी (sterile gauze) से हल्का दबाव दें।',
            '3. डिहाइड्रेशन होने पर घूंट-घूंट करके ORS इलेक्ट्रोलाइट घोल पिएं।',
            '4. नजदीकी स्वास्थ्य केंद्र (PHC/CHC) या डॉक्टर से परामर्श लें।',
          ]
        : [
            '1. Gently flush wound or burn under clean running tap water for 10-15 minutes.',
            '2. Apply firm direct pressure with clean sterile dressing to arrest bleeding.',
            '3. Sip WHO-formula ORS solution slowly to prevent fluid deficit.',
            '4. Visit nearest clinic or emergency room for professional suturing, vaccination, or treatment.',
          ],
      whatToAvoid: isHindiOrHinglish
        ? [
            'जले हुए स्थान पर टूथपेस्ट, तेल या मक्खन न लगाएं।',
            'घाव को गंदे कपड़े या सीधे बर्फ से न छुएं।',
          ]
        : [
            'Do not apply toothpaste, turmeric, or butter to burns.',
            'Do not use ice directly on broken skin or burns.',
          ],
      emergencyAction: isHindiOrHinglish
        ? 'प्राथमिक उपचार के बाद डॉक्टर को दिखाएं।'
        : 'Apply first aid and visit an urgent care clinic.',
      suggestedMedicinesOrRemedies: ['Paracetamol 500mg for pain/fever', 'ORS Electral hydration'],
      isLifeThreatening: false,
    };
  }

  return {
    urgency: 'GREEN',
    urgencyLevelLabel: isHindiOrHinglish
      ? 'Mild / Home First-Aid (घरेलू प्राथमिक उपचार)'
      : 'Mild / Home First-Aid Guidance',
    detectedLanguage: isHindiOrHinglish ? 'Hinglish' : 'English',
    triageSummary: isHindiOrHinglish
      ? 'लक्षण सामान्य लग रहे हैं। प्राथमिक उपचार और आराम से सुधार हो सकता है।'
      : 'Symptoms appear mild and can be safely managed with home first aid and hydration.',
    immediateSteps: isHindiOrHinglish
      ? [
          '1. पर्याप्त आराम करें और दिन में कम से कम 8-10 गिलास पानी पिएं।',
          '2. हल्का और सुपाच्य भोजन (खिचड़ी, फल, दही) लें।',
          '3. 24 घंटे में सुधार न होने पर डॉक्टर से संपर्क करें।',
        ]
      : [
          '1. Rest in a well-ventilated room and drink plenty of fluids.',
          '2. Maintain a light, nutritious diet and avoid spicy/fried items.',
          '3. Seek medical advice if symptoms worsen or fail to improve after 24 hours.',
        ],
    whatToAvoid: isHindiOrHinglish
      ? ['बिना डॉक्टर की सलाह के एंटीबायोटिक्स न लें।']
      : ['Avoid self-medicating with unprescribed antibiotics.'],
    emergencyAction: isHindiOrHinglish
      ? 'घरेलू देखभाल करें; आवश्यकता पड़ने पर डॉक्टर से परामर्श लें।'
      : 'Follow first-aid and rest; consult doctor if symptoms persist.',
    suggestedMedicinesOrRemedies: ['ORS Electral', 'Mild hydration fluids', 'Rest'],
    isLifeThreatening: false,
  };
}

function generateFallbackChatReply(message: string): string {
  const lower = message.toLowerCase();
  const isHindi = /kya|kare|dard|khoon|chot|bukhar|ulti|sir|sar|saanp|kutta|jal|hai|ho|raha/i.test(message);

  if (lower.includes('chest') || lower.includes('heart') || lower.includes('chhati') || lower.includes('attack')) {
    return isHindi
      ? '🚨 आपातकालीन चेतावनी (Chest Pain): यदि सीने में तेज दबाव, दर्द बाएं हाथ या जबड़े में जा रहा है और पसीना आ रहा है, तो तुरंत 112 या 108 पर कॉल करें या ऊपर SOS Emergency बटन दबाएं।\n\nतत्काल कदम:\n1. मरीज को जमीन पर टिका कर semi-sitting (W) स्थिति में बैठाएं।\n2. तंग कपड़े ढीले करें।\n3. यदि एलर्जी नहीं है तो 300mg Dispirin (Aspirin) चबाने को दें।\n4. मरीज को बिल्कुल चलने न दें।'
      : '🚨 Emergency Alert (Chest Pain): If you have crushing chest pressure, pain radiating to arm/jaw, or shortness of breath, immediately call 112 / 108 or activate SOS in SwasthSeva.\n\nImmediate steps:\n1. Sit comfortably in a semi-upright position against a wall.\n2. Loosen all tight clothing.\n3. Chew 300mg Aspirin if available and not allergic.\n4. Keep front door open for paramedics.';
  }

  if (lower.includes('burn') || lower.includes('jal')) {
    return isHindi
      ? '🔥 जलने पर प्राथमिक उपचार (Burns First Aid):\n1. जले हुए हिस्से को नल के सामान्य बहते ठंडे पानी के नीचे 15-20 मिनट तक रखें।\n2. सीधे बर्फ, टूथपेस्ट या तेल कभी न लगाएं।\n3. छाले (blisters) को बिल्कुल न फोड़ें।\n4. साफ स्टेराइल पट्टी या प्लास्टिक क्लिंग फिल्म से ढीला ढकें।\n5. यदि जलन बड़ी है तो तुरंत अस्पताल जाएं।'
      : '🔥 Burns First Aid:\n1. Cool under clean running tap water for 15-20 minutes immediately.\n2. Do NOT apply ice, toothpaste, or butter.\n3. Do NOT puncture or burst blisters.\n4. Cover loosely with sterile gauze or clean plastic wrap.\n5. Seek hospital attention if area is large or on face/hands.';
  }

  if (lower.includes('bleed') || lower.includes('khoon') || lower.includes('kat') || lower.includes('cut')) {
    return isHindi
      ? '🩹 घाव और रक्तस्राव (Bleeding Cut):\n1. साफ कपड़े या पट्टी से घाव पर 5 मिनट लगातार सीधा दबाव (direct pressure) बनाएं।\n2. यदि हाथ या पैर में चोट है तो उसे दिल के स्तर से ऊपर उठा कर रखें।\n3. यदि खून से पट्टी भीग जाए तो उसे हटाएं नहीं, उसके ऊपर दूसरी साफ पट्टी रखें।\n4. यदि गहरा कट है तो 6 घंटे के अंदर टांके (stitches) और TT इंजेक्शन लगवाएं।'
      : '🩹 Bleeding & Wound Care:\n1. Apply continuous firm direct pressure with a clean cloth for 5 minutes.\n2. Elevate the wounded limb above heart level.\n3. If blood seeps through, place another pad on top without removing the first.\n4. Seek doctor for sutures and Tetanus Toxoid (TT) shot if deep.';
  }

  return isHindi
    ? 'नमस्ते! SwasthSeva स्वास्थ्य साथी आपकी मदद के लिए तैयार है।\n\nकृपया अपने लक्षण बताएं (जैसे बुखार, सिरदर्द, पेट दर्द, एलर्जी)। यदि कोई गंभीर आपातकाल है, तो तुरंत ऊपर दिए गए लाल SOS Emergency बटन या 112 / 108 पर संपर्क करें।'
    : 'Hello! I am your SwasthSeva Emergency Health Assistant.\n\nPlease describe your symptoms (e.g. fever, cut, dog bite, allergy, panic). For life-threatening emergencies, please dial 112 / 108 or tap the SOS Emergency button immediately.';
}

// AI Symptom Triage endpoint
app.post('/api/triage', async (req, res) => {
  const {
    symptoms,
    language = 'auto',
    ageGroup,
    existingConditions,
    patientProfile,
    activeContext,
  } = req.body;

  if (!symptoms || typeof symptoms !== 'string' || !symptoms.trim()) {
    res.status(400).json({ error: 'Please describe the symptoms' });
    return;
  }

  if (!apiKey || apiKey === 'MY_GEMINI_API_KEY') {
    // Graceful fallback to rule-based triage if API key is not yet set
    const fallback = generateFallbackTriage(symptoms, language);
    // If patient has allergy, annotate
    if (patientProfile?.allergies?.length) {
      fallback.triageSummary += ` [Profile Alert: Patient has recorded allergies: ${patientProfile.allergies.join(', ')}. Avoid these triggers.]`;
    }
    res.json({ success: true, data: fallback });
    return;
  }

  try {
    const systemInstruction = `You are SwasthSeva's Senior Medical Triage AI assistant in India.
Your job is to analyze symptoms entered by the user in English, Hindi (हिन्दी), Marathi (मराठी), Tamil (தமிழ்), Marwari (मारवाड़ी), or Hinglish, categorize emergency urgency, and provide immediate first-aid steps.

Urgency levels:
- RED (Critical / Life-Threatening): e.g., severe chest pain, stroke symptoms, uncontrolled bleeding, severe burn, snake bite, unconsciousness, severe difficulty breathing, poisoning, anaphylaxis. Require IMMEDIATE call to 112 / 108.
- YELLOW (Urgent / Threatening): e.g., deep cuts needing stitches, high fever with severe chills, persistent vomiting/dehydration, fracture/dislocation, dog bite. Needs prompt medical attention.
- GREEN (Basic / Common Illness): e.g., mild fever, superficial cut, mild headache, indigestion, minor scrape. Manageable with first-aid and home monitoring.

Language instructions:
- Detect the user's language or preferred language (English, Hindi, Marathi, Tamil, Marwari, Hinglish).
- Provide the response in the SAME language the user used or requested.
- Keep instructions extremely clear, structured, and rapid to read during a crisis.
- Always include essential Indian emergency helpline references (112, 108).
- Strictly respect patient profile allergies and chronic conditions!`;

    let profileContextStr = '';
    if (patientProfile) {
      profileContextStr = `
Patient Medical Profile Context:
- Age: ${patientProfile.age || 'Not specified'}
- Gender: ${patientProfile.gender || 'Not specified'}
- Known Allergies: ${patientProfile.allergies?.join(', ') || 'None reported'}
- Chronic Medical Conditions: ${patientProfile.medicalConditions?.join(', ') || 'None reported'}
- Current Medications: ${patientProfile.currentMedications?.join(', ') || 'None'}
SAFETY RULE: Never recommend medicines or remedies that conflict with patient allergies or conditions!`;
    }

    const userPrompt = `Patient Symptoms: ${symptoms}
${activeContext?.diseaseName ? `Current Disease/Condition in Focus: ${activeContext.diseaseName}` : ''}
${profileContextStr}
${ageGroup ? `Age Group: ${ageGroup}` : ''}
${existingConditions?.length ? `Existing conditions: ${existingConditions.join(', ')}` : ''}
${language !== 'auto' ? `Preferred language: ${language}` : ''}

Provide structured emergency triage assessment in JSON matching the schema in the requested language.`;

    const generatePromise = ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: userPrompt,
      config: {
        systemInstruction,
        responseMimeType: 'application/json',
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            urgency: {
              type: Type.STRING,
              description: 'Urgency code: RED, YELLOW, or GREEN',
            },
            urgencyLevelLabel: {
              type: Type.STRING,
              description: 'Readable title for urgency e.g. "Critical (आपातकालीन - तुरंत 112 पर कॉल करें)"',
            },
            detectedLanguage: {
              type: Type.STRING,
              description: 'Language detected: English, Hindi, or Hinglish',
            },
            triageSummary: {
              type: Type.STRING,
              description: 'Brief 1-2 sentence medical triage observation',
            },
            immediateSteps: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
              description: 'Numbered, crystal-clear immediate first-aid steps',
            },
            whatToAvoid: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
              description: 'Critical things NOT to do',
            },
            emergencyAction: {
              type: Type.STRING,
              description: 'Immediate action advice e.g. Call 112/108 or visit nearest ER',
            },
            suggestedMedicinesOrRemedies: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
              description: 'Safe OTC or home first-aid remedies with appropriate warnings',
            },
            isLifeThreatening: {
              type: Type.BOOLEAN,
              description: 'True if urgency is RED or life-threatening',
            },
          },
          required: [
            'urgency',
            'urgencyLevelLabel',
            'detectedLanguage',
            'triageSummary',
            'immediateSteps',
            'whatToAvoid',
            'emergencyAction',
            'isLifeThreatening',
          ],
        },
      },
    });

    const timeoutPromise = new Promise<never>((_, reject) =>
      setTimeout(() => reject(new Error('AI response timed out')), 6000)
    );

    const response = await Promise.race([generatePromise, timeoutPromise]);

    const text = response.text || '{}';
    const parsed = JSON.parse(text);
    res.json({
      success: true,
      data: parsed,
    });
  } catch (err: any) {
    console.warn('Gemini triage fallback triggered:', err.message);
    const fallback = generateFallbackTriage(symptoms, language);
    res.json({
      success: true,
      data: fallback,
    });
  }
});

// Interactive Multi-turn AI Chatbot endpoint
app.post('/api/chat', async (req, res) => {
  const { message, history = [], patientProfile, activeContext, language } = req.body;

  if (!message || typeof message !== 'string' || !message.trim()) {
    res.status(400).json({ error: 'Message cannot be empty' });
    return;
  }

  if (!apiKey || apiKey === 'MY_GEMINI_API_KEY') {
    let fallbackReply = generateFallbackChatReply(message);
    if (patientProfile?.allergies?.length) {
      fallbackReply += `\n\n[Medical Record Note: You have recorded allergies to: ${patientProfile.allergies.join(
        ', '
      )}. Avoid medications containing these substances.]`;
    }
    res.json({ success: true, reply: fallbackReply });
    return;
  }

  try {
    let profileStr = '';
    if (patientProfile) {
      profileStr = `
Patient Profile Context:
- Age: ${patientProfile.age || 'Not specified'}
- Gender: ${patientProfile.gender || 'Not specified'}
- Allergies: ${patientProfile.allergies?.join(', ') || 'None'}
- Chronic Conditions: ${patientProfile.medicalConditions?.join(', ') || 'None'}
- Current Medications: ${patientProfile.currentMedications?.join(', ') || 'None'}
CRITICAL: Never advise medicines that trigger the patient's allergies or worsen their chronic conditions!`;
    }

    const systemInstruction = `You are SwasthSeva AI ("स्वास्थ्य सेवा साथी") - India's Emergency Health & First-Aid Assistant.
You specialize in rapid first aid, triage, and emergency guidance.
You fluently understand and converse in:
1. English
2. Hindi (हिन्दी)
3. Marathi (मराठी)
4. Tamil (தமிழ்)
5. Marwari (मारवाड़ी - "म्हारो स्वास्थ्य साथी")
6. Hinglish

${profileStr}
${activeContext?.diseaseName ? `Current Disease in discussion: ${activeContext.diseaseName}` : ''}
${language ? `User preferred language: ${language}` : ''}

Rules:
1. Always respond in the user's language or preferred language (English, Hindi, Marathi, Tamil, Marwari, Hinglish).
2. If there are red-flag emergencies (chest pain, stroke symptoms, major bleeding, snake bite, choking, severe burns, loss of consciousness, poisoning), immediately tell them to dial 112 or 108 or click the SOS button in SwasthSeva, while giving calm step-by-step first aid.
3. Keep instructions concise, calm, and easy to execute under panic.
4. Use numbered steps for actions.
5. Emphasize what NOT to do.`;

    const contents = [];

    // Add recent history if provided
    for (const h of history.slice(-6)) {
      if (h.role === 'user' || h.role === 'model') {
        contents.push({
          role: h.role,
          parts: [{ text: h.text }],
        });
      }
    }

    // Add current user message
    contents.push({
      role: 'user',
      parts: [{ text: message }],
    });

    const generatePromise = ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: contents,
      config: {
        systemInstruction,
        temperature: 0.7,
      },
    });

    const timeoutPromise = new Promise<never>((_, reject) =>
      setTimeout(() => reject(new Error('AI chat response timed out')), 6000)
    );

    const response = await Promise.race([generatePromise, timeoutPromise]);

    res.json({
      success: true,
      reply: response.text || 'कृपया आपातकालीन स्थिति में तुरंत 112 या 108 पर संपर्क करें।',
    });
  } catch (err: any) {
    console.warn('Gemini chat fallback triggered:', err.message);
    const fallbackReply = generateFallbackChatReply(message);
    res.json({
      success: true,
      reply: fallbackReply,
    });
  }
});

// Dev vs Prod Vite middleware
async function startServer() {
  const isProd = process.env.NODE_ENV === 'production';

  if (!isProd) {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.resolve(__dirname, 'dist')));
    app.get('*', (req, res) => {
      res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`SwasthSeva Server running on port ${PORT}`);
  });
}

startServer();
