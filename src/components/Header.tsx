import { Link } from 'react-router'
import { Box } from './icons/Box'

export const Header = () => {
  return (
    <header className="bg-white-80 border-mystic border-b p-3">
      <div className="mx-auto max-w-342">
        <Link to="/" className="flex w-full max-w-max items-center gap-3">
          <div className="bg-royal-blue rounded-lg p-2.5">
            <Box className="text-catskill-white h-5" />
          </div>

          <p className="text-[20px]/[28px] font-bold">EstoqueApp</p>
        </Link>
      </div>
    </header>
  )
}
