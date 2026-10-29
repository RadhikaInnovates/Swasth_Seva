import React, { useState } from 'react';
import { ArrowLeft, Search, Filter, Stethoscope } from 'lucide-react';
import { HEALTH_PROBLEMS } from '../data/healthProblems';
import { HealthProblem, ProblemCategory } from '../types';
import { useLanguage } from '../context/LanguageContext';
import { FloatingAiDoctorButton } from './FloatingAiDoctorButton';

interface AllProblemsViewProps {
  onSelectProblem: (problem: HealthProblem) => void;
  onBack: () => void;
  onOpenAi: (initialPrompt?: string) => void;
}

export const AllProblemsView: React.FC<AllProblemsViewProps> = ({
  onSelectProblem,
  onBack,
  onOpenAi,
}) => {
  const { t, language } = useLanguage();
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const categories = [
    'All',
    'Ear, Nose & Throat',
    'Head & Neurological',
    'Digestive System',
    'Menstrual & Reproductive',
    'Bones & Joints',
    'Skin & Hair',
    'Minor Injuries',
    'Critical',
    'Mental Health',
  ];

  const filtered = HEALTH_PROBLEMS.filter((p) => {
    const q = search.toLowerCase();
    const localized = p.translations?.[language]?.name?.toLowerCase() || '';
    const localizedDesc = p.translations?.[language]?.desc?.toLowerCase() || '';

    const matchesSearch =
      p.name.toLowerCase().includes(q) ||
      p.hindiName.includes(search) ||
      localized.includes(q) ||
      localizedDesc.includes(q) ||
      p.description.toLowerCase().includes(q) ||
      p.commonCauses.some((c) => c.toLowerCase().includes(q));

    const matchesCat = selectedCategory === 'All' || p.category === selectedCategory;

    return matchesSearch && matchesCat;
  });

  return (
    <div className="min-h-screen bg-slate-100/70 dark:bg-slate-950 pb-24 text-slate-900 dark:text-slate-100 transition-colors">
      {/* Top Header */}
      <div className="bg-sky-600 dark:bg-sky-700 text-white shadow-xs sticky top-0 z-30">
        <div className="max-w-4xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              onClick={onBack}
              className="p-1 -ml-1 rounded-xl hover:bg-sky-700/80 active:scale-95 transition-all text-white cursor-pointer"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <h2 className="font-bold text-base sm:text-lg leading-tight">
              {t('commonProblems')} & Diseases
            </h2>
          </div>
          <span className="text-xs bg-sky-500/80 px-2 py-0.5 rounded-full font-semibold">
            {filtered.length} Topics
          </span>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 pt-4 space-y-4">
        {/* Search Input */}
        <div className="relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder={t('searchPlaceholder')}
            className="w-full bg-white dark:bg-slate-900 text-slate-900 dark:text-white text-xs sm:text-sm rounded-2xl pl-10 pr-4 py-3 border border-slate-200 dark:border-slate-800 focus:border-sky-500 focus:outline-hidden focus:ring-2 focus:ring-sky-100 dark:focus:ring-sky-950 shadow-xs transition-all placeholder:text-slate-400"
          />
        </div>

        {/* Category Filter Chips (horizontal scroll) */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`text-xs font-semibold px-3 py-1.5 rounded-xl shrink-0 transition-all cursor-pointer ${
                selectedCategory === cat
                  ? 'bg-sky-600 text-white shadow-sm'
                  : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Responsive Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
          {filtered.map((prob) => {
            const isCritical = prob.category === 'Critical';
            const localized = prob.translations?.[language]?.name || prob.name;

            return (
              <button
                key={prob.id}
                onClick={() => onSelectProblem(prob)}
                className="bg-white dark:bg-slate-900 p-3.5 rounded-3xl border border-slate-200/90 dark:border-slate-800 hover:border-sky-400 dark:hover:border-sky-500 hover:shadow-md active:scale-97 transition-all flex flex-col items-center text-center group cursor-pointer"
              >
                <div className="w-12 h-12 rounded-2xl bg-slate-50 dark:bg-slate-800 group-hover:bg-sky-50 dark:group-hover:bg-sky-950/60 flex items-center justify-center text-2xl mb-2 transition-colors">
                  {prob.icon}
                </div>
                <h3 className="font-bold text-xs sm:text-sm text-slate-800 dark:text-slate-100 group-hover:text-sky-600 dark:group-hover:text-sky-400 leading-tight">
                  {localized}
                </h3>
                <p className="text-[10px] text-slate-400 mt-0.5 truncate max-w-full">
                  {prob.name}
                </p>
                <span
                  className={`mt-2 text-[9px] font-semibold px-2 py-0.5 rounded-full ${
                    isCritical
                      ? 'bg-red-50 dark:bg-red-950/60 text-red-600 dark:text-red-400 border border-red-100 dark:border-red-900'
                      : prob.category === 'Mental Health'
                      ? 'bg-purple-50 dark:bg-purple-950/60 text-purple-600 dark:text-purple-400 border border-purple-100 dark:border-purple-900'
                      : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300'
                  }`}
                >
                  {prob.category}
                </span>
              </button>
            );
          })}
        </div>

        {filtered.length === 0 && (
          <div className="p-8 text-center bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 text-slate-500 dark:text-slate-400 space-y-2">
            <p className="text-sm font-semibold">No health topics found matching "{search}"</p>
            <p className="text-xs">You can describe this directly to our AI Doctor Assistant.</p>
            <button
              onClick={() => onOpenAi(search)}
              className="mt-2 px-4 py-2 bg-sky-600 hover:bg-sky-700 text-white rounded-xl text-xs font-bold"
            >
              Ask AI Doctor Assistant
            </button>
          </div>
        )}
      </div>

      <FloatingAiDoctorButton onClick={() => onOpenAi()} />
    </div>
  );
};
