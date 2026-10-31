
<h2 align="center">SwasthSeva – Emergency Assistance & Health Companion</h2>

<p align="center">
  <img src="<img width="1917" height="852" alt="image" src="https://github.com/user-attachments/assets/dde5be87-465f-4c2c-8383-3dc406aa6446" />
"
       alt="SwasthSeva Demo"
       width="850"/>
</p>

About Our Project

We developed SwasthSeva as a health-care companion prototype that brings common health information, AI-assisted health guidance, preventive-care resources, mental-wellness access, and emergency-support options together in one application.

We wanted to make basic health information easier to find and understand. Instead of switching between different sources for common health concerns, wellness tips, and emergency contact options, users can explore these sections through one organized interface.

Our application is designed with a simple dashboard, clear categories, and multilingual interaction in mind. It is intended to support health awareness and help users understand possible next steps. It is not a medical diagnosis tool and does not replace doctors or professional emergency services.
The Problem We Aim to Solve
When people experience a common health concern, they may not know where to find understandable information or what kind of help to seek. Health information can be scattered, difficult to understand, or unavailable in a language they are comfortable with. Emergency options should also be easy to locate when time matters.

Through SwasthSeva, we aim to:
- Bring common health information into one accessible platform.
- Make it easier to explore symptoms and related health topics.
- Provide an AI-assistant interface for health-related questions.
- Encourage preventive care and everyday wellness.
- Keep emergency-support options visible and easy to reach.
- Make the experience more accessible through multiple languages.

What We Have Built

We have designed and developed a prototype with the following major sections:

1. Home Dashboard
We created a central dashboard that gives users quick access to the main areas of the application.

It includes:
- Search for symptoms or health conditions.
- Shortcuts to common health problems.
- Emergency-help access.
- Prevention and daily wellness tips.
- Mental-health entry point.
- Quick access to the AI health assistant.
How it helps: Users can find the section they need without navigating through multiple unrelated pages.

2. AI Health Assistant – SwasthSeva AI Saathi
We included an AI-assistant interface where users can ask health-related questions and explore general health information.

The interface is designed with multilingual support in mind, including:
- English
- Hindi
- Marathi
- Tamil
- Marwari
We intend this assistant to make health information easier to ask for and understand, especially for users who are more comfortable with regional languages.

The project configuration includes the Google Gemini API package and a GEMINI_API_KEY environment-variable example. The AI service must be configured with a valid key to make the relevant API calls.

Important: AI responses can be incomplete or inaccurate. Users should not rely on them as a diagnosis or as a replacement for professional medical advice.

3. Common Health Problems and Symptom Guidance
We organized common health topics into dedicated sections so users can explore information relevant to their concerns.

Examples shown in the prototype include:
- Tonsillitis and sore throat
- Earache and ear infection
- Nasal congestion and sinus pain
- Headache and migraine
- Dizziness and vertigo
- Acidity, GERD, and heartburn
- Stomach ache and abdominal cramps
- Diarrhea and loose motions
- Menstrual cramps
- Back pain and lower-back strain
The condition-information experience is designed to organize content such as:
- Overview of the condition
- Possible causes
- Severity-related guidance
- Self-care information
- Prevention tips
- Frequently asked questions and next steps
We have used three broad levels to organize the guidance:
- Mild / Self-Care
- Urgent Medical Attention
- Life-Threatening Emergency
These categories are intended to help users understand general levels of concern. They are not a clinically validated diagnosis or a substitute for professional triage.

4. Emergency Assistance and SOS Interface
We designed an emergency-support section to make important contact options easier to find.

The prototype displays emergency shortcuts such as:
- Police – 100
- Ambulance – 108
- Fire service – 101
- National emergency – 112
The interface also includes an SOS flow concept with options related to:
- Emergency calling
- Alerting a saved emergency contact
- GPS location access
- SMS and WhatsApp alerts
- Checking or refreshing location information
Please note: These are the emergency options and interaction flows represented in our prototype. Actual calling, message delivery, contact alerts, and GPS sharing depend on device permissions, browser support, service integration, and testing. Users should contact local emergency services directly in a real emergency and should not delay urgent care while using the app.

