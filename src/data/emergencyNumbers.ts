export interface EmergencyServiceNumber {
  id: string;
  name: string;
  hindiName: string;
  number: string;
  category: 'General' | 'Police' | 'Medical' | 'Specialized' | 'Helpline';
  description: string;
  icon: string;
}

export const INDIAN_EMERGENCY_NUMBERS: EmergencyServiceNumber[] = [
  {
    id: 'national',
    name: 'National Emergency',
    hindiName: 'राष्ट्रीय आपातकालीन सेवा',
    number: '112',
    category: 'General',
    description: 'All-in-one emergency helpline for Police, Fire, and Ambulance across India.',
    icon: '🆘',
  },
  {
    id: 'ambulance',
    name: 'Ambulance',
    hindiName: 'एम्बुलेंस सेवा',
    number: '108',
    category: 'Medical',
    description: 'Free emergency medical ambulance & trauma care dispatch service.',
    icon: '🚑',
  },
  {
    id: 'police',
    name: 'Police',
    hindiName: 'पुलिस नियंत्रण कक्ष',
    number: '100',
    category: 'Police',
    description: 'Immediate police response, crime reporting, and distress assistance.',
    icon: '🚓',
  },
  {
    id: 'fire',
    name: 'Fire',
    hindiName: 'दमकल सेवा',
    number: '101',
    category: 'General',
    description: 'Fire brigade, rescue operations, building collapse, and hazardous leaks.',
    icon: '🚒',
  },
  {
    id: 'women',
    name: 'Women Helpline',
    hindiName: 'महिला हेल्पलाइन',
    number: '1091',
    category: 'Helpline',
    description: '24x7 emergency response and counseling for women in distress.',
    icon: '🛡️',
  },
  {
    id: 'child',
    name: 'Child Helpline',
    hindiName: 'बाल सहायता केंद्र',
    number: '1098',
    category: 'Helpline',
    description: 'Emergency assistance, rescue, and care for children in crisis.',
    icon: '👶',
  },
  {
    id: 'poison',
    name: 'Poison Control',
    hindiName: 'विषाक्तता नियंत्रण केंद्र',
    number: '1800-11-6117',
    category: 'Medical',
    description: 'AIIMS National Poison Information Centre for chemical, drug, and plant poisoning.',
    icon: '☣️',
  },
  {
    id: 'mental-health',
    name: 'Mental Health (iCall)',
    hindiName: 'मानसिक स्वास्थ्य परामर्श',
    number: '9152987821',
    category: 'Specialized',
    description: 'Psychological distress, panic support, and crisis counseling helpline.',
    icon: '🧠',
  },
  {
    id: 'tele-manas',
    name: 'Tele-MANAS (Mental Health Govt)',
    hindiName: 'टेली-मानस राष्ट्रीय हेल्पलाइन',
    number: '14416',
    category: 'Specialized',
    description: 'Government of India round-the-clock free mental health tele-consultation.',
    icon: '📞',
  },
  {
    id: 'senior',
    name: 'Senior Citizen Helpline',
    hindiName: 'वरिष्ठ नागरिक हेल्पलाइन',
    number: '14567',
    category: 'Helpline',
    description: 'Elderline for elder abuse, abandonment, and medical aid.',
    icon: '🧓',
  },
  {
    id: 'disaster',
    name: 'Disaster Management (NDRF)',
    hindiName: 'आपदा प्रबंधन हेल्पलाइन',
    number: '1078',
    category: 'General',
    description: 'Floods, earthquakes, landslides, and national natural disasters.',
    icon: '⚠️',
  },
  {
    id: 'railway',
    name: 'Railway Emergency & Security',
    hindiName: 'रेलवे सुरक्षा हेल्पलाइन',
    number: '139',
    category: 'General',
    description: 'Indian Railways train security, passenger medical aid on trains.',
    icon: '🚆',
  },
];
