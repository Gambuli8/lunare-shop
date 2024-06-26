import { useEffect, useState } from 'react'
import Loading from './loading'
import axios from 'axios'

export default function MPButton(product) {
  const [url, setUrl] = useState(null)
  const [loading, setLoading] = useState(false)
  const [productos, setProductos] = useState(product)

  useEffect(() => {
    const generateLink = async () => {
      setLoading(true)
      try {
        const { data } = await axios.post('/api/mercadoPago', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(productos)
        })
        setUrl(data.url)
      } catch (error) {
        console.log(error)
      } finally {
        setLoading(false)
        console.log(productos)
        console.log(url)
      }
    }

    generateLink()
  }, [productos])

  return (
    <div>
      {loading ? (
        <button
          type='button'
          className='flex items-center justify-center w-full py-2 text-white bg-blue-500 border border-transparent rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-700 focus:ring-offset-2'
        >
          <Loading />
        </button>
      ) : (
        <a href={url}>
          <button
            type='button'
            className='flex items-center justify-center w-full py-2 text-white bg-blue-500 border border-transparent rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-700 focus:ring-offset-2'
          >
            <span className='sr-only'>Pay with Mercado pago</span>
            Comprar con Mercado pago
          </button>
        </a>
      )}
    </div>
  )
}
