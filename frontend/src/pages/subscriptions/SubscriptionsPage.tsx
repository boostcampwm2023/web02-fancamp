/* eslint-disable no-nested-ternary */

import ProfileImage from '@components/profile/ProfileImage';
import useSubscriptions from '@hooks/useSubscriptions';
import { Link } from 'react-router-dom';

export default function SubscriptionsPage() {
  const { subscribedCamps } = useSubscriptions();

  return (
    <>
      <div className="mt-8 text-point-lavender display-regular-20">
        구독한 캠프
      </div>
      {subscribedCamps && subscribedCamps.length > 0 ? (
        <ul className="mt-8 grid grid-cols-5 gap-8 text-text-primary display-regular-16">
          {subscribedCamps.map(({ campId, campName, masterProfileImage }) => (
            <Link
              key={campId}
              to={`/camps/${campName}`}
              className="flex flex-col items-center gap-2"
            >
              <ProfileImage
                src={masterProfileImage}
                alt={campName}
                className="rounded-full"
              />
              {campName}
            </Link>
          ))}
        </ul>
      ) : (
        <div className="mt-8 text-text-primary display-regular-16">
          아직 구독하신 캠프가 없어요. 구독하시고 소통해보세요! 🥰
        </div>
      )}
    </>
  );
}
