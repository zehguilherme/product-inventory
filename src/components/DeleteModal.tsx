import { useEffect, useRef } from 'react'

import { Button } from './Button'

interface DeleteModalProps {
  isOpen: boolean
  title: string
  productName: string
  onClose: () => void
  deleteProduct: () => void
}

export const DeleteModal = ({
  isOpen,
  title,
  productName,
  onClose,
  deleteProduct,
}: DeleteModalProps) => {
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
          Tem certeza que deseja remover o produto{' '}
          <span className="text-ebony font-medium">"{productName}"</span>? Esta
          ação não pode ser desfeita.
        </p>

        <div className="flex flex-col gap-2 sm:flex-row sm:justify-end">
          <Button
            onClick={onClose}
            variant="ghost"
            className="order-2 sm:order-1"
          >
            Cancelar
          </Button>

          <Button
            onClick={deleteProduct}
            variant="danger"
            className="order-1 sm:order-2"
          >
            Remover
          </Button>
        </div>
      </div>
    </dialog>
  )
}
