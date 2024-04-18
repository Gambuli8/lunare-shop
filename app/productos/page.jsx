'use client'
import { useEffect, useState } from 'react'
import { ShoppingCartIcon } from '@heroicons/react/20/solid'
import { Productos } from '../api'
import { Raleway } from 'next/font/google'
import Image from 'next/image'
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import Link from 'next/link'
import Filters from '../components/Filters'
import useCart from '../hooks/useCart'

const raleway = Raleway({ subsets: ['latin'] })

export default function Products() {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(false)
  const { AddToCartCard } = useCart()
  const [filtered, setFiltered] = useState({
    category: 'All',
    sort: 'All'
  })

  const filterProducts = Products => {
    return Products.filter(product => {
      return filtered.category === 'All' || product.material === filtered.category
    })
  }

  const SortAll = (a, b) => {
    if (filtered.sort === 'asc') {
      return a.price_ind - b.price_ind
    } else if (filtered.sort === 'desc') {
      return b.price_ind - a.price_ind
    } else if (filtered.sort === 'A - Z') {
      return a.name.localeCompare(b.name)
    } else if (filtered.sort === 'Z - A') {
      return b.name.localeCompare(a.name)
    }
  }

  const filteredProducts = filterProducts(products).sort(SortAll)

  //* FORMATEAR PRECIO
  const formatPrice = price => {
    return new Intl.NumberFormat('es-MX', {
      style: 'currency',
      currency: 'MXN'
    }).format(price)
  }

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      const result = await Productos.getProducts.list()
      console.log(result)
      setProducts(result)
      setLoading(false)
    }
    fetchData()
  }, [])

  return (
    <div className='bg-[#F4E8D8] pt-24'>
      <main className='pb-24'>
        <div className='relative m-0 mb-5 overflow-hidden'>
          <div
            aria-hidden='true'
            className='absolute inset-0'
          >
            <div className='absolute inset-0 mx-auto overflow-hidden max-w-7xl xl:px-8'>
              <Image
                src='https://res.cloudinary.com/ds7hhoq17/image/upload/v1708726984/Logo/Imagen_de_WhatsApp_2024-02-22_a_las_22.28.07_82c95ffa_subwee.jpg'
                alt=''
                className='object-cover w-full h-full bg-fixed bg-cover '
                layout='fill'
                quality={100}
                priority
              />
            </div>
            <div className='absolute inset-0 bg-white bg-opacity-35' />
            <div className='absolute inset-0 bg-gradient-to-t ' />
          </div>

          <div className='relative w-full h-full px-4 py-16 text-center sm:px-6 lg:px-8'>
            <h1 className={` ${raleway.className} text-6xl font-bold tracking-tight text-gray-900`}>Tienda</h1>
            <p className='max-w-xl mx-auto mt-4 text-base font-medium text-gray-600'>¡Descubre la elegancia en cada detalle y encuentra la pieza perfecta que refleje tu estilo único!</p>
          </div>
        </div>

        {/* Filters */}
        <div className='px-3'>
          <Filters setFiltered={setFiltered} />
        </div>

        {/* Product grid */}
        <section
          aria-labelledby='products-heading'
          className='pb-8 mx-auto overflow-hidden max-w-7xl sm:px-6 lg:px-8'
        >
          <h2
            id='products-heading'
            className='sr-only'
          >
            Products
          </h2>

          <div className='grid items-center grid-cols-2 gap-3 px-3 -mx-px border-l border-gray-200 place-content-center sm:mx-0 md:grid-cols-2 md:gap-5 lg:grid-cols-3 md:px-10'>
            {loading ? (
              <SkeletonTheme
                color='#E5E7EB'
                highlightColor='#F4F4F5'
              >
                <Skeleton
                  direction='row'
                  className='lg:w-[300px] h-[200px] md:h-[300px] flex flex-wrap justify-center items-center flex-col rounded-lg my-3 shadow-sm'
                />
                <Skeleton
                  direction='row'
                  className='lg:w-[300px] h-[200px] md:h-[300px] flex flex-wrap justify-center items-center flex-col rounded-lg my-3 shadow-sm'
                />
                <Skeleton
                  direction='row'
                  className='lg:w-[300px] h-[200px] md:h-[300px] flex flex-wrap justify-center items-center flex-col rounded-lg my-3 shadow-sm'
                />
                <Skeleton
                  direction='row'
                  className='lg:w-[300px] h-[200px] md:h-[300px] flex flex-wrap justify-center items-center flex-col rounded-lg my-3 shadow-sm'
                />
                <Skeleton
                  direction='row'
                  className='lg:w-[300px] h-[200px] md:h-[300px] flex flex-wrap justify-center items-center flex-col rounded-lg my-3 shadow-sm'
                />
                <Skeleton
                  direction='row'
                  className='lg:w-[300px] h-[200px] md:h-[300px] flex flex-wrap justify-center items-center flex-col rounded-lg my-3 shadow-sm'
                />
              </SkeletonTheme>
            ) : (
              filteredProducts.map(Item => (
                <div
                  key={Item.id}
                  className='relative flex w-full max-w-[17rem] md:max-h-[35rem] h-full flex-col rounded-xl bg-white bg-clip-border  text-gray-700 shadow-lg'
                >
                  <Link
                    href={`/productos/${Item.id}`}
                    className=''
                  >
                    <div className='relative overflow-hidden text-white md:max-h-60 max-h-40 rounded-xl'>
                      <img
                        src={Item.image}
                        alt={Item.name}
                        className='object-contain w-full h-full'
                      />
                      <div className='absolute inset-0 w-full h-full to-bg-black-10 bg-gradient-to-tr from-transparent via-transparent to-black/10'></div>
                    </div>
                  </Link>
                  <div className='p-3 px-2 md:px-4'>
                    <div className='flex items-center justify-between mb-1'>
                      <h5 className={` ${raleway.className} uppercase block font-sans md:text-base text-sm py-2  antialiased font-normal leading-snug tracking-normal text-blue-gray-900`}>{Item.name}</h5>
                      {Item.material === 'Plata' ? (
                        <span className='inline-flex items-center px-2 py-1 text-xs font-medium text-gray-400 rounded-md bg-gray-400/10 ring-1 ring-inset ring-gray-400/20'>{Item.material}</span>
                      ) : (
                        <span className='inline-flex items-center px-2 py-1 text-xs font-medium text-yellow-500 rounded-md bg-yellow-400/10 ring-1 ring-inset ring-yellow-400/20'>{Item.material}</span>
                      )}
                    </div>
                    <div className='flex items-center justify-between w-full gap-3 mt-5 group'>
                      <div className='flex items-center w-full'>
                        <span className='font-sans text-base font-normal leading-relaxed text-gray-900 md:text-lg'>{formatPrice(Item.price_par)}</span>
                      </div>
                      <button
                        onClick={() => AddToCartCard(Item)}
                        className='flex items-center justify-end transition-all border-2 border-transparent rounded-full hover:scale-110'
                      >
                        <ShoppingCartIcon className='w-6 h-6 text-[#938377]' />
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </section>

        {/* Pagination */}
        <nav
          aria-label='Pagination'
          className='flex justify-between px-4 mx-auto mt-6 text-sm font-medium text-gray-700 max-w-7xl sm:px-6 lg:px-8'
        >
          <div className='flex-1 min-w-0'>
            <a
              href='#'
              className='inline-flex items-center h-10 px-4 bg-white border border-gray-300 rounded-md hover:bg-gray-100 focus:border-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:ring-opacity-25 focus:ring-offset-1 focus:ring-offset-indigo-600'
            >
              Anterior
            </a>
          </div>
          <div className='hidden space-x-2 sm:flex'>
            {/* Current: "border-indigo-600 ring-1 ring-indigo-600", Default: "border-gray-300" */}
            <a
              href='#'
              className='inline-flex items-center h-10 px-4 bg-white border border-gray-300 rounded-md hover:bg-gray-100 focus:border-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:ring-opacity-25 focus:ring-offset-1 focus:ring-offset-indigo-600'
            >
              1
            </a>
            <a
              href='#'
              className='inline-flex items-center h-10 px-4 bg-white border border-gray-300 rounded-md hover:bg-gray-100 focus:border-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:ring-opacity-25 focus:ring-offset-1 focus:ring-offset-indigo-600'
            >
              2
            </a>
            <a
              href='#'
              className='inline-flex items-center h-10 px-4 bg-white border border-indigo-600 rounded-md ring-1 ring-indigo-600 hover:bg-gray-100 focus:border-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:ring-opacity-25 focus:ring-offset-1 focus:ring-offset-indigo-600'
            >
              3
            </a>
          </div>
          <div className='flex justify-end flex-1 min-w-0'>
            <a
              href='#'
              className='inline-flex items-center h-10 px-4 bg-white border border-gray-300 rounded-md hover:bg-gray-100 focus:border-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:ring-opacity-25 focus:ring-offset-1 focus:ring-offset-indigo-600'
            >
              Siguiente
            </a>
          </div>
        </nav>
      </main>
    </div>
  )
}
