'use client'

import { createContext, useEffect, useState } from 'react'
import { toast, Toaster } from 'react-hot-toast'

export const StoreContext = createContext()

export const CartProvider = ({ children }) => {
  const [Cart, setCart] = useState([])
  const [cartCount, setCartCount] = useState(0)

  useEffect(() => {
    const item = localStorage.getItem('cart')
    const cart = JSON.parse(item)
    if (cart.length > 0) return setCart(cart)
  }, [])

  useEffect(() => {
    const item = localStorage.getItem('cartCount')
    const cartCount = JSON.parse(item)
    setCartCount(cartCount)
  }, [])

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(Cart))
  }, [Cart])

  useEffect(() => {
    localStorage.setItem('cartCount', JSON.stringify(Cart.length))
  }, [Cart])

  const AddToCart = (product, quantity) => {
    const existItem = Cart.findIndex(i => i.id === product.id)
    if (existItem > 0) {
      const newItems = structuredClone(Cart)
      setCart(newItems)
    } else {
      setCart(prevState => [...prevState, { ...product, quantity, price: quantity === 2 ? product.price_par : quantity === 1 ? product.price_ind : quantity > 2 ? product.price_ind * quantity : '' }])
    }
    SaveLocal()
    toast.success('Producto agregado al carrito')
  }

  const AddToCartCard = (product, selectedSize) => {
    const existItem = Cart.findIndex(i => i.id === product.id)
    if (existItem > 0) {
      const newItems = structuredClone(Cart)
      newItems[existItem].quantity + 1
      newItems[existItem].price = product.price_par
      setCart(newItems)
    } else {
      setCart(prevState => [...prevState, { ...product, quantity: 2, price: product.price_par }])
    }
    SaveLocal()
    toast.success('Producto agregado al carrito')
  }

  const RemoveFromCart = product => {
    const existItem = Cart.findIndex(i => i.id === product.id)
    if (existItem > 0) {
      const newItems = structuredClone(Cart)
      newItems[existItem].quantity -= 1
      setCart(newItems)
    }
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
    if (window !== 'undefined') {
      localStorage.setItem('cart', JSON.stringify(Cart))
      localStorage.setItem('cartCount', Cart.length)
    } else {
      return
    }
  }

  return (
    <StoreContext.Provider value={{ Cart, AddToCart, ClearCart, RemoveFromCart, cartCount, setCart, setCartCount, AddToCartCard }}>
      {children}
      <Toaster />
    </StoreContext.Provider>
  )
}
