export type ProblemCategory =
  | 'Ear, Nose & Throat'
  | 'Head & Neurological'
  | 'Digestive System'
  | 'Menstrual & Reproductive'
  | 'Bones & Joints'
  | 'Skin & Hair'
  | 'Minor Injuries'
  | 'Critical'
  | 'Mental Health'
  | 'General Health';

export type EmergencyLevel = 'basic' | 'threatening' | 'lifeThreatening';

export interface MedicineRecommendation {
  name: string;
  desc: string;
  tag: string;
  prescription?: boolean;
}

export interface ImmediateStep {
  step: number;
  title: string;
  desc: string;
}

export interface LevelContent {
  immediateSteps: ImmediateStep[];
  medicines: MedicineRecommendation[];
  preventionTips: string[];
  exercises?: string[];
}

export interface HelpVideo {
  id: string;
  title: string;
  duration: string;
  youtubeId: string;
  speaker?: string;
}

export interface HealthProblem {
  id: string;
  name: string;
  hindiName: string;
  icon: string;
  category: ProblemCategory;
  description: string;
  commonCauses: string[];
  questionsToAsk?: string[];
  whatToAvoid?: string[];
  warningSigns?: string[];
  specialist?: string;
  translations?: Record<string, { name: string; desc?: string }>;
  levels: {
    basic: LevelContent;
    threatening: LevelContent;
    lifeThreatening: LevelContent;
  };
  helpVideos: HelpVideo[];
}

export interface EmergencyContact {
  id: string;
  name: string;
  phone: string;
  relationship: string;
}

export interface UserLocation {
  lat: number;
  lng: number;
  accuracy: number;
  address?: string;
  timestamp: number;
}

export interface TriageResult {
  urgency: 'RED' | 'YELLOW' | 'GREEN';
  urgencyLevelLabel: string;
  detectedLanguage: string;
  triageSummary: string;
  immediateSteps: string[];
  whatToAvoid: string[];
  emergencyAction: string;
  suggestedMedicinesOrRemedies?: string[];
  isLifeThreatening: boolean;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  text: string;
  timestamp: number;
  urgency?: 'RED' | 'YELLOW' | 'GREEN';
}
