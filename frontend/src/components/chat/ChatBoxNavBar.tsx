import { useParams } from 'react-router';
import LeftArrowIcon from '../../assets/icons/leftArrowIcon.svg?react';
import { Link } from 'react-router-dom';

interface Props {
  isMaster: boolean;
  isMasterOnline: boolean;
}

export default function ChatBoxNavBar({ isMaster, isMasterOnline }: Props) {
  const { campId: campName } = useParams();

  return (
    <div className="border-b-none flex items-center gap-4 border bg-yellow p-4">
      <Link to={'..'} aria-label="go back">
        <LeftArrowIcon width={40} height={40} />
      </Link>
      <div className="overflow-hidden rounded-full border-md">
        <img
          width="72"
          height="72"
          src="https://picsum.photos/72/72"
          alt="placeholder"
        />
      </div>
      <div className="flex flex-col gap-2">
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
