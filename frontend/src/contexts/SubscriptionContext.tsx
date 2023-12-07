import useAuth from '@hooks/useAuth';
import { Camp } from '@type/api/camp';
import { fetchSubscribedCamps } from '@API/camp';
import { createContext } from 'react';
import { useQuery } from '@tanstack/react-query';
import { SUBSCRIBED_CAMPS } from '@constants/queryKeys';

interface SubscriptionContext {
  subscribedCamps: Camp[] | undefined;
  isSubscribedCampName: (campName: string) => boolean;
}

const SubscriptionContext = createContext<SubscriptionContext | null>(null);

export function SubscriptionProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const { auth } = useAuth();

  const { isLoading, data: subscribedCamps } = useQuery({
    queryKey: [SUBSCRIBED_CAMPS, auth?.publicId],
    queryFn: fetchSubscribedCamps,
    staleTime: 1000 * 60 * 5,
    enabled: !!(auth && !auth.isMaster),
  });

  const isSubscribedCampName = (campName: string): boolean => {
    if (
      subscribedCamps?.some(
        ({ campName: subscribedCampName }) => subscribedCampName === campName
      )
    ) {
      return true;
    }
    return false;
  };

  return (
    <SubscriptionContext.Provider
      value={{ subscribedCamps, isSubscribedCampName }}
    >
      {!isLoading && children}
    </SubscriptionContext.Provider>
  );
}

export default SubscriptionContext;
