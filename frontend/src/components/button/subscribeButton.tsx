interface SubscribeButtonProps {
  subscribed: boolean;
  onClick: () => void;
  children?: React.ReactNode;
}

function SubscribeButton({
  subscribed,
  onClick,
  children,
}: SubscribeButtonProps) {
  return (
    <button
      type="button"
      className="relative flex cursor-pointer items-center gap-sm"
      onClick={onClick}
    >
      <input type="checkbox" className="sr-only" checked={subscribed} />
      {children}
    </button>
  );
}

export default SubscribeButton;
