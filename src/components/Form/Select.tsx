import type { SelectHTMLAttributes } from 'react'

type OptionType = {
  value: string
  text: string
}[]

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label?: string
  id: string
  name: string
  value: string
  optionsList: OptionType
  disabled?: boolean
  error?: string
  defaultOptionText?: string
  containerClassName?: string
  labelClassName?: string
  inputClassName?: string
  onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void
}

export const Select = ({
  label,
  id,
  name,
  value,
  optionsList,
  disabled,
  error,
  defaultOptionText,
  containerClassName,
  labelClassName,
  inputClassName,
  onChange,
  ...props
}: SelectProps) => {
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
          name={name}
          id={id}
          value={value}
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

      {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
    </div>
  )
}
