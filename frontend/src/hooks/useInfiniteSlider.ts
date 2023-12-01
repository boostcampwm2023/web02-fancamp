import { WheelEvent, useEffect, useRef, useState } from 'react';
import useThrottle from './useThrottle';

const useInfiniteSlider = <Item>(items: Item[]) => {
  const [index, setIndex] = useState(2);
  const [y, setY] = useState(-140);
  const [slidePage, setSlidePage] = useState(0);
  const [slideIndex, setSlideIndex] = useState(0);
  const [direction, setDirection] = useState<'up' | 'down' | null>(null);
  const [useTransition, setTransition] = useState(true);
  const ref = useRef<HTMLDivElement>(null);
  const callThrottle = useThrottle(500);

  const handleWheel = (event: WheelEvent<HTMLDivElement>) => {
    callThrottle(() => {
      if (event.deltaY > 0 && slidePage < items.length - 1) {
        setIndex(index + 1);
        setY(y - 75);
        setDirection('down');
        setSlideIndex(slideIndex + 1);
      } else if (event.deltaY < 0 && slideIndex > 0) {
        setIndex(index - 1);
        setY(y + 75);
        setDirection('up');
        setSlideIndex(slideIndex - 1);
      }
    });
  };

  const handleTransitionEnd = () => {
    if (index === 1) {
      setIndex(2);
      setY(-140);
      setSlidePage(slidePage - 1);
    } else if (index === 3) {
      setIndex(2);
      setY(-140);
      setSlidePage(slidePage + 1);
    }
  };

  useEffect(() => {
    if (ref.current) {
      if (index === 2 && (direction === 'down' || direction === 'up')) {
        setTransition(false);
      } else {
        setTransition(true);
      }
    }
  }, [index]);

  return {
    ref,
    y,
    index: slidePage,
    handleWheel,
    useTransition,
    handleTransitionEnd,
  };
};

export default useInfiniteSlider;
