-- =====================================================================
-- Skema database website company profile PT Surveyor Indonesia
-- Dijalankan di Supabase: menu SQL Editor > New query > tempel > Run
-- Aman dijalankan ulang: tabel lama akan dihapus lebih dulu.
-- =====================================================================

drop table if exists berita;
drop table if exists layanan;


-- ---------------------------------------------------------------------
-- TABEL LAYANAN
-- ---------------------------------------------------------------------
create table layanan (
  id                 uuid primary key default gen_random_uuid(),
  nama               text        not null,
  slug               text        not null unique,
  ikon               text        not null default 'clipboard-check',
  deskripsi_singkat  text        not null,
  deskripsi_lengkap  text,
  unggulan           boolean     not null default false,
  urutan             integer     not null default 0,
  dibuat_pada        timestamptz not null default now()
);

create index layanan_urutan_idx on layanan (urutan);


-- ---------------------------------------------------------------------
-- TABEL BERITA
-- ---------------------------------------------------------------------
create table berita (
  id             uuid primary key default gen_random_uuid(),
  judul          text        not null,
  slug           text        not null unique,
  kategori       text        not null default 'Korporasi',
  tanggal_terbit date        not null default current_date,
  gambar_url     text,
  ringkasan      text        not null,
  isi            text        not null,
  status         text        not null default 'draf'
                 check (status in ('draf', 'terbit')),
  dibuat_pada    timestamptz not null default now(),
  diubah_pada    timestamptz not null default now()
);

create index berita_tanggal_idx on berita (tanggal_terbit desc);
create index berita_status_idx  on berita (status);


-- ---------------------------------------------------------------------
-- KEAMANAN BARIS (Row Level Security)
-- Pengunjung biasa hanya boleh MEMBACA.
-- Menambah, mengubah, dan menghapus hanya untuk yang sudah login.
-- ---------------------------------------------------------------------
alter table layanan enable row level security;
alter table berita  enable row level security;

create policy "layanan boleh dibaca siapa saja"
  on layanan for select
  using (true);

create policy "layanan hanya diubah oleh admin"
  on layanan for all
  to authenticated
  using (true)
  with check (true);

create policy "berita boleh dibaca siapa saja"
  on berita for select
  using (true);

create policy "berita hanya diubah oleh admin"
  on berita for all
  to authenticated
  using (true)
  with check (true);


-- ---------------------------------------------------------------------
-- DATA CONTOH
-- ---------------------------------------------------------------------
insert into layanan (nama, slug, ikon, deskripsi_singkat, deskripsi_lengkap, unggulan, urutan) values
('Sertifikasi TKDN', 'sertifikasi-tkdn', 'clipboard-check',
 'Verifikasi tingkat komponen dalam negeri untuk produk, jasa, dan gabungan keduanya.',
 'Layanan verifikasi capaian tingkat komponen dalam negeri yang mencakup penelusuran struktur biaya, kunjungan lapangan ke fasilitas produksi, hingga penerbitan laporan capaian yang dapat digunakan dalam proses pengadaan.',
 true, 1),

('Inspeksi dan monitoring kargo', 'inspeksi-kargo', 'package',
 'Pemeriksaan mutu dan kuantitas muatan sejak pengapalan hingga bongkar.',
 'Pemeriksaan independen atas kuantitas, mutu, dan kondisi muatan pada titik muat maupun bongkar, disertai pemantauan berkala dan pelaporan yang dapat dijadikan dasar penyelesaian klaim.',
 true, 2),

('Audit dan kajian energi', 'audit-energi', 'building-factory',
 'Evaluasi efisiensi, keandalan, dan kepatuhan pada sistem pembangkit.',
 'Kajian menyeluruh atas konsumsi energi, keandalan peralatan, dan pemenuhan regulasi pada fasilitas pembangkit dan industri, dilengkapi rekomendasi perbaikan yang terukur.',
 true, 3),

