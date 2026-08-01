// Simpan sebagai: app/layout.js (menimpa yang lama)
//
// Berkas ini membungkus SELURUH halaman, termasuk halaman admin nanti.
// Karena itu di sini tidak ada header maupun footer. Keduanya cuma
// dipakai di sisi publik, dan diatur di app/(public)/layout.js.

import { Plus_Jakarta_Sans } from 'next/font/google'
import './globals.css'

const fontSans = Plus_Jakarta_Sans({
  variable: '--font-sans',
  subsets: ['latin'],
  display: 'swap',
})

export const metadata = {
  title: {
    default: 'PT Surveyor Indonesia',
    template: '%s | PT Surveyor Indonesia',
  },
  description:
    'Layanan testing, inspection, certification, dan consultation independen untuk sektor infrastruktur, energi, maritim, dan ketahanan pangan di Indonesia.',
}

export default function RootLayout({ children }) {
  return (
    <html lang="id">
      <body className={fontSans.variable}>{children}</body>
    </html>
  )
}
