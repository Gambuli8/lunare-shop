'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useAuth } from '../context/authContext'
import Swal from 'sweetalert2'
import { Raleway } from 'next/font/google'

const raleway = Raleway({ subsets: ['latin'] })
export default function Register() {
  const { signUp, loginWithGoogle } = useAuth()
  const [user, setUser] = useState({
    username: '',
    email: '',
    password: ''
  })

  const handlerChange = e => {
    setUser({
      ...user,
      [e.target.name]: e.target.value
    })
  }

  const handlerGoogle = async () => {
    try {
      await loginWithGoogle()
      Swal.fire({
        icon: 'success',
        title: 'Bienvenido',
        text: 'Has iniciado sesion',
        confirmButtonColor: '#998779'
      }).then(() => {
        window.location.href = '/'
      })
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Hubo un error',
        confirmButtonColor: '#998779'
      })
    }
  }

  const handlerSubmit = async e => {
    e.preventDefault()
    try {
      await signUp(user.username, user.email, user.password)
      Swal.fire({
        icon: 'success',
        title: 'Cuenta creada',
        text: 'Ya puedes iniciar sesion',
        confirmButtonColor: '#998779'
      }).then(() => {
        window.location.href = '/login'
      })
    } catch (error) {
      if (error.code === 'auth/email-already-in-use') {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'El usuario ya existe',
          confirmButtonColor: '#998779',
          confirmButtonText: 'iniciar sesion'
        }).then(() => {
          window.location.href = '/login'
        })
      }
      if (error.code === 'auth/weak-password') {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'La contraseña es muy corta',
          confirmButtonColor: '#998779'
        })
      }
      if (error.code === 'auth/invalid-email') {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'El correo no es valido',
          confirmButtonColor: '#998779'
        })
      }
      if (error.code === 'auth/operation-not-allowed') {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Ha habido un error',
          confirmButtonColor: '#998779'
        })
      }
    }
  }

  return (
    <>
      <div className={` ${raleway.className} flex flex-col justify-center flex-1 min-h-full pb-6 pt-28 sm:px-6 lg:px-8`}>
        {/* <a href='/'>
          <ArrowLeftCircleIcon className='w-12 md:w-14 h-auto px-1 text-[#998779] hover:scale-105 transition-all' />
        </a> */}

        <div className=' sm:mx-auto sm:w-full sm:max-w-[480px]'>
          <div className='px-6 py-4 bg-white shadow sm:rounded-lg sm:px-12'>
            <form
              onSubmit={handlerSubmit}
              className='space-y-6'
              action='#'
              method='POST'
            >
              <div>
                <label
                  htmlFor='username'
                  className='block text-sm font-medium leading-6 text-gray-900'
                >
                  Nombre de usuario
                </label>
                <div className='mt-2'>
                  <input
                    id='username'
                    name='username'
                    placeholder='Ingresa tu nombre de usuario'
                    type='username'
                    maxLength={10}
                    autoComplete='username'
                    onChange={handlerChange}
                    className='block w-full px-3 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#998779] sm:text-sm sm:leading-6'
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor='email'
                  className='block text-sm font-medium leading-6 text-gray-900'
                >
                  Email
                </label>
                <div className='mt-2'>
                  <input
                    id='email'
                    placeholder='Ingresa tu correo'
                    name='email'
                    type='email'
                    autoComplete='email'
                    onChange={handlerChange}
                    className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#998779] sm:text-sm sm:leading-6'
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor='password'
                  className='block text-sm font-medium leading-6 text-gray-900'
                >
                  Contraseña
                </label>
                <div className='mt-2'>
                  <input
                    id='password'
                    name='password'
                    placeholder='Ingresa tu contraseña'
                    type='password'
                    onChange={handlerChange}
                    autoComplete='current-password'
                    required
                    className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#998779] sm:text-sm sm:leading-6'
                  />
                </div>
              </div>
              <div>
                <button
                  type='submit'
                  className='flex w-full justify-center rounded-md bg-[#998779] px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-[#998779] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#998779]'
                >
                  Registrarme
                </button>
              </div>
            </form>

            <div>
              <div className='relative mt-10'>
                <div
                  className='absolute inset-0 flex items-center'
                  aria-hidden='true'
                >
                  <div className='w-full border-t border-gray-200' />
                </div>
                <div className='relative flex justify-center text-sm font-medium leading-6'>
                  <span className='px-6 text-gray-900 bg-white'>O continuar con</span>
                </div>
              </div>

              <div className='grid grid-cols-2 gap-4 mt-6'>
                <button
                  onClick={handlerGoogle}
                  className='flex items-center justify-center w-full gap-3 px-3 py-2 text-sm font-semibold text-gray-900 bg-white rounded-md shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus-visible:ring-transparent'
                >
                  <svg
                    className='w-5 h-5'
                    aria-hidden='true'
                    viewBox='0 0 24 24'
                  >
                    <path
                      d='M12.0003 4.75C13.7703 4.75 15.3553 5.36002 16.6053 6.54998L20.0303 3.125C17.9502 1.19 15.2353 0 12.0003 0C7.31028 0 3.25527 2.69 1.28027 6.60998L5.27028 9.70498C6.21525 6.86002 8.87028 4.75 12.0003 4.75Z'
                      fill='#EA4335'
                    />
                    <path
                      d='M23.49 12.275C23.49 11.49 23.415 10.73 23.3 10H12V14.51H18.47C18.18 15.99 17.34 17.25 16.08 18.1L19.945 21.1C22.2 19.01 23.49 15.92 23.49 12.275Z'
                      fill='#4285F4'
                    />
                    <path
                      d='M5.26498 14.2949C5.02498 13.5699 4.88501 12.7999 4.88501 11.9999C4.88501 11.1999 5.01998 10.4299 5.26498 9.7049L1.275 6.60986C0.46 8.22986 0 10.0599 0 11.9999C0 13.9399 0.46 15.7699 1.28 17.3899L5.26498 14.2949Z'
                      fill='#FBBC05'
                    />
                    <path
                      d='M12.0004 24.0001C15.2404 24.0001 17.9654 22.935 19.9454 21.095L16.0804 18.095C15.0054 18.82 13.6204 19.245 12.0004 19.245C8.8704 19.245 6.21537 17.135 5.2654 14.29L1.27539 17.385C3.25539 21.31 7.3104 24.0001 12.0004 24.0001Z'
                      fill='#34A853'
                    />
                  </svg>
                  <span className='text-sm font-semibold leading-6'> Google</span>
                </button>
                {/* </Link> */}
                <button className='flex items-center justify-center w-full gap-3 px-3 py-2 text-sm font-semibold text-gray-900 bg-white rounded-md shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus-visible:ring-transparent'>
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    width='24'
                    height='24'
                    viewBox='0 0 24 24'
                  >
                    <path
                      fill='#000000'
                      d='m15.079 5.999l.239.012c1.43.097 3.434 1.013 4.508 2.586a1 1 0 0 1-.344 1.44c-.05.028-.372.158-.497.217a4 4 0 0 0-.722.431c-.614.461-.948 1.009-.942 1.694c.01.885.339 1.454.907 1.846c.208.143.436.253.666.33c.126.043.426.116.444.122a1 1 0 0 1 .662.942C20 18.24 16.96 22 14.714 22c-.79 0-1.272-.091-1.983-.315l-.098-.031c-.463-.146-.702-.192-1.133-.192c-.52 0-.863.06-1.518.237l-.197.053c-.575.153-.964.226-1.5.248C5.536 22 3 16.907 3 12.928c0-3.87 1.786-6.92 5.286-6.92q.444.002.909.128c.403.107.774.26 1.296.508c.787.374.948.44 1.009.44h.016c.03-.003.128-.047 1.056-.457c1.061-.467 1.864-.685 2.746-.616l-.24-.012zM14 1a1 1 0 0 1 1 1a3 3 0 0 1-3 3a1 1 0 0 1-1-1a3 3 0 0 1 3-3'
                    />
                  </svg>
                  <span className='text-sm font-semibold leading-6'>Apple</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
