// Simpan sebagai: components/FormLayanan.js

'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
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

// Ikon sengaja dipilih dari daftar tetap, bukan diketik bebas.
// Kalau diketik bebas, admin bisa memasukkan nama yang tidak ada
// dan kartunya jadi kosong di beranda.
const pilihanIkon = [
  { nilai: 'clipboard-check', label: 'Sertifikasi', Ikon: ClipboardCheck },
  { nilai: 'package', label: 'Kargo', Ikon: Package },
  { nilai: 'building-factory', label: 'Industri', Ikon: Factory },
  { nilai: 'certificate', label: 'Penghargaan', Ikon: Award },
  { nilai: 'ship', label: 'Maritim', Ikon: Ship },
  { nilai: 'file-check', label: 'Dokumen', Ikon: FileCheck },
]

function buatSlug(teks) {
  return teks
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-')
    .slice(0, 80)
}

export default function FormLayanan({ awal, urutanBerikutnya = 1 }) {
  const router = useRouter()
  const ubah = Boolean(awal)

  const [form, setForm] = useState({
    nama: awal?.nama ?? '',
    ikon: awal?.ikon ?? 'clipboard-check',
    deskripsi_singkat: awal?.deskripsi_singkat ?? '',
    deskripsi_lengkap: awal?.deskripsi_lengkap ?? '',
    unggulan: awal?.unggulan ?? false,
    urutan: awal?.urutan ?? urutanBerikutnya,
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
      urutan: Number(form.urutan),
      deskripsi_lengkap: form.deskripsi_lengkap.trim() || null,
      slug: ubah ? awal.slug : buatSlug(form.nama),
    }

    const { error } = ubah
      ? await supabase.from('layanan').update(muatan).eq('id', awal.id)
      : await supabase.from('layanan').insert(muatan)

    setProses(false)

    if (error) {
      setPesan(
        error.code === '23505'
          ? 'Sudah ada layanan dengan nama yang sama. Ubah sedikit namanya.'
          : error.message
      )
      return
    }

    router.push('/admin/layanan')
    router.refresh()
  }

  const gayaInput =
    'mt-1.5 w-full rounded-md border border-[#dde2e9] bg-white px-3 py-2.5 text-sm outline-none focus:border-[#0b3c7d]'

  return (
    <>
      <div className="flex items-center gap-3 border-b border-[#e3e7ed] bg-white px-5 py-3.5">
        <Link href="/admin/layanan" className="text-neutral-500">
          <ArrowLeft size={18} />
        </Link>
        <h1 className="text-lg font-medium">
          {ubah ? 'Ubah layanan' : 'Tambah layanan'}
        </h1>
      </div>

      <form onSubmit={simpan} className="max-w-2xl p-5">
        {pesan && (
          <p className="mb-4 rounded-md bg-red-50 px-3 py-2.5 text-xs text-red-700">
            {pesan}
          </p>
        )}

        <label className="block text-xs font-medium text-neutral-700">
          Nama layanan
        </label>
        <input
          required
          value={form.nama}
          onChange={(e) => isi('nama', e.target.value)}
          className={gayaInput}
          placeholder="Contoh: Sertifikasi TKDN"
        />

        <label className="mt-4 block text-xs font-medium text-neutral-700">
          Ikon
        </label>
        <div className="mt-1.5 grid grid-cols-3 gap-2 sm:grid-cols-6">
          {pilihanIkon.map(({ nilai, label, Ikon }) => {
            const terpilih = form.ikon === nilai
            return (
              <button
                key={nilai}
                type="button"
                onClick={() => isi('ikon', nilai)}
                className={`flex flex-col items-center gap-1.5 rounded-md border py-3 ${
                  terpilih
                    ? 'border-[#0b3c7d] bg-[#eef3f9]'
                    : 'border-[#dde2e9] bg-white'
                }`}
              >
                <Ikon
                  size={19}
                  className={terpilih ? 'text-[#0b3c7d]' : 'text-neutral-400'}
                />
                <span className="text-[10px] text-neutral-600">{label}</span>
              </button>
            )
          })}
        </div>

        <label className="mt-4 block text-xs font-medium text-neutral-700">
          Deskripsi singkat
        </label>
        <textarea
          required
          rows={2}
          value={form.deskripsi_singkat}
          onChange={(e) => isi('deskripsi_singkat', e.target.value)}
          className={gayaInput}
          placeholder="Satu kalimat yang tampil di kartu beranda."
        />

        <label className="mt-4 block text-xs font-medium text-neutral-700">
          Deskripsi lengkap
        </label>
        <textarea
          rows={6}
          value={form.deskripsi_lengkap}
          onChange={(e) => isi('deskripsi_lengkap', e.target.value)}
          className={gayaInput}
          placeholder="Penjelasan lengkap layanan. Boleh dikosongkan."
        />

        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          <div>
            <label className="block text-xs font-medium text-neutral-700">
              Urutan tampil
            </label>
            <input
              type="number"
              min={1}
              required
              value={form.urutan}
              onChange={(e) => isi('urutan', e.target.value)}
              className={gayaInput}
            />
            <p className="mt-1 text-[11px] text-neutral-400">
              Angka lebih kecil tampil lebih dulu.
            </p>
          </div>

          <div>
            <label className="block text-xs font-medium text-neutral-700">
              Tampilkan di beranda
            </label>
            <label className="mt-1.5 flex cursor-pointer items-center gap-2.5 rounded-md border border-[#dde2e9] bg-white px-3 py-2.5">
              <input
                type="checkbox"
                checked={form.unggulan}
                onChange={(e) => isi('unggulan', e.target.checked)}
                className="h-4 w-4 accent-[#e8611a]"
              />
              <span className="text-sm text-neutral-700">Layanan unggulan</span>
            </label>
            <p className="mt-1 text-[11px] text-neutral-400">
              Beranda menampilkan empat layanan unggulan teratas.
            </p>
          </div>
        </div>

        <div className="mt-6 flex gap-2">
          <button
            type="submit"
            disabled={proses}
            className="bg-[#0b3c7d] px-6 py-2.5 text-sm text-white transition hover:bg-[#082c5c] disabled:opacity-60"
          >
            {proses ? 'Menyimpan...' : 'Simpan'}
          </button>
          <Link
            href="/admin/layanan"
            className="border border-[#d5dae2] px-6 py-2.5 text-sm text-neutral-700"
          >
            Batal
          </Link>
        </div>
      </form>
    </>
  )
}
