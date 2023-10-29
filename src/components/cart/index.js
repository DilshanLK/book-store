import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

const Cart = () => {
    const cart = useSelector(state => state.cart)
    const { cartItems } = cart

    const navigate = useNavigate()

    const handleCartButtonClick = () => {
        navigate(`/cart`)
    }

    return (
        <div
            onClick={handleCartButtonClick}
            className="rounded-full w-24 h-24 bg-blue-100 p-1 cursor-pointer 
            flex flex-col justify-center"
        >
            <div className="text-xs font-bold">Cart</div>
            <div className="text-xs">
                {cartItems && cartItems.length
                    ? cartItems.reduce((acc, item) => acc + item.qty, 0) + ' ' + 'items'
                    : 'Empty cart'}
            </div>
            <div className="text-xs">
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
    )
}

export default Cart
