import React, { useState } from 'react';
import { ArrowLeft, ChevronDown, ChevronUp, CheckCircle } from 'lucide-react';
import { PREVENTION_TIPS } from '../data/preventionTips';
import { useLanguage } from '../context/LanguageContext';

interface LearnViewProps {
  onBack: () => void;
}

export const LearnView: React.FC<LearnViewProps> = ({ onBack }) => {
  const [expandedId, setExpandedId] = useState<string | null>('stay-hydrated');
  const { t } = useLanguage();

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 pb-24 text-slate-900 dark:text-slate-100 transition-colors">
      {/* Top Blue Bar */}
      <div className="bg-sky-600 dark:bg-sky-700 text-white shadow-xs sticky top-0 z-30">
        <div className="max-w-4xl mx-auto px-4 py-3 flex items-center gap-3">
          <button
            onClick={onBack}
            className="p-1 -ml-1 rounded-xl hover:bg-sky-700/80 dark:hover:bg-sky-800 active:scale-95 transition-all text-white cursor-pointer"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <h2 className="font-bold text-lg leading-tight">{t('learn_title')}</h2>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 pt-4 space-y-3">
        {/* Section title */}
        <div className="text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider px-1">
          {t('daily_health_tips')}
        </div>

        {/* Accordion Cards List */}
        <div className="space-y-2.5">
          {PREVENTION_TIPS.map((tip) => {
            const isExpanded = expandedId === tip.id;
            return (
              <div
                key={tip.id}
                className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-xs overflow-hidden transition-all"
              >
                <button
                  onClick={() => setExpandedId(isExpanded ? null : tip.id)}
                  className="w-full p-4 text-left flex items-start justify-between gap-3 hover:bg-slate-50/70 dark:hover:bg-slate-800/50 transition-colors cursor-pointer"
                >
                  <div className="flex items-start gap-3">
                    <span className="text-2xl pt-0.5">{tip.icon}</span>
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="font-bold text-sm text-slate-900 dark:text-slate-100 leading-tight">
                          {tip.title}
                        </h3>
                        <span className="text-[11px] text-slate-400 dark:text-slate-400 font-normal">
                          ({tip.hindiTitle})
                        </span>
                      </div>
                      <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 leading-snug">
                        {tip.summary}
                      </p>
                    </div>
                  </div>
                  <div className="p-1 text-slate-400 dark:text-slate-500">
                    {isExpanded ? (
                      <ChevronUp className="w-4 h-4" />
                    ) : (
                      <ChevronDown className="w-4 h-4" />
                    )}
                  </div>
                </button>

                {isExpanded && (
                  <div className="px-5 pb-4 pt-1 bg-slate-50/60 dark:bg-slate-800/40 border-t border-slate-100 dark:border-slate-800 space-y-2">
                    {tip.details.map((detail, idx) => (
                      <div key={idx} className="flex items-start gap-2 text-xs text-slate-700 dark:text-slate-300">
                        <CheckCircle className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                        <span className="leading-relaxed">{detail}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
