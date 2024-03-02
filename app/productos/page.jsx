'use client'
import { Fragment, useEffect, useState } from 'react'
import { Disclosure, Menu, Transition, Dialog, Popover } from '@headlessui/react'
import { ChevronDownIcon, XMarkIcon, ArrowRightIcon } from '@heroicons/react/20/solid'
import { Productos } from '../api'
import { Raleway } from 'next/font/google'
import Image from 'next/image'
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import Link from 'next/link'
import Filters from '../components/Filters'

const CantidadOptions = [
  { title: '1', description: '1 unidad' },
  { title: '2', description: 'Par' }
]

const filters = [
  {
    id: 'category',
    name: 'Category',
    options: [
      { value: 'All', label: 'All' },
      { value: 'Plata', label: 'Plata' },
      { value: 'Oro', label: 'Oro' }
    ]
  },
  {
    id: 'price',
    name: 'Price',
    options: [
      { value: '0', label: '0 - 1000' },
      { value: '1000', label: '1000 - 2000' },
      { value: '2000', label: '2000 - 3000' },
      { value: '3000', label: '3000 - 4000' },
      { value: '4000', label: '4000 - 5000' }
    ]
  }
]

const raleway = Raleway({ subsets: ['latin'] })

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function Products() {
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false)
  const [products, setProducts] = useState([])
  const [id, setId] = useState('')
  const [selectedCount, setSelectedCount] = useState(CantidadOptions[0])
  const [loading, setLoading] = useState(false)
  const [filtered, setFiltered] = useState({
    category: 'All',
    minPrice: 0
  })

  const filterProducts = Products => {
    return Products.filter(product => {
      return product.price_ind >= filtered.minPrice && (filtered.category === 'All' || product.category === filtered.category)
    })
  }

  const filteredProducts = filterProducts(products)

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
    <div className='bg-[#F4E8D8]'>
      <div className='bg-[#F4E8D8]'>
        {/* Mobile filter dialog */}
        <Transition.Root
          show={mobileFiltersOpen}
          as={Fragment}
        >
          <Dialog
            as='div'
            className='relative z-40 sm:hidden'
            onClose={setMobileFiltersOpen}
          >
            <Transition.Child
              as={Fragment}
              enter='transition-opacity ease-linear duration-300'
              enterFrom='opacity-0'
              enterTo='opacity-100'
              leave='transition-opacity ease-linear duration-300'
              leaveFrom='opacity-100'
              leaveTo='opacity-0'
            >
              <div className='fixed inset-0 bg-black bg-opacity-25' />
            </Transition.Child>

            <div className='fixed inset-0 z-40 flex'>
              <Transition.Child
                as={Fragment}
                enter='transition ease-in-out duration-300 transform'
                enterFrom='translate-x-full'
                enterTo='translate-x-0'
                leave='transition ease-in-out duration-300 transform'
                leaveFrom='translate-x-0'
                leaveTo='translate-x-full'
              >
                <Dialog.Panel className='relative flex flex-col w-full h-full max-w-xs py-4 pb-12 ml-auto overflow-y-auto bg-white shadow-xl'>
                  <div className='flex items-center justify-between px-4'>
                    <h2 className='text-lg font-medium text-gray-900'>Filters</h2>
                    <button
                      type='button'
                      className='flex items-center justify-center w-10 h-10 p-2 -mr-2 text-gray-400 bg-white rounded-md'
                      onClick={() => setMobileFiltersOpen(false)}
                    >
                      <span className='sr-only'>Close menu</span>
                      <XMarkIcon
                        className='w-6 h-6'
                        aria-hidden='true'
                      />
                    </button>
                  </div>

                  {/* Filters */}
                  <form className='mt-4'>
                    {filters.map(section => (
                      <Disclosure
                        as='div'
                        key={section.name}
                        className='px-4 py-6 border-t border-gray-200'
                      >
                        {({ open }) => (
                          <>
                            <h3 className='flow-root -mx-2 -my-3'>
                              <Disclosure.Button className='flex items-center justify-between w-full px-2 py-3 text-sm text-gray-400 bg-white'>
                                <span className='font-medium text-gray-900'>{section.name}</span>
                                <span className='flex items-center ml-6'>
                                  <ChevronDownIcon
                                    className={classNames(open ? '-rotate-180' : 'rotate-0', 'h-5 w-5 transform')}
                                    aria-hidden='true'
                                  />
                                </span>
                              </Disclosure.Button>
                            </h3>
                            <Disclosure.Panel className='pt-6'>
                              <div className='space-y-6'>
                                {section.options.map((option, optionIdx) => (
                                  <div
                                    key={option.value}
                                    className='flex items-center'
                                  >
                                    <input
                                      id={`filter-mobile-${section.id}-${optionIdx}`}
                                      name={`${section.id}[]`}
                                      defaultValue={option.value}
                                      type='checkbox'
                                      defaultChecked={option.checked}
                                      className='w-4 h-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500'
                                    />
                                    <label
                                      htmlFor={`filter-mobile-${section.id}-${optionIdx}`}
                                      className='ml-3 text-sm text-gray-500'
                                    >
                                      {option.label}
                                    </label>
                                  </div>
                                ))}
                              </div>
                            </Disclosure.Panel>
                          </>
                        )}
                      </Disclosure>
                    ))}
                  </form>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </Dialog>
        </Transition.Root>
      </div>

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
        <Filters setFiltered={setFiltered} />

        {/* Product grid */}
        <section
          aria-labelledby='products-heading'
          className='mx-auto overflow-hidden max-w-7xl sm:px-6 lg:px-8'
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
                  <div className='relative overflow-hidden text-white md:max-h-60 max-h-40 rounded-xl'>
                    <img
                      src={Item.image}
                      alt={Item.name}
                      className='object-contain w-full h-full'
                    />
                    <div className='absolute inset-0 w-full h-full to-bg-black-10 bg-gradient-to-tr from-transparent via-transparent to-black/10'></div>
                  </div>
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
                        <span className='font-sans text-base font-normal leading-relaxed text-gray-900 md:text-lg'>{formatPrice(Item.price_ind)}</span>
                      </div>
                      <div className='flex items-center justify-end rounded-full border-2 border-transparent hover:border-[#998779] transition-all hover:scale-110 '>
                        <Link
                          href={`/productos/${Item.id}`}
                          className=''
                        >
                          <ArrowRightIcon
                            className='w-6 h-6 text-gray-900'
                            aria-hidden='true'
                          />
                        </Link>
                      </div>
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
