'use client'

// import { useParams } from 'next/navigation'

// export default function Page() {
//   const { id } = useParams()
//   return <div>Product {id}</div>
// }

/*
  This example requires some changes to your config:
  
  ```
  // tailwind.config.js
  module.exports = {
    // ...
    plugins: [
      // ...
      require('@tailwindcss/aspect-ratio'),
    ],
  }
  ```
*/
import { Fragment, useState } from 'react'
import { Dialog, RadioGroup, Transition } from '@headlessui/react'
import { ShieldCheckIcon, XMarkIcon } from '@heroicons/react/24/outline'
import { CheckIcon, QuestionMarkCircleIcon, StarIcon } from '@heroicons/react/20/solid'

const product = {
  name: 'Everyday Ruck Snack',
  price: '$220',
  rating: 3.9,
  href: '#',
  imageSrc: 'https://tailwindui.com/img/ecommerce-images/product-quick-preview-03-detail.jpg',
  imageAlt: 'Interior of light green canvas bag with padded laptop sleeve and internal organization pouch.',
  sizes: [
    { name: '1', description: 'Unidad' },
    { name: '2', description: 'Par' }
  ]
}

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function Example() {
  const [open, setOpen] = useState(true)
  const [selectedSize, setSelectedSize] = useState(product.sizes[0])

  return (
    <Transition.Root
      show={open}
      as={Fragment}
    >
      <Dialog
        as='div'
        className='relative z-10'
        onClose={setOpen}
      >
        <Transition.Child
          as={Fragment}
          enter='ease-out duration-300'
          enterFrom='opacity-0'
          enterTo='opacity-100'
          leave='ease-in duration-200'
          leaveFrom='opacity-100'
          leaveTo='opacity-0'
        >
          <div className='fixed inset-0 hidden transition-opacity bg-gray-500 bg-opacity-75 md:block' />
        </Transition.Child>

        <div className='fixed inset-0 z-10 w-screen overflow-y-auto'>
          <div className='flex items-stretch justify-center min-h-full text-center md:items-center md:px-2 lg:px-4'>
            <Transition.Child
              as={Fragment}
              enter='ease-out duration-300'
              enterFrom='opacity-0 translate-y-4 md:translate-y-0 md:scale-95'
              enterTo='opacity-100 translate-y-0 md:scale-100'
              leave='ease-in duration-200'
              leaveFrom='opacity-100 translate-y-0 md:scale-100'
              leaveTo='opacity-0 translate-y-4 md:translate-y-0 md:scale-95'
            >
              <Dialog.Panel className='flex w-full text-base text-left transition transform md:my-8 md:max-w-2xl md:px-4 lg:max-w-4xl'>
                <div className='relative flex items-center w-full px-4 pb-8 overflow-hidden bg-white shadow-2xl pt-14 sm:px-6 sm:pt-8 md:p-6 lg:p-8'>
                  <button
                    type='button'
                    className='absolute text-gray-400 right-4 top-4 hover:text-gray-500 sm:right-6 sm:top-8 md:right-6 md:top-6 lg:right-8 lg:top-8'
                    onClick={() => setOpen(false)}
                  >
                    <span className='sr-only'>Close</span>
                    <XMarkIcon
                      className='w-6 h-6'
                      aria-hidden='true'
                    />
                  </button>

                  <div className='grid items-start w-full grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-12 lg:gap-x-8'>
                    <div className='sm:col-span-4 lg:col-span-5'>
                      <div className='overflow-hidden bg-gray-100 rounded-lg aspect-h-1 aspect-w-1'>
                        <img
                          src='https://res.cloudinary.com/ds7hhoq17/image/upload/v1708382593/Lunare/839_vfj3uo.jpg'
                          alt={product.imageAlt}
                          className='object-cover object-center'
                        />
                      </div>
                    </div>
                    <div className='sm:col-span-8 lg:col-span-7'>
                      <h2 className='text-2xl font-bold text-gray-900 sm:pr-12'>teddy silver</h2>

                      <section
                        aria-labelledby='information-heading'
                        className='mt-4'
                      >
                        <h3
                          id='information-heading'
                          className='sr-only'
                        >
                          Product information
                        </h3>

                        <div className='flex items-center'>
                          <p className='text-lg text-gray-900 sm:text-xl'>{product.price}</p>

                          <div className='pl-4 ml-4 border-l border-gray-300'>
                            <p className='flex items-center gap-1.5 font-sans text-base font-normal leading-relaxed text-blue-gray-900 antialiased'>
                              {/* {Item.material === 'Plata' ? ( */}
                              <span className='inline-flex items-center px-2 py-1 text-xs font-medium text-gray-400 rounded-md bg-gray-400/10 ring-1 ring-inset ring-gray-400/20'>Plata</span>
                              {/* ) : (
                                <span className='inline-flex items-center px-2 py-1 text-xs font-medium text-yellow-500 rounded-md bg-yellow-400/10 ring-1 ring-inset ring-yellow-400/20'>{Item.material}</span>
                              )} */}
                            </p>
                          </div>
                        </div>

                        <div className='flex items-center mt-6'>
                          <CheckIcon
                            className='flex-shrink-0 w-5 h-5 text-green-500'
                            aria-hidden='true'
                          />
                          <p className='ml-2 font-medium text-gray-500'>Superficie decorada con 6 circonitas. Diseño básico y muy combinable. Diametro de 10MM.</p>
                        </div>
                      </section>

                      <section
                        aria-labelledby='options-heading'
                        className='mt-6'
                      >
                        <h3
                          id='options-heading'
                          className='sr-only'
                        >
                          Product options
                        </h3>

                        <form>
                          <div className='sm:flex sm:justify-between'>
                            {/* Size selector */}
                            <RadioGroup
                              value={selectedSize}
                              onChange={setSelectedSize}
                            >
                              <RadioGroup.Label className='block text-sm font-medium text-gray-700'>Cantidad</RadioGroup.Label>
                              <div className='grid grid-cols-1 gap-4 mt-1 sm:grid-cols-2'>
                                {product.sizes.map(size => (
                                  <RadioGroup.Option
                                    as='div'
                                    key={size.name}
                                    value={size}
                                    className={({ active }) => classNames(active ? 'ring-2 ring-indigo-500' : '', 'relative block cursor-pointer rounded-lg border border-gray-300 p-4 focus:outline-none')}
                                  >
                                    {({ active, checked }) => (
                                      <>
                                        <RadioGroup.Label
                                          as='p'
                                          className='text-base font-medium text-gray-900'
                                        >
                                          {size.name}
                                        </RadioGroup.Label>
                                        <RadioGroup.Description
                                          as='p'
                                          className='mt-1 text-sm text-gray-500'
                                        >
                                          {size.description}
                                        </RadioGroup.Description>
                                        <div
                                          className={classNames(active ? 'border' : 'border-2', checked ? 'border-indigo-500' : 'border-transparent', 'pointer-events-none absolute -inset-px rounded-lg')}
                                          aria-hidden='true'
                                        />
                                      </>
                                    )}
                                  </RadioGroup.Option>
                                ))}
                              </div>
                            </RadioGroup>
                          </div>
                          <div className='flex mt-4'>
                            <a
                              href='#'
                              className='flex text-sm text-gray-500 group hover:text-gray-700'
                            >
                              <span>Metodos de pago</span>
                              <QuestionMarkCircleIcon
                                className='flex-shrink-0 w-5 h-5 ml-2 text-gray-400 group-hover:text-gray-500'
                                aria-hidden='true'
                              />
                            </a>
                          </div>
                          <div className='mt-6'>
                            <button
                              type='submit'
                              className='flex items-center justify-center w-full px-8 py-3 text-base font-medium text-white bg-indigo-600 border border-transparent rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-50'
                            >
                              Add to bag
                            </button>
                          </div>
                          <div className='mt-6 text-center'>
                            <a
                              href='#'
                              className='inline-flex text-base font-medium group'
                            >
                              <ShieldCheckIcon
                                className='flex-shrink-0 w-6 h-6 mr-2 text-gray-400 group-hover:text-gray-500'
                                aria-hidden='true'
                              />
                              <span className='text-gray-500 group-hover:text-gray-700'>Lifetime Guarantee</span>
                            </a>
                          </div>
                        </form>
                      </section>
                    </div>
                  </div>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  )
}
