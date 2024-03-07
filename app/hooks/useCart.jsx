'use client'
import { useContext } from 'react'
import { StoreContext } from '../../utils/store'

export default function useCart() {
  const context = useContext(StoreContext)
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider')
  } else {
    return context
  }
}
