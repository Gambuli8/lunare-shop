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
    //al cart agregarle cart.lenght > 0
    if (cart) return setCart(cart)
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
    if (existItem !== -1) {
      const newItems = structuredClone(Cart)
      {
        newItems[existItem].quantity < newItems[existItem].stock ? (newItems[existItem].quantity += quantity) : toast.error('Maximo de stock')
      }
      newItems[existItem].price = quantity === 2 ? product.price_par : quantity === 1 ? product.price_ind : quantity > 2 ? product.price_ind * quantity : ''
      setCart(newItems)
    } else {
      setCart(prevState => [...prevState, { ...product, quantity, price: quantity === 2 ? product.price_par : quantity === 1 ? product.price_ind : quantity > 2 ? product.price_ind * quantity : '' }])
      toast.success('Producto agregado al carrito')
    }
    SaveLocal()
  }

  const AddToCartCard = (product, selectedSize) => {
    const existItem = Cart.findIndex(i => i.id === product.id)
    if (existItem > 0) {
      const newItems = structuredClone(Cart)
      {
        newItems[existItem].quantity < newItems[existItem].stock ? (newItems[existItem].quantity += 1) : toast.error('Maxímo de stock')
      }
      newItems[existItem].price = product.price_par
      setCart(newItems)
      toast.success('Producto agregado al carrito')
    } else {
      setCart(prevState => [...prevState, { ...product, quantity: 2, price: product.price_par }])
      toast.success('Producto agregado al carrito')
    }
    SaveLocal()
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

  const decreaseQuantity = quantity => {
    if (quantity > 1) {
      quantity -= 1
    } else {
      RemoveFromCart(product)
    }
    SaveLocal()
  }

  const increaseQuantity = (quantity, stock) => {
    if (quantity < stock) {
      quantity += 1
    } else {
      toast.error('Maximo de stock')
    }
    SaveLocal()
  }

  return (
    <StoreContext.Provider value={{ Cart, AddToCart, ClearCart, RemoveFromCart, cartCount, setCart, setCartCount, AddToCartCard, decreaseQuantity, increaseQuantity }}>
      {children}
      <Toaster />
    </StoreContext.Provider>
  )
}
