'use client'

import NavBar from './NavBar'
import Footer from './footer'
import { Raleway, Roboto } from 'next/font/google'

const trendingProducts = [
    {
        id: 1,
        name: 'Machined Pen',
        color: 'Black',
        price: '$35',
        href: '#',
        imageSrc: 'https://tailwindui.com/img/ecommerce-images/home-page-02-product-01.jpg',
        imageAlt: 'Black machined steel pen with hexagonal grip and small white logo at top.',
        availableColors: [
            { name: 'Black', colorBg: '#111827' },
            { name: 'Brass', colorBg: '#FDE68A' },
            { name: 'Chrome', colorBg: '#E5E7EB' }
        ]
    }
    // More products...
]
const collections = [
    {
        name: 'Desk and Office',
        description: 'Work from home accessories',
        imageSrc: 'https://tailwindui.com/img/ecommerce-images/home-page-02-edition-01.jpg',
        imageAlt: 'Desk with leather desk pad, walnut desk organizer, wireless keyboard and mouse, and porcelain mug.',
        href: '#'
    },
    {
        name: 'Self-Improvement',
        description: 'Journals and note-taking',
        imageSrc: 'https://tailwindui.com/img/ecommerce-images/home-page-02-edition-02.jpg',
        imageAlt: 'Wood table with porcelain mug, leather journal, brass pen, leather key ring, and a houseplant.',
        href: '#'
    },
    {
        name: 'Travel',
        description: 'Daily commute essentials',
        imageSrc: 'https://tailwindui.com/img/ecommerce-images/home-page-02-edition-03.jpg',
        imageAlt: 'Collection of four insulated travel bottles on wooden shelf.',
        href: '#'
    }
]
const testimonials = [
    {
        id: 1,
        quote: 'My order arrived super quickly. The product is even better than I hoped it would be. Very happy customer over here!',
        attribution: 'Sarah Peters, New Orleans'
    },
    {
        id: 2,
        quote: 'I had to return a purchase that didn’t fit. The whole process was so simple that I ended up ordering two new items!',
        attribution: 'Kelly McPherson, Chicago'
    },
    {
        id: 3,
        quote: 'Now that I’m on holiday for the summer, I’ll probably order a few more shirts. It’s just so convenient, and I know the quality will always be there.',
        attribution: 'Chris Paul, Phoenix'
    }
]
const footerNavigation = {
    products: [
        { name: 'Bags', href: '#' },
        { name: 'Tees', href: '#' },
        { name: 'Objects', href: '#' },
        { name: 'Home Goods', href: '#' },
        { name: 'Accessories', href: '#' }
    ],
    customerService: [
        { name: 'Contact', href: '#' },
        { name: 'Shipping', href: '#' },
        { name: 'Returns', href: '#' },
        { name: 'Warranty', href: '#' },
        { name: 'Secure Payments', href: '#' },
        { name: 'FAQ', href: '#' },
        { name: 'Find a store', href: '#' }
    ],
    company: [
        { name: 'Who we are', href: '#' },
        { name: 'Sustainability', href: '#' },
        { name: 'Press', href: '#' },
        { name: 'Careers', href: '#' },
        { name: 'Terms & Conditions', href: '#' },
        { name: 'Privacy', href: '#' }
    ],
    legal: [
        { name: 'Terms of Service', href: '#' },
        { name: 'Return Policy', href: '#' },
        { name: 'Privacy Policy', href: '#' },
        { name: 'Shipping Policy', href: '#' }
    ],
    bottomLinks: [
        { name: 'Accessibility', href: '#' },
        { name: 'Privacy', href: '#' },
        { name: 'Terms', href: '#' }
    ]
}

const raleway = Raleway({ subsets: ['latin'] })
const roboto = Roboto({ subsets: ['latin'], weight: '500' })

