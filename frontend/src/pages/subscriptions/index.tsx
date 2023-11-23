import { useEffect, useState } from 'react';
import { getSubscribedCamps } from '../../API/camp';
import { Link } from 'react-router-dom';
import ProfileImage from '../../components/image/profileImage';
import Spinner from '../../components/loading/spinner';

export default function SubscriptionsPage() {
  const [subscribedCamps, setSubscribedCamps] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getSubscribedCamps()
      .then(setSubscribedCamps)
      .finally(() => setIsLoading(false));
  }, []);

  return (
    <>
      <div className="mb-8 text-point-lavender display-regular-20">
        구독한 캠프
      </div>
      {isLoading ? (
        <div className="ml-[10rem]">
          <Spinner />
        </div>
      ) : subscribedCamps.length > 0 ? (
        <ul className="mb-8 flex gap-8 text-text-primary display-regular-16">
          {subscribedCamps.map(({ campId, campName }) => (
            <Link
              key={campId}
              to={`/camps/${campName}`}
              className="flex flex-col items-center gap-2"
            >
              <ProfileImage src="https://picsum.photos/72/72" alt={campName} />
              {campName}
            </Link>
          ))}
        </ul>
      ) : (
        <div className="mb-8 text-text-primary display-regular-16">
          아직 구독하신 캠프가 없어요. 구독하시고 소통해보세요! 🥰
        </div>
      )}
    </>
  );
}
