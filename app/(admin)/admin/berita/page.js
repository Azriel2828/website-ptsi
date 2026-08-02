// Simpan sebagai: app/(admin)/admin/berita/page.js

'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import { Eye, Pencil, Plus, Search, Trash2 } from 'lucide-react'
import { supabase } from '@/lib/supabase'

function tanggalIndonesia(nilai) {
  return new Date(nilai).toLocaleDateString('id-ID', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })
}

export default function AdminBerita() {
  const [data, setData] = useState([])
  const [muat, setMuat] = useState(true)
  const [cari, setCari] = useState('')
  const [hapusTarget, setHapusTarget] = useState(null)
  const [prosesHapus, setProsesHapus] = useState(false)
  const [pesan, setPesan] = useState('')

  async function ambilData() {
    setMuat(true)
    const { data: hasil, error } = await supabase
      .from('berita')
      .select('id, judul, slug, kategori, tanggal_terbit, status')
      .order('tanggal_terbit', { ascending: false })

    if (error) setPesan(error.message)
    setData(hasil ?? [])
    setMuat(false)
  }

  useEffect(() => {
    ambilData()
  }, [])

  async function hapus() {
    setProsesHapus(true)
    const { error } = await supabase
      .from('berita')
      .delete()
      .eq('id', hapusTarget.id)

    setProsesHapus(false)
    setHapusTarget(null)

    if (error) {
      setPesan(error.message)
      return
    }
    ambilData()
  }

  const tersaring = data.filter((item) =>
    item.judul.toLowerCase().includes(cari.toLowerCase())
  )

  const jumlahTerbit = data.filter((i) => i.status === 'terbit').length
  const jumlahDraf = data.length - jumlahTerbit

  return (
    <>
      <div className="flex items-center justify-between border-b border-[#e3e7ed] bg-white px-5 py-3.5">
        <h1 className="text-lg font-medium">Berita</h1>
        <Link
          href="/admin/berita/baru"
          className="flex items-center gap-1.5 rounded-md bg-[#e8611a] px-3.5 py-2 text-xs text-white transition hover:bg-[#c9500f]"
        >
          <Plus size={14} />
          Tambah berita
        </Link>
      </div>

      <div className="p-5">
        {pesan && (
          <p className="mb-4 rounded-md bg-red-50 px-3 py-2.5 text-xs text-red-700">
            {pesan}
          </p>
        )}

        <div className="grid grid-cols-3 gap-3">
          <div className="rounded-lg border border-[#e3e7ed] bg-white px-4 py-3">
            <p className="text-[11px] text-neutral-500">Total berita</p>
            <p className="mt-0.5 text-xl font-medium text-[#0b3c7d]">
              {data.length}
            </p>
          </div>
          <div className="rounded-lg border border-[#e3e7ed] bg-white px-4 py-3">
            <p className="text-[11px] text-neutral-500">Terbit</p>
            <p className="mt-0.5 text-xl font-medium text-[#0b3c7d]">
              {jumlahTerbit}
            </p>
          </div>
          <div className="rounded-lg border border-[#e3e7ed] bg-white px-4 py-3">
            <p className="text-[11px] text-neutral-500">Draf</p>
            <p className="mt-0.5 text-xl font-medium text-[#0b3c7d]">
              {jumlahDraf}
            </p>
          </div>
        </div>

        <div className="mt-4 flex items-center gap-2 rounded-md border border-[#dde2e9] bg-white px-3 py-2">
          <Search size={15} className="shrink-0 text-neutral-400" />
          <input
            value={cari}
            onChange={(e) => setCari(e.target.value)}
            placeholder="Cari judul berita"
            className="w-full text-xs outline-none"
          />
        </div>

        <div className="mt-3 overflow-hidden rounded-lg border border-[#e3e7ed] bg-white">
          {muat ? (
            <p className="px-4 py-8 text-center text-xs text-neutral-500">
              Memuat data...
            </p>
          ) : tersaring.length === 0 ? (
            <p className="px-4 py-8 text-center text-xs text-neutral-500">
              {data.length === 0
                ? 'Belum ada berita. Klik Tambah berita untuk membuat yang pertama.'
                : 'Tidak ada judul yang cocok.'}
            </p>
          ) : (
            <table className="w-full table-fixed text-xs">
              <thead>
                <tr className="bg-[#f2f5f8] text-left text-neutral-600">
                  <th className="w-[46%] px-4 py-2.5 font-normal">Judul</th>
                  <th className="hidden w-[17%] px-2 py-2.5 font-normal sm:table-cell">
                    Kategori
                  </th>
                  <th className="w-[15%] px-2 py-2.5 font-normal">Status</th>
                  <th className="px-4 py-2.5 text-right font-normal">Aksi</th>
                </tr>
              </thead>
              <tbody>
                {tersaring.map((item) => (
                  <tr key={item.id} className="border-t border-[#edf0f4]">
                    <td className="px-4 py-3">
                      <p className="truncate font-medium text-neutral-900">
                        {item.judul}
                      </p>
                      <p className="mt-0.5 text-[10px] text-neutral-400">
                        {tanggalIndonesia(item.tanggal_terbit)}
                      </p>
                    </td>
                    <td className="hidden px-2 py-3 text-neutral-600 sm:table-cell">
                      {item.kategori}
                    </td>
                    <td className="px-2 py-3">
                      <span
                        className={`rounded px-2 py-0.5 text-[10px] ${
                          item.status === 'terbit'
                            ? 'bg-green-50 text-green-800'
                            : 'bg-amber-50 text-amber-800'
                        }`}
                      >
                        {item.status === 'terbit' ? 'Terbit' : 'Draf'}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center justify-end gap-3 text-neutral-400">
                        <Link
                          href={`/berita/${item.slug}`}
                          target="_blank"
                          title="Lihat di situs"
                        >
                          <Eye size={15} className="hover:text-neutral-700" />
                        </Link>
                        <Link
                          href={`/admin/berita/${item.id}`}
                          title="Ubah"
                          className="text-[#0b3c7d]"
                        >
                          <Pencil size={15} />
                        </Link>
                        <button
                          onClick={() => setHapusTarget(item)}
                          title="Hapus"
                          className="text-[#c0433f]"
                        >
                          <Trash2 size={15} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>

      {/* Dialog konfirmasi hapus */}
      {hapusTarget && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#082c5c]/50 px-5">
          <div className="w-full max-w-sm rounded-lg bg-white p-6">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-red-50">
              <Trash2 size={19} className="text-[#c0433f]" />
            </div>
            <h2 className="mt-4 font-medium">Hapus berita ini?</h2>
            <p className="mt-1.5 text-xs text-neutral-600">
              Data yang dihapus tidak bisa dikembalikan.
            </p>

            <div className="mt-3 border-l-[3px] border-neutral-300 bg-[#f5f7fa] px-3 py-2.5">
              <p className="text-xs font-medium">{hapusTarget.judul}</p>
              <p className="mt-0.5 text-[10px] text-neutral-500">
                {hapusTarget.kategori} · {tanggalIndonesia(hapusTarget.tanggal_terbit)}
              </p>
            </div>

            <div className="mt-5 flex justify-end gap-2">
              <button
                onClick={() => setHapusTarget(null)}
                disabled={prosesHapus}
                className="rounded-md border border-[#d5dae2] px-4 py-2 text-xs text-neutral-700"
              >
                Batal
              </button>
              <button
                onClick={hapus}
                disabled={prosesHapus}
                className="rounded-md bg-[#c0433f] px-4 py-2 text-xs text-white disabled:opacity-60"
              >
                {prosesHapus ? 'Menghapus...' : 'Ya, hapus'}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
