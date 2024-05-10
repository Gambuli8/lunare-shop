import { CheckCircleIcon, MoonIcon } from '@heroicons/react/20/solid'

export default function Politica() {
  return (
    <div className='px-6 py-32 bg-white lg:px-8'>
      <div className='max-w-3xl mx-auto text-base leading-7 text-gray-700'>
        <h1 className='mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl'>Cuidados piezas Plata / Electrogold / Rose</h1>
        <p className='mt-6 text-xl leading-8'>
          Antes queremos aclarar que ninguno de nuestros productos se oxida (esto solo sucede con accesorios de fantasía), igualmente a pesar de que todos nuestros productos sean de Plata 925, requieren ciertos cuidados.
        </p>
        <div className='max-w-2xl mt-10'>
          <figure className='mt-10 border-l border-[#998779] pl-9'>
            <blockquote className='font-semibold text-gray-900'>
              <p>La Plata de ley 925, es una aleación que contiene 92,5% por peso de plata y 7,5% por otros metales, generalmente cobre.</p>
            </blockquote>
          </figure>
          <ul
            role='list'
            className='max-w-xl mt-24 space-y-8 text-gray-600'
          >
            <li className='flex gap-x-3'>
              <MoonIcon
                className='flex-none w-5 h-5 mt-1 text-[#998779]'
                aria-hidden='true'
              />
              <span>Guarda tu joya de plata en un lugar fresco, seco, que sea preferiblemente hermético, para evitar el ennegrecimiento u oxidación.</span>
            </li>
            <li className='flex gap-x-3'>
              <MoonIcon
                className='flex-none w-5 h-5 mt-1 text-[#998779]'
                aria-hidden='true'
              />
              <span>Almacene cada una de las piezas de forma individual, para evitar que se rayen las unas con las otras.</span>
            </li>
            <li className='flex gap-x-3'>
              <MoonIcon
                className='flex-none w-5 h-5 mt-1 text-[#998779]'
                aria-hidden='true'
              />
              <span>No guarde su joya directamente en contacto con la madera, ésta a menudo contiene ácidos que pueden afectar la superficie de la plata.</span>
            </li>
            <li className='flex gap-x-3'>
              <MoonIcon
                className='flex-none w-5 h-5 mt-1 text-[#998779]'
                aria-hidden='true'
              />
              <span>No exponga la pieza a agentes corrosivos como el cloro, grasa, sudor, perfume, agentes alcalinos, ni a la salinidad por largos períodos de tiempo.</span>
            </li>
            <li className='flex gap-x-3'>
              <MoonIcon
                className='flex-none w-5 h-5 mt-1 text-[#998779]'
                aria-hidden='true'
              />
              <span>No deje puesta su joya al momento de dormirse ni de bañarse, ya que, en esta última puede exponerse al azufre.</span>
            </li>
            <li className='flex gap-x-3'>
              <MoonIcon
                className='flex-none w-5 h-5 mt-1 text-[#998779]'
                aria-hidden='true'
              />
              <span>Te aconsejamos que las pongas donde no les pueda dar el sol o la luz.</span>
            </li>
            <li className='flex gap-x-3'>
              <MoonIcon
                className='flex-none w-5 h-5 mt-1 text-[#998779]'
                aria-hidden='true'
              />
              <span>Es muy importante que cierres la cadena de tus collares y pulseras antes de guardarlos, así evitarás que se enreden entre ellas.</span>
            </li>
            <li className='flex gap-x-3'>
              <MoonIcon
                className='flex-none w-5 h-5 mt-1 text-[#998779]'
                aria-hidden='true'
              />
              <span>Te aconsejamos que no las tengas en el baño ya que es una zona de mucha humedad y esto puede oscurecer las joyas. Es mejor tenerlas en un lugar seco libre de humedades, por ejemplo, en tu cómoda o mesita de luz.</span>
            </li>
          </ul>
          <h2 className='mt-16 text-2xl font-bold tracking-tight text-gray-900'>¿Como limpiar nuestras piezas?</h2>
          <li className='flex mt-10 gap-x-3'>
            <MoonIcon
              className='flex-none w-5 h-5 mt-1 text-[#998779]'
              aria-hidden='true'
            />
            <span>Platalim. El producto es corrosivo por eso aconsejamos usarlo pocas veces en las piezas. Hay que tener cuidado si hay piedras, es mejor que el producto no toque la piedra ya que podría dañarla.</span>
          </li>
          <li className='flex mt-5 gap-x-3'>
            <MoonIcon
              className='flex-none w-5 h-5 mt-1 text-[#998779]'
              aria-hidden='true'
            />
            <span>
              Bicarbonato, agua caliente. Podés repetir el proceso en caso de que no queden bien a la primera. En este método hay que tener cuidado si la joya contiene plata oscurecida, si tu joya tiene relieve y profundidad con una parte “negra” o
              más oscura, si usas este método desaparecerá esa parte del diseño por completo. Por eso está recomendado para cadenas, pero si tienes alguna joya totalmente plata también podés usarlo.
            </span>
          </li>
          <li className='flex mt-5 gap-x-3'>
            <MoonIcon
              className='flex-none w-5 h-5 mt-1 text-[#998779]'
              aria-hidden='true'
            />
            <span>Agua hirviendo pocos segundos y detergente.</span>
          </li>
          <li className='flex mt-5 gap-x-3'>
            <MoonIcon
              className='flex-none w-5 h-5 mt-1 text-[#998779]'
              aria-hidden='true'
            />
            <span>Paño mágico o toalla suave.</span>
          </li>
          <li className='flex mt-5 gap-x-3'>
            <MoonIcon
              className='flex-none w-5 h-5 mt-1 text-[#998779]'
              aria-hidden='true'
            />
            <span>NO utilice crema dental para intentar limpiarlas, ya que, es abrasiva.</span>
          </li>
        </div>
        <p className='flex items-center justify-center mt-20 text-lg font-bold text-center text-black'>Ahora que conoces nuestros truquitos para conservar La Plata en el mejor estado posible ya podes acceder a nuestros productos con tranquilidad.</p>
      </div>
    </div>
  )
}
