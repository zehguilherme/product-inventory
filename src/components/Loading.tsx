import { Spinner } from './icons/Spinner'

interface LoadingProps {
  message?: string
}

export const Loading = ({ message = 'Carregando...' }: LoadingProps) => {
  return (
    <div className="fixed inset-0 z-50 flex h-full w-full items-center justify-center bg-black/50">
      <div className="flex h-full w-full flex-col items-center justify-center gap-4 bg-white p-6 shadow-lg">
        <Spinner className="text-black1 h-8 w-8 animate-spin" />

        <p className="text-black1 text-base font-medium">{message}</p>
      </div>
    </div>
  )
}
