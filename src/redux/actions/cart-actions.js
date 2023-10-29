import axios from 'axios'

import * as actionTypes from '../types/cart-types'

export const addToCart = (isbn13, qty) => async (dispatch, getState) => {
    const { data } = await axios.get(`https://api.itbook.store/1.0/books/${isbn13}`)

    dispatch({
        type: actionTypes.ADD_TO_CART,
        payload: {
            isbn13: data.isbn13,
            image: data.image,
            title: data.title,
            subtitle: data.subtitle,
            price: data.price,
            authors: data.authors,
            year: data.year,
            desc: data.desc,
            qty,
        },
    })

    localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems))
}

export const removeFromCart = isbn13 => (dispatch, getState) => {
    dispatch({
        type: actionTypes.REMOVE_FROM_CART,
        payload: isbn13,
    })

    localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems))
}
