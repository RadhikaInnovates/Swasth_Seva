import React, { useState } from 'react';
import { X, Lock, Mail, User, Shield, AlertTriangle, Eye, EyeOff, Check, Heart } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialMode?: 'login' | 'signup';
}

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  onClose,
  initialMode = 'login',
}) => {
  const { login, signup, forgotPassword } = useAuth();
  const { t } = useLanguage();

  const [mode, setMode] = useState<'login' | 'signup' | 'forgot'>(initialMode);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  // Form Fields
  const [fullName, setFullName] = useState('');
  const [emailOrPhone, setEmailOrPhone] = useState('');
  const [password, setPassword] = useState('');
  const [age, setAge] = useState<string>('');
  const [gender, setGender] = useState<'Male' | 'Female' | 'Other' | 'Prefer not to say'>('Prefer not to say');

  // Height & Weight units
  const [heightUnit, setHeightUnit] = useState<'cm' | 'ft'>('cm');
  const [heightCm, setHeightCm] = useState('');
  const [heightFeet, setHeightFeet] = useState('');
  const [heightInches, setHeightInches] = useState('');

  const [weightUnit, setWeightUnit] = useState<'kg' | 'lb'>('kg');
  const [weight, setWeight] = useState('');

  // Medical details
  const [allergiesInput, setAllergiesInput] = useState('');
  const [conditionsInput, setConditionsInput] = useState('');
  const [medicationsInput, setMedicationsInput] = useState('');

  // Emergency contact
  const [emergencyContactName, setEmergencyContactName] = useState('');
  const [emergencyContactPhone, setEmergencyContactPhone] = useState('');
  const [emergencyContactRelation, setEmergencyContactRelation] = useState('Family');

  // Consent
  const [consentGiven, setConsentGiven] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccessMsg(null);
    setLoading(true);

    try {
      if (mode === 'login') {
        await login(emailOrPhone.trim(), password);
        onClose();
      } else if (mode === 'signup') {
        if (!consentGiven) {
          throw new Error(t('consentRequiredError'));
        }

        const allergies = allergiesInput
          .split(',')
          .map((s) => s.trim())
          .filter(Boolean);
        const conditions = conditionsInput
          .split(',')
          .map((s) => s.trim())
          .filter(Boolean);
        const medications = medicationsInput
          .split(',')
          .map((s) => s.trim())
          .filter(Boolean);

        await signup({
          fullName: fullName.trim(),
          emailOrPhone: emailOrPhone.trim(),
          password,
          age: age ? Number(age) : undefined,
          gender,
          heightUnit,
          heightCm: heightUnit === 'cm' && heightCm ? Number(heightCm) : undefined,
          heightFeet: heightUnit === 'ft' && heightFeet ? Number(heightFeet) : undefined,
          heightInches: heightUnit === 'ft' && heightInches ? Number(heightInches) : undefined,
          weightUnit,
          weight: weight ? Number(weight) : undefined,
          allergies,
          medicalConditions: conditions,
          currentMedications: medications,
          emergencyContactName: emergencyContactName.trim() || undefined,
          emergencyContactPhone: emergencyContactPhone.trim() || undefined,
          emergencyContactRelation: emergencyContactRelation || undefined,
          consentGiven,
        });
        onClose();
      } else if (mode === 'forgot') {
        await forgotPassword(emailOrPhone.trim(), password);
        setSuccessMsg('Password reset successfully. Please log in with your new password.');
        setMode('login');
      }
    } catch (err: any) {
      setError(err.message || 'Action failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-800 max-h-[92vh] flex flex-col overflow-hidden">
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between bg-slate-50 dark:bg-slate-800/50 shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-2xl bg-sky-600 text-white flex items-center justify-center shadow-xs">
              <Heart className="w-5 h-5 fill-current" />
            </div>
            <div>
              <h3 className="font-bold text-base text-slate-900 dark:text-white leading-tight">
                {mode === 'login' ? t('login') : mode === 'signup' ? t('signup') : t('resetPassword')}
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                {mode === 'signup' ? 'Create profile for personalized first-aid' : 'Access your emergency health records'}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-xl text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Form Body */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4">
          {error && (
            <div className="p-3 bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-800 rounded-xl text-red-800 dark:text-red-300 text-xs flex items-start gap-2">
              <AlertTriangle className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
              <span>{error}</span>
            </div>
          )}

          {successMsg && (
            <div className="p-3 bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 rounded-xl text-emerald-800 dark:text-emerald-300 text-xs flex items-start gap-2">
              <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <span>{successMsg}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {mode === 'signup' && (
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  {t('fullName')} *
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="e.g. Radhika Agarwal"
                    className="w-full text-xs sm:text-sm pl-9 pr-3 py-2.5 bg-slate-50 dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-hidden focus:border-sky-500"
                  />
                </div>
              </div>
            )}

            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                {t('emailOrPhone')} *
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  required
                  value={emailOrPhone}
                  onChange={(e) => setEmailOrPhone(e.target.value)}
                  placeholder="e.g. name@example.com or +91 9876543210"
                  className="w-full text-xs sm:text-sm pl-9 pr-3 py-2.5 bg-slate-50 dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-hidden focus:border-sky-500"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                  {mode === 'forgot' ? t('newPassword') : t('password')} *
                </label>
                {mode === 'login' && (
                  <button
                    type="button"
                    onClick={() => {
                      setMode('forgot');
                      setError(null);
                    }}
                    className="text-[11px] text-sky-600 dark:text-sky-400 hover:underline font-semibold"
                  >
                    {t('forgotPassword')}
                  </button>
                )}
              </div>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  minLength={6}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Minimum 6 characters"
                  className="w-full text-xs sm:text-sm pl-9 pr-10 py-2.5 bg-slate-50 dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-hidden focus:border-sky-500"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Medical Profile Intake Fields during Sign Up */}
            {mode === 'signup' && (
              <div className="pt-3 border-t border-slate-200 dark:border-slate-800 space-y-4">
                <div className="text-xs font-bold text-sky-700 dark:text-sky-400 uppercase tracking-wider flex items-center gap-1.5">
                  <Shield className="w-3.5 h-3.5" />
                  <span>Medical Profile & Health Data (Optional)</span>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                      {t('age')}
                    </label>
                    <input
                      type="number"
                      min={1}
                      max={120}
                      value={age}
                      onChange={(e) => setAge(e.target.value)}
                      placeholder="e.g. 28"
                      className="w-full text-xs p-2.5 bg-slate-50 dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                      {t('gender')}
                    </label>
                    <select
                      value={gender}
                      onChange={(e: any) => setGender(e.target.value)}
                      className="w-full text-xs p-2.5 bg-slate-50 dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white"
                    >
                      <option value="Male">{t('male')}</option>
                      <option value="Female">{t('female')}</option>
                      <option value="Other">{t('other')}</option>
                      <option value="Prefer not to say">{t('preferNotToSay')}</option>
                    </select>
                  </div>
                </div>

                {/* Height & Weight */}
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                        {t('height')}
                      </label>
                      <div className="flex items-center gap-1 text-[10px]">
                        <button
                          type="button"
                          onClick={() => setHeightUnit('cm')}
                          className={`px-1.5 py-0.5 rounded ${heightUnit === 'cm' ? 'bg-sky-600 text-white' : 'text-slate-500'}`}
                        >
                          cm
                        </button>
                        <button
                          type="button"
                          onClick={() => setHeightUnit('ft')}
                          className={`px-1.5 py-0.5 rounded ${heightUnit === 'ft' ? 'bg-sky-600 text-white' : 'text-slate-500'}`}
                        >
                          ft
                        </button>
                      </div>
                    </div>

                    {heightUnit === 'cm' ? (
                      <input
                        type="number"
                        value={heightCm}
                        onChange={(e) => setHeightCm(e.target.value)}
                        placeholder="cm (e.g. 170)"
                        className="w-full text-xs p-2.5 bg-slate-50 dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white"
                      />
                    ) : (
                      <div className="flex gap-2">
                        <input
                          type="number"
                          placeholder="ft"
                          value={heightFeet}
                          onChange={(e) => setHeightFeet(e.target.value)}
                          className="w-1/2 text-xs p-2.5 bg-slate-50 dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white"
                        />
                        <input
                          type="number"
                          placeholder="in"
                          value={heightInches}
                          onChange={(e) => setHeightInches(e.target.value)}
                          className="w-1/2 text-xs p-2.5 bg-slate-50 dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white"
                        />
                      </div>
                    )}
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                        {t('weight')}
                      </label>
                      <div className="flex items-center gap-1 text-[10px]">
                        <button
                          type="button"
                          onClick={() => setWeightUnit('kg')}
                          className={`px-1.5 py-0.5 rounded ${weightUnit === 'kg' ? 'bg-sky-600 text-white' : 'text-slate-500'}`}
                        >
                          kg
                        </button>
                        <button
                          type="button"
                          onClick={() => setWeightUnit('lb')}
                          className={`px-1.5 py-0.5 rounded ${weightUnit === 'lb' ? 'bg-sky-600 text-white' : 'text-slate-500'}`}
                        >
                          lb
                        </button>
                      </div>
                    </div>
                    <input
                      type="number"
                      value={weight}
                      onChange={(e) => setWeight(e.target.value)}
                      placeholder={weightUnit === 'kg' ? 'e.g. 68' : 'e.g. 150'}
                      className="w-full text-xs p-2.5 bg-slate-50 dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white"
                    />
                  </div>
                </div>

                {/* Allergies */}
                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    {t('knownAllergies')}
                  </label>
                  <input
                    type="text"
                    value={allergiesInput}
                    onChange={(e) => setAllergiesInput(e.target.value)}
                    placeholder="Comma separated: Penicillin, Peanuts, Sulfa, Dust"
                    className="w-full text-xs p-2.5 bg-slate-50 dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white"
                  />
                  <span className="text-[10px] text-slate-400 mt-0.5 block">
                    Our AI automatically cross-checks these when advising treatments.
                  </span>
                </div>

                {/* Existing Conditions */}
                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    {t('existingConditions')}
                  </label>
                  <input
                    type="text"
                    value={conditionsInput}
                    onChange={(e) => setConditionsInput(e.target.value)}
                    placeholder="e.g. Asthma, Type 2 Diabetes, Hypertension, Thyroid"
                    className="w-full text-xs p-2.5 bg-slate-50 dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white"
                  />
                </div>

                {/* Current Medications */}
                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    {t('currentMedications')}
                  </label>
                  <input
                    type="text"
                    value={medicationsInput}
                    onChange={(e) => setMedicationsInput(e.target.value)}
                    placeholder="e.g. Metformin 500mg, Ecosprin 75mg, Inhaler"
                    className="w-full text-xs p-2.5 bg-slate-50 dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white"
                  />
                </div>

                {/* Emergency Contact */}
                <div className="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-xl space-y-2 border border-slate-200 dark:border-slate-700">
                  <div className="text-xs font-bold text-slate-800 dark:text-slate-200">
                    {t('emergencyContact')} (Optional)
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <input
                      type="text"
                      placeholder="Contact Name"
                      value={emergencyContactName}
                      onChange={(e) => setEmergencyContactName(e.target.value)}
                      className="text-xs p-2 bg-white dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white"
                    />
                    <input
                      type="tel"
                      placeholder="Phone Number"
                      value={emergencyContactPhone}
                      onChange={(e) => setEmergencyContactPhone(e.target.value)}
                      className="text-xs p-2 bg-white dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white"
                    />
                  </div>
                </div>

                {/* Privacy & Consent */}
                <div className="p-3.5 bg-sky-50 dark:bg-sky-950/40 rounded-xl border border-sky-200 dark:border-sky-800 space-y-2">
                  <div className="flex items-start gap-2">
                    <input
                      type="checkbox"
                      id="consentCheck"
                      checked={consentGiven}
                      onChange={(e) => setConsentGiven(e.target.checked)}
                      className="mt-0.5 rounded text-sky-600 focus:ring-sky-500"
                    />
                    <label htmlFor="consentCheck" className="text-xs text-slate-700 dark:text-slate-300 leading-snug">
                      {t('consentCheckbox')}
                    </label>
                  </div>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 pl-5 leading-normal">
                    Privacy Guarantee: Your medical data is strictly confidential, encrypted with cryptographic hashing, and never sold. You can view, edit, or permanently erase your profile and records anytime from Settings.
                  </p>
                </div>
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-sky-600 hover:bg-sky-700 active:scale-[0.98] disabled:opacity-50 text-white font-bold text-xs sm:text-sm rounded-xl shadow-md shadow-sky-600/20 transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              {loading ? (
                <span>Please wait...</span>
              ) : (
                <span>{mode === 'login' ? t('login') : mode === 'signup' ? t('signup') : t('resetPassword')}</span>
              )}
            </button>
          </form>

          {/* Mode Switcher */}
          <div className="pt-3 text-center text-xs text-slate-500 dark:text-slate-400 border-t border-slate-200 dark:border-slate-800">
            {mode === 'login' ? (
              <p>
                Don't have an account?{' '}
                <button
                  type="button"
                  onClick={() => {
                    setMode('signup');
                    setError(null);
                  }}
                  className="font-bold text-sky-600 dark:text-sky-400 hover:underline"
                >
                  {t('signup')}
                </button>
              </p>
            ) : (
              <p>
                Already have an account?{' '}
                <button
                  type="button"
                  onClick={() => {
                    setMode('login');
                    setError(null);
                  }}
                  className="font-bold text-sky-600 dark:text-sky-400 hover:underline"
                >
                  {t('login')}
                </button>
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
