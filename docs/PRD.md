# PRD — Website Single-Page "Omah Keboen"

**Versi:** 1.0.0 | **Status:** Menunggu Client Sign-off (Rio) | **Owner:** kevin-ceo | **Tanggal:** 2026-10-20

---

## 1. Masalah & Tujuan

**Masalah:** Omah Keboen — kafe & restaurant keluarga di Kedungsari, Karang Dagangan, Kec. Megaluh, Jombang — punya reputasi lokal bagus (rating 4,5 di Google Maps) tetapi tidak punya website. Informasi hanya tersebar di Google Maps, sementara calon pelanggan butuh melihat menu, suasana, jam buka, dan cara kontak sebelum memutuskan datang.

**Tujuan:** Satu halaman web (single-page, static) berbahasa Indonesia yang memuat seluruh informasi penting kafe, tampil modern / clean / elegan, cepat dibuka di HP, dan mendorong pengunjung menekan "Hubungi WhatsApp" atau "Buka di Maps".

**Target sukses:** pengunjung baru bisa mengetahui menu, harga, jam buka, lokasi, dan kontak dalam satu kali scroll.

---

## 2. Pengguna & Peran

| Peran | Kebutuhan | Section yang dipakai |
|---|---|---|
| Pelanggan lokal (Jombang & sekitar), mobile | Lihat menu + harga, cek jam buka, hubungi WA | Semua section |
| Keluarga / rombongan (acara, arisan) | Kapasitas, lokasi, kontak reservasi | Tentang, Lokasi, Kontak |
| Calon staf / mitra | Kenalan brand & cara kontak | Tentang, Kontak |
| Pemilik (Rio) | Tampilan rapi, mudah diubah, biaya hosting nol | Handover: sumber + README |

---

## 3. Fitur MVP — User Stories

- **US-01 — Hero:** Sebagai pengunjung, saya melihat nama "Omah Keboen", positioning singkat (kafe kopi berkualitas dengan suasana hangat dan ramah), foto hero, dan 2 tombol aksi (Hubungi WhatsApp, Lihat Menu) tanpa perlu menggulir. *Kriteria: identitas, tagline, dan 2 CTA terlihat dalam 100vh desktop & mobile.*
- **US-02 — Menu & Harga:** Sebagai pengunjung, saya melihat kategori menu (Kopi, Non-Kopi, Kudapan/Cakeshop, Main Course — Italian & Nusantara) beserta harga rupiah agar tahu estimasi biaya. *Kriteria: item + harga terformat `Rp20.000`; data menu final dari klien; bila data belum siap tampilkan label "Hubungi untuk menu harian".*
- **US-03 — Tentang / Brand Story:** Sebagai pengunjung, saya membaca cerita singkat Omah Keboen (biji kopi pilihan, teknik seduh presisi, pelayanan ramah) agar percaya pada kualitas. *Kriteria: 1 blok narasi + 3 poin nilai (Kualitas / Presisi / Ramah).*
- **US-04 — Galeri Foto:** Sebagai pengunjung, saya melihat foto interior, suasana, barista, dan hidangan agar punya gambaran sebelum datang. *Kriteria: grid responsif 4–8 foto dari aset klien, lazy-load, alt text deskriptif.*
- **US-05 — Lokasi & Jam Buka:** Sebagai pengunjung, saya melihat alamat lengkap, jam buka per hari, dan peta untuk navigasi. *Kriteria: alamat, jam buka, tombol "Buka di Google Maps", peta ringan (embed/static).*
- **US-06 — Kontak & Aksi Langsung:** Sebagai pengunjung, saya bisa menghubungi via WhatsApp, membuka Instagram, atau membuka Maps dengan satu klik. *Kriteria: tombol WA dengan pesan pembuka otomatis, link Instagram, tautan Maps — semua dengan ikon + label teks.*
- **US-07 — Footer:** Sebagai pengunjung, saya melihat badge Halal, tahun berjalan, dan tautan cepat. *Kriteria: 1 blok footer, badge "Halal", tahun dinamis.*

---

## 4. Gaya & Aturan Visual (Design Brief)

