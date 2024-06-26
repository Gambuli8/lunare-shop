'use client'
import { useEffect, useState } from 'react'
import { ShoppingCartIcon } from '@heroicons/react/20/solid'
import { Productos } from '../apiLocal'
import { Raleway } from 'next/font/google'
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import Link from 'next/link'
import Filters from '../components/Filters'
import useCart from '../hooks/useCart'
import Breadcrumb from './breadCrumb'
import { Pagination } from '../components/pagination'

const raleway = Raleway({ subsets: ['latin'] })

export default function Products() {
  const [products, setProducts] = useState([])
  const [productsCat, setProductsCat] = useState([])
  const [loading, setLoading] = useState(false)
  const { AddToCartCard, Cart } = useCart()
  const [filtered, setFiltered] = useState({
    category: 'All',
    sort: 'All'
  })
  const [productPerPage, setProductPerPage] = useState(9)
  const [currentPage, setCurrentPage] = useState(1)

  const totalProducts = products.length

  const lastIndex = currentPage * productPerPage
  const firstIndex = lastIndex - productPerPage

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

  const productSelect = () => {
    if (location.search === '?Aro') return 'Aro'
    if (location.search === '?pulsera') return 'pulsera'
    if (location.search === '?dije') return 'dije'
    if (location.search === '?cadena') return 'cadena'
    if (location.search === '?Conjunto') return 'Conjunto'
  }

  //* FORMATEAR PRECIO
  const formatPrice = price => {
    return new Intl.NumberFormat('es-MX', {
      style: 'currency',
      currency: 'MXN'
    }).format(price)
  }

  const IdCart = () => {
    Cart.filter(item => {
      item.id === products.id
    })
  }

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      const result = await Productos.getProducts.list()
      setProducts(result)
      setLoading(false)
    }
    fetchData()
  }, [])

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      const result = await Productos.filteredProductsCategory.list(productSelect())
      setProductsCat(result)
      setLoading(false)
    }
    fetchData()
  }, [])

  console.log(Cart)

  return (
    <div className='pt-24 bg-white'>
      <main className='pb-12'>
        <div className='flex items-center justify-start py-10 pl-10'>
          <Breadcrumb products={products} />
        </div>
        <div className='relative m-0 mb-5 overflow-hidden'>
          <div className='relative w-full h-full px-4 py-5 text-center sm:px-6 lg:px-8'>
            <h1 className={` ${raleway.className} text-6xl font-sans font-normal tracking-tight text-gray-900`}>Productos</h1>
          </div>
        </div>

        {/* Filters */}
        <div className='flex items-center justify-center px-3'>
          <div className=''>
            <Filters setFiltered={setFiltered} />
          </div>
        </div>

        {/* Product grid */}
        <section
          aria-labelledby='products-heading'
          className='pb-16 mx-auto overflow-hidden max-w-7xl sm:px-6 lg:px-8'
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
            ) : productsCat.length === 0 ? (
              filteredProducts
                .map(Item => (
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
                          className='top-0 z-50 object-contain object-center w-full h-full cursor-pointer hover:transition-all hover:scale-110 hover:duration-300 hover:ease-in-out'
                        />
                        {/* <div className='absolute inset-0 w-full h-full to-bg-black-10 bg-gradient-to-tr from-transparent via-transparent to-black/10'></div> */}
                      </div>
                    </Link>
                    <div className='p-3 px-2 bg-transparent md:px-4'>
                      <div className='flex items-center justify-between mb-1 bg-transparent'>
                        <h5 className={` ${raleway.className} uppercase block font-sans md:text-base text-sm py-2  antialiased font-normal leading-snug tracking-normal text-black`}>{Item.name}</h5>
                        {Item.material === 'silver' ? (
                          <span className='inline-flex items-center px-2 py-1 text-xs font-medium text-gray-400 rounded-md bg-gray-400/10 ring-1 ring-inset ring-gray-400/20'>{Item.material}</span>
                        ) : (
                          <span className='inline-flex items-center px-2 py-1 text-xs font-medium text-yellow-500 rounded-md bg-yellow-400/10 ring-1 ring-inset ring-yellow-400/20'>{Item.material}</span>
                        )}
                      </div>
                      {Item.stock > 0 ? (
                        <div className='flex items-center justify-between w-full gap-3 mt-5 group'>
                          <div className='flex items-center w-full'>
                            <span className='font-sans text-base font-normal leading-relaxed text-gray-900 md:text-lg'>{formatPrice(Item.price_par || Item.price_ind)}</span>
                          </div>
                          <button
                            onClick={() => AddToCartCard(Item)}
                            className='flex items-center justify-end transition-all border-2 border-transparent rounded-full hover:scale-110'
                          >
                            <ShoppingCartIcon className='w-6 h-6 text-[#e2d0c2]' />
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
                ))
                .slice(firstIndex, lastIndex)
            ) : (
              productsCat.map(Item => (
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
                        <ShoppingCartIcon className='w-6 h-6 text-black' />
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </section>

        {/* Pagination */}
        <Pagination
          productPerPage={productPerPage}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          totalProducts={totalProducts}
        />
      </main>
    </div>
  )
}
