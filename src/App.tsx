import { Route, Routes } from 'react-router'
import { ToastContainer } from 'react-toastify'
import { createContext, useState } from 'react'

import { Header } from './components/Header'
import { Home } from './pages/Home'
import { Product } from './pages/Product'
import { NotFound } from './pages/NotFound'
import { Loading } from './components/Loading'

export const LoadingContext = createContext<
  [
    boolean,
    React.Dispatch<React.SetStateAction<boolean>>,
    string,
    React.Dispatch<React.SetStateAction<string>>,
  ]
>([false, () => null, '', () => null])

export function App() {
  const [loading, setLoading] = useState(false)
  const [loadingText, setLoadingText] = useState('')

  return (
    <LoadingContext.Provider
      value={[loading, setLoading, loadingText, setLoadingText]}
    >
      <div className="font-display bg-athens-gray h-screen">
        <ToastContainer />

        {loading && <Loading message={loadingText} />}

        <Header />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/produto" element={<Product />} />
          <Route path="/produto/:id" element={<Product />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </LoadingContext.Provider>
  )
}
