'use client'

import { Inter } from 'next/font/google'
import './globals.css'
import { useState } from 'react'
import NavBar from './components/NavBar'
import { CartProvider } from '@/utils/store'
import './inicio-sesion/firebase/credentials'
import Home from './page'
import appFirebase from './inicio-sesion/firebase/credentials'
import { getAuth, onAuthStateChanged } from 'firebase/auth'

const auth = getAuth(appFirebase)
const inter = Inter({ subsets: ['latin'] })

//metadatos

export default function RootLayout({ children }) {
  const [user, setUser] = useState(null)

  onAuthStateChanged(auth, user => {
    if (user) {
      setUser(user)
    } else {
      setUser(null)
    }
  })
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
          <NavBar user={user} />
          {user ? <Home user={user} /> : null}
          {children}
        </CartProvider>
      </body>
    </html>
  )
}
