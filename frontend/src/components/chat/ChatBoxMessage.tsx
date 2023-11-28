import { getLocaleString } from '@utils/date';
import { ForwardedRef, forwardRef } from 'react';

interface Props {
  isMyMessage: boolean;
  stringContent: string;
  createdAt: string;
}

const ChatBoxMessage = forwardRef(function ChatBoxMessage(
  { isMyMessage, stringContent: text, createdAt: time }: Props,
  ref: ForwardedRef<HTMLLIElement>
) {
  const localeTimeString = getLocaleString(time);

  return (
    <li ref={ref} className={`flex gap-4 ${isMyMessage && 'flex-row-reverse'}`}>
      {!isMyMessage && (
        <img
          className="self-center"
          width="60"
          height="60"
          src="/profileImagePlaceholder.png"
          alt="profile image"
        />
      )}
      <div
        className={`flex flex-col gap-2 display-regular-14 ${
          isMyMessage && 'items-end'
        }`}
      >
        <span>작성자</span>
        <div
          className={`flex items-end gap-4 ${
            isMyMessage && 'flex-row-reverse'
          }`}
        >
          <span
            className={`${
              isMyMessage
                ? 'rounded-br-none bg-point-lavender text-white'
                : 'rounded-tl-none bg-white text-text-primary'
            } rounded-lg p-4 display-regular-16`}
          >
            {text}
          </span>
        </div>
      </div>
      <span className="self-end text-sm text-text-secondary display-light-14">
        {localeTimeString}
      </span>
    </li>
  );
});

export default ChatBoxMessage;
