import Card from '@components/card/Card';
import Spinner from '@components/loading/Spinner';
import Image from '@components/ui/Image';
import Text from '@components/ui/Text';
import { getAllCampsQuery } from '@hooks/api/useCampQuery';
import { Suspense } from 'react';
import { Link } from 'react-router-dom';
import SearchInputLogic from './SearchInputLogic';

export default function ExplorePage() {
  return (
    <div className="flex min-h-full flex-col gap-md">
      <SearchInputLogic />
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
  );
}

function ExplorePageLogic() {
  const { data: camps } = getAllCampsQuery();

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
    </div>
  );
}
