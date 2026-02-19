import { useEffect, useMemo, useState } from 'react'
import { useNavigate } from 'react-router'
import axios, { type AxiosResponse } from 'axios'

import { toast } from 'react-toastify'

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

  const categoriesList = [
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
  ]

  const statusList = [
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
  ]

  const tableColumnNames = [
    'Nome',
    'Categoria',
    'Preço',
    'Quantidade',
    'Qtd. Mínima',
    'Status',
    'Ações',
  ]

  const [tableRows, setTableRows] = useState<TableRow[]>([])

  const navigate = useNavigate()

  const navigateToNewProductPage = () => {
    navigate('produto')
  }

  const getProductStockStatus = (
    quantity: number,
    minQuantity: number
  ): 'Sem Estoque' | 'Estoque Baixo' | 'Em Estoque' => {
    if (quantity === 0) {
      return 'Sem Estoque'
    }

    if (quantity <= minQuantity) {
      return 'Estoque Baixo'
    }

    return 'Em Estoque'
  }

  const deleteProduct = async () => {
    if (!productToDelete) {
      return
    }

    try {
      const response = await axios.delete(
        `${import.meta.env.VITE_API_URL}/products/${productToDelete.id}`
      )

      if (response.status !== 200) {
        setDeleteModalIsOpen(false)
        setProductToDelete(null)
        setErrorModalIsOpen(true)
        setErrorTitle('Erro')
        setErrorMessage(
          'Não foi possível remover o produto! Tente novamente mais tarde!'
        )

        return
      }

      setTableRows(prevRows =>
        prevRows.filter(row => row.id !== productToDelete.id)
      )

      setDeleteModalIsOpen(false)
      setProductToDelete(null)

      toast(`Produto "${productToDelete.name}" removido com sucesso!`, {
        type: 'success',
      })
    } catch (error: unknown) {
      setDeleteModalIsOpen(false)
      setProductToDelete(null)
      setErrorModalIsOpen(true)
      setErrorTitle('Erro')

      if (error instanceof Error) {
        setErrorMessage(error.message)
      }
    }
  }

  useEffect(() => {
    const getProducts = async () => {
      try {
        const products: AxiosResponse<TableRow[]> = await axios.get(
          `${import.meta.env.VITE_API_URL}/products`
        )

        setTableRows(products.data)
      } catch (error: unknown) {
        setErrorModalIsOpen(true)

        setErrorTitle('Erro')

        if (error instanceof Error) {
          setErrorMessage(error.message)
        }
      }
    }

    getProducts()
  }, [])

  const productStatusCount = useMemo(() => {
    const statusArray = tableRows.map(row =>
      getProductStockStatus(row.quantity, row.minQuantity)
    )

    return statusArray.reduce(
      (counts, status) => {
        counts[status] = (counts[status] || 0) + 1
        return counts
      },
      {} as Record<'Em Estoque' | 'Estoque Baixo' | 'Sem Estoque', number>
    )
  }, [tableRows])

  return (
    <main className="px-3 py-8">
      <section className="mx-auto max-w-342">
        <header className="mb-8 flex flex-wrap items-center justify-between gap-6 sm:gap-0">
          <div className="flex flex-col gap-1">
            <h1 className="text-ebony text-3xl/[36px] font-bold">Produtos</h1>

            <p className="text-slate-gray text-[16px]/[24px]">
              Gerencie o estoque dos seus produtos
            </p>
          </div>

          <Button
            onClick={navigateToNewProductPage}
            className="w-full gap-4 sm:w-auto"
          >
            <Plus className="text-catskill-white h-4" />
            Novo Produto
          </Button>
        </header>

        <div className="mb-8 flex flex-col gap-4 md:flex-row">
          <Card title="Total de Produtos" quantity={tableRows.length} />

          <Card
            title="Em Estoque"
            quantity={productStatusCount['Em Estoque'] || 0}
            variant="inStock"
          />

          <Card
            title="Estoque Baixo"
            quantity={productStatusCount['Estoque Baixo'] || 0}
            variant="lowStock"
          />

          <Card
            title="Sem Estoque"
            quantity={productStatusCount['Sem Estoque'] || 0}
            variant="outStock"
          />
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
          deleteProduct={deleteProduct}
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
    </main>
  )
}
