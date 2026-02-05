import { Route, Routes } from 'react-router'

import { Home } from './pages/Home'

export function App() {
  return (
    <div className="font-display h-screen">
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </div>
  )
}
