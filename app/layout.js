'use client'

import { Inter } from 'next/font/google'
import './globals.css'
import NavBar from './components/NavBar'
import { CartProvider } from '@/utils/store'
import './firebase/credentials'
import { AuthProvider } from './context/authContext'

const inter = Inter({ subsets: ['latin'] })

//metadatos

export default function RootLayout({ children }) {
  return (
    <html lang='es'>
      <head>
        <title>Lunare Shop</title>
        <meta
          name='google-site-verification'
          content='G6RLI2K9kKxOG9fL9r1izuqhpFcwAP_Xb_8P8JH5cXo'
        />
        <meta
          name='viewport'
          content='width=device-width, initial-scale=1.0'
        />
        <meta
          name='description'
          content='Lunare Shop'
        />

        <meta
          property='og:title'
          content='Lunare Shop'
        />
        <meta
          property='og:description'
          content='Lunare Shop'
        />
        <meta
          property='og:image'
          content='https://res.cloudinary.com/ds7hhoq17/image/upload/v1708557816/Logo/logo-redondo_bzmu99.png'
        />
        <link
          title='Lunare Shop'
          rel='icon'
          href='https://res.cloudinary.com/ds7hhoq17/image/upload/v1708557816/Logo/logo-redondo_bzmu99.png'
          type='image/x-icon'
        />
      </head>

      <body className={inter.className}>
        <AuthProvider>
          <CartProvider>
            <NavBar />
            {/* {user ? <Home user={user} /> : null} */}
            {children}
          </CartProvider>
        </AuthProvider>
      </body>
    </html>
  )
}
