// Simpan sebagai: app/(admin)/admin/layanan/[id]/page.js

'use client'

import { use, useEffect, useState } from 'react'
import Link from 'next/link'
import FormLayanan from '@/components/FormLayanan'
import { supabase } from '@/lib/supabase'

export default function UbahLayanan({ params }) {
  const { id } = use(params)
  const [data, setData] = useState(null)
  const [muat, setMuat] = useState(true)

  useEffect(() => {
    supabase
      .from('layanan')
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
        <p className="text-sm text-neutral-700">Layanan tidak ditemukan.</p>
        <Link
          href="/admin/layanan"
          className="mt-2 inline-block text-sm text-[#0b3c7d]"
        >
          Kembali ke daftar layanan
        </Link>
      </div>
    )
  }

  return <FormLayanan awal={data} />
}
