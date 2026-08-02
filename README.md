# Website Company Profile PT Surveyor Indonesia

Website company profile dengan panel admin yang mendukung operasi
Create, Read, Update, dan Delete pada data Berita dan Layanan.

Dibuat sebagai tugas seleksi magang.

**Situs langsung:** https://website-ptsi.vercel.app

> Catatan: proyek ini dibuat untuk keperluan seleksi dan tidak berafiliasi
> resmi dengan PT Surveyor Indonesia. Sebagian isi konten merupakan contoh.

---

## Developer

Nama: Azriel Darmawan

---

## Teknologi

| Bagian | Teknologi |
|---|---|
| Kerangka kerja | Next.js 16 (App Router) |
| Bahasa | JavaScript |
| Gaya tampilan | Tailwind CSS |
| Basis data | Supabase (PostgreSQL) |
| Autentikasi | Supabase Auth |
| Ikon | lucide-react |
| Hosting | Vercel |

---

## Akun demo

Gunakan akun berikut untuk mencoba panel admin di `/admin`.

```
Email        : admin@ptsi-demo.com
Kata sandi   : adminptsi
```

---

## Fitur

### Sisi pengunjung

- Beranda dengan empat layanan unggulan dan berita terbaru, keduanya
  diambil langsung dari basis data
- Daftar dan detail berita
- Daftar dan detail layanan
- Halaman Tentang dan Kontak
- Tampilan menyesuaikan layar ponsel maupun komputer

### Panel admin

- Login dengan email dan kata sandi
- Halaman admin tidak dapat diakses tanpa login
- **Berita**: tambah, lihat, ubah, hapus, pencarian judul, status draf
  atau terbit, ringkasan jumlah data
- **Layanan**: tambah, lihat, ubah, hapus, pengaturan urutan tampil,
  penanda layanan unggulan, pemilihan ikon
- Dialog konfirmasi sebelum menghapus, menampilkan data yang akan dihapus

---

## Struktur basis data

### Tabel `berita`

| Kolom | Tipe | Keterangan |
|---|---|---|
| id | uuid | Kunci utama |
| judul | text | Judul berita |
| slug | text | Alamat halaman, unik |
| kategori | text | Korporasi, Layanan, Kegiatan, Publikasi |
| tanggal_terbit | date | Tanggal terbit |
| gambar_url | text | Alamat gambar, boleh kosong |
| ringkasan | text | Ringkasan singkat |
| isi | text | Isi lengkap |
| status | text | `draf` atau `terbit` |

### Tabel `layanan`

| Kolom | Tipe | Keterangan |
|---|---|---|
| id | uuid | Kunci utama |
| nama | text | Nama layanan |
| slug | text | Alamat halaman, unik |
| ikon | text | Nama ikon yang dipakai |
| deskripsi_singkat | text | Tampil di kartu |
| deskripsi_lengkap | text | Tampil di halaman detail |
| unggulan | boolean | Menentukan tampil di beranda |
| urutan | integer | Urutan tampil |

---

## Keamanan

Row Level Security diaktifkan pada kedua tabel:

- Operasi baca terbuka untuk umum, karena situs bersifat publik
- Operasi tambah, ubah, dan hapus hanya untuk pengguna yang sudah login

Kunci koneksi disimpan sebagai environment variable dan tidak ikut
tersimpan di repositori.

---

## Menjalankan secara lokal

Dibutuhkan Node.js versi 18 atau lebih baru.

```bash
git clone https://github.com/Azriel2828/website-ptsi.git
cd website-ptsi
npm install
```

Buat berkas `.env.local` di akar proyek:

```
NEXT_PUBLIC_SUPABASE_URL=alamat_proyek_supabase
NEXT_PUBLIC_SUPABASE_ANON_KEY=kunci_anon_supabase
```

Jalankan:

```bash
npm run dev
```

Buka http://localhost:3000

Skema basis data beserta data contoh tersedia pada berkas `skema.sql`
dan dapat dijalankan melalui SQL Editor di Supabase.

---

## Struktur berkas

```
app
├── (public)          Halaman untuk pengunjung
│   ├── page.js       Beranda
│   ├── berita
│   ├── layanan
│   ├── tentang
│   └── kontak
├── (admin)
│   └── admin         Panel admin
│       ├── berita
│       ├── layanan
│       └── login
├── layout.js         Pembungkus seluruh halaman
└── globals.css

components            Komponen yang dipakai berulang
lib
└── supabase.js       Koneksi ke basis data
```

Folder berkurung seperti `(public)` hanya berfungsi sebagai pengelompokan
dan tidak muncul pada alamat halaman.