export default function Home() {
    return (
        <div className='bg-white'>
            {/* Header */}
            {/* <NavBar /> */}

            <main>
                {/* Hero */}
                <div className='flex flex-col border-b border-gray-200 lg:border-0'>
                    <div className='relative'>
                        <div
                            aria-hidden='true'
                            className='absolute hidden w-1/2 h-full bg-[#F4E8D8] lg:block'
                        />
                        <div className='relative bg-gray-100 lg:bg-transparent'>
                            <div className='px-4 mx-auto max-w-7xl sm:px-6 lg:grid lg:grid-cols-2 lg:px-8'>
                                <div className='max-w-2xl py-24 mx-auto lg:max-w-none lg:py-64'>
                                    <div className='lg:pr-16'>
                                        <h1 className={`text-4xl ${roboto.className} font-bold tracking-tight text-gray-900 sm:text-5xl xl:text-6xl`}>Lunare Jewelry</h1>
                                        <p className={` ${raleway.className} mt-4 text-lg text-gray-600`}>Cada joya, una expresión de tu estilo.</p>
                                        <div className='mt-6'>
                                            <a
                                                href='#'
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
                                src='/fondo-aritos1.jpg'
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
                                className='text-2xl font-bold tracking-tight text-gray-900'
                            >
                                Trending products
                            </h2>
                        </div>

                        <div className='relative mt-8'>
                            <div className='relative w-full overflow-x-auto'>
                                <ul
                                    role='list'
                                    className='inline-flex mx-4 space-x-8 sm:mx-6 lg:mx-0 lg:grid lg:grid-cols-4 lg:gap-x-8 lg:space-x-0'
                                >
                                    {trendingProducts.map(product => (
                                        <li
                                            key={product.id}
                                            className='inline-flex flex-col w-64 text-center lg:w-auto'
                                        >
                                            <div className='relative group'>
                                                <div className='w-full overflow-hidden bg-gray-200 rounded-md aspect-h-1 aspect-w-1'>
                                                    <img
                                                        src={product.imageSrc}
                                                        alt={product.imageAlt}
                                                        className='object-cover object-center w-full h-full group-hover:opacity-75'
                                                    />
                                                </div>
                                                <div className='mt-6'>
                                                    <p className='text-sm text-gray-500'>{product.color}</p>
                                                    <h3 className='mt-1 font-semibold text-gray-900'>
                                                        <a href={product.href}>
                                                            <span className='absolute inset-0' />
                                                            {product.name}
                                                        </a>
                                                    </h3>
                                                    <p className='mt-1 text-gray-900'>{product.price}</p>
                                                </div>
                                            </div>

                                            <h4 className='sr-only'>Available colors</h4>
                                            <ul
                                                role='list'
                                                className='flex items-center justify-center pt-6 mt-auto space-x-3'
                                            >
                                                {product.availableColors.map(color => (
                                                    <li
                                                        key={color.name}
                                                        className='w-4 h-4 border border-black rounded-full border-opacity-10'
                                                        style={{ backgroundColor: color.colorBg }}
                                                    >
                                                        <span className='sr-only'>{color.name}</span>
                                                    </li>
                                                ))}
                                            </ul>
                                        </li>
                                    ))}
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
                                className='text-2xl font-bold text-gray-900'
                            >
                                Collections
                            </h2>

                            <div className='mt-6 space-y-12 lg:grid lg:grid-cols-3 lg:gap-x-6 lg:space-y-0'>
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
                                src='/image-descuento.jpg'
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
                            <p className='max-w-xl mx-auto mt-4 text-xl text-gray-600'>Most of our products are limited releases that won t come back. Get your favorite items while they re in stock.</p>
                            <a
                                href='#'
                                className='inline-block w-full px-8 py-3 mt-6 font-medium text-white bg-gray-900 border border-transparent rounded-md hover:bg-gray-800 sm:w-auto'
                            >
                                Get access to our one-time sale
                            </a>
                        </div>
                    </section>
                </div>
            </main>

            {/* Footer */}
            <Footer />
        </div>
    )
}
