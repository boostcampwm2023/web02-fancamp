import { Suspense, useEffect, useState } from 'react';
import useInfiniteSlider from '@hooks/useInfiniteSlider';
import { getFeedInfiniteQuery } from '@hooks/api/useFeedQuery';
import FeedCard from './FeedCardLogic';

function FeedPage() {
  return (
    <Suspense>
      <FeedPageSuspense />
    </Suspense>
  );
}

function FeedPageSuspense() {
  const { data: postIdsData, fetchNextPage: fetchPostIds } =
    getFeedInfiniteQuery();
  const [postIds, setPostIds] = useState<number[]>([]);

  const {
    ref: sliderRef,
    y,
    index,
    handleWheel,
    useTransition,
    handleTransitionEnd,
  } = useInfiniteSlider<number>(postIds);

  useEffect(() => {
    document.querySelector('main')!.addEventListener('wheel', handleWheel);
    return () => {
      document.querySelector('main')!.removeEventListener('wheel', handleWheel);
    };
  });

  useEffect(() => {
    setPostIds((_) => [..._, ...postIdsData.pages.at(-1).result]);
  }, [postIdsData.pages.length]);

  useEffect(() => {
    if (index === postIds.length - 1) {
      fetchPostIds();
    }
  }, [index]);

  return (
    <div className="relative h-[100vh] overflow-y-hidden pl-[4rem] pr-[4rem]">
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
