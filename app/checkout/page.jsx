'use client'

import useCart from '../hooks/useCart'
import { useState } from 'react'
import { MercadoPagoConfig, Preference } from 'mercadopago'
import { initMercadoPago, Wallet } from '@mercadopago/sdk-react'
import axios from 'axios'

export default function Checkout() {
  const { Cart, RemoveFromCart } = useCart()
  const [loading, setLoading] = useState(false)
  const [preferenceId, setPreferenceId] = useState(null)
  initMercadoPago(process.env.MP_PUBLIC_KEY, {
    locale: 'es-AR',
    client: {
      sandbox: true
    }
  })

  const PreferenceCreate = async () => {
    try {
      const response = await axios.post('http://localhost:3000/checkout', {
        items: Cart.map(product => ({
          id: product.id,
          title: product.name,
          description: product.description,
          quantity: product.quantity,
          currency_id: 'MXN',
          unit_price: product.price
        })),
        back_urls: {
          success: 'http://localhost:3000/success',
          failure: 'http://localhost:3000/failure',
          pending: 'http://localhost:3000/pending'
        },
        auto_return: 'approved',
        notication_url: 'http://localhost:3000/webhook'
      })
      const { id } = response.data
      return id
    } catch (error) {
      console.error(error)
    }
  }

  const handlerPreference = async () => {
    const preferenceId = await PreferenceCreate()
    if (preferenceId) {
      setPreferenceId(preferenceId)
    }
  }

  const handleMercadoPago = async () => {
    const response = await fetch('/api/checkout', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        preferenceId: preference.id
      })
    })
    const data = await response.json()
    console.log(data)
  }

  const total = Cart.reduce((acc, item) => acc + Number(item.price), 0)

  const formatPrice = price => {
    return new Intl.NumberFormat('es-MX', {
      style: 'currency',
      currency: 'MXN'
    }).format(price)
  }

  return (
    <div className='bg-white pt-28'>
      {/* <NavBar /> */}
      <div className='px-4 pt-4 pb-16 mx-auto max-w-7xl sm:px-6 sm:pb-24 sm:pt-8 lg:px-8 xl:px-2 xl:pt-14'>
        <h1 className='sr-only'>Checkout</h1>

        <div className='grid max-w-lg grid-cols-1 mx-auto gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-2'>
          <div className='w-full max-w-lg mx-auto'>
            <h2 className='sr-only'>Order summary</h2>

            <div className='flow-root'>
              <ul
                role='list'
                className='-my-6 divide-y divide-gray-200'
              >
                {Cart.length === 0 && (
                  <li className='flex items-center justify-center py-10'>
                    <p className='text-sm font-medium text-gray-900'>No hay productos en el carrito</p>
                  </li>
                )}
                {Cart.map(product => (
                  <li
                    key={product.id}
                    className='flex py-6 space-x-6'
                  >
                    <img
                      src={product.image}
                      alt={product.image}
                      className='flex-none object-cover object-center w-24 h-24 bg-gray-100 rounded-md'
                    />
                    <div className='flex-auto'>
                      <div className='space-y-1 sm:flex sm:items-start sm:justify-between sm:space-x-6'>
                        <div className='flex-auto space-y-1 text-sm font-medium'>
                          <div className='flex items-center justify-start gap-5 text-gray-900 '>
                            <a href={product.href}>{product.name}</a>
                            {product.quantity === 1 ? (
                              <span className='inline-flex items-center px-2 py-1 text-xs font-medium text-gray-600 bg-gray-100 rounded-md'>Individual</span>
                            ) : product.quantity === 2 ? (
                              <span className='inline-flex items-center px-2 py-1 text-xs font-medium text-gray-600 bg-gray-100 rounded-md'>Par</span>
                            ) : product.quantity > 2 ? (
                              <span className='inline-flex items-center px-2 py-1 text-xs font-medium text-gray-600 bg-gray-100 rounded-md'>
                                Cantidad: <p className='px-1 font-medium text-gray-700'>{product.quantity}</p>
                              </span>
                            ) : null}
                          </div>
                          <p className='text-gray-900'>{formatPrice(product.price)}</p>
                          <p className='hidden text-gray-500 sm:block'>{product.description}</p>
                          <p className='hidden text-gray-500 sm:block'>{product.material}</p>
                        </div>
                        <div className='flex flex-none space-x-4'>
                          <div className='flex pl-4 border-l border-gray-300'>
                            <button
                              type='button'
                              className='text-sm font-medium '
                              onClick={() => RemoveFromCart(product)}
                            >
                              <span className='inline-flex items-center px-2 py-1 text-xs font-medium text-red-700 bg-red-100 rounded-md'>Quitar</span>
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            <dl className='mt-10 space-y-6 text-sm font-medium text-gray-500'>
              <div className='flex justify-between'>
                <dt>Subtotal</dt>
                <dd className='text-gray-900'>{formatPrice(total) || '$0'}</dd>
              </div>
              <div className='flex justify-between'>
                <dt>descuento</dt>
                <dd className='text-gray-900'>$0</dd>
              </div>
              <div className='flex justify-between pt-6 text-gray-900 border-t border-gray-200'>
                <dt className='text-base'>Total</dt>
                <dd className='text-base'>{formatPrice(total) || '$0'}</dd>
              </div>
            </dl>
          </div>

          <div className='w-full max-w-lg mx-auto'>
            <button
              type='button'
              onClick={handlerPreference}
              className='flex items-center justify-center w-full py-2 text-white bg-blue-500 border border-transparent rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-700 focus:ring-offset-2'
            >
              <span className='sr-only'>Pay with Mercado pago</span>
              Comprar con Mercado pago
            </button>
            {preferenceId && <Wallet preferenceId={preferenceId} />}

            <div className='relative mt-8'>
              <div
                className='absolute inset-0 flex items-center'
                aria-hidden='true'
              >
                <div className='w-full border-t border-gray-200' />
              </div>
              <div className='relative flex justify-center'>
                <span className='px-4 text-sm font-medium text-gray-500 bg-white'>o</span>
              </div>
            </div>

            <form className='mt-6'>
              <h2 className='text-lg font-medium text-gray-900'>pagar en efectivo</h2>
              <p className='text-sm'>Acordar con el vendedor el retiro y el pago.</p>

              <div className='mt-6'>
                <label
                  htmlFor='email-address'
                  className='block text-sm font-medium text-gray-700'
                >
                  Email address
                </label>
                <div className='mt-1'>
                  <input
                    type='email'
                    id='email-address'
                    name='email-address'
                    autoComplete='email'
                    className='block w-full px-2 border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm'
                  />
                </div>
              </div>

              <div className='mt-6'>
                <label
                  htmlFor='phone'
                  className='block text-sm font-medium text-gray-700'
                >
                  Phone number
                </label>
                <div className='mt-1'>
                  <input
                    type='text'
                    name='phone'
                    id='phone'
                    autoComplete='tel'
                    className='block w-full px-2 border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm'
                  />
                </div>
              </div>

              <button
                type='submit'
                disabled
                className='w-full px-4 py-2 mt-6 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:bg-gray-100 disabled:text-gray-500'
              >
                Continue
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
