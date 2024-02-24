'use client'
import { Fragment, useEffect, useState } from 'react'
import { Disclosure, Menu, Transition, Dialog, Popover, Listbox } from '@headlessui/react'
import { ChevronDownIcon, FunnelIcon, StarIcon, XMarkIcon, CheckIcon, ArrowRightIcon } from '@heroicons/react/20/solid'
import { Productos } from '../api'
import { Raleway } from 'next/font/google'
import { NEXT_URL } from 'next/dist/client/components/app-router-headers'
import Image from 'next/image'

const filters = [
  {
    id: 'category',
    name: 'Category',
    options: [
      { value: 'new-arrivals', label: 'All New Arrivals', checked: false },
      { value: 'tees', label: 'Tees', checked: false },
      { value: 'objects', label: 'Objects', checked: true },
      { value: 'sweatshirts', label: 'Sweatshirts', checked: false },
      { value: 'pants-shorts', label: 'Pants & Shorts', checked: false }
    ]
  },
  {
    id: 'color',
    name: 'Color',
    options: [
      { value: 'white', label: 'White', checked: false },
      { value: 'beige', label: 'Beige', checked: false },
      { value: 'blue', label: 'Blue', checked: false },
      { value: 'brown', label: 'Brown', checked: false },
      { value: 'green', label: 'Green', checked: false },
      { value: 'purple', label: 'Purple', checked: false }
    ]
  },
  {
    id: 'sizes',
    name: 'Sizes',
    options: [
      { value: 'xs', label: 'XS', checked: false },
      { value: 's', label: 'S', checked: false },
      { value: 'm', label: 'M', checked: false },
      { value: 'l', label: 'L', checked: false },
      { value: 'xl', label: 'XL', checked: false },
      { value: '2xl', label: '2XL', checked: false }
    ]
  }
]
const sortOptions = [
  { name: 'Más Popular', href: '#', current: true },
  { name: 'A - Z', href: '#', current: false },
  { name: 'Z - A', href: '#', current: false },
  { name: 'Price: Menor a Mayor', href: '#', current: false },
  { name: 'Price: Mayor a Menor', href: '#', current: false }
]
const activeFilters = [{ value: 'objects', label: 'Objects' }]

