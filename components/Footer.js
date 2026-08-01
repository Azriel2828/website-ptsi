// Simpan sebagai: components/Footer.js

import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="bg-[#082c5c] text-[#a9c0dc]">
      <div className="mx-auto max-w-5xl px-5 py-10">
        <div className="grid gap-8 md:grid-cols-3">
          <div>
            <div className="flex items-center gap-2.5">
              <span className="flex h-8 w-8 items-center justify-center bg-[#e8611a] text-xs font-medium text-white">
                SI
              </span>
              <span className="text-sm font-medium text-white">
                Surveyor Indonesia
              </span>
            </div>
            <p className="mt-3 text-xs leading-relaxed">
              Layanan testing, inspection, certification, dan consultation
              independen bagi sektor strategis di Indonesia.
            </p>
          </div>

          <div>
            <p className="text-xs font-medium text-white">Jelajahi</p>
            <div className="mt-3 flex flex-col gap-2 text-xs">
              <Link href="/tentang" className="hover:text-white">Tentang kami</Link>
              <Link href="/layanan" className="hover:text-white">Layanan</Link>
              <Link href="/berita" className="hover:text-white">Berita</Link>
              <Link href="/kontak" className="hover:text-white">Kontak</Link>
            </div>
          </div>

          <div>
            <p className="text-xs font-medium text-white">Kantor pusat</p>
            <p className="mt-3 text-xs leading-relaxed">
              Graha Surveyor Indonesia
              <br />
              Jakarta Selatan, Indonesia
            </p>
          </div>
        </div>

        <div className="mt-9 flex flex-col gap-2 border-t border-[#1b4c86] pt-5 text-[11px] sm:flex-row sm:items-center sm:justify-between">
          <span>© {new Date().getFullYear()} PT Surveyor Indonesia</span>
          <div className="flex gap-5">
            <span>Kebijakan privasi</span>
            <span>Karier</span>
            <Link href="/admin" className="hover:text-white">Admin</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
