import { createContext, useEffect, useState } from 'react';
import { Auth } from '@type/api/auth';
import { isValidSession } from '@API/auth';
import {
  CHAT_NOTICE,
  IS_SIGNED_IN,
  POST_NOTICE,
} from '@constants/localStorageKeys';

interface AuthContextType {
  auth: Auth | null;
  setAuth: React.Dispatch<React.SetStateAction<Auth | null>>;
}

const AuthContext = createContext<AuthContextType | null>(null);
const TRUE = 'true';

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [auth, setAuth] = useState<Auth | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const removeStoredData = () => {
    localStorage.removeItem(IS_SIGNED_IN);
    localStorage.removeItem(CHAT_NOTICE);
    localStorage.removeItem(POST_NOTICE);
  };

  useEffect(() => {
    (async function refreshAuth() {
      const isSignedIn = localStorage.getItem(IS_SIGNED_IN);
      if (isSignedIn !== TRUE || auth !== null) {
        setIsLoading(false);
        return;
      }

      try {
        const result = await isValidSession();
        setAuth(result);
      } catch (error) {
        removeStoredData();
      } finally {
        setIsLoading(false);
      }
    })();
  }, []);

  useEffect(() => {
    (function setLocalStorageOnAuthChange() {
      if (isLoading) {
        return;
      }

      if (auth) {
        localStorage.setItem(IS_SIGNED_IN, TRUE);
        return;
      }

      removeStoredData();
    })();
  }, [auth]);

  return (
    <AuthContext.Provider value={{ auth, setAuth }}>
      {!isLoading && children}
    </AuthContext.Provider>
  );
}

export default AuthContext;
