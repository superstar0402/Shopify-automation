import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'shopify automation',
  description: 'shopify automation',
  generator: 'shopify automation',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
