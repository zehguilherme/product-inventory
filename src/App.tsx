import { Route, Routes } from 'react-router'

import { Header } from './components/Header'
import { Home } from './pages/Home'
import { Product } from './pages/Product'

export function App() {
  return (
    <div className="font-display bg-athens-gray h-screen">
      <Header />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/produto" element={<Product />} />
      </Routes>
    </div>
  )
}
