import * as actionTypes from '../types/cart-types'

const initialState = {
    cartItems: [],
}

const cartReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.ADD_TO_CART: {
            const item = action.payload

            const existItem = state.cartItems.find(i => i.isbn13 === item.isbn13)

            if (existItem) {
                return {
                    ...state,
                    cartItems: state.cartItems.map(i =>
                        i.isbn13 === existItem.isbn13
                            ? { ...item, qty: existItem.qty + item.qty }
                            : i
                    ),
                }
            } else {
                return {
                    ...state,
                    cartItems: [...state.cartItems, item],
                }
            }
        }

        case actionTypes.REMOVE_FROM_CART: {
            return {
                ...state,
                cartItems: state.cartItems.filter(i => i.isbn13 !== action.payload),
            }
        }

        default:
            return state
    }
}

export default cartReducer
