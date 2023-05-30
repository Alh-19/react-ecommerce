import React, { useState, useEffect } from "react"


export const cartInitialState = JSON.parse(window.localStorage.getItem('cart')) || []
console.log(cartInitialState)

export const CART_ACTION_TYPES = {
  ADD_TO_CART: 'ADD_TO_CART',
  REMOVE_FROM_CART: 'REMOVE_FROM_CART',
  CLEAR_CART: 'CLEAR_CART',
  DELETE_FROM_CART: 'DELETE_FROM_CART'
}

// update localStorage with state for cart
export const updateLocalStorage = state => {
  window.localStorage.setItem('cart', JSON.stringify(state))
  console.log(state)
}


const UPDATE_STATE_BY_ACTION = {
  [CART_ACTION_TYPES.ADD_TO_CART]: (state, action) => {
    const { id } = action.payload
    const productInCartIndex = state.findIndex(item => item.id === id)

    if (productInCartIndex >= 0) {
      // 👀 una forma sería usando structuredClone
      // const newState = structuredClone(state)
      // newState[productInCartIndex].quantity += 1

      // 👶 usando el map
      // const newState = state.map(item => {
      //   if (item.id === id) {
      //     return {
      //       ...item,
      //       quantity: item.quantity + 1
      //     }
      //   }

      //   return item
      // })

      // ⚡ usando el spread operator y slice
      const newState = [
        ...state.slice(0, productInCartIndex),
        { ...state[productInCartIndex], quantity: state[productInCartIndex].quantity + 1 },
        ...state.slice(productInCartIndex + 1)
      ]

      updateLocalStorage(newState)
      console.log(updateLocalStorage)
      return newState
    }

    const newState = [
      ...state,
      {
        ...action.payload, // product
        quantity: 1
      }
    ]

    updateLocalStorage(newState)
    console.log(updateLocalStorage)
    return newState
  },
  [CART_ACTION_TYPES.REMOVE_FROM_CART]: (state, action) => {
    const { id } = action.payload;
    const productInCartIndex = state.findIndex(item => item.id === id);
  
    if (productInCartIndex >= 0) {
      const currentQuantity = state[productInCartIndex].quantity;
  
      if (currentQuantity > 1) {
        const newState = [
          ...state.slice(0, productInCartIndex),
          { ...state[productInCartIndex], quantity: currentQuantity - 1 },
          ...state.slice(productInCartIndex + 1)
        ];
  
        updateLocalStorage(newState);
        return newState;
      } else {
        // Remove the product from the cart if the quantity is 1
        const newState = [
          ...state.slice(0, productInCartIndex),
          ...state.slice(productInCartIndex + 1)
        ];
  
        updateLocalStorage(newState);
        return newState;
      }
    }
  
    // Return the current state if the product is not in the cart
    return state;
  },
  [CART_ACTION_TYPES.DELETE_FROM_CART]: (state, action) => {
    const { id } = action.payload
    const newState = state.filter(item => item.id !== id)
    updateLocalStorage(newState)
    return newState
  },
  [CART_ACTION_TYPES.CLEAR_CART]: () => {
    updateLocalStorage([])
    return []
  }
}

export const cartReducer = (state, action) => {
  const { type: actionType } = action
  const updateState = UPDATE_STATE_BY_ACTION[actionType]
  console.log(updateState)
  return updateState ? updateState(state, action) : state
}

/* export const Cartnew = () => {
  const [cart, setCart] = useState(cartInitialState);

  useEffect(() => {
    updateLocalStorage(cart);
  }, [cart]);

  const addToCart = (product) => {
    setCart((prevCart) => {
      return cartReducer(prevCart, {
        type: CART_ACTION_TYPES.ADD_TO_CART,
        payload: product
      });
    });
  };

  const removeFromCart = (product) => {
    setCart((prevCart) => {
      return cartReducer(prevCart, {
        type: CART_ACTION_TYPES.REMOVE_FROM_CART,
        payload: product
      });
    });
  };

  const clearCart = () => {
    setCart((prevCart) => {
      return cartReducer(prevCart, {
        type: CART_ACTION_TYPES.CLEAR_CART
      });
    });
  }
}
 */