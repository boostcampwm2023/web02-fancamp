import Card from '@components/card/Card';
import Spinner from '@components/loading/Spinner';
import Image from '@components/ui/Image';
import Text from '@components/ui/Text';
import { getAllCampsInfiniteQuery } from '@hooks/api/useCampQuery';
import { Suspense, useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { Camp } from '@type/api/camp';
import useIntersectionObserver from '@hooks/useObserver';
import ProfileImage from '@components/profile/ProfileImage';
import SearchInputLogic from './SearchInputLogic';
import { optimizedImageURL } from '@utils/imageURL';

interface CampWithProfile extends Camp {
  masterProfileImage: string;
}

export default function ExplorePage() {
  return (
    <div className="flex h-full flex-col gap-xl py-2xl">
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
  const [camps, setCamps] = useState<CampWithProfile[]>([]);
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
      {camps.map((camp) => (
        <ExploreCampCard
          key={`explore-camp-card-${camp.campName}`}
          camp={camp}
        />
      ))}
      <div ref={observerRef} />
    </div>
  );
}

function ExploreCampCard({ camp }: { camp: CampWithProfile }) {
  const { campName, bannerImage, content, masterProfileImage } = camp;

  return (
    <Link to={`/camps/${campName}/post`} key={`camp-card-${campName}`}>
      <Card className="w-full border-sm border-text-primary">
        <div className="relative">
          <Image
            src={optimizedImageURL(bannerImage, 'banner-small')}
            className="aspect-[4/3] w-full object-cover"
            alt={`${campName}'s banner`}
          />
        </div>
        <div className="relative flex flex-col items-center gap-md px-md py-md">
          <div className="flex items-center gap-sm">
            {masterProfileImage && (
              <ProfileImage
                src={optimizedImageURL(masterProfileImage, 'profile-small')}
                className="w-lg rounded-full"
              />
            )}
            <Text size={16}>{campName}</Text>
          </div>
          {content && (
            <Text
              size={13}
              color="text-secondary"
              className="line-clamp-2 w-full"
            >
              {content}
            </Text>
          )}
        </div>
      </Card>
    </Link>
  );
}
