'use client'

import { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'
import { RadioGroup } from '@headlessui/react'
import { Productos } from '../../apiLocal'
import { Italiana, Raleway } from 'next/font/google'
import { CheckIcon, QuestionMarkCircleIcon, XMarkIcon, ExclamationCircleIcon } from '@heroicons/react/20/solid'
import Breadcrumb from '../breadCrumb'
import Loading from './loading'
import useCart from '../../hooks/useCart.jsx'
import toast from 'react-hot-toast'
import Link from 'next/link'
import { preload } from 'react-dom'

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

const productStock = [
  { cantidad: 1, description: 'Unidad' },
  { cantidad: 2, description: 'Par' }
]

const Italiano = Italiana({ subsets: ['latin'], weight: '400' })
const raleway = Raleway({ subsets: ['latin'] })

export default function ProductId() {
  //* ESTADOS
  const { id, product } = useParams()
  const [products, setProducts] = useState([])
  const [quantity, setQuantity] = useState(1)
  const { AddToCart, Cart } = useCart()

  //* LLAMADAS A LA API
  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await Productos.getProduct.list(id)
        setProducts(result)
      } catch (error) {
        console.log(error.message)
      }
    }
    preload(fetchData())
  }, [id])

  // //* AGREGAR PRODUCTO AL CARRITO

  //* FORMATEAR PRECIO
  const formatPrice = price => {
    return new Intl.NumberFormat('es-MX', {
      style: 'currency',
      currency: 'MXN'
    }).format(price)
  }

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1)
    }
  }

  const increaseQuantity = () => {
    if (quantity < products.stock) {
      setQuantity(quantity + 1)
    }
    if (quantity === products.stock) {
      toast.error('Maxímo de stock')
    }
  }

  const Addtocart = () => {
    AddToCart(products, quantity)

    // setQuantity(1)
  }

  return (
    <div className={` ${raleway.className} bg-white pt-28`}>
      {products.length === 0 ? (
        <div className='flex items-center justify-center h-screen'>
          <Loading />
        </div>
      ) : (
        <div className='max-w-2xl px-4 pt-4 mx-auto sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-2 lg:gap-x-8 lg:px-8'>
          {/* Product details */}
          <div className='lg:max-w-lg lg:self-end'>
            <Breadcrumb products={products} />

            <div className='mt-4'>
              <h1 className='text-3xl font-medium tracking-tight text-gray-900 capitalize sm:text-4xl'>{products.name}</h1>
            </div>

            <section
              aria-labelledby='information-heading'
              className='mt-4'
            >
              <h2
                id='information-heading'
                className='sr-only'
              >
                Product information
              </h2>

              <div className='flex items-center'>
                {products.stock >= 1 ? (
                  <p className='text-lg text-gray-900 sm:text-xl'>
                    {quantity === 2 ? `${formatPrice(products.price_par)}` : quantity === 1 ? `${formatPrice(products.price_ind)}` : quantity > 2 ? `${formatPrice(products.price_ind * quantity)}` : ''}
                  </p>
                ) : (
                  <p>-</p>
                )}

                <div className='pl-4 ml-4 border-l border-gray-300'>
                  <div className='flex items-center'>
                    <p className='flex items-center gap-1.5 font-sans text-base font-normal leading-relaxed text-blue-gray-900 antialiased'>
                      {products.material === 'silver' ? (
                        <span className='inline-flex items-center px-2 py-1 text-xs font-medium text-gray-400 rounded-md bg-gray-400/10 ring-1 ring-inset ring-gray-400/20'>{products.material}</span>
                      ) : (
                        <span className='inline-flex items-center px-2 py-1 text-xs font-medium text-yellow-500 rounded-md bg-yellow-400/10 ring-1 ring-inset ring-yellow-400/20'>{products.material}</span>
                      )}
                    </p>
                  </div>
                </div>
              </div>

              <div className='mt-4 space-y-6'>
                <p className='text-base text-gray-500'>{products.description}</p>
              </div>

              <div className='flex items-center mt-6'>
                {products.stock ? (
                  <CheckIcon
                    className='flex-shrink-0 w-5 h-5 text-green-500'
                    aria-hidden='true'
                  />
                ) : (
                  <XMarkIcon
                    className='flex-shrink-0 w-6 h-6 text-red-500'
                    aria-hidden='true'
                  />
                )}
                <p className='ml-2 text-sm text-gray-500'>{products.stock > 0 ? `En Stock` : 'No hay stock'}</p>
              </div>
              {quantity === 1 ? (
                <div className='flex my-2'>
                  <ExclamationCircleIcon className='w-5 h-5 text-red-600' />
                  <p className='ml-2 text-sm text-gray-500 '>Precio por Unidad</p>
                </div>
              ) : (
                <div className='flex my-2'>
                  <ExclamationCircleIcon className='w-5 h-5 text-red-600' />
                  <p className='ml-2 text-sm text-gray-500 '>Precio por par</p>
                </div>
              )}
            </section>
          </div>

          {/* Product image */}
          <div className='mt-10 lg:col-start-2 lg:row-span-2 lg:mt-0 lg:self-center'>
            <div className='p-20 overflow-hidden rounded-lg aspect-h-1 aspect-w-1'>
              <img
                src={products.image}
                alt={products.name}
                className='object-cover object-center w-full h-full'
              />
            </div>
          </div>

          {/* Product form */}
          <div className='mt-10 lg:col-start-1 lg:row-start-2 lg:max-w-lg lg:self-start'>
            <section aria-labelledby='options-heading'>
              <h2
                id='options-heading'
                className='sr-only'
              >
                Product options
              </h2>
              <form>
                {/* select counter */}
                {products.stock ? (
                  <div className='flex flex-row items-center gap-4 p-2 rounded-md bg-[#998779] w-28 h-14 justify-center'>
                    <button
                      type='button'
                      onClick={() => decreaseQuantity()}
                      className='w-10 h-10 text-xl rounded-sm bg-transparent flex items-center justify-center hover:bg-[#F4E8D8] hover:opacity-75'
                    >
                      -
                    </button>
                    <input
                      type='button'
                      value={quantity}
                      onChange={e => setQuantity(parseInt(e.target.value))}
                      min={1}
                      max={products.stock}
                      className='flex items-center justify-center text-xl font-medium'
                    />
                    <button
                      type='button'
                      onClick={increaseQuantity}
                      className='w-10 h-10 text-xl rounded-sm bg-transparent flex items-center justify-center hover:bg-[#F4E8D8] hover:opacity-75'
                    >
                      +
                    </button>
                  </div>
                ) : null}

                <div className='mt-4'>
                  <Link
                    href='#'
                    className='inline-flex text-sm text-gray-500 group hover:text-gray-700'
                  >
                    <span>Metodos de pago</span>
                    <QuestionMarkCircleIcon
                      className='flex-shrink-0 w-5 h-5 ml-2 text-gray-400 group-hover:text-gray-500'
                      aria-hidden='true'
                    />
                  </Link>
                </div>
                {products.stock ? (
                  <div className='mt-10'>
                    <button
                      type='button'
                      className='flex items-center justify-center w-full px-8 py-3 text-base font-medium text-white bg-[#998779] border border-transparent rounded-md hover:bg-[#938377] focus:outline-none focus:ring-2 focus:ring-[#938377] focus:ring-offset-2 focus:ring-offset-gray-50'
                      onClick={() => Addtocart()}
                    >
                      Agregar al carrito
                    </button>
                  </div>
                ) : null}
              </form>
            </section>
          </div>
        </div>
      )}
    </div>
  )
}
