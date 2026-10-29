import { HealthProblem } from '../types';

export const HEALTH_PROBLEMS: HealthProblem[] = [
  // ==========================================
  // SECTION A: EAR, NOSE AND THROAT
  // ==========================================
  {
    id: 'tonsillitis-sore-throat',
    name: 'Tonsillitis & Sore Throat',
    hindiName: 'टॉन्सिल और गले में खराश',
    icon: '🗣️',
    category: 'Ear, Nose & Throat',
    description: 'Inflammation of the tonsils or pharynx causing pain when swallowing, scratchy throat, and swollen glands.',
    specialist: 'ENT Specialist / General Physician',
    translations: {
      hi: { name: 'टॉन्सिल और गले में खराश', desc: 'निगलते समय दर्द और गले में सूजन व जलन।' },
      mr: { name: 'घसा दुखी आणि टॉन्सिल्स', desc: 'घशात खवखव आणि गिळताना तीव्र वेदना.' },
      ta: { name: 'தொண்டை வலி மற்றும் டான்சில்ஸ்', desc: 'விழுங்கும்போது வலி மற்றும் தொண்டை அழற்சி.' },
      mwr: { name: 'गळा रो दरद अर टॉन्सिल', desc: 'घांट में दरद अर निगळती वगत पीड़ा व्हैवणी।' },
    },
    commonCauses: ['Viral respiratory infection (cold/flu)', 'Streptococcal bacterial infection', 'Dry air & mouth breathing', 'Vocal strain or dust allergy'],
    questionsToAsk: ['Is there white pus on the tonsils?', 'Can you swallow liquids without severe choking?', 'Do you have high fever (>101°F)?'],
    whatToAvoid: ['Do NOT drink ice-cold water or consume very sour/chilly food', 'Do NOT start random antibiotics without bacterial confirmation', 'Do NOT shout or strain your voice'],
    warningSigns: ['Inability to swallow saliva (drooling)', 'Muffled "hot potato" voice', 'Difficulty breathing or opening mouth wide (trismus)'],
    levels: {
      basic: {
        immediateSteps: [
          { step: 1, title: 'Warm Salt Water Gargle', desc: 'Mix 1/2 tsp salt in warm water. Gargle for 30 seconds 3-4 times daily to reduce swelling.' },
          { step: 2, title: 'Sip Warm Liquids', desc: 'Drink warm water with honey and ginger or lukewarm herbal tea to soothe mucous membranes.' },
          { step: 3, title: 'Steam Inhalation', desc: 'Inhale plain steam for 5-10 minutes to moisten dry vocal cords and larynx.' },
          { step: 4, title: 'Rest Your Voice', desc: 'Avoid excessive talking and whispering to allow inflamed tissues to heal.' },
          { step: 5, title: 'Mild Analgesic', desc: 'Paracetamol 500mg if throat pain is causing severe discomfort.' },
        ],
        medicines: [
          { name: 'Warm Saline Gargle / Betadine Gargle (2%)', desc: 'Topical antiseptic gargle for bacterial load reduction.', tag: 'OTC Gargle', prescription: false },
          { name: 'Paracetamol 500mg', desc: 'Pain and mild fever relief.', tag: 'Oral OTC', prescription: false },
        ],
        preventionTips: ['Wash hands frequently', 'Replace toothbrush after throat infection', 'Avoid shared utensils during viral illnesses'],
      },
      threatening: {
        immediateSteps: [
          { step: 1, title: 'Doctor Visit for Throat Swab', desc: 'Rule out bacterial Strep throat which requires a full course of antibiotics to prevent rheumatic fever.' },
          { step: 2, title: 'Monitor Temperature Closely', desc: 'Take temperature every 4 hours if fever exceeds 101°F.' },
          { step: 3, title: 'Hydrate with Lukewarm Fluids', desc: 'Keep drinking coconut water or clear soups in small sips.' },
          { step: 4, title: 'Check Cervical Lymph Nodes', desc: 'Gently feel sides of neck for tender swollen nodes.' },
          { step: 5, title: 'Prescription Antibiotic', desc: 'Complete full prescribed course if bacterial infection is confirmed by doctor.' },
        ],
        medicines: [],
        preventionTips: ['Avoid secondhand cigarette smoke and polluted air'],
      },
      lifeThreatening: {
        immediateSteps: [
          { step: 1, title: 'Peritonsillar Abscess (Quinsy) - Call 112 / 108', desc: 'Inability to open mouth, severe one-sided throat swelling pushing uvula to side, or airway compromise requires emergency hospital ENT drainage.' },
          { step: 2, title: 'Sit Upright', desc: 'Do not lie flat if breathing is noisy (stridor).' },
          { step: 3, title: 'Hospital Emergency ENT Care', desc: 'Immediate IV antibiotics and airway management.' },
          { step: 4, title: 'Emergency Room Oxygen', desc: 'Provide supplemental oxygen if oxygen saturation drops.' },
          { step: 5, title: 'Keep NPO (Nothing by mouth)', desc: 'Prepare for possible urgent clinical aspiration.' },
        ],
        medicines: [],
        preventionTips: ['Never leave severe tonsillitis untreated for weeks'],
      },
    },
    helpVideos: [
      { id: 'v-ton', title: 'Sore Throat Symptoms & Home Treatment', speaker: 'Mayo Clinic', duration: '3:20', youtubeId: 'Bvr_JKaEOaE' },
    ],
  },
  {
    id: 'earache',
    name: 'Earache & Ear Infection',
    hindiName: 'कान का दर्द',
    icon: '👂',
    category: 'Ear, Nose & Throat',
    description: 'Sharp, dull, or burning pain in one or both ears, often following colds or water entry during swimming.',
    specialist: 'ENT Specialist',
    translations: {
      hi: { name: 'कान का दर्द', desc: 'कान में चुभन, भारीपन या मवाद का रिसाव।' },
      mr: { name: 'कान दुखी', desc: 'कानात ठसठस किंवा तीव्र वेदना.' },
      ta: { name: 'காது வலி', desc: 'காதில் குத்தல் அல்லது சீழ் வடிதல்.' },
      mwr: { name: 'कान रो दरद', desc: 'कान में टीस चालणी अर भारीपण।' },
    },
    commonCauses: ['Middle ear infection (Otitis Media)', 'Swimmer’s ear (Otitis Externa)', 'Earwax impaction', 'Referred pain from tooth decay or temporomandibular joint'],
    questionsToAsk: ['Is there yellow or bloody fluid draining from the ear?', 'Did pain start after inserting earbuds or hairpins?', 'Is hearing muffled?'],
    whatToAvoid: ['NEVER insert cotton buds, matchsticks, or hairpins into ear canal', 'Do NOT pour random mustard oil or garlic oil without doctor examination', 'Do NOT let water enter ear while bathing'],
    warningSigns: ['Fluid/pus discharge with sudden hearing loss', 'Swelling and redness behind the ear (mastoiditis)', 'Facial drooping or high fever with stiff neck'],
    levels: {
      basic: {
        immediateSteps: [
          { step: 1, title: 'Apply Warm Compress Outside Ear', desc: 'Hold a warm, dry towel or warm water bottle against the painful ear for 10-15 minutes.' },
          { step: 2, title: 'Keep Ear Strictly Dry', desc: 'Use silicone earplugs or vaseline-coated cotton when showering to prevent water entry.' },
          { step: 3, title: 'Sleep with Affected Ear Upward', desc: 'Sleeping with the painful ear facing up helps ease pressure buildup.' },
          { step: 4, title: 'Take Mild Pain Reliever', desc: 'Paracetamol or Ibuprofen as per doctor recommendation for throbbing pain.' },
          { step: 5, title: 'Chew or Swallow', desc: 'Gentle chewing can help equalize Eustachian tube pressure.' },
        ],
        medicines: [
          { name: 'Paracetamol 500mg', desc: 'Oral relief for ear throbbing.', tag: 'Oral OTC', prescription: false },
        ],
        preventionTips: ['Dry ears gently with towel after bathing', 'Never clean deep ear canal with earbuds'],
      },
      threatening: {
        immediateSteps: [
          { step: 1, title: 'Doctor Examination for Eardrum Perforation', desc: 'ENT must examine eardrum using otoscope before any drops are prescribed.' },
          { step: 2, title: 'Avoid Water Activities', desc: 'Do not swim until certified by doctor.' },
          { step: 3, title: 'Prescription Antibiotic Drops', desc: 'Use only prescribed antibiotic ear drops (e.g. Ciprofloxacin/Ofloxacin) if eardrum is intact.' },
          { step: 4, title: 'Monitor Drainage Color', desc: 'Note if discharge is clear, green, or blood-tinged.' },
          { step: 5, title: 'Follow-up Checkup', desc: 'Repeat ear exam in 5 days.' },
        ],
        medicines: [],
        preventionTips: ['Treat childhood nasal allergies promptly'],
      },
      lifeThreatening: {
        immediateSteps: [
          { step: 1, title: 'Suspected Mastoiditis or Meningitis - Call 112 / 108', desc: 'Red, bulging swelling behind ear, high fever, or confusion requires urgent hospital admission.' },
          { step: 2, title: 'Do NOT Put Anything into Ear', desc: 'Keep ear area clean and dry.' },
          { step: 3, title: 'Emergency CT Scan & IV Antibiotics', desc: 'Immediate inpatient hospital care.' },
          { step: 4, title: 'Monitor Neurological Status', desc: 'Check alertness and pupil response.' },
          { step: 5, title: 'Emergency ENT Surgical Drainage', desc: 'Specialist surgical intervention if bone is infected.' },
        ],
        medicines: [],
        preventionTips: ['Complete all antibiotic courses for middle ear infections'],
      },
    },
    helpVideos: [
      { id: 'v-ear', title: 'Ear Infections: Causes, Symptoms & Care', speaker: 'Mayo Clinic', duration: '3:05', youtubeId: 'd_FwJj8oNQQ' },
    ],
  },
  {
    id: 'nasal-congestion-sinus',
    name: 'Nasal Congestion & Sinus Pain',
    hindiName: 'नाक बंद और साइनस का दर्द',
    icon: '👃',
    category: 'Ear, Nose & Throat',
    description: 'Blocked nose, facial pressure around eyes and forehead, thick nasal mucus, and reduced sense of smell.',
    specialist: 'ENT Specialist / General Physician',
    translations: {
      hi: { name: 'नाक बंद और साइनस का दर्द', desc: 'चेहरे और माथे पर भारीपन और सांस लेने में रुकावट।' },
      mr: { name: 'नाक बंद आणि सायनस वेदना', desc: 'कपाळावर दाब आणि नाक चोंदणे.' },
      ta: { name: 'மூக்கடைப்பு மற்றும் சைனஸ் வலி', desc: 'முகத்தில் அழுத்தம் மற்றும் மூக்கடைப்பு.' },
      mwr: { name: 'नाक बन्द अर साइनस दरद', desc: 'माथे माथे भारीपण अर नाक रो बंद व्हैवणो।' },
    },
    commonCauses: ['Viral sinusitis following common cold', 'Seasonal allergic rhinitis', 'Deviated nasal septum (DNS)', 'Secondary bacterial sinus infection'],
    questionsToAsk: ['Is facial pain worse when bending forward?', 'Is nasal discharge yellow-green for over 10 days?', 'Do you have swelling around the eyes?'],
    whatToAvoid: ['Do NOT use OTC decongestant sprays (Otrivin) for > 5 consecutive days (causes rebound congestion)', 'Do NOT blow nose violently; blow one nostril at a time', 'Avoid sudden exposure to dusty or smoke-filled rooms'],
    warningSigns: ['Swelling, redness, or drooping around eye', 'Double vision or vision blur', 'Severe forehead headache with high fever and neck stiffness'],
    levels: {
      basic: {
        immediateSteps: [
          { step: 1, title: 'Steam Inhalation', desc: 'Inhale plain water steam for 10 minutes twice daily to loosen thick mucus plugs.' },
          { step: 2, title: 'Saline Nasal Rinse (Neti or Drops)', desc: 'Flush nasal passages with isotonic sterile saline to clear allergens.' },
          { step: 3, title: 'Warm Compress on Face', desc: 'Place a warm moist towel over forehead and cheeks for 5 minutes.' },
          { step: 4, title: 'Elevate Head While Sleeping', desc: 'Use an extra pillow to promote sinus drainage overnight.' },
          { step: 5, title: 'Stay Well Hydrated', desc: 'Drink warm water and soups to thin out mucus secretions.' },
        ],
        medicines: [
          { name: 'Saline Nasal Spray (Nasoclear)', desc: 'Safe non-medicated saline moisture.', tag: 'OTC Spray', prescription: false },
          { name: 'Paracetamol 500mg', desc: 'Facial and forehead sinus pain relief.', tag: 'Oral OTC', prescription: false },
        ],
        preventionTips: ['Use room air humidifier', 'Wash face after coming from outdoors'],
      },
      threatening: {
        immediateSteps: [
          { step: 1, title: 'Doctor Evaluation for Bacterial Sinusitis', desc: 'Symptoms persisting > 10 days without improvement may require targeted antibiotics.' },
          { step: 2, title: 'Prescription Steroid Nasal Spray', desc: 'Fluticasone or Mometasone spray prescribed by doctor for chronic allergic inflammation.' },
          { step: 3, title: 'Avoid Air Travel', desc: 'Avoid flights while severely congested to prevent barotrauma.' },
          { step: 4, title: 'Monitor Teeth Pain', desc: 'Upper molar ache can stem from maxillary sinus swelling.' },
          { step: 5, title: 'ENT Endoscopy if Recurrent', desc: 'Check for nasal polyps or structural blockage.' },
        ],
        medicines: [],
        preventionTips: ['Manage seasonal allergies before peak season'],
      },
      lifeThreatening: {
        immediateSteps: [
          { step: 1, title: 'Orbital or Intracranial Complications - Call 112 / 108', desc: 'Swollen eye, double vision, inability to move eyeball, or altered mental state requires urgent emergency trauma/ENT care.' },
          { step: 2, title: 'Emergency Hospital CT Paranasal Sinus', desc: 'Detect orbital cellulitis or cavernous sinus thrombosis.' },
          { step: 3, title: 'Emergency IV Broad-spectrum Antibiotics', desc: 'Immediate inpatient hospital protocol.' },
          { step: 4, title: 'Protect Eye and Vision', desc: 'Monitor visual acuity.' },
          { step: 5, title: 'Surgical Decompression', desc: 'Endoscopic sinus drainage by senior surgeon.' },
        ],
        medicines: [],
        preventionTips: ['Treat severe sinus infections promptly in diabetic patients'],
      },
    },
    helpVideos: [
      { id: 'v-sin', title: 'Sinusitis Symptoms, Causes & Relief', speaker: 'Mayo Clinic Health System', duration: '3:45', youtubeId: 'f_rdtryNUow' },
    ],
  },

  // ==========================================
  // SECTION B: HEAD AND NEUROLOGICAL SYMPTOMS
  // ==========================================
  {
    id: 'headache',
    name: 'Headache & Tension Headache',
    hindiName: 'सिरदर्द और तनाव',
    icon: '🤕',
    category: 'Head & Neurological',
    description: 'Dull, aching band of pain across forehead, temples, or back of head, commonly triggered by stress, dehydration, or eye strain.',
    specialist: 'Neurologist / General Physician',
    translations: {
      hi: { name: 'सिरदर्द और तनाव', desc: 'सिर में भारीपन और दोनों तरफ कसने जैसा दर्द।' },
      mr: { name: 'डोकेदुखी', desc: 'डोक्यात ठणक किंवा तणावामुळे होणारी डोकेदुखी.' },
      ta: { name: 'தலைவலி', desc: 'தலையில் கடுமையான அழுத்தம் மற்றும் வலி.' },
      mwr: { name: 'माथा रो दरद', desc: 'माथे में टीस अर भारीपण।' },
    },
    commonCauses: ['Mental stress & emotional tension', 'Dehydration & missed meals', 'Prolonged computer or mobile screen eye strain', 'Lack of sleep or caffeine withdrawal'],
    questionsToAsk: ['Did headache develop suddenly like a "thunderclap"?', 'Is there nausea, vomiting, or light sensitivity?', 'Is your neck stiff when bending chin to chest?'],
    whatToAvoid: ['Do NOT stare at smartphone screens in a dark room', 'Avoid skipping regular meals and dehydration', 'Do NOT overuse painkillers (> 3 days/week) to avoid medication-overuse headaches'],
    warningSigns: ['Sudden "worst headache of life" (thunderclap onset in seconds)', 'Headache with fever, stiff neck, and confusion', 'Weakness or numbness on one side of face/body'],
    levels: {
      basic: {
        immediateSteps: [
          { step: 1, title: 'Drink 2 Large Glasses of Water', desc: 'Dehydration is one of the most frequent headache triggers. Rehydrate immediately.' },
          { step: 2, title: 'Rest in a Dark, Quiet Room', desc: 'Lie down, close eyes, and apply a cool damp cloth over forehead.' },
          { step: 3, title: 'Gentle Neck and Temple Massage', desc: 'Gently rub temples, back of neck, and shoulder muscles in circular motions.' },
          { step: 4, title: 'Take a Break from All Screens', desc: 'Turn off screens and look 20 feet away to relax eye muscles.' },
          { step: 5, title: 'Mild Analgesic if Needed', desc: 'Paracetamol 500mg taken with a light snack.' },
        ],
        medicines: [
          { name: 'Paracetamol 500mg', desc: 'First-line relief for tension headache.', tag: 'Oral OTC', prescription: false },
        ],
        preventionTips: ['Maintain consistent sleep schedule', 'Follow 20-20-20 rule for screens', 'Stay well hydrated with 8+ glasses of water'],
      },
      threatening: {
        immediateSteps: [
          { step: 1, title: 'Measure Blood Pressure', desc: 'Check if severe headache is accompanied by hypertensive spike (> 160/100 mmHg).' },
          { step: 2, title: 'Check Vision & Eye Focus', desc: 'Rule out acute angle-closure glaucoma or refractive errors.' },
          { step: 3, title: 'Consult Doctor if Recurrent', desc: 'Frequent headaches (> 2 per week) warrant physician investigation.' },
          { step: 4, title: 'Keep a Headache Diary', desc: 'Track food triggers, sleep hours, and stress levels.' },
          { step: 5, title: 'Check Medications History', desc: 'Review current prescription side-effects with doctor.' },
        ],
        medicines: [],
        preventionTips: ['Regular aerobic exercise and stress management'],
      },
      lifeThreatening: {
        immediateSteps: [
          { step: 1, title: 'Red Flag: Call 112 / 108 Emergency Immediately', desc: 'Thunderclap headache (subarachnoid hemorrhage), fever with neck stiffness (meningitis), or stroke symptoms (FAST: Face, Arms, Speech).' },
          { step: 2, title: 'Keep Patient Flat with Head Supported', desc: 'Do not allow sudden jerky head movements.' },
          { step: 3, title: 'Do NOT Give Aspirin Before CT', desc: 'If there is brain hemorrhage, blood thinners are fatal.' },
          { step: 4, title: 'Emergency Hospital Neuro-ICU Transfer', desc: 'Immediate non-contrast Brain CT scan and neurology consult.' },
          { step: 5, title: 'Continuous Vitals Monitoring', desc: 'Check breathing, pulse, and consciousness level.' },
        ],
        medicines: [],
        preventionTips: ['Strict control of high blood pressure'],
      },
    },
    helpVideos: [
      { id: 'v-head', title: 'Tension Headache Exercises & Relief', speaker: 'Body Fix Exercises', duration: '3:15', youtubeId: '1hngJNQfb44' },
    ],
  },
  {
    id: 'migraine',
    name: 'Migraine Headache',
    hindiName: 'माइग्रेन / आधासीसी का दर्द',
    icon: '⚡',
    category: 'Head & Neurological',
    description: 'Intense throbbing pain, usually on one side of head, often accompanied by nausea, vomiting, and extreme sensitivity to light and sound.',
    specialist: 'Neurologist',
    translations: {
      hi: { name: 'माइग्रेन (आधासीसी का दर्द)', desc: 'सिर के एक तरफ तेज टीस मारता दर्द, रोशनी व आवाज से बेचैनी।' },
      mr: { name: 'मायग्रेन', desc: 'एका बाजूला होणारी तीव्र डोकेदुखी आणि मळमळ.' },
      ta: { name: 'ஒற்றைத் தலைவலி (மைக்ரேன்)', desc: 'தலையின் ஒரு பக்கத்தில் கடுமையான துடிப்பு வலி.' },
      mwr: { name: 'माइग्रेन / अधकपारी', desc: 'आधे माथे रो घणो मोटो टीस मारण वाळो दरद।' },
    },
    commonCauses: ['Hormonal fluctuations (menstrual cycle)', 'Dietary triggers (aged cheese, chocolates, MSG, fasting)', 'Bright lights, loud noises, or strong perfumes', 'Irregular sleep and stress'],
    questionsToAsk: ['Did you notice an aura (flashing lights, blind spots) before the headache?', 'Does movement make the throbbing worse?', 'Do you need to vomit or lie in darkness?'],
    whatToAvoid: ['Avoid bright screens, sunlight, and loud television', 'Avoid known food triggers', 'Do NOT wait hours before taking abortive migraine medicines'],
    warningSigns: ['New onset headache with visual disturbance in patients over 50', 'Fever, neck rigidity, or motor weakness', 'Headache worsening progressively over weeks'],
    levels: {
      basic: {
        immediateSteps: [
          { step: 1, title: 'Isolate in Pitch Dark, Quiet Room', desc: 'Darkness and silence reduce cortical sensory stimulation and pain intensity.' },
          { step: 2, title: 'Cold Ice Pack on Forehead / Back of Neck', desc: 'Apply ice pack wrapped in towel to constrict dilated cranial blood vessels.' },
          { step: 3, title: 'Sip Small Amount of Caffeinated Coffee or Tea', desc: 'In early stages, mild caffeine can boost pain medication absorption.' },
          { step: 4, title: 'Practice Deep Belly Breathing', desc: 'Slow, calm inhalation and exhalation to decrease autonomic nervous arousal.' },
          { step: 5, title: 'Take Prescribed Migraine Abortive Drug Early', desc: 'Take prescribed medication (e.g. Triptan or Naproxen) at earliest onset.' },
        ],
        medicines: [
          { name: 'Naproxen 250-500mg or Paracetamol', desc: 'NSAID pain relief taken early in migraine attack.', tag: 'Oral OTC/Rx', prescription: false },
        ],
        preventionTips: ['Maintain consistent meal and sleep schedule', 'Stay hydrated and track triggers in diary'],
      },
      threatening: {
        immediateSteps: [
          { step: 1, title: 'Neurologist Consultation for Preventive Therapy', desc: 'If attacks occur > 3-4 times monthly, preventive prophylactic medicines (Propranolol, Topiramate, Flunarizine) are indicated.' },
          { step: 2, title: 'Anti-emetic for Severe Nausea', desc: 'Doctor may prescribe Ondansetron or Domperidone so fluids stay down.' },
          { step: 3, title: 'Check Blood Pressure and Eye Pressure', desc: 'Rule out other secondary headache etiologies.' },
          { step: 4, title: 'Avoid Medication Overuse', desc: 'Limit triptans/painkillers to under 10 days per month.' },
          { step: 5, title: 'Explore Relaxation Biofeedback', desc: 'Cognitive behavioral and mindfulness therapies.' },
        ],
        medicines: [],
        preventionTips: ['Avoid skipping breakfast or meals during busy workdays'],
      },
      lifeThreatening: {
        immediateSteps: [
          { step: 1, title: 'Status Migrainosus / Neurological Deficit - Call 112', desc: 'Continuous intractable migraine lasting > 72 hours, inability to stay hydrated, or limb weakness (hemiplegic migraine).' },
          { step: 2, title: 'Emergency Hospital IV Hydration and Rescue Therapy', desc: 'IV fluids, anti-emetics, and non-opioid migraine rescue protocols.' },
          { step: 3, title: 'Brain MRI / MRA', desc: 'Rule out arteriovenous malformation, dissection, or stroke.' },
          { step: 4, title: 'Continuous Neuro Vitals Monitoring', desc: 'Check cranial nerve reflexes.' },
          { step: 5, title: 'Hospital Neurological Ward Admission', desc: 'Specialist inpatient care.' },
        ],
        medicines: [],
        preventionTips: ['Strict adherence to neurologist preventive treatment plan'],
      },
    },
    helpVideos: [
      { id: 'v-mig', title: 'Mayo Clinic Explains Migraine Symptoms & Treatment', speaker: 'Mayo Clinic', duration: '3:30', youtubeId: 'E6lMGCoRBPA' },
    ],
  },
  {
    id: 'dizziness-vertigo',
    name: 'Dizziness & Vertigo',
    hindiName: 'चक्कर आना / वर्टिगो',
    icon: '💫',
    category: 'Head & Neurological',
    description: 'Sensation of spinning (room spinning), lightheadedness, or feeling off-balance, often related to inner ear or blood pressure fluctuations.',
    specialist: 'ENT / Neurologist',
    translations: {
      hi: { name: 'चक्कर आना और वर्टिगो', desc: 'आसपास की चीजें घूमती हुई महसूस होना या संतुलन बिगड़ना।' },
      mr: { name: 'चक्कर येणे आणि व्हर्टिगो', desc: 'भोवळ येणे किंवा तोल जाणे.' },
      ta: { name: 'மயக்கம் மற்றும் சுழல் மயக்கம்', desc: 'சுற்றுப்புறம் சுழல்வது போன்ற உணர்வு.' },
      mwr: { name: 'चक्कर आवणी अर भंवरी', desc: 'सगळो जहान घूमत्यो दीखणो अर संतुलन बिगड़णो।' },
    },
    commonCauses: ['Benign Paroxysmal Positional Vertigo (BPPV)', 'Inner ear labyrinthitis / vestibular neuritis', 'Sudden drop in blood pressure (orthostatic)', 'Severe dehydration or low blood sugar (hypoglycemia)'],
    questionsToAsk: ['Does the room spin when you turn your head in bed?', 'Do you have ringing in ears (tinnitus) or hearing loss?', 'Are you unable to walk straight without falling?'],
    whatToAvoid: ['Do NOT make sudden jerky head movements or sit up abruptly', 'Avoid driving a car or operating machinery while dizzy', 'Avoid pitch darkness; maintain visual orientation points'],
    warningSigns: ['Dizziness with slurred speech, double vision, or facial drooping (Stroke warning)', 'Chest pain, irregular heartbeat, or sudden blackout (Syncope)', 'Severe headache with inability to stand or coordinate hands'],
    levels: {
      basic: {
        immediateSteps: [
          { step: 1, title: 'Sit or Lie Down Flat Immediately', desc: 'Prevent falls. Lie down with head slightly elevated and fix eyes on a stationary object.' },
          { step: 2, title: 'Sip Water with Electrolytes', desc: 'Drink a glass of ORS or water slowly to treat possible dehydration or low BP.' },
          { step: 3, title: 'Stand Up Very Gradually', desc: 'When getting out of bed, sit on the edge for 1 minute before standing.' },
          { step: 4, title: 'Keep Lighting On', desc: 'Keep night light on in room so eyes can help maintain spatial orientation.' },
          { step: 5, title: 'Avoid Caffeine, Alcohol & Salt', desc: 'Reduces inner ear fluid pressure fluctuations.' },
        ],
        medicines: [
          { name: 'ORS (Electral)', desc: 'Hydration and electrolyte stabilization.', tag: 'Hydration OTC', prescription: false },
        ],
        preventionTips: ['Stay well hydrated in hot weather', 'Perform vestibular rehabilitation exercises if prescribed'],
      },
      threatening: {
        immediateSteps: [
          { step: 1, title: 'ENT / Doctor Evaluation for BPPV', desc: 'Doctor will perform Dix-Hallpike test and Epley canalith repositioning maneuver to clear inner ear crystals.' },
          { step: 2, title: 'Prescription Labyrinthine Sedative', desc: 'Doctor may prescribe Betahistine (Vertin) or Cinnarizine for short-term vertigo relief.' },
          { step: 3, title: 'Audiometry Hearing Assessment', desc: 'Rule out Meniere’s disease or acoustic neuroma.' },
          { step: 4, title: 'Fall Prevention at Home', desc: 'Remove loose rugs and install bathroom grab bars.' },
          { step: 5, title: 'Monitor Blood Pressure Lying and Standing', desc: 'Check for orthostatic hypotension.' },
        ],
        medicines: [],
        preventionTips: ['Avoid rapid neck hyperextension during hair washing'],
      },
      lifeThreatening: {
        immediateSteps: [
          { step: 1, title: 'Posterior Circulation Stroke Warning - Call 112 / 108', desc: 'Sudden severe vertigo accompanied by ataxia (clumsiness), slurred speech, limb numbness, or double vision.' },
          { step: 2, title: 'Keep Patient Flat with Head Still', desc: 'Prevent falls and aspiration.' },
          { step: 3, title: 'Emergency Hospital Stroke Protocol', desc: 'Immediate emergency MRI Brain and stroke thrombolysis team.' },
          { step: 4, title: 'Emergency ECG and Cardiac Monitoring', desc: 'Check for cardiac arrhythmias (Atrial Fibrillation).' },
          { step: 5, title: 'ICU Monitoring', desc: 'Close hemodynamic and neurological supervision.' },
        ],
        medicines: [],
        preventionTips: ['Cardiovascular disease control and smoking cessation'],
      },
    },
    helpVideos: [
      { id: 'v-vert', title: 'Epley Maneuver for BPPV Vertigo Relief', duration: '3:10', youtubeId: '9SLm76jQg3g', speaker: 'Vestibular Disorders Guide' },
    ],
  },

  // ==========================================
  // SECTION C: DIGESTIVE SYSTEM
  // ==========================================
  {
    id: 'acidity-heartburn',
    name: 'Acidity, GERD & Heartburn',
    hindiName: 'एसिडिटी और सीने में जलन',
    icon: '🔥',
    category: 'Digestive System',
    description: 'Burning sensation in chest or throat, sour burps, and stomach bloating, caused by stomach acid regurgitating into the esophagus.',
    specialist: 'Gastroenterologist / Physician',
    translations: {
      hi: { name: 'एसिडिटी और सीने में जलन', desc: 'खट्टी डकारें, सीने में जलन और पेट में भारीपन।' },
      mr: { name: 'पित्त आणि छातीत जळजळ', desc: 'आंबट ढेकर आणि छातीत जळजळ होणे.' },
      ta: { name: 'நெஞ்செரிச்சல் மற்றும் அமிலத்தன்மை', desc: 'நெஞ்சில் எரியும் உணர்வு மற்றும் புளித்த ஏப்பம்.' },
      mwr: { name: 'एसिडिटी अर छाती में जळन', desc: 'खाटी डकार आवणी अर छाती में लाय बळणी।' },
    },
    commonCauses: ['Heavy, oily, or spicy meals', 'Lying down immediately after eating', 'Excessive tea, coffee, smoking, or carbonated sodas', 'Obesity or hiatal hernia'],
    questionsToAsk: ['Does the burning worsen when lying flat or bending over?', 'Is there pain radiating to left arm or back with sweating? (If yes, suspect heart attack!)', 'Do you have difficulty swallowing food?'],
    whatToAvoid: ['Do NOT lie down flat within 2-3 hours of eating dinner', 'Avoid tight belts and compressive garments around abdomen', 'Avoid deep-fried snacks, chocolates, and late-night meals'],
    warningSigns: ['Chest pressure radiating to arm, jaw, or shoulder with cold sweats (Cardiac Red Flag)', 'Vomiting blood or black coffee-ground vomit', 'Difficulty swallowing solid food (Dysphagia)'],
    levels: {
      basic: {
        immediateSteps: [
          { step: 1, title: 'Stand or Sit Upright', desc: 'Gravity prevents stomach acid from flowing back up into the esophagus.' },
          { step: 2, title: 'Sip Cold Milk or Lukewarm Water', desc: 'A few sips of cold milk or water temporarily neutralizes stomach acid.' },
          { step: 3, title: 'Take Liquid Antacid', desc: '10ml of liquid antacid (Gelusil / Digene) provides rapid coating relief.' },
          { step: 4, title: 'Loosen Tight Belt', desc: 'Relieve intra-abdominal pressure.' },
          { step: 5, title: 'Elevate Head of Bed 6 Inches', desc: 'Place blocks under bed headposts if nocturnal reflux recurs.' },
        ],
        medicines: [
          { name: 'Gelusil / Digene Antacid (10ml)', desc: 'Fast-acting neutralizing oral suspension.', tag: 'Oral OTC', prescription: false },
          { name: 'Pantoprazole 40mg (Pan 40)', desc: 'Proton Pump Inhibitor (taken 30 mins before breakfast).', tag: 'Oral OTC/Rx', prescription: false },
        ],
        preventionTips: ['Eat small, frequent meals rather than large feasts', 'Finish dinner at least 2.5 hours before sleeping'],
      },
      threatening: {
        immediateSteps: [
          { step: 1, title: 'Gastroenterologist Consultation for Endoscopy', desc: 'Persistent acidity (> 2 weeks) requires upper GI endoscopy to check for esophagitis or H. pylori.' },
          { step: 2, title: 'Prescription PPI Course', desc: 'Take prescribed 4-8 week course of Rabeprazole or Esomeprazole.' },
          { step: 3, title: 'Check Hemoglobin', desc: 'Rule out microscopic GI bleeding or anemia.' },
          { step: 4, title: 'Eliminate Trigger Foods', desc: 'Strict ban on spicy fast foods, carbonated sodas, and smoking.' },
          { step: 5, title: 'Maintain Healthy BMI', desc: 'Weight reduction significantly reduces intra-abdominal acid reflux.' },
        ],
        medicines: [],
        preventionTips: ['Avoid late-night alcohol and high-fat dinners'],
      },
      lifeThreatening: {
        immediateSteps: [
          { step: 1, title: 'Suspected Heart Attack or Perforated Ulcer - Call 112 / 108', desc: 'Crushing chest pressure, sweating, breathlessness, or sudden agonizing rigid board-like stomach pain.' },
          { step: 2, title: 'Do NOT Delay Assuming it is Just Gas', desc: 'Thousands mistake cardiac arrest for "acidity". Get urgent 12-lead ECG!' },
          { step: 3, title: 'Immediate Hospital Trauma / Emergency ER', desc: 'Cardiac telemetry, troponin blood tests, and abdominal X-ray.' },
          { step: 4, title: 'Nil by Mouth', desc: 'Do not feed food or drinks.' },
          { step: 5, title: 'Emergency Resuscitation Protocol', desc: 'Inpatient emergency cardiac/surgical care.' },
        ],
        medicines: [],
        preventionTips: ['Annual heart health and gastroenterology checkups'],
      },
    },
    helpVideos: [
      { id: 'v-acid', title: 'Heartburn, Acid Reflux & GERD-Mayo Clinic', speaker: 'Mayo Clinic', duration: '3:15', youtubeId: 'TdK0jRFpWPQ' },
    ],
  },
  {
    id: 'stomach-ache-gastritis',
    name: 'Stomach Ache & Abdominal Cramps',
    hindiName: 'पेट दर्द और ऐंठन',
    icon: '🤢',
    category: 'Digestive System',
    description: 'Cramping, sharp, or dull discomfort anywhere in the abdomen, ranging from simple gas to infections and inflammatory conditions.',
    specialist: 'Gastroenterologist / General Surgeon',
    translations: {
      hi: { name: 'पेट दर्द और ऐंठन', desc: 'पेट में मरोड़, भारीपन या तेज दर्द।' },
      mr: { name: 'पोटदुखी आणि पेटके', desc: 'पोटात गोळा येणे किंवा तीव्र कळा.' },
      ta: { name: 'வயிற்று வலி மற்றும் பிடிப்பு', desc: 'வயிற்றில் கடுமையான வலி மற்றும் பிடிப்புகள்.' },
      mwr: { name: 'पेट रो दरद अर मरोड़', desc: 'पेट में ऐंठन, मरोड़ अर भारी दरद।' },
    },
    commonCauses: ['Gastric spasms & trapped intestinal gas', 'Food poisoning or gastroenteritis', 'Constipation or indigestion', 'Kidney stone (flank pain) or Appendicitis (right lower abdomen)'],
    questionsToAsk: ['Is pain localized to right lower abdomen with fever? (Appendicitis warning)', 'Is there blood in stool or vomit?', 'Has pain persisted continuously for over 4 hours?'],
    whatToAvoid: ['Do NOT take strong painkillers (Brufen / Aspirin) without diagnosis (can rupture ulcers or mask appendicitis)', 'Do NOT apply direct high heat pads if appendicitis is suspected', 'Avoid solid food while having severe cramps'],
    warningSigns: ['Severe right lower abdominal pain that hurts when touching or coughing (Appendicitis)', 'Rigid, rock-hard abdomen sensitive to the slightest touch (Peritonitis)', 'High fever with continuous vomiting and inability to pass gas or stool (Bowel obstruction)'],
    levels: {
      basic: {
        immediateSteps: [
          { step: 1, title: 'Rest and Lie in Fetal Position', desc: 'Curling up with knees to chest helps relax abdominal wall muscles.' },
          { step: 2, title: 'Sip Warm Water or Peppermint Tea', desc: 'Helps dispel trapped intestinal gas bubbles.' },
          { step: 3, title: 'Avoid Solid Foods for a Few Hours', desc: 'Allow gastrointestinal tract to rest; sip clear fluids.' },
          { step: 4, title: 'Mild Antispasmodic if Advised by Doctor', desc: 'Dicyclomine / Mebeverine for smooth muscle intestinal cramps.' },
          { step: 5, title: 'Check Bowel Movements', desc: 'Note if passing gas relieves the discomfort.' },
        ],
        medicines: [
          { name: 'Pudin Hara (Mint Pearls)', desc: 'Natural carminative relief for gas and bloating.', tag: 'Herbal OTC', prescription: false },
        ],
        preventionTips: ['Chew food slowly and avoid carbonated soft drinks', 'Include dietary fiber regularly'],
      },
      threatening: {
        immediateSteps: [
          { step: 1, title: 'Doctor Examination & Abdominal Ultrasound (USG)', desc: 'Rule out gallstones, kidney stones, appendicitis, or pelvic inflammatory disease.' },
          { step: 2, title: 'Complete Blood Count (CBC) & Urine Routine', desc: 'Check for infection, elevated white blood cells, or urinary tract infection.' },
          { step: 3, title: 'Monitor Pain Location', desc: 'Note if pain shifts from navel to right lower abdomen.' },
          { step: 4, title: 'Stay Hydrated with ORS', desc: 'Replace fluid loss if loose stools coexist.' },
          { step: 5, title: 'Surgical Consultation if Pain Persists', desc: 'Early surgeon assessment prevents complications.' },
        ],
        medicines: [],
        preventionTips: ['Maintain hygienic water and fresh food intake'],
      },
      lifeThreatening: {
        immediateSteps: [
          { step: 1, title: 'Acute Abdomen / Peritonitis - Call 112 / 108 Emergency', desc: 'Sudden unbearable pain, rigid board-like belly, shock, rapid weak pulse, or fainting. Requires emergency surgery!' },
          { step: 2, title: 'Do NOT Give Any Food or Water', desc: 'Patient must remain strictly NPO for immediate emergency operating theater.' },
          { step: 3, title: 'Do NOT Administer Painkillers', desc: 'Painkillers mask surgical signs until surgeon examines patient.' },
          { step: 4, title: 'Emergency Hospital Surgical Unit Transfer', desc: 'Immediate IV line, blood grouping, and emergency laparoscopy/laparotomy.' },
          { step: 5, title: 'Continuous Shock Monitoring', desc: 'Elevate legs and monitor blood pressure.' },
        ],
        medicines: [],
        preventionTips: ['Never ignore sharp worsening localized abdominal pain'],
      },
    },
    helpVideos: [
      { id: 'v-stom', title: 'Gastritis and Stomach Pain Management', speaker: 'Mayo Clinic Radio', duration: '3:10', youtubeId: 'a9mTJ-wsYk8' },
    ],
  },
  {
    id: 'diarrhea-loose-motions',
    name: 'Diarrhea & Loose Motions',
    hindiName: 'दस्त और पेचिश',
    icon: '💧',
    category: 'Digestive System',
    description: 'Frequent loose, watery bowel movements that can rapidly lead to life-threatening dehydration and electrolyte collapse if unmanaged.',
    specialist: 'General Physician / Gastroenterologist',
    translations: {
      hi: { name: 'दस्त और पेचिश', desc: 'बार-बार पतले दस्त होना और शरीर में पानी की कमी।' },
      mr: { name: 'अतिसार आणि जुलाब', desc: 'वारंवार पातळ संडास होणे व अशक्तपणा.' },
      ta: { name: 'வயிற்றுப்போக்கு', desc: 'தொடர்ச்சியான வயிற்றுப்போக்கு மற்றும் நீர் இழப்பு.' },
      mwr: { name: 'दस्त अर पेट झड़णो', desc: 'घणी वेळा दस्त लागणी अर देह में पाणी री कमी व्हैवणी।' },
    },
    commonCauses: ['Viral gastroenteritis (Rotavirus, Norovirus)', 'Bacterial food/water contamination (E. coli, Salmonella)', 'Parasitic amoebiasis (Amoeba)', 'Antibiotic-associated diarrhea'],
    questionsToAsk: ['Are there signs of dehydration: sunken eyes, dry tongue, no urine for > 6 hours?', 'Is there blood or mucus in the stool (dysentery)?', 'Can you keep oral liquids down without vomiting?'],
    whatToAvoid: ['Do NOT take anti-diarrheal pills (Loperamide/Imodium) in dysentery or fever (it traps bacterial toxins inside intestine)', 'Do NOT drink raw tap water or unpasteurized milk', 'Avoid sugary fruit juices or sodas which draw more water into intestines'],
    warningSigns: ['Severe dehydration: lethargy, confusion, fainting, unreadable pulse', 'Bloody stools with high spiking fever', 'Diarrhea lasting > 48 hours without slowing down'],
    levels: {
      basic: {
        immediateSteps: [
          { step: 1, title: 'Start WHO-Formula ORS Immediately', desc: 'Mix 1 packet WHO-ORS in 1 liter clean water. Drink 200-300ml after every single loose motion.' },
          { step: 2, title: 'Drink Rice Kanji, Curd, or Buttermilk', desc: 'Probiotic curd (dahi) and rice water replenish gut microflora and provide gentle starch.' },
          { step: 3, title: 'Eat Bland BRAT Diet', desc: 'Bananas (potassium), Rice (Khichdi), Applesauce, Toast. Avoid dairy, oily, and spicy curries.' },
          { step: 4, title: 'Monitor Urine Color and Frequency', desc: 'Aim for pale light urine every 3-4 hours.' },
          { step: 5, title: 'Maintain Strict Hand Hygiene', desc: 'Wash hands with soap for 20 seconds after every bathroom visit.' },
        ],
        medicines: [
          { name: 'WHO-ORS (Electral / Enerzal)', desc: 'Life-saving oral electrolyte solution.', tag: 'Hydration OTC', prescription: false },
          { name: 'Zinc Sulfate Tablets 20mg (14 days)', desc: 'WHO recommended to reduce duration and recurrence of diarrhea.', tag: 'Mineral OTC', prescription: false },
        ],
        preventionTips: ['Drink only boiled or filtered water', 'Eat thoroughly cooked hot food'],
      },
      threatening: {
        immediateSteps: [
          { step: 1, title: 'Doctor Visit & Stool Routine Examination', desc: 'Detect ova, cysts, occult blood, or bacterial culture to determine if antibiotics (Norfloxacin/Metronidazole) are needed.' },
          { step: 2, title: 'Outpatient IV Saline if Vomiting Coexists', desc: 'If oral liquids cannot be kept down, clinic IV fluids prevent kidney failure.' },
          { step: 3, title: 'Check Kidney Function (Serum Creatinine)', desc: 'Ensure severe diarrhea has not caused prerenal acute kidney injury.' },
          { step: 4, title: 'Continue Frequent ORS Sips', desc: 'Take 1 teaspoon every minute if feeling nauseous.' },
          { step: 5, title: 'Review Current Medications', desc: 'Pause harmful medications under doctor guidance.' },
        ],
        medicines: [],
        preventionTips: ['Wash raw fruits and vegetables with clean drinking water'],
      },
      lifeThreatening: {
        immediateSteps: [
          { step: 1, title: 'Severe Hypovolemic Shock / Cholera - Call 112 / 108', desc: 'Profuse watery diarrhea ("rice water stool"), cold clammy skin, blue fingertips, sunken eyeballs, and no urination. Immediate ambulance!' },
          { step: 2, title: 'Do NOT Force Large Liquids Down Throat if Drowsy', desc: 'Prevent inhalation into lungs.' },
          { step: 3, title: 'Keep Patient Flat with Legs Elevated', desc: 'Maintain blood flow to vital brain and heart.' },
          { step: 4, title: 'Emergency Hospital Large-Bore IV Resuscitation', desc: 'Rapid infusion of Ringer Lactate in hospital emergency ward.' },
          { step: 5, title: 'ICU Intensive Electrolyte Monitoring', desc: 'Prevent fatal hypokalemia and metabolic acidosis.' },
        ],
        medicines: [],
        preventionTips: ['Community sanitation and safe water supply access'],
      },
    },
    helpVideos: [
      { id: 'v-diar', title: 'How to Make Oral Rehydration Solutions (ORS)', speaker: 'Stanford Center for Health Education', duration: '2:50', youtubeId: 'xWyqD_C9YV4' },
    ],
  },

  // ==========================================
  // SECTION D: MENSTRUAL AND REPRODUCTIVE HEALTH
  // ==========================================
  {
    id: 'period-cramps-dysmenorrhea',
    name: 'Period Cramps & Painful Menstruation',
    hindiName: 'पीरियड्स का दर्द और ऐंठन',
    icon: '🌸',
    category: 'Menstrual & Reproductive',
    description: 'Throbbing, cramping pain in the lower abdomen and back occurring before or during menstrual periods due to prostaglandin contractions.',
    specialist: 'Gynecologist / Women’s Health Specialist',
    translations: {
      hi: { name: 'पीरियड्स का दर्द और ऐंठन', desc: 'मासिक धर्म के दौरान पेट के निचले हिस्से और कमर में तेज दर्द।' },
      mr: { name: 'मासिक पाळीतील वेदना', desc: 'पाळीदरम्यान ओटीपोटात तीव्र कळा व कंबरदुखी.' },
      ta: { name: 'மாதவிடாய் வலி மற்றும் பிடிப்பு', desc: 'மாதவிடாய் காலத்தில் அடிவயிற்றில் வலி மற்றும் முதுகுவலி.' },
      mwr: { name: 'म्हीना रो दरद अर ऐंठन', desc: 'म्हीने रे वगत पेट में मरोड़ अर कमर में भारी दरद।' },
    },
    commonCauses: ['Primary dysmenorrhea (elevated uterine prostaglandins)', 'Endometriosis or adenomyosis', 'Uterine fibroids', 'Pelvic inflammatory disease (PID)'],
    questionsToAsk: ['Is pain so severe that it prevents normal daily activities or school/work?', 'Do you soak more than one sanitary pad per hour?', 'Does pain radiate down your thighs?'],
    whatToAvoid: ['Avoid excessive caffeine and high-sodium foods which increase water retention and bloating', 'Do NOT push through unbearable pain without seeking gynecological assessment', 'Avoid cold drafts and dehydration'],
    warningSigns: ['Severe sudden sharp abdominal pain with dizziness or fainting (possible ectopic pregnancy if sexually active)', 'Fever, foul-smelling vaginal discharge, and intense pelvic pain', 'Soaking through pads every hour for several consecutive hours (heavy hemorrhage)'],
    levels: {
      basic: {
        immediateSteps: [
          { step: 1, title: 'Apply Warm Heating Pad to Lower Abdomen', desc: 'Heat increases local blood flow and relaxes contracting uterine muscles.' },
          { step: 2, title: 'Gentle Pelvic Stretches (Child’s Pose)', desc: 'Practice yoga Cat-Cow and Balasana child’s pose to relieve lower-back tension.' },
          { step: 3, title: 'Sip Warm Ginger or Chamomile Tea', desc: 'Ginger has natural anti-prostaglandin and anti-inflammatory properties.' },
          { step: 4, title: 'Stay Hydrated with Warm Water', desc: 'Prevents water retention and abdominal bloating.' },
          { step: 5, title: 'Take OTC Anti-Spasmodic Pain Reliever', desc: 'Mefenamic acid + Dicyclomine (Meftal-Spas) or Ibuprofen with food as recommended by doctor.' },
        ],
        medicines: [
          { name: 'Meftal-Spas (Mefenamic Acid + Dicyclomine)', desc: 'Targeted anti-prostaglandin and uterine smooth-muscle relaxant.', tag: 'Oral OTC/Rx', prescription: false },
          { name: 'Ibuprofen 400mg', desc: 'Reduces uterine prostaglandin synthesis.', tag: 'Oral OTC', prescription: false },
        ],
        preventionTips: ['Regular moderate aerobic exercise throughout the month', 'Maintain adequate magnesium and vitamin B6 intake'],
      },
      threatening: {
        immediateSteps: [
          { step: 1, title: 'Gynecologist Consultation for Pelvic Ultrasound', desc: 'Scan for endometriosis, ovarian cysts, or uterine fibroids if pain is worsening each cycle.' },
          { step: 2, title: 'Check Complete Blood Count (CBC) & Ferritin', desc: 'Rule out iron-deficiency anemia due to heavy bleeding.' },
          { step: 3, title: 'Track Menstrual Symptoms in App/Diary', desc: 'Log pain severity, bleeding days, and pad count.' },
          { step: 4, title: 'Prescription Hormonal Therapy Evaluation', desc: 'Oral contraceptive pills or hormonal IUD may be recommended by specialist.' },
          { step: 5, title: 'Pelvic Physical Therapy', desc: 'Address hypertonic pelvic floor dysfunction.' },
        ],
        medicines: [],
        preventionTips: ['Manage chronic stress through yoga and mindfulness'],
      },
      lifeThreatening: {
        immediateSteps: [
          { step: 1, title: 'Ruptured Ectopic Pregnancy or Ovarian Torsion - Call 112 / 108', desc: 'Sudden, excruciating one-sided lower abdominal pain, fainting, pale skin, and shoulder tip pain in a woman of childbearing age requires immediate emergency surgery!' },
          { step: 2, title: 'Lie Flat and Keep Warm', desc: 'Do not allow standing or walking.' },
          { step: 3, title: 'Emergency Hospital Gynecology Unit', desc: 'Urgent transvaginal ultrasound, pregnancy test (urine/serum beta-hCG), and emergency laparoscopy.' },
          { step: 4, title: 'Strictly Nil by Mouth', desc: 'Prepare for emergency operating room.' },
          { step: 5, title: 'Continuous Shock & Hemorrhage Monitoring', desc: 'IV fluids and blood crossmatching.' },
        ],
        medicines: [],
        preventionTips: ['Early medical review for irregular bleeding and lower abdominal pain'],
      },
    },
    helpVideos: [
      { id: 'v-cramp', title: 'Gentle Stretches for Period Cramps Relief', speaker: 'Women’s Health Guide', duration: '3:30', youtubeId: '2X78NWuRfJU' },
    ],
  },
  {
    id: 'heavy-menstrual-bleeding',
    name: 'Heavy Menstrual Bleeding (Menorrhagia)',
    hindiName: 'माहवारी में अधिक खून बहना',
    icon: '🩸',
    category: 'Menstrual & Reproductive',
    description: 'Abnormally heavy or prolonged menstrual bleeding, passing large blood clots, and needing to change pads every 1-2 hours.',
    specialist: 'Gynecologist',
    translations: {
      hi: { name: 'माहवारी में अधिक खून बहना', desc: 'पीरियड्स में बड़े थक्के आना और लगातार भारी ब्लीडिंग होना।' },
      mr: { name: 'अति रक्तस्राव', desc: 'पाळीदरम्यान जास्त रक्तस्राव आणि रक्ताच्या गुठळ्या.' },
      ta: { name: 'அதிக இரத்தப்போக்கு', desc: 'மாதவிடாயின் போது அதிக இரத்தப்போக்கு ஏற்படுதல்.' },
      mwr: { name: 'म्हीने में घणो लोही पड़णो', desc: 'म्हीने रे वगत घणो लोही बहवणो अर थक्का पड़णा।' },
    },
    commonCauses: ['Hormonal imbalance (PCOS, thyroid dysfunction)', 'Uterine fibroids or polyps', 'Adenomyosis', 'Coagulation or platelet bleeding disorders'],
    questionsToAsk: ['Are you changing pads every 1-2 hours for more than 4 consecutive hours?', 'Are you passing blood clots larger than a 5-rupee coin?', 'Do you feel dizzy, breathless, or faint when standing up?'],
    whatToAvoid: ['Do NOT take Aspirin or blood-thinning painkillers', 'Avoid strenuous physical lifting or heavy workouts during peak bleeding', 'Do NOT ignore chronic fatigue and pale conjunctiva'],
    warningSigns: ['Severe dizziness, fainting, or pale gray skin (acute severe blood loss)', 'Soaking two or more maxi pads per hour for two hours in a row', 'Bleeding lasting longer than 7-8 consecutive days'],
    levels: {
      basic: {
        immediateSteps: [
          { step: 1, title: 'Rest in Bed with Legs Slightly Elevated', desc: 'Rest reduces pelvic congestion and improves venous blood return.' },
          { step: 2, title: 'Drink Plenty of Fluids and Electrolytes', desc: 'Hydrate with soups, ORS, and water to replace vascular volume.' },
          { step: 3, title: 'Track Number of Pads Changed per Hour', desc: 'Record exact pad counts and clot sizes to report to gynecologist.' },
          { step: 4, title: 'Eat Iron-Rich Foods', desc: 'Spinach, dates, jaggery, lentils, and pomegranate to support red blood cell rebuilding.' },
          { step: 5, title: 'Stay Warm and Avoid Cold Bathing', desc: 'Gentle warmth calms pelvic cramping.' },
        ],
        medicines: [
          { name: 'Tranexamic Acid 500mg', desc: 'Antifibrinolytic agent that reduces menstrual blood loss (under doctor prescription).', tag: 'Prescription Only', prescription: true },
        ],
        preventionTips: ['Annual gynecological screening and thyroid profile check'],
      },
      threatening: {
        immediateSteps: [
          { step: 1, title: 'Gynecologist Visit for Pelvic Scan & Endometrial Evaluation', desc: 'Identify fibroids, polyps, or endometrial hyperplasia.' },
          { step: 2, title: 'Full Blood Count (CBC), Serum Ferritin & Thyroid (TSH)', desc: 'Quantify severity of anemia and thyroid dysfunction.' },
          { step: 3, title: 'Iron Supplementation Course', desc: 'Start therapeutic oral iron tablets (Ferrous Ascorbate with Vitamin C).' },
          { step: 4, title: 'Hormonal Management Plan', desc: 'Progestin therapy or levonorgestrel intrauterine system (Mirena).' },
          { step: 5, title: 'Monitor Blood Pressure and Pulse Regularly', desc: 'Watch for postural hypotension.' },
        ],
        medicines: [],
        preventionTips: ['Maintain healthy body weight to balance estrogen levels'],
      },
      lifeThreatening: {
        immediateSteps: [
          { step: 1, title: 'Severe Acute Hemorrhage / Syncope - Call 112 / 108', desc: 'Rapid soaking of clothes, confusion, pale cold skin, rapid thready pulse, or loss of consciousness. Immediate emergency!' },
          { step: 2, title: 'Lie Flat on Floor, Raise Legs 12 Inches', desc: 'Maximize blood flow to brain and vital organs.' },
          { step: 3, title: 'Emergency Hospital Gynecology Unit', desc: 'Immediate IV fluids, blood crossmatching, and emergency medical/surgical hemostasis.' },
          { step: 4, title: 'Emergency Blood Transfusion Readiness', desc: 'Packed red blood cell transfusion if hemoglobin is dangerously low.' },
          { step: 5, title: 'Inpatient Hospital Admission', desc: 'Continuous hemodynamic monitoring.' },
        ],
        medicines: [],
        preventionTips: ['Never leave heavy chronic bleeding uninvestigated for months'],
      },
    },
    helpVideos: [
      { id: 'v-heavy', title: 'Heavy Menstrual Bleeding (Menorrhagia) Management', speaker: 'Mayo Clinic', duration: '3:40', youtubeId: 't6A_xKUywzc' },
    ],
  },

  // ==========================================
  // SECTION E: BONES, JOINTS AND MUSCLES
  // ==========================================
  {
    id: 'back-pain',
    name: 'Back Pain & Lower Back Strain',
    hindiName: 'कमर दर्द और रीढ़ की हड्डी में खिंचाव',
    icon: '🧘',
    category: 'Bones & Joints',
    description: 'Aching, stiffness, or sharp pain in the lower or mid-back, frequently caused by muscle strain, prolonged sitting, or lumbar disc herniation.',
    specialist: 'Orthopedic Doctor / Physiotherapist',
    translations: {
      hi: { name: 'कमर दर्द और रीढ़ की हड्डी में खिंचाव', desc: 'कमर में अकड़न, झुकने में तकलीफ और पीठ की मांसपेशियों में खिंचाव।' },
      mr: { name: 'कंबरदुखी व पाठीचे दुखणे', desc: 'कंबरेत चमक किंवा तीव्र पाठीचे दुखणे.' },
      ta: { name: 'முதுகு வலி மற்றும் இடுப்பு வலி', desc: 'கீழ் முதுகு மற்றும் இடுப்பு பகுதியில் வலி.' },
      mwr: { name: 'कमर रो दरद अर रीढ़ री पीड़ा', desc: 'कमर में चमको पड़णो अर उठण-बैठण में भारी दरद।' },
    },
    commonCauses: ['Heavy lifting with bent spine instead of bent knees', 'Prolonged slouched sitting on soft sofas or chairs', 'Lumbar disc herniation (Sciatica)', 'Weak core muscles and obesity'],
    questionsToAsk: ['Does pain shoot down your leg past the knee with tingling (Sciatica)?', 'Have you lost bowel or bladder control (Cauda Equina emergency)?', 'Was the pain caused by a high-impact fall or accident?'],
    whatToAvoid: ['Do NOT stay in bed for days (prolonged bed rest weakens back muscles and worsens pain)', 'Do NOT lift heavy objects or twist your spine while lifting', 'Avoid sleeping on sagging, overly soft mattresses'],
    warningSigns: ['Loss of bowel or bladder control, or numbness in the groin/saddle area (Cauda Equina Syndrome)', 'Back pain with unexplained fever and weight loss', 'Progressive numbness or weakness in foot (foot drop)'],
    levels: {
      basic: {
        immediateSteps: [
          { step: 1, title: 'Ice Pack for First 48 Hours, then Warmth', desc: 'Apply ice wrapped in towel for 15 minutes to reduce acute inflammation, then switch to gentle heat.' },
          { step: 2, title: 'Gentle Walking on Flat Ground', desc: 'Short 10-minute walks keep spinal discs nourished and prevent stiffness.' },
          { step: 3, title: 'Sleep on Firm Surface with Knee Support', desc: 'Sleep on side with a pillow between knees, or on back with a pillow under knees.' },
          { step: 4, title: 'Gentle Knee-to-Chest Stretches', desc: 'Lie on back, gently draw one knee to chest for 20 seconds, alternating legs.' },
          { step: 5, title: 'Topical Pain Relief Gel', desc: 'Apply Diclofenac or Volini gel gently without harsh massage.' },
        ],
        medicines: [
          { name: 'Diclofenac Gel (Volini / Omnigel)', desc: 'Topical NSAID gel for localized back muscle strain.', tag: 'Topical OTC', prescription: false },
          { name: 'Paracetamol 650mg', desc: 'Mild pain and muscle ache relief.', tag: 'Oral OTC', prescription: false },
        ],
        preventionTips: ['Maintain ergonomic chair posture with lumbar support cushion', 'Strengthen core abdominal muscles through regular planks and bridge exercises'],
      },
      threatening: {
        immediateSteps: [
          { step: 1, title: 'Orthopedic / Spine Specialist Evaluation', desc: 'Clinical neurological exam to test leg reflexes, sensation, and straight leg raise test.' },
          { step: 2, title: 'Lumbar Spine MRI if Sciatica Persists > 4 Weeks', desc: 'Visualize disc bulge, nerve root compression, or spinal stenosis.' },
          { step: 3, title: 'Targeted Physiotherapy Program', desc: 'McKenzie extension exercises, core strengthening, and posture retraining.' },
          { step: 4, title: 'Prescription Muscle Relaxant', desc: 'Doctor may prescribe Thiocolchicoside or Chlorzoxazone for severe spasms.' },
          { step: 5, title: 'Avoid High-Impact Jogging', desc: 'Switch to swimming or low-impact stationary cycling.' },
        ],
        medicines: [],
        preventionTips: ['Bend knees and keep load close to body when lifting'],
      },
      lifeThreatening: {
        immediateSteps: [
          { step: 1, title: 'Cauda Equina Syndrome / Spine Trauma - Call 112 / 108', desc: 'Inability to urinate, bowel incontinence, numbness around private parts ("saddle anesthesia"), or legs suddenly giving way requires emergency spine surgery within 24 hours to prevent permanent paralysis!' },
          { step: 2, title: 'Do NOT Move Patient if Spinal Trauma Fall', desc: 'Keep head, neck, and back in a straight rigid line (log-roll only).' },
          { step: 3, title: 'Emergency Hospital Spine Center Transfer', desc: 'Immediate emergency MRI Spine and neurosurgical decompression.' },
          { step: 4, title: 'Rigid Spinal Board Immobilization', desc: 'Paramedic cervical collar and spine board.' },
          { step: 5, title: 'Urgent Surgical Team Intervention', desc: 'Emergency decompressive laminectomy.' },
        ],
        medicines: [],
        preventionTips: ['Wear seatbelts and take safety measures on ladders/roofs'],
      },
    },
    helpVideos: [
      { id: 'v-back', title: 'Low Back Pain: Exercises & Tips', speaker: 'NHS Foundation Trust', duration: '3:45', youtubeId: '5w1S4Cjnraw' },
    ],
  },
  {
    id: 'joint-pain-arthritis',
    name: 'Joint Pain & Arthritis',
    hindiName: 'जोड़ों का दर्द और गठिया',
    icon: '🦴',
    category: 'Bones & Joints',
    description: 'Aching, stiffness, swelling, and reduced range of motion in knees, hips, fingers, or shoulders, commonly from Osteoarthritis or Rheumatoid Arthritis.',
    specialist: 'Rheumatologist / Orthopedic Surgeon',
    translations: {
      hi: { name: 'जोड़ों का दर्द और गठिया', desc: 'घुटनों व उंगलियों में सूजन, जकड़न और चलने में दर्द।' },
      mr: { name: 'सांधेदुखी आणि संधिवात', desc: 'गुडघे व सांध्यांमध्ये सूज आणि हालचाल करताना वेदना.' },
      ta: { name: 'மூட்டு வலி மற்றும் மூட்டுவாதம்', desc: 'மூட்டுகளில் வீக்கம் மற்றும் வலி.' },
      mwr: { name: 'जोड़ां रो दरद अर गठिया', desc: 'गूंठणां अर सांधा में दरद, सोजन अर जकड़न।' },
    },
    commonCauses: ['Age-related wear and tear (Osteoarthritis)', 'Autoimmune inflammation (Rheumatoid Arthritis)', 'Uric acid crystal deposition (Gout)', 'Post-viral arthralgia (Chikungunya / Dengue recovery)'],
    questionsToAsk: ['Is joint stiffness worse in the morning for over 30-60 minutes?', 'Is a single joint (like big toe or knee) red-hot and swollen?', 'Does pain increase when climbing stairs?'],
    whatToAvoid: ['Avoid high-impact jumping or running on hard pavement if knees hurt', 'Do NOT consume high-purine foods (red meat, beer, seafood) if Gout is suspected', 'Do NOT stop exercising completely (joint cartilage requires movement for nutrition)'],
    warningSigns: ['Hot, red, dramatically swollen joint with high fever (Septic Arthritis emergency)', 'Sudden inability to bear any weight on the leg', 'Multiple swollen joints with skin rash, mouth ulcers, or eye inflammation'],
    levels: {
      basic: {
        immediateSteps: [
          { step: 1, title: 'Warm Compress for Stiffness, Cold for Swelling', desc: 'Use warm water bath for morning stiffness; use cold ice pack if joint is warm and puffy.' },
          { step: 2, title: 'Gentle Low-Impact Joint Mobility', desc: 'Seated knee extensions, ankle rotations, and gentle swimming.' },
          { step: 3, title: 'Apply Topical Anti-Inflammatory Gel', desc: 'Gently apply Diclofenac or herbal Mahanarayan oil without heavy pressure.' },
          { step: 4, title: 'Wear Supportive Cushion Footwear', desc: 'Use shock-absorbing footwear and knee cap sleeve when walking.' },
          { step: 5, title: 'Maintain Healthy Body Weight', desc: 'Every 1 kg lost removes 4 kg of pressure from knee joints.' },
        ],
        medicines: [
          { name: 'Diclofenac / Methyl Salicylate Gel', desc: 'Topical relief for knee and finger joint aches.', tag: 'Topical OTC', prescription: false },
          { name: 'Paracetamol 650mg', desc: 'First-line mild joint analgesic.', tag: 'Oral OTC', prescription: false },
        ],
        preventionTips: ['Maintain adequate Vitamin D3 and Calcium levels', 'Practice regular low-impact cycling or swimming'],
      },
      threatening: {
        immediateSteps: [
          { step: 1, title: 'Rheumatologist / Orthopedic Consultation', desc: 'Order X-rays, Serum Uric Acid, ESR/CRP, and Rheumatoid Factor (RF / Anti-CCP).' },
          { step: 2, title: 'Check Synovial Fluid if Joint is Effused', desc: 'Fluid aspiration and microscopic crystal/bacterial analysis.' },
          { step: 3, title: 'Prescription DMARDs for Rheumatoid Arthritis', desc: 'Methotrexate or Hydroxychloroquine under specialist supervision to stop bone erosion.' },
          { step: 4, title: 'Custom Orthotic Insoles & Knee Braces', desc: 'Unloader knee braces shift weight from damaged cartilage compartment.' },
          { step: 5, title: 'Physiotherapist Quadriceps Strengthening', desc: 'Strengthen thigh muscles to stabilize knee joint.' },
        ],
        medicines: [],
        preventionTips: ['Early diagnosis of autoimmune arthritis prevents permanent joint deformity'],
      },
      lifeThreatening: {
        immediateSteps: [
          { step: 1, title: 'Septic (Infected) Arthritis Alert - Call 112 / 108', desc: 'Bacteria in the joint destroys cartilage within 24-48 hours. Red, boiling hot joint, inability to touch or move, high fever with chills. Immediate emergency!' },
          { step: 2, title: 'Emergency Hospital Orthopedic Ward Transfer', desc: 'Do not wait. Immediate joint needle aspiration and emergency arthroscopic washout.' },
          { step: 3, title: 'Emergency High-Dose IV Antibiotics', desc: 'Hospital inpatient IV antibiotic therapy.' },
          { step: 4, title: 'Strict Joint Immobilization', desc: 'Splinting to prevent cartilage destruction.' },
          { step: 5, title: 'Continuous Sepsis Monitoring', desc: 'Monitor blood pressure, pulse, and organ perfusion.' },
        ],
        medicines: [],
        preventionTips: ['Never inject unsterile steroid injections into joints in unlicensed clinics'],
      },
    },
    helpVideos: [
      { id: 'v-joint', title: 'How to Stay Active With Knee Osteoarthritis', speaker: 'Mayo Clinic', duration: '3:20', youtubeId: 'E42zVB-OCug' },
    ],
  },

  // ==========================================
  // SECTION F: SKIN AND HAIR
  // ==========================================
  {
    id: 'skin-rashes-hives',
    name: 'Skin Rashes & Hives (Urticaria)',
    hindiName: 'त्वचा पर चकत्ते और पित्ती',
    icon: '🌸',
    category: 'Skin & Hair',
    description: 'Itchy, raised red welts, blotches, or irritation on skin caused by allergic triggers, insect bites, viral infections, or contact dermatitis.',
    specialist: 'Dermatologist / Allergist',
    translations: {
      hi: { name: 'त्वचा पर चकत्ते और पित्ती', desc: 'त्वचा पर लाल दाने, खुजली और सूजन।' },
      mr: { name: 'त्वचेवर पुरळ आणि गांधी उठणे', desc: 'अंगावर खाज आणि लाल चट्टे.' },
      ta: { name: 'தோல் தடிப்புகள் மற்றும் அரிப்பு', desc: 'தோலில் சிவப்பு நிற தடிப்புகள் மற்றும் நமைச்சல்.' },
      mwr: { name: 'चमड़ी माथे चकत्ता अर पित्ती', desc: 'खाज चालणी, लाल चट्टा पड़णा अर फोड़ा व्हैणा।' },
    },
    commonCauses: ['Allergic reaction to food, medication, or plants', 'Viral exanthem or heat rash', 'Insect bites or pet dander', 'Contact with harsh soaps, detergents, or cosmetics'],
    questionsToAsk: ['Are your lips, tongue, or eyelids swelling?', 'Do you hear a whistling sound or feel breathless? (Anaphylaxis warning!)', 'Did rash appear within minutes of taking a new medication?'],
    whatToAvoid: ['Do NOT scratch rash with fingernails (leads to secondary bacterial impetigo)', 'Avoid hot water baths and harsh perfumed body soaps', 'Do NOT take known allergen drugs or foods'],
    warningSigns: ['Swelling of lips, tongue, throat, or face (Angioedema)', 'Difficulty breathing, wheezing, or tightness in chest (Anaphylaxis)', 'Purple or dark red spots that do not fade when pressed with a clear glass (Petechiae / Meningitis warning)'],
    levels: {
      basic: {
        immediateSteps: [
          { step: 1, title: 'Apply Cool Damp Compress', desc: 'Cool water compresses soothe itching and reduce local blood vessel dilatation.' },
          { step: 2, title: 'Apply Calamine Lotion', desc: 'Dab gentle calamine lotion over itchy areas to calm skin.' },
          { step: 3, title: 'Wear Loose, Breathable Cotton Clothing', desc: 'Avoid tight, synthetic, or wool fabrics that irritate skin.' },
          { step: 4, title: 'Take Non-Drowsy Antihistamine', desc: 'Cetirizine 10mg or Levocetirizine 5mg for allergic hives relief.' },
          { step: 5, title: 'Keep Fingernails Trimmed Short', desc: 'Prevents skin breakdown and bacterial infection during sleep.' },
        ],
        medicines: [
          { name: 'Cetirizine 10mg (Alerid / Cetzine)', desc: 'Oral antihistamine for itching and hives.', tag: 'Oral OTC', prescription: false },
          { name: 'Calamine Lotion', desc: 'Soothing topical anti-pruritic application.', tag: 'Topical OTC', prescription: false },
        ],
        preventionTips: ['Identify and eliminate household triggers', 'Use fragrance-free hypoallergenic moisturizers'],
      },
      threatening: {
        immediateSteps: [
          { step: 1, title: 'Dermatologist Consultation for Skin Scraping / Patch Test', desc: 'Differentiate fungal, scabies, psoriasis, or drug eruptions.' },
          { step: 2, title: 'Prescription Topical Corticosteroid Cream', desc: 'Hydrocortisone or Mometasone cream for localized eczema under medical advice.' },
          { step: 3, title: 'Review All Current Medications', desc: 'Stop any newly introduced suspect drugs under physician direction.' },
          { step: 4, title: 'Monitor for Secondary Infection', desc: 'Check if honey-colored crusts or pus develop.' },
          { step: 5, title: 'Avoid Known Food Allergens', desc: 'Strict elimination diet during allergic flares.' },
        ],
        medicines: [],
        preventionTips: ['Wear gloves when handling household detergents and garden soil'],
      },
      lifeThreatening: {
        immediateSteps: [
          { step: 1, title: 'Anaphylaxis or Stevens-Johnson Syndrome (SJS) - Call 112 / 108', desc: 'Swollen lips/throat with breathing difficulty, peeling skin blisters in mouth/eyes, or purple rash with high fever. Immediate life-threatening emergency!' },
          { step: 2, title: 'Administer Epinephrine Auto-Injector (EpiPen) if Available', desc: 'Inject outer mid-thigh muscle immediately.' },
          { step: 3, title: 'Lie Flat with Legs Elevated', desc: 'Prevent fatal drop in blood pressure.' },
          { step: 4, title: 'Emergency Hospital Trauma / Allergy Unit', desc: 'Immediate IV hydrocortisone, nebulized adrenaline, and high-flow oxygen.' },
          { step: 5, title: 'Burn ICU Care if Severe Skin Peeling', desc: 'Specialist inpatient barrier nursing.' },
        ],
        medicines: [
          { name: 'EpiPen (Epinephrine 0.3mg)', desc: 'Emergency antidote for severe anaphylactic shock.', tag: 'Emergency Prescription', prescription: true },
        ],
        preventionTips: ['Always wear a medical alert bracelet listing drug allergies'],
      },
    },
    helpVideos: [
      { id: 'v-rash', title: 'Hives and Allergic Skin Rashes Care', speaker: 'Mayo Clinic', duration: '3:05', youtubeId: 'AmyjDoygzBs' },
    ],
  },
  {
    id: 'minor-burns',
    name: 'Minor & Severe Burns',
    hindiName: 'जलना / बर्न',
    icon: '🔥',
    category: 'Skin & Hair',
    description: 'Tissue damage resulting from heat, boiling water, steam, flame, electrical appliances, chemicals, or intense sunlight.',
    specialist: 'Burn Specialist / Plastic Surgeon',
    translations: {
      hi: { name: 'जलना / बर्न', desc: 'गर्म चीज या आग से त्वचा का जलना, छाले और घाव।' },
      mr: { name: 'भाजणे', desc: 'आगीने किंवा गरम पाण्याने त्वचा भाजणे.' },
      ta: { name: 'தீக்காயம்', desc: 'நெருப்பு அல்லது சூடான நீரால் ஏற்படும் காயம்.' },
      mwr: { name: 'बळणो अर जलणो', desc: 'लाय या ऊना पाणी सूं चमड़ी रो जलणो अर छाला पड़णा।' },
    },
    commonCauses: ['Hot liquids / boiling tea or oil spills', 'Touching hot kitchen vessels or irons', 'Electrical contact or faulty wiring', 'Chemical acid/alkali spills'],
    questionsToAsk: ['Is the burn larger than the palm of the victim’s hand?', 'Are blisters present, or is skin white/charred and numb?', 'Did the burn occur on the face, hands, joints, or genitals?'],
    whatToAvoid: ['NEVER apply toothpaste, raw butter, turmeric, or mud (traps heat and breeds severe sepsis)', 'Do NOT use direct ice or ice water (worsens tissue ischemia and frostbite)', 'Do NOT pop, peel, or puncture blisters'],
    warningSigns: ['Third-degree burns (leathery, white, or charred skin with loss of sensation)', 'Inhalation burns (soot in mouth/nose, hoarse cough, singed nasal hairs)', 'Burns covering more than 10% of total body surface area'],
    levels: {
      basic: {
        immediateSteps: [
          { step: 1, title: 'Cool Under Clean Running Water for 15-20 Mins', desc: 'Cool running tap water removes trapped heat and halts deeper skin destruction.' },
          { step: 2, title: 'Remove Tight Rings, Bangles & Belts Immediately', desc: 'Take off jewelry before severe swelling sets in.' },
          { step: 3, title: 'Do NOT Pop Blisters', desc: 'Intact blisters form a natural sterile biological barrier against infection.' },
          { step: 4, title: 'Cover Loosely with Clean Cling Film or Sterile Gauze', desc: 'Plastic cling wrap does not stick to burned skin and prevents air exposure pain.' },
          { step: 5, title: 'Take Paracetamol for Pain Relief', desc: 'Oral painkiller if needed.' },
        ],
        medicines: [
          { name: 'Silver Sulfadiazine Cream (Silvadene / Burnol)', desc: 'Antiseptic cream for minor superficial burns.', tag: 'Topical OTC', prescription: false },
          { name: 'Paracetamol 500mg', desc: 'Burn pain management.', tag: 'Oral OTC', prescription: false },
        ],
        preventionTips: ['Turn pot handles inward on stoves', 'Keep hot water buckets away from toddlers'],
      },
      threatening: {
        immediateSteps: [
          { step: 1, title: 'Doctor Visit at Hospital Burns Unit', desc: 'Deep second-degree burns or burns larger than palm require professional debridement and sterile dressings.' },
          { step: 2, title: 'Tetanus Toxoid (TT) Injection', desc: 'Take booster within 24 hours if not vaccinated in past 5 years.' },
          { step: 3, title: 'Elevate Burned Limb', desc: 'Keep burned arm or leg elevated above heart level to decrease swelling.' },
          { step: 4, title: 'Keep Dressing Dry and Clean', desc: 'Change dressings under aseptic technique.' },
          { step: 5, title: 'Adequate Fluid Intake', desc: 'Drink plenty of water and ORS to replace fluid weeping from burn surfaces.' },
        ],
        medicines: [],
        preventionTips: ['Install smoke alarms and kitchen fire extinguishers'],
      },
      lifeThreatening: {
        immediateSteps: [
          { step: 1, title: 'Third-Degree or Large Burns - Call 112 / 108 Emergency Immediately', desc: 'Major burns, electrical burns, chemical burns, or smoke inhalation require immediate burn ICU trauma resuscitation.' },
          { step: 2, title: 'Do NOT Remove Burned Clothing Stuck to Skin', desc: 'Cut away loose clothing; never rip stuck fabric.' },
          { step: 3, title: 'Keep Victim Warm with Clean Dry Blanket', desc: 'Large burns lose heat rapidly, causing fatal hypothermia.' },
          { step: 4, title: 'Check Airway Continuously', desc: 'Airway burns can swell completely shut in minutes. Sit upright if breathing.' },
          { step: 5, title: 'Emergency Hospital Burn ICU Resuscitation', desc: 'Parkland formula IV fluid resuscitation and surgical grafting.' },
        ],
        medicines: [],
        preventionTips: ['Never store flammable fuels near cooking stoves'],
      },
    },
    helpVideos: [
      { id: 'v-burn', title: 'Burns and Scalds - First Aid Treatment', speaker: 'St John Ambulance', duration: '2:45', youtubeId: 'TLr2qsEhpC8' },
    ],
  },

  // ==========================================
  // SECTION G: FEET AND MINOR INJURIES
  // ==========================================
  {
    id: 'thorn-splinter-foot',
    name: 'Thorn or Splinter Stuck in Foot',
    hindiName: 'पैर में कांटा या कांच चुभना',
    icon: '🦶',
    category: 'Minor Injuries',
    description: 'Foreign body (wooden thorn, plant spine, glass shard, or metal splinter) lodged into the sole or toes of the foot.',
    specialist: 'General Physician / Minor OT Surgeon',
    translations: {
      hi: { name: 'पैर में कांटा या कांच चुभना', desc: 'पैर के तलवे में कांटा, लकड़ी की फांस या कांच फंस जाना।' },
      mr: { name: 'पायात काटा किंवा काच रुतणे', desc: 'पायात काटा किंवा कणी रुतल्यास होणारी वेदना.' },
      ta: { name: 'காலில் முள் அல்லது கண்ணாடி குத்துதல்', desc: 'பாதத்தில் முள் அல்லது கண்ணாடி துண்டு பதிதல்.' },
      mwr: { name: 'पग में कांटो या कांच चूभणो', desc: 'पग में कांटो, फांस या कांच घुस जावणो अर टीस चालणी।' },
    },
    commonCauses: ['Walking barefoot outdoors or in farms', 'Broken glass shards on floor', 'Wooden splinters from furniture or timber', 'Metal shavings in workshop'],
    questionsToAsk: ['Is any part of the splinter visible above the skin surface?', 'Are you diabetic (diabetic foot ulcer risk)?', 'When was your last Tetanus Toxoid (TT) shot?'],
    whatToAvoid: ['Do NOT dig aggressively into the flesh with unsterilized sewing needles or safety pins', 'Do NOT walk with full pressure on the foot if glass is embedded deep', 'Avoid squeezing the area as it pushes the foreign object deeper'],
    warningSigns: ['Redness, warmth, throbbing pain, and pus drainage (Cellulitis/Abscess)', 'Inability to bear weight or numbness in toes', 'Diabetic patient with puncture wound (high risk of diabetic foot osteomyelitis)'],
    levels: {
      basic: {
        immediateSteps: [
          { step: 1, title: 'Wash Area with Soap and Lukewarm Water', desc: 'Cleanse surrounding skin thoroughly with soap and water to prevent driving surface bacteria deeper.' },
          { step: 2, title: 'Disinfect Tweezers with Rubbing Alcohol', desc: 'Sterilize clean tweezers with 70% alcohol.' },
          { step: 3, title: 'Gently Pull Out in the Same Direction it Entered', desc: 'Grasp the protruding tip firmly and pull out steadily at the same entry angle to avoid snapping the splinter.' },
          { step: 4, title: 'Wash Again and Apply Antiseptic', desc: 'Cleanse with water, dab Povidone-Iodine (Betadine), and cover with sterile bandage.' },
          { step: 5, title: 'Verify Tetanus Status', desc: 'Get Tetanus Toxoid (TT) injection within 24-48 hours if booster was > 5-10 years ago.' },
        ],
        medicines: [
          { name: 'Povidone-Iodine 5% (Cipladine / Betadine)', desc: 'Broad-spectrum topical antiseptic.', tag: 'Topical OTC', prescription: false },
        ],
        preventionTips: ['Always wear footwear outdoors and slippers indoors', 'Sweep floors carefully after glass breakage'],
      },
      threatening: {
        immediateSteps: [
          { step: 1, title: 'Clinic / Minor OT Removal for Deep Objects', desc: 'Doctor will perform minor sterile exploration under local anesthesia for deeply embedded thorns or glass.' },
          { step: 2, title: 'X-Ray or Soft Tissue Ultrasound', desc: 'Locate radiopaque glass shards or metal splinters.' },
          { step: 3, title: 'Prophylactic Oral Antibiotics', desc: 'Prevent Staphylococcal cellulitis if wound was dirty.' },
          { step: 4, title: 'Diabetic Foot Protocol', desc: 'Immediate physician management if patient has diabetes.' },
          { step: 5, title: 'Check Wound Daily', desc: 'Watch for spreading red streaks (lymphangitis).' },
        ],
        medicines: [],
        preventionTips: ['Wear protective work boots in gardens and industrial sites'],
      },
      lifeThreatening: {
        immediateSteps: [
          { step: 1, title: 'Spreading Cellulitis / Tetanus / Gangrene - Call 112 / 108', desc: 'Rapidly spreading dark red/black skin, high fever, jaw stiffness/muscle spasms (Tetanus), or severe systemic sepsis.' },
          { step: 2, title: 'Do NOT Apply Dirty Homemade Pastes or Mud', desc: 'Soil contains Clostridium tetani spores.' },
          { step: 3, title: 'Emergency Hospital Trauma Department', desc: 'Immediate IV antibiotics, Tetanus Immunoglobulin (TIG), and surgical debridement.' },
          { step: 4, title: 'Blood Cultures & Inflammatory Markers', desc: 'Monitor for septicemia.' },
          { step: 5, title: 'Specialist Inpatient Care', desc: 'Hospital observation.' },
        ],
        medicines: [],
        preventionTips: ['Keep routine Tetanus vaccination up to date every 10 years'],
      },
    },
    helpVideos: [
      { id: 'v-splint', title: 'How to Treat Cuts, Grazes & Splinters', speaker: 'St John Ambulance', duration: '2:40', youtubeId: '4e7evinsfm0' },
    ],
  },
  {
    id: 'dog-bite',
    name: 'Dog Bite & Animal Bites',
    hindiName: 'कुत्ते का काटना / रेबीज रोकथाम',
    icon: '🐕',
    category: 'Minor Injuries',
    description: 'Puncture wounds, scratches, or tears caused by dog, cat, monkey, or other animal bites carrying severe risks of bacterial infection and 100% fatal rabies.',
    specialist: 'Infectious Disease Specialist / General Surgeon',
    translations: {
      hi: { name: 'कुत्ते का काटना और रेबीज', desc: 'कुत्ते या जानवर का काटना, रेबीज से बचाव के टीके।' },
      mr: { name: 'कुत्रा चावणे व रेबीज', desc: 'कुत्रा किंवा प्राण्याने चावा घेतल्यास करावयाचे प्रथमोपचार.' },
      ta: { name: 'நாய் கடி மற்றும் ரேபிஸ் தடுப்பு', desc: 'நாய் கடித்தால் செய்ய வேண்டிய அவசர முதலுதவி.' },
      mwr: { name: 'कुत्ता रो काटणो अर रेबीज', desc: 'कुत्तो या जानवर काट लेवे तो तुरंत इलाज अर टीका।' },
    },
    commonCauses: ['Stray or pet dogs provoked or unprovoked', 'Defending territory or rabies virus in animal', 'Cat scratches or monkey bites'],
    questionsToAsk: ['Was the dog stray or an unvaccinated pet?', 'Did the bite break the skin and cause bleeding (Category III bite)?', 'Can the animal be safely observed for 10 days?'],
    whatToAvoid: ['NEVER apply red chillies, lime, turmeric, or tight bandages to bite wound', 'Do NOT stitch or suture bite wounds tightly (traps rabies virus and anaerobic bacteria)', 'Do NOT delay getting the Anti-Rabies Vaccine (ARV) Dose 0 on Day 0'],
    warningSigns: ['Deep bleeding puncture wounds or bites on face, head, or neck (Category III - requires immediate Rabies Immunoglobulin RIG)', 'Animal was abnormally aggressive, salivating, or died abruptly', 'Signs of spreading wound infection (pus, fever, red streaks)'],
    levels: {
      basic: {
        immediateSteps: [
          { step: 1, title: 'Wash with Soap and Running Water for 15 Full Minutes', desc: 'The most vital life-saving step! Continuous running tap water and detergent soap washes out rabies virus and bacteria.' },
          { step: 2, title: 'Apply Povidone-Iodine (Betadine)', desc: 'Thoroughly disinfect with Betadine or 70% alcohol.' },
          { step: 3, title: 'Leave Wound Open or Loosely Covered', desc: 'WHO guidelines prohibit tight closure or stitching.' },
          { step: 4, title: 'Get Anti-Rabies Vaccine (ARV) on Day 0', desc: 'Visit government hospital or clinic immediately for Dose 0 of Rabies vaccine.' },
          { step: 5, title: 'Administer Tetanus Injection', desc: 'Take TT booster within 24 hours.' },
        ],
        medicines: [
          { name: 'Anti-Rabies Vaccine (ARV Schedule: Day 0, 3, 7, 28)', desc: 'Life-saving vaccine. Rabies is 100% fatal once symptoms appear, but 100% preventable with timely vaccination.', tag: 'Hospital Vaccine', prescription: true },
        ],
        preventionTips: ['Keep pet dogs vaccinated annually', 'Never disturb sleeping or feeding animals'],
      },
      threatening: {
        immediateSteps: [
          { step: 1, title: 'Category III Bleeding Bite: Infiltrate Rabies Immunoglobulin (RIG)', desc: 'Requires Rabies Immunoglobulin (RIG) infiltrated directly around wound margins on Day 0.' },
          { step: 2, title: 'Observe Animal for 10 Days', desc: 'If animal remains alive and healthy after 10 days, rabies risk is zero.' },
          { step: 3, title: 'Start Prophylactic Antibiotics', desc: 'Amoxicillin-Clavulanate (Augmentin) prescribed for Pasteurella bacteria.' },
          { step: 4, title: 'Complete All Scheduled Vaccine Doses', desc: 'Never skip Day 3, 7, or 28 doses.' },
          { step: 5, title: 'Keep Wound Clean with Antiseptic', desc: 'Daily dressing care.' },
        ],
        medicines: [],
        preventionTips: ['Teach children to avoid running away or screaming from street dogs'],
      },
      lifeThreatening: {
        immediateSteps: [
          { step: 1, title: 'Bite on Face, Neck, or Head - Call 112 / 108 Emergency', desc: 'Virus travels to brain rapidly along facial nerves. Rush to tertiary government hospital for emergency Rabies Immunoglobulin (RIG) within hours!' },
          { step: 2, title: 'Major Hemorrhage Control', desc: 'Apply direct pressure with sterile pad if arterial bleeding occurs.' },
          { step: 3, title: 'Emergency Hospital Trauma & Rabies Unit', desc: 'Full post-exposure prophylaxis protocol under senior medical team.' },
          { step: 4, title: 'Maintain Airway and Breathing', desc: 'Protect neck and airway.' },
          { step: 5, title: 'Inpatient Hospital Admission', desc: 'Observation in specialized infectious disease / trauma unit.' },
        ],
        medicines: [],
        preventionTips: ['Support community animal birth control and stray dog vaccination programs'],
      },
    },
    helpVideos: [
      { id: 'v-dog', title: 'Animal Bites and Stings - First Aid', speaker: 'St John Ambulance', duration: '3:50', youtubeId: '7Fh3v5c6FY4' },
    ],
  },
  {
    id: 'snake-bite',
    name: 'Snake Bite',
    hindiName: 'सांप का काटना',
    icon: '🐍',
    category: 'Critical',
    description: 'Envenomation from venomous snakes (Cobra, Krait, Russell’s Viper, Saw-scaled Viper) causing neurotoxicity, paralysis, or fatal internal bleeding.',
    specialist: 'Emergency Trauma Physician',
    translations: {
      hi: { name: 'सांप का काटना', desc: 'जहरीले सांप का डसना, तुरंत एंटी-स्नेक वेनम की जरूरत।' },
      mr: { name: 'सर्पदंश', desc: 'विषारी साप चावल्यास त्वरित वैद्यकीय मदत.' },
      ta: { name: 'பாம்பு கடி', desc: 'விஷப்பாம்பு கடித்தால் அவசர சிகிச்சை.' },
      mwr: { name: 'सांप रो काटणो', desc: 'सांप रे डसण माथे तुरंत अस्पताल जावणो अर इलाज।' },
    },
    commonCauses: ['Walking barefoot in tall grass or fields', 'Sleeping on floor without mosquito net in rural areas', 'Reaching into dark woodpiles or burrows'],
    questionsToAsk: ['Are there two distinct puncture fang marks?', 'Is the limb swelling rapidly or bleeding continuously?', 'Are eyelids drooping or is breathing becoming difficult?'],
    whatToAvoid: ['NEVER cut, slash with razor blade, or suck venom with mouth', 'Do NOT apply a tight arterial tourniquet (causes gangrene and limb loss)', 'Do NOT give alcohol, herbal remedies, or electric shocks'],
    warningSigns: ['Ptosis (drooping eyelids), slurred speech, difficulty swallowing (Neurotoxic Cobra/Krait bite)', 'Spontaneous bleeding from gums, nose, or urine (Vasculotoxic Viper bite)', 'Severe rapid swelling progressing up the limb within minutes'],
    levels: {
      basic: {
        immediateSteps: [
          { step: 1, title: 'Reassure Victim & Keep Completely Still', desc: 'High heart rate pumps venom through the lymphatic system much faster. Keep patient calm.' },
          { step: 2, title: 'Immobilize Bitten Limb with a Splint', desc: 'Splint limb at or below heart level using wooden board or rolled cloth.' },
          { step: 3, title: 'Remove Rings, Bangles & Anklets Immediately', desc: 'Remove all jewelry before massive swelling cuts off circulation.' },
          { step: 4, title: 'Transport to Nearest Hospital with ASV Immediately', desc: 'Take patient by vehicle to nearest district hospital that stocks Anti-Snake Venom.' },
          { step: 5, title: 'Track Swelling Boundary with a Pen', desc: 'Draw a line around bite swelling and write the time every 15 minutes.' },
        ],
        medicines: [],
        preventionTips: ['Always use torchlight at night outdoors', 'Wear thick gumboots in farms'],
      },
      threatening: {
        immediateSteps: [
          { step: 1, title: 'Call 112 / 108 Emergency Ambulance', desc: 'Notify emergency team to prepare Anti-Snake Venom (ASV).' },
          { step: 2, title: 'Monitor Neurological Signs', desc: 'Watch for drooping eyelids, difficulty breathing, or slurred speech.' },
          { step: 3, title: 'Do NOT Catch or Kill the Snake', desc: 'Take safe photo from distance if possible, but do not risk another bite.' },
          { step: 4, title: 'Prepare for Rescue Breathing', desc: 'If respiratory paralysis begins, assist with mouth-to-mask breathing.' },
          { step: 5, title: 'Strictly No Food or Drink', desc: 'Patient may require emergency intubation.' },
        ],
        medicines: [],
        preventionTips: ['Sleep on raised cots with tucked-in mosquito nets'],
      },
      lifeThreatening: {
        immediateSteps: [
          { step: 1, title: 'Polyvalent Anti-Snake Venom (ASV) Administration in Hospital', desc: 'ASV is the ONLY proven scientific antidote for snake envenomation.' },
          { step: 2, title: 'Assisted Mechanical Ventilation', desc: 'Intubation and ICU ventilator if neurotoxin paralyzes diaphragm.' },
          { step: 3, title: 'Whole Blood Clotting Test (20WBCT)', desc: 'Doctor monitors coagulopathy every 6 hours.' },
          { step: 4, title: 'Treat Shock & Acute Kidney Injury', desc: 'IV fluid hydration and hemodialysis if viper venom affects kidneys.' },
          { step: 5, title: 'ICU Critical Care Management', desc: 'Round-the-clock intensive monitoring.' },
        ],
        medicines: [],
        preventionTips: ['Clear tall grass and debris away from home boundaries'],
      },
    },
    helpVideos: [
      { id: 'v-snake', title: 'How to Treat a Snake Bite - Pressure Immobilisation', speaker: 'St John WA', duration: '4:10', youtubeId: '5k8nDlfaA9E' },
    ],
  },

  // ==========================================
  // SECTION H: OTHER COMMON CONCERNS & EMERGENCIES
  // ==========================================
  {
    id: 'chest-pain',
    name: 'Chest Pain & Heart Attack',
    hindiName: 'सीने में दर्द / हार्ट अटैक',
    icon: '💔',
    category: 'Critical',
    description: 'Crushing pressure, fullness, or squeezing pain in center of chest, radiating to left arm, neck, or jaw. Potential life-threatening heart attack.',
    specialist: 'Cardiologist / Emergency Physician',
    translations: {
      hi: { name: 'सीने में दर्द / हार्ट अटैक', desc: 'सीने में भारीपन, बाएं हाथ में दर्द और पसीना।' },
      mr: { name: 'छातीत दुखणे व हृदयविकाराचा झटका', desc: 'छातीत तीव्र वेदना आणि घाम येणे.' },
      ta: { name: 'மார்பு வலி மற்றும் மாரடைப்பு', desc: 'மார்பில் கடுமையான வலி மற்றும் மூச்சுத் திணறல்.' },
      mwr: { name: 'छाती में दरद अर दिल रो दौरौ', desc: 'छाती माथे भारी दरद अर डावे हाथ में टीस चालणी।' },
    },
    commonCauses: ['Acute Myocardial Infarction (Heart Attack)', 'Angina Pectoris', 'Aortic Dissection', 'Severe Gastroesophageal Reflux (Acid reflux mimics chest pain)'],
    questionsToAsk: ['Is pain radiating to your left arm, jaw, shoulder, or back?', 'Are you sweating cold sweats, feeling dizzy, or short of breath?', 'Did pain start during exertion or emotional distress?'],
    whatToAvoid: ['Do NOT attempt to drive yourself to the hospital', 'Do NOT assume it is "just gas" and wait hours before acting', 'Do NOT allow patient to walk, climb stairs, or exert themselves'],
    warningSigns: ['Crushing chest pressure with cold sweats and nausea', 'Shortness of breath, dizziness, or passing out', 'Chest pain lasting more than 5 minutes that does not resolve with rest'],
    levels: {
      basic: {
        immediateSteps: [
          { step: 1, title: 'Stop All Exertion & Sit Down Immediately', desc: 'Sit on floor leaning back against wall in "W" position with knees bent.' },
          { step: 2, title: 'Loosen Tight Clothes', desc: 'Unbutton collar and loosen tight belts to ease breathing.' },
          { step: 3, title: 'Chew 300mg Aspirin (Dispirin)', desc: 'Chew one 300mg Aspirin immediately (unless allergic or having active ulcer bleeding).' },
          { step: 4, title: 'Sorbitrate under Tongue if Prescribed for Angina', desc: 'Place 1 tablet under tongue if previously diagnosed with angina.' },
          { step: 5, title: 'Unlock Front Door and Call for Help', desc: 'Ensure paramedics can enter without delay.' },
        ],
        medicines: [
          { name: 'Aspirin 300mg (Dispirin)', desc: 'Emergency chewable antiplatelet.', tag: 'Emergency OTC', prescription: false },
        ],
        preventionTips: ['Annual heart lipid profile & ECG', 'Zero tobacco smoking'],
      },
      threatening: {
        immediateSteps: [
          { step: 1, title: 'Call 112 / 108 Emergency Ambulance Immediately', desc: 'Request ambulance equipped with ECG and defibrillator.' },
          { step: 2, title: 'Stay Calm and Take Slow Breaths', desc: 'Panic increases myocardial oxygen consumption.' },
          { step: 3, title: 'Monitor Pulse and Blood Pressure', desc: 'Record vitals while awaiting paramedics.' },
          { step: 4, title: 'Alert Family and Neighbors', desc: 'Ensure adult support is present.' },
          { step: 5, title: 'Keep Emergency Contacts Ready', desc: 'Have list of existing medications ready for doctor.' },
        ],
        medicines: [],
        preventionTips: ['Manage blood pressure, cholesterol, and diabetes'],
      },
      lifeThreatening: {
        immediateSteps: [
          { step: 1, title: 'Cardiac Arrest / Unresponsive - Call 112 & Start CPR', desc: 'If victim collapses and is not breathing normally, begin immediate Hands-Only CPR!' },
          { step: 2, title: 'Push Hard & Fast in Center of Chest', desc: '100-120 compressions per minute at least 2 inches (5 cm) deep.' },
          { step: 3, title: 'Use AED Defibrillator if Available Nearby', desc: 'Turn on AED and follow voice instructions.' },
          { step: 4, title: 'Continue Compressions Without Pausing', desc: 'Do not stop CPR until emergency paramedics arrive.' },
          { step: 5, title: 'Hospital Emergency Cath Lab Transfer', desc: 'Immediate emergency coronary angioplasty (PCI).' },
        ],
        medicines: [],
        preventionTips: ['Learn CPR certification for family safety'],
      },
    },
    helpVideos: [
      { id: 'v-chest', title: 'How to Recognize and Treat a Heart Attack', duration: '3:15', youtubeId: 'gDwt7dD3awc', speaker: 'British Red Cross' },
      { id: 'v-cpr', title: 'Hands-Only CPR Demonstration', duration: '2:10', youtubeId: 'M4ACYp75mjU', speaker: 'American Heart Association' },
    ],
  },
  {
    id: 'choking',
    name: 'Choking & Airway Obstruction',
    hindiName: 'गले में कुछ अटकना / दम घुटना',
    icon: '🗣️',
    category: 'Critical',
    description: 'Food or foreign object lodged in the windpipe, completely blocking air from reaching the lungs. Minutes count.',
    specialist: 'Emergency Trauma Physician',
    translations: {
      hi: { name: 'गले में कुछ अटकना / दम घुटना', desc: 'सांस की नली में खाना या वस्तु अटकना।' },
      mr: { name: 'घशात अडकणे व श्वास गुदमरणे', desc: 'श्वासनलिकेत अन्नाचा घास अडकल्यास करावयाचे उपाय.' },
      ta: { name: 'மூச்சுத்திணறல்', desc: 'தொண்டையில் உணவு சிக்கி மூச்சு அடைத்தல்.' },
      mwr: { name: 'गळा में फंसणो अर सांस रुकणी', desc: 'घांट में खाणो फंस जावणो अर सांस रुक जावणी।' },
    },
    commonCauses: ['Food swallowed without chewing (meat, nuts, hard candy)', 'Talking or laughing while eating', 'Small toys, coins, or marbles in children'],
    questionsToAsk: ['Can the person speak, cry, or cough loudly? (If yes, it is partial choking)', 'Are they clutching their throat (universal choking sign)?', 'Are their lips or fingernails turning blue?'],
    whatToAvoid: ['Do NOT slap back while person is coughing forcefully (can lodge object deeper)', 'Do NOT do blind finger sweeps into mouth if you cannot see the object', 'Do NOT offer glasses of water while airway is blocked'],
    warningSigns: ['Inability to speak, breathe, or make sound', 'Universal choking sign (hands clutching throat)', 'Silent coughing and skin turning blue (cyanosis)'],
    levels: {
      basic: {
        immediateSteps: [
          { step: 1, title: 'Encourage Forceful Coughing', desc: 'If person can speak or cough loudly, tell them to keep coughing hard.' },
          { step: 2, title: 'Stay With Person Constantly', desc: 'Monitor if cough becomes silent or weak.' },
          { step: 3, title: 'Do NOT Give Water', desc: 'Water can enter lungs when airway is obstructed.' },
          { step: 4, title: 'Check Mouth Only if Visible', desc: 'If object pops into mouth, carefully pluck it out.' },
          { step: 5, title: 'Reassure and Calm the Person', desc: 'Keep them breathing through nose if partially open.' },
        ],
        medicines: [],
        preventionTips: ['Cut food into small bite-sized pieces for toddlers', 'Avoid laughing while chewing'],
      },
      threatening: {
        immediateSteps: [
          { step: 1, title: 'Perform 5 Back Blows', desc: 'Stand behind, lean person forward, strike firmly between shoulder blades with heel of hand.' },
          { step: 2, title: 'Perform 5 Abdominal Thrusts (Heimlich Maneuver)', desc: 'Make a fist above navel, grasp with other hand, pull inward and upward sharply.' },
          { step: 3, title: 'Alternate 5 Back Blows and 5 Abdominal Thrusts', desc: 'Repeat cycle until the object is expelled.' },
          { step: 4, title: 'For Pregnant or Obese Victims: Chest Thrusts', desc: 'Place hands over center of breastbone instead of belly.' },
          { step: 5, title: 'For Infants (< 1 year)', desc: '5 gentle back blows face-down on forearm, followed by 5 two-finger chest presses.' },
        ],
        medicines: [],
        preventionTips: ['Keep small buttons, batteries, and coins out of reach of infants'],
      },
      lifeThreatening: {
        immediateSteps: [
          { step: 1, title: 'Victim Becomes Unconscious - Call 112 / 108 Immediately', desc: 'Lower victim carefully to flat floor and shout for emergency ambulance!' },
          { step: 2, title: 'Begin 30 Chest Compressions', desc: 'Compress center of chest hard and fast to generate air pressure from lungs.' },
          { step: 3, title: 'Look in Mouth Before Giving Breaths', desc: 'Open mouth; if object is clearly seen, hook it out. If not seen, deliver 2 breaths.' },
          { step: 4, title: 'Continue 30 Compressions & 2 Breaths Cycles', desc: 'Keep performing CPR until paramedics take over.' },
          { step: 5, title: 'Mandatory Post-Heimlich Hospital Checkup', desc: 'Rule out internal abdominal or rib injuries.' },
        ],
        medicines: [],
        preventionTips: ['Learn choking certified first-aid training'],
      },
    },
    helpVideos: [
      { id: 'v-chok', title: 'First Aid Training: Choking Adult', speaker: 'St John Ambulance', duration: '2:30', youtubeId: 'HGBBu4zr8sM' },
    ],
  },
  {
    id: 'panic-attack',
    name: 'Panic Attack & Acute Anxiety',
    hindiName: 'घबराहट / पैनिक अटैक',
    icon: '⚡',
    category: 'Mental Health',
    description: 'Sudden episode of intense fear and physical panic symptoms: racing heart, trembling, shortness of breath, and feeling of impending doom.',
    specialist: 'Psychiatrist / Clinical Psychologist',
    translations: {
      hi: { name: 'घबराहट / पैनिक अटैक', desc: 'अचानक दिल की धड़कन तेज होना, सांस फूलना और भारी बेचैनी।' },
      mr: { name: 'पॅनिक अटॅक व भीती', desc: 'अचानक प्रचंड भीती वाटणे आणि छातीत धडधडणे.' },
      ta: { name: 'பயத் தாக்குதல் (பேனிக் அட்டாக்)', desc: 'திடீர் தீவிர பயம் மற்றும் இதயத் துடிப்பு அதிகரிப்பு.' },
      mwr: { name: 'घबराहट अर पैनिक अटैक', desc: 'अचानक जीव घबरावणो, काळजो धड़कणो अर डर लागणो।' },
    },
    commonCauses: ['Severe emotional stress or acute trauma', 'Phobias and social triggers', 'Excessive caffeine, energy drinks, or stimulants', 'Genetic predisposition to anxiety disorders'],
    questionsToAsk: ['Have you experienced this type of sudden panic before?', 'Is there radiating chest pressure to the arm? (If unsure, rule out heart attack first!)', 'Are your hands tingling from hyperventilating?'],
    whatToAvoid: ['Do NOT tell the person "it is all in your head" or to "just snap out of it"', 'Avoid crowded, loud, or overstimulating environments', 'Do NOT consume coffee, energy drinks, or cola'],
    warningSigns: ['Severe crushing chest pain radiating to jaw or left arm with sweating (assume heart attack until proven otherwise)', 'Lips turning blue or patient collapsing unconscious', 'Expressed feelings of self-harm or hopelessness (Call Tele-MANAS 14416 / Kiran 1800-599-0019)'],
    levels: {
      basic: {
        immediateSteps: [
          { step: 1, title: 'Box Breathing (4-4-4-4)', desc: 'Breathe in 4 sec, hold 4 sec, breathe out 4 sec, hold 4 sec. Repeat 5-10 times.' },
          { step: 2, title: '5-4-3-2-1 Sensory Grounding', desc: 'Name 5 things you see, 4 you can touch, 3 you hear, 2 you smell, 1 you taste.' },
          { step: 3, title: 'Splash Cold Water on Face', desc: 'Triggers the mammalian dive reflex to naturally slow down rapid heart rate.' },
          { step: 4, title: 'Reassure Yourself with Calm Self-Talk', desc: 'Remind yourself: "This is a panic attack. It will peak and pass. I am completely safe."' },
          { step: 5, title: 'Progressive Muscle Relaxation', desc: 'Slowly tense and release shoulder and jaw muscles to dissipate adrenaline.' },
        ],
        medicines: [
          { name: 'Chamomile or Peppermint Tea', desc: 'Natural calming herbal remedy.', tag: 'Herbal OTC', prescription: false },
        ],
        preventionTips: ['Practice daily meditation and pranayama (Anulom Vilom)', 'Limit caffeine and maintain regular sleep schedule'],
      },
      threatening: {
        immediateSteps: [
          { step: 1, title: 'Move to a Quiet Space', desc: 'Step away from triggering crowd into an open, airy space.' },
          { step: 2, title: 'Call a Trusted Person', desc: 'Talk to a trusted friend or family member who provides calm grounding.' },
          { step: 3, title: 'Deep Diaphragmatic Breathing', desc: 'Place hand on belly and feel it rise and fall with slow breaths.' },
          { step: 4, title: 'Connect with Mental Health Helpline', desc: 'Call National Tele-MANAS helpline: 14416 or iCall: 9152987821.' },
          { step: 5, title: 'Prescription Medication Under Supervision', desc: 'Alprazolam or Propranolol only if prescribed by psychiatrist.' },
        ],
        medicines: [
          { name: 'Alprazolam (Alprax)', desc: 'Short-term acute anxiety relief under medical supervision only.', tag: 'Adults Only', prescription: true },
          { name: 'Propranolol', desc: 'Reduces physical tremors and palpitations.', tag: 'Adults Only', prescription: true },
        ],
        preventionTips: ['Engage in Cognitive Behavioral Therapy (CBT) with a licensed psychologist'],
      },
      lifeThreatening: {
        immediateSteps: [
          { step: 1, title: 'Call 112 if Chest Pain or Loss of Consciousness Occurs', desc: 'If accompanied by severe chest pressure, radiating arm pain, or fainting, call 112 emergency immediately.' },
          { step: 2, title: 'Emergency Mental Health Crisis (Kiran: 1800-599-0019)', desc: 'If there is risk of self-harm, stay with the person continuously and take to nearest hospital emergency.' },
          { step: 3, title: 'Check Airway and Respiratory Rate', desc: 'Seat upright and loosen collar.' },
          { step: 4, title: 'Remove Any Potentially Dangerous Objects', desc: 'Ensure safe room surroundings.' },
          { step: 5, title: 'Hospital Emergency Psychiatric & Medical Assessment', desc: 'Emergency stabilization in casualty department.' },
        ],
        medicines: [],
        preventionTips: ['Consistent medical follow-up for chronic panic disorder'],
      },
    },
    helpVideos: [
      { id: 'v-pan1', title: 'Having a Panic Attack? Guided Anti-Struggle Technique', speaker: 'Therapy in a Nutshell', duration: '13:06', youtubeId: '2CQpyA485wc' },
      { id: 'v-pan2', title: 'Box Breathing Guided Technique', duration: '4:15', youtubeId: 'tEmt1Znux58', speaker: 'Mindful Healthcare' },
    ],
  },
];
