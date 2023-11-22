import Text from '../text/text';

interface ContentMenuProps {
  categorys: string[];
  menuIndex: number;
  setMenuIndex: React.Dispatch<React.SetStateAction<number>>;
}

interface ContentMenuButtonProps {
  text: string;
  index: number;
  menuIndex: number;
  setIndex: React.Dispatch<React.SetStateAction<number>>;
}

function ContentMenu({ categorys, menuIndex, setMenuIndex }: ContentMenuProps) {
  return (
    <div className="flex w-full flex-col items-center border-t-sm border-contour-primary">
      <div style={{ width: `${5 * categorys.length}rem` }}>
        <div
          className="m-[-0.065rem] h-[0.125rem] w-[5rem] bg-text-primary smooth-transition"
          style={{ transform: `translateX(${menuIndex * 5}rem)` }}
        />
      </div>
      <div className="flex">
        {categorys.map((category, index) => (
          <ContentMenuButton
            text={category}
            index={index}
            menuIndex={menuIndex}
            setIndex={setMenuIndex}
            key={`category-menu-${category}`}
          />
        ))}
      </div>
    </div>
  );
}

function ContentMenuButton({
  text,
  menuIndex,
  index,
  setIndex,
}: ContentMenuButtonProps) {
  const handleOnClick = () => {
    setIndex(index);
  };

  return (
    <button
      type="button"
      className="w-[5rem] smooth-transition"
      onClick={handleOnClick}
    >
      <Text
        size={12}
        color={menuIndex === index ? 'text-primary' : 'text-secondary'}
      >
        {text}
      </Text>
    </button>
  );
}

export default ContentMenu;
