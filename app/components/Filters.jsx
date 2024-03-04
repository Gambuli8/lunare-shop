import React from 'react'
import { Fragment, useState } from 'react'
import { Menu, Popover, Transition, Disclosure, Dialog } from '@headlessui/react'
import { ChevronDownIcon, XMarkIcon } from '@heroicons/react/20/solid'

const sortOptions = [
  { name: 'Más Popular', href: '#', current: true },
  { name: 'A - Z', href: '#', current: false },
  { name: 'Z - A', href: '#', current: false },
  { name: 'Precio: Menor a Mayor', href: '#', current: false },
  { name: 'Precio: Mayor a Menor', href: '#', current: false }
]

const filters = [
  {
    id: 'category',
    name: 'Category',
    options: [
      { value: 'Plata', label: 'Plata' },
      { value: 'Plata Dorada', label: 'Plata Dorada' }
    ]
  },
  {
    id: 'sort',
    name: 'Sort',
    options: [
      { value: 'A - Z', label: 'A - Z' },
      { value: 'Z - A', label: 'Z - A' },
      { value: 'asc', label: 'Precio: Menor a Mayor' },
      { value: 'desc', label: 'Precio: Mayor a Menor' }
    ]
  }
]

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function Filters({ setFiltered }) {
  const [category, setCategory] = useState('')
  const [sort, setSort] = useState('')
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false)

  const handleCategory = e => {
    setCategory(e.target.value)
    setFiltered(prevState => {
      return { ...prevState, category: e.target.value }
    })
  }

  const handleSort = e => {
    setSort(e.target.value)

    setFiltered(prevState => {
      return { ...prevState, sort: e.target.value }
    })
  }

  return (
    <div className='w-full mb-10'>
      {/* Mobile filter dialog
      <Transition.Root
        show={mobileFiltersOpen}
        as={Fragment}
      >
        <Dialog
          as='div'
          className='relative z-40 sm:hidden'
          onClose={setMobileFiltersOpen}
        >
          <Transition.Child
            as={Fragment}
            enter='transition-opacity ease-linear duration-300'
            enterFrom='opacity-0'
            enterTo='opacity-100'
            leave='transition-opacity ease-linear duration-300'
            leaveFrom='opacity-100'
            leaveTo='opacity-0'
          >
            <div className='fixed inset-0 bg-black bg-opacity-25' />
          </Transition.Child>

          <div className='fixed inset-0 z-40 flex'>
            <Transition.Child
              as={Fragment}
              enter='transition ease-in-out duration-300 transform'
              enterFrom='translate-x-full'
              enterTo='translate-x-0'
              leave='transition ease-in-out duration-300 transform'
              leaveFrom='translate-x-0'
              leaveTo='translate-x-full'
            >
              <Dialog.Panel className='relative flex flex-col w-full h-full max-w-xs py-4 pb-6 ml-auto overflow-y-auto bg-white shadow-xl'>
                <div className='flex items-center justify-between px-4'>
                  <h2 className='text-lg font-medium text-gray-900'>Filters</h2>
                  <button
                    type='button'
                    className='flex items-center justify-center w-10 h-10 p-2 -mr-2 text-gray-400 bg-white rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500'
                    onClick={() => setMobileFiltersOpen(false)}
                  >
                    <span className='sr-only'>Close menu</span>
                    <XMarkIcon
                      className='w-6 h-6'
                      aria-hidden='true'
                    />
                  </button>
                </div>

                {/* Filters */}
      {/* <form className='mt-4'>
                  {filters.map(section => (
                    <Disclosure
                      as='div'
                      key={section.name}
                      className='px-4 py-6 border-t border-gray-200'
                    >
                      {({ open }) => (
                        <>
                          <h3 className='flow-root -mx-2 -my-3'>
                            <Disclosure.Button className='flex items-center justify-between w-full px-2 py-3 text-sm text-gray-400 bg-white'>
                              <span className='font-medium text-gray-900'>{section.name}</span>
                              <span className='flex items-center ml-6'>
                                <ChevronDownIcon
                                  className={classNames(open ? '-rotate-180' : 'rotate-0', 'h-5 w-5 transform')}
                                  aria-hidden='true'
                                />
                              </span>
                            </Disclosure.Button>
                          </h3>
                          <Disclosure.Panel className='pt-6'>
                            <div className='space-y-6'>
                              {section.options.map((option, optionIdx) => (
                                <div
                                  key={option.value}
                                  className='flex items-center'
                                >
                                  <input
                                    id={`filter-mobile-${section.id}-${optionIdx}`}
                                    name={`${section.id}[]`}
                                    defaultValue={option.value}
                                    type='checkbox'
                                    defaultChecked={option.checked}
                                    className='w-4 h-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500'
                                    onChange={handleCategory}
                                  />
                                  <label
                                    htmlFor={`filter-mobile-${section.id}-${optionIdx}`}
                                    className='ml-3 text-sm text-gray-500'
                                  >
                                    {option.label}
                                  </label>
                                </div>
                              ))}
                            </div>
                          </Disclosure.Panel>
                        </>
                      )}
                    </Disclosure>
                  ))}
                </form>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition.Root> */}

      {/* Filters */}
      <section
        aria-labelledby='filter-heading'
        className='pt-6 border-t border-gray-200'
      >
        <h2
          id='filter-heading'
          className='sr-only'
        >
          Product filters
        </h2>

        <div className='flex items-center justify-start gap-5 mx-5'>
          <div>
            <select
              name=''
              id=''
              onChange={handleSort}
              value={sort}
              className='w-full bg-transparent '
            >
              <option value='All'>Filtrar por</option>
              <option value='A - Z'>A - Z</option>
              <option value='Z - A'>Z - A</option>
              <option value='asc'>Precio: Menor a Mayor</option>
              <option value='desc'>Precio: Mayor a Menor</option>
            </select>
          </div>
          <div>
            <select
              name=''
              id=''
              value={category}
              onChange={handleCategory}
              className='w-full bg-transparent'
            >
              <option value='All'>Categoría</option>
              <option value='Plata'>Plata</option>
              <option value='Plata Dorada'>Plata Dorada</option>
            </select>
          </div>
        </div>
      </section>
    </div>
  )
}
