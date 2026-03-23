import { Link } from 'react-router'
import { Box } from '../components/icons/Box'

export const NotFound = () => {
  return (
    <div className="flex min-h-[calc(100vh-65px)] flex-col items-center justify-center px-3 py-8">
      <div className="mb-8 flex items-center gap-3">
        <div className="bg-royal-blue rounded-lg p-2.5">
          <Box className="text-catskill-white h-5" />
        </div>

        <p className="text-ebony text-[20px]/[28px] font-bold">EstoqueApp</p>
      </div>

      <h1 className="text-royal-blue mb-4 text-[120px]/[140px] font-bold">
        404
      </h1>

      <p className="text-slate-gray mb-6 text-center text-xl">
        Página não encontrada
      </p>

      <Link
        to="/"
        className="bg-royal-blue hover:bg-royal-blue-90 rounded-lg px-6 py-3 text-center font-medium text-white transition-colors"
      >
        Voltar para Home
      </Link>
    </div>
  )
}
