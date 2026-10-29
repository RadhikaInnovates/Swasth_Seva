export interface MedicalProfile {
  fullName: string;
  emailOrPhone: string;
  age?: number;
  dateOfBirth?: string;
  gender?: 'Male' | 'Female' | 'Other' | 'Prefer not to say';
  heightCm?: number;
  heightFeet?: number;
  heightInches?: number;
  heightUnit: 'cm' | 'ft';
  weight?: number;
  weightUnit: 'kg' | 'lb';
  allergies: string[];
  medicalConditions: string[];
  currentMedications: string[];
  emergencyContactName?: string;
  emergencyContactPhone?: string;
  emergencyContactRelation?: string;
  consentGiven: boolean;
  consentTimestamp?: string;
}

export interface UserSession {
  id: string;
  emailOrPhone: string;
  fullName: string;
  token: string;
  profile: MedicalProfile;
}
