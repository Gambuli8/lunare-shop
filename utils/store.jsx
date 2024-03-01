'use client'

import { useReducer, createContext } from 'react'

export const StoreContext = createContext()

const initialState = {
  cart: {
    items: []
  },
  user: null
}

const reducer = (state, action) => {
  switch (action.type) {
    case 'ADD_TO_CART': {
      const newItems = action.payload
      const existItem = state.cart.items.find(i => i.id === action.payload.id)

      if (existItem) {
        return {
          ...state,
          cart: {
            ...state.cart.items,
            items: state.cart.items.map(i => (i.id === action.payload.id ? newItems : i))
          }
        }
      } else {
        return {
          ...state,
          cart: {
            ...state.cart,
            items: [...state.cart.items, newItems]
          }
        }
      }
    }
    case 'REMOVE_FROM_CART':
      return {
        ...state,
        cart: state.cart.filter(item => item.id !== action.payload.id)
      }
    case 'SET_PRODUCTS':
      return {
        ...state,
        products: action.payload
      }
    case 'SET_USER':
      return {
        ...state,
        user: action.payload
      }
    default:
      return state
  }
}

export const StoreProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState)

  return <StoreContext.Provider value={{ state, dispatch }}>{children}</StoreContext.Provider>
}
