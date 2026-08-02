// Simpan sebagai: app/(admin)/admin/berita/[id]/page.js
//
// Nama folder [id] dengan kurung siku berarti bagian alamat itu berubah-ubah.
// Jadi /admin/berita/abc-123 akan membuka berkas ini dengan id = abc-123.

'use client'

import { use, useEffect, useState } from 'react'
import Link from 'next/link'
import FormBerita from '@/components/FormBerita'
import { supabase } from '@/lib/supabase'

export default function UbahBerita({ params }) {
  const { id } = use(params)
  const [data, setData] = useState(null)
  const [muat, setMuat] = useState(true)

  useEffect(() => {
    supabase
      .from('berita')
      .select('*')
      .eq('id', id)
      .single()
      .then(({ data: hasil }) => {
        setData(hasil)
        setMuat(false)
      })
  }, [id])

  if (muat) {
    return <p className="p-5 text-sm text-neutral-500">Memuat data...</p>
  }

  if (!data) {
    return (
      <div className="p-5">
        <p className="text-sm text-neutral-700">Berita tidak ditemukan.</p>
        <Link
          href="/admin/berita"
          className="mt-2 inline-block text-sm text-[#0b3c7d]"
        >
          Kembali ke daftar berita
        </Link>
      </div>
    )
  }

  return <FormBerita awal={data} />
}
