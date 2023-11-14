import { Message } from './ChatBox';

interface Props {
  messages: Message[];
}

export default function ChatBoxMessages({ messages }: Props) {
  return (
    <div className='flex-1 border'>
      <ul className='flex flex-col gap-8 p-8'>
        {messages.map(({ messageId, isMasterMessage, text, time }) => {
          return isMasterMessage ? (
            <li key={messageId}>
              <span className='bg-green-200 p-2 mr-2 rounded'>{text}</span>
              <span className='text-sm text-gray-400'>{time}</span>
            </li>
          ) : (
            <li className='text-right'>
              <span className='text-sm text-gray-400'>{time}</span>
              <span className='bg-blue-200 p-2 ml-2 rounded'>{text}</span>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
