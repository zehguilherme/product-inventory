import type { InputHTMLAttributes, ReactNode } from 'react'

type InputType = InputHTMLAttributes<HTMLInputElement>['type']

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string
  id: string
  name: string
  value: string
  placeholder?: string
  type: InputType
  disabled?: boolean
  error?: string
  labelClassName?: string
  inputClassName?: string
  children?: ReactNode
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void
}

export const Input = ({
  label,
  id,
  name,
  value,
  placeholder,
  type,
  disabled,
  error,
  labelClassName,
  inputClassName,
  onChange,
  children,
  ...props
}: InputProps) => {
  const hasIcon = Boolean(children)

  return (
    <>
      <div className="flex flex-col gap-3.25">
        {label && (
          <label
            htmlFor={id}
            className={`${disabled ? 'cursor-not-allowed' : ''} text-ebony text-[14px]/[14px] font-medium ${labelClassName}`}
          >
            {label}
          </label>
        )}

        <div className="relative w-full">
          {hasIcon && (
            <div className="text-slate-gray absolute top-1/2 left-3 w-4 -translate-y-1/2">
              {children}
            </div>
          )}

          <input
            {...props}
            id={id}
            name={name}
            value={value}
            type={type}
            placeholder={placeholder}
            disabled={disabled}
            onChange={onChange}
            className={`${disabled ? 'bg-westar cursor-not-allowed' : ''} outline-royal-blue border-mystic bg-athens-gray text-ebony placeholder:text-slate-gray h-10 w-full rounded-md border py-3 text-[14px]/[16.9px] font-normal placeholder:text-[14px]/[16.9px] placeholder:font-normal ${hasIcon ? 'pr-3.25 pl-10.25' : 'px-3.25'} ${inputClassName}`}
          />
        </div>
      </div>

      {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
    </>
  )
}
