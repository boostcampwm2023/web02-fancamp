import { createPortal } from 'react-dom';
import { TailSpin } from 'react-loader-spinner';

function ModalSipnner() {
  return (
    <>
      {createPortal(
        <div className="fixed bottom-[0] left-[0] right-[0] top-[0] bg-text-primary bg-opacity-50">
          <TailSpin
            height="32"
            width="32"
            color="#0087E9"
            ariaLabel="loading-spinner"
            radius="1"
            wrapperClass="relative center w-fit"
            visible
          />
        </div>,
        document.body
      )}
    </>
  );
}

export default ModalSipnner;
