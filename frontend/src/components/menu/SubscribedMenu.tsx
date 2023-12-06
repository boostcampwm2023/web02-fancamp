/* eslint-disable @typescript-eslint/no-unused-vars */

import useAuth from '@hooks/useAuth';
import useNoticeSocket from '@hooks/useNotice';
import useSubscriptions from '@hooks/useSubscriptions';
import { noticeSocket } from '@API/socket';
import Text from '@components/ui/Text';
import SubscribeIcon from '@assets/icons/subscribeIcon.svg?react';
import SubscribeMenuButton from './SubscribeMenuButton';

function SubscribedMenu() {
  const { auth } = useAuth();
  const { subscribedCamps } = useSubscriptions();
  const { campsWithChatNotice, campsWithPostNotice } = useNoticeSocket(
    noticeSocket,
    auth
  );

  return (
    <aside
      className={`flex w-[5rem] flex-col border-text-primary xl:w-[18.75rem] ${
        auth ? 'border-l-sm opacity-100' : 'opacity-0'
      }`}
    >
      <Text
        size={16}
        weight={400}
        className="hidden px-lg pb-sm pt-lg xl:block"
      >
        구독한 캠프
      </Text>
      <div className="relative mb-sm mt-lg block xl:hidden">
        <SubscribeIcon className="relative h-center" width={28} />
      </div>
      {subscribedCamps?.map(({ campName, masterProfileImage }) => (
        <SubscribeMenuButton
          key={`subscribed-camp-card-${campName}`}
          to={`/camps/${campName}/post`}
          text={campName}
          image={masterProfileImage}
          hasPostNotice={campsWithPostNotice.includes(campName)}
          hasChatNotice={campsWithChatNotice.includes(campName)}
        />
      ))}
    </aside>
  );
}

export default SubscribedMenu;
