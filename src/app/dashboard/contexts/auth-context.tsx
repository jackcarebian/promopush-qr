
'use client';

import React, { createContext, useContext, useState, ReactNode, useCallback, useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { getMemberByEmail, type Member } from '@/data/members';

export type User = {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'demo' | 'member';
  outletId?: string;
  registrationDate?: string; // For demo account expiration
};

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (credentials: { email: string; pass?: string; role: User['role'] }) => boolean;
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
      const storedUserJSON = localStorage.getItem('user');
      if (storedUserJSON) {
        const storedUser = JSON.parse(storedUserJSON);
        
        // Check for demo account expiration
        if (storedUser.role === 'demo' && storedUser.registrationDate) {
          const registrationDate = new Date(storedUser.registrationDate);
          const thirtyDaysAgo = new Date();
          thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

          if (registrationDate < thirtyDaysAgo) {
            // Account has expired, log them out
            localStorage.removeItem('user');
            setUser(null);
            router.push('/login?reason=demo_expired'); // Optional: handle this on login page
            setLoading(false);
            return;
          }
        }
        
        setUser(storedUser);
      }
    } catch (error) {
      console.error("Failed to parse user from localStorage", error);
      localStorage.removeItem('user');
    } finally {
        setLoading(false);
    }
  }, [router]);

  useEffect(() => {
    // Redirect to login if not authenticated and not on a public page
    if (!loading && !user && !pathname.startsWith('/login') && !pathname.startsWith('/register') && pathname !== '/') {
        router.push('/login');
    }
  }, [user, loading, pathname, router]);

  const login = useCallback((credentials: { email: string; pass?: string; role: User['role'] }): boolean => {
    let loggedInUser: User | null = null;

    if (credentials.role === 'admin' && credentials.email === 'jimmy.tjahyono@gmail.com' && credentials.pass === '+-Sejam#123') {
      loggedInUser = { id: 'admin-user', name: 'Admin Utama', email: 'jimmy.tjahyono@gmail.com', role: 'admin' };
    } else if (credentials.role === 'demo') {
        // Create a transient demo user
        console.log(`--- SIMULASI EMAIL ---
Kepada: jimmy.tjahyono@gmail.com
Subjek: Pendaftaran Demo Baru
Isi: Pengguna dengan email ${credentials.email} telah mendaftar untuk akun demo.
--------------------`);

        loggedInUser = { 
            id: credentials.email, // Use email as a unique ID for the demo session
            name: 'Akun Demo', 
            email: credentials.email, 
            role: 'demo',
            registrationDate: new Date().toISOString()
        };

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
