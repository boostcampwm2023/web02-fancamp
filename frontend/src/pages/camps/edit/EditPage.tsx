import { Outlet, useLocation, useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import ContentMenu from '@components/menu/ContentMenu';
import { CAMP_EDIT_CATEGORIES } from '@constants/camp';

function EditPage() {
  const categorys = CAMP_EDIT_CATEGORIES.map((category) => category.text);
  const [categoryIndex, setCategoryIndex] = useState(0);
  const { campId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (location.pathname === `/camps/${campId}/edit/`) {
      navigate(`/camps/${campId}/edit/profile`);
    }
  }, [location.pathname]);

  useEffect(() => {
    const { path } = CAMP_EDIT_CATEGORIES[categoryIndex];
    navigate(`/camps/${campId}/edit/${path}`);
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

export default EditPage;
