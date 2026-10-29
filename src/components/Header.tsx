import React, { useState } from 'react';
import {
  Phone,
  Search,
  Bot,
  X,
  Globe,
  Sun,
  Moon,
  User,
  Heart,
} from 'lucide-react';
import { HEALTH_PROBLEMS } from '../data/healthProblems';
import { HealthProblem } from '../types';
import { directCall } from '../utils/emergency';
import { useLanguage } from '../context/LanguageContext';
import { useTheme } from '../context/ThemeContext';
import { useAuth } from '../context/AuthContext';

interface HeaderProps {
  onSelectProblem: (problem: HealthProblem) => void;
  onOpenSos: () => void;
  onOpenAiTriage: (initialPrompt?: string) => void;
  onOpenLanguage: () => void;
  onOpenAuth: (mode?: 'login' | 'signup') => void;
}

export const Header: React.FC<HeaderProps> = ({
  onSelectProblem,
  onOpenSos,
  onOpenAiTriage,
  onOpenLanguage,
  onOpenAuth,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchFocused, setIsSearchFocused] = useState(false);

  const { t, language } = useLanguage();
  const { isDark, toggleTheme } = useTheme();
  const { user } = useAuth();

  const filteredProblems = searchQuery.trim()
    ? HEALTH_PROBLEMS.filter((p) => {
        const q = searchQuery.toLowerCase();
        return (
          p.name.toLowerCase().includes(q) ||
          p.hindiName.includes(searchQuery) ||
          p.category.toLowerCase().includes(q) ||
          p.description?.toLowerCase().includes(q) ||
          p.commonCauses.some((c) => c.toLowerCase().includes(q))
        );
      })
    : [];

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (filteredProblems.length > 0) {
      onSelectProblem(filteredProblems[0]);
      setSearchQuery('');
      setIsSearchFocused(false);
    } else if (searchQuery.trim()) {
      onOpenAiTriage(searchQuery.trim());
      setSearchQuery('');
      setIsSearchFocused(false);
    }
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 shadow-xs transition-colors">
      <div className="max-w-4xl mx-auto px-4 py-2.5">
        {/* Top brand row */}
        <div className="flex items-center justify-between gap-2.5">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-2xl bg-red-600 flex items-center justify-center text-white font-black text-xl shadow-md shadow-red-600/20 shrink-0">
              +
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <h1 className="font-bold text-base sm:text-lg text-slate-900 dark:text-white tracking-tight leading-tight">
                  {t('appName')}
                </h1>
                <span className="text-[10px] bg-red-100 dark:bg-red-950/80 text-red-700 dark:text-red-300 font-semibold px-1.5 py-0.5 rounded">
                  24x7
                </span>
              </div>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 font-medium truncate max-w-[170px] sm:max-w-none">
                {t('appTagline')}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-1.5 sm:gap-2">
            {/* Language Selector Button */}
            <button
              onClick={onOpenLanguage}
              className="flex items-center gap-1 px-2.5 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 text-xs font-bold transition-colors cursor-pointer"
              title="Change Language (English, हिन्दी, मराठी, தமிழ், मारवाड़ी)"
            >
              <Globe className="w-3.5 h-3.5 text-sky-600 dark:text-sky-400" />
              <span className="uppercase text-[11px]">{language}</span>
            </button>

            {/* Theme Toggle Button */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 transition-colors cursor-pointer"
              title={isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            >
              {isDark ? (
                <Sun className="w-4 h-4 text-amber-400" />
              ) : (
                <Moon className="w-4 h-4 text-slate-600" />
              )}
            </button>

            {/* User Profile / Login Button */}
            {user ? (
              <button
                onClick={() => onOpenAuth()}
                className="w-8 h-8 rounded-xl bg-sky-600 text-white font-bold text-xs flex items-center justify-center shadow-xs cursor-pointer hover:ring-2 hover:ring-sky-300 dark:hover:ring-sky-700 transition-all"
                title={`Logged in as ${user.fullName}`}
              >
                {user.fullName.charAt(0).toUpperCase()}
              </button>
            ) : (
              <button
                onClick={() => onOpenAuth('login')}
                className="hidden sm:flex items-center gap-1 px-2.5 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 text-xs font-bold transition-colors cursor-pointer"
              >
                <User className="w-3.5 h-3.5" />
                <span>{t('login')}</span>
              </button>
            )}

            {/* SOS 112 Red Dial Button */}
            <button
              onClick={() => directCall('112')}
              className="flex items-center gap-1.5 bg-red-600 hover:bg-red-700 active:scale-95 text-white text-xs font-bold px-3 py-1.5 sm:px-3.5 sm:py-2 rounded-full shadow-md shadow-red-600/25 transition-all cursor-pointer shrink-0"
              title="Immediate call to National Emergency 112"
            >
              <Phone className="w-3.5 h-3.5 fill-current" />
              <span>SOS 112</span>
            </button>
          </div>
        </div>

        {/* Search Bar */}
        <div className="mt-2.5 relative">
          <form onSubmit={handleSearchSubmit}>
            <div className="relative flex items-center">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 pointer-events-none" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onFocus={() => setIsSearchFocused(true)}
                placeholder={t('searchPlaceholder')}
                className="w-full bg-slate-100/90 dark:bg-slate-800/90 hover:bg-slate-100 dark:hover:bg-slate-800 focus:bg-white dark:focus:bg-slate-900 text-slate-900 dark:text-white text-xs sm:text-sm rounded-xl pl-10 pr-20 py-2.5 border border-transparent focus:border-sky-400 focus:outline-hidden focus:ring-2 focus:ring-sky-100 dark:focus:ring-sky-950 transition-all placeholder:text-slate-400 dark:placeholder:text-slate-500"
              />
              {searchQuery ? (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 p-1 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300"
                >
                  <X className="w-4 h-4" />
                </button>
              ) : (
                <button
                  type="button"
                  onClick={() => onOpenAiTriage()}
                  className="absolute right-2.5 text-[11px] font-semibold text-sky-600 dark:text-sky-400 bg-sky-50 dark:bg-sky-950/60 hover:bg-sky-100 dark:hover:bg-sky-900/60 px-2 py-1 rounded-lg transition-colors cursor-pointer"
                >
                  {t('askAi')}
                </button>
              )}
            </div>
          </form>

          {/* Search Dropdown Results */}
          {isSearchFocused && searchQuery.trim() && (
            <div className="absolute left-0 right-0 top-full mt-1.5 bg-white dark:bg-slate-900 rounded-2xl shadow-xl border border-slate-200 dark:border-slate-800 overflow-hidden z-50 max-h-72 overflow-y-auto">
              {filteredProblems.length > 0 ? (
                <div>
                  <div className="px-3.5 py-1.5 bg-slate-50 dark:bg-slate-800/60 text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                    {t('commonProblems')} ({filteredProblems.length})
                  </div>
                  {filteredProblems.map((prob) => (
                    <button
                      key={prob.id}
                      onClick={() => {
                        onSelectProblem(prob);
                        setSearchQuery('');
                        setIsSearchFocused(false);
                      }}
                      className="w-full px-3.5 py-2.5 text-left flex items-center justify-between hover:bg-slate-50 dark:hover:bg-slate-800/80 border-b border-slate-100 dark:border-slate-800/60 last:border-0 transition-colors cursor-pointer"
                    >
                      <div className="flex items-center gap-2.5 min-w-0">
                        <span className="text-xl shrink-0">{prob.icon}</span>
                        <div className="truncate">
                          <p className="text-xs sm:text-sm font-semibold text-slate-800 dark:text-slate-100 truncate">
                            {prob.name}
                          </p>
                          <p className="text-[11px] text-slate-400 truncate">
                            {prob.translations?.[language]?.name || prob.hindiName}
                          </p>
                        </div>
                      </div>
                      <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 shrink-0 ml-2">
                        {prob.category}
                      </span>
                    </button>
                  ))}
                </div>
              ) : null}

              {/* AI Triage suggestion row */}
              <div className="p-3 bg-sky-50/80 dark:bg-sky-950/40 border-t border-sky-100 dark:border-sky-900 flex items-center justify-between gap-2">
                <div className="flex items-center gap-2 text-xs text-sky-900 dark:text-sky-200 min-w-0">
                  <Bot className="w-4 h-4 text-sky-600 shrink-0" />
                  <span className="truncate">
                    Analyze symptoms for <strong>"{searchQuery}"</strong>
                  </span>
                </div>
                <button
                  onClick={() => {
                    onOpenAiTriage(searchQuery);
                    setSearchQuery('');
                    setIsSearchFocused(false);
                  }}
                  className="text-xs font-bold bg-sky-600 hover:bg-sky-700 text-white px-3 py-1.5 rounded-xl shrink-0 transition-colors cursor-pointer"
                >
                  {t('askAi')}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
