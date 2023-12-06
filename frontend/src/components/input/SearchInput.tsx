import SearchIcon from '@assets/icons/searchIcon.svg?react';

interface SearchInputProps {
  value: string;
  setValue: React.Dispatch<React.SetStateAction<string>>;
}

function SearchInput({ value, setValue }: SearchInputProps) {
  return (
    <div className="flex h-[3rem] w-full items-center gap-md border-sm border-text-primary pb-sm pl-md pr-md pt-sm">
      <SearchIcon width={20} />
      <input
        type="text"
        className="h-full w-full bg-transparent outline-none display-regular-16"
        value={value}
        placeholder="마음에 드는 캠프를 찾아보세요"
        onChange={(e) => setValue(e.currentTarget.value)}
      />
    </div>
  );
}

export default SearchInput;
