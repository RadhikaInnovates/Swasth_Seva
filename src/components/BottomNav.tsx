import React from 'react';
import { Home, Stethoscope, BookOpen, User, Bot } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export type NavTab = 'home' | 'problems' | 'learn' | 'profile';

interface BottomNavProps {
  currentTab: NavTab;
  onSelectTab: (tab: NavTab) => void;
  onOpenAi: () => void;
}

export const BottomNav: React.FC<BottomNavProps> = ({
  currentTab,
  onSelectTab,
  onOpenAi,
}) => {
  const { t } = useLanguage();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-30 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-t border-slate-200/90 dark:border-slate-800 shadow-lg transition-colors">
      <div className="max-w-md mx-auto px-4 py-1.5 flex items-center justify-around">
        {/* Home */}
        <button
          onClick={() => onSelectTab('home')}
          className={`flex flex-col items-center py-1 px-2 rounded-xl transition-all cursor-pointer ${
            currentTab === 'home'
              ? 'text-sky-600 dark:text-sky-400 font-bold'
              : 'text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200 font-medium'
          }`}
        >
          <Home className={`w-5 h-5 ${currentTab === 'home' ? 'stroke-[2.5]' : 'stroke-2'}`} />
          <span className="text-[10px] mt-0.5">{t('home')}</span>
        </button>

        {/* Problems */}
        <button
          onClick={() => onSelectTab('problems')}
          className={`flex flex-col items-center py-1 px-2 rounded-xl transition-all cursor-pointer ${
            currentTab === 'problems'
              ? 'text-sky-600 dark:text-sky-400 font-bold'
              : 'text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200 font-medium'
          }`}
        >
          <Stethoscope
            className={`w-5 h-5 ${currentTab === 'problems' ? 'stroke-[2.5]' : 'stroke-2'}`}
          />
          <span className="text-[10px] mt-0.5">{t('problems')}</span>
        </button>

        {/* AI Doctor Floating Pill */}
        <button
          onClick={onOpenAi}
          className="flex flex-col items-center -mt-4 bg-sky-600 hover:bg-sky-700 active:scale-95 text-white p-2.5 rounded-full shadow-lg shadow-sky-600/30 transition-all border-2 border-white dark:border-slate-900 cursor-pointer"
          title="AI Symptom Triage"
        >
          <Bot className="w-5 h-5" />
          <span className="sr-only">AI Doctor</span>
        </button>

        {/* Learn */}
        <button
          onClick={() => onSelectTab('learn')}
          className={`flex flex-col items-center py-1 px-2 rounded-xl transition-all cursor-pointer ${
            currentTab === 'learn'
              ? 'text-sky-600 dark:text-sky-400 font-bold'
              : 'text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200 font-medium'
          }`}
        >
          <BookOpen
            className={`w-5 h-5 ${currentTab === 'learn' ? 'stroke-[2.5]' : 'stroke-2'}`}
          />
          <span className="text-[10px] mt-0.5">{t('learn')}</span>
        </button>

        {/* Profile */}
        <button
          onClick={() => onSelectTab('profile')}
          className={`flex flex-col items-center py-1 px-2 rounded-xl transition-all cursor-pointer ${
            currentTab === 'profile'
              ? 'text-sky-600 dark:text-sky-400 font-bold'
              : 'text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200 font-medium'
          }`}
        >
          <User
            className={`w-5 h-5 ${currentTab === 'profile' ? 'stroke-[2.5]' : 'stroke-2'}`}
          />
          <span className="text-[10px] mt-0.5">{t('profile')}</span>
        </button>
      </div>
    </nav>
  );
};
