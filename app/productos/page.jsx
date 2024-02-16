'use client'

import { Fragment, useState } from 'react'
import { Disclosure, Menu, Transition, Dialog, Popover } from '@headlessui/react'
import { ChevronDownIcon, FunnelIcon, StarIcon, XMarkIcon } from '@heroicons/react/20/solid'

// const filtersPrice = {
//     price: [
//         { value: '0', label: '$0 - $25', checked: false },
//         { value: '25', label: '$25 - $50', checked: false },
//         { value: '50', label: '$50 - $75', checked: false },
//         { value: '75', label: '$75+', checked: false }
//     ],
//     color: [
//         { value: 'white', label: 'White', checked: false },
//         { value: 'beige', label: 'Beige', checked: false },
//         { value: 'blue', label: 'Blue', checked: true },
//         { value: 'brown', label: 'Brown', checked: false },
//         { value: 'green', label: 'Green', checked: false },
//         { value: 'purple', label: 'Purple', checked: false }
//     ],
//     size: [
//         { value: 'xs', label: 'XS', checked: false },
//         { value: 's', label: 'S', checked: true },
//         { value: 'm', label: 'M', checked: false },
//         { value: 'l', label: 'L', checked: false },
//         { value: 'xl', label: 'XL', checked: false },
//         { value: '2xl', label: '2XL', checked: false }
//     ],
//     category: [
//         { value: 'all-new-arrivals', label: 'All New Arrivals', checked: false },
//         { value: 'tees', label: 'Tees', checked: false },
//         { value: 'objects', label: 'Objects', checked: false },
//         { value: 'sweatshirts', label: 'Sweatshirts', checked: false },
//         { value: 'pants-and-shorts', label: 'Pants & Shorts', checked: false }
//     ]
// }
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
const products = [
    {
        id: 1,
        name: 'Organize Basic Set (Walnut)',
        price: '$149',
        rating: 5,
        reviewCount: 38,
        imageSrc: 'https://tailwindui.com/img/ecommerce-images/category-page-05-image-card-01.jpg',
        imageAlt: 'TODO',
        href: '#'
    },
    {
        id: 2,
        name: 'Organize Pen Holder',
        price: '$15',
        rating: 5,
        reviewCount: 18,
        imageSrc: 'https://tailwindui.com/img/ecommerce-images/category-page-05-image-card-02.jpg',
        imageAlt: 'TODO',
        href: '#'
    },
    {
        id: 3,
        name: 'Organize Sticky Note Holder',
        price: '$15',
        rating: 5,
        reviewCount: 14,
        imageSrc: 'https://tailwindui.com/img/ecommerce-images/category-page-05-image-card-03.jpg',
        imageAlt: 'TODO',
        href: '#'
    },
    {
        id: 4,
        name: 'Organize Phone Holder',
        price: '$15',
        rating: 4,
        reviewCount: 21,
        imageSrc: 'https://tailwindui.com/img/ecommerce-images/category-page-05-image-card-04.jpg',
        imageAlt: 'TODO',
        href: '#'
    }
    // More products...
]
const activeFilters = [{ value: 'objects', label: 'Objects' }]

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

export default function Products() {
    const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false)
    return (
        <div className='bg-white'>
            <div>
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
                <div className='px-4 py-16 text-center sm:px-6 lg:px-8'>
                    <h1 className='text-4xl font-bold tracking-tight text-gray-900'>Workspace</h1>
                    <p className='max-w-xl mx-auto mt-4 text-base text-gray-500'>The secret to a tidy desk? Don t get rid of anything, just put it in really really nice looking containers.</p>
                </div>

                {/* Filters */}
                <section aria-labelledby='filter-heading'>
                    <h2
                        id='filter-heading'
                        className='sr-only'
                    >
                        Filters
                    </h2>

                    <div className='pb-4 bg-white border-b border-gray-200'>
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
                                                    {sectionIdx === 0 ? <span className='ml-1.5 rounded bg-gray-200 px-1.5 py-0.5 text-xs font-semibold tabular-nums text-gray-700'>1</span> : null}
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
                    <div className='bg-gray-100'>
                        <div className='px-4 py-3 mx-auto max-w-7xl sm:flex sm:items-center sm:px-6 lg:px-8'>
                            <h3 className='text-sm font-medium text-gray-500'>
                                Filters
                                <span className='sr-only'>, active</span>
                            </h3>

                            <div
                                aria-hidden='true'
                                className='hidden w-px h-5 bg-gray-300 sm:ml-4 sm:block'
                            />

                            <div className='mt-2 sm:ml-4 sm:mt-0'>
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

                    <div className='grid grid-cols-2 -mx-px border-l border-gray-200 sm:mx-0 md:grid-cols-3 lg:grid-cols-4'>
                        {products.map(product => (
                            <div
                                key={product.id}
                                className='relative p-4 border-b border-r border-gray-200 group sm:p-6'
                            >
                                <div className='flex items-end justify-center overflow-hidden bg-gray-200 rounded-lg aspect-h-1 aspect-w-1 '>
                                    <button className='absolute z-20 mb-5'>
                                        <a href='/productos/1'>ver producto</a>
                                    </button>
                                    <img
                                        src={product.imageSrc}
                                        alt={product.imageAlt}
                                        className='z-10 object-cover object-center w-full h-full group-hover:opacity-75'
                                    />
                                </div>
                                <div className='pt-10 pb-4 text-center'>
                                    <h3 className='text-sm font-medium text-gray-900'>
                                        <a href={product.href}>
                                            <span
                                                aria-hidden='true'
                                                className='absolute inset-0'
                                            />
                                            {product.name}
                                        </a>
                                    </h3>
                                    <div className='flex flex-col items-center mt-3'>
                                        <p className='mt-1 text-sm text-gray-500'>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
                                    </div>
                                    <p className='mt-4 text-base font-medium text-gray-900'>{product.price}</p>
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
