import SearchIcon from '@assets/icons/searchIcon.svg?react';

interface SearchInputProps {
  value: string;
  setValue: React.Dispatch<React.SetStateAction<string>>;
}

function SearchInput({ value, setValue }: SearchInputProps) {
  return (
    <div className="flex w-full items-center gap-md border-sm border-text-primary pb-sm pl-md pr-md pt-sm">
      <SearchIcon width={16} />
      <input
        type="text"
        className="h-full w-full bg-transparent outline-none display-regular-16"
        value={value}
        onChange={(e) => setValue(e.currentTarget.value)}
      />
    </div>
  );
}

export default SearchInput;
