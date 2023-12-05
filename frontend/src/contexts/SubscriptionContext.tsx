import { getSubscribedCamps } from '@API/camp';
import useAuth from '@hooks/useAuth';
import { Camp } from '@type/api/camp';
import { createContext, useEffect, useState } from 'react';

interface AuthContextType {
  subscribedCamps: Camp[] | null;
  setSubscribedCamps: React.Dispatch<React.SetStateAction<Camp[] | null>>;
}

const SubscriptionContext = createContext<AuthContextType | null>(null);

export function SubscriptionProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [subscribedCamps, setSubscribedCamps] = useState<Camp[] | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { auth } = useAuth();

  useEffect(() => {
    if (!auth) {
      setIsLoading(false);
      return;
    }

    getSubscribedCamps()
      .then(setSubscribedCamps)
      .finally(() => setIsLoading(false));
  }, [auth]);

  return (
    <SubscriptionContext.Provider
      value={{ subscribedCamps, setSubscribedCamps }}
    >
      {!isLoading && children}
    </SubscriptionContext.Provider>
  );
}

export default SubscriptionContext;
