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
          <div className="absolute left-1/2 top-1/2 rounded-lg bg-logo-green p-4 opacity-100 transition-opacity display-regular-16">
            {children}
          </div>,
          chatBox
        )}
    </>
  );
}
