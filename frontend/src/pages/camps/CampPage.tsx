import { Outlet, useLocation, useNavigate, useParams } from 'react-router-dom';
import { Suspense, useEffect, useState } from 'react';
import { CAMP_CATEGORIES } from '@constants/camp';
import Spinner from '@components/loading/Spinner';
import ContentMenu from '@components/menu/ContentMenu';
import CampInfo from './CampInfo';

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
    if (categoryIndex === 0 && location.pathname === `/camps/${campId}/post`) {
      return;
    }
    navigate(`/camps/${campId}/${path}`);
  }, [categoryIndex]);

  return (
    <div className="flex min-h-full flex-col gap-md">
      <Suspense
        fallback={
          <div className="mb-xl h-[6.25rem] w-full">
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
