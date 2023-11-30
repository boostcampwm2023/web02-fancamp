import { useEffect, useRef } from 'react';

interface Callback {
  (entry: IntersectionObserverEntry, observer: IntersectionObserver): void;
}

export default function useIntersectionObserver(
  callback: Callback,
  options?: IntersectionObserverInit
) {
  const ref = useRef<HTMLLIElement>(null);

  useEffect(() => {
    if (!ref.current) {
      return;
    }

    const observer = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          callback(entry, observer);
        }
      });
    }, options);
    observer.observe(ref.current);

    return () => {
      observer.disconnect();
    };
  }, [ref, options, callback]);

  return ref;
}
