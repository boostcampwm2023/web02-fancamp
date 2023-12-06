import { useState } from 'react';
import { createPortal } from 'react-dom';

interface Props {
  children: React.ReactNode;
  duration: number;
}

export default function ChatBoxToast({ children, duration }: Props) {
  const [isOpen, setIsOpen] = useState(true);

  const chatBox = document.getElementById('#chatbox')!;
  setTimeout(() => setIsOpen(false), duration);

  return (
    <>
      {isOpen &&
        createPortal(
          <div className="absolute left-1/2 top-1/3 -translate-x-1/2 -translate-y-1/2 cursor-default border bg-logo-green p-4">
            <span className="text-white display-regular-16">{children}</span>
          </div>,
          chatBox
        )}
    </>
  );
}
