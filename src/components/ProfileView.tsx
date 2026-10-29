import React, { useState } from 'react';
import {
  Plus,
  Phone,
  Trash2,
  Share2,
  Info,
  User,
  Heart,
  Globe,
  Sun,
  Moon,
  X,
  Shield,
  Settings,
} from 'lucide-react';
import { INDIAN_EMERGENCY_NUMBERS } from '../data/emergencyNumbers';
import {
  getSavedContacts,
  saveContact,
  deleteContact,
  directCall,
  shareViaWhatsApp,
  generateEmergencyMessage,
  getCurrentLocation,
} from '../utils/emergency';
import { EmergencyContact } from '../types';
import { useLanguage } from '../context/LanguageContext';
import { useTheme } from '../context/ThemeContext';
import { useAuth } from '../context/AuthContext';
import { MedicalProfileView } from './MedicalProfileView';

interface ProfileViewProps {
  onOpenAuth: (mode?: 'login' | 'signup') => void;
  onOpenLanguage: () => void;
}

export const ProfileView: React.FC<ProfileViewProps> = ({ onOpenAuth, onOpenLanguage }) => {
  const { t, language } = useLanguage();
  const { isDark, toggleTheme } = useTheme();
  const { user } = useAuth();

  const [activeSubTab, setActiveSubTab] = useState<'profile' | 'contacts' | 'helplines' | 'settings'>('profile');
  const [contacts, setContacts] = useState<EmergencyContact[]>(getSavedContacts());
  const [showAddModal, setShowAddModal] = useState(false);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [relationship, setRelationship] = useState('Family');

  const handleAddSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !phone.trim()) return;

    saveContact({
      name: name.trim(),
      phone: phone.trim(),
      relationship,
    });
    setContacts(getSavedContacts());
    setName('');
    setPhone('');
    setShowAddModal(false);
  };

  const handleDelete = (id: string) => {
    deleteContact(id);
    setContacts(getSavedContacts());
  };

  const handleSendQuickSosToContact = async (c: EmergencyContact) => {
    const loc = await getCurrentLocation().catch(() => null);
    const msg = generateEmergencyMessage(loc, `Urgent alert to my emergency contact ${c.name}!`);
    shareViaWhatsApp(msg, c.phone);
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 pb-28 text-slate-900 dark:text-slate-100 transition-colors">
      {/* Top Header */}
      <div className="bg-sky-600 dark:bg-sky-700 text-white shadow-xs sticky top-0 z-30">
        <div className="max-w-4xl mx-auto px-4 py-3 flex items-center justify-between">
          <h2 className="font-bold text-lg leading-tight">{t('profile')}</h2>
          <div className="flex items-center gap-2">
            <button
              onClick={onOpenLanguage}
              className="p-1.5 rounded-xl bg-sky-700 dark:bg-sky-800 text-white hover:bg-sky-800 text-xs font-semibold flex items-center gap-1 cursor-pointer"
              title="Change Language"
            >
              <Globe className="w-3.5 h-3.5" />
              <span className="uppercase text-[11px]">{language}</span>
            </button>
            <button
              onClick={toggleTheme}
              className="p-1.5 rounded-xl bg-sky-700 dark:bg-sky-800 text-white hover:bg-sky-800 cursor-pointer"
              title={isDark ? 'Switch to Light' : 'Switch to Dark'}
            >
              {isDark ? <Sun className="w-4 h-4 text-amber-300" /> : <Moon className="w-4 h-4" />}
            </button>
          </div>
        </div>

        {/* Sub-tab navigation */}
        <div className="max-w-4xl mx-auto px-4 flex gap-1 border-t border-sky-500/40 text-xs overflow-x-auto py-1">
          <button
            onClick={() => setActiveSubTab('profile')}
            className={`py-1.5 px-3 rounded-lg font-bold transition-all cursor-pointer shrink-0 ${
              activeSubTab === 'profile'
                ? 'bg-white text-sky-700 shadow-xs'
                : 'text-sky-100 hover:bg-sky-500/30'
            }`}
          >
            {t('myMedicalProfile')}
          </button>
          <button
            onClick={() => setActiveSubTab('contacts')}
            className={`py-1.5 px-3 rounded-lg font-bold transition-all cursor-pointer shrink-0 ${
              activeSubTab === 'contacts'
                ? 'bg-white text-sky-700 shadow-xs'
                : 'text-sky-100 hover:bg-sky-500/30'
            }`}
          >
            {t('emergencyContacts')}
          </button>
          <button
            onClick={() => setActiveSubTab('helplines')}
            className={`py-1.5 px-3 rounded-lg font-bold transition-all cursor-pointer shrink-0 ${
              activeSubTab === 'helplines'
                ? 'bg-white text-sky-700 shadow-xs'
                : 'text-sky-100 hover:bg-sky-500/30'
            }`}
          >
            {t('helplineNumbers')}
          </button>
          <button
            onClick={() => setActiveSubTab('settings')}
            className={`py-1.5 px-3 rounded-lg font-bold transition-all cursor-pointer shrink-0 ${
              activeSubTab === 'settings'
                ? 'bg-white text-sky-700 shadow-xs'
                : 'text-sky-100 hover:bg-sky-500/30'
            }`}
          >
            {t('settings')}
          </button>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 pt-4">
        {activeSubTab === 'profile' && (
          <MedicalProfileView onOpenAuth={onOpenAuth} />
        )}

        {activeSubTab === 'contacts' && (
          <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/80 dark:border-slate-800 shadow-xs p-5 space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-xl">📞</span>
                <div>
                  <h3 className="font-bold text-sm text-slate-900 dark:text-white leading-tight">
                    {t('emergencyContacts')}
                  </h3>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400">
                    Contacts alerted when you activate Smart SOS
                  </p>
                </div>
              </div>
              <button
                onClick={() => setShowAddModal(true)}
                className="flex items-center gap-1 bg-sky-50 dark:bg-sky-950/60 hover:bg-sky-100 dark:hover:bg-sky-900/60 text-sky-700 dark:text-sky-300 text-xs font-bold px-3 py-1.5 rounded-xl border border-sky-200 dark:border-sky-800 transition-colors cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add</span>
              </button>
            </div>

            {contacts.length === 0 ? (
              <div className="p-5 text-center border border-dashed border-slate-200 dark:border-slate-800 rounded-2xl text-slate-400 text-xs">
                No emergency contacts saved yet. Add contacts that can be reached quickly during emergencies.
              </div>
            ) : (
              <div className="space-y-2.5">
                {contacts.map((contact) => (
                  <div
                    key={contact.id}
                    className="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-2xl border border-slate-200/80 dark:border-slate-800 flex items-center justify-between gap-3"
                  >
                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        <h4 className="font-bold text-xs sm:text-sm text-slate-800 dark:text-slate-100 truncate">
                          {contact.name}
                        </h4>
                        <span className="text-[10px] bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-200 px-2 py-0.5 rounded-full font-medium">
                          {contact.relationship}
                        </span>
                      </div>
                      <p className="text-xs text-slate-500 dark:text-slate-400 font-mono mt-0.5">
                        {contact.phone}
                      </p>
                    </div>

                    <div className="flex items-center gap-1.5">
                      <button
                        onClick={() => directCall(contact.phone)}
                        className="p-2 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-400 hover:bg-emerald-100 dark:hover:bg-emerald-900/50 transition-colors cursor-pointer"
                        title="Call Contact"
                      >
                        <Phone className="w-3.5 h-3.5 fill-current" />
                      </button>
                      <button
                        onClick={() => handleSendQuickSosToContact(contact)}
                        className="p-2 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-400 hover:bg-emerald-100 dark:hover:bg-emerald-900/50 transition-colors cursor-pointer"
                        title="Send WhatsApp SOS with Location"
                      >
                        <Share2 className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => handleDelete(contact.id)}
                        className="p-2 rounded-xl text-slate-400 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-950/40 transition-colors cursor-pointer"
                        title="Delete Contact"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {activeSubTab === 'helplines' && (
          <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/80 dark:border-slate-800 shadow-xs p-5 space-y-3">
            <div className="flex items-center gap-2 pb-2 border-b border-slate-100 dark:border-slate-800">
              <span className="text-xl">🇮🇳</span>
              <h3 className="font-bold text-sm text-slate-900 dark:text-white leading-tight">
                {t('helplineNumbers')}
              </h3>
            </div>

            <div className="divide-y divide-slate-100 dark:divide-slate-800">
              {INDIAN_EMERGENCY_NUMBERS.map((serv) => (
                <div
                  key={serv.id}
                  className="py-3 flex items-center justify-between gap-3 group"
                >
                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="text-lg">{serv.icon}</span>
                      <span className="font-semibold text-xs sm:text-sm text-slate-800 dark:text-slate-100">
                        {serv.name}
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-400 dark:text-slate-500 pl-7 truncate">
                      {serv.description}
                    </p>
                  </div>

                  <button
                    onClick={() => directCall(serv.number)}
                    className="flex items-center gap-1.5 bg-slate-100 dark:bg-slate-800 hover:bg-red-50 dark:hover:bg-red-950/40 text-slate-700 dark:text-slate-200 hover:text-red-700 dark:hover:text-red-400 px-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-700 hover:border-red-200 dark:hover:border-red-900 transition-all font-mono font-bold text-xs shrink-0 cursor-pointer"
                  >
                    <Phone className="w-3 h-3 fill-current text-red-600" />
                    <span>{serv.number}</span>
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeSubTab === 'settings' && (
          <div className="space-y-4">
            {/* Preferences */}
            <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/80 dark:border-slate-800 shadow-xs p-5 space-y-4">
              <h3 className="font-bold text-sm text-slate-900 dark:text-white flex items-center gap-2">
                <Settings className="w-4 h-4 text-sky-600" />
                <span>{t('settings')}</span>
              </h3>

              <div className="space-y-3 divide-y divide-slate-100 dark:divide-slate-800">
                <div className="flex items-center justify-between pt-2">
                  <div>
                    <h4 className="font-bold text-xs text-slate-800 dark:text-slate-200">
                      {t('language')}
                    </h4>
                    <p className="text-[11px] text-slate-400">
                      English, हिन्दी, मराठी, தமிழ், मारवाड़ी
                    </p>
                  </div>
                  <button
                    onClick={onOpenLanguage}
                    className="flex items-center gap-1 px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-xs font-bold text-slate-700 dark:text-slate-200 cursor-pointer"
                  >
                    <Globe className="w-3.5 h-3.5 text-sky-600" />
                    <span className="uppercase">{language}</span>
                  </button>
                </div>

                <div className="flex items-center justify-between pt-3">
                  <div>
                    <h4 className="font-bold text-xs text-slate-800 dark:text-slate-200">
                      Appearance Theme
                    </h4>
                    <p className="text-[11px] text-slate-400">
                      {isDark ? 'Dark Mode active' : 'Light Mode active'}
                    </p>
                  </div>
                  <button
                    onClick={toggleTheme}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-xs font-bold text-slate-700 dark:text-slate-200 cursor-pointer"
                  >
                    {isDark ? <Sun className="w-3.5 h-3.5 text-amber-400" /> : <Moon className="w-3.5 h-3.5 text-slate-600" />}
                    <span>{isDark ? 'Dark' : 'Light'}</span>
                  </button>
                </div>
              </div>
            </div>

            {/* About SwasthSeva */}
            <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/80 dark:border-slate-800 shadow-xs p-5 space-y-2.5">
              <div className="flex items-center gap-2 text-slate-900 dark:text-white font-bold text-sm">
                <Info className="w-4 h-4 text-sky-600" />
                <span>About SwasthSeva (स्वास्थ्य सेवा)</span>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                SwasthSeva is an emergency health assistance companion designed for Indian users. It provides instant first-aid guidance, age-specific recommendations, GPS emergency location dispatch, allergy precautions, and AI-powered symptom triage in English, Hindi, Marathi, Tamil, and Marwari.
              </p>
              <div className="pt-2 text-[11px] text-slate-400 flex items-center justify-between border-t border-slate-100 dark:border-slate-800">
                <span>SwasthSeva Production v2.0</span>
                <span>Emergency Dial: 112 / 108</span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Add Contact Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="w-full max-w-sm bg-white dark:bg-slate-900 rounded-3xl p-5 shadow-2xl space-y-4 border border-slate-200 dark:border-slate-800">
            <div className="flex items-center justify-between">
              <h4 className="font-bold text-sm text-slate-900 dark:text-white">Add Emergency Contact</h4>
              <button
                onClick={() => setShowAddModal(false)}
                className="p-1 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleAddSubmit} className="space-y-3">
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Papa, Sunita, Rahul"
                  className="w-full text-xs p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-hidden focus:border-sky-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Phone Number
                </label>
                <input
                  type="tel"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="e.g. +91 98765 43210"
                  className="w-full text-xs p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-hidden focus:border-sky-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Relationship
                </label>
                <select
                  value={relationship}
                  onChange={(e) => setRelationship(e.target.value)}
                  className="w-full text-xs p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-hidden focus:border-sky-500"
                >
                  <option value="Family">Family Member</option>
                  <option value="Parent">Parent</option>
                  <option value="Spouse">Spouse</option>
                  <option value="Sibling">Sibling</option>
                  <option value="Friend">Friend</option>
                  <option value="Doctor">Doctor</option>
                  <option value="Neighbor">Neighbor</option>
                </select>
              </div>

              <div className="flex items-center gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="flex-1 py-2 text-xs font-bold text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2 text-xs font-bold bg-sky-600 hover:bg-sky-700 text-white rounded-xl shadow-xs cursor-pointer"
                >
                  Save Contact
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
