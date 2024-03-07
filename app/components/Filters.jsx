import React from 'react'
import { useState } from 'react'

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
    <div className='w-full mb-10 bg-[#998779] rounded-md flex justify-start items-center h-full'>
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

        <div className='flex items-center justify-start h-full gap-5 mx-3'>
          <span className='pr-3 text-base font-medium border-r-2 border-gray-300'>Filtros</span>
          <div>
            <select
              name=''
              id=''
              onChange={handleSort}
              value={sort}
              className='w-full bg-transparent border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#938377] focus:ring-offset-2 focus:ring-offset-gray-50'
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
              className='w-full bg-transparent border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#938377] focus:ring-offset-2 focus:ring-offset-gray-50'
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
