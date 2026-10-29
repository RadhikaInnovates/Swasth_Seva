import React, { useState, useEffect } from 'react';
import {
  X,
  Phone,
  AlertTriangle,
  MapPin,
  MessageSquare,
  Share2,
  Copy,
  Check,
  Loader2,
  ShieldAlert,
} from 'lucide-react';
import {
  getCurrentLocation,
  generateEmergencyMessage,
  shareViaWhatsApp,
  shareViaSms,
  directCall,
  getGoogleMapsUrl,
  getSavedContacts,
} from '../utils/emergency';
import { UserLocation } from '../types';
import { useLanguage } from '../context/LanguageContext';
import { useAuth } from '../context/AuthContext';

interface SosModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SosModal: React.FC<SosModalProps> = ({ isOpen, onClose }) => {
  const { t } = useLanguage();
  const { user } = useAuth();
  const [location, setLocation] = useState<UserLocation | null>(null);
  const [locLoading, setLocLoading] = useState(false);
  const [locError, setLocError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [countdown, setCountdown] = useState<number | null>(null);

  // Fetch location when modal opens
  useEffect(() => {
    if (isOpen) {
      setCountdown(null);
      fetchLocation();
    }
  }, [isOpen]);

  const fetchLocation = async () => {
    setLocLoading(true);
    setLocError(null);
    try {
      const loc = await getCurrentLocation();
      setLocation(loc);
    } catch (err: any) {
      setLocError(err.message || 'Could not acquire location.');
    } finally {
      setLocLoading(false);
    }
  };

  const getTargetPhone = (): string | undefined => {
    if (user?.profile?.emergencyContactPhone) {
      return user.profile.emergencyContactPhone;
    }
    const contacts = getSavedContacts();
    return contacts.length > 0 ? contacts[0].phone : undefined;
  };

  const handleActivateSmartSos = () => {
    setCountdown(3);

    const interval = setInterval(() => {
      setCountdown((prev) => {
        if (prev === null || prev <= 1) {
          clearInterval(interval);
          executeSmartSos();
          return null;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const executeSmartSos = () => {
    const primaryPhone = getTargetPhone();
    const emergencyMsg = generateEmergencyMessage(location, 'URGENT: Smart SOS Activated');

    // Trigger SMS with emergency message and Google Maps coordinates
    shareViaSms(emergencyMsg, primaryPhone);

    // Call National Emergency 112
    setTimeout(() => {
      directCall('112');
    }, 800);
  };

  const cancelCountdown = () => {
    setCountdown(null);
  };

  const handleCopyMapLink = () => {
    if (!location) return;
    const link = getGoogleMapsUrl(location.lat, location.lng);
    navigator.clipboard.writeText(link);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleShareWhatsApp = () => {
    const primaryPhone = getTargetPhone();
    const emergencyMsg = generateEmergencyMessage(location);
    shareViaWhatsApp(emergencyMsg, primaryPhone);
  };

  const handleSendSms = () => {
    const primaryPhone = getTargetPhone();
    const emergencyMsg = generateEmergencyMessage(location);
    shareViaSms(emergencyMsg, primaryPhone);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="relative w-full max-w-md bg-white dark:bg-slate-900 rounded-3xl shadow-2xl overflow-hidden border border-red-100 dark:border-red-950/50">
        {/* Header */}
        <div className="bg-red-50 dark:bg-red-950/40 p-4 border-b border-red-100 dark:border-red-900/50 flex items-start justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-full bg-red-600 text-white flex items-center justify-center shrink-0 shadow-md shadow-red-600/30">
              <AlertTriangle className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-red-950 dark:text-red-200 text-base flex items-center gap-1.5">
                {t('sos_title')}
              </h3>
              <p className="text-xs text-red-700/90 dark:text-red-300/80 leading-tight">
                {t('emergency_assistance')}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-red-100/60 dark:hover:bg-red-900/40 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-4 space-y-4 max-h-[80vh] overflow-y-auto">
          {/* Quick Dial Buttons Grid */}
          <div className="grid grid-cols-2 gap-2.5">
            <button
              onClick={() => directCall('100')}
              className="flex items-center justify-between p-3 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/40 hover:border-red-300 dark:hover:border-red-800 hover:bg-red-50/40 dark:hover:bg-red-950/30 active:scale-98 transition-all group text-left cursor-pointer"
            >
              <div className="flex items-center gap-2">
                <span className="text-xl">🚓</span>
                <div>
                  <div className="text-xs font-semibold text-slate-800 dark:text-slate-200 group-hover:text-red-700 dark:group-hover:text-red-400">
                    {t('police')}
                  </div>
                  <div className="text-[11px] text-slate-500 dark:text-slate-400 font-bold">100</div>
                </div>
              </div>
              <Phone className="w-3.5 h-3.5 text-red-600 fill-current opacity-70 group-hover:opacity-100" />
            </button>

            <button
              onClick={() => directCall('108')}
              className="flex items-center justify-between p-3 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/40 hover:border-red-300 dark:hover:border-red-800 hover:bg-red-50/40 dark:hover:bg-red-950/30 active:scale-98 transition-all group text-left cursor-pointer"
            >
              <div className="flex items-center gap-2">
                <span className="text-xl">🚑</span>
                <div>
                  <div className="text-xs font-semibold text-slate-800 dark:text-slate-200 group-hover:text-red-700 dark:group-hover:text-red-400">
                    {t('ambulance')}
                  </div>
                  <div className="text-[11px] text-slate-500 dark:text-slate-400 font-bold">108</div>
                </div>
              </div>
              <Phone className="w-3.5 h-3.5 text-red-600 fill-current opacity-70 group-hover:opacity-100" />
            </button>

            <button
              onClick={() => directCall('101')}
              className="flex items-center justify-between p-3 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/40 hover:border-red-300 dark:hover:border-red-800 hover:bg-red-50/40 dark:hover:bg-red-950/30 active:scale-98 transition-all group text-left cursor-pointer"
            >
              <div className="flex items-center gap-2">
                <span className="text-xl">🚒</span>
                <div>
                  <div className="text-xs font-semibold text-slate-800 dark:text-slate-200 group-hover:text-red-700 dark:group-hover:text-red-400">
                    {t('fire_service')}
                  </div>
                  <div className="text-[11px] text-slate-500 dark:text-slate-400 font-bold">101</div>
                </div>
              </div>
              <Phone className="w-3.5 h-3.5 text-red-600 fill-current opacity-70 group-hover:opacity-100" />
            </button>

            <button
              onClick={() => directCall('112')}
              className="flex items-center justify-between p-3 rounded-2xl border border-red-200 dark:border-red-900 bg-red-50/50 dark:bg-red-950/40 hover:bg-red-100/50 dark:hover:bg-red-900/40 active:scale-98 transition-all group text-left cursor-pointer"
            >
              <div className="flex items-center gap-2">
                <span className="text-xl">🆘</span>
                <div>
                  <div className="text-xs font-bold text-red-900 dark:text-red-200">
                    {t('national_emergency')}
                  </div>
                  <div className="text-[11px] text-red-700 dark:text-red-400 font-bold">112</div>
                </div>
              </div>
              <Phone className="w-3.5 h-3.5 text-red-600 fill-current opacity-90 group-hover:opacity-100" />
            </button>
          </div>

          {/* Activate Smart SOS Button */}
          {countdown !== null ? (
            <div className="p-4 bg-red-600 text-white rounded-2xl text-center space-y-2 animate-pulse shadow-lg shadow-red-600/30">
              <div className="text-2xl font-black">{t('activating_in')} {countdown}s</div>
              <p className="text-xs text-red-100">
                Calling 112 & dispatching GPS coordinates to saved emergency contacts.
              </p>
              <button
                onClick={cancelCountdown}
                className="mt-2 bg-white text-red-700 text-xs font-bold px-4 py-1.5 rounded-xl hover:bg-red-50 shadow-xs cursor-pointer"
              >
                Cancel Immediate Trigger
              </button>
            </div>
          ) : (
            <button
              onClick={handleActivateSmartSos}
              className="w-full bg-red-600 hover:bg-red-700 active:scale-98 text-white p-3.5 rounded-2xl font-bold text-sm shadow-md shadow-red-600/20 transition-all flex flex-col items-center justify-center gap-1 group cursor-pointer"
            >
              <div className="flex items-center gap-2 text-base">
                <ShieldAlert className="w-5 h-5 group-hover:scale-110 transition-transform" />
                <span>{t('activate_sos')}</span>
              </div>
              <span className="text-[11px] text-red-100 font-normal">
                Call 112 + SMS saved contacts + Share GPS location
              </span>
            </button>
          )}

          {/* Live GPS Location card */}
          <div className="p-3.5 bg-slate-50 dark:bg-slate-800/60 rounded-2xl border border-slate-200/80 dark:border-slate-800 space-y-2.5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-800 dark:text-slate-200">
                <MapPin className="w-4 h-4 text-red-600" />
                <span>{t('gps_location')}</span>
              </div>
              {locLoading ? (
                <div className="flex items-center gap-1 text-[11px] text-slate-500 dark:text-slate-400">
                  <Loader2 className="w-3 h-3 animate-spin text-sky-600" />
                  <span>{t('locating')}</span>
                </div>
              ) : (
                <button
                  onClick={fetchLocation}
                  className="text-[11px] text-sky-600 dark:text-sky-400 hover:underline font-semibold cursor-pointer"
                >
                  {t('refresh_gps')}
                </button>
              )}
            </div>

            {location ? (
              <div className="space-y-2">
                <p className="text-xs text-slate-700 dark:text-slate-300 font-medium line-clamp-2">
                  {location.address || 'Address acquired from GPS coordinates'}
                </p>
                <div className="flex items-center justify-between text-[11px] text-slate-500 dark:text-slate-400">
                  <span>
                    Lat: {location.lat.toFixed(5)}, Lng: {location.lng.toFixed(5)}
                  </span>
                  <span className="text-emerald-600 dark:text-emerald-400 font-medium">
                    ±{location.accuracy}m accuracy
                  </span>
                </div>
                <div className="flex items-center gap-2 pt-1">
                  <button
                    onClick={handleCopyMapLink}
                    className="flex-1 flex items-center justify-center gap-1 text-xs bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 py-2 px-2 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors cursor-pointer"
                  >
                    {copied ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-600" />
                        <span className="text-emerald-600 font-semibold">{t('link_copied')}</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5 text-slate-400" />
                        <span>{t('copy_map_link')}</span>
                      </>
                    )}
                  </button>
                  <a
                    href={getGoogleMapsUrl(location.lat, location.lng)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 flex items-center justify-center gap-1 text-xs bg-sky-50 dark:bg-sky-950/60 border border-sky-200 dark:border-sky-800 text-sky-700 dark:text-sky-300 py-2 px-2 rounded-xl hover:bg-sky-100 dark:hover:bg-sky-900/60 transition-colors font-medium text-center"
                  >
                    Open in Maps ↗
                  </a>
                </div>
              </div>
            ) : locError ? (
              <div className="p-2.5 bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800 rounded-xl text-xs text-amber-800 dark:text-amber-300">
                <p className="font-semibold">{locError}</p>
                <button
                  onClick={fetchLocation}
                  className="mt-1 text-sky-700 dark:text-sky-400 underline text-[11px] font-bold cursor-pointer"
                >
                  Click to allow location permission
                </button>
              </div>
            ) : null}
          </div>

          {/* Quick Action Share buttons */}
          <div className="grid grid-cols-2 gap-2 pt-1">
            <button
              onClick={handleShareWhatsApp}
              className="flex items-center justify-center gap-2 py-2.5 px-3 bg-emerald-600 hover:bg-emerald-700 active:scale-98 text-white rounded-xl text-xs font-bold transition-all shadow-xs cursor-pointer"
            >
              <Share2 className="w-4 h-4" />
              <span>{t('whatsapp_alert')}</span>
            </button>
            <button
              onClick={handleSendSms}
              className="flex items-center justify-center gap-2 py-2.5 px-3 bg-slate-800 hover:bg-slate-900 active:scale-98 text-white rounded-xl text-xs font-bold transition-all shadow-xs cursor-pointer"
            >
              <MessageSquare className="w-4 h-4" />
              <span>{t('send_sms')}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
