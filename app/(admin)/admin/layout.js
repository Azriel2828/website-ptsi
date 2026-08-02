// Simpan sebagai: app/(admin)/admin/layout.js
//
// Berkas ini punya dua tugas:
// 1. Menjaga pintu. Kalau belum login, pengunjung dilempar ke /admin/login.
// 2. Memasang panel samping navy untuk semua halaman admin.
//
// Halaman login sendiri dikecualikan, kalau tidak, dia ikut terjaga dan
// tidak akan pernah bisa dibuka.

'use client'

import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { ExternalLink, ListChecks, LogOut, Newspaper } from 'lucide-react'
import { supabase } from '@/lib/supabase'

const menu = [
  { label: 'Berita', href: '/admin/berita', icon: Newspaper },
  { label: 'Layanan', href: '/admin/layanan', icon: ListChecks },
]

export default function AdminLayout({ children }) {
  const path = usePathname()
  const router = useRouter()
  const [siap, setSiap] = useState(false)

  const halamanLogin = path === '/admin/login'

  useEffect(() => {
    if (halamanLogin) {
      setSiap(true)
      return
    }

    supabase.auth.getSession().then(({ data }) => {
      if (data.session) {
        setSiap(true)
      } else {
        router.replace('/admin/login')
      }
    })
  }, [halamanLogin, router])

  async function keluar() {
    await supabase.auth.signOut()
    router.replace('/admin/login')
  }

  // Halaman login tampil polos tanpa panel samping.
  if (halamanLogin) return children

  // Selama pemeriksaan sesi berlangsung, jangan tampilkan apa pun.
  // Kalau dilewati, isi panel admin sempat berkedip walau belum login.
  if (!siap) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p className="text-sm text-neutral-500">Memuat...</p>
      </div>
    )
  }

  return (
    <div className="flex min-h-screen bg-[#f7f8fa]">
      <aside className="flex w-16 shrink-0 flex-col bg-[#082c5c] py-4 md:w-52">
        <div className="flex items-center gap-2.5 border-b border-[#1b4c86] px-3 pb-4 md:px-4">
          <span className="flex h-7 w-7 shrink-0 items-center justify-center bg-[#e8611a] text-[10px] font-medium text-white">
            SI
          </span>
          <span className="hidden text-xs text-white md:block">Panel admin</span>
        </div>

        <nav className="mt-4 flex flex-1 flex-col">
          <p className="hidden px-4 pb-2 text-[10px] tracking-[0.1em] text-[#6e8ab0] md:block">
            KELOLA
          </p>
          {menu.map((item) => {
            const Ikon = item.icon
            const aktif = path.startsWith(item.href)
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-2.5 border-l-[3px] px-3 py-2.5 text-sm md:px-4 ${
                  aktif
                    ? 'border-[#e8611a] bg-[#12457f] text-white'
                    : 'border-transparent text-[#a9c0dc] hover:text-white'
                }`}
              >
                <Ikon size={17} className="shrink-0" />
                <span className="hidden md:block">{item.label}</span>
              </Link>
            )
          })}

          <p className="mt-5 hidden px-4 pb-2 text-[10px] tracking-[0.1em] text-[#6e8ab0] md:block">
            AKUN
          </p>
          <Link
            href="/"
            target="_blank"
            className="flex items-center gap-2.5 border-l-[3px] border-transparent px-3 py-2.5 text-sm text-[#a9c0dc] hover:text-white md:px-4"
          >
            <ExternalLink size={17} className="shrink-0" />
            <span className="hidden md:block">Lihat situs</span>
          </Link>
          <button
            onClick={keluar}
            className="flex items-center gap-2.5 border-l-[3px] border-transparent px-3 py-2.5 text-left text-sm text-[#a9c0dc] hover:text-white md:px-4"
          >
            <LogOut size={17} className="shrink-0" />
            <span className="hidden md:block">Keluar</span>
          </button>
        </nav>
      </aside>

      <div className="min-w-0 flex-1">{children}</div>
    </div>
  )
}
