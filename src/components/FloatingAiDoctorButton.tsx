import React from 'react';
import { Bot, Sparkles } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

interface FloatingAiDoctorButtonProps {
  onClick: () => void;
  contextTitle?: string;
  className?: string;
}

export const FloatingAiDoctorButton: React.FC<FloatingAiDoctorButtonProps> = ({
  onClick,
  contextTitle,
  className = '',
}) => {
  const { t } = useLanguage();

  return (
    <div
      className={`fixed right-4 bottom-20 z-40 flex items-center gap-2 animate-in fade-in slide-in-from-bottom-4 duration-300 ${className}`}
    >
      {contextTitle && (
        <div className="hidden sm:flex items-center gap-1.5 bg-white/95 dark:bg-slate-800/95 backdrop-blur-xs text-slate-800 dark:text-slate-100 text-xs font-semibold px-3 py-1.5 rounded-full shadow-md border border-slate-200 dark:border-slate-700 pointer-events-none">
          <Sparkles className="w-3.5 h-3.5 text-sky-500 shrink-0" />
          <span className="truncate max-w-[140px]">{contextTitle}</span>
        </div>
      )}

      <button
        onClick={onClick}
        aria-label="Open AI Medical Assistant"
        className="relative group flex items-center justify-center w-14 h-14 rounded-full bg-gradient-to-tr from-sky-600 via-sky-500 to-blue-600 text-white shadow-xl shadow-sky-600/35 hover:scale-105 active:scale-95 transition-all focus:outline-hidden focus:ring-4 focus:ring-sky-300 dark:focus:ring-sky-800 cursor-pointer border-2 border-white dark:border-slate-800"
      >
        {/* Visual Pulse Ring */}
        <span className="absolute -inset-1 rounded-full bg-sky-500/20 animate-ping group-hover:opacity-100 pointer-events-none duration-1000" />

        {/* Clean, simple original Bot icon */}
        <Bot className="w-6 h-6 text-white transition-transform group-hover:scale-110" />

        {/* Tooltip on hover */}
        <span className="absolute right-full mr-2.5 px-2.5 py-1 bg-slate-900 text-white text-[11px] font-semibold rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none shadow-md">
          {t('askAi')}
        </span>
      </button>
    </div>
  );
};
