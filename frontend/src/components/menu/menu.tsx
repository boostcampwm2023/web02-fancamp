interface CategoryMenuProps {
    categorys: string[]
    menuIndex: number
    setMenuIndex: React.Dispatch<React.SetStateAction<number>>
}

interface CategoryMenuButtonProps {
    text: string
    index: number
    menuIndex: number
    setIndex: React.Dispatch<React.SetStateAction<number>>
}

const Menu = ({ categorys, menuIndex, setMenuIndex }: CategoryMenuProps) => {
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
                    <MenuButton
                        text={category}
                        index={index}
                        menuIndex={menuIndex}
                        setIndex={setMenuIndex}
                        key={`category-menu-${index}`}
                    />
                ))}
            </div>
        </div>
    )
}

const MenuButton = ({ text, menuIndex, index, setIndex }: CategoryMenuButtonProps) => {
    const handleOnClick = () => {
        setIndex(index)
    }

    return (
        <button
            className={`menu__button ${
                menuIndex === index ? 'menu__button--selected' : 'menu__button--unselected'
            }`}
            onClick={handleOnClick}
        >
            <span>{text}</span>
        </button>
    )
}

export default Menu
