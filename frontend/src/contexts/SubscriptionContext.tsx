import { getSubscribedCamps } from '@API/camp';
import useAuth from '@hooks/useAuth';
import { Camp } from '@type/api/camp';
import { createContext, useEffect, useState } from 'react';

interface CampWithProfile extends Camp {
  masterProfileImage: string;
}

interface AuthContextType {
  subscribedCamps: CampWithProfile[] | null;
  setSubscribedCamps: React.Dispatch<
    React.SetStateAction<CampWithProfile[] | null>
  >;
}

const SubscriptionContext = createContext<AuthContextType | null>(null);

export function SubscriptionProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [subscribedCamps, setSubscribedCamps] = useState<
    CampWithProfile[] | null
  >(null);
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
