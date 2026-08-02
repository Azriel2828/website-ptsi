// Simpan sebagai: app/(admin)/admin/login/page.js

'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'

export default function Login() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [sandi, setSandi] = useState('')
  const [pesan, setPesan] = useState('')
  const [proses, setProses] = useState(false)

  // Kalau sudah login lalu membuka /admin/login, langsung diarahkan masuk.
  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      if (data.session) router.replace('/admin/berita')
    })
  }, [router])

  async function masuk(e) {
    e.preventDefault()
    setProses(true)
    setPesan('')

    const { error } = await supabase.auth.signInWithPassword({
      email: email.trim(),
      password: sandi,
    })

    if (error) {
      // Pesan asli dari Supabase berbahasa Inggris dan agak teknis,
      // jadi diterjemahkan agar lebih jelas bagi pengguna.
      setPesan(
        error.message === 'Invalid login credentials'
          ? 'Email atau kata sandi salah.'
          : error.message
      )
      setProses(false)
      return
    }

    router.replace('/admin/berita')
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#f5f7fa] px-5 py-10">
      <div className="w-full max-w-sm">
        <div className="mb-6 text-center">
          <span className="inline-flex h-10 w-10 items-center justify-center bg-[#0b3c7d] text-sm font-medium text-white">
            SI
          </span>
          <h1 className="mt-4 text-xl font-medium text-[#0b3c7d]">
            Panel admin
          </h1>
          <p className="mt-1 text-sm text-neutral-500">
            Masuk untuk mengelola konten situs.
          </p>
        </div>

        <form
          onSubmit={masuk}
          className="rounded-lg border border-[#e3e7ed] bg-white p-6"
        >
          <label className="block text-xs font-medium text-neutral-700">
            Email
          </label>
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mt-1.5 w-full rounded-md border border-[#dde2e9] px-3 py-2.5 text-sm outline-none focus:border-[#0b3c7d]"
            placeholder="admin@contoh.com"
          />

          <label className="mt-4 block text-xs font-medium text-neutral-700">
            Kata sandi
          </label>
          <input
            type="password"
            required
            value={sandi}
            onChange={(e) => setSandi(e.target.value)}
            className="mt-1.5 w-full rounded-md border border-[#dde2e9] px-3 py-2.5 text-sm outline-none focus:border-[#0b3c7d]"
            placeholder="••••••••"
          />

          {pesan && (
            <p className="mt-4 rounded-md bg-red-50 px-3 py-2.5 text-xs text-red-700">
              {pesan}
            </p>
          )}

          <button
            type="submit"
            disabled={proses}
            className="mt-5 w-full bg-[#0b3c7d] py-2.5 text-sm text-white transition hover:bg-[#082c5c] disabled:opacity-60"
          >
            {proses ? 'Memproses...' : 'Masuk'}
          </button>
        </form>

        <p className="mt-5 text-center text-xs text-neutral-500">
          <Link href="/" className="hover:text-[#0b3c7d]">
            Kembali ke situs
          </Link>
        </p>
      </div>
    </div>
  )
}
