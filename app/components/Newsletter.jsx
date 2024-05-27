import React from 'react'
import { Raleway } from 'next/font/google'

const raleway = Raleway({ subsets: ['latin'] })
function Newsletter() {
  return (
    <div className='pb-10 bg-white'>
      <div className='mx-auto text-black max-w-7xl sm:px-6 lg:px-8'>
        <div className='relative flex flex-col gap-10 px-6 py-24 overflow-hidden bg-white shadow-2xl isolate sm:rounded-3xl sm:px-20'>
          <h2 className={` ${raleway.className} max-w-2xl text-3xl font-semibold tracking-tight text-black pl sm:text-4xl xl:max-w-none xl:flex-auto`}>¡Suscribite! Accedé a novedades sobre nuestros productos & descuentos.</h2>
          <form className='w-full max-w-md'>
            <div className='flex gap-x-4'>
              <label
                htmlFor='email-address'
                className='sr-only'
              >
                Email address
              </label>
              <input
                id='email-address'
                name='email'
                type='email'
                autoComplete='email'
                required
                className='min-w-0 flex-auto rounded-md border-0 bg-white/5 px-3.5 py-2 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-white sm:text-sm sm:leading-6'
                placeholder='Ingresa tu email'
              />
              <button
                type='submit'
                className='flex-none rounded-md bg-[#e2d0c2] px-3.5 py-2.5 text-sm font-semibold text-gray-900 shadow-sm hover:bg-[#938377] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white'
              >
                Suscribirme
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Newsletter
