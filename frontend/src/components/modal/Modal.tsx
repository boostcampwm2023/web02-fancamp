import { ReactNode, useEffect, useRef } from 'react';

interface ModalProps {
  isOpen: boolean;
  handleCloseModal: () => void;
  children: ReactNode;
}

function Modal({ isOpen, handleCloseModal, children }: ModalProps) {
  const modalRef = useRef<HTMLDialogElement>(null);

  const handleModalClick = (event: any) => {
    const { nodeName } = event.target;
    if (nodeName === 'DIALOG') {
      handleCloseModal();
    }
  };

  useEffect(() => {
    if (modalRef.current) {
      if (isOpen) {
        modalRef.current.showModal();
        modalRef.current.classList.remove('opacity-0');
        modalRef.current.classList.add('opacity-100');
      } else {
        modalRef.current.close();
        modalRef.current.classList.add('opacity-0');
        modalRef.current.classList.remove('opacity-100');
      }
    }
  }, [isOpen]);

  return (
    <>
      {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-noninteractive-element-interactions */}
      <dialog
        className="h-fit w-fit opacity-0 smooth-transition backdrop:bg-text-primary backdrop:bg-opacity-50 backdrop:smooth-transition focus:outline-none"
        ref={modalRef}
        onClick={handleModalClick}
      >
        {children}
      </dialog>
    </>
  );
}

export default Modal;
