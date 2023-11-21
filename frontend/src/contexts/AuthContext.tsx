import { createContext, useEffect, useState } from 'react';
import { isValidSession } from '../api/auth';
import { Auth } from '../types/api/auth';

interface AuthContextType {
  auth: Auth | null;
  setAuth: React.Dispatch<React.SetStateAction<Auth | null>>;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [auth, setAuth] = useState<Auth | null>(null);

  useEffect(() => {
    const isSignedIn = localStorage.getItem('isSignedIn');
    const refreshAuth = async () => {
      try {
        const result = await isValidSession();
        setAuth(result);
      } catch (error) {
        localStorage.setItem('isSignedIn', 'false');
      }
    };

    if (isSignedIn === 'true' && auth === null) {
      refreshAuth();
    }
  }, []);

  useEffect(() => {
    if (auth) {
      localStorage.setItem('isSignedIn', 'true');
      return;
    }

    localStorage.setItem('isSignedIn', 'false');
  }, [auth]);

  return (
    <AuthContext.Provider value={{ auth, setAuth }}>
      {children}
    </AuthContext.Provider>
  );
}

export default AuthContext;
