import { Message } from './ChatBox';

interface Props {
  messages: Message[];
}

export default function ChatBoxMessages({ messages }: Props) {
  return (
    <div className="flex-1 border">
      <ul className="flex flex-col gap-8 p-8">
        {messages.map(({ messageId, isMasterMessage, text, time }) => {
          return isMasterMessage ? (
            <li key={messageId}>
              <span className="bg-green-200 mr-2 rounded p-2">{text}</span>
              <span className="text-gray-400 text-sm">{time}</span>
            </li>
          ) : (
            <li className="text-right">
              <span className="text-gray-400 text-sm">{time}</span>
              <span className="bg-blue-200 ml-2 rounded p-2">{text}</span>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
