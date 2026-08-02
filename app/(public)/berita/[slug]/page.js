// Simpan sebagai: app/(public)/berita/[slug]/page.js

import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ArrowLeft } from 'lucide-react'
import { supabase } from '@/lib/supabase'

export const revalidate = 0

function tanggalIndonesia(nilai) {
  return new Date(nilai).toLocaleDateString('id-ID', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })
}

async function ambilBerita(slug) {
  const { data } = await supabase
    .from('berita')
    .select('*')
    .eq('slug', slug)
    .eq('status', 'terbit')
    .single()
  return data
}

// Judul tab peramban ikut menyesuaikan judul berita.
export async function generateMetadata({ params }) {
  const { slug } = await params
  const berita = await ambilBerita(slug)
  if (!berita) return { title: 'Berita tidak ditemukan' }
  return { title: berita.judul, description: berita.ringkasan }
}

export default async function DetailBerita({ params }) {
  const { slug } = await params
  const berita = await ambilBerita(slug)

  // Kalau slug tidak ada atau beritanya masih draf, tampilkan halaman 404.
  if (!berita) notFound()

  const { data: lainnya } = await supabase
    .from('berita')
    .select('id, judul, slug, tanggal_terbit')
    .eq('status', 'terbit')
    .neq('id', berita.id)
    .order('tanggal_terbit', { ascending: false })
    .limit(3)

  // Isi disimpan sebagai teks biasa. Baris kosong dipakai sebagai
  // pemisah paragraf saat ditampilkan.
  const paragraf = berita.isi.split(/\n\s*\n/).filter(Boolean)

  return (
    <article className="mx-auto max-w-3xl px-5 py-10">
      <Link
        href="/berita"
        className="inline-flex items-center gap-1.5 text-xs text-neutral-500 transition hover:text-[#0b3c7d]"
      >
        <ArrowLeft size={14} />
        Kembali ke daftar berita
      </Link>

      <p className="mt-6 text-[11px] tracking-wide text-[#e8611a] uppercase">
        {tanggalIndonesia(berita.tanggal_terbit)} · {berita.kategori}
      </p>
      <h1 className="mt-2 text-3xl leading-tight font-medium text-[#0b3c7d]">
        {berita.judul}
      </h1>
      <p className="mt-3 text-base leading-relaxed text-neutral-600">
        {berita.ringkasan}
      </p>

      {berita.gambar_url && (
        <img
          src={berita.gambar_url}
          alt={berita.judul}
          className="mt-7 h-72 w-full bg-[#cedbea] object-cover"
        />
      )}

      <div className="mt-7 flex flex-col gap-4 text-[15px] leading-[1.8] text-neutral-800">
        {paragraf.map((teks, i) => (
          <p key={i}>{teks}</p>
        ))}
      </div>

      {lainnya && lainnya.length > 0 && (
        <div className="mt-12 border-t border-[#e3e7ed] pt-7">
          <h2 className="text-sm font-medium">Berita lainnya</h2>
          <div className="mt-3">
            {lainnya.map((item) => (
              <Link
                key={item.id}
                href={`/berita/${item.slug}`}
                className="block border-b border-neutral-100 py-3"
              >
                <p className="text-[11px] text-neutral-500">
                  {tanggalIndonesia(item.tanggal_terbit)}
                </p>
                <p className="mt-0.5 text-sm leading-snug font-medium transition hover:text-[#0b3c7d]">
                  {item.judul}
                </p>
              </Link>
            ))}
          </div>
        </div>
      )}
    </article>
  )
}
