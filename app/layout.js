import { Inter } from 'next/font/google'
import './globals.css'
import NavBar from './components/NavBar'
import { StoreProvider } from '@/utils/store'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Lunare Jewelry - shop',
  description: 'Tienda online de venta de joyas en Córdoba',
  image: 'https://res.cloudinary.com/ds7hhoq17/image/upload/v1708557816/Logo/logo-redondo_bzmu99.png',
  url: 'https://lunare-shop.vercel.app',
  type: 'website',
  instagram: '@lunareJewelry',
  siteName: 'Lunare shop',
  locale: 'es_ES',
  keywords: ['joyeria', 'plata', 'anillos', 'collares', 'aretes', 'pulseras', 'venta', 'online', 'lunare', 'shop']
}

export default function RootLayout({ children }) {
  return (
    <html lang='es'>
      <head>
        <link
          rel='icon'
          href='/app/favicon.ico'
          type='image/x-icon'
        />
      </head>
      <body className={inter.className}>
        <StoreProvider>
          <NavBar />
          {children}
        </StoreProvider>
      </body>
    </html>
  )
}
