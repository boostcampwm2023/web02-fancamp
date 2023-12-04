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

    // ChatBox에서 fetchNextPage요청이 반복적으로 여러번 되고 있어 임시 해결
    setTimeout(() => {
      if (ref.current) {
        observer.observe(ref.current);
      }
    }, 1000);

    return () => {
      observer.disconnect();
    };
  }, [ref, options, callback]);

  return ref;
}
