import { CheckCircleIcon, MoonIcon } from '@heroicons/react/20/solid'

export default function Politica() {
  return (
    <div className='px-6 py-32 bg-white lg:px-8'>
      <div className='max-w-3xl mx-auto text-base leading-7 text-gray-700'>
        {/* <p className='text-base font-semibold leading-7 text-[#998779]'>introduccion</p> */}
        <h1 className='mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl'>Políticas de cambio</h1>
        <div className='max-w-2xl mt-10'>
          <ul
            role='list'
            className='max-w-xl mt-8 space-y-8 text-gray-600'
          >
            <li className='flex gap-x-3'>
              <MoonIcon
                className='flex-none w-5 h-5 mt-1 text-[#998779]'
                aria-hidden='true'
              />
              <span>Podés realizar el cambio de todos los productos excepto el rubro aros (incluye cuff a presión), por respeto a la higiene y salud de cada persona.</span>
            </li>
            <li className='flex gap-x-3'>
              <MoonIcon
                className='flex-none w-5 h-5 mt-1 text-[#998779]'
                aria-hidden='true'
              />
              <span>El producto a cambiar debe encontrarse en las mismas condiciones en que se recibió.</span>
            </li>
            <li className='flex gap-x-3'>
              <MoonIcon
                className='flex-none w-5 h-5 mt-1 text-[#998779]'
                aria-hidden='true'
              />
              <span>Todos los productos son revisados completamente antes de realizar el envío del pedido, de esta forma aseguramos la calidad de los mismos.</span>
            </li>
            <li className='flex gap-x-3'>
              <MoonIcon
                className='flex-none w-5 h-5 mt-1 text-[#998779]'
                aria-hidden='true'
              />
              <span>Para realizar un cambio escribinos al Whatsapp (2954476558). En caso que necesites hacer un cambio con envío, el mismo debe ser abonado.</span>
            </li>
          </ul>
          <h2 className='mt-16 text-2xl font-bold tracking-tight text-gray-900'>Devoluciones</h2>
          <div className='flex my-12 gap-x-3'>
            <MoonIcon
              className='flex-none w-5 h-5 mt-1 text-[#998779]'
              aria-hidden='true'
            />
            <span>No realizamos devoluciones, solo cambios por otros productos, donde se toma en cuenta el valor abonado en la fecha de compra! </span>
          </div>
          <h2 className='mt-16 text-2xl font-bold tracking-tight text-gray-900'>Garantías</h2>
          <div className='flex my-12 gap-x-3'>
            <MoonIcon
              className='flex-none w-5 h-5 mt-1 text-[#998779]'
              aria-hidden='true'
            />
            <span>
              Los productos NO tienen garantía. No realizamos cambios o reposiciones de productos que pueden sufrir fallas debido al mal uso o transcurso del tiempo, esto se debe, a que no hay forma de comprobar el uso que se le dio a cada producto,
              si sufrió caídas, no se cumplieron los cuidados correspondientes, si fue usado incorrectamente, etc.
            </span>
          </div>
          <div className='flex my-12 gap-x-3'>
            <MoonIcon
              className='flex-none w-5 h-5 mt-1 text-[#998779]'
              aria-hidden='true'
            />
            <span>Todos los productos son revisados completamente antes de realizar el envío del pedido, de esta forma aseguramos la calidad de los mismos.</span>
          </div>

          <p className='flex items-center justify-center mt-20 text-lg font-bold text-black'>Al comprar, estás aceptando todas las políticas detalladas anteriormente.</p>
        </div>
      </div>
    </div>
  )
}
