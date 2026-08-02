// Simpan sebagai: app/(admin)/admin/page.js
//
// Halaman ini tidak menampilkan apa pun. Tugasnya cuma mengarahkan
// /admin ke /admin/berita, supaya tautan Admin di footer punya tujuan.

'use client'

import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

export default function AdminIndex() {
  const router = useRouter()

  useEffect(() => {
    router.replace('/admin/berita')
  }, [router])

  return null
}
