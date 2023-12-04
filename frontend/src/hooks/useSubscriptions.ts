import { useContext } from 'react';
import SubscriptionContext from '@contexts/SubscriptionContext';

export default function useSubscriptions() {
  const context = useContext(SubscriptionContext);

  if (!context) {
    throw new Error('SubscriptionProvider not found.');
  }

  return context;
}
