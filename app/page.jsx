'use client'

import Footer from './components/footer'
import { Raleway, Italiana } from 'next/font/google'
import 'react-loading-skeleton/dist/skeleton.css'
import ProductTrending from './components/productTrending'
import Sale from './components/sale'
import Link from 'next/link'
import Newsletter from './components/Newsletter'

const raleway = Raleway({ subsets: ['latin'] })
const italiano = Italiana({ subsets: ['latin'], weight: '400' })

export default function Home() {
  return (
    <div className='bg-white'>
      <main>
        {/* Hero */}
        <div className='flex flex-col border-b border-gray-200 lg:border-0'>
          <div className='relative'>
            <div
              aria-hidden='true'
              className='absolute hidden w-1/2 h-full bg-white lg:block'
            />
            <div className='relative mt-16 bg-white lg:bg-transparent'>
              <div className='px-4 mx-auto max-w-7xl sm:px-6 lg:grid lg:grid-cols-2 lg:px-8'>
                <div className='max-w-2xl py-24 mx-auto lg:max-w-none lg:py-64'>
                  <div className='lg:pr-16'>
                    <h1 className={`text-4xl ${italiano.className} tracking-tight text-gray-900 sm:text-5xl xl:text-7xl`}>Lunare Jewelry</h1>
                    <p className={` ${raleway.className} mt-2 md:mt-4 text-sm md:text-lg text-gray-600`}>Cada joya, una expresión de tu estilo.</p>
                    <div className='mt-6'>
                      <Link
                        href='/productos'
                        className='inline-block px-8 py-3 font-medium text-white bg-[#e2d0c2] border border-transparent rounded-md hover:bg-[#e2c9b5]'
                      >
                        Comprar
                      </Link>
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
        <ProductTrending />
        {/* Newsletter */}
        <Newsletter />
        {/* Sale and testimonials */}
        <Sale />
      </main>
      {/* Footer */}
      <Footer />
    </div>
  )
}
