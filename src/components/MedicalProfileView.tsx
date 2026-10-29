import React, { useState } from 'react';
import {
  User,
  Shield,
  Heart,
  AlertTriangle,
  Edit2,
  Trash2,
  LogOut,
  Phone,
  CheckCircle,
  FileText,
  Lock,
  Plus,
  Scale,
  Ruler,
  Clock,
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';
import { MedicalProfile } from '../types/auth';

interface MedicalProfileViewProps {
  onOpenAuth: (mode?: 'login' | 'signup') => void;
}

export const MedicalProfileView: React.FC<MedicalProfileViewProps> = ({ onOpenAuth }) => {
  const { user, logout, updateProfile, deleteAccount } = useAuth();
  const { t } = useLanguage();

  const [isEditing, setIsEditing] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [saveError, setSaveError] = useState<string | null>(null);

  // Edit fields state
  const [fullName, setFullName] = useState(user?.profile?.fullName || '');
  const [age, setAge] = useState(user?.profile?.age ? String(user?.profile?.age) : '');
  const [gender, setGender] = useState(user?.profile?.gender || 'Prefer not to say');
  const [heightCm, setHeightCm] = useState(user?.profile?.heightCm ? String(user?.profile?.heightCm) : '');
  const [weight, setWeight] = useState(user?.profile?.weight ? String(user?.profile?.weight) : '');
  const [allergiesInput, setAllergiesInput] = useState(user?.profile?.allergies?.join(', ') || '');
  const [conditionsInput, setConditionsInput] = useState(user?.profile?.medicalConditions?.join(', ') || '');
  const [medicationsInput, setMedicationsInput] = useState(user?.profile?.currentMedications?.join(', ') || '');
  const [emergencyName, setEmergencyName] = useState(user?.profile?.emergencyContactName || '');
  const [emergencyPhone, setEmergencyPhone] = useState(user?.profile?.emergencyContactPhone || '');
  const [emergencyRelation, setEmergencyRelation] = useState(user?.profile?.emergencyContactRelation || 'Family');

  const handleStartEdit = () => {
    if (!user) return;
    setFullName(user.profile.fullName || user.fullName);
    setAge(user.profile.age ? String(user.profile.age) : '');
    setGender(user.profile.gender || 'Prefer not to say');
    setHeightCm(user.profile.heightCm ? String(user.profile.heightCm) : '');
    setWeight(user.profile.weight ? String(user.profile.weight) : '');
    setAllergiesInput(user.profile.allergies?.join(', ') || '');
    setConditionsInput(user.profile.medicalConditions?.join(', ') || '');
    setMedicationsInput(user.profile.currentMedications?.join(', ') || '');
    setEmergencyName(user.profile.emergencyContactName || '');
    setEmergencyPhone(user.profile.emergencyContactPhone || '');
    setEmergencyRelation(user.profile.emergencyContactRelation || 'Family');
    setIsEditing(true);
    setSaveError(null);
  };

  const handleSaveProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaveError(null);
    try {
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

      await updateProfile({
        fullName: fullName.trim(),
        age: age ? Number(age) : undefined,
        gender: gender as any,
        heightCm: heightCm ? Number(heightCm) : undefined,
        weight: weight ? Number(weight) : undefined,
        allergies,
        medicalConditions: conditions,
        currentMedications: medications,
        emergencyContactName: emergencyName.trim() || undefined,
        emergencyContactPhone: emergencyPhone.trim() || undefined,
        emergencyContactRelation: emergencyRelation || undefined,
      });

      setSaveSuccess(true);
      setIsEditing(false);
      setTimeout(() => setSaveSuccess(false), 3000);
    } catch (err: any) {
      setSaveError(err.message || 'Failed to save profile');
    }
  };

  const handleDeleteAccount = async () => {
    try {
      await deleteAccount();
      setShowDeleteConfirm(false);
    } catch (err: any) {
      alert(err.message || 'Failed to delete account');
    }
  };

  if (!user) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-6 text-center shadow-lg space-y-4">
          <div className="w-16 h-16 rounded-3xl bg-sky-100 dark:bg-sky-950/60 text-sky-600 dark:text-sky-400 mx-auto flex items-center justify-center">
            <Heart className="w-8 h-8 fill-current" />
          </div>
          <div>
            <h3 className="font-bold text-lg text-slate-900 dark:text-white">
              {t('myMedicalProfile')}
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 leading-relaxed">
              Create a free secure profile to cross-check dangerous drug allergies, receive age-tailored first-aid guidance, and access your emergency health history.
            </p>
          </div>

          <div className="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-2xl border border-slate-100 dark:border-slate-800 text-left space-y-2 text-xs text-slate-600 dark:text-slate-300">
            <div className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-emerald-500 shrink-0" />
              <span>Personalized allergy and medical condition alerts</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-emerald-500 shrink-0" />
              <span>Contextual AI doctor assistant customized to your health</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-emerald-500 shrink-0" />
              <span>Encrypted local storage with full account deletion rights</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2 pt-2">
            <button
              onClick={() => onOpenAuth('login')}
              className="py-3 px-4 rounded-xl border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200 font-bold text-xs"
            >
              {t('login')}
            </button>
            <button
              onClick={() => onOpenAuth('signup')}
              className="py-3 px-4 rounded-xl bg-sky-600 hover:bg-sky-700 text-white font-bold text-xs shadow-md shadow-sky-600/20"
            >
              {t('signup')}
            </button>
          </div>

          <p className="text-[11px] text-slate-400">
            Emergency guidance is always free and accessible without mandatory login.
          </p>
        </div>
      </div>
    );
  }

  const profile = user.profile;

  // BMI calculation
  let bmi: number | null = null;
  if (profile.heightCm && profile.weight) {
    const heightM = profile.heightCm / 100;
    bmi = Number((profile.weight / (heightM * heightM)).toFixed(1));
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-4 space-y-5">
      {saveSuccess && (
        <div className="p-3 bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 rounded-2xl text-emerald-800 dark:text-emerald-300 text-xs font-semibold flex items-center gap-2">
          <CheckCircle className="w-4 h-4 text-emerald-600" />
          <span>{t('profileSaved')}</span>
        </div>
      )}

      {/* Main Profile Header Card */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-5 shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3.5">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-sky-600 to-blue-600 text-white font-black text-xl flex items-center justify-center shadow-md">
            {profile.fullName.charAt(0).toUpperCase()}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="font-bold text-base sm:text-lg text-slate-900 dark:text-white leading-tight">
                {profile.fullName}
              </h2>
              <span className="text-[10px] bg-sky-100 dark:bg-sky-950/80 text-sky-700 dark:text-sky-300 font-semibold px-2 py-0.5 rounded-full">
                Verified Profile
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-0.5">{profile.emailOrPhone}</p>
          </div>
        </div>

        <div className="flex items-center gap-2 self-end sm:self-auto">
          {!isEditing ? (
            <button
              onClick={handleStartEdit}
              className="flex items-center gap-1.5 px-3.5 py-2 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-xl text-xs font-bold text-slate-700 dark:text-slate-200 transition-colors"
            >
              <Edit2 className="w-3.5 h-3.5" />
              <span>{t('editProfile')}</span>
            </button>
          ) : (
            <button
              onClick={() => setIsEditing(false)}
              className="px-3 py-2 bg-slate-100 dark:bg-slate-800 rounded-xl text-xs font-bold text-slate-600 dark:text-slate-300"
            >
              Cancel
            </button>
          )}

          <button
            onClick={logout}
            className="flex items-center gap-1.5 px-3 py-2 bg-slate-100 dark:bg-slate-800 hover:bg-red-50 dark:hover:bg-red-950/40 text-slate-600 dark:text-slate-300 hover:text-red-600 dark:hover:text-red-400 rounded-xl text-xs font-bold transition-colors"
            title="Log Out"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">{t('logout')}</span>
          </button>
        </div>
      </div>

      {/* Editing Form */}
      {isEditing ? (
        <form
          onSubmit={handleSaveProfile}
          className="bg-white dark:bg-slate-900 rounded-3xl border border-sky-300 dark:border-sky-800 p-5 shadow-lg space-y-4 animate-in fade-in duration-200"
        >
          <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-2">
            <h3 className="font-bold text-sm text-slate-900 dark:text-white flex items-center gap-2">
              <Edit2 className="w-4 h-4 text-sky-600" />
              <span>Update Medical Profile</span>
            </h3>
          </div>

          {saveError && (
            <div className="p-3 bg-red-50 text-red-700 text-xs rounded-xl border border-red-200">
              {saveError}
            </div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                {t('fullName')}
              </label>
              <input
                type="text"
                required
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="w-full text-xs p-2.5 bg-slate-50 dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                {t('age')}
              </label>
              <input
                type="number"
                value={age}
                onChange={(e) => setAge(e.target.value)}
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

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Height (cm)
              </label>
              <input
                type="number"
                value={heightCm}
                onChange={(e) => setHeightCm(e.target.value)}
                className="w-full text-xs p-2.5 bg-slate-50 dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Weight (kg)
              </label>
              <input
                type="number"
                value={weight}
                onChange={(e) => setWeight(e.target.value)}
                className="w-full text-xs p-2.5 bg-slate-50 dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
              {t('knownAllergies')}
            </label>
            <input
              type="text"
              value={allergiesInput}
              onChange={(e) => setAllergiesInput(e.target.value)}
              placeholder="e.g. Penicillin, Aspirin, Peanuts"
              className="w-full text-xs p-2.5 bg-slate-50 dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
              {t('existingConditions')}
            </label>
            <input
              type="text"
              value={conditionsInput}
              onChange={(e) => setConditionsInput(e.target.value)}
              placeholder="e.g. Asthma, Hypertension, Diabetes"
              className="w-full text-xs p-2.5 bg-slate-50 dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
              {t('currentMedications')}
            </label>
            <input
              type="text"
              value={medicationsInput}
              onChange={(e) => setMedicationsInput(e.target.value)}
              placeholder="e.g. Inhaler 100mcg, Metformin 500mg"
              className="w-full text-xs p-2.5 bg-slate-50 dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Emergency Contact Name
              </label>
              <input
                type="text"
                value={emergencyName}
                onChange={(e) => setEmergencyName(e.target.value)}
                className="w-full text-xs p-2.5 bg-slate-50 dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Emergency Contact Phone
              </label>
              <input
                type="tel"
                value={emergencyPhone}
                onChange={(e) => setEmergencyPhone(e.target.value)}
                className="w-full text-xs p-2.5 bg-slate-50 dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white"
              />
            </div>
          </div>

          <div className="flex justify-end gap-2 pt-2">
            <button
              type="button"
              onClick={() => setIsEditing(false)}
              className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 dark:text-slate-300"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 rounded-xl bg-sky-600 hover:bg-sky-700 text-white font-bold text-xs shadow-xs"
            >
              Save Changes
            </button>
          </div>
        </form>
      ) : (
        /* Read-only Medical Overview */
        <div className="space-y-4">
          {/* Key Vitals & Demographics */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="bg-white dark:bg-slate-900 p-3.5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs">
              <span className="text-[11px] text-slate-400 font-semibold">{t('age')}</span>
              <p className="text-sm sm:text-base font-bold text-slate-800 dark:text-slate-100 mt-0.5">
                {profile.age ? `${profile.age} yrs` : 'Not set'}
              </p>
            </div>
            <div className="bg-white dark:bg-slate-900 p-3.5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs">
              <span className="text-[11px] text-slate-400 font-semibold">{t('gender')}</span>
              <p className="text-sm sm:text-base font-bold text-slate-800 dark:text-slate-100 mt-0.5">
                {profile.gender || 'Not set'}
              </p>
            </div>
            <div className="bg-white dark:bg-slate-900 p-3.5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs">
              <span className="text-[11px] text-slate-400 font-semibold">{t('height')} & {t('weight')}</span>
              <p className="text-xs sm:text-sm font-bold text-slate-800 dark:text-slate-100 mt-0.5">
                {profile.heightCm ? `${profile.heightCm}cm` : '--'} / {profile.weight ? `${profile.weight}kg` : '--'}
              </p>
            </div>
            <div className="bg-white dark:bg-slate-900 p-3.5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs">
              <span className="text-[11px] text-slate-400 font-semibold">BMI Index</span>
              <p className="text-sm sm:text-base font-bold text-sky-600 dark:text-sky-400 mt-0.5">
                {bmi ? `${bmi} kg/m²` : '--'}
              </p>
            </div>
          </div>

          {/* Active Clinical Safeguards */}
          <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-5 shadow-xs space-y-4">
            <div className="flex items-center gap-2 pb-2 border-b border-slate-100 dark:border-slate-800">
              <Shield className="w-4 h-4 text-sky-600" />
              <h3 className="font-bold text-sm text-slate-900 dark:text-white">
                Active Clinical Safeguards & Precautions
              </h3>
            </div>

            {/* Allergies */}
            <div>
              <div className="text-xs font-semibold text-slate-600 dark:text-slate-400 mb-1.5 flex items-center gap-1.5">
                <AlertTriangle className="w-3.5 h-3.5 text-amber-500" />
                <span>Known Allergies:</span>
              </div>
              {profile.allergies?.length ? (
                <div className="flex flex-wrap gap-1.5">
                  {profile.allergies.map((allg, idx) => (
                    <span
                      key={idx}
                      className="px-2.5 py-1 bg-red-50 dark:bg-red-950/40 text-red-700 dark:text-red-300 border border-red-200 dark:border-red-800 rounded-lg text-xs font-bold"
                    >
                      ⚠️ {allg}
                    </span>
                  ))}
                </div>
              ) : (
                <p className="text-xs text-slate-400 italic">No drug or food allergies recorded.</p>
              )}
            </div>

            {/* Conditions */}
            <div>
              <div className="text-xs font-semibold text-slate-600 dark:text-slate-400 mb-1.5">
                Chronic Health Conditions:
              </div>
              {profile.medicalConditions?.length ? (
                <div className="flex flex-wrap gap-1.5">
                  {profile.medicalConditions.map((cond, idx) => (
                    <span
                      key={idx}
                      className="px-2.5 py-1 bg-sky-50 dark:bg-sky-950/40 text-sky-700 dark:text-sky-300 border border-sky-200 dark:border-sky-800 rounded-lg text-xs font-semibold"
                    >
                      {cond}
                    </span>
                  ))}
                </div>
              ) : (
                <p className="text-xs text-slate-400 italic">No existing conditions recorded.</p>
              )}
            </div>

            {/* Medications */}
            <div>
              <div className="text-xs font-semibold text-slate-600 dark:text-slate-400 mb-1.5">
                Current Medications:
              </div>
              {profile.currentMedications?.length ? (
                <div className="flex flex-wrap gap-1.5">
                  {profile.currentMedications.map((med, idx) => (
                    <span
                      key={idx}
                      className="px-2.5 py-1 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 rounded-lg text-xs font-medium"
                    >
                      💊 {med}
                    </span>
                  ))}
                </div>
              ) : (
                <p className="text-xs text-slate-400 italic">None recorded.</p>
              )}
            </div>
          </div>

          {/* Privacy & Account Deletion Guarantee */}
          <div className="bg-slate-50 dark:bg-slate-800/50 p-4 rounded-3xl border border-slate-200 dark:border-slate-800 space-y-3">
            <div className="flex items-center gap-2 text-xs font-bold text-slate-800 dark:text-slate-200">
              <Lock className="w-3.5 h-3.5 text-sky-600" />
              <span>Medical Privacy & Data Deletion Guarantee</span>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
              Your sensitive medical profile is linked exclusively to your authenticated session. It is protected with salted cryptographic hashing and never shared with advertisers or third parties. You have the permanent right to erase all your records.
            </p>

            <div className="pt-2 border-t border-slate-200 dark:border-slate-700 flex justify-between items-center">
              <span className="text-[11px] text-slate-400">Account ID: {user.id}</span>
              <button
                onClick={() => setShowDeleteConfirm(true)}
                className="text-xs font-bold text-red-600 dark:text-red-400 hover:underline flex items-center gap-1"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>{t('deleteAccount')}</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Account Modal Confirmation */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="w-full max-w-sm bg-white dark:bg-slate-900 rounded-3xl p-5 shadow-2xl border border-red-200 dark:border-red-900 space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-red-100 dark:bg-red-950/80 text-red-600 mx-auto flex items-center justify-center">
              <Trash2 className="w-6 h-6" />
            </div>
            <div className="text-center">
              <h4 className="font-bold text-base text-slate-900 dark:text-white">
                Delete Account & Medical Data?
              </h4>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                {t('deleteAccountConfirm')}
              </p>
            </div>
            <div className="grid grid-cols-2 gap-2 pt-2">
              <button
                onClick={() => setShowDeleteConfirm(false)}
                className="py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 text-xs font-bold text-slate-600 dark:text-slate-300"
              >
                Cancel
              </button>
              <button
                onClick={handleDeleteAccount}
                className="py-2.5 rounded-xl bg-red-600 hover:bg-red-700 text-white text-xs font-bold shadow-xs"
              >
                Yes, Delete Permanently
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
