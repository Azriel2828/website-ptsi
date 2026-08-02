// Simpan sebagai: app/(public)/tentang/page.js
//
// CATATAN: isi teks di halaman ini masih contoh. Sesuaikan dengan
// keterangan resmi dari situs PTSI sebelum dikumpulkan.

import Link from 'next/link'
import { Eye, ShieldCheck, Target, Users } from 'lucide-react'

export const metadata = {
  title: 'Tentang',
  description:
    'Profil PT Surveyor Indonesia, penyedia layanan testing, inspection, certification, dan consultation independen.',
}

const nilai = [
  {
    Ikon: ShieldCheck,
    judul: 'Independen',
    teks: 'Penilaian dilakukan tanpa keberpihakan pada kepentingan mana pun.',
  },
  {
    Ikon: Target,
    judul: 'Akurat',
    teks: 'Setiap temuan didasarkan pada bukti yang dapat ditelusuri.',
  },
  {
    Ikon: Users,
    judul: 'Kompeten',
    teks: 'Ditangani tenaga bersertifikat sesuai bidang pemeriksaannya.',
  },
  {
    Ikon: Eye,
    judul: 'Transparan',
    teks: 'Proses dan hasil dilaporkan secara terbuka kepada klien.',
  },
]

export default function Tentang() {
  return (
    <>
      <section className="border-b border-[#e3e7ed] bg-[#0b3c7d]">
        <div className="mx-auto max-w-5xl px-5 py-12">
          <div className="flex items-center gap-2">
            <span className="h-0.5 w-7 bg-[#e8611a]" />
            <span className="text-[11px] tracking-[0.12em] text-[#e8611a]">
              PROFIL PERUSAHAAN
            </span>
          </div>
          <h1 className="mt-3 text-3xl font-medium text-white">Tentang Kami</h1>
          <p className="mt-2 max-w-xl text-sm leading-relaxed text-[#c7d8ee]">
            PT Surveyor Indonesia adalah badan usaha milik negara yang bergerak di bidang testing, 
            inspection, certification, dan consultation.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-3xl px-5 py-12">
        <div className="flex flex-col gap-4 text-[15px] leading-[1.8] text-neutral-800">
          <p>
            PT Surveyor Indonesia (Persero) didirikan pada 1 Agustus 1991 sebagai perusahaan yang bergerak 
            di bidang Inspection, Verification, Testing, Certification, and Consultation (IVTC). Selama lebih dari tiga dekade, 
            perusahaan telah menjadi mitra terpercaya bagi pemerintah, badan usaha milik negara, dan sektor swasta dalam memastikan 
            kualitas, keselamatan, kepatuhan, serta keberlanjutan di berbagai sektor industri.
          </p>
          <p>
            Berbekal pengalaman yang luas, tenaga profesional, serta jaringan kantor dan laboratorium yang tersebar di berbagai wilayah 
            Indonesia, PT Surveyor Indonesia menghadirkan solusi assurance yang inovatif untuk mendukung pembangunan nasional, meningkatkan daya saing 
            industri, dan menciptakan nilai tambah bagi para pemangku kepentingan.
          </p>
          <p>
            Perjalanan PT Surveyor Indonesia dimulai dengan menjalankan layanan Pre-Shipment Inspection (PSI) untuk membantu pemerintah dalam memperlancar 
            arus barang modal dan peralatan ke Indonesia. Seiring berkembangnya kebutuhan industri, perusahaan terus melakukan transformasi dengan memperluas 
            layanan di bidang inspeksi, verifikasi, pengujian, sertifikasi, dan konsultasi hingga menjadi salah satu perusahaan assurance terkemuka di Indonesia.
          </p>
          <p>
           Transformasi perusahaan terus dilakukan melalui penguatan portofolio bisnis, penerapan inovasi berbasis teknologi, pengembangan kompetensi sumber daya 
           manusia, serta implementasi budaya kerja AKHLAK. Dengan semangat "Your Trusted Partner for Assurance", PT Surveyor Indonesia terus menghadirkan layanan 
           berstandar nasional dan internasional untuk mendukung pertumbuhan industri yang berkelanjutan.
          </p>
        </div>

        <div className="mt-10 grid gap-4 sm:grid-cols-2">
          <div className="border border-[#e3e7ed] p-6">
            <p className="text-[11px] tracking-[0.1em] text-[#e8611a]">VISI</p>
            <p className="mt-2 leading-relaxed">
              Menjadi Perusahaan Assurance Terkemuka di Asia.
            </p>
          </div>
          <div className="border border-[#e3e7ed] p-6">
            <p className="text-[11px] tracking-[0.1em] text-[#e8611a]">MISI</p>
            <p className="mt-2 leading-relaxed">
              Kami berkomitmen untuk mendukung pembangunan nasional dan global melalui layanan yang andal, inovasi yang berkelanjutan, serta kemitraan strategis. 
              Misi kami mencerminkan dedikasi yang teguh terhadap kualitas, integritas, dan keunggulan dalam setiap aspek operasional perusahaan.
            </p>
          </div>
        </div>
      </section>

      <section className="border-t border-[#e3e7ed] bg-[#f5f7fa]">
        <div className="mx-auto max-w-5xl px-5 py-12">
          <h2 className="text-2xl font-medium">Nilai yang kami pegang</h2>
          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {nilai.map(({ Ikon, judul, teks }) => (
              <div key={judul} className="border border-[#e3e7ed] bg-white p-5">
                <Ikon size={22} className="text-[#0b3c7d]" />
                <p className="mt-3 font-medium">{judul}</p>
                <p className="mt-1.5 text-sm leading-relaxed text-neutral-600">
                  {teks}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#e8611a]">
        <div className="mx-auto flex max-w-5xl flex-col gap-5 px-5 py-8 sm:flex-row sm:items-center sm:justify-between">
          <div className="text-white">
            <p className="text-lg font-medium">Ingin tahu lebih jauh?</p>
            <p className="mt-1 text-sm text-[#fbe0d2]">
              Pelajari lini layanan kami atau hubungi tim kami langsung.
            </p>
          </div>
          <Link
            href="/layanan"
            className="bg-white px-6 py-3 text-center text-sm font-medium whitespace-nowrap text-[#b84a12]"
          >
            Lihat layanan
          </Link>
        </div>
      </section>
    </>
  )
}
