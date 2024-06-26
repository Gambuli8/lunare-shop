'use client'

import useCart from '../hooks/useCart'
import { useState } from 'react'
import Link from 'next/link'
import { HiOutlineTrash } from 'react-icons/hi2'
import { Raleway } from 'next/font/google'
import MercadoPagoConfig, { Preference } from 'mercadopago'
import { redirect } from 'next/dist/server/api-utils'
import MPButton from './MPbutton/button'

const raleway = Raleway({ subsets: ['latin'] })

export default function Checkout() {
  const { Cart, RemoveFromCart } = useCart()
  const [loading, setLoading] = useState(false)
  const [preferenceId, setPreferenceId] = useState(null)
  const [selectedEnvio, setSelectedEnvio] = useState(null)
  console.log(selectedEnvio)

  const handleCheckboxChange = value => {
    setSelectedEnvio(value)
  }

  const total = Cart.reduce((acc, item) => {
    if (item.price_par === 0) {
      return acc + item.price_ind
    } else {
      return acc + item.price
    }
  }, 0)

  const formatPrice = price => {
    return new Intl.NumberFormat('es-MX', {
      style: 'currency',
      currency: 'MXN'
    }).format(price)
  }

  return (
    <div className='bg-white pt-28'>
      {/* <NavBar /> */}
      <div className={`${raleway.className} px-4 pt-4 pb-16 mx-auto max-w-7xl sm:px-6 sm:pb-24 sm:pt-8 lg:px-8 xl:px-2 xl:pt-14`}>
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
                            <Link href={`${product.href}`}>
                              <p className='text-base text-gray-900 capitalize'>{product.name}</p>
                            </Link>
                            {product.price_par === 0 ? (
                              <span className='inline-flex items-center px-2 py-1 text-xs font-medium text-gray-600 bg-gray-100 rounded-md'>Individual</span>
                            ) : product.quantity === 1 ? (
                              <span className='inline-flex items-center px-2 py-1 text-xs font-medium text-gray-600 bg-gray-100 rounded-md'>Individual</span>
                            ) : product.quantity === 2 ? (
                              <span className='inline-flex items-center px-2 py-1 text-xs font-medium text-gray-600 bg-gray-100 rounded-md'>Par</span>
                            ) : product.quantity > 2 ? (
                              <span className='inline-flex items-center px-2 py-1 text-xs font-medium text-gray-600 bg-gray-100 rounded-md'>
                                Cantidad: <p className='px-1 font-medium text-gray-700'>{product.quantity}</p>
                              </span>
                            ) : null}
                          </div>
                          <p className='text-gray-900'>{product.price_par === 0 ? formatPrice(product.price_ind) : formatPrice(product.price)}</p>
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
                              <span className='inline-flex items-center px-2 py-1 text-xs font-medium text-red-700 bg-red-100 rounded-md hover:bg-red-200 focus:outline-none focus:ring-4 focus:ring-red-500 focus:ring-offset-2 focus:ring-offset-gray-50'>
                                <HiOutlineTrash
                                  className='w-5 h-5'
                                  aria-hidden='true'
                                />
                              </span>
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            <dl className='mt-10 space-y-6 text-base font-medium text-gray-500'>
              <div className='flex justify-between'>
                <dt>Subtotal</dt>
                <dd className='text-gray-900'>{formatPrice(total) || '$0'}</dd>
              </div>
              <div className='flex justify-between'>
                <dt>
                  descuento <span className='ml-1 text-sm text-gray-400 '>(en efectivo)</span>
                </dt>
                {selectedEnvio === 'retiro' ? <dd className='text-gray-900'>{formatPrice(total * 0.15) || '$0'}</dd> : '$0'}
              </div>
              <div className='flex justify-between pt-6 text-gray-900 border-t border-gray-200'>
                <dt className='text-base'>Total</dt>
                <dd className='text-base'>{selectedEnvio === 'retiro' ? formatPrice(total * 0.85) : formatPrice(total)}</dd>
              </div>
            </dl>
          </div>

          <div className='w-full max-w-lg mx-auto '>
            <div className='mb-10'>
              <h2 className='text-lg font-medium text-gray-900'>Metodo de envio</h2>

              <div className='flex items-center justify-between gap-2 mt-6'>
                <label
                  htmlFor='retiro'
                  className='block text-sm font-medium text-gray-700'
                >
                  Retiro por Nueva Córdoba
                  <p className='text-sm'>Se puede pagar en efectivo.</p>
                </label>
                <div className='flex items-center justify-center mt-1'>
                  <p className='mx-2 text-sm'>(Gratis)</p>
                  <input
                    type='checkbox'
                    className='rounded-md'
                    name='retiro'
                    id='retiro'
                    checked={selectedEnvio === 'retiro'}
                    onChange={() => handleCheckboxChange('retiro')}
                  />
                </div>
              </div>

              <div className='flex items-center justify-between gap-2 mt-6'>
                <label
                  htmlFor='acordar-vendedor'
                  className='block text-sm font-medium text-gray-700'
                >
                  Envio a domicilio
                  <p className='text-sm'>Acordar con el vendedor.</p>
                </label>
                <div className='flex items-center justify-center mt-1'>
                  <input
                    type='checkbox'
                    className='rounded-md'
                    name='acordar-vendedor'
                    id='acordar-vendedor'
                    checked={selectedEnvio === 'acordar-vendedor'}
                    onChange={() => handleCheckboxChange('acordar-vendedor')}
                  />
                </div>
              </div>
            </div>

            <MPButton product={Cart} />
            {preferenceId && <p className='text-sm text-gray-500'>Tu ID de compra es: {preferenceId}</p>}
          </div>
        </div>
      </div>
    </div>
  )
}