const CantidadOptions = [
  { title: '1', description: '1 unidad' },
  { title: '2', description: 'Par' }
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

  useEffect(() => {
    const fetchData = async () => {
      const result = await Productos.getProducts.list()
      console.log(result)
      setProducts(result)
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
        <section aria-labelledby='filter-heading'>
          <h2
            id='filter-heading'
            className='sr-only'
          >
            Filters
          </h2>

          <div className='pb-4 bg-[#F4E8D8] border-b border-gray-200'>
            <div className='flex items-center justify-between px-4 mx-auto max-w-7xl sm:px-6 lg:px-8'>
              <Menu
                as='div'
                className='relative inline-block text-left'
              >
                <div>
                  <Menu.Button className='inline-flex justify-center text-sm font-medium text-gray-700 group hover:text-gray-900'>
                    Sort
                    <ChevronDownIcon
                      className='flex-shrink-0 w-5 h-5 ml-1 -mr-1 text-gray-400 group-hover:text-gray-500'
                      aria-hidden='true'
                    />
                  </Menu.Button>
                </div>

                <Transition
                  as={Fragment}
                  enter='transition ease-out duration-100'
                  enterFrom='transform opacity-0 scale-95'
                  enterTo='transform opacity-100 scale-100'
                  leave='transition ease-in duration-75'
                  leaveFrom='transform opacity-100 scale-100'
                  leaveTo='transform opacity-0 scale-95'
                >
                  <Menu.Items className='absolute left-0 z-10 w-40 mt-2 origin-top-left bg-white rounded-md shadow-2xl ring-1 ring-black ring-opacity-5 focus:outline-none'>
                    <div className='py-1'>
                      {sortOptions.map(option => (
                        <Menu.Item key={option.name}>
                          {({ active }) => (
                            <a
                              href={option.href}
                              className={classNames(option.current ? 'font-medium text-gray-900' : 'text-gray-500', active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm')}
                            >
                              {option.name}
                            </a>
                          )}
                        </Menu.Item>
                      ))}
                    </div>
                  </Menu.Items>
                </Transition>
              </Menu>

              <button
                type='button'
                className='inline-block text-sm font-medium text-gray-700 hover:text-gray-900 sm:hidden'
                onClick={() => setMobileFiltersOpen(true)}
              >
                Filters
              </button>

              <div className='hidden sm:block'>
                <div className='flow-root'>
                  <Popover.Group className='flex items-center -mx-4 divide-x divide-gray-200'>
                    {filters.map((section, sectionIdx) => (
                      <Popover
                        key={section.name}
                        className='relative inline-block px-4 text-left'
                      >
                        <Popover.Button className='inline-flex justify-center text-sm font-medium text-gray-700 group hover:text-gray-900'>
                          <span>{section.name}</span>
                          {sectionIdx === 0 ? <span className='ml-1.5 rounded bg-white px-1.5 py-0.5 text-xs font-semibold tabular-nums text-gray-700'>1</span> : null}
                          <ChevronDownIcon
                            className='flex-shrink-0 w-5 h-5 ml-1 -mr-1 text-gray-400 group-hover:text-gray-500'
                            aria-hidden='true'
                          />
                        </Popover.Button>

                        <Transition
                          as={Fragment}
                          enter='transition ease-out duration-100'
                          enterFrom='transform opacity-0 scale-95'
                          enterTo='transform opacity-100 scale-100'
                          leave='transition ease-in duration-75'
                          leaveFrom='transform opacity-100 scale-100'
                          leaveTo='transform opacity-0 scale-95'
                        >
                          <Popover.Panel className='absolute right-0 z-10 p-4 mt-2 origin-top-right bg-white rounded-md shadow-2xl ring-1 ring-black ring-opacity-5 focus:outline-none'>
                            <form className='space-y-4'>
                              {section.options.map((option, optionIdx) => (
                                <div
                                  key={option.value}
                                  className='flex items-center'
                                >
                                  <input
                                    id={`filter-${section.id}-${optionIdx}`}
                                    name={`${section.id}[]`}
                                    defaultValue={option.value}
                                    type='checkbox'
                                    defaultChecked={option.checked}
                                    className='w-4 h-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500'
                                  />
                                  <label
                                    htmlFor={`filter-${section.id}-${optionIdx}`}
                                    className='pr-6 ml-3 text-sm font-medium text-gray-900 whitespace-nowrap'
                                  >
                                    {option.label}
                                  </label>
                                </div>
                              ))}
                            </form>
                          </Popover.Panel>
                        </Transition>
                      </Popover>
                    ))}
                  </Popover.Group>
                </div>
              </div>
            </div>
          </div>

          {/* Active filters */}
          <div className='mb-10 bg-gray-100'>
            <div className='flex items-center gap-5 px-6 py-3 mx-auto max-w-7xl lg:px-8'>
              <h3 className='text-sm font-medium text-gray-500'>
                Filters
                <span className='sr-only'>, active</span>
              </h3>

              <div
                aria-hidden='true'
                className='block w-px h-5 bg-gray-300 sm:ml-4 sm:block'
              />

              <div className='mt-0 sm:ml-4'>
                <div className='flex flex-wrap items-center -m-1'>
                  {activeFilters.map(activeFilter => (
                    <span
                      key={activeFilter.value}
                      className='m-1 inline-flex items-center rounded-full border border-gray-200 bg-white py-1.5 pl-3 pr-2 text-sm font-medium text-gray-900'
                    >
                      <span>{activeFilter.label}</span>
                      <button
                        type='button'
                        className='inline-flex flex-shrink-0 w-4 h-4 p-1 ml-1 text-gray-400 rounded-full hover:bg-gray-200 hover:text-gray-500'
                      >
                        <span className='sr-only'>Remove filter for {activeFilter.label}</span>
                        <svg
                          className='w-2 h-2'
                          stroke='currentColor'
                          fill='none'
                          viewBox='0 0 8 8'
                        >
                          <path
                            strokeLinecap='round'
                            strokeWidth='1.5'
                            d='M1 1l6 6m0-6L1 7'
                          />
                        </svg>
                      </button>
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

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
            {products.map(Item => (
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
                      <span className='font-sans text-base font-normal leading-relaxed text-gray-900 md:text-lg'>{Item.price_ind}</span>
                    </div>
                    <div className='flex items-center justify-end rounded-full border-2 border-transparent hover:border-[#998779] transition-all hover:scale-110 '>
                      <a
                        href={`/productos/${Item.id}`}
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
            ))}
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
            <span className='inline-flex h-10 items-center px-1.5 text-gray-500'>...</span>
            <a
              href='#'
              className='inline-flex items-center h-10 px-4 bg-white border border-gray-300 rounded-md hover:bg-gray-100 focus:border-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:ring-opacity-25 focus:ring-offset-1 focus:ring-offset-indigo-600'
            >
              8
            </a>
            <a
              href='#'
              className='inline-flex items-center h-10 px-4 bg-white border border-gray-300 rounded-md hover:bg-gray-100 focus:border-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:ring-opacity-25 focus:ring-offset-1 focus:ring-offset-indigo-600'
            >
              9
            </a>
            <a
              href='#'
              className='inline-flex items-center h-10 px-4 bg-white border border-gray-300 rounded-md hover:bg-gray-100 focus:border-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:ring-opacity-25 focus:ring-offset-1 focus:ring-offset-indigo-600'
            >
              10
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
