'use client'

import { EnvelopeIcon, ChatBubbleOvalLeftEllipsisIcon } from '@heroicons/react/24/outline'
import { Raleway } from 'next/font/google'
import Link from 'next/link'
import { useState } from 'react'
import Loading from './loading'
import axios from 'axios'

const raleway = Raleway({ subsets: ['latin'] })

export default function Contacto() {
  const [initialValues, setInitialValues] = useState({
    name: '',
    lastName: '',
    email: '',
    phone: '',
    message: ''
  })
  const [loading, setLoading] = useState(false)
  console.log(initialValues)

  const handlerSubmit = async () => {
    setLoading(true)
    try {
      const { data } = await axios.post('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(initialValues)
      })
      console.log(data)
    } catch (error) {
      console.log(error)
    } finally {
      setLoading(false)
    }
  }

  const validate = values => {
    const errors = {}
    if (!values.name) {
      errors.name = 'El nombre es requerido'
    }
    if (!values.email) {
      errors.email = 'El correo electrónico es requerido'
    } else if (!/\S+@\S+\.\S+/.test(values.email)) {
      errors.email = 'El correo electrónico es inválido'
    }
    if (!values.phone) {
      errors.phone = 'El teléfono es requerido'
    }
    if (!values.message) {
      errors.message = 'El mensaje es requerido'
    }
    return errors
  }

  return (
    <div className='relative bg-white pt-14 isolate'>
      {/* <NavBar /> */}
      <div className='grid grid-cols-1 mx-auto max-w-7xl lg:grid-cols-2'>
        <div className='relative px-6 pt-20 pb-12 lg:static lg:px-8'>
          <div className='max-w-xl mx-auto lg:mx-0 lg:max-w-lg'>
            <div className='absolute inset-y-0 left-0 w-full overflow-hidden bg-gray-100 -z-10 ring-1 ring-gray-900/10 lg:w-1/2'>
              <svg
                className='absolute inset-0 h-full w-full stroke-gray-200 [mask-image:radial-gradient(100%_100%_at_top_right,white,transparent)]'
                aria-hidden='true'
              >
                <defs>
                  <pattern
                    id='83fd4e5a-9d52-42fc-97b6-718e5d7ee527'
                    width={200}
                    height={200}
                    x='100%'
                    y={-1}
                    patternUnits='userSpaceOnUse'
                  >
                    <path
                      d='M130 200V.5M.5 .5H200'
                      fill='none'
                    />
                  </pattern>
                </defs>
                <rect
                  width='100%'
                  height='100%'
                  strokeWidth={0}
                  fill='white'
                />
                <svg
                  x='100%'
                  y={-1}
                  className='overflow-visible fill-gray-50'
                >
                  <path
                    d='M-470.5 0h201v201h-201Z'
                    strokeWidth={0}
                  />
                </svg>
                <rect
                  width='100%'
                  height='100%'
                  strokeWidth={0}
                  fill='url(#83fd4e5a-9d52-42fc-97b6-718e5d7ee527)'
                />
              </svg>
            </div>
            <h2 className={` ${raleway.className} text-3xl font-bold tracking-tight text-gray-900`}>Contacto</h2>
            <p className='mt-6 text-lg leading-8 text-gray-600'>
              Ante cualquier duda o consulta, envianos un mensaje directo a nuestro instagram{' '}
              <Link
                href='https://www.instagram.com/lunarejewelry_/'
                className='border-b hover:scale-110 transition-all border-transparent hover:border-[#998779] hover:text-[#998779] '
                target='_blank'
              >
                @lunarejewelry_
              </Link>
            </p>
            <dl className='mt-10 space-y-4 text-base leading-7 text-gray-600'>
              <div className='flex gap-x-4'>
                <dt className='flex-none'>
                  <span className='sr-only'>Telefono</span>
                  <ChatBubbleOvalLeftEllipsisIcon
                    className='w-6 text-gray-400 h-7'
                    aria-hidden='true'
                  />
                </dt>
                <dd>
                  <Link
                    className='hover:text-gray-900'
                    href='https://wa.me/+542954476558'
                    target='_blank'
                  >
                    +54 2954-476558
                  </Link>
                </dd>
              </div>
              <div className='flex gap-x-4'>
                <dt className='flex-none'>
                  <span className='sr-only'>Email</span>
                  <EnvelopeIcon
                    className='w-6 text-gray-400 h-7'
                    aria-hidden='true'
                  />
                </dt>
                <dd>
                  <Link
                    className='hover:text-gray-900'
                    href='mailto:lunarejewelry.shop@gmail.com'
                  >
                    lunarejewelry.shop@gmail.com
                  </Link>
                </dd>
              </div>
            </dl>
          </div>
        </div>
        <form
          action='#'
          method='POST'
          className='px-6 pt-20 pb-12 sm:pb-12 lg:px-8'
        >
          <div className='max-w-xl mx-auto lg:mr-0 lg:max-w-lg'>
            <div className='grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2'>
              <div>
                <label
                  htmlFor='first-name'
                  className={` ${raleway.className} block text-sm font-semibold leading-6 text-gray-900`}
                >
                  Nombre
                </label>
                <div className='mt-2.5'>
                  <input
                    type='text'
                    required
                    onChange={e => setInitialValues({ ...initialValues, name: e.target.value })}
                    name='first-name'
                    id='first-name'
                    autoComplete='given-name'
                    className='block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
                  />
                </div>
              </div>
              <div>
                <label
                  htmlFor='last-name'
                  className={` ${raleway.className} block text-sm font-semibold leading-6 text-gray-900`}
                >
                  Apellido
                </label>
                <div className='mt-2.5'>
                  <input
                    type='text'
                    name='last-name'
                    required
                    onChange={e => setInitialValues({ ...initialValues, lastName: e.target.value })}
                    id='last-name'
                    autoComplete='family-name'
                    className='block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
                  />
                </div>
              </div>
              <div className='sm:col-span-2'>
                <label
                  htmlFor='email'
                  className={` ${raleway.className} block text-sm font-semibold leading-6 text-gray-900`}
                >
                  Email
                </label>
                <div className='mt-2.5'>
                  <input
                    type='email'
                    name='email'
                    id='email'
                    required
                    onChange={e => setInitialValues({ ...initialValues, email: e.target.value })}
                    autoComplete='email'
                    className='block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
                  />
                </div>
              </div>
              <div className='sm:col-span-2'>
                <label
                  htmlFor='telephone'
                  className={` ${raleway.className} block text-sm font-semibold leading-6 text-gray-900`}
                >
                  Telefono
                </label>
                <div className='mt-2.5'>
                  <input
                    type='tel'
                    name='telephone'
                    id='telephone'
                    required
                    onChange={e => setInitialValues({ ...initialValues, phone: e.target.value })}
                    autoComplete='telephone'
                    className='block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
                  />
                </div>
              </div>
              <div className='sm:col-span-2'>
                <label
                  htmlFor='message'
                  className={` ${raleway.className} block text-sm font-semibold leading-6 text-gray-900`}
                >
                  Mensaje
                </label>
                <div className='mt-2.5'>
                  <textarea
                    name='message'
                    id='message'
                    required
                    onChange={e => setInitialValues({ ...initialValues, message: e.target.value })}
                    rows={4}
                    className='block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
                    defaultValue={''}
                  />
                </div>
              </div>
            </div>
            <div className='flex justify-end mt-8'>
              <button
                type='button'
                onClick={handlerSubmit}
                disabled={!initialValues.name || !initialValues.lastName || !initialValues.email || !initialValues.phone || !initialValues.message}
                className='rounded-md bg-[#998779] min-w-[130px] px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-[#938377] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#998779]'
              >
                {loading ? <Loading /> : 'Enviar mensaje'}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}
