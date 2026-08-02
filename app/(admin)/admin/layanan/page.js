// Simpan sebagai: app/(admin)/admin/layanan/page.js

'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import {
  Award,
  ChevronDown,
  ChevronUp,
  ClipboardCheck,
  Factory,
  FileCheck,
  Info,
  Package,
  Pencil,
  Plus,
  Ship,
  Trash2,
} from 'lucide-react'
import { supabase } from '@/lib/supabase'

const daftarIkon = {
  'clipboard-check': ClipboardCheck,
  package: Package,
  'building-factory': Factory,
  certificate: Award,
  ship: Ship,
  'file-check': FileCheck,
}

export default function AdminLayanan() {
  const [data, setData] = useState([])
  const [muat, setMuat] = useState(true)
  const [hapusTarget, setHapusTarget] = useState(null)
  const [prosesHapus, setProsesHapus] = useState(false)
  const [pesan, setPesan] = useState('')

  async function ambilData() {
    setMuat(true)
    const { data: hasil, error } = await supabase
      .from('layanan')
      .select('id, nama, slug, ikon, deskripsi_singkat, unggulan, urutan')
      .order('urutan')

    if (error) setPesan(error.message)
    setData(hasil ?? [])
    setMuat(false)
  }

  useEffect(() => {
    ambilData()
  }, [])

  // Menukar posisi dua layanan dengan menukar nilai kolom urutan.
  async function geser(index, arah) {
    const tujuan = index + arah
    if (tujuan < 0 || tujuan >= data.length) return

    const a = data[index]
    const b = data[tujuan]

    await supabase.from('layanan').update({ urutan: b.urutan }).eq('id', a.id)
    await supabase.from('layanan').update({ urutan: a.urutan }).eq('id', b.id)

    ambilData()
  }

  async function hapus() {
    setProsesHapus(true)
    const { error } = await supabase
      .from('layanan')
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

  const jumlahUnggulan = data.filter((i) => i.unggulan).length

  return (
    <>
      <div className="flex items-center justify-between border-b border-[#e3e7ed] bg-white px-5 py-3.5">
        <h1 className="text-lg font-medium">Layanan</h1>
        <Link
          href="/admin/layanan/baru"
          className="flex items-center gap-1.5 rounded-md bg-[#e8611a] px-3.5 py-2 text-xs text-white transition hover:bg-[#c9500f]"
        >
          <Plus size={14} />
          Tambah layanan
        </Link>
      </div>

      <div className="p-5">
        {pesan && (
          <p className="mb-4 rounded-md bg-red-50 px-3 py-2.5 text-xs text-red-700">
            {pesan}
          </p>
        )}

        <div className="flex items-start gap-2 rounded-md border border-[#d3e0ef] bg-[#edf3fa] px-3 py-2.5">
          <Info size={14} className="mt-0.5 shrink-0 text-[#0b3c7d]" />
          <p className="text-[11px] leading-relaxed text-[#3d5a7d]">
            Empat layanan bertanda unggulan akan tampil di beranda, mengikuti
            urutan di bawah ini.
            {jumlahUnggulan !== 4 && (
              <span className="font-medium">
                {' '}
                Saat ini ada {jumlahUnggulan} layanan unggulan.
              </span>
            )}
          </p>
        </div>

        <div className="mt-4 flex flex-col gap-2.5">
          {muat ? (
            <p className="py-8 text-center text-xs text-neutral-500">
              Memuat data...
            </p>
          ) : data.length === 0 ? (
            <p className="py-8 text-center text-xs text-neutral-500">
              Belum ada layanan.
            </p>
          ) : (
            data.map((item, index) => {
              const Ikon = daftarIkon[item.ikon] ?? ClipboardCheck
              return (
                <div
                  key={item.id}
                  className={`flex items-center gap-3 border border-[#e3e7ed] border-l-[3px] bg-white px-4 py-3 ${
                    item.unggulan ? 'border-l-[#e8611a]' : 'border-l-[#d8dee6]'
                  }`}
                >
                  <div
                    className={`flex h-9 w-9 shrink-0 items-center justify-center ${
                      item.unggulan ? 'bg-[#eef3f9]' : 'bg-[#f2f4f7]'
                    }`}
                  >
                    <Ikon
                      size={18}
                      className={
                        item.unggulan ? 'text-[#0b3c7d]' : 'text-neutral-400'
                      }
                    />
                  </div>

                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2">
                      <p className="truncate text-sm font-medium">{item.nama}</p>
                      {item.unggulan && (
                        <span className="shrink-0 rounded bg-[#fbeadf] px-1.5 py-0.5 text-[9px] text-[#a84a12]">
                          Unggulan
                        </span>
                      )}
                    </div>
                    <p className="mt-0.5 truncate text-[11px] text-neutral-500">
                      {item.deskripsi_singkat}
                    </p>
                  </div>

                  <div className="flex shrink-0 items-center gap-2 text-neutral-400">
                    <button
                      onClick={() => geser(index, -1)}
                      disabled={index === 0}
                      title="Naikkan"
                      className="disabled:opacity-25"
                    >
                      <ChevronUp size={16} />
                    </button>
                    <button
                      onClick={() => geser(index, 1)}
                      disabled={index === data.length - 1}
                      title="Turunkan"
                      className="disabled:opacity-25"
                    >
                      <ChevronDown size={16} />
                    </button>
                    <Link
                      href={`/admin/layanan/${item.id}`}
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
                </div>
              )
            })
          )}
        </div>
      </div>

      {hapusTarget && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#082c5c]/50 px-5">
          <div className="w-full max-w-sm rounded-lg bg-white p-6">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-red-50">
              <Trash2 size={19} className="text-[#c0433f]" />
            </div>
            <h2 className="mt-4 font-medium">Hapus layanan ini?</h2>
            <p className="mt-1.5 text-xs text-neutral-600">
              Data yang dihapus tidak bisa dikembalikan.
            </p>

            <div className="mt-3 border-l-[3px] border-neutral-300 bg-[#f5f7fa] px-3 py-2.5">
              <p className="text-xs font-medium">{hapusTarget.nama}</p>
              <p className="mt-0.5 text-[10px] text-neutral-500">
                {hapusTarget.unggulan
                  ? 'Layanan unggulan, tampil di beranda'
                  : 'Bukan layanan unggulan'}
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
