import React from 'react'
import { Fragment, useState } from 'react'
import { Menu, Popover, Transition } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/20/solid'

const sortOptions = [
  { name: 'Más Popular', href: '#', current: true },
  { name: 'A - Z', href: '#', current: false },
  { name: 'Z - A', href: '#', current: false },
  { name: 'Precio: Menor a Mayor', href: '#', current: false },
  { name: 'Precio: Mayor a Menor', href: '#', current: false }
]

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function Filters({ setFiltered, SortProducts }) {
  const [category, setCategory] = useState('')

  const handlerFilterPrice = e => {
    setFiltered(prevState => {
      return {
        ...prevState,
        minPrice: e.target.value
      }
    })
  }

  const handlerFilterCategory = e => {
    setCategory(e.target.value)
    setFiltered(prevState => {
      return {
        ...prevState,
        category: e.target.value
      }
    })
  }

  return (
    <div>
      {/* Filters */}
      <section aria-labelledby='filter-heading'>
        <h2
          id='filter-heading'
          className='sr-only'
        >
          Filters
        </h2>

        <div className='pb-4 bg-[#F4E8D8] border-b border-gray-200'>
          <div className='flex items-center justify-between px-4 mx-auto max-w-7xl sm:px-6 lg:px-8'>
            <Menu
              as='div'
              className='relative inline-block text-left'
            >
              <div>
                <Menu.Button className='inline-flex justify-center text-sm font-medium text-gray-700 group hover:text-gray-900'>
                  Sort
                  <ChevronDownIcon
                    className='flex-shrink-0 w-5 h-5 ml-1 -mr-1 text-gray-400 group-hover:text-gray-500'
                    aria-hidden='true'
                  />
                </Menu.Button>
              </div>

              <Transition
                as={Fragment}
                enter='transition ease-out duration-100'
                enterFrom='transform opacity-0 scale-95'
                enterTo='transform opacity-100 scale-100'
                leave='transition ease-in duration-75'
                leaveFrom='transform opacity-100 scale-100'
                leaveTo='transform opacity-0 scale-95'
              >
                <Menu.Items className='absolute left-0 z-10 w-40 mt-2 origin-top-left bg-white rounded-md shadow-2xl ring-1 ring-black ring-opacity-5 focus:outline-none'>
                  <div className='py-1'>
                    {sortOptions.map(option => (
                      <Menu.Item key={option.name}>
                        {({ active }) => (
                          <a
                            href={option.href}
                            value={option.name}
                            className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}
                            onChange={handlerSort}
                          >
                            {option.name}
                          </a>
                        )}
                      </Menu.Item>
                    ))}
                  </div>
                </Menu.Items>
              </Transition>
            </Menu>

            <button
              type='button'
              className='inline-block text-sm font-medium text-gray-700 hover:text-gray-900 sm:hidden'
              onClick={() => setMobileFiltersOpen(true)}
            >
              Filters
            </button>

            <div className='hidden sm:block'>
              <div className='grid grid-flow-col gap-3'>
                <div>
                  <label htmlFor='category'>Categoria</label>
                  <select
                    className='w-auto mx-2 bg-gray-100'
                    id='category'
                    onChange={handlerFilterCategory}
                    value={category}
                  >
                    <option value='All'>All</option>
                    <option value='Argolla'>Argolla</option>
                    <option value='Pasante'>Pasante</option>
                  </select>
                </div>
                <div>
                  <label htmlFor='minPrice'>Precio Minimo</label>
                  <select
                    className='w-auto mx-2 bg-gray-100'
                    id='minPrice'
                    onChange={handlerFilterPrice}
                  >
                    <option value='1000'>$1,000</option>
                    <option value='2000'>$2,000</option>
                    <option value='4000'>$4,000</option>
                    <option value='6000'>$6,000</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Active filters */}
        <div className='mb-10 bg-gray-100'>
          <div className='flex items-center gap-5 px-6 py-3 mx-auto max-w-7xl lg:px-8'>
            <h3 className='text-sm font-medium text-gray-500'>
              Filters
              <span className='sr-only'>, active</span>
            </h3>

            <div
              aria-hidden='true'
              className='block w-px h-5 bg-gray-300 sm:ml-4 sm:block'
            />

            <div className='mt-0 sm:ml-4'>
              {/* <div className='flex flex-wrap items-center -m-1'> */}
              {/* {sort.map(activeFilter => (
                  <span
                    key={activeFilter.name}
                    className='m-1 inline-flex items-center rounded-full border border-gray-200 bg-white py-1.5 pl-3 pr-2 text-sm font-medium text-gray-900'
                  >
                    <span>{activeFilter.name}</span>
                    <button
                      type='button'
                      className='inline-flex flex-shrink-0 w-4 h-4 p-1 ml-1 text-gray-400 rounded-full hover:bg-gray-200 hover:text-gray-500'
                    >
                      <span className='sr-only'>Remove filter for {activeFilter.name}</span>
                      <svg
                        className='w-2 h-2'
                        stroke='currentColor'
                        fill='none'
                        viewBox='0 0 8 8'
                      >
                        <path
                          strokeLinecap='round'
                          strokeWidth='1.5'
                          d='M1 1l6 6m0-6L1 7'
                        />
                      </svg>
                    </button>
                  </span>
                ))}
              </div> */}
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