('Sertifikasi halal', 'sertifikasi-halal', 'certificate',
 'Pendampingan dan audit kehalalan produk bagi pelaku usaha berbagai skala.',
 'Pendampingan penyiapan dokumen, audit proses produksi, serta pemeriksaan bahan baku untuk memenuhi persyaratan jaminan produk halal.',
 true, 4),

('Survei kelayakan kapal', 'survei-kapal', 'ship',
 'Pemeriksaan kondisi teknis armada niaga sebelum operasi.',
 'Pemeriksaan lambung, permesinan, dan kelengkapan keselamatan kapal niaga untuk memastikan kelaikan operasi sesuai ketentuan yang berlaku.',
 false, 5),

('Verifikasi impor barang', 'verifikasi-impor', 'file-check',
 'Penelusuran teknis atas barang impor sebelum masuk ke wilayah pabean.',
 'Pemeriksaan kesesuaian jenis, jumlah, dan spesifikasi barang impor di negara asal sebagai bagian dari tata niaga impor.',
 false, 6);


insert into berita (judul, slug, kategori, tanggal_terbit, gambar_url, ringkasan, isi, status) values
('Penandatanganan kerja sama sertifikasi halal skala nasional',
 'kerja-sama-sertifikasi-halal-nasional', 'Korporasi', '2026-07-12',
 'https://images.unsplash.com/photo-1521791136064-7986c2920216?w=1200',
 'Kolaborasi lintas lembaga untuk mempercepat proses sertifikasi bagi pelaku usaha menengah.',
 'Kerja sama ini menandai langkah bersama dalam mempercepat layanan sertifikasi halal, khususnya bagi pelaku usaha menengah yang selama ini terkendala waktu proses. Ruang lingkupnya mencakup penyederhanaan alur dokumen, penambahan auditor terlatih, serta pembukaan titik layanan baru di sejumlah daerah.',
 'terbit'),

('Perluasan layanan inspeksi di kawasan timur Indonesia',
 'perluasan-inspeksi-kawasan-timur', 'Layanan', '2026-06-28',
 'https://images.unsplash.com/photo-1494412574643-ff11b0a5c1c3?w=1200',
 'Penambahan titik layanan untuk menekan waktu tunggu pemeriksaan muatan.',
 'Perluasan ini menjawab meningkatnya kebutuhan pemeriksaan muatan di jalur pelayaran timur. Dengan titik layanan yang lebih dekat, waktu tunggu pemeriksaan dapat ditekan secara berarti tanpa mengurangi ketelitian pemeriksaan.',
 'terbit'),

('Pelatihan auditor internal untuk mitra sektor migas',
 'pelatihan-auditor-internal-migas', 'Kegiatan', '2026-06-14',
 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=1200',
 'Program penguatan kompetensi auditor internal bagi mitra kerja di sektor minyak dan gas.',
 'Pelatihan berlangsung selama lima hari dan mencakup penyusunan rencana audit, teknik pengumpulan bukti, hingga penulisan temuan. Peserta berasal dari mitra kerja yang menangani fasilitas hulu maupun hilir.',
 'terbit'),

('Laporan keberlanjutan tahunan resmi diterbitkan',
 'laporan-keberlanjutan-tahunan', 'Korporasi', '2026-06-02',
 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=1200',
 'Laporan memuat capaian tata kelola, lingkungan, dan pengembangan sumber daya manusia.',
 'Laporan tahun ini menyoroti penurunan konsumsi energi operasional, penambahan jam pelatihan pegawai, serta penguatan mekanisme pelaporan pelanggaran. Dokumen lengkap dapat diakses melalui halaman publikasi.',
 'terbit'),

('Uji coba sistem pelaporan digital untuk klien korporasi',
 'uji-coba-pelaporan-digital', 'Layanan', '2026-05-20',
 null,
 'Klien dapat memantau status pemeriksaan secara mandiri melalui portal.',
 'Sistem ini memungkinkan klien memantau tahapan pemeriksaan tanpa perlu menunggu rekapitulasi berkala. Tahap uji coba melibatkan sejumlah klien korporasi sebelum dibuka lebih luas.',
 'draf');