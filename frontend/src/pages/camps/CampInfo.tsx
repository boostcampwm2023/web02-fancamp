import { useParams } from 'react-router-dom';
import ProfileImage from '@components/profile/ProfileImage';
import Text from '@components/ui/Text';
import { getCampQuery } from '@hooks/api/useCampQuery';
import { getProfileByIdQuery } from '@hooks/api/useUserQuery';
import {
  getCampSubscriptionQuery,
  subscribeMutation,
  unsubscribeMutation,
} from '@hooks/api/useSubscriptionQuery';
import useAuth from '@hooks/useAuth';
import SubscribeButton from '@components/button/SubscribeButton';
import CheckIcon from '@assets/icons/checkIcon.svg?react';
import { useState } from 'react';

function CampInfo() {
  const { campId } = useParams();
  const { auth } = useAuth();
  const { data: camp } = getCampQuery(campId!);
  const {
    data: { profileImage },
  } = getProfileByIdQuery(campId!);
  const { data: subscribed } = getCampSubscriptionQuery(campId!);
  const { mutate: subscribeMutate } = subscribeMutation({
    onSuccess: () => {
      setSubscribed(true);
    },
  });
  const { mutate: unsubscribeMutate } = unsubscribeMutation({
    onSuccess: () => {
      setSubscribed(false);
    },
  });

  const [isSubscribed, setSubscribed] = useState(subscribed.isSubscribe);

  const handleSubscribe = () => {
    if (isSubscribed) {
      unsubscribeMutate({ campId: String(campId) });
    } else {
      subscribeMutate({ campId: String(campId) });
    }
  };

  return (
    <div className="mb-xl flex w-full items-center gap-xl">
      <ProfileImage src={profileImage} />
      <div className="flex flex-1 items-center justify-between">
        <div className="flex flex-col justify-evenly gap-md">
          <Text size={20} color="text-primary">
            {camp.campName}
          </Text>
          <Text size={14} color="point-lavender">
            JUST DO IT.
          </Text>
          <div className="flex gap-sm">
            <Text size={13} color="text-primary">
              포스트&nbsp;&nbsp;{camp.subscriptionCount}개
            </Text>
            <Text size={13} color="text-primary">
              ·
            </Text>
            <Text size={13} color="text-primary">
              구독자&nbsp;&nbsp;{camp.subscriptionCount}명
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
