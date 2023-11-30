import { useState } from 'react';

const useThrottle = (delay: number) => {
  const [throttle, setThrottle] = useState(false);

  const throttledCallback = (callback: () => void) => {
    if (throttle) {
      return;
    }
    callback();
    setThrottle(true);
    setTimeout(async () => {
      setThrottle(false);
    }, delay);
  };

  return throttledCallback;
};

export default useThrottle;
