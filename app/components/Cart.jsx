import Image from 'next/image'
import React from 'react'
import { Fragment } from 'react'
import { ShoppingBagIcon } from '@heroicons/react/24/outline'
import { Popover, Transition } from '@headlessui/react'

const products = [
    {
        id: 1,
        name: 'Throwback Hip Bag',
        href: '#',
        color: 'Salmon',
        imageSrc: '/img/logoLunare.jpg',
        imageAlt: 'Salmon orange fabric pouch with match zipper, gray zipper pull, and adjustable hip belt.'
    },
    {
        id: 2,
        name: 'Medium Stuff Satchel',
        href: '#',
        color: 'Blue',
        imageSrc: '/img/logoLunare.jpg',
        imageAlt: 'Front of satchel with blue canvas body, black straps and handle, drawstring top, and front zipper pouch.'
    }
    // More products...
]

export default function Cart() {
    return (
        <div>
            {/* Cart */}
            <Popover className='flow-root text-sm lg:relative lg:ml-2'>
                <Popover.Button className='flex items-center p-2 -m-2 group'>
                    <ShoppingBagIcon
                        className='flex-shrink-0 w-6 h-6 text-[#998779] group-hover:text-[#938377]'
                        aria-hidden='true'
                    />
                    <span className='ml-2 text-sm font-medium text-[#998779] group-hover:text-[#938377]'>0</span>
                    <span className='sr-only'>items in cart, view bag</span>
                </Popover.Button>
                <Transition
                    as={Fragment}
                    enter='transition ease-out duration-200'
                    enterFrom='opacity-0'
                    enterTo='opacity-100'
                    leave='transition ease-in duration-150'
                    leaveFrom='opacity-100'
                    leaveTo='opacity-0'
                >
                    <Popover.Panel className='absolute inset-x-0 top-28 rounded-md ml-10 mr-3 mt-px bg-white pb-6 shadow-lg sm:px-2 lg:left-auto lg:right-0 lg:top-full lg:-mr-1.5 lg:mt-3 lg:w-80 lg:rounded-lg lg:ring-1 lg:ring-black lg:ring-opacity-5'>
                        <h2 className='sr-only'>Shopping Cart</h2>

                        <form className='max-w-2xl px-4 mx-auto'>
                            <ul
                                role='list'
                                className='divide-y divide-gray-200'
                            >
                                {products.map(product => (
                                    <li
                                        key={product.id}
                                        className='flex items-center py-6'
                                    >
                                        <Image
                                            src={product.imageSrc}
                                            alt={product.imageAlt}
                                            width={64}
                                            height={64}
                                            className='flex-none w-16 h-16 border border-gray-200 rounded-md'
                                        />
                                        <div className='flex-auto ml-4'>
                                            <h3 className='font-medium text-gray-900'>
                                                <a href={product.href}>{product.name}</a>
                                            </h3>
                                            <p className='text-gray-500'>{product.color}</p>
                                        </div>
                                    </li>
                                ))}
                            </ul>

                            <button
                                type='submit'
                                className='w-full px-4 py-2 text-sm font-medium text-white bg-[#998779] border border-transparent rounded-md shadow-sm hover:bg-[#938377] focus:outline-none focus:ring-2 focus:ring-[#938377] focus:ring-offset-2 focus:ring-offset-gray-50'
                            >
                                <a href='/checkout'>Ir al carrito</a>
                            </button>
                        </form>
                    </Popover.Panel>
                </Transition>
            </Popover>
        </div>
    )
}
