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
    <div className='bg-white'>
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
                          <h3 className='text-gray-900'>
                            <a href={product.href}>{product.name}</a>
                          </h3>
                          <p className='text-gray-900'>{formatPrice(product.price)}</p>
                          <p className='hidden text-gray-500 sm:block'>{product.description}</p>
                          <p className='hidden text-gray-500 sm:block'>{product.material}</p>
                        </div>
                        <div className='flex flex-none space-x-4'>
                          <div className='flex pl-4 border-l border-gray-300'>
                            <button
                              type='button'
                              className='text-sm font-medium text-indigo-600 hover:text-indigo-500'
                              onClick={() => RemoveFromCart(product)}
                            >
                              Remove
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
              className='flex items-center justify-center w-full py-2 text-white bg-black border border-transparent rounded-md hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:ring-offset-2'
            >
              <span className='sr-only'>Pay with Mercado pago</span>
              <svg
                className='w-auto h-5'
                fill='currentColor'
                viewBox='0 0 50 20'
              >
                <path d='M9.536 2.579c-.571.675-1.485 1.208-2.4 1.132-.113-.914.334-1.884.858-2.484C8.565.533 9.564.038 10.374 0c.095.951-.276 1.884-.838 2.579zm.829 1.313c-1.324-.077-2.457.751-3.085.751-.638 0-1.6-.713-2.647-.694-1.362.019-2.628.79-3.323 2.017-1.429 2.455-.372 6.09 1.009 8.087.676.99 1.485 2.075 2.552 2.036 1.009-.038 1.409-.656 2.628-.656 1.228 0 1.58.656 2.647.637 1.104-.019 1.8-.99 2.475-1.979.771-1.122 1.086-2.217 1.105-2.274-.02-.019-2.133-.828-2.152-3.263-.02-2.036 1.666-3.007 1.742-3.064-.952-1.408-2.437-1.56-2.951-1.598zm7.645-2.76v14.834h2.305v-5.072h3.19c2.913 0 4.96-1.998 4.96-4.89 0-2.893-2.01-4.872-4.885-4.872h-5.57zm2.305 1.941h2.656c2 0 3.142 1.066 3.142 2.94 0 1.875-1.142 2.95-3.151 2.95h-2.647v-5.89zM32.673 16.08c1.448 0 2.79-.733 3.4-1.893h.047v1.779h2.133V8.582c0-2.14-1.714-3.52-4.351-3.52-2.447 0-4.256 1.399-4.323 3.32h2.076c.171-.913 1.018-1.512 2.18-1.512 1.41 0 2.2.656 2.2 1.865v.818l-2.876.171c-2.675.162-4.123 1.256-4.123 3.159 0 1.922 1.495 3.197 3.637 3.197zm.62-1.76c-1.229 0-2.01-.59-2.01-1.494 0-.933.752-1.475 2.19-1.56l2.562-.162v.837c0 1.39-1.181 2.379-2.743 2.379zM41.1 20c2.247 0 3.304-.856 4.227-3.454l4.047-11.341h-2.342l-2.714 8.763h-.047l-2.714-8.763h-2.409l3.904 10.799-.21.656c-.352 1.114-.923 1.542-1.942 1.542-.18 0-.533-.02-.676-.038v1.779c.133.038.705.057.876.057z' />
              </svg>
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
                <span className='px-4 text-sm font-medium text-gray-500 bg-white'>or</span>
              </div>
            </div>

            <form className='mt-6'>
              <h2 className='text-lg font-medium text-gray-900'>pagar en efectivo</h2>
              <p className='text-sm'>Quedar con el vendedor el retiro y el pago.</p>

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
