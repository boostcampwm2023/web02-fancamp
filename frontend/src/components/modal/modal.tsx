import { ReactNode, useEffect, useRef } from 'react';

interface ModalProps {
  isOpen: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  children: ReactNode;
}

const Modal = ({ isOpen, setOpen, children }: ModalProps) => {
  const modalRef = useRef<HTMLDialogElement>(null);

  const handleModalClick = (event: any) => {
    const { nodeName } = event.target;
    if (nodeName === 'DIALOG') {
      setOpen(false);
    }
  };

  useEffect(() => {
    if (modalRef.current) {
      if (isOpen) {
        modalRef.current.showModal();
        modalRef.current.classList.remove('opacity-0');
        modalRef.current.classList.remove('backdrop:bg-opacity-0');
        modalRef.current.classList.add('opacity-100');
        modalRef.current.classList.add('backdrop:bg-opacity-50');
      } else {
        modalRef.current.close();
        modalRef.current.classList.add('opacity-0');
        modalRef.current.classList.add('backdrop:bg-opacity-0');
        modalRef.current.classList.remove('opacity-100');
        modalRef.current.classList.remove('backdrop:bg-opacity-50');
      }
    }
  }, [isOpen]);

  return (
    <dialog
      className="smooth-transition backdrop:smooth-transition h-fit w-fit opacity-0 backdrop:bg-text-primary backdrop:bg-opacity-0 focus:outline-none"
      ref={modalRef}
      onClick={handleModalClick}
    >
      {children}
    </dialog>
  );
};

export default Modal;
