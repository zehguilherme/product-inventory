import { useState } from 'react'
import { Link, useNavigate } from 'react-router'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import axios, { type AxiosResponse } from 'axios'
import { toast } from 'react-toastify'

import { Input } from '../components/Form/Input'
import { Select } from '../components/Form/Select'
import { Button } from '../components/Button'
import { Arrow } from '../components/icons/Arrow'
import { ErrorModal } from '../components/ErrorModal'

export const Product = () => {
  const [productNameInput, setProductNameInput] = useState('')
  const [categoryInput, setCategoryInput] = useState('')
  const [priceInput, setPriceInput] = useState('')
  const [quantityInput, setQuantityInput] = useState(0)
  const [minQuantityInput, setMinQuantityInput] = useState(0)

  const [errorModalIsOpen, setErrorModalIsOpen] = useState(false)
  const [errorTitle, setErrorTitle] = useState('')
  const [errorMessage, setErrorMessage] = useState('')

  const [isLoading, setIsLoading] = useState(false)

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

  const navigate = useNavigate()

  const productSchema = z.object({
    name: z
      .string()
      .trim()
      .normalize()
      .min(1, {
        message: 'Campo obrigatório',
      })
      .max(255, {
        message: 'Máximo de 255 caracteres',
      }),
    category: z.string().trim().min(1, {
      message: 'Campo obrigatório',
    }),
    price: z.string().trim().min(1, {
      message: 'Campo obrigatório',
    }),
    quantity: z.coerce.number().min(0, {
      message: 'Valor não pode ser negativo',
    }),
    minQuantity: z.coerce.number().min(1, {
      message: 'Valor deve ser pelo menos 1',
    }),
  })

  type ProductSchema = z.output<typeof productSchema>

  const {
    register,
    handleSubmit,
    formState: { errors, isValid, isValidating },
  } = useForm({
    resolver: zodResolver(productSchema),
    mode: 'all',
  })

  const handleSubmitForm = async (data: ProductSchema) => {
    try {
      setIsLoading(true)

      const response: AxiosResponse<ProductSchema> = await axios.post(
        `${import.meta.env.VITE_API_URL}/products`,
        data
      )

      if (response.status === 201 && response.data) {
        const product = response.data

        toast(`Produto "${product.name}" adicionado com sucesso!`, {
          type: 'success',
        })

        navigate('/')
      }
    } catch (error: unknown) {
      setErrorModalIsOpen(true)

      setErrorTitle('Erro')

      if (error instanceof Error) {
        setErrorMessage(error.message)
      }
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <main className="px-3 py-8">
      <ErrorModal
        isOpen={errorModalIsOpen}
        title={errorTitle}
        message={errorMessage}
        onClose={() => {
          setErrorModalIsOpen(false)
        }}
      />

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
          <form
            onSubmit={handleSubmit(handleSubmitForm)}
            className="flex flex-col gap-6"
          >
            <Input
              id="name"
              name="name"
              label="Nome do Produto"
              placeholder="Ex: iPhone 15 Pro"
              type="text"
              value={productNameInput}
              register={register}
              required
              error={errors.name?.message ? errors.name?.message : ''}
              onChange={e => setProductNameInput(e.target.value)}
            />

            <Select
              id="category"
              name="category"
              label="Categoria"
              value={categoryInput}
              optionsList={categoriesList}
              register={register}
              required
              defaultOptionText="Selecione uma categoria..."
              error={errors.category?.message ? errors.category?.message : ''}
              onChange={e => setCategoryInput(e.target.value)}
            />

            <Input
              id="price"
              name="price"
              label="Preço (R$)"
              placeholder="R$ 1000,00"
              type="number"
              value={priceInput}
              register={register}
              required
              error={errors.price?.message ? errors.price?.message : ''}
              onChange={e => setPriceInput(e.target.value)}
            />

            <div className="flex flex-col gap-6 sm:flex-row">
              <Input
                id="quantity"
                name="quantity"
                label="Quantidade em Estoque"
                placeholder="15"
                type="number"
                min={0}
                value={quantityInput}
                register={register}
                required
                containerClassName="sm:flex-1"
                error={errors.quantity?.message ? errors.quantity?.message : ''}
                onChange={e => setQuantityInput(Number(e.target.value))}
              />

              <div className="flex flex-col gap-2 sm:flex-1">
                <Input
                  id="minQuantity"
                  name="minQuantity"
                  label="Quantidade Mínima"
                  placeholder="20"
                  type="number"
                  min={0}
                  value={minQuantityInput}
                  register={register}
                  required
                  error={
                    errors.minQuantity?.message
                      ? errors.minQuantity?.message
                      : ''
                  }
                  onChange={e => setMinQuantityInput(Number(e.target.value))}
                />

                <span className="text-slate-gray text-[14px]/[20px] font-normal">
                  Alerta de estoque baixo
                </span>
              </div>
            </div>

            <div className="flex items-center justify-end">
              <Button
                disabled={isLoading || !isValid || isValidating}
                className="w-full sm:max-w-38.25"
                type="submit"
                loading={isLoading}
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
