import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

import BookInfoCard from '../../components/cards/BookInfoCard'
import Cart from '../../components/cart'

const Home = () => {
    const [bookList, setBookList] = useState([])
    const [searchQuery, setSearchQuery] = useState('')
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)

    const navigate = useNavigate()

    const handleSearch = async () => {
        try {
            setLoading(true)
            const response = await axios.get(
                `https://api.itbook.store/1.0/search/${searchQuery}`
            )
            setBookList(response.data.books)
        } catch (error) {
            setError(error.message || 'An error occurred while fetching books.')
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        const fetchBooks = async () => {
            try {
                setLoading(true)
                const res = await axios.get('https://api.itbook.store/1.0/new')
                setBookList(res.data.books)
            } catch (error) {
                setError(error.message || 'An error occurred while fetching books.')
            } finally {
                setLoading(false)
            }
        }

        fetchBooks()

        if (searchQuery.trim() !== '') {
            handleSearch()
        }
    }, [searchQuery])

    const handleCardClick = id => {
        navigate(`/book/${id}`)
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
                    Book Store
                </div>
                <div
                    className="text-center flex flex-col pt-6 sm:pt-0 items-center
                 md:items-center lg:flex-row sm:flex-col-reverse"
                >
                    <div className="md:mr-4 sm:pt-2 relative">
                        <input
                            className="border-solid border-2 border-gray-500 
                            rounded-lg text-sm p-2 pl-8"
                            type="text"
                            placeholder="Search Books"
                            value={searchQuery}
                            onChange={e => setSearchQuery(e.target.value)}
                        />
                        <div className="absolute top-2 mt-2.5 left-2 text-gray-500">
                            <svg
                                className="h-4 w-4"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M21 21l-5.2-5.2"
                                />
                                <circle cx="10" cy="10" r="8" />
                            </svg>
                        </div>
                    </div>
                    <div className="pt-4 sm:pt-0">
                        <Cart />
                    </div>
                </div>
            </div>
            {loading ? (
                <div className="text-center mt-4">Loading...</div>
            ) : error ? (
                <div className="text-center text-red-500 mt-4">{error}</div>
            ) : (
                <div>
                    <div
                        className="font-bold text-lg text-center pt-4 sm:pt-0 
                    sm:text-left sm:pl-6"
                    >
                        New Books
                    </div>
                    <div className="h-screen">
                        <div className="flex flex-wrap p-2">
                            {bookList.map(book => (
                                <div
                                    key={book.title}
                                    className="p-4 w-full min:w-md sm:w-1/2 lg:w-1/3"
                                >
                                    <BookInfoCard
                                        onClick={() => handleCardClick(book.isbn13)}
                                        key={book.title}
                                        bookInfo={book}
                                    />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

export default Home
