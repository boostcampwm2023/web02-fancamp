import { useState } from 'react';
import useInfiniteSlider from '@hooks/useInfiniteSlider';
import FeedCard from './FeedCardLogic';

function FeedPage() {
  const [postIds] = useState<string[]>(
    Array(20)
      .fill(0)
      .map((_, i) => String(i + 32))
  );

  const {
    ref: sliderRef,
    y,
    index,
    handleWheel,
    useTransition,
    handleTransitionEnd,
  } = useInfiniteSlider<string>(postIds);

  return (
    <div
      className="relative h-[100vh] overflow-y-hidden pl-[14rem] pr-[14rem]"
      onWheel={handleWheel}
    >
      <div
        className="relative h-[100vh] w-full"
        style={{
          transform: `translateY(${y}vh)`,
          transition: useTransition ? 'transform 0.2s' : 'unset',
        }}
        onTransitionEnd={handleTransitionEnd}
        ref={sliderRef}
      >
        {Array(5)
          .fill(null)
          .map((_, i) => {
            const id = index + i - 2;
            const postId = postIds[id];
            return (
              <FeedCard
                postId={postId}
                key={`fead-card-${postId || `udf-${id}`}`}
              />
            );
          })}
      </div>
    </div>
  );
}

export default FeedPage;
