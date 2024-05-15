'use client'

import { Inter } from 'next/font/google'
import './globals.css'
import NavBar from './components/NavBar'
import { CartProvider } from '@/utils/store'

const inter = Inter({ subsets: ['latin'] })

//metadatos

export default function RootLayout({ children }) {
  return (
    <html lang='es'>
      <head>
        <link
          rel='icon'
          href='https://res.cloudinary.com/ds7hhoq17/image/upload/v1708557816/Logo/logo-redondo_bzmu99.png'
          type='image/x-icon'
        />
      </head>

      <body className={inter.className}>
        <CartProvider>
          {location.pathname === '/inicio-sesion' ? null : <NavBar />}
          {/* <NavBar /> */}
          {children}
        </CartProvider>
      </body>
    </html>
  )
}
