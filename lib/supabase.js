// Simpan berkas ini sebagai: lib/supabase.js
//
// Berkas ini membuat satu koneksi ke Supabase yang dipakai bersama
// oleh seluruh halaman. Nilainya diambil dari .env.local, jadi kunci
// aslinya tidak pernah ditulis langsung di dalam kode.

import { createClient } from '@supabase/supabase-js'

const url = process.env.NEXT_PUBLIC_SUPABASE_URL
const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

export const supabase = createClient(url, key)
