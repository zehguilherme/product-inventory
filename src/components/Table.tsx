import { Circle } from '../components/icons/Circle'
import { Pencil } from '../components/icons/Pencil'
import { Trash } from '../components/icons/Trash'
import { Link } from 'react-router'

interface TableRow {
  name: string
  category: string
  price: string
  quantity: number
  minQuantity: number
  id: string
}

interface TableProps {
  columnNames: string[]
  rows: TableRow[]
  openModalDeleteProduct: (product: TableRow) => void
}

export const Table = ({
  columnNames,
  rows,
  openModalDeleteProduct,
}: TableProps) => {
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

  return (
    <div className="border-mystic overflow-x-auto rounded-lg border">
      <table className="w-full table-fixed bg-white drop-shadow-md">
        <thead>
          <tr className="border-mystic border border-x-0 border-t-0">
            {columnNames.map(columnName => (
              <th
                key={columnName}
                className="text-slate-gray w-45 px-4 pt-[13.75px] pb-[14.75px] text-start text-[14px]/[20px] font-bold"
              >
                {columnName}
              </th>
            ))}
          </tr>
        </thead>

        <tbody>
          {rows &&
            rows.map(row => (
              <tr
                key={row.id}
                className="border-b-mystic border border-x-0 last:border-b-0"
              >
                <td className="text-ebony px-4 py-[22.5px] text-[14px]/[20px] font-medium">
                  {row.name}
                </td>

                <td className="px-4 py-[22.5px]">
                  <span className="bg-catskill-white2 text-slate-gray inline-block h-6 rounded-md px-2.5 py-0.5 text-[14px]/[20px] font-normal">
                    {row.category}
                  </span>
                </td>

                <td className="text-ebony px-4 py-[22.5px] text-[14px]/[20px] font-medium">
                  R$ {row.price}
                </td>

                <td className="text-ebony px-4 py-[22.5px] text-[14px]/[20px] font-medium">
                  {row.quantity}
                </td>

                <td className="text-ebony px-4 py-[22.5px] text-[14px]/[20px] font-medium">
                  {row.minQuantity}
                </td>

                <td className="px-4 py-[22.5px]">
                  <div
                    className={`${getProductStockStatus(row.quantity, row.minQuantity) === 'Em Estoque' ? 'bg-cinderella text-salem' : getProductStockStatus(row.quantity, row.minQuantity) === 'Estoque Baixo' ? 'bg-light-yellow text-buttercup' : 'text-flamingo bg-light-red'} flex max-w-fit items-center gap-1.5 rounded-full px-3 py-1`}
                  >
                    <span>
                      <Circle className="h-1.5" />
                    </span>

                    <span className="inline-block text-[12px]/[16px] font-medium">
                      {getProductStockStatus(row.quantity, row.minQuantity)}
                    </span>
                  </div>
                </td>

                <td className="px-4 py-[22.5px]">
                  <div className="flex items-center justify-start gap-2">
                    <Link
                      to={`/produto/${row.id}`}
                      title="Editar"
                      className="hover:bg-catskill-white2 inline-block rounded-md p-2"
                    >
                      <Pencil className="text-slate-gray h-4" />
                    </Link>

                    <button
                      title="Excluir"
                      className="hover:bg-catskill-white2 cursor-pointer rounded-md p-2"
                      onClick={() => openModalDeleteProduct(row)}
                    >
                      <Trash className="text-slate-gray h-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  )
}
