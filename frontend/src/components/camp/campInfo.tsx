import { useEffect, useState } from 'react';
import { useSuspenseQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import CheckIcon from '../../assets/icons/checkIcon.svg?react';
import SubscribeButton from '../button/subscribeButton';
import Image from '../image/image';
import Text from '../text/text';
import { User } from '../../types/api/user';
import { isSubscribedCamp, subscribeCamp } from '../../API/subscription';

export default function CampInfo() {
  const [isSubscribed, setIsSubscribed] = useState(false);
  const { campId } = useParams();

  const { data: camp } = useSuspenseQuery<User>({
    queryKey: ['camp-info', campId],
    queryFn: () => fetch(`/api/users/${campId}`).then((res) => res.json()),
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
      <Image
        src={camp.profileUrl}
        width={100}
        height={100}
        className="rounded-full border-sm border-text-primary"
      />
      <div className="flex flex-1 items-center justify-between">
        <div className="flex flex-col justify-evenly gap-md">
          <Text size={20} color="text-primary">
            {camp.userName}
          </Text>
          <Text size={14} color="point-lavender">
            JUST DO IT.
          </Text>
          <div className="flex gap-xl">
            <Text size={12} color="text-primary">
              포스트&nbsp;&nbsp;{camp.postCount}개
            </Text>
            <Text size={12} color="text-primary">
              구독자&nbsp;&nbsp;{camp.postCount}명
            </Text>
          </div>
        </div>
        <div>
          <SubscribeButton subscribed={isSubscribed} onClick={handleSubscribe}>
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
        </div>
      </div>
    </div>
  );
}
