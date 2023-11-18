import { Outlet, useLocation, useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Text from '../../components/text/text';
import ContentMenu from '../../components/menu/contentMenu';
import { campCategorys } from '../../utils/constants';

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
    <div>
      <Text size={20}>CampPage</Text>
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
