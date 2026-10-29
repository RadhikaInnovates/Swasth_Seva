import { EmergencyContact, UserLocation } from '../types';

const CONTACTS_STORAGE_KEY = 'swasthseva_emergency_contacts_v1';

export async function getCurrentLocation(): Promise<UserLocation> {
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
      reject(new Error('Geolocation is not supported by your browser or device.'));
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        const { latitude, longitude, accuracy } = pos.coords;
        let address = '';

        try {
          const res = await fetch(`/api/geocode?lat=${latitude}&lng=${longitude}`);
          if (res.ok) {
            const data = await res.json();
            address = data.displayName || '';
          }
        } catch (e) {
          console.warn('Geocoding fallback', e);
        }

        resolve({
          lat: latitude,
          lng: longitude,
          accuracy: Math.round(accuracy),
          address,
          timestamp: pos.timestamp,
        });
      },
      (error) => {
        let msg = 'Failed to acquire location.';
        switch (error.code) {
          case error.PERMISSION_DENIED:
            msg = 'Location permission was denied. Please allow location access in your browser settings to share your GPS position with emergency responders.';
            break;
          case error.POSITION_UNAVAILABLE:
            msg = 'Location signal unavailable. Please ensure your device GPS is turned on.';
            break;
          case error.TIMEOUT:
            msg = 'Location request timed out. Retrying may help.';
            break;
        }
        reject(new Error(msg));
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 30000,
      }
    );
  });
}

export function getGoogleMapsUrl(lat: number, lng: number): string {
  return `https://www.google.com/maps?q=${lat},${lng}`;
}

export function generateEmergencyMessage(location?: UserLocation | null, customNote?: string): string {
  let msg = '🚨 EMERGENCY SOS ALERT from SwasthSeva!\nI need urgent emergency medical assistance.';
  if (customNote) {
    msg += `\nCondition: ${customNote}`;
  }
  if (location) {
    msg += `\n\n📍 My Live GPS Location:\n${getGoogleMapsUrl(location.lat, location.lng)}`;
    if (location.address) {
      msg += `\nNear: ${location.address}`;
    }
    msg += `\n(Accuracy: ~${location.accuracy}m)`;
  } else {
    msg += '\n(GPS location pending)';
  }
  msg += '\nPlease send help or alert Emergency 112 / 108 immediately!';
  return msg;
}

export function shareViaWhatsApp(message: string, phoneNumber?: string): void {
  const cleanPhone = phoneNumber ? phoneNumber.replace(/\D/g, '') : '';
  const url = cleanPhone
    ? `https://wa.me/${cleanPhone}?text=${encodeURIComponent(message)}`
    : `https://wa.me/?text=${encodeURIComponent(message)}`;
  window.open(url, '_blank', 'noopener,noreferrer');
}

export function shareViaSms(message: string, phoneNumber?: string): void {
  const cleanPhone = phoneNumber ? phoneNumber.replace(/\D/g, '') : '';
  // iOS and Android compatible format
  const separator = navigator.userAgent.match(/iPhone|iPad|iPod/i) ? '&' : '?';
  const url = cleanPhone
    ? `sms:${cleanPhone}${separator}body=${encodeURIComponent(message)}`
    : `sms:${separator}body=${encodeURIComponent(message)}`;
  window.location.href = url;
}

export function directCall(phoneNumber: string): void {
  const clean = phoneNumber.replace(/[^0-9+]/g, '');
  window.location.href = `tel:${clean}`;
}

// Emergency Contacts management in localStorage
export function getSavedContacts(): EmergencyContact[] {
  try {
    const raw = localStorage.getItem(CONTACTS_STORAGE_KEY);
    if (!raw) {
      // Default initial contact recommendation
      const initial: EmergencyContact[] = [
        {
          id: '1',
          name: 'Primary Family Contact',
          phone: '+91 98765 43210',
          relationship: 'Family Member',
        },
      ];
      localStorage.setItem(CONTACTS_STORAGE_KEY, JSON.stringify(initial));
      return initial;
    }
    return JSON.parse(raw);
  } catch (e) {
    return [];
  }
}

export function saveContact(contact: Omit<EmergencyContact, 'id'>): EmergencyContact {
  const contacts = getSavedContacts();
  const newContact: EmergencyContact = {
    ...contact,
    id: Date.now().toString(),
  };
  contacts.push(newContact);
  localStorage.setItem(CONTACTS_STORAGE_KEY, JSON.stringify(contacts));
  return newContact;
}

export function deleteContact(id: string): void {
  const contacts = getSavedContacts().filter((c) => c.id !== id);
  localStorage.setItem(CONTACTS_STORAGE_KEY, JSON.stringify(contacts));
}
