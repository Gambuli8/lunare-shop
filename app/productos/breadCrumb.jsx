import { ChevronRightIcon, HomeIcon } from '@heroicons/react/20/solid'

export default function Breadcrumb({ products }) {
  return (
    <nav
      className='flex pb-4'
      aria-label='Breadcrumb'
    >
      <ol
        role='list'
        className='flex items-center space-x-2'
      >
        <li>
          <div>
            <a
              href='/'
              className='text-gray-400 hover:text-gray-500'
            >
              <HomeIcon
                className='flex-shrink-0 w-5 h-5'
                aria-hidden='true'
              />
              <span className='sr-only'>Home</span>
            </a>
          </div>
        </li>
        <li>
          <div className='flex items-center'>
            <ChevronRightIcon
              className='flex-shrink-0 w-5 h-5 text-gray-400'
              aria-hidden='true'
            />
            <a
              href='/productos'
              className='ml-2 text-sm font-medium text-gray-500 hover:text-gray-700'
            >
              productos
            </a>
          </div>
        </li>
        <li>
          <div className='flex items-center'>
            <ChevronRightIcon
              className='flex-shrink-0 w-5 h-5 text-gray-400'
              aria-hidden='true'
            />
            <a
              href={'/productos/' + products.id}
              className='ml-2 text-sm font-medium text-gray-500 hover:text-gray-700'
            >
              {products.name}
            </a>
          </div>
        </li>
      </ol>
    </nav>
  )
}
