import React, { createContext, useContext, useEffect, useState } from 'react';
import { auth, type AuthUser } from '@/lib/auth';

interface AuthContextType {
  user: AuthUser | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string, userData: { firstName: string; lastName: string }) => Promise<void>;
  signOut: () => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Get initial user
    auth.getCurrentUser().then(setUser).finally(() => setLoading(false));

    // Listen for auth changes
    const { data: { subscription } } = auth.onAuthStateChange(setUser);

    return () => subscription.unsubscribe();
  }, []);

  const signIn = async (email: string, password: string) => {
    await auth.signIn(email, password);
  };

  const signUp = async (email: string, password: string, userData: { firstName: string; lastName: string }) => {
    await auth.signUp(email, password, userData);
  };

  const signOut = async () => {
    await auth.signOut();
  };

  const resetPassword = async (email: string) => {
    await auth.resetPassword(email);
  };

  const value = {
    user,
    loading,
    signIn,
    signUp,
    signOut,
    resetPassword,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};