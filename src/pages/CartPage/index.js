import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import BookInfoCard from '../../components/cards/CartPageBookInfoCard'
import HomeIcon from '../../assets/icons/home-icon.svg'

const CartPage = () => {
    const cart = useSelector(state => state.cart)

    const navigate = useNavigate()

    const { cartItems } = cart

    const handleHomeIconClick = () => {
        navigate(`/`)
    }

    const handleCardClick = id => {
        navigate(`/book/${id}`)
    }

    return (
        <div className="max-w-4xl mx-auto">
            <div className="text-center pt-4 sm:p-4">
                <div
                    className="text-2xl pt-4 sm:pt-0 sm:text-3xl md:text-5xl 
                font-bold"
                >
                    My Cart
                </div>
                <div>
                    <div className="flex flex-start pl-4 sm:pl-0">
                        <img
                            className="cursor-pointer"
                            onClick={handleHomeIconClick}
                            width={24}
                            src={HomeIcon}
                        />
                    </div>
                </div>
            </div>
            <div className="flex flex-col sm:flex-row">
                <div className="w-full sm:w-1/2">
                    <div className="flex flex-col flex-wrap">
                        {cartItems && cartItems.length ? (
                            cartItems.map(book => (
                                <div key={book.title} className="p-4 w-full">
                                    <BookInfoCard
                                        onClick={() => handleCardClick(book.isbn13)}
                                        key={book.title}
                                        bookInfo={book}
                                    />
                                </div>
                            ))
                        ) : (
                            <div className="text-xl text-center">Empty Cart !</div>
                        )}
                    </div>
                </div>
                <div className="w-full sm:w-1/2 text-center text-2xl pt-6 pb-6">
                    Total:{' '}
                    {cartItems
                        .map(item => item.qty * parseFloat(item.price.replace('$', '')))
                        .reduce((acc, value) => acc + value, 0)
                        .toLocaleString('en-US', {
                            style: 'currency',
                            currency: 'USD',
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 2,
                        })}
                </div>
            </div>
        </div>
    )
}

export default CartPage
