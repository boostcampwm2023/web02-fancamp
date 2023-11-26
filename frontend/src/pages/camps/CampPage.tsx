import { Outlet, useLocation, useNavigate, useParams } from 'react-router-dom';
import { Suspense, useEffect, useState } from 'react';
import ContentMenu from '../../components/menu/ContentMenu';
import CampInfo from './CampInfo';
import Spinner from '../../components/loading/Spinner';
import { CAMP_CATEGORIES } from '../../constants/camp';

function CampPage() {
  const categorys = CAMP_CATEGORIES.map((category) => category.text);
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
    const { path } = CAMP_CATEGORIES[categoryIndex];
    navigate(`/camps/${campId}/${path}`);
  }, [categoryIndex]);

  return (
    <div className="flex min-h-full flex-col gap-md">
      <Suspense
        fallback={
          <div className="h-[10rem] w-full">
            <Spinner className="center" />
          </div>
        }
      >
        <CampInfo />
      </Suspense>
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
