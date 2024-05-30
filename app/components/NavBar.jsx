'use client'

import { Fragment, useState, useRef, useEffect } from 'react'
import { Dialog, Popover, Tab, Transition } from '@headlessui/react'
import { Bars3Icon, MagnifyingGlassIcon, UserIcon, XMarkIcon } from '@heroicons/react/24/outline'
import { ChevronDownIcon } from '@heroicons/react/20/solid'
import { Raleway } from 'next/font/google'
import Cart from './Cart'
import Image from 'next/image'
import { Productos } from '../apiLocal'
import Link from 'next/link'
import { useAuth } from '../context/authContext'
import ModalProfile from './ModalProfile'
import Swal from 'sweetalert2'

const navigation = {
  categories: [
    {
      name: 'Tienda',
      aros: [
        { name: 'Abridores', href: '#' },
        { name: 'Argollas', href: '#' },
        { name: 'Pasantes', href: '#' },
        { name: 'Micropave', href: '#' }
      ],
      pulseras: [],
      dijes: [],
      cadenas: []
    }
  ],
  Cuidados: [
    {
      name: 'Como Cuidarlos',
      productos: [
        { name: 'Plata', href: '#' },
        { name: 'Plata Rose', href: '#' },
        { name: 'Plata Dorada', href: '#' },
        { name: 'Acero', href: '#' }
      ]
    }
  ],
  pages: [
    { name: 'Inicio', href: '/' },
    { name: 'Contacto', href: '/contacto' },
    { name: 'Cuidados', href: '/cuidados' },
    { name: 'Política de Cambios', href: '/politica' }
  ]
}
const productos = [
  { name: 'Aros', href: '/productos?Aro' },
  { name: 'Pulseras', href: '/productos?pulsera' },
  { name: 'Dijes', href: '/productos?dije' },
  { name: 'Cadenas', href: '/productos?cadena' },
  { name: 'Conjuntos', href: '/productos?Conjunto' },
  { name: 'Vér Todos ', href: '/productos' }
]

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

const raleway = Raleway({ subsets: ['latin'] })

