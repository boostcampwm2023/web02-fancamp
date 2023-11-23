import { useState } from 'react';
import { useSuspenseQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import CheckIcon from '../../assets/icons/checkIcon.svg?react';
import SubscribeButton from '../../components/button/subscribeButton';
import Text from '../../components/text/text';
import { CampInfo as CampInfoType } from '../../types/api/camp';
import ProfileImage from '../../components/image/profileImage';
import useAuth from '../../hooks/useAuth';
import useFetch from '../../hooks/useFetch';

function CampInfo() {
  const [subscribed, setSubscribe] = useState(false);
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

  const handleSubscribe = () => {
    setSubscribe(!subscribed);
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
            <SubscribeButton subscribed={subscribed} onClick={handleSubscribe}>
              <Text
                size={14}
                color={subscribed ? 'text-secondary' : 'point-blue'}
                className="flex items-center"
              >
                {subscribed ? (
                  <CheckIcon className="[&>path]:stroke-text-secondary" />
                ) : (
                  '+ '
                )}
                {subscribed ? '구독중' : '구독하기'}
              </Text>
            </SubscribeButton>
          )}
        </div>
      </div>
    </div>
  );
}

export default CampInfo;
