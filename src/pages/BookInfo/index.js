import { useEffect, useState } from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import { useDispatch } from 'react-redux'

import PrimaryButton from '../../components/buttons/PrimaryButton'
import { addToCart } from '../../redux/actions/cart-actions'
import Cart from '../../components/cart'

const BookInfo = () => {
    const [bookInfo, setBookInfo] = useState({})
    const [qty, setQty] = useState(1)
    const { id } = useParams()

    const dispatch = useDispatch()

    useEffect(() => {
        fetchBooks()
    }, [])

    const fetchBooks = async () => {
        try {
            let res = await axios.get(`https://api.itbook.store/1.0/books/${id}`)
            setBookInfo(res.data)
        } catch (error) {
            console.error('Error fetching book:', error.message)
        }
    }

    const handleAddToCartButtonClick = () => {
        if (qty < 1) {
            return
        }
        dispatch(addToCart(id, qty))
    }

    return (
        <div>
            <div
                className="text-center sm:flex sm:justify-between pt-4 sm:p-6 
            sm:flex sm:items-start"
            >
                <div className="sm:w-48"></div>
                <div
                    className="text-2xl pt-4 sm:pt-0 sm:text-3xl md:text-5xl 
                font-bold"
                >
                    Book Detail
                </div>
                <div
                    className="sm:w-48 text-center flex
                     justify-center sm:pt-0 items-end sm:justify-end
                 md:items-cend lg:flex-row lg:flex-end"
                >
                    <div className="pt-4 sm:pt-0">
                        <Cart />
                    </div>
                </div>
            </div>
            <div className="max-w-4xl mx-auto">
                <div>
                    <div className="flex justify-center items-center">
                        <div className="p-4 w-full">
                            <div
                                className="flex flex-col items-center h-full
                                 bg-white rounded-lg
                items-start flex justify-between p-2 sm:flex-row sm:items-start"
                            >
                                <div
                                    className="flex flex-col items-center 
                                sm:flex-row"
                                >
                                    <div className="sm:w-1/3">
                                        <img
                                            className="w-80 h-auto object-cover
                                             rounded-lg"
                                            alt="Book Cover"
                                            src={bookInfo.image}
                                        />
                                    </div>
                                    <div
                                        className="flex flex-col pl-2 text-center 
                                        sm:w-2/3 
                        sm:text-left sm:max-w-md"
                                    >
                                        <span className="font-bold text-xs">
                                            {bookInfo.title}
                                        </span>
                                        <span className="text-xs pt-1">
                                            {bookInfo.subtitle}
                                        </span>
                                        <span className="text-xs pt-1">
                                            ISBN: {bookInfo.isbn13}
                                        </span>
                                        <span className="text-xs pt-1 font-bold">
                                            Price: {bookInfo.price}
                                        </span>
                                        <span className="text-xs pt-1">
                                            {bookInfo.authors}
                                        </span>
                                        <span className="text-xs pt-1">
                                            {bookInfo.year}
                                        </span>
                                        <span className="text-xs pt-1">
                                            {bookInfo.desc}
                                        </span>
                                    </div>
                                </div>
                                <div
                                    className="flex flex-col items-center 
                        justify-start w-64 pt-2 
                    sm:flex-col sm:items-end lg:items-end lg:flex-col"
                                >
                                    <div className="flex justify-center items-center">
                                        <input
                                            className="border-solid border-2 
                                            border-gray-200 
                            rounded-lg bg-gray-100"
                                            type="number"
                                            id="quantity"
                                            name="quantity"
                                            min="1"
                                            max="5"
                                            step={1}
                                            value={qty}
                                            onChange={e =>
                                                setQty(parseInt(e.target.value, 10))
                                            }
                                        />
                                    </div>
                                    <div
                                        className="pt-2 sm:pt-0 sm:ml-2 sm:ml-0
                                     sm:pt-0 sm:pt-2"
                                    >
                                        <PrimaryButton
                                            onClick={handleAddToCartButtonClick}
                                            label="Add to cart"
                                            type="primary"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default BookInfo