5. Prevention Tips and Daily Wellness
We added a learning and prevention area to encourage healthy everyday habits.

Topics represented in the prototype include:
- Staying hydrated
- Maintaining hand hygiene
- Regular physical activity
- Healthy sleep habits
- Balanced nutrition
How it helps: We want users to explore preventive health information, not just information about illnesses.

6. Mental Health and Well-being
We included a dedicated Mental Health entry point on the dashboard so mental wellness is visible alongside physical-health information.

This section can be expanded with reviewed educational resources and appropriate support information as the project develops.

7. User Profile and Health Details
We designed an account/profile flow with optional fields that can support a more personalized experience.

The profile interface includes fields for:
- Age and gender preference
- Height and weight
- Known allergies
- Existing health conditions
- Current medications
- Emergency contact name and phone number
These details are intended to provide context for future personalization. Any real collection or storage of health information must be protected and handled with clear user consent.

8. Multilingual and User-Friendly Interface
We designed the experience to support multiple languages and make health information easier to access for a wider range of users.

The interface uses:
- Clearly separated navigation sections
- Category cards and icons
- Visual severity indicators
- Expandable information areas
- Prominent emergency entry points
- Display and language controls

How Our App Works
The intended user journey through SwasthSeva is:
1. Open the app: The user lands on the Home Dashboard.
2. Find a health topic: The user searches for a symptom or browses the common-problems section.
3. Explore information: The user views the selected topic, its overview, possible causes, and available guidance.
4. Ask the AI assistant: The user can enter a health-related question through the assistant interface.
5. Learn preventive habits: The user visits the Learn section for daily wellness tips.
6. Access emergency options: The user opens Emergency Help to view the available emergency shortcuts and SOS-related interface.
7. Manage profile details: The user can explore the optional profile fields intended for future personalized support.

Technology Stack

We have used the following technologies in our project:

HTML - Structuring the application interface
CSS - Styling and designing the user interface
Python - Backend logic and application functionality
GitHub - Source code management and version control

Development Approach
We organized our project to provide a user-friendly healthcare experience through a clean interface, structured health information, AI-assisted guidance, and emergency-support features.

Current Project Status
SwasthSeva is a prototype / demonstration project. The repository and interface show the direction and main user experience we are building. Some features may need further integration, validation, or device-specific testing before they can be considered production-ready.

In particular, we need to verify:
- AI responses and safety handling.
- Accuracy and medical review of health content.
- Emergency calling and message-delivery behavior.
- GPS permissions and location-sharing behavior.
- Secure handling of profile and health information.
- Responsive behavior and accessibility across devices.

Future Scope
We plan to improve SwasthSeva further through:
1. Enhanced AI assistance: Improve the assistant experience with reliable integration, clear limitations, and safe escalation guidance.
2. Medically reviewed information: Review health topics and severity guidance with qualified professionals.
3. Verified emergency workflows: Test emergency calling, alerts, and location sharing on supported devices.
4. Secure user profiles: Add appropriate authentication, consent, and protected health-data handling.
5. Better accessibility: Improve keyboard support, screen-reader compatibility, contrast, and responsive layouts.
6. Language improvements: Review translations and health terminology across supported languages.
7. Testing: Add unit, integration, and usability tests, especially for safety-related features.

Safety and Privacy Disclaimer
SwasthSeva is intended for general health awareness and informational support. It does not provide a confirmed medical diagnosis and must not replace a qualified healthcare professional.
- Do not delay emergency care to use this application.
- Do not make medication decisions based only on AI-generated responses.
- Seek professional medical help for concerning or worsening symptoms.
- Emergency calls and location sharing should require clear user action and appropriate permissions.
- Health details and emergency-contact information must be handled securely and with user consent.

Our Goal
With SwasthSeva, we aim to make everyday health information easier to access, promote preventive awareness, and bring useful health and emergency-support options together in one user-friendly platform.

We see this project as a step toward a more accessible and supportive digital health experience.
