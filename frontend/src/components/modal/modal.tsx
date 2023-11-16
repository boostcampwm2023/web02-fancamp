import { ReactNode, useEffect, useRef } from 'react'

interface ModalProps {
  isOpen: boolean
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
  children: ReactNode
}

const Modal = ({ isOpen, setOpen, children }: ModalProps) => {
  const modalRef = useRef<HTMLDialogElement>(null)

  const handleModalClick = (event: any) => {
    const { nodeName } = event.target

    if (nodeName === 'DIALOG' && modalRef.current) {
      setOpen(false)
      modalRef.current.close()
    }
  }

  useEffect(() => {
    if (modalRef.current) {
      if (isOpen) {
        modalRef.current.showModal()
      } else {
        modalRef.current.close()
      }
    }
  }, [isOpen])

  return (
    <dialog className="modal w-fit h-fit" ref={modalRef} onClick={handleModalClick}>
      {children}
    </dialog>
  )
}

export default Modal
