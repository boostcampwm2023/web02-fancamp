import Card from '@components/card/Card';
import Spinner from '@components/loading/Spinner';
import Image from '@components/ui/Image';
import Text from '@components/ui/Text';
import { getAllCampsInfiniteQuery } from '@hooks/api/useCampQuery';
import { Suspense, useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { Camp } from '@type/api/camp';
import useIntersectionObserver from '@hooks/useObserver';
import SearchInputLogic from './SearchInputLogic';

export default function ExplorePage() {
  return (
    <div className="flex h-full flex-col gap-xl">
      <SearchInputLogic />
      <div className="flex h-full flex-col gap-md">
        <Text size={20}>모든 캠프</Text>
        <Suspense
          fallback={
            <div className="h-[10rem] w-full">
              <Spinner className="center" />
            </div>
          }
        >
          <ExplorePageLogic />
        </Suspense>
      </div>
    </div>
  );
}

function ExplorePageLogic() {
  const { data: campsData, fetchNextPage: fetchCamps } =
    getAllCampsInfiniteQuery();
  const [camps, setCamps] = useState<Camp[]>([]);
  const observerRef = useRef<HTMLDivElement>(null);

  const { observe } = useIntersectionObserver(() => {
    fetchCamps();
  });

  useEffect(() => {
    if (observerRef.current) {
      observe(observerRef.current);
    }
  }, []);

  useEffect(() => {
    if (!campsData.pages.at(-1).camps) {
      return;
    }
    setCamps((_) => [..._, ...campsData.pages.at(-1).camps]);
  }, [campsData.pages.length]);

  return (
    <div className="grid grid-cols-4 gap-md">
      {camps.map((camp) => {
        const { campName, bannerImage, content } = camp;
        return (
          <Link to={`/camps/${campName}/post`} key={`camp-card-${campName}`}>
            <Card className="w-full border-sm border-text-primary">
              <Image src={bannerImage} className="aspect-[4/3] w-full" />
              <div className="flex h-2xl flex-col items-center justify-evenly p-sm">
                <Text size={14}>{campName}</Text>
                <Text size={13} color="text-secondary">
                  {content || '상세 정보'}
                </Text>
              </div>
            </Card>
          </Link>
        );
      })}
      <div ref={observerRef} />
    </div>
  );
}
