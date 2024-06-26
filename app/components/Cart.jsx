'use client'

import React from 'react'
import { Fragment } from 'react'
import { ShoppingBagIcon, TrashIcon } from '@heroicons/react/24/outline'
import { Popover, Transition } from '@headlessui/react'
import useCart from '../hooks/useCart'
import { Raleway } from 'next/font/google'
import Link from 'next/link'
import { toast } from 'react-hot-toast'

const raleway = Raleway({ subsets: ['latin'] })
export default function Cart() {
  //* ESTADOS
  const { Cart, RemoveFromCart, decreaseQuantity, increaseQuantity } = useCart()

  const formatPrice = price => {
    return new Intl.NumberFormat('es-MX', {
      style: 'currency',
      currency: 'MXN'
    }).format(price)
  }

  const SumaTotal = Cart.reduce((acc, item) => acc + Number(item.price), 0)

  return (
    <div>
      {/* Cart */}
      <Popover className={`${raleway.className} relative flow-root text-sm lg:ml-2`}>
        <Popover.Button className='flex items-center p-2 -m-2 group'>
          <ShoppingBagIcon
            className='flex-shrink-0 w-6 h-6 text-black group-hover:text-black'
            aria-hidden='true'
          />
          <span className='ml-2 text-sm font-medium text-gray-400'>{Cart.length}</span>
        </Popover.Button>
        <Transition
          as={Fragment}
          enter='transition ease-out duration-200'
          enterFrom='opacity-0'
          enterTo='opacity-100'
          leave='transition ease-in duration-150'
          leaveFrom='opacity-100'
          leaveTo='opacity-0'
        >
          <Popover.Panel className=' absolute top-12 rounded-md ml-10 mr-3 mt-px bg-white pb-6 shadow-lg sm:px-2 lg:left-auto right-0 lg:top-full lg:-mr-1.5 lg:mt-3 w-80 lg:rounded-lg lg:ring-1 lg:ring-black lg:ring-opacity-5'>
            <h2 className='sr-only'>Shopping Cart</h2>

            <form className='max-w-2xl px-4 mx-auto'>
              <ul
                role='list'
                className='grid grid-flow-row divide-y divide-gray-200'
              >
                <div className='items-center justify-center w-full h-full overflow-auto max-h-[340px]'>
                  {Cart.length === 0 ? (
                    <li className='flex items-center justify-center py-6'>
                      <p>No hay productos en el carrito</p>
                    </li>
                  ) : null}
                  {Cart.map(
                    product => (
                      console.log(product),
                      (
                        <li
                          key={product.id}
                          className='flex items-center py-6'
                        >
                          <img
                            src={product.image}
                            alt={product.image}
                            className='flex-none w-16 h-16 border border-gray-200 rounded-md'
                          />
                          <div className='flex-auto ml-4'>
                            <h3 className='text-base font-medium text-gray-900'>
                              <p className='capitalize'>{product.name}</p>
                            </h3>
                            <p className='text-gray-500'>{product.price_par === 0 ? formatPrice(product.price_ind) : formatPrice(product.price)}</p>
                            <div className='flex items-center justify-start'>
                              <p className='text-gray-500'>Cantidad:</p>
                              <div className='flex items-center px-2'>
                                <button
                                  type='button'
                                  onClick={() => decreaseQuantity(product.quantity)}
                                  className='text-lg text-gray-500 '
                                >
                                  -
                                </button>
                                <p className='px-2 py-1 mx-2 text-sm font-medium text-gray-500 border border-gray-200 rounded'> {product.price_par === 0 ? '1' : product.quantity}</p>
                                <button
                                  type='button'
                                  onClick={() => increaseQuantity(product.quantity, product.stock)}
                                  className='text-lg text-gray-500'
                                >
                                  +
                                </button>
                              </div>
                            </div>
                          </div>
                          <div className='flex items-center justify-center'>
                            <button>
                              <TrashIcon
                                className='w-5 h-5 text-gray-400 hover:text-gray-500'
                                aria-hidden='true'
                                onClick={() => {
                                  RemoveFromCart(product)
                                }}
                              />
                            </button>
                          </div>
                        </li>
                      )
                    )
                  )}
                </div>
                <div className='flex items-center justify-between px-4 py-6'>
                  <span className='text-lg font-medium text-gray-900'>Total</span>
                  <span className='text-sm font-medium text-gray-900'>{formatPrice(SumaTotal) || '$0'}</span>
                </div>
              </ul>

              {Cart.length === 0 ? null : (
                <Link href='/checkout'>
                  <button
                    type='button'
                    className='w-full px-4 py-2 text-sm font-medium text-white bg-[#e2d0c2] border border-transparent rounded-md shadow-sm hover:bg-[#938377] focus:outline-none focus:ring-2 focus:ring-[#938377] focus:ring-offset-2 focus:ring-offset-gray-50'
                  >
                    Ir al carrito
                  </button>
                </Link>
              )}
            </form>
          </Popover.Panel>
        </Transition>
      </Popover>
    </div>
  )
}
