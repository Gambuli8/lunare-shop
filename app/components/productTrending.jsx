'use client'

import { useState, useEffect } from 'react'
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton'
import { ProductosDestacados } from '../apiLocal'
import { Raleway } from 'next/font/google'
import { ShoppingCartIcon } from '@heroicons/react/20/solid'
import Link from 'next/link'
import useCart from '../hooks/useCart'
import Image from 'next/image'

const raleway = Raleway({ subsets: ['latin'] })

export default function ProductTrending() {
  const [loading, setLoading] = useState(false)
  const [products, setProducts] = useState([])
  const { AddToCartCard } = useCart()

  useEffect(() => {
    const fechProducts = async () => {
      setLoading(true)
      const products = await ProductosDestacados.getProducts.list()
      setProducts(products)
      console.log(products);
      setLoading(false)
    }
    fechProducts()
  }, [])

  //* FORMATEAR PRECIO
  const formatPrice = price => {
    return new Intl.NumberFormat('es-MX', {
      style: 'currency',
      currency: 'MXN'
    }).format(price)
  }

  return (
    <section
      aria-labelledby='trending-heading'
      className='bg-white'
    >
      <div className='py-16 sm:py-24 lg:mx-auto lg:max-w-7xl lg:px-8 lg:py-32'>
        <div className='flex items-center justify-between px-4 sm:px-6 lg:px-0'>
          <h2
            id='trending-heading'
            className={` ${raleway.className} uppercase text-2xl font-semibold tracking-tight text-gray-900`}
          >
            Productos destacados
          </h2>
        </div>

        <div className='relative mt-8'>
          <div className='relative w-full overflow-x-auto'>
            <ul
              role='list'
              className='inline-flex items-center justify-center mx-4 mb-5 space-x-8 sm:mx-6 lg:mx-0 lg:grid lg:grid-cols-3 lg:gap-x-8 lg:space-x-0'
            >
              {loading ? (
                <SkeletonTheme
                  color='#E5E7EB'
                  highlightColor='#f2f2f2'
                  baseColor='#E5E7EB'
                >
                  <Skeleton
                    style={{ width: '200px', height: '250px', borderRadius: '1rem', margin: '1rem', display: 'inline-flex' }}
                    className='lg:w-[300px] bg-gray-400 md:h-[300px] justify-center items-center flex-col my-3 shadow-sm'
                  />
                  <Skeleton
                    style={{ width: '200px', height: '250px', borderRadius: '1rem', margin: '1rem', display: 'inline-flex' }}
                    className='lg:w-[300px] bg-gray-400 md:h-[300px] justify-center items-center flex-col my-3 shadow-sm'
                  />
                  <Skeleton
                    style={{ width: '200px', height: '250px', borderRadius: '1rem', margin: '1rem', display: 'inline-flex' }}
                    className='lg:w-[300px] bg-gray-400 md:h-[300px] justify-center items-center flex-col my-3 shadow-sm'
                  />
                </SkeletonTheme>
              ) : (
                products.map(product => (
                  <li
                    key={product.id}
                    className='inline-flex flex-col w-auto h-auto text-center lg:w-72'
                  >
                    <div className='relative px-10'>
                        <div className='w-full bg-gray-200 rounded-md'>
                      <Link href={`/productos/${product.realid}`}>
                          <Image
                            src={product.image}
                            width={300}
                            height={300}
                            alt={product.name}
                            className='object-cover object-center w-full h-full cursor-pointer hover:transition-all hover:scale-110 hover:duration-300'
                          />
                        </Link>
                        </div>
                      <div className='flex flex-col mt-6'>
                        <h3 className={` ${raleway.className} mt-1 font-normal text-gray-900 uppercase`}>
                          {/* <span className='absolute inset-0' /> */}
                          {product.name}
                        </h3>
                        {product.stock ? (
                          <div className='flex items-center justify-between gap-3 mt-5 '>
                            <p className='mt-1 text-gray-900'>{formatPrice(product.price_par)}</p>
                            <button
                              onClick={() => AddToCartCard(product)}
                              className='z-10 flex items-center justify-end transition-all border-2 border-transparent rounded-full hover:scale-110'
                            >
                              <ShoppingCartIcon className='w-6 h-6 text-[#938377]' />
                            </button>
                          </div>
                        ) : (
                          <div className='flex items-center justify-between w-full gap-3 mt-5 group'>
                            <div className='flex items-center w-full'>
                              <span className='inline-flex items-center px-2 py-1 text-xs font-medium text-red-400 rounded-md bg-red-400/10 ring-1 ring-inset ring-red-400/20'>Sin Stock</span>
                            </div>
                            <button className='flex items-center justify-end transition-all border-2 border-transparent rounded-full '>
                              <ShoppingCartIcon className='w-6 h-6 text-slate-300' />
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  </li>
                ))
              )}
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}