- **Nuansa:** Modern, clean, elegan. Banyak ruang kosong, tipografi tegas, tanpa dekorasi berlebihan.
- **Palet:** espresso gelap `#2B1D16` (teks/CTA), krem `#F7F1E8` (latar utama), aksen karamel `#C98A4B`, netral batu `#8A8078`.
- **Tipografi:** display serif (Fraunces / Playfair) untuk judul, sans grotesk (Inter) untuk teks — maksimal 2 family, 3–4 ukuran.
- **Layout:** 6–7 section dalam 1 halaman, jarak antar-section lega, mobile-first.
- **Interaksi:** smooth scroll untuk nav anchor, hover halus, tanpa animasi berat.
- **Hindari:** parallax, video loop berat, carousel otomatis, efek 3D.

---

## 5. Di Luar Cakupan (Out of Scope)

- Pemesanan online, keranjang, atau pembayaran.
- Sistem reservasi meja (cukup lewat WhatsApp).
- Backend, database, API, CMS, login/admin panel.
- Halaman tambahan (blog, halaman menu terpisah) — MVP cukup 1 halaman.
- Loyalty point, QRIS, newsletter.
- Multibahasa (hanya Indonesia di MVP).
- Pengelolaan Google Business Profile / SEO lanjutan.

---

## 6. Kriteria Sukses

- Lighthouse mobile: Performance ≥ 90, Accessibility ≥ 95, Best Practices ≥ 90, SEO ≥ 90.
- LCP < 2,5 detik di 4G; total bundle JS + CSS ≤ 250 KB.
- Tanpa horizontal scroll di 320–1440 px; semua gambar punya `alt`, semua kontrol punya label.
- Semua CTA (WhatsApp, Instagram, Maps) berfungsi dengan tautan final, bukan placeholder.
- 100% US-01…US-07 terimplementasi dan disetujui klien.
- Handover: sumber + `README.md` (cara edit konten & publish ulang).

---

## 7. Batasan & Asumsi

- **Deadline:** 5 hari kerja sejak PRD disetujui.
- **Budget:** Rp 0 — hosting GitHub Pages, tanpa domain berbayar (default `rioovs/omah-keboen`).
- **Perangkat:** mobile-first (Android 360 px+), desktop 1440 px. Browser: Chrome/Safari/Firefox 2 tahun terakhir.
- **Jaringan:** target 4G; halaman tetap terbaca di koneksi lambat (lazy-load gambar).
- **Asumsi konten:** nama, alamat, jam buka, rating, rentang harga, dan positioning diambil dari data publik Google Maps & direktori kuliner.
- **Data wajib dari klien:** nomor WhatsApp, username Instagram, foto asli, daftar menu + harga, jam buka per hari.
- **Asumsi teknis:** situs statis (HTML + CSS + JS minimal), tanpa framework berat, deploy GitHub Pages lewat GitHub Actions.

---

## 8. Gate & Alur Persetujuan

| Gate | Isi | Pemutus |
|---|---|---|
| Gate 0 — PRD Sign-off | Dokumen ini | **Rio** |
| Gate 1 — Prototype 1 halaman | Preview URL + screenshot | **Rio** |
| Gate 2 — Full UI final | Preview URL + screenshot + QA | **Rio** |
| Gate 3 — UAT di GitHub Pages | Situs live | **Rio** |

Alur: Kevin → Sania (plan) → Anton (design spec) + Okta (build) + Rimuru (QA) → Kevin (Gate 1) → Okta (revisi) → Gate 2 → Benimaru (deploy) → UAT → Kevin (`DELIVERY_REPORT.md`).

---

## 9. Data yang Menunggu dari Klien (blocking Gate 1)

1. Nomor WhatsApp aktif (format internasional, mis. `6281234567890`).
2. Username Instagram (tanpa `@`).
3. Foto: minimal 1 hero (landscape ≥1600 px) + 4–8 foto galeri.
4. Daftar menu final + harga per item.
5. Jam buka per hari (Senin–Minggu).
6. Nama repository GitHub untuk deploy (default `omah-keboen`).
