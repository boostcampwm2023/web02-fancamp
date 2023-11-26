import { useEffect, useState } from 'react';
import { useSuspenseQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import CheckIcon from '../../assets/icons/checkIcon.svg?react';
import SubscribeButton from '../../components/button/SubscribeButton';
import Text from '../../components/ui/Text';
import { CampInfo as CampInfoType } from '../../types/api/camp';
import ProfileImage from '../../components/profile/ProfileImage';
import useAuth from '../../hooks/useAuth';
import useFetch from '../../hooks/useFetch';
import { isSubscribedCamp, subscribeCamp } from '../../API/subscription';

function CampInfo() {
  const [isSubscribed, setIsSubscribed] = useState(false);
  const { campId } = useParams();
  const { auth } = useAuth();

  const { data: camp } = useSuspenseQuery<CampInfoType>({
    queryKey: ['camp', campId],
    queryFn: () =>
      useFetch(`/api/camps/${campId}`, {
        method: 'GET',
        credentials: 'include',
      }),
    gcTime: 0,
    staleTime: 0,
  });

  useEffect(() => {
    isSubscribedCamp(campId!)
      .then(() => setIsSubscribed(true))
      .catch(() => setIsSubscribed(false));
  }, []);

  const handleSubscribe = () => {
    subscribeCamp(campId!)
      .then(() => setIsSubscribed(true))
      .catch(console.error);
  };

  return (
    <div className="mb-xl flex w-full items-center gap-xl">
      <ProfileImage src={camp.bannerImage} />
      <div className="flex flex-1 items-center justify-between">
        <div className="flex flex-col justify-evenly gap-md">
          <Text size={20} color="text-primary">
            {camp.campName}
          </Text>
          <Text size={14} color="point-lavender">
            JUST DO IT.
          </Text>
          <div className="flex gap-xl">
            <Text size={12} color="text-primary">
              포스트&nbsp;&nbsp;0개
            </Text>
            <Text size={12} color="text-primary">
              구독자&nbsp;&nbsp;0명
            </Text>
          </div>
        </div>
        <div>
          {!auth?.isMaster && (
            <SubscribeButton
              subscribed={isSubscribed}
              onClick={handleSubscribe}
            >
              <Text
                size={14}
                color={isSubscribed ? 'text-secondary' : 'point-blue'}
                className="flex items-center"
              >
                {isSubscribed ? (
                  <CheckIcon className="[&>path]:stroke-text-secondary" />
                ) : (
                  '+ '
                )}
                {isSubscribed ? '구독중' : '구독하기'}
              </Text>
            </SubscribeButton>
          )}
        </div>
      </div>
    </div>
  );
}

export default CampInfo;
