import type { Metadata } from 'next'
import { Inter, Noto_Sans_Devanagari } from 'next/font/google'
import './globals.css'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { ThemeProvider } from 'next-themes'
import { Toaster } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { getSiteSettings } from '@/lib/data'
import LanguageCurrencyProvider from '@/components/providers/LanguageCurrencyProvider'

const inter = Inter({ subsets: ['latin'] })
const devanagari = Noto_Sans_Devanagari({ 
  subsets: ['devanagari'],
  variable: '--font-devanagari'
})

export const metadata: Metadata = {
  title: "Soman's Tea - Premium Indian Tea",
  description: 'Experience the finest Indian tea collection',
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const settings = await getSiteSettings()
  
  return (
    <html lang="en" className={`${inter.className} ${devanagari.variable}`}>
      <head>
        <style>{`
          :root {
            --primary-color: ${settings.primary_color || '#2E8B57'};
            --secondary-color: ${settings.secondary_color || '#D4AF37'};
          }
        `}</style>
      </head>
      <body className="min-h-screen flex flex-col">
        <ThemeProvider attribute="class" defaultTheme="light">
          <LanguageCurrencyProvider>
            <Navbar />
            <main className="flex-grow">
              {children}
            </main>
            <Footer />
            <Toaster position="bottom-right" />
          </LanguageCurrencyProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}