'use client'

import { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'
import { RadioGroup } from '@headlessui/react'
import { ShieldCheckIcon } from '@heroicons/react/24/outline'
import { Productos } from '../../api'
import { Italiana } from 'next/font/google'
import { CheckIcon, QuestionMarkCircleIcon, StarIcon } from '@heroicons/react/20/solid'
import Breadcrumb from '../breadCrumb'
import Loading from './loading'
import useCart from '../../hooks/useCart.jsx'

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

const productStock = [
  { cantidad: 1, description: 'Unidad' },
  { cantidad: 2, description: 'Par' }
]

const Italiano = Italiana({ subsets: ['latin'], weight: '400' })

export default function ProductId() {
  //* ESTADOS
  const [selectedSize, setSelectedSize] = useState(productStock[0])
  const { id } = useParams()
  const [products, setProducts] = useState([])
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
    fetchData()
  }, [id])

  console.log(products)
  console.log(Cart)

  // //* AGREGAR PRODUCTO AL CARRITO

  //* FORMATEAR PRECIO
  const formatPrice = price => {
    return new Intl.NumberFormat('es-MX', {
      style: 'currency',
      currency: 'MXN'
    }).format(price)
  }

  return (
    <div className='pt-16 bg-white'>
      {products.length === 0 ? (
        <div className='flex items-center justify-center h-screen'>
          <Loading />
        </div>
      ) : (
        <div className='max-w-2xl px-4 py-8 mx-auto sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-2 lg:gap-x-8 lg:px-8'>
          {/* Product details */}
          <div className='lg:max-w-lg lg:self-end'>
            <Breadcrumb products={products} />

            <div className='mt-4'>
              <h1 className='text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl'>{products.name}</h1>
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
                <p className='text-lg text-gray-900 sm:text-xl'>{productStock[0].cantidad !== selectedSize ? `${formatPrice(products.price_par)}` : productStock[0].cantidad === selectedSize ? `${formatPrice(products.price_ind)}` : ''}</p>

                <div className='pl-4 ml-4 border-l border-gray-300'>
                  <div className='flex items-center'>
                    <p className='flex items-center gap-1.5 font-sans text-base font-normal leading-relaxed text-blue-gray-900 antialiased'>
                      {products.material === 'Plata' ? (
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
                <CheckIcon
                  className='flex-shrink-0 w-5 h-5 text-green-500'
                  aria-hidden='true'
                />
                <p className='ml-2 text-sm text-gray-500'>{products.stock > 0 ? `En Stock` : 'No hay stock'}</p>
              </div>
            </section>
          </div>

          {/* Product image */}
          <div className='mt-10 lg:col-start-2 lg:row-span-2 lg:mt-0 lg:self-center'>
            <div className='overflow-hidden rounded-lg aspect-h-1 aspect-w-1'>
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
                <div className='sm:flex sm:justify-between'>
                  {/* Size selector */}
                  <RadioGroup
                    value={selectedSize}
                    onChange={setSelectedSize}
                  >
                    <RadioGroup.Label className='block text-sm font-medium text-gray-700'>Cantidad</RadioGroup.Label>
                    <div className='grid grid-cols-1 gap-4 mt-1 sm:grid-cols-2'>
                      {productStock.map(size => (
                        <RadioGroup.Option
                          as='div'
                          key={size.cantidad}
                          value={size.cantidad}
                          className={({ active }) => classNames(active ? 'ring-2 ring-[#998779]' : '', 'relative block cursor-pointer rounded-lg border border-gray-300 p-4 focus:outline-none')}
                        >
                          {({ active, checked }) => (
                            <>
                              <RadioGroup.Label
                                as='p'
                                className='text-base font-medium text-gray-900'
                              >
                                {size.cantidad}
                              </RadioGroup.Label>
                              <RadioGroup.Description
                                as='p'
                                className='mt-1 text-sm text-gray-500'
                              >
                                {size.description}
                              </RadioGroup.Description>
                              <div
                                className={classNames(active ? 'border' : 'border-2', checked ? 'border-[#998779]' : 'border-transparent', 'pointer-events-none absolute -inset-px rounded-lg')}
                                aria-hidden='true'
                              />
                            </>
                          )}
                        </RadioGroup.Option>
                      ))}
                    </div>
                  </RadioGroup>
                </div>
                <div className='mt-4'>
                  <a
                    href='#'
                    className='inline-flex text-sm text-gray-500 group hover:text-gray-700'
                  >
                    <span>Metodos de pago</span>
                    <QuestionMarkCircleIcon
                      className='flex-shrink-0 w-5 h-5 ml-2 text-gray-400 group-hover:text-gray-500'
                      aria-hidden='true'
                    />
                  </a>
                </div>
                <div className='mt-10'>
                  <button
                    type='button'
                    className='flex items-center justify-center w-full px-8 py-3 text-base font-medium text-white bg-[#998779] border border-transparent rounded-md hover:bg-[#938377] focus:outline-none focus:ring-2 focus:ring-[#938377] focus:ring-offset-2 focus:ring-offset-gray-50'
                    onClick={() => AddToCart(products, selectedSize)}
                  >
                    Agregar al carrito
                  </button>
                </div>
              </form>
            </section>
          </div>
        </div>
      )}
    </div>
  )
}
