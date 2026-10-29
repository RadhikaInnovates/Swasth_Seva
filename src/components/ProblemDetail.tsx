import React, { useState } from 'react';
import {
  ArrowLeft,
  Phone,
  Share2,
  AlertTriangle,
  Play,
  ShieldCheck,
  Pill,
  Sparkles,
  ChevronDown,
  ChevronUp,
  UserCheck,
  MapPin,
  CheckCircle2,
  Info,
  Bot,
  HelpCircle,
  XCircle,
  Stethoscope,
  Heart,
  Shield,
  ShieldAlert,
  ExternalLink,
} from 'lucide-react';
import { HealthProblem, EmergencyLevel } from '../types';
import {
  directCall,
  shareViaWhatsApp,
  getCurrentLocation,
  generateEmergencyMessage,
  getSavedContacts,
} from '../utils/emergency';
import { useLanguage } from '../context/LanguageContext';
import { useAuth } from '../context/AuthContext';
import { FloatingAiDoctorButton } from './FloatingAiDoctorButton';

interface ProblemDetailProps {
  problem: HealthProblem;
  onBack: () => void;
  onOpenSos: () => void;
  onOpenAiWithContext: (diseaseName: string) => void;
}

export const ProblemDetail: React.FC<ProblemDetailProps> = ({
  problem,
  onBack,
  onOpenSos,
  onOpenAiWithContext,
}) => {
  const { t, language } = useLanguage();
  const { user } = useAuth();

  const [level, setLevel] = useState<EmergencyLevel>('basic');
  const [activeTab, setActiveTab] = useState<'remedies' | 'medicines' | 'prevention' | 'questions'>('remedies');
  const [activeVideoId, setActiveVideoId] = useState<string | null>(
    problem.helpVideos.length > 0 ? problem.helpVideos[0].youtubeId : null
  );
  const [expandedStep, setExpandedStep] = useState<number | null>(1);
  const [isSharingLoc, setIsSharingLoc] = useState(false);

  const currentLevelData = problem.levels[level];

  // Localized problem name
  const localizedName = problem.translations?.[language]?.name || problem.name;
  const localizedDesc = problem.translations?.[language]?.desc || problem.description;

  const handleShareLocationWithProblem = async () => {
    setIsSharingLoc(true);
    try {
      const loc = await getCurrentLocation().catch(() => null);
      const msg = generateEmergencyMessage(
        loc,
        `Emergency Medical Condition: ${localizedName} (${problem.name}). Need urgent help!`
      );
      const contacts = getSavedContacts();
      const primaryPhone = contacts.length > 0 ? contacts[0].phone : undefined;
      shareViaWhatsApp(msg, primaryPhone);
    } finally {
      setIsSharingLoc(false);
    }
  };

  const handleCallSavedContact = () => {
    const contacts = getSavedContacts();
    if (contacts.length > 0 && contacts[0].phone) {
      directCall(contacts[0].phone);
    } else {
      directCall('112');
    }
  };

  // Check for relevant user allergies or conditions
  const userAllergies = user?.profile?.allergies || [];
  const userConditions = user?.profile?.medicalConditions || [];

  return (
    <div className="min-h-screen bg-slate-100/70 dark:bg-slate-950 pb-28 text-slate-900 dark:text-slate-100 transition-colors">
      {/* Top Header Bar */}
      <div className="bg-sky-600 dark:bg-sky-700 text-white shadow-sm sticky top-0 z-30">
        <div className="max-w-4xl mx-auto px-4 py-3 flex items-center justify-between">
          <button
            onClick={onBack}
            className="flex items-center gap-1.5 p-1.5 -ml-1 rounded-xl hover:bg-sky-700/80 active:scale-95 transition-all text-white font-bold text-xs sm:text-sm cursor-pointer"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Back</span>
          </button>
          <div className="flex items-center gap-2 text-center sm:text-left min-w-0 px-2">
            <span className="text-2xl shrink-0">{problem.icon}</span>
            <div className="truncate">
              <h2 className="font-bold text-sm sm:text-base leading-tight truncate">
                {localizedName}
              </h2>
              <p className="text-[10px] sm:text-[11px] text-sky-100 font-medium truncate">
                {problem.category}
              </p>
            </div>
          </div>
          <button
            onClick={onOpenSos}
            className="bg-red-500 hover:bg-red-600 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-xs flex items-center gap-1 active:scale-95 transition-all shrink-0 cursor-pointer"
          >
            <span>SOS</span>
          </button>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 pt-4 space-y-4">
        {/* Personalization Banner if user has profile */}
        {user && (userAllergies.length > 0 || userConditions.length > 0) && (
          <div className="p-3.5 bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800 rounded-2xl space-y-1.5">
            <div className="flex items-center gap-2 text-xs font-bold text-amber-900 dark:text-amber-200">
              <Shield className="w-4 h-4 text-amber-600 shrink-0" />
              <span>{t('personalizationBanner')} ({user.fullName})</span>
            </div>
            {userAllergies.length > 0 && (
              <p className="text-xs text-amber-800 dark:text-amber-300 pl-6">
                {t('allergyAlert')} <strong>{userAllergies.join(', ')}</strong>. Do not consume contraindicated medications.
              </p>
            )}
            {userConditions.length > 0 && (
              <p className="text-xs text-amber-800 dark:text-amber-300 pl-6">
                {t('conditionPrecaution')} <strong>{userConditions.join(', ')}</strong>. Consult your treating specialist before new remedies.
              </p>
            )}
          </div>
        )}

        {/* Plain Language Description & Specialist Card */}
        <div className="bg-white dark:bg-slate-900 p-4 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-xs space-y-3">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 dark:border-slate-800 pb-2">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                Clinical Overview
              </span>
              <span className="text-[10px] bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 px-2 py-0.5 rounded-full font-medium">
                {problem.category}
              </span>
            </div>
            {problem.specialist && (
              <div className="flex items-center gap-1.5 text-xs text-sky-700 dark:text-sky-400 font-semibold">
                <Stethoscope className="w-3.5 h-3.5" />
                <span>{problem.specialist}</span>
              </div>
            )}
          </div>

          <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-200 leading-relaxed font-medium">
            {localizedDesc}
          </p>

          {/* Common Causes Tags */}
          <div>
            <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">
              {t('commonCauses')}:
            </div>
            <div className="flex flex-wrap gap-1.5">
              {problem.commonCauses.map((cause, idx) => (
                <span
                  key={idx}
                  className="text-xs bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-medium px-2.5 py-1 rounded-lg border border-slate-200/60 dark:border-slate-700"
                >
                  {cause}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* SELECT EMERGENCY SEVERITY LEVEL */}
        <div className="bg-white dark:bg-slate-900 p-4 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-xs space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
              {t('severityLevel')}
            </span>
            <span className="text-[11px] text-slate-400">
              Guidance, not diagnostic confirmation
            </span>
          </div>

          <div className="grid grid-cols-3 gap-2">
            <button
              onClick={() => setLevel('basic')}
              className={`py-2.5 px-1 text-xs sm:text-sm font-bold rounded-2xl border transition-all cursor-pointer ${
                level === 'basic'
                  ? 'bg-emerald-600 text-white border-emerald-600 shadow-xs ring-2 ring-emerald-200 dark:ring-emerald-900'
                  : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700'
              }`}
            >
              {t('severityMild')}
            </button>
            <button
              onClick={() => setLevel('threatening')}
              className={`py-2.5 px-1 text-xs sm:text-sm font-bold rounded-2xl border transition-all cursor-pointer ${
                level === 'threatening'
                  ? 'bg-orange-600 text-white border-orange-600 shadow-xs ring-2 ring-orange-200 dark:ring-orange-900'
                  : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700'
              }`}
            >
              {t('severityUrgent')}
            </button>
            <button
              onClick={() => setLevel('lifeThreatening')}
              className={`py-2.5 px-1 text-xs sm:text-sm font-bold rounded-2xl border transition-all cursor-pointer ${
                level === 'lifeThreatening'
                  ? 'bg-red-600 text-white border-red-600 shadow-xs ring-2 ring-red-200 dark:ring-red-900'
                  : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700'
              }`}
            >
              {t('severityCritical')}
            </button>
          </div>

          {/* Life Threatening Emergency Warning Banner */}
          {level === 'lifeThreatening' && (
            <div className="p-3.5 bg-red-600 text-white rounded-2xl space-y-2 animate-pulse">
              <div className="flex items-center gap-2 font-black text-sm">
                <ShieldAlert className="w-5 h-5" />
                <span>IMMEDIATE EMERGENCY WARNING</span>
              </div>
              <p className="text-xs text-red-100 leading-snug">
                These symptoms indicate a life-threatening emergency. Do not wait for voice processing, AI answers, or appointments. Call 112 or 108 immediately!
              </p>
              <div className="flex gap-2 pt-1">
                <button
                  onClick={() => directCall('112')}
                  className="bg-white text-red-700 text-xs font-bold px-4 py-2 rounded-xl shadow-xs"
                >
                  Call 112 Now
                </button>
                <button
                  onClick={() => directCall('108')}
                  className="bg-red-800 text-white text-xs font-bold px-4 py-2 rounded-xl"
                >
                  Call 108 Ambulance
                </button>
              </div>
            </div>
          )}

          {/* Subtabs: Remedies | Medicines | Prevention | Questions */}
          <div className="flex border-b border-slate-200 dark:border-slate-800 pt-2 overflow-x-auto no-scrollbar">
            <button
              onClick={() => setActiveTab('remedies')}
              className={`pb-2.5 px-3 text-xs sm:text-sm font-bold text-center border-b-2 transition-colors flex items-center justify-center gap-1.5 shrink-0 cursor-pointer ${
                activeTab === 'remedies'
                  ? 'border-sky-600 text-sky-600 dark:text-sky-400'
                  : 'border-transparent text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
              }`}
            >
              <ShieldCheck className="w-4 h-4" />
              <span>{t('remediesTab')}</span>
            </button>

            <button
              onClick={() => setActiveTab('medicines')}
              className={`pb-2.5 px-3 text-xs sm:text-sm font-bold text-center border-b-2 transition-colors flex items-center justify-center gap-1.5 shrink-0 cursor-pointer ${
                activeTab === 'medicines'
                  ? 'border-sky-600 text-sky-600 dark:text-sky-400'
                  : 'border-transparent text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
              }`}
            >
              <Pill className="w-4 h-4" />
              <span>{t('medicinesTab')}</span>
            </button>

            <button
              onClick={() => setActiveTab('prevention')}
              className={`pb-2.5 px-3 text-xs sm:text-sm font-bold text-center border-b-2 transition-colors flex items-center justify-center gap-1.5 shrink-0 cursor-pointer ${
                activeTab === 'prevention'
                  ? 'border-sky-600 text-sky-600 dark:text-sky-400'
                  : 'border-transparent text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
              }`}
            >
              <Sparkles className="w-4 h-4" />
              <span>{t('preventionTab')}</span>
            </button>

            <button
              onClick={() => setActiveTab('questions')}
              className={`pb-2.5 px-3 text-xs sm:text-sm font-bold text-center border-b-2 transition-colors flex items-center justify-center gap-1.5 shrink-0 cursor-pointer ${
                activeTab === 'questions'
                  ? 'border-sky-600 text-sky-600 dark:text-sky-400'
                  : 'border-transparent text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
              }`}
            >
              <HelpCircle className="w-4 h-4" />
              <span>Questions</span>
            </button>
          </div>

          {/* Tab 1: Remedies -> Immediate Steps */}
          {activeTab === 'remedies' && (
            <div className="pt-2 space-y-2.5">
              <div className="flex items-center gap-1.5 text-xs font-bold text-slate-800 dark:text-slate-200">
                <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                <span>Immediate Action Steps</span>
              </div>
              <div className="space-y-2">
                {currentLevelData.immediateSteps.map((step) => {
                  const isExpanded = expandedStep === step.step;
                  return (
                    <div
                      key={step.step}
                      className="border border-slate-200/90 dark:border-slate-800 rounded-2xl overflow-hidden bg-slate-50/50 dark:bg-slate-800/40 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
                    >
                      <button
                        onClick={() => setExpandedStep(isExpanded ? null : step.step)}
                        className="w-full p-3 text-left flex items-center justify-between gap-3 cursor-pointer"
                      >
                        <div className="flex items-center gap-2.5">
                          <span className="w-6 h-6 rounded-full bg-sky-100 dark:bg-sky-950/80 text-sky-800 dark:text-sky-300 font-bold text-xs flex items-center justify-center shrink-0">
                            {step.step}
                          </span>
                          <span className="font-semibold text-slate-800 dark:text-slate-200 text-xs sm:text-sm">
                            {step.title}
                          </span>
                        </div>
                        {isExpanded ? (
                          <ChevronUp className="w-4 h-4 text-slate-400" />
                        ) : (
                          <ChevronDown className="w-4 h-4 text-slate-400" />
                        )}
                      </button>
                      {isExpanded && (
                        <div className="px-3.5 pb-3.5 pt-0 text-xs text-slate-600 dark:text-slate-300 leading-relaxed border-t border-slate-100 dark:border-slate-800">
                          {step.desc}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>

              {/* What NOT to do Section */}
              {problem.whatToAvoid && problem.whatToAvoid.length > 0 && (
                <div className="mt-3 p-3.5 bg-red-50/80 dark:bg-red-950/40 rounded-2xl border border-red-200 dark:border-red-900 space-y-1.5">
                  <div className="text-xs font-bold text-red-900 dark:text-red-200 flex items-center gap-1.5">
                    <XCircle className="w-4 h-4 text-red-600" />
                    <span>{t('whatNotToDo')}:</span>
                  </div>
                  <div className="space-y-1 pl-5">
                    {problem.whatToAvoid.map((item, idx) => (
                      <p key={idx} className="text-xs text-red-800 dark:text-red-300 list-disc">
                        • {item}
                      </p>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Tab 2: Medicines */}
          {activeTab === 'medicines' && (
            <div className="pt-2 space-y-3">
              <div className="flex items-center gap-1.5 text-xs font-bold text-slate-800 dark:text-slate-200">
                <Pill className="w-4 h-4 text-sky-600" />
                <span>{t('medicinesTab')}</span>
              </div>

              {currentLevelData.medicines.length > 0 ? (
                <div className="space-y-2.5">
                  {currentLevelData.medicines.map((med, idx) => (
                    <div
                      key={idx}
                      className="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-2xl border border-slate-200 dark:border-slate-700 space-y-1.5"
                    >
                      <div className="flex items-start justify-between gap-2">
                        <h4 className="font-bold text-xs sm:text-sm text-slate-800 dark:text-slate-100">
                          {med.name}
                        </h4>
                        <div className="flex items-center gap-1">
                          <span className="text-[10px] font-semibold bg-sky-100 dark:bg-sky-950/80 text-sky-700 dark:text-sky-300 px-2 py-0.5 rounded-full">
                            {med.tag}
                          </span>
                          {med.prescription && (
                            <span className="text-[10px] font-semibold bg-amber-100 dark:bg-amber-950/80 text-amber-800 dark:text-amber-300 px-2 py-0.5 rounded-full">
                              Rx Required
                            </span>
                          )}
                        </div>
                      </div>
                      <p className="text-xs text-slate-600 dark:text-slate-300">{med.desc}</p>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="p-4 bg-amber-50 dark:bg-amber-950/40 rounded-2xl border border-amber-200 dark:border-amber-800 text-amber-900 dark:text-amber-200 text-xs space-y-1">
                  <p className="font-bold">⚠️ Hospital Emergency - No self-medication</p>
                  <p>
                    For this critical level, do not administer arbitrary oral medicines. Immediate hospital emergency assessment is required.
                  </p>
                </div>
              )}

              <div className="p-3 bg-amber-50/80 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800 rounded-2xl text-slate-700 dark:text-slate-300 text-[11px] leading-relaxed flex items-start gap-2">
                <Info className="w-4 h-4 text-amber-700 dark:text-amber-400 shrink-0 mt-0.5" />
                <span>
                  <strong>Important Clinical Safeguard:</strong> These medicines are commonly recommended for first-aid. Always consult a licensed physician before use, especially for children, pregnant women, and patients with known allergies.
                </span>
              </div>
            </div>
          )}

          {/* Tab 3: Prevention */}
          {activeTab === 'prevention' && (
            <div className="pt-2 space-y-4">
              <div>
                <div className="text-xs font-bold text-slate-800 dark:text-slate-200 mb-2">
                  Prevention Tips
                </div>
                <div className="space-y-1.5">
                  {currentLevelData.preventionTips.map((tip, idx) => (
                    <div key={idx} className="flex items-start gap-2 text-xs text-slate-700 dark:text-slate-300">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <span>{tip}</span>
                    </div>
                  ))}
                </div>
              </div>

              {currentLevelData.exercises && currentLevelData.exercises.length > 0 && (
                <div>
                  <div className="text-xs font-bold text-slate-800 dark:text-slate-200 mb-2">
                    Helpful Physical & Breathing Exercises
                  </div>
                  <div className="space-y-1.5">
                    {currentLevelData.exercises.map((ex, idx) => (
                      <div
                        key={idx}
                        className="p-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs font-medium text-slate-800 dark:text-slate-200 flex items-center gap-2"
                      >
                        <Sparkles className="w-3.5 h-3.5 text-sky-600 shrink-0" />
                        <span>{ex}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Tab 4: Questions to Ask */}
          {activeTab === 'questions' && (
            <div className="pt-2 space-y-3">
              <div className="text-xs font-bold text-slate-800 dark:text-slate-200">
                {t('questionsToAsk')}:
              </div>
              {problem.questionsToAsk && problem.questionsToAsk.length > 0 ? (
                <div className="space-y-2">
                  {problem.questionsToAsk.map((q, idx) => (
                    <div
                      key={idx}
                      className="p-3 bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 rounded-2xl text-xs text-slate-700 dark:text-slate-300 flex items-start gap-2.5"
                    >
                      <HelpCircle className="w-4 h-4 text-sky-600 shrink-0 mt-0.5" />
                      <span>{q}</span>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-xs text-slate-400">Standard clinical questions available in AI chat.</p>
              )}

              {/* Red flag warnings */}
              {problem.warningSigns && problem.warningSigns.length > 0 && (
                <div className="mt-3 p-3.5 bg-red-50 dark:bg-red-950/40 rounded-2xl border border-red-200 dark:border-red-900 space-y-2">
                  <div className="text-xs font-bold text-red-900 dark:text-red-200 flex items-center gap-1.5">
                    <AlertTriangle className="w-4 h-4 text-red-600" />
                    <span>{t('warningSignsTab')} (Seek Immediate Medical Care):</span>
                  </div>
                  <div className="space-y-1 pl-5">
                    {problem.warningSigns.map((sign, idx) => (
                      <p key={idx} className="text-xs text-red-800 dark:text-red-300 list-disc">
                        • {sign}
                      </p>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Help Videos Section */}
        {problem.helpVideos.length > 0 && (
          <div className="bg-white dark:bg-slate-900 p-4 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-xs space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1.5 text-xs font-bold text-slate-800 dark:text-slate-200">
                <Play className="w-4 h-4 text-red-600 fill-red-600" />
                <span>{t('helpVideos')}</span>
              </div>
              {activeVideoId && (
                <a
                  href={`https://www.youtube.com/watch?v=${activeVideoId}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 text-[11px] font-semibold text-red-600 hover:text-red-700 dark:text-red-400 hover:underline cursor-pointer"
                  title="Open video on YouTube"
                >
                  <span>Watch on YouTube</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              )}
            </div>

            {activeVideoId && (
              <div className="space-y-2">
                <div className="rounded-2xl overflow-hidden aspect-video bg-black shadow-inner relative group">
                  <iframe
                    className="w-full h-full"
                    src={`https://www.youtube-nocookie.com/embed/${activeVideoId}?autoplay=0&rel=0&modestbranding=1`}
                    title="First Aid Video Tutorial"
                    loading="lazy"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </div>

                {/* Video Info and Fallback row */}
                {(() => {
                  const currentVid =
                    problem.helpVideos.find((v) => v.youtubeId === activeVideoId) ||
                    problem.helpVideos[0];
                  return (
                    <div className="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-2xl border border-slate-200/80 dark:border-slate-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2.5">
                      <div className="min-w-0">
                        <p className="text-xs font-bold text-slate-800 dark:text-slate-100 truncate">
                          {currentVid.title}
                        </p>
                        <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
                          Verified Source: <strong className="text-slate-700 dark:text-slate-300">{currentVid.speaker || 'Certified Health Guide'}</strong> • {currentVid.duration}
                        </p>
                      </div>

                      <a
                        href={`https://www.youtube.com/watch?v=${currentVid.youtubeId}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-red-600 hover:bg-red-700 active:scale-95 text-white font-bold text-xs rounded-xl shadow-xs transition-all shrink-0 cursor-pointer"
                      >
                        <Play className="w-3 h-3 fill-current" />
                        <span>Open on YouTube ↗</span>
                      </a>
                    </div>
                  );
                })()}
              </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
              {problem.helpVideos.map((vid) => (
                <button
                  key={vid.id}
                  onClick={() => setActiveVideoId(vid.youtubeId)}
                  className={`p-2.5 rounded-2xl border text-left flex items-center gap-2.5 transition-all cursor-pointer ${
                    activeVideoId === vid.youtubeId
                      ? 'border-sky-500 bg-sky-50/50 dark:bg-sky-950/40 ring-1 ring-sky-300 dark:ring-sky-700'
                      : 'border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800'
                  }`}
                >
                  <div className="relative w-16 h-11 bg-slate-800 rounded-xl shrink-0 flex items-center justify-center overflow-hidden">
                    <img
                      src={`https://img.youtube.com/vi/${vid.youtubeId}/hqdefault.jpg`}
                      alt={vid.title}
                      className="w-full h-full object-cover opacity-80"
                      onError={(e) => {
                        (e.target as HTMLElement).style.display = 'none';
                      }}
                    />
                    <div className="absolute inset-0 flex items-center justify-center bg-black/30">
                      <Play className="w-4 h-4 text-white fill-white" />
                    </div>
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs font-semibold text-slate-800 dark:text-slate-200 truncate leading-tight">
                      {vid.title}
                    </p>
                    <div className="flex items-center gap-2 text-[10px] text-slate-500 dark:text-slate-400 mt-1">
                      <span>{vid.duration}</span>
                      {vid.speaker && <span>• {vid.speaker}</span>}
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Disclaimer Bar */}
        <div className="p-3.5 bg-amber-50/90 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800 rounded-2xl text-amber-900 dark:text-amber-200 text-xs flex items-start gap-2.5">
          <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
          <span className="leading-relaxed">{t('disclaimerText')}</span>
        </div>
      </div>

      {/* Floating Contextual AI Chatbot Button */}
      <FloatingAiDoctorButton
        onClick={() => onOpenAiWithContext(localizedName)}
        contextTitle={localizedName}
      />

      {/* Sticky Bottom Action Bar */}
      <div className="fixed bottom-0 left-0 right-0 z-30 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-t border-slate-200 dark:border-slate-800 shadow-lg p-2.5">
        <div className="max-w-4xl mx-auto grid grid-cols-4 gap-2">
          <button
            onClick={() => directCall('112')}
            className="flex flex-col sm:flex-row items-center justify-center gap-1 sm:gap-2 py-2 px-1 bg-red-600 hover:bg-red-700 active:scale-95 text-white rounded-xl text-xs font-bold transition-all shadow-xs cursor-pointer"
          >
            <Phone className="w-3.5 h-3.5 fill-current" />
            <span>{t('call112')}</span>
          </button>

          <button
            onClick={() => directCall('108')}
            className="flex flex-col sm:flex-row items-center justify-center gap-1 sm:gap-2 py-2 px-1 bg-orange-600 hover:bg-orange-700 active:scale-95 text-white rounded-xl text-xs font-bold transition-all shadow-xs cursor-pointer"
          >
            <Phone className="w-3.5 h-3.5 fill-current" />
            <span>{t('call108')}</span>
          </button>

          <button
            onClick={handleCallSavedContact}
            className="flex flex-col sm:flex-row items-center justify-center gap-1 sm:gap-2 py-2 px-1 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 active:scale-95 text-slate-800 dark:text-slate-200 rounded-xl text-xs font-semibold border border-slate-200 dark:border-slate-700 transition-all cursor-pointer"
          >
            <UserCheck className="w-3.5 h-3.5 text-slate-600 dark:text-slate-400" />
            <span className="truncate">{t('savedContact')}</span>
          </button>

          <button
            onClick={handleShareLocationWithProblem}
            disabled={isSharingLoc}
            className="flex flex-col sm:flex-row items-center justify-center gap-1 sm:gap-2 py-2 px-1 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 active:scale-95 text-slate-800 dark:text-slate-200 rounded-xl text-xs font-semibold border border-slate-200 dark:border-slate-700 transition-all cursor-pointer"
          >
            <MapPin className="w-3.5 h-3.5 text-red-600" />
            <span className="truncate">{t('shareLocation')}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
