// Simpan sebagai: app/(public)/layout.js
//
// Nama folder yang diapit tanda kurung TIDAK muncul di alamat situs.
// Jadi app/(public)/page.js tetap terbuka di "/", bukan "/public".
// Gunanya cuma satu: mengelompokkan halaman publik agar bisa berbagi
// header dan footer, sementara halaman admin nanti punya tampilan sendiri.

import Header from '@/components/Header'
import Footer from '@/components/Footer'

export default function PublicLayout({ children }) {
  return (
    <>
      <Header />
      <main>{children}</main>
      <Footer />
    </>
  )
}
