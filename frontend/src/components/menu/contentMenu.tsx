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

const ContentMenu = ({
  categorys,
  menuIndex,
  setMenuIndex,
}: ContentMenuProps) => {
  return (
    <div className="menu__wrapper">
      <div className="menu__animated__bar__wrapper">
        <div
          className="menu__animated__bar"
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
            key={`category-menu-${index}`}
          />
        ))}
      </div>
    </div>
  );
};

const ContentMenuButton = ({
  text,
  menuIndex,
  index,
  setIndex,
}: ContentMenuButtonProps) => {
  const handleOnClick = () => {
    setIndex(index);
  };

  return (
    <button
      className={`menu__button ${
        menuIndex === index
          ? 'menu__button--selected'
          : 'menu__button--unselected'
      }`}
      onClick={handleOnClick}
    >
      <Text size={12} color="text-primary">
        {text}
      </Text>
    </button>
  );
};

export default ContentMenu;
