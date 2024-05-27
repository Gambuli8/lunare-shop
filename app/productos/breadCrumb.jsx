import { ChevronRightIcon, HomeIcon } from '@heroicons/react/20/solid'
import Link from 'next/link'
import { Raleway } from 'next/font/google'

const raleway = Raleway({ subsets: ['latin'] })
export default function Breadcrumb({ products }) {
  return (
    <nav
      className={` ${raleway.className} flex pb-4`}
      aria-label='Breadcrumb'
    >
      <ol
        role='list'
        className='flex items-center space-x-2'
      >
        <li>
          <div>
            <Link
              href='/'
              className='text-gray-400 hover:text-gray-500'
            >
              <HomeIcon
                className='flex-shrink-0 w-5 h-5 text-black'
                aria-hidden='true'
              />
              <span className='sr-only'>Home</span>
            </Link>
          </div>
        </li>
        <li>
          <div className='flex items-center'>
            <ChevronRightIcon
              className='flex-shrink-0 w-5 h-5 text-[#e2d0c2]'
              aria-hidden='true'
            />
            <Link
              href='/productos'
              className='z-0 ml-2 text-sm font-medium text-black hover:text-gray-700'
            >
              Productos
            </Link>
          </div>
        </li>
        <li>
          <div className='flex items-center'>
            <ChevronRightIcon
              className='flex-shrink-0 w-5 h-5 text-[#e2d0c2]'
              aria-hidden='true'
            />
            <Link
              href={'/productos/' + products.id}
              className='ml-2 text-sm font-medium text-gray-500 hover:text-gray-700'
            >
              {products.name}
            </Link>
          </div>
        </li>
      </ol>
    </nav>
  )
}
