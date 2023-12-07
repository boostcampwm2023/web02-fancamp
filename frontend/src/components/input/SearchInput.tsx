import SearchIcon from '@assets/icons/searchIcon.svg?react';
import CloseIcon from '@assets/icons/closeIcon.svg?react';

interface SearchInputProps {
  value: string;
  setValue: React.Dispatch<React.SetStateAction<string>>;
}

function SearchInput({ value, setValue }: SearchInputProps) {
  return (
    <div className="flex h-[3rem] w-full items-center gap-md border-sm border-text-primary pb-sm pl-md pr-md pt-sm shadow-[0.25rem_0.25rem_0_0_#111111]">
      <SearchIcon width={20} />
      <input
        type="text"
        className="h-full w-full bg-transparent outline-none display-regular-16"
        value={value}
        placeholder="마음에 드는 캠프를 찾아보세요"
        onChange={(e) => setValue(e.currentTarget.value)}
      />
      <button
        type="button"
        onClick={() => setValue('')}
        aria-label="clear keyword button"
      >
        <CloseIcon />
      </button>
    </div>
  );
}

export default SearchInput;
