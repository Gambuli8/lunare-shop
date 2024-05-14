import Image from 'next/image'

export default function Carousell({ image, image2, name }) {
  const images = [image, image2]
  return (
    <div className='relative overflow-hidden'>
      <div className='flex'>
        {images.map(img => {
          ;<img
            src={img}
            width={200}
            height={200}
            alt={name}
          />
        })}
      </div>
    </div>
  )
}
