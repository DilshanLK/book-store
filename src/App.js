import { Routes, Route } from 'react-router-dom'

import Home from './pages/Home'
import BookInfo from './pages/BookInfo'
import CartPage from './pages/CartPage'
import PageNotFound from './pages/PageNotFound'

function App() {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/book/:id" element={<BookInfo />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="*" element={<PageNotFound />} />
        </Routes>
    )
}

export default App
