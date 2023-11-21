import { useState } from 'react';
import CheckIcon from '../../assets/icons/checkIcon.svg?react';
import SubscribeButton from '../button/subscribeButton';
import Image from '../image/Image';
import Text from '../text/text';

const dummy = {
  userName: 'Janot Channon',
  profileMessage: 'JUST DO IT.',
  profileUrl:
    'https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/1200.jpg',
  postCount: 31,
};

function CampInfo() {
  const [subscribed, setSubscribe] = useState(false);

  const handleSubscribe = () => {
    setSubscribe(!subscribed);
  };

  return (
    <div className="mb-xl flex w-full items-center gap-xl">
      <Image
        src={dummy.profileUrl}
        width={100}
        height={100}
        className="rounded-full border-sm border-text-primary"
      />
      <div className="flex flex-1 items-center justify-between">
        <div className="flex flex-col justify-evenly gap-md">
          <Text size={20} color="text-primary">
            {dummy.userName}
          </Text>
          <Text size={14} color="point-lavender">
            {dummy.profileMessage}
          </Text>
          <div className="flex gap-xl">
            <Text size={12} color="text-primary">
              포스트&nbsp;&nbsp;{dummy.postCount}개
            </Text>
            <Text size={12} color="text-primary">
              구독자&nbsp;&nbsp;{dummy.postCount}명
            </Text>
          </div>
        </div>
        <div>
          <SubscribeButton subscribed={subscribed} onClick={handleSubscribe}>
            <Text
              size={14}
              color={subscribed ? 'text-secondary' : 'point-blue'}
              classList="flex items-center"
            >
              {subscribed ? (
                <CheckIcon className="[&>path]:stroke-text-secondary" />
              ) : (
                '+ '
              )}
              {subscribed ? '구독중' : '구독하기'}
            </Text>
          </SubscribeButton>
        </div>
      </div>
    </div>
  );
}

export default CampInfo;
