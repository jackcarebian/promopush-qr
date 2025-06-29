
'use client';

import React, { createContext, useContext, useState, ReactNode, useCallback, useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { getMemberByEmail, type Member } from '@/data/members';

export type User = {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'operator' | 'member';
  outletId?: string;
};

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (credentials: { email: string; pass: string; role: User['role'] }) => boolean;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    // On component mount, check for user data in localStorage to persist session
    try {
      const storedUser = localStorage.getItem('user');
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }
    } catch (error) {
      console.error("Failed to parse user from localStorage", error);
      localStorage.removeItem('user');
    } finally {
        setLoading(false);
    }
  }, []);

  useEffect(() => {
    // Redirect to login if not authenticated and not on a public page
    if (!loading && !user && !pathname.startsWith('/login') && !pathname.startsWith('/register') && pathname !== '/') {
        router.push('/login');
    }
  }, [user, loading, pathname, router]);

  const login = useCallback((credentials: { email: string; pass: string; role: User['role'] }): boolean => {
    let loggedInUser: User | null = null;

    if (credentials.role === 'admin' && credentials.email === 'admin@promopush.com' && credentials.pass === 'admin123') {
      loggedInUser = { id: 'admin-user', name: 'Admin Utama', email: 'admin@promopush.com', role: 'admin' };
    } else if (credentials.role === 'operator' && credentials.email === 'operator@promopush.com' && credentials.pass === 'operator123') {
      loggedInUser = { id: 'operator-user', name: 'Operator Kasir', email: 'operator@promopush.com', role: 'operator' };
    } else if (credentials.role === 'member') {
      const member = getMemberByEmail(credentials.email);
      if (member && member.password === credentials.pass) {
        loggedInUser = { ...member };
      }
    }
    
    if (loggedInUser) {
      setUser(loggedInUser);
      localStorage.setItem('user', JSON.stringify(loggedInUser)); // Persist user session
      router.push('/dashboard');
      return true;
    }
    
    return false;
  }, [router]);

  const logout = useCallback(() => {
    setUser(null);
    localStorage.removeItem('user'); // Clear persisted session
    router.push('/login');
  }, [router]);

  return (
    <AuthContext.Provider value={{ user, loading, login, logout }}>
      {loading ? null : children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