export default function NavBar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const [product, setProduct] = useState([])
  const { user } = useAuth()
  const [showModal, setShowModal] = useState(false)

  const debounceRef = useRef()

  const queryChange = e => {
    const value = e.target.value
    if (debounceRef.current) {
      clearTimeout(debounceRef.current)
    }
    setSearchTerm(value)
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await Productos.getProductName.list(searchTerm)
        setProduct(result)
      } catch (error) {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: `Hubo un error, ${error.message} `
        })
      }
    }
    fetchData()
  }, [searchTerm])

  return (
    <div>
      {/* Mobile menu */}
      <Transition.Root
        show={mobileMenuOpen}
        as={Fragment}
      >
        <Dialog
          as='div'
          className='relative z-40 lg:hidden'
          onClose={setMobileMenuOpen}
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
              enterFrom='-translate-x-full'
              enterTo='translate-x-0'
              leave='transition ease-in-out duration-300 transform'
              leaveFrom='translate-x-0'
              leaveTo='-translate-x-full'
            >
              <Dialog.Panel className='relative flex flex-col w-full max-w-xs pb-12 overflow-y-auto bg-white shadow-xl'>
                <div className='flex px-4 pt-5 pb-2'>
                  <button
                    type='button'
                    className='inline-flex items-center justify-center p-2 -m-2 text-gray-400 rounded-md'
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <span className='sr-only'>Close menu</span>
                    <XMarkIcon
                      className='w-6 h-6'
                      aria-hidden='true'
                    />
                  </button>
                </div>

                {/* Links */}
                <Tab.Group
                  as='div'
                  className='mt-2 bg-white'
                >
                  <div className='border-b border-gray-200'>
                    <Tab.List className='flex px-4 -mb-px space-x-8'>Tienda</Tab.List>
                  </div>
                  <Tab.Panels as={Fragment}>
                    {navigation.categories.map((category, categoryIdx) => (
                      <Tab.Panel
                        key={category.name}
                        className='px-4 pt-10 pb-6 space-y-12'
                      >
                        <div className='grid items-start grid-cols-1 gap-x-6 gap-y-10'>
                          <div className='grid grid-cols-1 gap-x-6 gap-y-10'>
                            <div>
                              <Link href='/productos?Aro'>
                                <p
                                  id={`mobile-featured-heading-${categoryIdx}`}
                                  className='font-medium text-gray-900 border-b hover:w-20 hover:border-[#e2d0c2]'
                                >
                                  Aros
                                </p>
                              </Link>
                              <ul
                                role='list'
                                aria-labelledby={`mobile-featured-heading-${categoryIdx}`}
                                className='mt-6 space-y-6'
                              >
                                {category.aros.map(item => (
                                  <li
                                    key={item.name}
                                    className='flex'
                                  >
                                    <Link
                                      href={item.href}
                                      className='text-[#998779] font-medium'
                                    >
                                      {item.name}
                                    </Link>
                                  </li>
                                ))}
                              </ul>
                            </div>
                            <div>
                              <Link href='/productos?pulsera'>
                                <p
                                  id={`mobile-featured-heading`}
                                  className='font-medium text-gray-900 border-b hover:w-20 hover:border-[#e2d0c2]'
                                >
                                  Pulseras
                                </p>
                              </Link>
                            </div>
                          </div>
                          <div className='grid grid-cols-1 gap-x-6 gap-y-10'>
                            <div>
                              <Link href='/productos?dije'>
                                <p
                                  id={`mobile-featured-heading`}
                                  className='font-medium text-gray-900 border-b hover:w-20 hover:border-[#e2d0c2]'
                                >
                                  Dijes
                                </p>
                              </Link>
                            </div>

                            <div>
                              <Link href='/productos?cadena'>
                                <p
                                  id={`mobile-featured-heading`}
                                  className='font-medium text-gray-900 border-b hover:w-20 hover:border-[#e2d0c2]'
                                >
                                  Cadenas
                                </p>
                              </Link>
                            </div>

                            <div>
                              <Link href='/productos?Conjunto'>
                                <p
                                  id={`mobile-featured-heading`}
                                  className='font-medium text-gray-900 border-b hover:w-20 hover:border-[#e2d0c2]'
                                >
                                  Conjuntos
                                </p>
                              </Link>
                            </div>
                            <div>
                              <p
                                id='mobile-brand-heading'
                                className='font-medium text-gray-900 border-b hover:w-20 hover:border-[#e2d0c2]'
                              >
                                <Link href='/productos'>Ver Todos</Link>
                              </p>
                            </div>
                          </div>
                        </div>
                      </Tab.Panel>
                    ))}
                  </Tab.Panels>
                </Tab.Group>

                <div className='px-4 py-6 space-y-6 border-t border-gray-200'>
                  {navigation.pages.map(page => (
                    <div
                      key={page.name}
                      className='flow-root'
                    >
                      <Link
                        href={page.href}
                        className='block p-2 -m-2 font-medium text-gray-900'
                      >
                        {page.name}
                      </Link>
                    </div>
                  ))}
                </div>

                <div></div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition.Root>

      <header className='fixed z-10 w-full'>
        <nav aria-label='Top'>
          {/* Top navigation */}
          <div className={` ${raleway.className} bg-[#998779]`}>
            <div className='flex items-center justify-center h-8 px-4 mx-auto max-w-7xl sm:px-6 lg:px-8'>
              <p className='items-center justify-center flex-1 text-base font-medium text-center text-white lg:flex-none'>15% OFF en Efectivo</p>
            </div>
          </div>

          {/* Secondary navigation */}
          <div className={` ${raleway.className} bg-white border-b-2 border-[#E2D0C2]`}>
            <div className='border-b border-gray-200'>
              <div className='px-4 mx-auto max-w-7xl sm:px-6 lg:px-8'>
                <div className='flex items-center justify-between h-16'>
                  {/* Logo (lg+) */}
                  <div className='hidden lg:flex lg:items-center'>
                    <Link href='/'>
                      <span className='sr-only'>Your Company</span>
                      <Image
                        className='flex items-center justify-center w-auto h-36'
                        width={150}
                        height={150}
                        src='https://res.cloudinary.com/ds7hhoq17/image/upload/v1708557835/Logo/logoLunareSinFondo_ovzq4x.png'
                        alt=''
                      />
                    </Link>
                  </div>

                  <div className='hidden h-full lg:flex'>
                    {/* Mega menus */}
                    <Popover.Group className='ml-8'>
                      <div className='flex justify-center h-full space-x-8 border-none'>
                        {navigation.categories.map(category => (
                          <Popover
                            key={category.name}
                            className='flex'
                          >
                            {({ open }) => (
                              <>
                                <div className='relative flex border-none'>
                                  <Popover.Button className={classNames(open ? ' text-[#998779]' : ' text-gray-700 hover:text-gray-800', 'relative z-10 -mb-px flex items-center pt-px text-sm font-medium transition-colors duration-200 ease-out')}>
                                    {category.name}
                                    <ChevronDownIcon
                                      className='flex-none w-5 h-5 text-gray-400'
                                      aria-hidden='true'
                                    />
                                  </Popover.Button>
                                </div>

                                <Transition
                                  as={Fragment}
                                  enter='transition ease-out duration-200'
                                  enterFrom='opacity-0 translate-y-1'
                                  enterTo='opacity-100 translate-y-0'
                                  leave='transition ease-in duration-150'
                                  leaveFrom='opacity-100 translate-y-0'
                                  leaveTo='opacity-0 translate-y-1'
                                >
                                  <Popover.Panel className='absolute z-10 p-4 ml-56 -mt-2 bg-white shadow-lg -left-8 top-full w-52 rounded-3xl ring-1 ring-gray-900/5'>
                                    {productos.map(item => (
                                      <div
                                        key={item.name}
                                        className={` ${raleway.className} relative p-4 rounded-lg hover:bg-[#e2d0c2]`}
                                      >
                                        <Link
                                          href={item.href}
                                          className='block text-sm font-semibold leading-6 text-gray-900'
                                        >
                                          {item.name}
                                          <span className='absolute inset-0' />
                                        </Link>
                                      </div>
                                    ))}
                                  </Popover.Panel>
                                </Transition>
                              </>
                            )}
                          </Popover>
                        ))}

                        {navigation.pages.map(page => (
                          <Link
                            key={page.name}
                            href={page.href}
                            className='flex items-center text-sm font-medium text-gray-700 hover:text-gray-800'
                          >
                            {page.name}
                          </Link>
                        ))}
                      </div>
                    </Popover.Group>
                  </div>

                  {/* Mobile menu and search (lg-) */}
                  <div className='flex items-center flex-1 lg:hidden'>
                    <button
                      type='button'
                      className='p-2 -ml-2 text-gray-400 bg-transparent rounded-md'
                      onClick={() => setMobileMenuOpen(true)}
                    >
                      <span className='sr-only'>Open menu</span>
                      <Bars3Icon
                        className='w-6 h-6 text-black'
                        aria-hidden='true'
                      />
                    </button>

                    {/* Search */}
                    <div className='flex flex-col items-center justify-center w-full h-full'>
                      <form
                        action=''
                        className='relative '
                      >
                        <input
                          type='search'
                          className='relative z-10 bg-transparent text-gray-500 pl-8 pr-4 w-8 h-8 rounded-full border border-transparent focus:w-full focus:pl-12 focus:pr-4 focus:cursor-text focus:border-[#998779] outline-none cursor-pointer'
                          placeholder='Buscar...'
                          onChange={e => queryChange(e)}
                          id='2'
                        />
                        <MagnifyingGlassIcon
                          className='w-11 h-11 absolute inset-y-0 my-auto px-2.5 stroke-black border border-transparent peer-focus:border-[#998779] peer-focus:border-r peer-focus:stroke-black'
                          aria-hidden='true'
                        />
                      </form>
                      {searchTerm.length > 0 ? (
                        <div className='z-30 bg-[#F4E8D8] absolute flex-col w-44 h-auto right-40 overflow-y-auto mt-44 rounded-md shadow-md max-h-28'>
                          {product.map(result => {
                            return (
                              <Link
                                key={result.id}
                                href={`/productos/${result.id}`}
                              >
                                <div className={` ${raleway.className} ml-1 hover:bg-[#998779] my-2 flex items-center gap-3 text-sm`}>
                                  <img
                                    src={result.image}
                                    alt={result.name}
                                    className='object-cover rounded-md w-7 h-7 aspect-auto'
                                  />
                                  <div>
                                    <p className='capitalize'>{result.name}</p>
                                  </div>
                                </div>
                              </Link>
                            )
                          })}
                        </div>
                      ) : null}
                    </div>
                  </div>

                  {/* Logo (lg-) */}
                  <Link
                    href='/'
                    className='lg:hidden'
                  >
                    <span className='sr-only'>Your Company</span>
                    <Image
                      src='https://res.cloudinary.com/ds7hhoq17/image/upload/v1708557816/Logo/logo-redondo_bzmu99.png'
                      alt=''
                      className='w-auto h-24'
                      width={100}
                      height={100}
                    />
                  </Link>

                  <div className='flex items-center justify-end flex-1'>
                    <div className='flex items-center lg:ml-8'>
                      <div className='flex items-center space-x-8'>
                        <div className='hidden lg:flex lg:flex-col lg:w-full lg:h-full'>
                          <form
                            action=''
                            className='relative mx-auto '
                          >
                            <input
                              type='search'
                              className='relative z-10 bg-transparent text-gray-500 pl-8 pr-4 w-8 h-8 rounded-full border border-transparent focus:w-full focus:pl-12 focus:pr-4 focus:cursor-text focus:border-[#998779] outline-none cursor-pointer'
                              placeholder='Buscar...'
                              onChange={queryChange}
                              id='1'
                            />
                            <MagnifyingGlassIcon
                              className='w-11 h-11 absolute inset-y-0 my-auto px-2.5 stroke-black border border-transparent peer-focus:border-[#998779] peer-focus:stroke-black'
                              aria-hidden='true'
                            />
                          </form>
                          {searchTerm.length > 0 ? (
                            <div className='z-30 bg-white absolute flex-col w-72 h-auto mt-[35px] right-44 overflow-y-auto rounded-md shadow-md max-h-80'>
                              {product.map(result => {
                                return (
                                  <Link
                                    key={result.id}
                                    href={`/productos/${result.id}`}
                                  >
                                    <div className={` ${raleway.className} ml-1 hover:bg-[#998779] my-2 flex items-center gap-3 text-base`}>
                                      <img
                                        src={result.image}
                                        alt={result.name}
                                        className='object-cover w-10 h-10 rounded-md aspect-auto'
                                      />
                                      <div>
                                        <p className='capitalize'>{result.name}</p>
                                      </div>
                                    </div>
                                  </Link>
                                )
                              })}
                            </div>
                          ) : null}
                        </div>

                        {/* Modal */}
                        <div className='flex'>
                          <span className='sr-only'>Perfil</span>
                          {console.log(user)}
                          <ModalProfile
                            handleClose={() => setShowModal(false)}
                            handlerOpen={() => setShowModal(true)}
                            show={showModal}
                          />
                        </div>
                      </div>
                      <span
                        className='w-px h-6 mx-4 bg-gray-200 lg:mx-6'
                        aria-hidden='true'
                      />

                      <div className='flow-root'>
                        <Cart />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </nav>
      </header>
    </div>
  )
}
