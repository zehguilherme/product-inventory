import { useState } from 'react'

import { Button } from '../components/Button'
import { Card } from '../components/Card'
import { Input } from '../components/Form/Input'
import { Plus } from '../components/icons/Plus'
import { Magnifier } from '../components/icons/Magnifier'
import { Select } from '../components/Form/Select'
import { Table } from '../components/Table'
import { DeleteModal } from '../components/DeleteModal'
import { ErrorModal } from '../components/ErrorModal'

interface TableRow {
  name: string
  category: string
  price: string
  quantity: number
  minQuantity: number
  id: string
}

export const Home = () => {
  const [searchInput, setSearchInput] = useState('')
  const [categoryInput, setCategoryInput] = useState('')
  const [statusInput, setStatusInput] = useState('')

  const [deleteModalIsOpen, setDeleteModalIsOpen] = useState(false)
  const [errorModalIsOpen, setErrorModalIsOpen] = useState(false)
  const [errorTitle, setErrorTitle] = useState('')
  const [errorMessage, setErrorMessage] = useState('')

  const [productToDelete, setProductToDelete] = useState<TableRow | null>(null)

  const [categoriesList] = useState([
    {
      value: 'perifericos',
      text: 'Periféricos',
    },
    {
      value: 'monitores',
      text: 'Monitores',
    },
    {
      value: 'armazenamento',
      text: 'Armazenamento',
    },
    {
      value: 'computadores',
      text: 'Computadores',
    },
  ])

  const [statusList] = useState([
    {
      value: 'estoque',
      text: 'Em Estoque',
    },
    {
      value: 'estoque-baixo',
      text: 'Estoque Baixo',
    },
    {
      value: 'sem-estoque',
      text: 'Sem Estoque',
    },
  ])

  const tableColumnNames = [
    'Nome',
    'Categoria',
    'Preço',
    'Quantidade',
    'Qtd. Mínima',
    'Status',
    'Ações',
  ]

  const tableRows: TableRow[] = [
    {
      id: '1',
      name: 'iPhone 15 Pro',
      category: 'Eletrônicos',
      price: 'R$ 7.999,00',
      quantity: 25,
      minQuantity: 5,
    },
    {
      id: '2',
      name: 'Camiseta Básica',
      category: 'Roupas',
      price: 'R$ 49,90',
      quantity: 8,
      minQuantity: 10,
    },
    {
      id: '3',
      name: 'Arroz Integral 5kg',
      category: 'Alimentos',
      price: 'R$ 32,50',
      quantity: 0,
      minQuantity: 20,
    },
  ]

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

        <div className="mb-8 flex flex-col gap-4 md:flex-row">
          <Card title="Total de Produtos" quantity={12} />

          <Card title="Em Estoque" quantity={12} variant="inStock" />

          <Card title="Estoque Baixo" quantity={12} variant="lowStock" />

          <Card title="Sem Estoque" quantity={12} variant="outStock" />
        </div>

        <form className="mb-6 flex flex-col gap-4 sm:flex-row">
          <Input
            id="search"
            name="search"
            placeholder="Buscar por nome..."
            type="search"
            value={searchInput}
            containerClassName="sm:max-w-[980px]"
            onChange={e => setSearchInput(e.target.value)}
          >
            <Magnifier />
          </Input>

          <div className="flex flex-col gap-3 sm:flex-row">
            <Select
              id="category"
              name="category"
              value={categoryInput}
              optionsList={categoriesList}
              defaultOptionText="Selecione uma categoria..."
              containerClassName="sm:max-w-[180px]"
              onChange={e => setCategoryInput(e.target.value)}
            />

            <Select
              id="status"
              name="status"
              value={statusInput}
              optionsList={statusList}
              defaultOptionText="Selecione um status..."
              containerClassName="sm:max-w-[180px]"
              onChange={e => setStatusInput(e.target.value)}
            />
          </div>
        </form>

        <Table
          columnNames={tableColumnNames}
          rows={tableRows}
          openModalDeleteProduct={(product: TableRow) => {
            setProductToDelete(product)
            setDeleteModalIsOpen(true)
          }}
        />

        <DeleteModal
          isOpen={deleteModalIsOpen}
          title="Remover Produto"
          productName={productToDelete?.name || ''}
          deleteProduct={() => {}}
          onClose={() => {
            setDeleteModalIsOpen(false)
            setProductToDelete(null)
          }}
        />

        <ErrorModal
          isOpen={errorModalIsOpen}
          title={errorTitle}
          message={errorMessage}
          onClose={() => {
            setErrorModalIsOpen(false)
          }}
        />
      </section>
    </div>
  )
}
