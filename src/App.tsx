import React, { useState } from 'react';
import {
  AlertTriangle,
  ChevronRight,
  Bot,
  Heart,
  Shield,
  User,
} from 'lucide-react';
import { Header } from './components/Header';
import { SosModal } from './components/SosModal';
import { ProblemDetail } from './components/ProblemDetail';
import { AllProblemsView } from './components/AllProblemsView';
import { LearnView } from './components/LearnView';
import { ProfileView } from './components/ProfileView';
import { AiTriageDrawer } from './components/AiTriageDrawer';
import { BottomNav, NavTab } from './components/BottomNav';
import { AuthModal } from './components/AuthModal';
import { LanguageSelectorModal } from './components/LanguageSelectorModal';
import { FloatingAiDoctorButton } from './components/FloatingAiDoctorButton';
import { HEALTH_PROBLEMS } from './data/healthProblems';
import { HealthProblem } from './types';
import { useLanguage } from './context/LanguageContext';
import { useAuth } from './context/AuthContext';

export default function App() {
  const [currentTab, setCurrentTab] = useState<NavTab>('home');
  const [selectedProblem, setSelectedProblem] = useState<HealthProblem | null>(null);
  const [isSosOpen, setIsSosOpen] = useState(false);
  const [isAiOpen, setIsAiOpen] = useState(false);
  const [aiInitialPrompt, setAiInitialPrompt] = useState<string | undefined>(undefined);
  const [activeDiseaseContext, setActiveDiseaseContext] = useState<string | undefined>(undefined);

  // Auth and Language modals
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [authMode, setAuthMode] = useState<'login' | 'signup'>('login');
  const [isLanguageOpen, setIsLanguageOpen] = useState(false);

  const { t, language } = useLanguage();
  const { user } = useAuth();

  // Health problems shown on the Home screen (first 12 items as seen in reference video)
  const homeCommonProblems = HEALTH_PROBLEMS.slice(0, 12);

  const handleOpenAiWithPrompt = (prompt?: string, contextName?: string) => {
    setAiInitialPrompt(prompt);
    setActiveDiseaseContext(contextName);
    setIsAiOpen(true);
  };

  const handleOpenAuth = (mode: 'login' | 'signup' = 'login') => {
    setAuthMode(mode);
    setIsAuthOpen(true);
  };

  const handleSelectProblem = (problem: HealthProblem) => {
    setSelectedProblem(problem);
  };

  const handleBackFromDetail = () => {
    setSelectedProblem(null);
  };

  return (
    <div className="min-h-screen bg-slate-100/70 dark:bg-slate-950 text-slate-900 dark:text-slate-100 font-sans antialiased selection:bg-sky-500 selection:text-white transition-colors">
      {/* If a problem is currently selected, show the detail view */}
      {selectedProblem ? (
        <ProblemDetail
          problem={selectedProblem}
          onBack={handleBackFromDetail}
          onOpenSos={() => setIsSosOpen(true)}
          onOpenAiWithContext={(diseaseName) => handleOpenAiWithPrompt(undefined, diseaseName)}
        />
      ) : currentTab === 'problems' ? (
        <AllProblemsView
          onSelectProblem={handleSelectProblem}
          onBack={() => setCurrentTab('home')}
          onOpenAi={() => handleOpenAiWithPrompt()}
        />
      ) : currentTab === 'learn' ? (
        <LearnView onBack={() => setCurrentTab('home')} />
      ) : currentTab === 'profile' ? (
        <ProfileView
          onOpenAuth={handleOpenAuth}
          onOpenLanguage={() => setIsLanguageOpen(true)}
        />
      ) : (
        /* HOME SCREEN matching video 00:00-00:04 & 00:42 */
        <div className="pb-24">
          {/* Header with Search and SOS 112 button */}
          <Header
            onSelectProblem={handleSelectProblem}
            onOpenSos={() => setIsSosOpen(true)}
            onOpenAiTriage={(prompt) => handleOpenAiWithPrompt(prompt)}
            onOpenLanguage={() => setIsLanguageOpen(true)}
            onOpenAuth={handleOpenAuth}
          />

          <main className="max-w-4xl mx-auto px-4 pt-3.5 space-y-4">
            {/* User Greeting & Medical Safeguard Reminder if Logged In */}
            {user && (
              <div className="p-3 bg-white dark:bg-slate-900 rounded-2xl border border-sky-100 dark:border-sky-950/60 shadow-xs flex items-center justify-between gap-3 animate-in fade-in">
                <div className="flex items-center gap-2.5 min-w-0">
                  <div className="w-8 h-8 rounded-xl bg-sky-600 text-white font-bold text-xs flex items-center justify-center shrink-0">
                    {user.fullName.charAt(0).toUpperCase()}
                  </div>
                  <div className="truncate">
                    <p className="text-xs font-bold text-slate-800 dark:text-slate-100 truncate">
                      Hello, {user.fullName}
                    </p>
                    <p className="text-[11px] text-slate-400 truncate">
                      {user.profile?.allergies?.length
                        ? `⚠️ Allergies: ${user.profile.allergies.join(', ')}`
                        : 'Personal medical profile active'}
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setCurrentTab('profile')}
                  className="text-xs font-bold text-sky-600 dark:text-sky-400 hover:underline shrink-0 cursor-pointer"
                >
                  View Profile
                </button>
              </div>
            )}

            {/* SOS Emergency Big Red Button matching video 00:00 */}
            <button
              onClick={() => setIsSosOpen(true)}
              className="w-full bg-red-600 hover:bg-red-700 active:scale-[0.99] text-white py-3.5 px-4 rounded-2xl shadow-lg shadow-red-600/25 transition-all flex items-center justify-center gap-2.5 font-black text-base sm:text-lg tracking-wide uppercase group cursor-pointer"
            >
              <AlertTriangle className="w-5 h-5 text-white fill-current group-hover:scale-110 transition-transform" />
              <span>{t('sos_title')}</span>
              <AlertTriangle className="w-5 h-5 text-white fill-current group-hover:scale-110 transition-transform" />
            </button>

            {/* Quick Access Section (2x2 grid) matching video 00:00 */}
            <div className="space-y-2">
              <div className="text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                <span>{t('quickAccess')}</span>
              </div>

              <div className="grid grid-cols-2 gap-3">
                {/* 1. Common Problems */}
                <button
                  onClick={() => setCurrentTab('problems')}
                  className="bg-white dark:bg-slate-900 p-3.5 rounded-2xl border border-slate-200/80 dark:border-slate-800 hover:border-sky-300 dark:hover:border-sky-600 hover:shadow-xs transition-all text-left flex items-start gap-3 group cursor-pointer"
                >
                  <div className="w-10 h-10 rounded-xl bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 flex items-center justify-center text-xl shrink-0 group-hover:scale-105 transition-transform">
                    💊
                  </div>
                  <div className="min-w-0">
                    <h3 className="font-bold text-xs sm:text-sm text-slate-800 dark:text-slate-100 leading-tight">
                      {t('commonProblems')}
                    </h3>
                    <p className="text-[11px] text-slate-400 mt-0.5 truncate">
                      Everyday health issues
                    </p>
                  </div>
                </button>

                {/* 2. Emergency Help */}
                <button
                  onClick={() => setIsSosOpen(true)}
                  className="bg-white dark:bg-slate-900 p-3.5 rounded-2xl border border-red-200/80 dark:border-red-950/60 hover:border-red-400 hover:bg-red-50/20 dark:hover:bg-red-950/30 hover:shadow-xs transition-all text-left flex items-start gap-3 group cursor-pointer"
                >
                  <div className="w-10 h-10 rounded-xl bg-red-50 dark:bg-red-950/60 text-red-600 dark:text-red-400 flex items-center justify-center text-xl shrink-0 group-hover:scale-105 transition-transform">
                    🚨
                  </div>
                  <div className="min-w-0">
                    <h3 className="font-bold text-xs sm:text-sm text-red-900 dark:text-red-300 leading-tight">
                      {t('emergencyHelp')}
                    </h3>
                    <p className="text-[11px] text-slate-400 mt-0.5 truncate">
                      Life-threatening care
                    </p>
                  </div>
                </button>

                {/* 3. Prevention Tips */}
                <button
                  onClick={() => setCurrentTab('learn')}
                  className="bg-white dark:bg-slate-900 p-3.5 rounded-2xl border border-slate-200/80 dark:border-slate-800 hover:border-sky-300 dark:hover:border-sky-600 hover:shadow-xs transition-all text-left flex items-start gap-3 group cursor-pointer"
                >
                  <div className="w-10 h-10 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center text-xl shrink-0 group-hover:scale-105 transition-transform">
                    🛡️
                  </div>
                  <div className="min-w-0">
                    <h3 className="font-bold text-xs sm:text-sm text-slate-800 dark:text-slate-100 leading-tight">
                      {t('preventionTips')}
                    </h3>
                    <p className="text-[11px] text-slate-400 mt-0.5 truncate">
                      Stay healthy & safe
                    </p>
                  </div>
                </button>

                {/* 4. Mental Health */}
                <button
                  onClick={() => {
                    const panic = HEALTH_PROBLEMS.find((p) => p.id === 'panic-attack');
                    if (panic) setSelectedProblem(panic);
                    else setCurrentTab('problems');
                  }}
                  className="bg-white dark:bg-slate-900 p-3.5 rounded-2xl border border-slate-200/80 dark:border-slate-800 hover:border-sky-300 dark:hover:border-sky-600 hover:shadow-xs transition-all text-left flex items-start gap-3 group cursor-pointer"
                >
                  <div className="w-10 h-10 rounded-xl bg-purple-50 dark:bg-purple-950/60 text-purple-600 dark:text-purple-400 flex items-center justify-center text-xl shrink-0 group-hover:scale-105 transition-transform">
                    🧠
                  </div>
                  <div className="min-w-0">
                    <h3 className="font-bold text-xs sm:text-sm text-slate-800 dark:text-slate-100 leading-tight">
                      {t('mentalHealth')}
                    </h3>
                    <p className="text-[11px] text-slate-400 mt-0.5 truncate">
                      Mind & wellness
                    </p>
                  </div>
                </button>
              </div>
            </div>

            {/* AI Triage Banner Feature Card */}
            <div className="bg-gradient-to-r from-sky-600 to-blue-700 rounded-3xl p-4 sm:p-5 text-white shadow-md flex items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-2xl bg-white/20 backdrop-blur-xs flex items-center justify-center text-2xl shrink-0">
                  <Bot className="w-6 h-6 text-white" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h4 className="font-bold text-sm leading-tight">
                      {t('aiDoctor')} (स्वास्थ्य साथी)
                    </h4>
                    <span className="text-[10px] bg-white/20 font-semibold px-2 py-0.5 rounded-full uppercase">
                      {language}
                    </span>
                  </div>
                  <p className="text-xs text-sky-100 mt-0.5">
                    Describe symptoms via voice or text in 5 Indian languages with instant 4-tier triage.
                  </p>
                </div>
              </div>
              <button
                onClick={() => handleOpenAiWithPrompt()}
                className="bg-white hover:bg-sky-50 text-sky-700 font-bold text-xs px-3.5 py-2.5 rounded-xl shadow-xs shrink-0 active:scale-95 transition-all cursor-pointer"
              >
                {t('startTriage')}
              </button>
            </div>

            {/* Common Problems Section matching video 00:00 & 00:08 */}
            <div className="space-y-2.5">
              <div className="flex items-center justify-between">
                <div className="text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                  <span className="text-orange-500">🔥</span>
                  <span>{t('commonProblems')}</span>
                </div>
                <button
                  onClick={() => setCurrentTab('problems')}
                  className="text-xs text-slate-600 dark:text-slate-400 hover:text-sky-600 dark:hover:text-sky-400 font-bold flex items-center gap-0.5 transition-colors cursor-pointer"
                >
                  <span>{t('viewAll')}</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* 3x4 / 4-col responsive grid matching video 00:00 */}
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                {homeCommonProblems.map((prob) => {
                  const isCritical = prob.category === 'Critical';
                  const localizedName = prob.translations?.[language]?.name || prob.name;
                  const localizedSub = prob.translations?.[language]?.name ? prob.name : prob.hindiName;

                  return (
                    <button
                      key={prob.id}
                      onClick={() => handleSelectProblem(prob)}
                      className="bg-white dark:bg-slate-900 p-3 rounded-2xl border border-slate-200/80 dark:border-slate-800 hover:border-sky-300 dark:hover:border-sky-600 hover:shadow-xs active:scale-97 transition-all flex flex-col items-center text-center group cursor-pointer"
                    >
                      <div className="w-11 h-11 rounded-xl bg-slate-50 dark:bg-slate-800 group-hover:bg-sky-50 dark:group-hover:bg-sky-950/60 flex items-center justify-center text-2xl mb-1.5 transition-colors">
                        {prob.icon}
                      </div>
                      <h4 className="font-bold text-xs text-slate-800 dark:text-slate-100 group-hover:text-sky-700 dark:group-hover:text-sky-400 leading-tight">
                        {localizedName}
                      </h4>
                      <p className="text-[10px] text-slate-400 mt-0.5 truncate max-w-full">
                        {localizedSub}
                      </p>
                      <span
                        className={`mt-1.5 text-[9px] font-semibold px-2 py-0.5 rounded-full ${
                          isCritical
                            ? 'bg-red-50 dark:bg-red-950/60 text-red-600 dark:text-red-400 border border-red-100 dark:border-red-900'
                            : prob.category === 'Minor Injuries'
                            ? 'bg-amber-50 dark:bg-amber-950/60 text-amber-600 dark:text-amber-400 border border-amber-100 dark:border-amber-900'
                            : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300'
                        }`}
                      >
                        {prob.category}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Medical Disclaimer Banner matching video 00:00 */}
            <div className="p-4 bg-amber-50/80 dark:bg-amber-950/30 border border-amber-200/80 dark:border-amber-900/50 rounded-2xl text-amber-900 dark:text-amber-300 text-xs flex items-start gap-2.5">
              <AlertTriangle className="w-4 h-4 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
              <p className="leading-relaxed">
                <strong>{t('disclaimer')}:</strong> {t('emergency_disclaimer')}
              </p>
            </div>
          </main>
        </div>
      )}

      {/* SOS Emergency Modal */}
      <SosModal isOpen={isSosOpen} onClose={() => setIsSosOpen(false)} />

      {/* AI Triage & Chat Assistant Drawer */}
      <AiTriageDrawer
        isOpen={isAiOpen}
        onClose={() => {
          setIsAiOpen(false);
          setAiInitialPrompt(undefined);
          setActiveDiseaseContext(undefined);
        }}
        initialPrompt={aiInitialPrompt}
        activeDiseaseContext={activeDiseaseContext}
        onOpenSos={() => {
          setIsAiOpen(false);
          setIsSosOpen(true);
        }}
      />

      {/* Auth Modal (Login, Signup, Medical Profile Intake) */}
      <AuthModal
        isOpen={isAuthOpen}
        initialMode={authMode}
        onClose={() => setIsAuthOpen(false)}
      />

      {/* Language Selector Modal (English, Hindi, Marathi, Tamil, Marwari) */}
      <LanguageSelectorModal
        isOpen={isLanguageOpen}
        onClose={() => setIsLanguageOpen(false)}
      />

      {/* Floating AI Doctor Button on Home screen when no detail is open */}
      {!selectedProblem && currentTab === 'home' && (
        <FloatingAiDoctorButton
          onClick={() => handleOpenAiWithPrompt()}
          contextTitle={t('askAi')}
        />
      )}

      {/* Sticky Bottom Navigation (hidden on detail view to give full space to detail action bar) */}
      {!selectedProblem && (
        <BottomNav
          currentTab={currentTab}
          onSelectTab={(tab) => {
            setSelectedProblem(null);
            setCurrentTab(tab);
          }}
          onOpenAi={() => handleOpenAiWithPrompt()}
        />
      )}
    </div>
  );
}
