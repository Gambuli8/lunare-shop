import React from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { ArrowRightIcon, ArrowLeftIcon } from '@heroicons/react/24/outline'

export const Pagination = ({ productPerPage, currentPage, setCurrentPage, totalProducts }) => {
  const router = useRouter()

  const handlePageChange = page => {
    router.push(`?page=${page}`)
  }

  const handleNext = () => {
    setCurrentPage(currentPage + 1)
  }

  const handlePrevious = () => {
    setCurrentPage(currentPage - 1)
  }

  const handlePage = page => {
    setCurrentPage(page)
  }

  const pages = []
  for (let i = 1; i <= Math.ceil(totalProducts / productPerPage); i++) {
    pages.push(i)
  }
  return (
    <div>
      <nav
        aria-label='Pagination'
        className='flex justify-between px-4 mx-auto mt-6 text-sm font-medium text-gray-700 max-w-7xl sm:px-6 lg:px-8'
      >
        <div className='flex-1 min-w-0'>
          <button
            onClick={handlePrevious}
            disabled={currentPage === 1}
            style={{ margin: '0 5px', backgroundColor: currentPage === 1 ? 'white' : '#998779', color: currentPage === 1 ? 'black' : 'white', border: '1px solid #998779', opacity: currentPage === 1 ? '0.5' : '1' }}
            className='inline-flex items-center h-10 px-4 bg-white border border-gray-300 rounded-md hover:bg-gray-100 focus:border-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:ring-opacity-25 focus:ring-offset-1 focus:ring-offset-indigo-600'
          >
            <ArrowLeftIcon className='w-5 h-5' />
          </button>
        </div>
        <div className='flex items-center justify-center'>
          {/* Current: "border-indigo-600 ring-1 ring-indigo-600", Default: "border-gray-300" */}
          {pages.map(page => (
            <button
              key={page}
              onClick={() => handlePage(page)}
              style={{ margin: '0 5px', backgroundColor: page === currentPage ? '#998779' : 'white', color: page === currentPage ? 'white' : 'black', border: '1px solid #998779' }}
              className='inline-flex items-center h-10 px-3 rounded-md md:px-4 md:mx-4'
            >
              {page}
            </button>
          ))}
        </div>
        <div className='flex justify-end flex-1 min-w-0'>
          <button
            onClick={handleNext}
            disabled={currentPage === Math.ceil(totalProducts / productPerPage)}
            style={{
              margin: '0 5px',
              backgroundColor: currentPage === Math.ceil(totalProducts / productPerPage) ? 'white' : '#998779',
              color: currentPage === Math.ceil(totalProducts / productPerPage) ? 'black' : 'white',
              border: '1px solid #998779',
              opacity: currentPage === Math.ceil(totalProducts / productPerPage) ? '0.5' : '1'
            }}
            className='inline-flex items-center h-10 px-4 bg-white border border-gray-300 rounded-md hover:bg-gray-100 focus:border-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:ring-opacity-25 focus:ring-offset-1 focus:ring-offset-indigo-600'
          >
            <ArrowRightIcon className='w-5 h-5' />
          </button>
        </div>
      </nav>
    </div>
  )
}
