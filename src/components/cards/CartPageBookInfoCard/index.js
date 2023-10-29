import { useState } from 'react'
import { useDispatch } from 'react-redux'

import PrimaryButton from '../../buttons/PrimaryButton'
import { addToCart, removeFromCart } from '../../../redux/actions/cart-actions'

const BookInfoCard = props => {
    const [qty, setQty] = useState(1)

    const dispatch = useDispatch()

    const handleAddToCartButtonClick = () => {
        if (qty < 1) {
            return
        }
        dispatch(addToCart(props.bookInfo.isbn13, qty))
    }

    const handleRemoveFromCartButtonClick = () => {
        dispatch(removeFromCart(props.bookInfo.isbn13))
    }

    return (
        <div
            className="flex flex-col items-center h-full w-full border-2 
                border-gray-200 bg-white rounded-lg 
                items-center flex justify-between p-2 lg:flex-row "
        >
            <div
                onClick={props.onClick}
                className="flex flex-col items-center lg:flex-row cursor-pointer"
            >
                <div>
                    <img
                        className="w-32 h-auto object-cover rounded-lg"
                        src={props.bookInfo.image}
                        alt="Book Cover"
                    />
                </div>
                <div className="flex flex-col pl-2 text-center lg:text-left">
                    <span className="font-bold text-xs">{props.bookInfo.title}</span>
                    <span className="text-xs pt-1">{props.bookInfo.subtitle}</span>
                    <span className="text-xs pt-1">ISBN: {props.bookInfo.isbn13}</span>
                    <span className="text-xs pt-1 font-bold">
                        Price: {props.bookInfo.price}
                    </span>
                </div>
            </div>
            <div className="flex items-start justify-center w-64 pt-2">
                <div className="flex justify-center items-center">
                    <input
                        className="border-solid border-2 border-gray-200 
                            rounded-lg bg-gray-100"
                        type="number"
                        id="quantity"
                        name="quantity"
                        min={1}
                        max={5}
                        value={qty}
                        step={1}
                        onChange={e => setQty(parseInt(e.target.value, 10))}
                    />
                </div>
                <div className="flex flex-col items-end sm:pt-0 sm:ml-2 sm:ml-0">
                    <div>
                        <PrimaryButton
                            onClick={handleAddToCartButtonClick}
                            label="Update"
                            type="primary"
                        />
                    </div>
                    <div className="pt-2">
                        <PrimaryButton
                            onClick={handleRemoveFromCartButtonClick}
                            label="Remove"
                            type="danger"
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default BookInfoCard
