import React from 'react'

export default function Sale() {
  return (
    <div className='relative my-10 overflow-hidden'>
      {/* Decorative background image and gradient */}
      <div
        aria-hidden='true'
        className='absolute inset-0'
      >
        <div className='absolute inset-0 mx-auto overflow-hidden max-w-7xl xl:px-8'>
          <img
            src='https://res.cloudinary.com/ds7hhoq17/image/upload/v1708557793/Logo/image-descuento_s66jwt.jpg'
            alt=''
            className='object-cover object-center w-full h-full rounded-md'
          />
        </div>
        <div className='absolute inset-0 bg-white bg-opacity-50' />
        <div className='absolute inset-0 bg-gradient-to-t ' />
      </div>

      {/* Sale */}
      <section
        aria-labelledby='sale-heading'
        className='relative flex flex-col items-center justify-center px-4 py-20 mx-auto text-center max-w-7xl sm:px-6 lg:px-8'
      >
        <div className='max-w-2xl mx-auto lg:max-w-none'>
          <h2
            id='sale-heading'
            className='text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl lg:text-6xl'
          >
            15% off pagando en efectivo
          </h2>
          <p className='max-w-xl mx-auto my-4 text-xl text-gray-600'>{''}</p>
        </div>
      </section>
    </div>
  )
}
