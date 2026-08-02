// Simpan sebagai: app/(public)/berita/page.js

import Link from 'next/link'
import { supabase } from '@/lib/supabase'


export const revalidate = 0

export const metadata = {
  title: 'Berita',
  description: 'Kabar, kegiatan, dan publikasi terbaru PT Surveyor Indonesia.',
}

function tanggalIndonesia(nilai) {
  return new Date(nilai).toLocaleDateString('id-ID', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })
}

export default async function DaftarBerita() {
  const { data } = await supabase
    .from('berita')
    .select('id, judul, slug, kategori, tanggal_terbit, gambar_url, ringkasan')
    .eq('status', 'terbit')
    .order('tanggal_terbit', { ascending: false })

  const berita = data ?? []

  return (
    <>
      <section className="border-b border-[#e3e7ed] bg-[#0b3c7d]">
        <div className="mx-auto max-w-5xl px-5 py-12">
          <div className="flex items-center gap-2">
            <span className="h-0.5 w-7 bg-[#e8611a]" />
            <span className="text-[11px] tracking-[0.12em] text-[#e8611a]">
              PUBLIKASI
            </span>
          </div>
          <h1 className="mt-3 text-3xl font-medium text-white">Berita & Artikel Terbaru</h1>
          <p className="mt-2 max-w-lg text-sm leading-relaxed text-[#c7d8ee]">
            Kabar terbaru seputar kegiatan, layanan, dan capaian perusahaan.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-5 py-12">
        {berita.length === 0 ? (
          <p className="text-sm text-neutral-500">Belum ada berita terbit.</p>
        ) : (
          <div className="grid gap-7 sm:grid-cols-2 lg:grid-cols-3">
            {berita.map((item) => (
              <Link key={item.id} href={`/berita/${item.slug}`} className="group">
                <div className="h-44 overflow-hidden bg-[#cedbea]">
                  {item.gambar_url && (
                    <img
                      src={item.gambar_url}
                      alt={item.judul}
                      className="h-full w-full object-cover transition group-hover:scale-105"
                    />
                  )}
                </div>
                <p className="mt-3 text-[11px] tracking-wide text-[#e8611a] uppercase">
                  {tanggalIndonesia(item.tanggal_terbit)} · {item.kategori}
                </p>
                <h2 className="mt-1.5 leading-snug font-medium transition group-hover:text-[#0b3c7d]">
                  {item.judul}
                </h2>
                <p className="mt-1.5 text-sm leading-relaxed text-neutral-600">
                  {item.ringkasan}
                </p>
              </Link>
            ))}
          </div>
        )}
      </section>
    </>
  )
}
