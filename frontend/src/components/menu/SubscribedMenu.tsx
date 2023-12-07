/* eslint-disable @typescript-eslint/no-unused-vars */

import useAuth from '@hooks/useAuth';
import useNoticeSocket from '@hooks/useNotice';
import Text from '@components/ui/Text';
import SubscribeIcon from '@assets/icons/subscribeIcon.svg?react';
import SubscribeMenuButton from './SubscribeMenuButton';
import { noticeSocket } from '@API/socket';
import { SideMenuLinkButton } from './SideMenuButton';
import useSubscriptionQuery from '@hooks/api/useSubscriptionQuery';

function SubscribedMenu() {
  const { auth } = useAuth();
  const { subscribedCamps } = useSubscriptionQuery(auth);
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
      {auth?.isMaster ? (
        <div className="m-4 display-regular-16">{`마스터 ${auth?.publicId}로 접속중입니다!`}</div>
      ) : subscribedCamps && subscribedCamps?.length > 0 ? (
        <SideMenuLinkButton text={'전체 구독 보기'} to="/subscriptions" />
      ) : (
        <div className="m-4 display-regular-16">캠프를 구독해보세요!</div>
      )}
    </aside>
  );
}

export default SubscribedMenu;
