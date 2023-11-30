import { useParams } from 'react-router-dom';
import ProfileImage from '@components/profile/ProfileImage';
import Text from '@components/ui/Text';
import { getCampQuery } from '@hooks/api/useCampQuery';

function CampInfo() {
  const { campId } = useParams();

  const { data: camp } = getCampQuery(campId!);

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
          {/* {!auth?.isMaster && (
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
          )} */}
        </div>
      </div>
    </div>
  );
}

export default CampInfo;
