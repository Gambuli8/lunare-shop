'use client'

import { useState, useEffect } from 'react'
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton'
import { ProductosDestacados } from '../api'
import { Raleway } from 'next/font/google'
import { ArrowRightIcon } from '@heroicons/react/20/solid'

const raleway = Raleway({ subsets: ['latin'] })

export default function ProductTrending() {
  const [loading, setLoading] = useState(false)
  const [products, setProducts] = useState([])

  useEffect(() => {
    const fechProducts = async () => {
      setLoading(true)
      const products = await ProductosDestacados.getProducts.list()
      setProducts(products)
      setLoading(false)
    }
    fechProducts()
  }, [])

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
                    <div className='relative px-10 group'>
                      <div className='w-full overflow-hidden bg-gray-200 rounded-md aspect-h-1 aspect-w-1'>
                        <img
                          src={product.image}
                          alt={product.name}
                          className='object-cover object-center w-full h-full group-hover:opacity-75'
                        />
                      </div>
                      <div className='flex flex-col mt-6'>
                        <h3 className={` ${raleway.className} mt-1 font-normal text-gray-900 uppercase`}>
                          <a href={product.href}>
                            <span className='absolute inset-0' />
                            {product.name}
                          </a>
                        </h3>
                        <div className='flex items-center justify-between w-full gap-3 mt-5'>
                          <p className='mt-1 text-gray-900'>{product.price_ind}</p>
                          <div className=' z-20 flex items-center justify-end rounded-full border-2 border-transparent hover:border-[#998779] transition-all hover:scale-110 '>
                            <a
                              href={`/productos/${product.id}`}
                              className=''
                            >
                              <ArrowRightIcon
                                className='w-6 h-6 text-gray-900'
                                aria-hidden='true'
                              />
                            </a>
                          </div>
                        </div>
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
