/* eslint-disable @typescript-eslint/no-unused-vars */

import useAuth from '@hooks/useAuth';
import useNoticeSocket from '@hooks/useNotice';
import Text from '@components/ui/Text';
import SubscribeIcon from '@assets/icons/subscribeIcon.svg?react';
import { noticeSocket } from '@API/socket';
import Radio from '@components/radio/radio';
import useLanguage from '@hooks/useLanguage';
import useSubscriptionQuery from '@hooks/api/useSubscriptionQuery';
import SubscribeMenuButton from './SubscribeMenuButton';
import { SideMenuLinkButton } from './SideMenuButton';

function SubscribedMenu() {
  const { auth } = useAuth();
  const { subscribedCamps } = useSubscriptionQuery(auth);
  const { campsWithChatNotice, campsWithPostNotice } = useNoticeSocket(
    noticeSocket,
    auth
  );
  const { setLanguage } = useLanguage();

  return (
    <aside className="flex w-[5rem] flex-col justify-between border-l-sm xl:w-[18.75rem]">
      <div className="flex flex-1 flex-col">
        <Text
          size={16}
          weight={400}
          className="hidden px-lg pb-sm pt-lg xl:block"
        >
          {auth ? '구독한 캠프' : '캠프를 구독해보세요!'}
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
          <Text
            size={16}
            className="m-lg hidden xl:inline"
          >{`마스터 ${auth?.publicId}로 접속중입니다!`}</Text>
        ) : subscribedCamps && subscribedCamps?.length > 0 ? (
          <SideMenuLinkButton text="전체 구독 보기" to="/subscriptions" />
        ) : (
          <></>
        )}
      </div>
      <Radio
        items={[
          {
            text: '한국어',
            value: 'ko',
            onClick: () => {
              setLanguage('ko');
            },
          },
          {
            text: 'English',
            value: 'en',
            onClick: () => {
              setLanguage('en');
            },
          },
          {
            text: '日本語',
            value: 'ja',
            onClick: () => {
              setLanguage('ja');
            },
          },
        ]}
      />
    </aside>
  );
}

export default SubscribedMenu;
