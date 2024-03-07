import React from 'react'
import { Raleway } from 'next/font/google'

const collections = [
  {
    name: 'Aros',
    description: 'Aros de plata y oro',
    imageSrc: 'https://tailwindui.com/img/ecommerce-images/home-page-02-edition-01.jpg',
    imageAlt: 'Desk with leather desk pad, walnut desk organizer, wireless keyboard and mouse, and porcelain mug.',
    href: '#'
  },
  {
    name: 'pulseras',
    description: 'Pulseras de plata',
    imageSrc: 'https://tailwindui.com/img/ecommerce-images/home-page-02-edition-02.jpg',
    imageAlt: 'Wood table with porcelain mug, leather journal, brass pen, leather key ring, and a houseplant.',
    href: '#'
  },
  {
    name: 'Dijes',
    description: 'Dijes de plata',
    imageSrc: 'https://tailwindui.com/img/ecommerce-images/home-page-02-edition-03.jpg',
    imageAlt: 'Collection of four insulated travel bottles on wooden shelf.',
    href: '#'
  },
  {
    name: 'Cadenas',
    description: 'Cadenas de plata',
    imageSrc: 'https://tailwindui.com/img/ecommerce-images/home-page-02-edition-03.jpg',
    imageAlt: 'Collection of four insulated travel bottles on wooden shelf.',
    href: '#'
  }
]

const raleway = Raleway({ subsets: ['latin'] })

export default function Collections() {
  return (
    <section
      aria-labelledby='collections-heading'
      className='bg-[#F4E8D8]'
    >
      <div className='px-4 mx-auto max-w-7xl sm:px-6 lg:px-8'>
        <div className='max-w-2xl py-16 mx-auto sm:py-24 lg:max-w-none lg:py-32'>
          <h2
            id='collections-heading'
            className={` ${raleway.className} text-2xl font-bold text-gray-900`}
          >
            Categorias
          </h2>

          <div className='mt-6 space-y-12 lg:grid lg:grid-cols-4 lg:gap-x-6 lg:space-y-0'>
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
  )
}
