import { useState } from 'react'
import { Link } from 'react-router'

import { Input } from '../components/Form/Input'
import { Select } from '../components/Form/Select'
import { Button } from '../components/Button'
import { Arrow } from '../components/icons/Arrow'

export const Product = () => {
  const [productNameInput, setProductNameInput] = useState('')
  const [categoryInput, setCategoryInput] = useState('')
  const [priceInput, setPriceInput] = useState('')
  const [quantityInput, setQuantityInput] = useState('')
  const [minQuantityInput, setMinQuantityInput] = useState('')

  const [categoriesList] = useState([
    {
      value: 'armazenamento',
      text: 'Armazenamento',
    },
    {
      value: 'computadores',
      text: 'Computadores',
    },
    {
      value: 'monitores',
      text: 'Monitores',
    },
    {
      value: 'perifericos',
      text: 'Periféricos',
    },
  ])

  return (
    <main className="px-3 py-8">
      <div className="mx-auto max-w-2xl">
        <Link
          to="/"
          className="text-ebony hover:bg-mystic mb-4 flex h-10 max-w-26 items-center gap-2 rounded-md px-4 py-2 text-[14px]/[20px] font-medium"
        >
          <Arrow className="h-4" />
          Voltar
        </Link>

        <header className="mb-8 flex flex-col gap-1">
          <h1 className="text-ebony text-[30px]/[36px] font-bold">
            Novo Produto
          </h1>

          <p className="text-slate-gray text-[16px]/[24px] font-normal">
            Preencha os dados para adicionar um novo produto
          </p>
        </header>

        <section className="border-mystic rounded-lg border bg-white p-6 drop-shadow-md">
          <form onSubmit={() => {}} className="flex flex-col gap-6">
            <Input
              id="name"
              name="name"
              label="Nome do Produto"
              placeholder="Ex: iPhone 15 Pro"
              type="text"
              value={productNameInput}
              containerClassName=""
              onChange={e => setProductNameInput(e.target.value)}
            />

            <Select
              id="category"
              name="category"
              label="Categoria"
              value={categoryInput}
              optionsList={categoriesList}
              defaultOptionText="Selecione uma categoria..."
              containerClassName=""
              onChange={e => setCategoryInput(e.target.value)}
            />

            <Input
              id="price"
              name="price"
              label="Preço (R$)"
              placeholder="R$ 1000,00"
              type="number"
              value={priceInput}
              containerClassName=""
              onChange={e => setPriceInput(e.target.value)}
            />

            <div className="flex flex-col gap-6 sm:flex-row">
              <Input
                id="quantity"
                name="quantity"
                label="Quantidade em Estoque"
                placeholder="15"
                type="number"
                value={quantityInput}
                containerClassName="sm:flex-1"
                onChange={e => setQuantityInput(e.target.value)}
              />

              <div className="flex flex-col gap-2 sm:flex-1">
                <Input
                  id="minQuantity"
                  name="minQuantity"
                  label="Quantidade Mínima"
                  placeholder="20"
                  type="number"
                  value={minQuantityInput}
                  containerClassName=""
                  onChange={e => setMinQuantityInput(e.target.value)}
                />

                <span className="text-slate-gray text-[14px]/[20px] font-normal">
                  Alerta de estoque baixo
                </span>
              </div>
            </div>

            <div className="flex items-center justify-end">
              <Button
                className="w-full sm:max-w-38.25"
                type="submit"
                onClick={() => {}}
              >
                Adicionar Produto
              </Button>
            </div>
          </form>
        </section>
      </div>
    </main>
  )
}
