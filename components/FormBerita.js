// Simpan sebagai: components/FormBerita.js
//
// Satu komponen ini dipakai dua kali: untuk menambah berita baru dan
// untuk mengubah yang sudah ada. Bedanya cuma ada tidaknya prop "awal".

'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { ArrowLeft } from 'lucide-react'
import { supabase } from '@/lib/supabase'

const kategoriPilihan = ['Korporasi', 'Layanan', 'Kegiatan', 'Publikasi']

// Mengubah judul menjadi slug: huruf kecil, spasi jadi tanda hubung,
// tanda baca dibuang. "Kerja Sama Halal!" menjadi "kerja-sama-halal".
function buatSlug(teks) {
  return teks
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-')
    .slice(0, 80)
}

export default function FormBerita({ awal }) {
  const router = useRouter()
  const ubah = Boolean(awal)

  const [form, setForm] = useState({
    judul: awal?.judul ?? '',
    kategori: awal?.kategori ?? 'Korporasi',
    tanggal_terbit: awal?.tanggal_terbit ?? new Date().toISOString().slice(0, 10),
    gambar_url: awal?.gambar_url ?? '',
    ringkasan: awal?.ringkasan ?? '',
    isi: awal?.isi ?? '',
    status: awal?.status ?? 'draf',
  })
  const [proses, setProses] = useState(false)
  const [pesan, setPesan] = useState('')

  function isi(kunci, nilai) {
    setForm((lama) => ({ ...lama, [kunci]: nilai }))
  }

  async function simpan(e) {
    e.preventDefault()
    setProses(true)
    setPesan('')

    const muatan = {
      ...form,
      gambar_url: form.gambar_url.trim() || null,
      slug: ubah ? awal.slug : buatSlug(form.judul),
    }

    const { error } = ubah
      ? await supabase.from('berita').update(muatan).eq('id', awal.id)
      : await supabase.from('berita').insert(muatan)

    setProses(false)

    if (error) {
      setPesan(
        error.code === '23505'
          ? 'Sudah ada berita dengan judul yang sama. Ubah sedikit judulnya.'
          : error.message
      )
      return
    }

    router.push('/admin/berita')
    router.refresh()
  }

  const gayaInput =
    'mt-1.5 w-full rounded-md border border-[#dde2e9] bg-white px-3 py-2.5 text-sm outline-none focus:border-[#0b3c7d]'

  return (
    <>
      <div className="flex items-center gap-3 border-b border-[#e3e7ed] bg-white px-5 py-3.5">
        <Link href="/admin/berita" className="text-neutral-500">
          <ArrowLeft size={18} />
        </Link>
        <h1 className="text-lg font-medium">
          {ubah ? 'Ubah berita' : 'Tambah berita'}
        </h1>
      </div>

      <form onSubmit={simpan} className="max-w-2xl p-5">
        {pesan && (
          <p className="mb-4 rounded-md bg-red-50 px-3 py-2.5 text-xs text-red-700">
            {pesan}
          </p>
        )}

        <label className="block text-xs font-medium text-neutral-700">
          Judul
        </label>
        <input
          required
          value={form.judul}
          onChange={(e) => isi('judul', e.target.value)}
          className={gayaInput}
          placeholder="Judul berita"
        />
        {!ubah && form.judul && (
          <p className="mt-1 text-[11px] text-neutral-400">
            Alamat halaman: /berita/{buatSlug(form.judul)}
          </p>
        )}

        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          <div>
            <label className="block text-xs font-medium text-neutral-700">
              Kategori
            </label>
            <select
              value={form.kategori}
              onChange={(e) => isi('kategori', e.target.value)}
              className={gayaInput}
            >
              {kategoriPilihan.map((k) => (
                <option key={k} value={k}>
                  {k}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-xs font-medium text-neutral-700">
              Tanggal terbit
            </label>
            <input
              type="date"
              required
              value={form.tanggal_terbit}
              onChange={(e) => isi('tanggal_terbit', e.target.value)}
              className={gayaInput}
            />
          </div>
        </div>

        <label className="mt-4 block text-xs font-medium text-neutral-700">
          URL gambar
        </label>
        <input
          value={form.gambar_url}
          onChange={(e) => isi('gambar_url', e.target.value)}
          className={gayaInput}
          placeholder="https://... (boleh dikosongkan)"
        />
        {form.gambar_url && (
          <img
            src={form.gambar_url}
            alt="Pratinjau"
            className="mt-2 h-32 w-full rounded-md border border-[#e3e7ed] object-cover"
          />
        )}

        <label className="mt-4 block text-xs font-medium text-neutral-700">
          Ringkasan
        </label>
        <textarea
          required
          rows={2}
          value={form.ringkasan}
          onChange={(e) => isi('ringkasan', e.target.value)}
          className={gayaInput}
          placeholder="Satu atau dua kalimat yang tampil di daftar berita."
        />

        <label className="mt-4 block text-xs font-medium text-neutral-700">
          Isi berita
        </label>
        <textarea
          required
          rows={9}
          value={form.isi}
          onChange={(e) => isi('isi', e.target.value)}
          className={gayaInput}
          placeholder="Tulis isi lengkapnya. Tekan Enter dua kali untuk paragraf baru."
        />

        <label className="mt-4 block text-xs font-medium text-neutral-700">
          Status
        </label>
        <select
          value={form.status}
          onChange={(e) => isi('status', e.target.value)}
          className={gayaInput}
        >
          <option value="draf">Draf, belum tampil di situs</option>
          <option value="terbit">Terbit, tampil di situs</option>
        </select>

        <div className="mt-6 flex gap-2">
          <button
            type="submit"
            disabled={proses}
            className="bg-[#0b3c7d] px-6 py-2.5 text-sm text-white transition hover:bg-[#082c5c] disabled:opacity-60"
          >
            {proses ? 'Menyimpan...' : 'Simpan'}
          </button>
          <Link
            href="/admin/berita"
            className="border border-[#d5dae2] px-6 py-2.5 text-sm text-neutral-700"
          >
            Batal
          </Link>
        </div>
      </form>
    </>
  )
}
