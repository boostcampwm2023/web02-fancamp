import { useDebounce } from '@hooks/api/useDebounce';
import { searchCampsMutation } from '@hooks/api/useSearchQuery';
import { Camp } from '@type/api/camp';
import { highlightText } from '@utils/text';
import { useEffect, useState } from 'react';
import SearchInputTemplate from './SearchInputTemplate';

function SearchInputLogic() {
  const [keyword, setKeyword] = useState<string>('');
  const [camps, setCamps] = useState<Camp[]>([]);
  const searchKeyword = useDebounce(keyword, 500);
  const { mutate: searchMutate } = searchCampsMutation({
    onSuccess: (data) => {
      const newCamps = data.map((camp: Partial<Camp>) => {
        const { campName, content } = camp;
        const highlightedCampName = highlightText(
          campName || '',
          searchKeyword
        );
        const highlightedContent = highlightText(content || '', searchKeyword);
        return {
          ...camp,
          highlightedCampName,
          highlightedContent,
        };
      });
      setCamps(newCamps);
    },
  });

  useEffect(() => {
    if (searchKeyword === '') {
      setCamps([]);
      return;
    }
    searchMutate({ keyword: searchKeyword });
  }, [searchKeyword]);

  return (
    <SearchInputTemplate
      camps={camps}
      keyword={keyword}
      setKeyword={setKeyword}
    />
  );
}

export default SearchInputLogic;
