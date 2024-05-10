import { useState, useEffect } from 'react'
import { Productos } from '../api'
import { useParams } from 'next/navigation'
import { Carousel } from '@material-tailwind/react'
import Image from 'next/image'

export default function Carousell() {
  const [products, setProducts] = useState([])
  const { id } = useParams()

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await Productos.getProduct.list(id)
        setProducts(result)
        console.log(result)
      } catch (error) {
        console.log(error.message)
      }
    }
    fetchData()
  }, [id])

  return (
    <Carousel
      className='w-10 h-10 rounded-xl'
      navigation={({ setActiveIndex, activeIndex, length }) => (
        <div className='absolute z-50 flex gap-2 bottom-4 left-2/4 -translate-x-2/4'>
          {new Array(length).fill('').map((_, i) => (
            <span
              key={i}
              className={`block h-1 cursor-pointer rounded-2xl transition-all content-[''] ${activeIndex === i ? 'w-8 bg-white' : 'w-4 bg-white/50'}`}
              onClick={() => setActiveIndex(i)}
            />
          ))}
        </div>
      )}
    >
      <Image
        width={20}
        height={20}
        src={products.image}
        alt='image 1'
        className='w-10 h-10'
      />
      <Image
        width={20}
        height={20}
        src={products.image2}
        alt='image 2'
        className='w-10 h-10 '
      />
    </Carousel>
  )
}
