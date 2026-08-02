// Simpan sebagai: app/(public)/layanan/[slug]/page.js

import Link from 'next/link'
import { notFound } from 'next/navigation'
import {
  ArrowLeft,
  Award,
  ClipboardCheck,
  Factory,
  FileCheck,
  Package,
  Ship,
} from 'lucide-react'
import { supabase } from '@/lib/supabase'

export const revalidate = 0

const daftarIkon = {
  'clipboard-check': ClipboardCheck,
  package: Package,
  'building-factory': Factory,
  certificate: Award,
  ship: Ship,
  'file-check': FileCheck,
}

async function ambilLayanan(slug) {
  const { data } = await supabase
    .from('layanan')
    .select('*')
    .eq('slug', slug)
    .single()
  return data
}

export async function generateMetadata({ params }) {
  const { slug } = await params
  const layanan = await ambilLayanan(slug)
  if (!layanan) return { title: 'Layanan tidak ditemukan' }
  return { title: layanan.nama, description: layanan.deskripsi_singkat }
}

export default async function DetailLayanan({ params }) {
  const { slug } = await params
  const layanan = await ambilLayanan(slug)

  if (!layanan) notFound()

  const Ikon = daftarIkon[layanan.ikon] ?? ClipboardCheck

  const { data: lainnya } = await supabase
    .from('layanan')
    .select('id, nama, slug, deskripsi_singkat')
    .neq('id', layanan.id)
    .order('urutan')
    .limit(3)

  const paragraf = (layanan.deskripsi_lengkap ?? '')
    .split(/\n\s*\n/)
    .filter(Boolean)

  return (
    <>
      <section className="border-b border-[#e3e7ed] bg-[#0b3c7d]">
        <div className="mx-auto max-w-3xl px-5 py-12">
          <Link
            href="/layanan"
            className="inline-flex items-center gap-1.5 text-xs text-[#c7d8ee] transition hover:text-white"
          >
            <ArrowLeft size={14} />
            Kembali ke daftar layanan
          </Link>
          <Ikon size={30} className="mt-6 text-[#e8611a]" />
          <h1 className="mt-3 text-3xl leading-tight font-medium text-white">
            {layanan.nama}
          </h1>
          <p className="mt-2 text-sm leading-relaxed text-[#c7d8ee]">
            {layanan.deskripsi_singkat}
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-3xl px-5 py-10">
        {paragraf.length > 0 ? (
          <div className="flex flex-col gap-4 text-[15px] leading-[1.8] text-neutral-800">
            {paragraf.map((teks, i) => (
              <p key={i}>{teks}</p>
            ))}
          </div>
        ) : (
          <p className="text-sm text-neutral-500">
            Penjelasan lengkap layanan ini belum tersedia. Silakan hubungi kami
            untuk keterangan lebih lanjut.
          </p>
        )}

        <div className="mt-9 border border-[#e3e7ed] bg-[#f5f7fa] px-6 py-5">
          <p className="font-medium">Tertarik dengan layanan ini?</p>
          <p className="mt-1 text-sm text-neutral-600">
            Tim kami siap menjelaskan ruang lingkup dan tahapan pelaksanaannya.
          </p>
          <Link
            href="/kontak"
            className="mt-4 inline-block bg-[#0b3c7d] px-5 py-2.5 text-sm text-white transition hover:bg-[#082c5c]"
          >
            Hubungi kami
          </Link>
        </div>

        {lainnya && lainnya.length > 0 && (
          <div className="mt-12 border-t border-[#e3e7ed] pt-7">
            <h2 className="text-sm font-medium">Layanan lainnya</h2>
            <div className="mt-3">
              {lainnya.map((item) => (
                <Link
                  key={item.id}
                  href={`/layanan/${item.slug}`}
                  className="block border-b border-neutral-100 py-3"
                >
                  <p className="text-sm font-medium transition hover:text-[#0b3c7d]">
                    {item.nama}
                  </p>
                  <p className="mt-0.5 text-xs text-neutral-500">
                    {item.deskripsi_singkat}
                  </p>
                </Link>
              ))}
            </div>
          </div>
        )}
      </section>
    </>
  )
}
