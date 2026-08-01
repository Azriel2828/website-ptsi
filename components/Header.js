// Simpan sebagai: components/Header.js (menimpa yang lama)
//
// Susunan: logo Danantara mentok kiri, lalu menu, lalu logo Surveyor
// Indonesia mentok kanan.
//
// PENTING: sesuaikan dua nama berkas di bawah ini dengan nama asli
// berkas yang kamu simpan di folder public. Kalau berkasmu berakhiran
// .svg, ganti .png menjadi .svg.

'use client'

import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { useState } from 'react'
import { Menu, X } from 'lucide-react'

const LOGO_DANANTARA = '/logo_danantara.png'
const LOGO_PTSI = '/logo_ptsi.png'

const menu = [
  { label: 'Beranda', href: '/' },
  { label: 'Tentang', href: '/tentang' },
  { label: 'Layanan', href: '/layanan' },
  { label: 'Berita', href: '/berita' },
]

export default function Header() {
  const [buka, setBuka] = useState(false)
  const path = usePathname()

  return (
    <header className="sticky top-0 z-50 bg-white">
      <div className="bg-[#082c5c] text-[11px] text-[#a9c0dc]">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-5 py-1.5">
          <span>Anggota holding IDSurvey</span>
          <span className="hidden sm:block">
            Your trusted partner for assurance
          </span>
        </div>
      </div>

      <div className="border-b border-[#e3e7ed]">
        <div className="mx-auto flex max-w-5xl items-center justify-between gap-4 px-5 py-3">
          {/* Kiri: Danantara */}
          <Image
            src={LOGO_DANANTARA}
            alt="Danantara Indonesia"
            width={210}
            height={70}
            priority
            className="h-11 w-auto shrink-0 md:h-12"
          />

          {/* Kanan: menu lalu logo PTSI */}
          <div className="flex items-center gap-7">
            <nav className="hidden items-center gap-7 lg:flex">
              {menu.map((item) => {
                const aktif =
                  item.href === '/' ? path === '/' : path.startsWith(item.href)
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={
                      aktif
                        ? 'text-sm text-[#0b3c7d]'
                        : 'text-sm text-neutral-600 transition hover:text-[#0b3c7d]'
                    }
                  >
                    {item.label}
                  </Link>
                )
              })}
              <Link
                href="/kontak"
                className="bg-[#e8611a] px-4 py-2 text-sm text-white transition hover:bg-[#c9500f]"
              >
                Konsultasi
              </Link>
            </nav>

            <Link href="/" className="shrink-0">
              <Image
                src={LOGO_PTSI}
                alt="PT Surveyor Indonesia"
                width={200}
                height={44}
                priority
                className="h-11 w-auto md:h-12"
              />
            </Link>

            <button
              onClick={() => setBuka(!buka)}
              aria-label="Buka menu"
              className="text-[#0b3c7d] lg:hidden"
            >
              {buka ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </div>

      {buka && (
        <nav className="border-b border-[#e3e7ed] bg-white lg:hidden">
          <div className="mx-auto max-w-5xl px-5 py-2">
            {menu.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setBuka(false)}
                className="block border-b border-neutral-100 py-3 text-sm text-neutral-700"
              >
                {item.label}
              </Link>
            ))}
            <Link
              href="/kontak"
              onClick={() => setBuka(false)}
              className="mt-3 mb-2 block bg-[#e8611a] px-4 py-2.5 text-center text-sm text-white"
            >
              Konsultasi
            </Link>
          </div>
        </nav>
      )}
    </header>
  )
}
