import ExplorePage from '@pages/explore/ExplorePage';
import { Link } from 'react-router-dom';

export default function HomePage() {
  return <ExplorePage />;
  return (
    <section className="flex w-full justify-center py-2xl">
      <div>
        <div className="mb-4 flex justify-center">
          <Link to="/">
            <img
              src="https://kr.object.ncloudstorage.com/fancamp/static/logo.png"
              alt="메인 로고"
            />
          </Link>
        </div>
        <div className="mb-8 text-center display-regular-16">
          인플루언서와 팬을 이어주는 소통 플랫픔, <br />
          <span className="text-logo-green">fancamp</span>에 오신 것을
          환영합니다! 🥳
        </div>
        <div className="text-center display-regular-16">
          처음이신가요? 어떤 캠프들이 있는지 둘러보세요! 😉
          <div className="mt-4">
            <Link to="/explore" className="mr-4 text-point-blue">
              둘러보기
            </Link>
            <Link to="/auth/signup" className="text-point-lavender">
              회원가입하기
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
