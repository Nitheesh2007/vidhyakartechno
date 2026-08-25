import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';
import type { Session } from '@supabase/supabase-js';
import { supabase } from '../lib/supabase';
import type { Profile } from '../lib/supabase';

const DEMO_STORAGE_KEY = 'agri_demo_session';
const DEMO_PROFILE_KEY = 'agri_demo_profile';

export const DEFAULT_DEMO_FARMER: Profile = {
  id: 'demo-farmer-001',
  full_name: 'Vicky (Farmer)',
  mobile_number: '+91 9876543210',
  village: 'Peravurani',
  district: 'Thanjavur',
  state: 'Tamil Nadu',
  farm_size: '5.0',
  soil_type: 'Clay Loam',
  irrigation_method: 'Drip Irrigation',
  profile_photo_url: '',
  role: 'farmer',
  created_at: new Date().toISOString(),
};

export const DEFAULT_DEMO_ADMIN: Profile = {
  id: 'demo-admin-001',
  full_name: 'Agriculture Officer (Admin)',
  mobile_number: '+91 9123456789',
  village: 'Thanjavur Central',
  district: 'Thanjavur',
  state: 'Tamil Nadu',
  farm_size: '50.0',
  soil_type: 'Alluvial',
  irrigation_method: 'Canal',
  profile_photo_url: '',
  role: 'admin',
  created_at: new Date().toISOString(),
};

type AuthContextType = {
  session: Session | null;
  profile: Profile | null;
  loading: boolean;
  isDemoMode: boolean;
  signOut: () => Promise<void>;
  refreshProfile: () => Promise<void>;
  loginWithDemo: (role?: 'farmer' | 'admin', customName?: string, customEmail?: string) => void;
  updateLocalProfile: (updates: Partial<Profile>) => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [session, setSession] = useState<Session | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);
  const [isDemoMode, setIsDemoMode] = useState(false);

  const fetchProfile = async (userId: string) => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .maybeSingle();
      if (!error && data) {
        setProfile(data as Profile);
      }
    } catch {
      // Fallback
    }
  };

  useEffect(() => {
    const savedDemo = localStorage.getItem(DEMO_STORAGE_KEY);
    const savedProfile = localStorage.getItem(DEMO_PROFILE_KEY);

    if (savedDemo) {
      try {
        const parsedSession = JSON.parse(savedDemo);
        const parsedProfile = savedProfile ? JSON.parse(savedProfile) : DEFAULT_DEMO_FARMER;
        setSession(parsedSession as Session);
        setProfile(parsedProfile);
        setIsDemoMode(true);
        setLoading(false);
        return;
      } catch {
        localStorage.removeItem(DEMO_STORAGE_KEY);
      }
    }

    try {
      supabase.auth.getSession().then(({ data: { session } }) => {
        setSession(session);
        if (session?.user) {
          fetchProfile(session.user.id).finally(() => setLoading(false));
        } else {
          setLoading(false);
        }
      }).catch(() => {
        setLoading(false);
      });

      const { data: authListener } = supabase.auth.onAuthStateChange((_event, session) => {
        if (!localStorage.getItem(DEMO_STORAGE_KEY)) {
          setSession(session);
          if (session?.user) {
            fetchProfile(session.user.id);
          } else {
            setProfile(null);
          }
        }
      });

      return () => {
        authListener?.subscription?.unsubscribe();
      };
    } catch {
      setLoading(false);
    }
  }, []);

  const loginWithDemo = (role: 'farmer' | 'admin' = 'farmer', customName?: string, customEmail?: string) => {
    const baseProfile = role === 'admin' ? DEFAULT_DEMO_ADMIN : DEFAULT_DEMO_FARMER;
    const activeProfile: Profile = {
      ...baseProfile,
      ...(customName ? { full_name: customName } : {}),
      role: role,
    };
    const mockSession = {
      access_token: 'demo-token-' + Date.now(),
      refresh_token: 'demo-refresh',
      expires_in: 3600,
      token_type: 'bearer',
      user: {
        id: activeProfile.id,
        email: customEmail || (role === 'admin' ? 'admin@agri.gov.in' : 'farmer@cropadvisory.in'),
        app_metadata: {},
        user_metadata: { full_name: activeProfile.full_name },
        aud: 'authenticated',
        created_at: new Date().toISOString(),
      },
    } as unknown as Session;

    localStorage.setItem(DEMO_STORAGE_KEY, JSON.stringify(mockSession));
    localStorage.setItem(DEMO_PROFILE_KEY, JSON.stringify(activeProfile));
    setSession(mockSession);
    setProfile(activeProfile);
    setIsDemoMode(true);
  };

  const updateLocalProfile = (updates: Partial<Profile>) => {
    setProfile((prev) => {
      const next = { ...(prev || DEFAULT_DEMO_FARMER), ...updates };
      localStorage.setItem(DEMO_PROFILE_KEY, JSON.stringify(next));
      return next;
    });
  };

  const signOut = async () => {
    localStorage.removeItem(DEMO_STORAGE_KEY);
    localStorage.removeItem(DEMO_PROFILE_KEY);
    setIsDemoMode(false);
    setSession(null);
    setProfile(null);
    try {
      await supabase.auth.signOut();
    } catch {
      // ignore
    }
  };

  const refreshProfile = async () => {
    if (isDemoMode) {
      const savedProfile = localStorage.getItem(DEMO_PROFILE_KEY);
      if (savedProfile) setProfile(JSON.parse(savedProfile));
    } else if (session?.user) {
      await fetchProfile(session.user.id);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        session,
        profile,
        loading,
        isDemoMode,
        signOut,
        refreshProfile,
        loginWithDemo,
        updateLocalProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}
