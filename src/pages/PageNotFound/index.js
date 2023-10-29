import { useNavigate } from 'react-router-dom'

const PageNotFound = () => {
    const navigate = useNavigate()

    const handleHomeIconClick = () => {
        navigate(`/`)
    }

    return (
        <div className="max-w-4xl mx-auto">
            <div className="text-center pt-4 sm:p-4">
                <div
                    className="text-2xl pt-4 sm:pt-0 sm:text-3xl md:text-5xl 
                font-bold"
                >
                    Page Not Found
                </div>
                <div>
                    <div
                        onClick={handleHomeIconClick}
                        className="text-center pl-4 sm:pl-0 pt-4 font-normal
                         cursor-pointer"
                    >
                        Got to Home
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PageNotFound
