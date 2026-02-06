import type { ReactNode } from 'react'

type ButtonVariant = 'primary' | 'danger' | 'ghost'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode
  loading?: boolean
  disabled?: boolean
  variant?: ButtonVariant
}

const variantClasses: Record<ButtonVariant, string> = {
  primary: 'bg-royal-blue hover:bg-royal-blue-90 text-catskill-white',
  danger: 'bg-flamingo hover:bg-flamingo-90 text-catskill-white',
  ghost: 'bg-athens-gray hover:bg-gray-100 text-ebony border-1 border-mystic',
}

export const Button = ({
  children,
  disabled,
  loading,
  className,
  variant = 'primary',
  ...props
}: ButtonProps) => {
  return (
    <button
      {...props}
      disabled={disabled || loading}
      className={`${disabled ? 'bg-westar' : `${variantClasses[variant]} transition`} flex h-10 ${disabled ? 'cursor-not-allowed' : 'cursor-pointer'} items-center justify-center rounded-md px-4 py-2 text-[14px]/[20px] font-medium ${className}`}
    >
      {loading ? 'Carregando...' : children}
    </button>
  )
}
