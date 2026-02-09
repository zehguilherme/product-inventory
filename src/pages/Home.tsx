import { useState } from 'react'
import { Button } from '../components/Button'
import { Card } from '../components/Card'
import { Input } from '../components/Form/Input'
import { Plus } from '../components/icons/Plus'
import { Magnifier } from '../components/icons/Magnifier'

export const Home = () => {
  const [searchInput, setSearchInput] = useState('')

  return (
    <div className="px-3 py-8">
      <section className="mx-auto max-w-342">
        <div className="mb-8 flex flex-wrap items-center justify-between gap-6 sm:gap-0">
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

        <div className="mb-6 flex flex-col gap-4 md:flex-row">
          <Card title="Total de Produtos" quantity={12} />

          <Card title="Em Estoque" quantity={12} variant="inStock" />

          <Card title="Estoque Baixo" quantity={12} variant="lowStock" />

          <Card title="Sem Estoque" quantity={12} variant="outStock" />
        </div>

        <form>
          <Input
            id="search"
            name="search"
            placeholder="Buscar por nome..."
            type="search"
            value={searchInput}
            onChange={e => setSearchInput(e.target.value)}
          >
            <Magnifier />
          </Input>
        </form>
      </section>
    </div>
  )
}
