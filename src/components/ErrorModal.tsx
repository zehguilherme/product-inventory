import { useEffect, useRef } from 'react'

import { Button } from './Button'

interface ErrorModalProps {
  isOpen: boolean
  title: string
  message: string
  onClose: () => void
}

export const ErrorModal = ({
  isOpen,
  title,
  message,
  onClose,
}: ErrorModalProps) => {
  const dialogRef = useRef<HTMLDialogElement>(null)

  useEffect(() => {
    const dialog = dialogRef.current

    if (!dialog) {
      return
    }

    if (isOpen) {
      if (!dialog.open) {
        dialog.showModal()
      }
    } else {
      if (dialog.open) {
        dialog.close()
      }
    }
  }, [isOpen])

  const handleBackdropClick = (event: React.MouseEvent<HTMLDialogElement>) => {
    const dialog = dialogRef.current

    if (!dialog) {
      return
    }

    const modalInformationInRelationToViewPort = dialog.getBoundingClientRect()

    const clickedInDialog =
      modalInformationInRelationToViewPort.top <= event.clientY &&
      event.clientY <= modalInformationInRelationToViewPort.bottom &&
      modalInformationInRelationToViewPort.left <= event.clientX &&
      event.clientX <= modalInformationInRelationToViewPort.right

    if (!clickedInDialog) {
      onClose()
    }
  }

  return (
    <dialog
      ref={dialogRef}
      onClick={handleBackdropClick}
      onClose={onClose}
      className="border-mystic fixed top-1/2 left-1/2 m-0 w-full max-w-lg -translate-x-1/2 -translate-y-1/2 rounded-lg border bg-white p-0 drop-shadow-md backdrop:bg-black/50"
    >
      <div className="p-6 shadow-xl">
        {title && (
          <h2 className="text-ebony mb-2 text-[18px]/[28px] font-semibold">
            {title}
          </h2>
        )}

        <p className="text-slate-gray mb-4 text-[14px]/[20px] font-normal">
          {message}
        </p>

        <div className="flex flex-col gap-2 sm:flex-row sm:justify-end">
          <Button onClick={onClose}>Entendi</Button>
        </div>
      </div>
    </dialog>
  )
}
