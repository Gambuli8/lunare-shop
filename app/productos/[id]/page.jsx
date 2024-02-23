'use client'

import { Fragment, useState, useEffect } from 'react'
import { useParams } from 'next/navigation'
import { Dialog, RadioGroup, Transition } from '@headlessui/react'
import { ShieldCheckIcon, XMarkIcon } from '@heroicons/react/24/outline'
import { QuestionMarkCircleIcon, SparklesIcon } from '@heroicons/react/20/solid'
import Productos from '../../api'
import { Italiana } from 'next/font/google'

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

const productStock = [
  { cantidad: 1, description: 'Unidad' },
  { cantidad: 2, description: 'Par' }
]

const Italiano = Italiana({ subsets: ['latin'], weight: '400' })

export default function ProductId() {
  const [open, setOpen] = useState(true)
  const [selectedSize, setSelectedSize] = useState(productStock[0])
  const { id } = useParams()
  const [products, setProducts] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await Productos.getProduct.list(id)
        console.log(result)
        setProducts(result)
      } catch (error) {
        console.log(error.message)
      }
    }
    fetchData()
  }, [id])

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

                  <div className='grid items-start w-full grid-cols-1 rounded-lg gap-x-6 gap-y-8 sm:grid-cols-12 lg:gap-x-8'>
                    <div className='sm:col-span-4 lg:col-span-5'>
                      <div className='overflow-hidden bg-gray-100 rounded-lg aspect-h-1 aspect-w-1'>
                        <img
                          src={products.image}
                          alt={products.name}
                          className='object-cover object-center'
                        />
                      </div>
                    </div>
                    <div className='sm:col-span-8 lg:col-span-7'>
                      <h2 className={` ${Italiano.className} uppercase text-2xl font-extrabold text-gray-900 sm:pr-12`}>{products.name}</h2>

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
                          <p className='text-lg text-gray-900 sm:text-xl'>{productStock[0].cantidad !== selectedSize ? `${products.price_par}` : productStock[0].cantidad === selectedSize ? `${products.price_ind}` : ''}</p>

                          <div className='pl-4 ml-4 border-l border-gray-300'>
                            <p className='flex items-center gap-1.5 font-sans text-base font-normal leading-relaxed text-blue-gray-900 antialiased'>
                              {products.material === 'Plata' ? (
                                <span className='inline-flex items-center px-2 py-1 text-xs font-medium text-gray-400 rounded-md bg-gray-400/10 ring-1 ring-inset ring-gray-400/20'>{products.material}</span>
                              ) : (
                                <span className='inline-flex items-center px-2 py-1 text-xs font-medium text-yellow-500 rounded-md bg-yellow-400/10 ring-1 ring-inset ring-yellow-400/20'>{products.material}</span>
                              )}
                            </p>
                          </div>
                        </div>

                        <div className='flex items-center mt-6'>
                          <SparklesIcon
                            className='flex-shrink-0 w-7 h-7 text-[#998779]'
                            aria-hidden='true'
                          />
                          <p className='ml-2 font-medium text-gray-500'>{products.description}</p>
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
                            {/* Stock selector */}
                            <RadioGroup
                              value={selectedSize}
                              onChange={setSelectedSize}
                            >
                              <RadioGroup.Label className='block text-sm font-medium text-gray-700'>Cantidad</RadioGroup.Label>
                              <div className='grid grid-cols-1 gap-4 mt-1 sm:grid-cols-2'>
                                {productStock.map(stock => (
                                  <RadioGroup.Option
                                    as='div'
                                    key={stock.cantidad}
                                    value={stock.cantidad}
                                    className={({ active }) => classNames(active ? 'ring-2 ring-[#998779]' : '', 'relative block cursor-pointer rounded-lg border border-gray-300 p-4 focus:outline-none')}
                                  >
                                    {({ active, checked }) => (
                                      <>
                                        <RadioGroup.Label
                                          as='p'
                                          className='text-base font-medium text-gray-900'
                                        >
                                          {stock.cantidad}
                                        </RadioGroup.Label>
                                        <RadioGroup.Description
                                          as='p'
                                          className='mt-1 text-sm text-gray-500'
                                        >
                                          {stock.description}
                                        </RadioGroup.Description>
                                        <div
                                          className={classNames(active ? 'border' : 'border-2', checked ? 'border-[#998779]' : 'border-transparent', 'pointer-events-none absolute -inset-px rounded-lg')}
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
                              className='flex items-center justify-center w-full px-8 py-3 text-base font-medium text-white bg-[#998779] border border-transparent rounded-md hover:bg-[#938377] focus:outline-none focus:ring-2 focus:ring-[#938377] focus:ring-offset-2 focus:ring-offset-gray-50'
                            >
                              Agregar al carrito
                            </button>
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
