'use client'

import { Fragment, useState } from 'react'
import { Dialog, Popover, Tab, Transition } from '@headlessui/react'
import { Bars3Icon, MagnifyingGlassIcon, UserIcon, XMarkIcon } from '@heroicons/react/24/outline'
import { ChevronDownIcon } from '@heroicons/react/20/solid'
import Cart from './Cart'

const navigation = {
    categories: [
        {
            name: 'Productos',
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
        { name: 'Política de devolucón', href: '#' }
    ]
}
const productos = [
    { name: 'Aros', href: '#' },
    { name: 'Pulseras', href: '#' },
    { name: 'Dijes', href: '#' },
    { name: 'Cadenas', href: '#' },
    { name: 'Vér Todos ', href: '/productos' }
]

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

export default function NavBar() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
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
                                    className='mt-2'
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
                                                            <p
                                                                id={`mobile-featured-heading-${categoryIdx}`}
                                                                className='font-medium text-gray-900 hover:border-b hover:w-20 hover:border-[#998779]'
                                                            >
                                                                Aros
                                                            </p>
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
                                                                        <a
                                                                            href={item.href}
                                                                            className='text-gray-500'
                                                                        >
                                                                            {item.name}
                                                                        </a>
                                                                    </li>
                                                                ))}
                                                            </ul>
                                                        </div>
                                                        <div>
                                                            <p
                                                                id='mobile-categories-heading'
                                                                className='font-medium text-gray-900 hover:border-b hover:w-20 hover:border-[#998779]'
                                                            >
                                                                Pulseras
                                                            </p>
                                                        </div>
                                                    </div>
                                                    <div className='grid grid-cols-1 gap-x-6 gap-y-10'>
                                                        <div>
                                                            <p
                                                                id='mobile-collection-heading'
                                                                className='font-medium text-gray-900 hover:border-b hover:w-20 hover:border-[#998779]'
                                                            >
                                                                Dijes
                                                            </p>
                                                        </div>

                                                        <div>
                                                            <p
                                                                id='mobile-brand-heading'
                                                                className='font-medium text-gray-900 hover:border-b hover:w-20 hover:border-[#998779]'
                                                            >
                                                                Cadenas
                                                            </p>
                                                        </div>
                                                        <div>
                                                            <p
                                                                id='mobile-brand-heading'
                                                                className='font-medium text-gray-900 hover:border-b hover:w-20 hover:border-[#998779]'
                                                            >
                                                                <a href='/productos'>Ver Todos</a>
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
                                            <a
                                                href={page.href}
                                                className='block p-2 -m-2 font-medium text-gray-900'
                                            >
                                                {page.name}
                                            </a>
                                        </div>
                                    ))}
                                </div>

                                <div className='px-4 py-6 space-y-6 border-t border-gray-200'>
                                    <div className='flow-root'>
                                        <a
                                            href='#'
                                            className='block p-2 -m-2 font-medium text-gray-900'
                                        >
                                            Crear sesion
                                        </a>
                                    </div>
                                    <div className='flow-root'>
                                        <a
                                            href='#'
                                            className='block p-2 -m-2 font-medium text-gray-900'
                                        >
                                            Iniciar sesion
                                        </a>
                                    </div>
                                </div>

                                <div></div>
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </Dialog>
            </Transition.Root>

            <header className='relative z-10'>
                <nav aria-label='Top'>
                    {/* Top navigation */}
                    <div className='bg-[#998779]'>
                        <div className='flex items-center justify-between h-10 px-4 mx-auto max-w-7xl sm:px-6 lg:px-8'>
                            <div className='hidden lg:block lg:flex-1'></div>

                            <p className='flex-1 text-sm font-medium text-center text-white lg:flex-none'>25% OFF en Efectivo & 3 CUOTAS SIN INTERES con tarjetas.</p>

                            <div className='hidden lg:flex lg:flex-1 lg:items-center lg:justify-end lg:space-x-6'>
                                <a
                                    href='#'
                                    className='text-sm font-medium text-white hover:text-gray-100'
                                >
                                    Crear sesion
                                </a>
                                <span
                                    className='w-px h-6 bg-gray-600'
                                    aria-hidden='true'
                                />
                                <a
                                    href='#'
                                    className='text-sm font-medium text-white hover:text-gray-100'
                                >
                                    Iniciar sesion
                                </a>
                            </div>
                        </div>
                    </div>

                    {/* Secondary navigation */}
                    <div className='bg-[#F4E8D8] border-b-2 border-[#E2D0C2]'>
                        <div className='border-b border-gray-200'>
                            <div className='px-4 mx-auto max-w-7xl sm:px-6 lg:px-8'>
                                <div className='flex items-center justify-between h-16'>
                                    {/* Logo (lg+) */}
                                    <div className='hidden lg:flex lg:items-center'>
                                        <a href='/'>
                                            <span className='sr-only'>Your Company</span>
                                            <img
                                                className='flex items-center justify-center w-auto h-36'
                                                src='/logoSinFondo.png'
                                                alt=''
                                            />
                                        </a>
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
                                                                    <Popover.Button
                                                                        className={classNames(
                                                                            open ? ' text-[#998779]' : ' text-gray-700 hover:text-gray-800',
                                                                            'relative z-10 -mb-px flex items-center pt-px text-sm font-medium transition-colors duration-200 ease-out'
                                                                        )}
                                                                    >
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
                                                                                className='relative p-4 rounded-lg hover:bg-gray-50'
                                                                            >
                                                                                <a
                                                                                    href={item.href}
                                                                                    className='block text-sm font-semibold leading-6 text-gray-900'
                                                                                >
                                                                                    {item.name}
                                                                                    <span className='absolute inset-0' />
                                                                                </a>
                                                                            </div>
                                                                        ))}
                                                                    </Popover.Panel>
                                                                </Transition>
                                                            </>
                                                        )}
                                                    </Popover>
                                                ))}

                                                {navigation.pages.map(page => (
                                                    <a
                                                        key={page.name}
                                                        href={page.href}
                                                        className='flex items-center text-sm font-medium text-gray-700 hover:text-gray-800'
                                                    >
                                                        {page.name}
                                                    </a>
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
                                                className='w-6 h-6 text-[#998779]'
                                                aria-hidden='true'
                                            />
                                        </button>

                                        {/* Search */}
                                        <a
                                            href='#'
                                            className='p-2 ml-2 text-gray-400 hover:text-gray-500'
                                        >
                                            <span className='sr-only'>Search</span>
                                            <MagnifyingGlassIcon
                                                className='w-6 h-6 text-[#998779]'
                                                aria-hidden='true'
                                            />
                                        </a>
                                    </div>

                                    {/* Logo (lg-) */}
                                    <a
                                        href='/'
                                        className='lg:hidden'
                                    >
                                        <span className='sr-only'>Your Company</span>
                                        <img
                                            src='/logo-redondo.png'
                                            alt=''
                                            className='w-auto h-24'
                                        />
                                    </a>

                                    <div className='flex items-center justify-end flex-1'>
                                        <div className='flex items-center lg:ml-8'>
                                            <div className='flex space-x-8'>
                                                <div className='hidden lg:flex'>
                                                    <a
                                                        href='#'
                                                        className='p-2 -m-2 text-gray-400 hover:text-gray-500'
                                                    >
                                                        <span className='sr-only'>Buscar</span>
                                                        <MagnifyingGlassIcon
                                                            className='w-6 h-6 text-[#998779]'
                                                            aria-hidden='true'
                                                        />
                                                    </a>
                                                </div>

                                                <div className='flex'>
                                                    <a
                                                        href='#'
                                                        className='p-2 -m-2 text-gray-400 hover:text-gray-500'
                                                    >
                                                        <span className='sr-only'>Perfil</span>
                                                        <UserIcon
                                                            className='w-6 h-6 text-[#998779]'
                                                            aria-hidden='true'
                                                        />
                                                    </a>
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
