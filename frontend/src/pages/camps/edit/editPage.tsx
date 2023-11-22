import { Outlet, useLocation, useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import ContentMenu from '../../../components/menu/contentMenu';
import { campEditCategorys } from '../../../utils/constants';

function EditPage() {
  const categorys = campEditCategorys.map((category) => category.text);
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
    const { path } = campEditCategorys[categoryIndex];
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
