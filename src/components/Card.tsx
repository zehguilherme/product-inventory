type CardVariant = 'totalProducts' | 'inStock' | 'lowStock' | 'outStock'

interface CardProps {
  title: string
  quantity: number
  variant?: CardVariant
}

const variantClasses: Record<CardVariant, string> = {
  totalProducts: 'text-ebony',
  inStock: 'text-salem',
  lowStock: 'text-buttercup',
  outStock: 'text-flamingo',
}

export const Card = ({
  title,
  quantity,
  variant = 'totalProducts',
}: CardProps) => {
  return (
    <div className="border-mystic flex w-auto flex-col gap-1 rounded-lg border bg-white p-4 drop-shadow-md sm:w-full">
      <span className="text-slate-gray text-[14px]/[20px] font-normal">
        {title}
      </span>

      <span className={`text-2xl/[32px] font-bold ${variantClasses[variant]}`}>
        {quantity}
      </span>
    </div>
  )
}
