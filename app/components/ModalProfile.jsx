import { Transition, Popover } from '@headlessui/react'
import { XMarkIcon, UserIcon } from '@heroicons/react/24/outline'
import { Fragment } from 'react'
import { useAuth } from '../context/authContext'
import Link from 'next/link'

function ModalProfile({ show, handleClose, handlerOpen }) {
  const { logout, user, loading } = useAuth()

  const handleLogout = async () => {
    await logout()
    handleClose()
    window.location.href = '/'
  }
  return (
    <div>
      <Popover className='relative flow-root text-sm lg:ml-2'>
        <Popover.Button
          onClick={handlerOpen}
          className='flex items-center p-2 -m-2 group'
        >
          <UserIcon
            className='flex-shrink-0 w-6 h-6 text-black'
            aria-hidden='true'
          />
          <span className='ml-2 text-sm font-medium text-[#998779] group-hover:text-[#938377]'></span>
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
          <Popover.Panel className='absolute h-64 px-4 pb-6 bg-white rounded-md shadow-lg w-72 -right-12 top-12 sm:px-2 lg:left-auto lg:top-full lg:-mr-10 lg:mt-3 lg:rounded-lg lg:ring-1 lg:ring-black lg:ring-opacity-5'>
            <div className='flex items-center px-2 pt-2'>
              <h2 className='pt-2 text-base font-medium'>Cuenta</h2>
              <Popover.Button
                onClick={handleClose}
                className='absolute items-center p-2 text-gray-500 top-2 right-2 hover:text-gray-600'
              >
                <span className='sr-only'>Close menu</span>
                <XMarkIcon
                  className='flex items-center justify-center w-6 h-6'
                  aria-hidden='true'
                />
              </Popover.Button>
            </div>

            {user ? (
              <div className='flex flex-col items-center justify-start w-full h-full'>
                {user.photoURL ? (
                  <img
                    src={user.photoURL}
                    alt=''
                    className='mb-2 rounded-full w-14 h-14'
                  />
                ) : (
                  <img
                    src='https://res.cloudinary.com/ds7hhoq17/image/upload/v1716665302/Logo/blank-profile-picture-973460_640_iqozex.png'
                    alt=''
                    className='mb-2 rounded-full w-14 h-14'
                  />
                )}
                <span className='inline-flex items-center px-2 py-1 my-2 text-xs font-medium text-green-400 rounded-md py bg-green-500/10 ring-1 ring-inset ring-green-500/20'>Usuario</span>
                <h3 className='text-lg font-semibold text-gray-900'>{user.displayName}</h3>
                <h5 className='text-sm font-normal text-gray-900'>{user.email}</h5>
                <button
                  onClick={handleLogout}
                  className='w-full px-4 pb-2 mt-2 pt-2 text-sm font-medium text-white bg-[#938377] border border-transparent rounded-md shadow-sm hover:bg-[#e2d0c2] focus:outline-none focus:ring-2 focus:ring-[#938377] focus:ring-offset-2 focus:ring-offset-gray-50'
                >
                  Cerrar sesión
                </button>
              </div>
            ) : (
              <div className='flex flex-col items-center justify-start w-full h-full'>
                <h2 className='flex items-center justify-center py-2 mb-4 text-lg font-medium text-gray-900 '>Perfil</h2>
                <Link href='/login'>
                  <p className='w-full px-4 py-2 text-sm font-medium text-white bg-[#e2d0c2] border border-transparent rounded-md shadow-sm hover:bg-[#938377] focus:outline-none focus:ring-2 focus:ring-[#938377] focus:ring-offset-2 focus:ring-offset-gray-50'>
                    Iniciar sesión
                  </p>
                </Link>
              </div>
            )}
          </Popover.Panel>
        </Transition>
      </Popover>
    </div>
  )
}

export default ModalProfile
