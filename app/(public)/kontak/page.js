// Simpan sebagai: app/(public)/kontak/page.js
//
// CATATAN PENTING: alamat, telepon, dan email di bawah ini masih contoh.
// Ganti dengan data resmi dari situs PTSI sebelum dikumpulkan.

import { Clock, Mail, MapPin, Phone } from 'lucide-react'

export const metadata = {
  title: 'Kontak',
  description:
    'Hubungi PT Surveyor Indonesia untuk konsultasi layanan testing, inspection, certification, dan consultation.',
}

const kontak = [
  {
    Ikon: MapPin,
    judul: 'Kantor pusat',
    isi: ['Graha Surveyor Indonesia', 'Jakarta Selatan, Indonesia'],
  },
  {
    Ikon: Phone,
    judul: 'Telepon',
    isi: ['(021) 0000 0000'],
  },
  {
    Ikon: Mail,
    judul: 'Email',
    isi: ['info@contoh.co.id'],
  },
  {
    Ikon: Clock,
    judul: 'Jam layanan',
    isi: ['Senin sampai Jumat', '08.00 hingga 17.00 WIB'],
  },
]

export default function Kontak() {
  return (
    <>
      <section className="border-b border-[#e3e7ed] bg-[#0b3c7d]">
        <div className="mx-auto max-w-5xl px-5 py-12">
          <div className="flex items-center gap-2">
            <span className="h-0.5 w-7 bg-[#e8611a]" />
            <span className="text-[11px] tracking-[0.12em] text-[#e8611a]">
              KONSULTASI
            </span>
          </div>
          <h1 className="mt-3 text-3xl font-medium text-white">Hubungi kami</h1>
          <p className="mt-2 max-w-lg text-sm leading-relaxed text-[#c7d8ee]">
            Sampaikan kebutuhan Anda, tim kami akan membantu menentukan layanan
            yang paling sesuai.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-5 py-12">
        <div className="grid gap-4 sm:grid-cols-2">
          {kontak.map(({ Ikon, judul, isi }) => (
            <div key={judul} className="border border-[#e3e7ed] p-6">
              <Ikon size={21} className="text-[#0b3c7d]" />
              <p className="mt-3 font-medium">{judul}</p>
              <div className="mt-1.5 text-sm leading-relaxed text-neutral-600">
                {isi.map((baris) => (
                  <p key={baris}>{baris}</p>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 border border-[#e3e7ed] bg-[#f5f7fa] px-6 py-6">
          <p className="font-medium">Mengajukan permintaan layanan</p>
          <p className="mt-1.5 text-sm leading-relaxed text-neutral-600">
            Kirimkan keterangan berikut melalui email agar permintaan Anda dapat
            ditindaklanjuti lebih cepat.
          </p>
          <ul className="mt-4 flex flex-col gap-2 text-sm text-neutral-700">
            <li className="flex gap-2.5">
              <span className="text-[#e8611a]">01</span>
              Nama perusahaan dan narahubung
            </li>
            <li className="flex gap-2.5">
              <span className="text-[#e8611a]">02</span>
              Jenis layanan yang dibutuhkan
            </li>
            <li className="flex gap-2.5">
              <span className="text-[#e8611a]">03</span>
              Lokasi dan perkiraan waktu pelaksanaan
            </li>
            <li className="flex gap-2.5">
              <span className="text-[#e8611a]">04</span>
              Keterangan tambahan bila ada
            </li>
          </ul>
        </div>
      </section>
    </>
  )
}
