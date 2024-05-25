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
            className='flex-shrink-0 w-6 h-6 text-[#998779] group-hover:text-[#938377]'
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
          <Popover.Panel className='absolute right-0 pb-6 mt-px ml-10 mr-3 bg-white rounded-md shadow-lg top-12 sm:px-2 lg:left-auto lg:top-full lg:-mr-10 lg:mt-3 w-80 lg:rounded-lg lg:ring-1 lg:ring-black lg:ring-opacity-5'>
            {user ? (
              <div>
                <h2 className='flex items-center justify-center py-2 mb-4 text-lg font-medium text-gray-900 '>Perfil</h2>
                <p className='mb-2'>
                  <strong>Nombre:</strong> {user.displayName}
                </p>
                <p className='mb-2'>
                  <strong>Email:</strong> {user.email}
                </p>
                <button
                  onClick={handleLogout}
                  className='w-full px-4 py-2 text-sm font-medium text-white bg-[#998779] border border-transparent rounded-md shadow-sm hover:bg-[#938377] focus:outline-none focus:ring-2 focus:ring-[#938377] focus:ring-offset-2 focus:ring-offset-gray-50'
                >
                  Cerrar sesión
                </button>
              </div>
            ) : (
              <div className='flex flex-col items-center justify-center'>
                <h2 className='flex items-center justify-center py-2 mb-4 text-lg font-medium text-gray-900 '>Perfil</h2>
                <Link href='/login'>
                  <p className='w-full px-4 py-2 text-sm font-medium text-white bg-[#998779] border border-transparent rounded-md shadow-sm hover:bg-[#938377] focus:outline-none focus:ring-2 focus:ring-[#938377] focus:ring-offset-2 focus:ring-offset-gray-50'>
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
