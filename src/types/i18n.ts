export type SupportedLanguage = 'en' | 'hi' | 'mr' | 'ta' | 'mwr';

export interface LanguageOption {
  code: SupportedLanguage;
  name: string;
  nativeName: string;
  flag: string;
  speechCode: string;
}

export const SUPPORTED_LANGUAGES: LanguageOption[] = [
  { code: 'en', name: 'English', nativeName: 'English', flag: '🇬🇧', speechCode: 'en-IN' },
  { code: 'hi', name: 'Hindi', nativeName: 'हिन्दी', flag: '🇮🇳', speechCode: 'hi-IN' },
  { code: 'mr', name: 'Marathi', nativeName: 'मराठी', flag: '🚩', speechCode: 'mr-IN' },
  { code: 'ta', name: 'Tamil', nativeName: 'தமிழ்', flag: '🪷', speechCode: 'ta-IN' },
  { code: 'mwr', name: 'Marwari', nativeName: 'मारवाड़ी', flag: '🐪', speechCode: 'hi-IN' },
];
