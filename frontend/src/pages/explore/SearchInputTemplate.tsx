import SearchInput from '@components/input/SearchInput';
import Image from '@components/ui/Image';
import Text from '@components/ui/Text';
import { Link } from 'react-router-dom';

function SearchInputTemplate({ camps, keyword, setKeyword }: any) {
  return (
    <div className="relative z-10">
      <SearchInput value={keyword} setValue={setKeyword} />
      <div
        className="absolute flex w-full flex-col gap-[0.0625rem] border-sm border-text-primary bg-text-primary"
        style={{ top: `calc(100% - 0.0625rem)` }}
      >
        {camps.slice(0, 5).map((camp: any) => {
          const {
            campName,
            masterProfileImage,
            highlightedCampName,
            highlightedContent,
          } = camp;
          return (
            <Link to={`/camps/${campName}/post`} key={`camp-card-${campName}`}>
              <div className="relative flex h-[3.5rem] w-full items-center gap-md bg-surface-primary">
                <Image
                  src={masterProfileImage}
                  className="aspect-square h-full"
                />
                <Text
                  size={14}
                  dangerouslySetInnerHTML={{
                    __html: highlightedCampName || '',
                  }}
                />
                <Text
                  size={13}
                  dangerouslySetInnerHTML={{ __html: highlightedContent || '' }}
                />
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}

export default SearchInputTemplate;
