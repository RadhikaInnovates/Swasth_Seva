export interface PreventionTopic {
  id: string;
  title: string;
  hindiTitle: string;
  summary: string;
  icon: string;
  details: string[];
}

export const PREVENTION_TIPS: PreventionTopic[] = [
  {
    id: 'stay-hydrated',
    title: 'Stay Hydrated',
    hindiTitle: 'पर्याप्त पानी पिएं',
    summary: 'Drink at least 8 glasses of water daily. Add ORS during summers or after exercise.',
    icon: '💧',
    details: [
      'Carry a reusable water bottle everywhere you travel.',
      'Drink fresh coconut water or nimbu pani for natural electrolytes.',
      'Avoid excessive caffeinated coffee, tea, or carbonated energy drinks.',
      'During intense heatwaves or loose motions, drink WHO-formula ORS solution.',
      'Check urine color: light pale yellow indicates healthy hydration.',
    ],
  },
  {
    id: 'hand-hygiene',
    title: 'Hand Hygiene',
    hindiTitle: 'हाथों की स्वच्छता',
    summary: 'Wash hands for 20 seconds with soap before eating and after using the restroom.',
    icon: '🧼',
    details: [
      'Scrub backs of hands, between fingers, and under fingernails.',
      'Always wash hands after returning home from public transport or markets.',
      'Keep alcohol-based hand sanitizer (60%+ alcohol) handy when water is unavailable.',
      'Teach children proper 6-step hand washing technique before school snacks.',
    ],
  },
  {
    id: 'daily-exercise',
    title: 'Daily Exercise',
    hindiTitle: 'नियमित व्यायाम',
    summary: '30 minutes of moderate exercise daily reduces risk of heart disease by 30-40%.',
    icon: '🏃',
    details: [
      'Brisk walking, cycling, swimming, or brisk yoga Surya Namaskar.',
      'Always warm up for 5 minutes and stretch after workout.',
      'Break up prolonged sedentary sitting every 45 minutes.',
      'Gradually build stamina; consult doctor before starting strenuous regimes if over 45.',
    ],
  },
  {
    id: 'sleep-well',
    title: 'Sleep Well',
    hindiTitle: 'गुणवत्तापूर्ण नींद',
    summary: '7-8 hours of quality sleep strengthens immunity and mental health.',
    icon: '😴',
    details: [
      'Maintain fixed sleep and wake-up times even on weekends.',
      'Turn off smartphone, laptop, and TV screens at least 45 minutes before bed.',
      'Ensure the bedroom is pitch dark, cool, and quiet.',
      'Avoid heavy late-night dinners, caffeine, and alcohol before sleeping.',
    ],
  },
  {
    id: 'balanced-diet',
    title: 'Balanced Diet',
    hindiTitle: 'संतुलित आहार',
    summary: 'Include dal, sabzi, roti, fruits, and curd in daily meals for complete nutrition.',
    icon: '🥗',
    details: [
      'Eat seasonal local vegetables, whole pulses, and whole grains.',
      'Limit deep-fried street snacks, packaged junk food, and excess refined sugar.',
      'Cut down daily salt intake to under 5 grams to prevent high blood pressure.',
      'Include fresh curd (probiotics) and seasonal fruits for gut immunity.',
    ],
  },
  {
    id: 'mental-wellness',
    title: 'Mental Wellness',
    hindiTitle: 'मानसिक संतुलन और ध्यान',
    summary: 'Practice 10 minutes of meditation or pranayam daily to manage stress.',
    icon: '🧘',
    details: [
      'Practice deep belly breathing (Anulom Vilom / Bhramari pranayam) morning and night.',
      'Talk openly with trusted friends, mentors, or family when feeling overwhelmed.',
      'Spend 15-20 minutes daily in outdoor natural daylight and fresh air.',
      'Reach out to professional helplines (Tele-MANAS 14416 or iCall 9152987821) without hesitation.',
    ],
  },
  {
    id: 'regular-checkups',
    title: 'Regular Checkups',
    hindiTitle: 'नियमित स्वास्थ्य जांच',
    summary: 'Get annual health checkups to detect conditions early.',
    icon: '🩺',
    details: [
      'Measure Blood Pressure (BP) and fasting blood glucose every 6-12 months.',
      'Annual lipid profile, liver, and kidney function tests for adults over 30.',
      'Eye and dental checkup every 6 months.',
      'Keep a digital copy of past medical prescriptions and lab reports accessible on phone.',
    ],
  },
  {
    id: 'first-aid-kit',
    title: 'First Aid Kit Readiness',
    hindiTitle: 'प्राथमिक चिकित्सा किट',
    summary: 'Keep a stocked first-aid kit ready at home, in car, and during travel.',
    icon: '🩹',
    details: [
      'Include: sterile gauze pads, adhesive bandages (Hansaplast), micropore tape, scissor.',
      'Topical: Betadine ointment, Silver Sulfadiazine (Burnol), Calamine lotion.',
      'Medicines: Paracetamol, ORS packets, antacids, Cetirizine, and personal prescription backup.',
      'Check expiry dates of all medications every 6 months and replace promptly.',
    ],
  },
];
