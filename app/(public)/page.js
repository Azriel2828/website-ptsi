// Simpan sebagai: app/(public)/page.js
// Lalu HAPUS berkas app/page.js yang lama.

import Link from 'next/link'
import {
  ArrowUpRight,
  Award,
  ClipboardCheck,
  FileCheck,
  Factory,
  Package,
  Ship,
  ShieldCheck,
} from 'lucide-react'
import { supabase } from '@/lib/supabase'

export const revalidate = 0

// Nilai kolom "ikon" di database berupa teks, lalu dicocokkan ke sini.
// Kalau tidak ketemu, dipakai ikon cadangan supaya kartunya tidak kosong.
const daftarIkon = {
  'clipboard-check': ClipboardCheck,
  package: Package,
  'building-factory': Factory,
  certificate: Award,
  ship: Ship,
  'file-check': FileCheck,
}

const statistik = [
  { angka: '145+', label: 'Jenis layanan' },
  { angka: '9', label: 'Kantor cabang' },
  { angka: '10+', label: 'Sektor industri' },
  { angka: '34', label: 'Provinsi terlayani' },
]

function tanggalIndonesia(nilai) {
  return new Date(nilai).toLocaleDateString('id-ID', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })
}

export default async function Beranda() {
  const { data: layanan } = await supabase
    .from('layanan')
    .select('id, nama, slug, ikon, deskripsi_singkat')
    .eq('unggulan', true)
    .order('urutan')
    .limit(4)

  const { data: berita } = await supabase
    .from('berita')
    .select('id, judul, slug, kategori, tanggal_terbit, gambar_url, ringkasan')
    .eq('status', 'terbit')
    .order('tanggal_terbit', { ascending: false })
    .limit(4)

  const unggulan = layanan ?? []
  const semuaBerita = berita ?? []
  const utama = semuaBerita[0]
  const lainnya = semuaBerita.slice(1)

  return (
    <>
      {/* Hero */}
      <section className="border-b border-[#e3e7ed]">
        <div className="mx-auto grid max-w-5xl md:grid-cols-[1.15fr_0.85fr]">
          <div className="px-5 py-14 md:pr-10">
            <div className="flex items-center gap-2">
              <span className="h-0.5 w-7 bg-[#e8611a]" />
              <span className="text-[11px] tracking-[0.12em] text-[#e8611a]">
                SEJAK 1991
              </span>
            </div>
            <h1 className="mt-4 text-4xl leading-tight font-medium text-[#0b3c7d] md:text-[42px]">
              Kepastian yang bisa dipertanggungjawabkan
            </h1>
            <p className="mt-4 max-w-md text-sm leading-relaxed text-neutral-600">
              Testing, inspection, certification, dan consultation independen
              untuk infrastruktur, energi, maritim, dan ketahanan pangan.
            </p>
            <div className="mt-7 flex flex-wrap items-center gap-4">
              <Link
                href="/layanan"
                className="bg-[#0b3c7d] px-6 py-3 text-sm text-white transition hover:bg-[#082c5c]"
              >
                Jelajahi layanan
              </Link>
              <Link
                href="/tentang"
                className="border-b border-neutral-300 pb-0.5 text-sm text-[#0b3c7d]"
              >
                Profil perusahaan
              </Link>
            </div>
          </div>

          <div className="flex min-h-[240px] items-end bg-[#134a94]">
            <div className="p-7 pb-14 text-white md:pb-16">
              <ShieldCheck size={30} className="text-[#e8611a]" />
              <p className="mt-3 text-sm font-medium">
                Independen dan terakreditasi
              </p>
              <p className="mt-1.5 text-xs leading-relaxed text-[#c7d8ee]">
                Setiap laporan melewati verifikasi berlapis sebelum diterbitkan.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Statistik, sengaja ditarik naik agar menumpuk ke hero */}
      <div className="relative z-10 mx-auto max-w-5xl px-5 md:px-0">
        <div className="-mt-7 grid grid-cols-2 border border-[#e3e7ed] bg-white md:grid-cols-4">
          {statistik.map((item, i) => (
            <div
              key={item.label}
              className={`px-4 py-5 text-center ${
                i < statistik.length - 1 ? 'md:border-r md:border-[#e3e7ed]' : ''
              }`}
            >
              <p className="text-2xl font-medium text-[#0b3c7d]">{item.angka}</p>
              <p className="mt-1 text-[11px] text-neutral-500">{item.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Layanan unggulan */}
      <section className="mx-auto max-w-5xl px-5 py-14">
        <p className="text-[11px] tracking-[0.1em] text-[#e8611a]">
          LINI LAYANAN
        </p>
        <div className="mt-1.5 flex items-baseline justify-between gap-4">
          <h2 className="text-2xl font-medium">Empat layanan unggulan</h2>
          <Link href="/layanan" className="text-xs whitespace-nowrap text-[#e8611a]">
            Semua layanan
          </Link>
        </div>

        <div className="mt-6 grid gap-4 md:grid-cols-2">
          {unggulan.map((item) => {
            const Ikon = daftarIkon[item.ikon] ?? ClipboardCheck
            return (
              <Link
                key={item.id}
                href={`/layanan/${item.slug}`}
                className="group rounded-lg border border-[#e3e7ed] p-6 transition hover:border-[#0b3c7d]"
              >
                <div className="flex items-start justify-between">
                  <Ikon size={24} className="text-[#0b3c7d]" />
                  <ArrowUpRight
                    size={17}
                    className="text-neutral-300 transition group-hover:text-[#e8611a]"
                  />
                </div>
                <p className="mt-3 font-medium">{item.nama}</p>
                <p className="mt-1.5 text-sm leading-relaxed text-neutral-600">
                  {item.deskripsi_singkat}
                </p>
              </Link>
            )
          })}
        </div>
      </section>

      {/* Berita */}
      <section className="border-t border-[#e3e7ed] bg-[#f5f7fa]">
        <div className="mx-auto max-w-5xl px-5 py-14">
          <div className="flex items-baseline justify-between gap-4">
            <h2 className="text-2xl font-medium">Kabar terbaru</h2>
            <Link href="/berita" className="text-xs whitespace-nowrap text-[#e8611a]">
              Semua berita
            </Link>
          </div>

          {utama ? (
            <div className="mt-6 grid gap-8 md:grid-cols-[1.25fr_1fr]">
              <Link href={`/berita/${utama.slug}`} className="group block">
                <div className="h-52 overflow-hidden bg-[#cedbea]">
                  {utama.gambar_url && (
                    <img
                      src={utama.gambar_url}
                      alt={utama.judul}
                      className="h-full w-full object-cover transition group-hover:scale-105"
                    />
                  )}
                </div>
                <p className="mt-3 text-[11px] tracking-wide text-[#e8611a] uppercase">
                  {tanggalIndonesia(utama.tanggal_terbit)} · {utama.kategori}
                </p>
                <h3 className="mt-1.5 text-lg leading-snug font-medium">
                  {utama.judul}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-neutral-600">
                  {utama.ringkasan}
                </p>
              </Link>

              <div>
                {lainnya.map((item, i) => (
                  <Link
                    key={item.id}
                    href={`/berita/${item.slug}`}
                    className={`block py-4 ${
                      i < lainnya.length - 1 ? 'border-b border-neutral-200' : ''
                    }`}
                  >
                    <p className="text-[11px] text-neutral-500">
                      {tanggalIndonesia(item.tanggal_terbit)}
                    </p>
                    <p className="mt-1 leading-snug font-medium">{item.judul}</p>
                  </Link>
                ))}
              </div>
            </div>
          ) : (
            <p className="mt-6 text-sm text-neutral-500">Belum ada berita.</p>
          )}
        </div>
      </section>

      {/* Ajakan bertindak */}
      <section className="bg-[#e8611a]">
        <div className="mx-auto flex max-w-5xl flex-col gap-5 px-5 py-8 sm:flex-row sm:items-center sm:justify-between">
          <div className="text-white">
            <p className="text-lg font-medium">
              Butuh jaminan mutu untuk proyek Anda?
            </p>
            <p className="mt-1 text-sm text-[#fbe0d2]">
              Tim kami siap membantu menentukan layanan yang tepat.
            </p>
          </div>
          <Link
            href="/kontak"
            className="bg-white px-6 py-3 text-center text-sm font-medium whitespace-nowrap text-[#b84a12]"
          >
            Hubungi kami
          </Link>
        </div>
      </section>
    </>
  )
}
