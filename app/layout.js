import { Inter } from 'next/font/google'
import './globals.css'
import NavBar from './NavBar'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
    title: 'Lunare Jewelry - shop',
    description: 'Tienda online de venta de joyas en Córdoba',
    image: '/app/favicon.ico',
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
                    sizes='16x16'
                />
            </head>
            <body className={inter.className}>
                <NavBar />
                {children}
            </body>
        </html>
    )
}
