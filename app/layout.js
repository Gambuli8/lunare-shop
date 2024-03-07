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
          href='/app/favicon.ico'
          type='image/x-icon'
        />
      </head>

      <body className={inter.className}>
        <CartProvider>
          <NavBar />
          {children}
        </CartProvider>
      </body>
    </html>
  )
}
