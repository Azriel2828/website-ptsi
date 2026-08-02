// Simpan sebagai: app/(public)/layanan/page.js

import Link from 'next/link'
import {
  ArrowUpRight,
  Award,
  ClipboardCheck,
  Factory,
  FileCheck,
  Package,
  Ship,
} from 'lucide-react'
import { supabase } from '@/lib/supabase'

export const revalidate = 0

export const metadata = {
  title: 'Layanan',
  description:
    'Lini layanan testing, inspection, certification, dan consultation PT Surveyor Indonesia.',
}

const daftarIkon = {
  'clipboard-check': ClipboardCheck,
  package: Package,
  'building-factory': Factory,
  certificate: Award,
  ship: Ship,
  'file-check': FileCheck,
}

export default async function DaftarLayanan() {
  const { data } = await supabase
    .from('layanan')
    .select('id, nama, slug, ikon, deskripsi_singkat, unggulan')
    .order('urutan')

  const layanan = data ?? []

  return (
    <>
      <section className="border-b border-[#e3e7ed] bg-[#0b3c7d]">
        <div className="mx-auto max-w-5xl px-5 py-12">
          <div className="flex items-center gap-2">
            <span className="h-0.5 w-7 bg-[#e8611a]" />
            <span className="text-[11px] tracking-[0.12em] text-[#e8611a]">
              LINI LAYANAN
            </span>
          </div>
          <h1 className="mt-3 text-3xl font-medium text-white">Layanan kami</h1>
          <p className="mt-2 max-w-lg text-sm leading-relaxed text-[#c7d8ee]">
            Solusi assurance menyeluruh untuk memastikan mutu, kuantitas, dan
            kepatuhan di berbagai sektor industri.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-5 py-12">
        {layanan.length === 0 ? (
          <p className="text-sm text-neutral-500">Belum ada layanan.</p>
        ) : (
          <div className="grid gap-4 md:grid-cols-2">
            {layanan.map((item) => {
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
                  <div className="mt-3 flex items-center gap-2">
                    <p className="font-medium">{item.nama}</p>
                    {item.unggulan && (
                      <span className="rounded bg-[#fbeadf] px-1.5 py-0.5 text-[9px] text-[#a84a12]">
                        Unggulan
                      </span>
                    )}
                  </div>
                  <p className="mt-1.5 text-sm leading-relaxed text-neutral-600">
                    {item.deskripsi_singkat}
                  </p>
                </Link>
              )
            })}
          </div>
        )}
      </section>

      <section className="bg-[#e8611a]">
        <div className="mx-auto flex max-w-5xl flex-col gap-5 px-5 py-8 sm:flex-row sm:items-center sm:justify-between">
          <div className="text-white">
            <p className="text-lg font-medium">Belum menemukan yang dicari?</p>
            <p className="mt-1 text-sm text-[#fbe0d2]">
              Tim kami dapat membantu menentukan layanan yang sesuai kebutuhan.
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
