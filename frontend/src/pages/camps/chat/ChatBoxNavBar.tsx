import { useParams } from 'react-router';

export default function ChatBoxNavBar() {
  const { campId: campName } = useParams();

  return (
    <div className="border-b-none flex items-center gap-4 border border-border bg-yellow p-4">
      <div className="overflow-hidden rounded-full border-md">
        <img
          width="72"
          height="72"
          src="https://picsum.photos/72/72"
          alt="placeholder"
        />
      </div>
      <span className="display-regular-20">{campName}</span>
    </div>
  );
}
