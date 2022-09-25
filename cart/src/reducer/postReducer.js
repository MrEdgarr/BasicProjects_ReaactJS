const reducer = (state, action) => {
    switch (action.type) {
        case 'LOADING':
            return { ...state, loading: true };

        case 'DISPLAY_ITEMS':
            return { ...state, cart: action.payload, loading: false };

        case 'CLEAR_CART':
            return { ...state, cart: [] };

        case 'REMOVE_CART':
            return {
                ...state,
                cart: state.cart.filter((cartItem) => cartItem.id !== action.payload)
            };

        case 'TOGGLE_AMOUNT':
            let tempCart = state.cart.map((cartItem) => {
                if (cartItem.id === action.payload.id) {
                    if (action.payload.type === 'inc') {
                        return { ...cartItem, amount: cartItem.amount + 1 }
                    }
                    if (action.payload.type === 'dec') {
                        return { ...cartItem, amount: cartItem.amount - 1 }
                    }
                }
                return cartItem
            }).filter((cartItem) => cartItem.amount !== 0)
            return { ...state, cart: tempCart }

        case 'GET_TOTALS':
            let { total, amount } = state.cart.reduce(
                (cartTotal, cartItem) => {
                    const { price, amount } = cartItem;
                    const itemTotal = price * amount //Tong tien cua 1 sp
                    cartTotal.total += itemTotal; //tong tien
                    cartTotal.amount += amount // tong so luong sp

                    return cartTotal;
                }, {
                total: 0,
                amount: 0,
            }
            )
            total = parseFloat(total.toFixed(2));
            return { ...state, total, amount }

        default:
            break;
    }
}

export default reducer
