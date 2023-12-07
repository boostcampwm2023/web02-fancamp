import SubscribeButton from '@components/button/SubscribeButton';
import Text from '@components/ui/Text';
import useAuth from '@hooks/useAuth';
import { subscribeMutation } from '@hooks/api/useSubscriptionQuery';
import { useParams } from 'react-router-dom';

export default function ChatBoxSubscription() {
  const { campId: campName } = useParams();
  const { auth } = useAuth();
  const { subscribeMutate } = subscribeMutation({ publicId: auth?.publicId });

  return (
    <>
      <div
        id="#chatbox"
        className="relative mt-8 flex flex-col items-center gap-8 display-regular-16"
      >
        채팅을 이용하시기 전에 구독을 먼저 해주세요! 😊
        <SubscribeButton
          subscribed={false}
          onClick={() => subscribeMutate({ campId: String(campName) })}
        >
          <Text size={14} color={'point-blue'} className="flex items-center">
            {'구독하기'}
          </Text>
        </SubscribeButton>
      </div>
    </>
  );
}
