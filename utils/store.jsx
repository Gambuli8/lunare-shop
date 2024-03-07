'use client'

import { createContext, useEffect, useState } from 'react'
import { toast, Toaster } from 'react-hot-toast'

export const StoreContext = createContext()

// const initialState = {
//   cart: {
//     items: []
//   },
//   user: null
// }

// const reducer = (state, action) => {
//   switch (action.type) {
//     case 'ADD_TO_CART': {
//       const newItems = action.payload
//       const existItem = state.cart.items.find(i => i.id === action.payload.id)

//       if (existItem) {
//         return {
//           ...state,
//           cart: {
//             ...state.cart.items,
//             items: state.cart.items.map(i => (i.id === action.payload.id ? newItems : i))
//           }
//         }
//       } else {
//         return {
//           ...state,
//           cart: {
//             ...state.cart,
//             items: [...state.cart.items, newItems]
//           }
//         }
//       }
//     }
//     case 'REMOVE_FROM_CART':
//       return {
//         ...state,
//         cart: state.cart.filter(item => item.id !== action.payload.id)
//       }
//     case 'SET_PRODUCTS':
//       return {
//         ...state,
//         products: action.payload
//       }
//     case 'SET_USER':
//       return {
//         ...state,
//         user: action.payload
//       }
//     default:
//       return state
//   }
// }

export const CartProvider = ({ children }) => {
  const [Cart, setCart] = useState(localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')) : [])
  const [cartCount, setCartCount] = useState(localStorage.getItem('cartCount') ? JSON.parse(localStorage.getItem('cartCount')) : 0)

  useEffect(() => {
    SaveLocal()
    setCartCount(Cart.length)
  }, [Cart])

  const AddToCart = (product, selectedSize) => {
    const existItem = Cart.findIndex(i => i.id === product.id)
    if (existItem > 0) {
      const newItems = structuredClone(Cart)
      newItems[existItem].quantity = selectedSize === 1 ? newItems[existItem].quantity + 1 : newItems[existItem].quantity + 2
      newItems[existItem].price = selectedSize === 1 ? product.price_ind : product.price_par
      setCart(newItems)
      SaveLocal()
    }
    setCart(prevState => [...prevState, { ...product, quantity: selectedSize === 1 ? 1 : 2, price: selectedSize === 1 ? product.price_ind : product.price_par }])
    SaveLocal()
    toast.success('Producto agregado al carrito')
  }

  const RemoveFromCart = product => {
    setCart(prevState => prevState.filter(item => item.id !== product.id))
    SaveLocal()
    toast.error('Producto eliminado del carrito')
  }

  const ClearCart = () => {
    setCart([])
    SaveLocal()
    toast.success('Carrito vaciado')
  }

  const SaveLocal = () => {
    if (typeof window !== 'undefined' || typeof window === 'object') {
      localStorage.setItem('cart', JSON.stringify(Cart))
      localStorage.setItem('cartCount', Cart.length)
    } else {
      return
    }
  }

  return (
    <StoreContext.Provider value={{ Cart, AddToCart, ClearCart, RemoveFromCart, cartCount }}>
      {children}
      <Toaster />
    </StoreContext.Provider>
  )
}
