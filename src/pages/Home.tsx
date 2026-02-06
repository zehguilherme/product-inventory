import { Button } from '../components/Button'
import { Plus } from '../components/icons/Plus'

export const Home = () => {
  return (
    <div className="px-3 py-8">
      <div className="mx-auto max-w-342">
        <div className="flex flex-wrap items-center justify-between gap-6 sm:gap-0">
          <div className="flex flex-col gap-1">
            <h2 className="text-ebony text-3xl/[36px] font-bold">Produtos</h2>

            <p className="text-slate-gray text-[16px]/[24px]">
              Gerencie o estoque dos seus produtos
            </p>
          </div>

          <Button onClick={() => {}} className="w-full gap-4 sm:w-auto">
            <Plus className="text-catskill-white h-4" />
            Novo Produto
          </Button>
        </div>
      </div>
    </div>
  )
}
