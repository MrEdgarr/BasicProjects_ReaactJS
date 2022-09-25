import React, { useReducer, useContext, useEffect } from 'react'
import reducer from '../reducer/postReducer'

const url = 'https://course-api.com/react-useReducer-cart-project';
const AppContext = React.createContext();
const initialState = {
    loading: false,
    cart: [],
    total: 0,
    amount: 0,
}
const AppProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState);


    const fetchData = () => {
        dispatch({ type: 'LOADING' });
        fetch(url)
            .then(response => response.json())
            .then(data => {
                dispatch({ type: 'DISPLAY_ITEMS', payload: data })
            })
            .catch(error => {
                console.log(error);
            })
    }

    const clearCart = () => {
        dispatch({ type: 'CLEAR_CART' });
    }

    const removeCart = (id) => {
        dispatch({ type: 'REMOVE_CART', payload: id })
    }
    const toggerAmount = (id, type) => {
        dispatch({ type: 'TOGGLE_AMOUNT', payload: { id, type } })
    }
    useEffect(() => {
        fetchData();
    }, [])

    useEffect(() => {
        dispatch({ type: 'GET_TOTALS' })
    }, [state.cart])
    return (
        <AppContext.Provider
            value={{
                ...state,
                clearCart,
                removeCart,
                toggerAmount
            }}
        >
            {children}
        </AppContext.Provider>
    )
}


export const useGlobalContext = () => {
    return useContext(AppContext)
}

export { AppContext, AppProvider }