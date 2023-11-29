import ContentMenu from '@components/menu/ContentMenu';
import { Outlet, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { USER_EDIT_CATEGORIES } from '@constants/user';

function UserEditPage() {
  const categorys = USER_EDIT_CATEGORIES.map((category) => category.text);
  const [categoryIndex, setCategoryIndex] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const { path } = USER_EDIT_CATEGORIES[categoryIndex];
    navigate(`/user/edit/${path}`);
  }, [categoryIndex]);

  return (
    <div className="flex min-h-full flex-col gap-md">
      <ContentMenu
        menuIndex={categoryIndex}
        setMenuIndex={setCategoryIndex}
        categorys={categorys}
      />
      <Outlet />
    </div>
  );
}

export default UserEditPage;
