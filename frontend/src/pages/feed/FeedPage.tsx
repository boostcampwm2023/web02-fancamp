import { WheelEvent, useEffect, useRef, useState } from 'react';
import useThrottle from '@hooks/useThrottle';
import FeedCard from './FeedCardLogic';

function FeedPage() {
  const [index, setIndex] = useState(2);
  const [y, setY] = useState(-140);
  const [slidePage, setSlidePage] = useState(0);
  const [slideIndex, setSlideIndex] = useState(0);
  const [direction, setDirection] = useState<'up' | 'down' | null>(null);
  const [postIds] = useState<any[]>(
    Array(20)
      .fill(0)
      .map((_, i) => i + 32)
  );
  const sliderRef = useRef<HTMLDivElement>(null);
  const callThrottle = useThrottle(500);

  const handleWheel = (event: WheelEvent<HTMLDivElement>) => {
    callThrottle(() => {
      if (event.deltaY > 0) {
        setIndex(index + 1);
        setY(y - 75);
        setDirection('down');
        setSlideIndex(slideIndex + 1);
      } else if (slideIndex > 0) {
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
    if (sliderRef.current) {
      if (index === 2 && (direction === 'down' || direction === 'up')) {
        sliderRef.current.classList.remove('smooth-transition');
      } else {
        sliderRef.current.classList.add('smooth-transition');
      }
    }
  }, [index]);

  return (
    <div
      className="relative h-[100vh] overflow-y-hidden pl-[14rem] pr-[14rem]"
      onWheel={handleWheel}
    >
      <div
        className="relative h-[100vh] w-full smooth-transition"
        style={{ transform: `translateY(${y}vh)` }}
        onTransitionEnd={handleTransitionEnd}
        ref={sliderRef}
      >
        {Array(5)
          .fill(null)
          .map((_, i) => {
            const id = slidePage + i - 2;
            const postId = postIds[id];
            return <FeedCard postId={postId} key={`fead-card-${id}`} />;
          })}
      </div>
    </div>
  );
}

export default FeedPage;
