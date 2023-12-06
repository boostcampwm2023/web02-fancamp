import { useParams } from 'react-router';

interface Props {
  isMaster: boolean;
  isMasterOnline: boolean;
}

export default function ChatBoxNavBar({ isMaster, isMasterOnline }: Props) {
  const { campId: campName } = useParams();

  return (
    <div className="flex items-center gap-4 p-4">
      <div className="flex items-center gap-2">
        <span className="display-regular-20">{campName}</span>
        <span className="display-regular-14">
          {isMaster
            ? '🔵 Chatting'
            : isMasterOnline
              ? '🟢 Online'
              : '⚫ Offline'}
        </span>
      </div>
    </div>
  );
}
