import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Provider from '@/components/Provider'
import Navbar from '@/components/Navbar'
import { ThemeProvider } from '@/components/theme-provider'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Courses Page',
  description: 'Meditation Duck Courses Page',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme='dark'>
        <div className='flex flex-col h-full'>
          <Navbar />
          <Provider>
            {children}
          </Provider>
        </div>
        </ThemeProvider>
      </body>
    </html>
  )
}
