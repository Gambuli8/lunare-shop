import React from 'react'
import { useState } from 'react'
import { Raleway } from 'next/font/google'

const raleway = Raleway({ subsets: ['latin'] })
export default function Filters({ setFiltered }) {
  const [category, setCategory] = useState('')
  const [sort, setSort] = useState('')

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
    <div className='flex items-center justify-start w-full h-full mb-10 bg-white rounded-md'>
      {/* Filters */}
      <section
        aria-labelledby='filter-heading'
        className='flex items-center justify-center p-3'
      >
        <h2
          id='filter-heading'
          className='sr-only'
        >
          Product filters
        </h2>

        <div className={` ${raleway.className} flex items-center justify-start h-full gap-5 mx-3`}>
          <span className={` ${raleway.className} pr-3 text-base font-medium border-r-2 border-gray-300 `}>Filtros</span>
          <div>
            <select
              name=''
              id=''
              onChange={handleSort}
              value={sort}
              className='w-full bg-transparent text-black border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#e2d0c2] focus:ring-offset-2 focus:ring-offset-gray-50'
            >
              <option
                className=' text-black border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#e2d0c2] focus:ring-offset-2 focus:ring-offset-gray-50'
                value='All'
              >
                Filtrar por
              </option>
              <option
                className=' text-black border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#e2d0c2] focus:ring-offset-2 focus:ring-offset-gray-50 '
                value='A - Z'
              >
                A - Z
              </option>
              <option
                className=' text-black border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#e2d0c2] focus:ring-offset-2 focus:ring-offset-gray-50 '
                value='Z - A'
              >
                Z - A
              </option>
              <option
                className=' text-black border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#e2d0c2] focus:ring-offset-2 focus:ring-offset-gray-50 '
                value='asc'
              >
                Precio: Menor a Mayor
              </option>
              <option
                className=' text-black border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#e2d0c2] focus:ring-offset-2 focus:ring-offset-gray-50 '
                value='desc'
              >
                Precio: Mayor a Menor
              </option>
            </select>
          </div>
          <div>
            <select
              name=''
              id=''
              value={category}
              onChange={handleCategory}
              className='w-full bg-transparent border text-black border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#e2d0c2] focus:ring-offset-2 focus:ring-offset-gray-50'
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
