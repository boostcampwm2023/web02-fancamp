import ProfileImage from '@components/profile/ProfileImage';
import useAuth from '@hooks/useAuth';
import { getLocaleString } from '@utils/date';
import { optimizedImageURL } from '@utils/imageURL';
import { ForwardedRef, forwardRef } from 'react';

interface Props {
  stringContent: string;
  createdAt: string;
  senderChatName: string;
  profileImage: string;
}

const ChatBoxMessage = forwardRef(function ChatBoxMessage(
  { stringContent, createdAt, senderChatName, profileImage }: Props,
  ref: ForwardedRef<HTMLLIElement>
) {
  const { auth } = useAuth();
  const { chatName, isMaster } = auth!;
  const localeTimeString = getLocaleString(createdAt);
  const isMyMessage = senderChatName === chatName;

  const chatNameReplacedText = isMaster
    ? stringContent
    : stringContent.replace('(닉네임)', chatName);

  return (
    <li ref={ref} className={`flex gap-4 ${isMyMessage && 'flex-row-reverse'}`}>
      {!isMyMessage && (
        <div className="flex items-center">
          <ProfileImage
            src={optimizedImageURL(profileImage, 'profile-small')}
            width="60"
            height="60"
            className="rounded-full"
            alt="profile image"
          />
        </div>
      )}
      <div
        className={`flex flex-col gap-2 display-regular-16 ${
          isMyMessage && 'items-end'
        }`}
      >
        <span>{senderChatName}</span>
        <div
          className={`flex items-end gap-4 ${
            isMyMessage && 'flex-row-reverse'
          }`}
        >
          <span
            className={`${
              isMyMessage
                ? 'rounded-br-none bg-point-yellow text-text-primary'
                : 'rounded-tl-none bg-point-lavender text-text-primary'
            } rounded-lg border p-4 display-regular-16`}
          >
            {isMyMessage ? stringContent : chatNameReplacedText}
          </span>
        </div>
      </div>
      <span className="self-end text-sm text-text-secondary display-regular-14">
        {localeTimeString}
      </span>
    </li>
  );
});

export default ChatBoxMessage;
