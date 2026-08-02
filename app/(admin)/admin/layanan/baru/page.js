// Simpan sebagai: app/(admin)/admin/layanan/baru/page.js

'use client'

import { useEffect, useState } from 'react'
import FormLayanan from '@/components/FormLayanan'
import { supabase } from '@/lib/supabase'

export default function LayananBaru() {
  const [urutanBerikutnya, setUrutanBerikutnya] = useState(null)

  // Cari urutan tertinggi yang sudah ada, lalu tambah satu.
  // Tujuannya agar layanan baru otomatis masuk ke posisi paling bawah,
  // bukan menabrak urutan yang sudah dipakai layanan lain.
  useEffect(() => {
    supabase
      .from('layanan')
      .select('urutan')
      .order('urutan', { ascending: false })
      .limit(1)
      .then(({ data }) => {
        setUrutanBerikutnya((data?.[0]?.urutan ?? 0) + 1)
      })
  }, [])

  if (urutanBerikutnya === null) {
    return <p className="p-5 text-sm text-neutral-500">Memuat...</p>
  }

  return <FormLayanan urutanBerikutnya={urutanBerikutnya} />
}
