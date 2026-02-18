import type { SelectHTMLAttributes } from 'react'
import type { FieldValues, Path, UseFormRegister } from 'react-hook-form'

type OptionType = {
  value: string
  text: string
}[]

interface SelectProps<
  T extends FieldValues,
> extends SelectHTMLAttributes<HTMLSelectElement> {
  label?: string
  id: string
  name: Path<T>
  value: string
  optionsList: OptionType
  disabled?: boolean
  error?: string
  defaultOptionText?: string
  required?: boolean
  register?: UseFormRegister<T>
  containerClassName?: string
  labelClassName?: string
  inputClassName?: string
  onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void
}

export const Select = <T extends FieldValues>({
  label,
  id,
  name,
  value,
  optionsList,
  disabled,
  error,
  defaultOptionText,
  required,
  register,
  containerClassName,
  labelClassName,
  inputClassName,
  onChange,
  ...props
}: SelectProps<T>) => {
  return (
    <div className={`flex w-full flex-col ${containerClassName}`}>
      <div className="flex w-full flex-col gap-3.25">
        {label && (
          <label
            htmlFor={id}
            className={`${disabled ? 'cursor-not-allowed' : ''} text-ebony text-[14px]/[14px] font-medium ${labelClassName}`}
          >
            {label}
          </label>
        )}

        <select
          {...props}
          id={id}
          value={value}
          {...(register &&
            register(name, {
              required: required,
            }))}
          onChange={onChange}
          className={`${disabled ? 'bg-westar cursor-not-allowed' : ''} border-mystic bg-athens-gray text-ebony outline-royal-blue placeholder:text-slate-gray h-10 rounded-md border px-3 py-2.25 text-[14px]/[20px] font-normal placeholder:text-[14px]/[16.9px] placeholder:font-normal ${value === '' ? 'text-slate-gray' : ''} ${inputClassName}`}
        >
          {defaultOptionText ? (
            <option value="">{defaultOptionText}</option>
          ) : (
            <option value="">Selecione uma opção...</option>
          )}

          {optionsList &&
            optionsList.map(option => (
              <option key={option.value} value={option.value}>
                {option.text}
              </option>
            ))}
        </select>
      </div>

      {error && <p className="text-flamingo mt-1 text-sm">{error}</p>}
    </div>
  )
}
