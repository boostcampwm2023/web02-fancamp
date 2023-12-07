import ChatBoxBodyInfiniteMessages from './ChatBoxBodyInfiniteMessages';
import ChatBoxBodySocketMessages from './ChatBoxBodySocketMessages';
import { Message } from '@type/api/chat';

interface Props {
  messages: Message[];
}

export default function ChatBoxBody({ messages }: Props) {
  return (
    <div className="flex h-[calc(100vh-400px)] flex-col-reverse overflow-y-scroll border border-contour-primary">
      <ul className="flex flex-col gap-4 p-8">
        <ChatBoxBodyInfiniteMessages />
        <ChatBoxBodySocketMessages messages={messages} />
      </ul>
    </div>
  );
}
