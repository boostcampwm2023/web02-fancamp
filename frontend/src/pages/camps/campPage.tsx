import { Outlet, useLocation, useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import ContentMenu from '../../components/menu/contentMenu';
import { campCategorys } from '../../utils/constants';
import CampInfo from '../../components/camp/campInfo';

function CampPage() {
  const categorys = campCategorys.map((category) => category.text);
  const [categoryIndex, setCategoryIndex] = useState(0);
  const { campId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (location.pathname === `/camps/${campId}/`) {
      navigate(`/camps/${campId}/post`);
    }
  }, [location.pathname]);

  useEffect(() => {
    const { path } = campCategorys[categoryIndex];
    navigate(`/camps/${campId}/${path}`);
  }, [categoryIndex]);

  return (
    <div className="flex min-h-full flex-col gap-md">
      <CampInfo />
      <ContentMenu
        menuIndex={categoryIndex}
        setMenuIndex={setCategoryIndex}
        categorys={categorys}
      />
      <Outlet />
    </div>
  );
}

export default CampPage;
