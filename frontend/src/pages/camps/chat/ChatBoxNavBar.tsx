export default function ChatBoxNavBar() {
  return (
    <div className="border-border border-b-none bg-yellow flex items-center gap-4 border p-4">
      <div className="overflow-hidden rounded-full border-md">
        <img
          width="72"
          height="72"
          src="http://github.com/YeongOh.png"
          alt="placeholder"
        />
      </div>
      <span className="display-regular-20">침착맨</span>
    </div>
  );
}
