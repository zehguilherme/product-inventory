import { Route, Routes } from 'react-router'

import { Home } from './pages/Home'
import { Header } from './components/Header'

export function App() {
  return (
    <div className="font-display bg-athens-gray h-screen">
      <Header />

      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </div>
  )
}
