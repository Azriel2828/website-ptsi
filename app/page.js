// Simpan berkas ini sebagai: app/page.js (menimpa berkas yang sudah ada)
//
// Ini BUKAN tampilan akhir. Tujuannya cuma satu: membuktikan bahwa
// aplikasimu benar-benar bisa membaca data dari Supabase. Kalau nama
// layanan dan judul berita muncul di layar, koneksinya sudah benar
// dan kita bisa lanjut membangun tampilan aslinya.

import { supabase } from '@/lib/supabase'

export const revalidate = 0

export default async function Home() {
  const { data: layanan, error: errorLayanan } = await supabase
    .from('layanan')
    .select('id, nama, deskripsi_singkat, unggulan')
    .order('urutan')

  const { data: berita, error: errorBerita } = await supabase
    .from('berita')
    .select('id, judul, kategori, tanggal_terbit, status')
    .eq('status', 'terbit')
    .order('tanggal_terbit', { ascending: false })

  const gagal = errorLayanan || errorBerita

  if (gagal) {
    return (
      <main className="mx-auto max-w-2xl p-10">
        <h1 className="text-xl font-medium text-red-700">Koneksi gagal</h1>
        <p className="mt-2 text-sm text-neutral-600">
          Periksa kembali isi berkas .env.local, lalu hentikan server dan
          jalankan ulang npm run dev.
        </p>
        <pre className="mt-4 overflow-auto rounded bg-neutral-100 p-4 text-xs">
          {gagal.message}
        </pre>
      </main>
    )
  }

  return (
    <main className="mx-auto max-w-2xl p-10">
      <p className="text-xs uppercase tracking-widest text-[#E8611A]">
        Uji koneksi
      </p>
      <h1 className="mt-2 text-2xl font-medium text-[#0B3C7D]">
        Database tersambung
      </h1>

      <h2 className="mt-10 text-lg font-medium">
        Layanan ({layanan.length})
      </h2>
      <ul className="mt-3 divide-y divide-neutral-200 border-y border-neutral-200">
        {layanan.map((item) => (
          <li key={item.id} className="py-3">
            <div className="flex items-center gap-2">
              <span className="font-medium">{item.nama}</span>
              {item.unggulan && (
                <span className="rounded bg-orange-100 px-2 py-0.5 text-xs text-orange-800">
                  unggulan
                </span>
              )}
            </div>
            <p className="mt-1 text-sm text-neutral-600">
              {item.deskripsi_singkat}
            </p>
          </li>
        ))}
      </ul>

      <h2 className="mt-10 text-lg font-medium">
        Berita terbit ({berita.length})
      </h2>
      <ul className="mt-3 divide-y divide-neutral-200 border-y border-neutral-200">
        {berita.map((item) => (
          <li key={item.id} className="py-3">
            <p className="text-xs text-neutral-500">
              {item.tanggal_terbit} · {item.kategori}
            </p>
            <p className="mt-1 font-medium">{item.judul}</p>
          </li>
        ))}
      </ul>
    </main>
  )
}