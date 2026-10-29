import React, { createContext, useContext, useState, useEffect } from 'react';
import { MedicalProfile, UserSession } from '../types/auth';

interface AuthContextType {
  user: UserSession | null;
  loading: boolean;
  login: (emailOrPhone: string, password: string) => Promise<void>;
  signup: (userData: any) => Promise<void>;
  logout: () => Promise<void>;
  updateProfile: (profile: Partial<MedicalProfile>) => Promise<void>;
  deleteAccount: () => Promise<void>;
  forgotPassword: (emailOrPhone: string, newPassword: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const AUTH_STORAGE_KEY = 'swasthseva_auth_session_v1';

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UserSession | null>(null);
  const [loading, setLoading] = useState(true);

  // Initialize from localStorage and verify with server
  useEffect(() => {
    const initAuth = async () => {
      try {
        const stored = localStorage.getItem(AUTH_STORAGE_KEY);
        if (stored) {
          const parsed: UserSession = JSON.parse(stored);
          setUser(parsed);

          // Verify token in background with server
          const res = await fetch('/api/auth/me', {
            headers: { Authorization: `Bearer ${parsed.token}` },
          });
          if (res.ok) {
            const data = await res.json();
            const updated = { ...parsed, profile: data.user.profile, fullName: data.user.fullName };
            setUser(updated);
            localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(updated));
          } else {
            // Token expired on server
            localStorage.removeItem(AUTH_STORAGE_KEY);
            setUser(null);
          }
        }
      } catch (err) {
        console.warn('Auth init failed:', err);
      } finally {
        setLoading(false);
      }
    };

    initAuth();
  }, []);

  const signup = async (userData: any) => {
    const res = await fetch('/api/auth/signup', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(userData),
    });
    const data = await res.json();
    if (!res.ok) {
      throw new Error(data.error || 'Registration failed');
    }

    const session: UserSession = {
      id: data.user.id,
      emailOrPhone: data.user.emailOrPhone,
      fullName: data.user.fullName,
      token: data.token,
      profile: data.user.profile,
    };
    setUser(session);
    localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(session));
  };

  const login = async (emailOrPhone: string, password: string) => {
    const res = await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ emailOrPhone, password }),
    });
    const data = await res.json();
    if (!res.ok) {
      throw new Error(data.error || 'Login failed');
    }

    const session: UserSession = {
      id: data.user.id,
      emailOrPhone: data.user.emailOrPhone,
      fullName: data.user.fullName,
      token: data.token,
      profile: data.user.profile,
    };
    setUser(session);
    localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(session));
  };

  const logout = async () => {
    if (user?.token) {
      try {
        await fetch('/api/auth/logout', {
          method: 'POST',
          headers: { Authorization: `Bearer ${user.token}` },
        });
      } catch (e) {
        // ignore
      }
    }
    setUser(null);
    localStorage.removeItem(AUTH_STORAGE_KEY);
  };

  const updateProfile = async (profileData: Partial<MedicalProfile>) => {
    if (!user) throw new Error('Not logged in');
    const res = await fetch('/api/auth/profile', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${user.token}`,
      },
      body: JSON.stringify(profileData),
    });
    const data = await res.json();
    if (!res.ok) {
      throw new Error(data.error || 'Failed to update profile');
    }

    const updatedSession: UserSession = {
      ...user,
      fullName: data.user.fullName || user.fullName,
      profile: data.user.profile,
    };
    setUser(updatedSession);
    localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(updatedSession));
  };

  const forgotPassword = async (emailOrPhone: string, newPassword: string) => {
    const res = await fetch('/api/auth/forgot-password', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ emailOrPhone, newPassword }),
    });
    const data = await res.json();
    if (!res.ok) {
      throw new Error(data.error || 'Password reset failed');
    }
  };

  const deleteAccount = async () => {
    if (!user) return;
    const res = await fetch('/api/auth/delete-account', {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${user.token}` },
    });
    if (!res.ok) {
      const data = await res.json();
      throw new Error(data.error || 'Failed to delete account');
    }
    setUser(null);
    localStorage.removeItem(AUTH_STORAGE_KEY);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        login,
        signup,
        logout,
        updateProfile,
        deleteAccount,
        forgotPassword,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
