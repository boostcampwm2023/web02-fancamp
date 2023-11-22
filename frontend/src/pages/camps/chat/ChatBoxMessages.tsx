import { Message } from './ChatBox';

interface Props {
  messages: Message[];
}

export default function ChatBoxMessages({ messages }: Props) {
  return (
    <div className="bg-light-yellow border-border max-h-[60%] flex-1 overflow-y-scroll border-l border-r">
      <ul className="flex flex-col gap-8 p-8">
        {messages.map(({ messageId, isMyMessage, text, time }) => (
          <MessageBubble
            key={messageId}
            isMyMessage={isMyMessage}
            text={text}
            time={time}
          />
        ))}
      </ul>
    </div>
  );
}

interface MessageBubbleProps {
  isMyMessage: boolean;
  text: string;
  time: string;
}

function MessageBubble({ isMyMessage, text, time }: MessageBubbleProps) {
  return (
    <li className={`flex items-end gap-4 ${isMyMessage && 'flex-row-reverse'}`}>
      <span
        className={`${
          isMyMessage
            ? 'text-white rounded-br-none bg-point-lavender'
            : 'bg-white rounded-tl-none text-text-primary'
        } display-regular-16 ml-2 rounded-lg p-4`}
      >
        {text}
      </span>
      <span className="text-sm text-text-secondary display-light-14">
        {time}
      </span>
    </li>
  );
}
