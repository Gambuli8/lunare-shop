import { Inter } from 'next/font/google'
import './globals.css'
import NavBar from './NavBar'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
    title: 'Lunare shop',
    description: 'Tienda online de venta de joyerias'
}

export default function RootLayout({ children }) {
    return (
        <html lang='es'>
            <body className={inter.className}>
                <NavBar />
                {children}
            </body>
        </html>
    )
}
