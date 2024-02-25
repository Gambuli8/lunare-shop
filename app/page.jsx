'use client'

import { useEffect, useState } from 'react'
import Footer from './components/footer'
import { Raleway, Italiana } from 'next/font/google'
import { ProductosDestacados } from './api'
import { ArrowRightIcon } from '@heroicons/react/20/solid'
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

const collections = [
  {
    name: 'Aros',
    description: 'Aros de plata y oro',
    imageSrc: 'https://tailwindui.com/img/ecommerce-images/home-page-02-edition-01.jpg',
    imageAlt: 'Desk with leather desk pad, walnut desk organizer, wireless keyboard and mouse, and porcelain mug.',
    href: '#'
  },
  {
    name: 'pulseras',
    description: 'Pulseras de plata',
    imageSrc: 'https://tailwindui.com/img/ecommerce-images/home-page-02-edition-02.jpg',
    imageAlt: 'Wood table with porcelain mug, leather journal, brass pen, leather key ring, and a houseplant.',
    href: '#'
  },
  {
    name: 'Dijes',
    description: 'Dijes de plata',
    imageSrc: 'https://tailwindui.com/img/ecommerce-images/home-page-02-edition-03.jpg',
    imageAlt: 'Collection of four insulated travel bottles on wooden shelf.',
    href: '#'
  },
  {
    name: 'Cadenas',
    description: 'Cadenas de plata',
    imageSrc: 'https://tailwindui.com/img/ecommerce-images/home-page-02-edition-03.jpg',
    imageAlt: 'Collection of four insulated travel bottles on wooden shelf.',
    href: '#'
  }
]

const raleway = Raleway({ subsets: ['latin'] })
const italiano = Italiana({ subsets: ['latin'], weight: '400' })

export default function Home() {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const fechProducts = async () => {
      setLoading(true)
      const products = await ProductosDestacados.getProducts.list()
      setProducts(products)
      setLoading(false)
    }
    fechProducts()
  }, [])

  console.log(products)

  return (
    <div className='bg-white'>
      <main>
        {/* Hero */}
        <div className='flex flex-col border-b border-gray-200 lg:border-0'>
          <div className='relative'>
            <div
              aria-hidden='true'
              className='absolute hidden w-1/2 h-full bg-[#F4E8D8] lg:block'
            />
            <div className='relative bg-[#F4E8D8] lg:bg-transparent'>
              <div className='px-4 mx-auto max-w-7xl sm:px-6 lg:grid lg:grid-cols-2 lg:px-8'>
                <div className='max-w-2xl py-24 mx-auto lg:max-w-none lg:py-64'>
                  <div className='lg:pr-16'>
                    <h1 className={`text-4xl ${italiano.className} tracking-tight text-gray-900 sm:text-5xl xl:text-7xl`}>Lunare Jewelry</h1>
                    <p className={` ${raleway.className} mt-2 md:mt-4 text-sm md:text-lg text-gray-600`}>Cada joya, una expresión de tu estilo.</p>
                    <div className='mt-6'>
                      <a
                        href='/productos'
                        className='inline-block px-8 py-3 font-medium text-white bg-[#998779] border border-transparent rounded-md hover:bg-[#938377]'
                      >
                        Comprar
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className='w-full h-48 sm:h-64 lg:absolute lg:right-0 lg:top-0 lg:h-full lg:w-1/2'>
              <img
                src='https://res.cloudinary.com/ds7hhoq17/image/upload/v1708557751/Logo/fondo-aritos1_e3s5jc.jpg'
                alt=''
                className='object-cover object-center w-full h-full'
              />
            </div>
          </div>
        </div>

        {/* Trending products */}
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

        {/* Collections */}
        <section
          aria-labelledby='collections-heading'
          className='bg-[#F4E8D8]'
        >
          <div className='px-4 mx-auto max-w-7xl sm:px-6 lg:px-8'>
            <div className='max-w-2xl py-16 mx-auto sm:py-24 lg:max-w-none lg:py-32'>
              <h2
                id='collections-heading'
                className={` ${raleway.className} text-2xl font-bold text-gray-900`}
              >
                Categorias
              </h2>

              <div className='mt-6 space-y-12 lg:grid lg:grid-cols-4 lg:gap-x-6 lg:space-y-0'>
                {collections.map(collection => (
                  <div
                    key={collection.name}
                    className='relative group'
                  >
                    <div className='relative w-full overflow-hidden bg-white rounded-lg h-80 sm:aspect-h-1 sm:aspect-w-2 lg:aspect-h-1 lg:aspect-w-1 group-hover:opacity-75 sm:h-64'>
                      <img
                        src={collection.imageSrc}
                        alt={collection.imageAlt}
                        className='object-cover object-center w-full h-full'
                      />
                    </div>
                    <h3 className='mt-6 text-sm text-gray-500'>
                      <a href={collection.href}>
                        <span className='absolute inset-0' />
                        {collection.name}
                      </a>
                    </h3>
                    <p className='text-base font-semibold text-gray-900'>{collection.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Sale and testimonials */}
        <div className='relative overflow-hidden'>
          {/* Decorative background image and gradient */}
          <div
            aria-hidden='true'
            className='absolute inset-0'
          >
            <div className='absolute inset-0 mx-auto overflow-hidden max-w-7xl xl:px-8'>
              <img
                src='https://res.cloudinary.com/ds7hhoq17/image/upload/v1708557793/Logo/image-descuento_s66jwt.jpg'
                alt=''
                className='object-cover object-center w-full h-full'
              />
            </div>
            <div className='absolute inset-0 bg-white bg-opacity-75' />
            <div className='absolute inset-0 bg-gradient-to-t ' />
          </div>

          {/* Sale */}
          <section
            aria-labelledby='sale-heading'
            className='relative flex flex-col items-center px-4 pt-32 mx-auto text-center max-w-7xl sm:px-6 lg:px-8'
          >
            <div className='max-w-2xl mx-auto lg:max-w-none'>
              <h2
                id='sale-heading'
                className='text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl lg:text-6xl'
              >
                25% off pagando en efectivo
              </h2>
              <p className='max-w-xl mx-auto my-4 text-xl text-gray-600'>Most of our products are limited releases that won t come back. Get your favorite items while they re in stock.</p>
            </div>
          </section>
        </div>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  )
}
