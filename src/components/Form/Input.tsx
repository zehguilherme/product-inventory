import type { InputHTMLAttributes, ReactNode } from 'react'
import type { FieldValues, Path, UseFormRegister } from 'react-hook-form'

type InputType = InputHTMLAttributes<HTMLInputElement>['type']

interface InputProps<
  T extends FieldValues,
> extends InputHTMLAttributes<HTMLInputElement> {
  label?: string
  id: string
  name: Path<T>
  value: string | number
  placeholder?: string
  type: InputType
  disabled?: boolean
  min?: number
  error?: string
  containerClassName?: string
  labelClassName?: string
  inputClassName?: string
  required?: boolean
  register?: UseFormRegister<T>
  children?: ReactNode
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void
}

export const Input = <T extends FieldValues>({
  label,
  id,
  name,
  value,
  placeholder,
  type,
  disabled,
  min,
  error,
  containerClassName,
  labelClassName,
  inputClassName,
  required,
  register,
  onChange,
  children,
  ...props
}: InputProps<T>) => {
  const hasIcon = Boolean(children)

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value

    if (
      type === 'number' &&
      min !== undefined &&
      newValue !== '' &&
      Number(newValue) < min
    ) {
      return
    }

    onChange(event)
  }

  return (
    <div className={`flex w-full flex-col ${containerClassName}`}>
      <div className="flex w-full flex-col gap-3.25">
        {label && (
          <label
            htmlFor={id}
            className={`${disabled ? 'cursor-not-allowed' : ''} text-ebony text-[14px]/[14px] font-medium ${labelClassName}`}
          >
            {label}

            {required && <span>*</span>}
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
            value={value}
            type={type}
            placeholder={placeholder}
            disabled={disabled}
            min={min}
            {...(register &&
              register(name, {
                required: required,
              }))}
            onChange={handleChange}
            className={`${disabled ? 'bg-westar cursor-not-allowed' : ''} outline-royal-blue border-mystic bg-athens-gray text-ebony placeholder:text-slate-gray h-10 w-full rounded-md border py-3 text-[14px]/[16.9px] font-normal placeholder:text-[14px]/[16.9px] placeholder:font-normal ${hasIcon ? 'pr-3.25 pl-10.25' : 'px-3.25'} ${inputClassName}`}
          />
        </div>
      </div>

      {error && <p className="text-flamingo mt-1 text-sm">{error}</p>}
    </div>
  )
}
