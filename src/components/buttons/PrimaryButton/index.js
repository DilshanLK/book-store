const PrimaryButton = props => {
    const { label, type, onClick } = props

    const getBackgroundColor = () => {
        switch (type) {
            case 'primary':
                return 'bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700'
            case 'danger':
                return 'bg-gradient-to-r from-red-500 via-red-600 to-red-700'
            default:
                return 'bg-gray-500'
        }
    }

    return (
        <button
            onClick={onClick}
            className={`text-white ${getBackgroundColor()} 
                        hover:bg-gradient-to-br focus:ring-4 focus:outline-none 
                        focus:ring-${type === 'danger' ? 'red-300' : 'blue-300'} 
                        shadow-lg ${type === 'danger' ? 'shadow-red' : 'shadow-blue'}/50 
                        font-medium rounded-lg text-xs px-2 py-2 text-center`}
        >
            {label}
        </button>
    )
}

export default PrimaryButton
