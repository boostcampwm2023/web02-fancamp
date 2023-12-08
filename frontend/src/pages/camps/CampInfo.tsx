import ProfileImage from '@components/profile/ProfileImage';
import Text from '@components/ui/Text';
import useSubscriptions from '@hooks/useSubscriptions';
import useAuth from '@hooks/useAuth';
import SubscribeButton from '@components/button/SubscribeButton';
import CheckIcon from '@assets/icons/checkIcon.svg?react';
import Image from '@components/ui/Image';
import { useNavigate, useParams } from 'react-router-dom';
import { getCampQuery } from '@hooks/api/useCampQuery';
import { getProfileByIdQuery } from '@hooks/api/useUserQuery';
import {
  subscribeMutation,
  unsubscribeMutation,
} from '@hooks/api/useSubscriptionQuery';

function CampInfo() {
  const { campId } = useParams();
  const { auth } = useAuth();
  const { data: camp } = getCampQuery(campId!);
  const {
    data: { profileImage },
  } = getProfileByIdQuery(campId!);
  const navigate = useNavigate();

  const { isSubscribedCampName } = useSubscriptions();
  const isSubscribed = isSubscribedCampName(campId!);
  const { subscribeMutate } = subscribeMutation({
    publicId: auth?.publicId,
  });
  const { unsubscribeMutate } = unsubscribeMutation({
    publicId: auth?.publicId,
  });

  const handleSubscribe = () => {
    if (!auth) {
      navigate('/auth/signin');
      return;
    }
    if (isSubscribed) {
      unsubscribeMutate({ campId: String(campId) });
    } else {
      subscribeMutate({ campId: String(campId) });
    }
  };

  return (
    <div className="relative flex h-[16rem] flex-col justify-end">
      <div className="absolute top-[0] h-[16rem] w-full">
        <Image
          src={camp.bannerImage || ''}
          className="absolute top-[0] z-0 h-full w-full object-cover"
        />
        <div
          className="absolute top-[0] z-10 h-full w-full"
          style={{
            background:
              'linear-gradient(180deg, #11111100 0%, #11111150 70%, #111111 100%)',
          }}
        />
      </div>
      <div className="relative z-20 flex w-full items-center gap-xl  p-xl">
        <ProfileImage src={profileImage} className="rounded-full" />
        <div className="flex flex-1 items-center justify-between">
          <div className="flex flex-col justify-evenly gap-md">
            <Text size={20} color="surface-primary">
              {camp.campName}
            </Text>
            {camp.content && (
              <Text size={14} color="surface-primary">
                {camp.content}
              </Text>
            )}

            <div className="flex gap-sm">
              <Text size={13} color="surface-primary">
                포스트&nbsp;&nbsp;{camp.postCount}개
              </Text>
              <Text size={13} color="surface-primary">
                ·
              </Text>
              <Text size={13} color="surface-primary">
                구독자&nbsp;&nbsp;{camp.subscriptionCount}명
              </Text>
            </div>
          </div>
          <div>
            {auth && !auth.isMaster && (
              <SubscribeButton
                subscribed={isSubscribed}
                onClick={handleSubscribe}
              >
                <Text
                  size={16}
                  color={isSubscribed ? 'text-secondary' : 'surface-primary'}
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
    </div>
  );
}

export default CampInfo;
