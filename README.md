# Omah Keboen — Website Single-Page Resmi

Website satu halaman (*single-page*) resmi untuk kafe, resto, dan cakeshop **Omah Keboen** (Kedungsari, Megaluh, Jombang). Dibangun tanpa framework, tanpa bundler, murni HTML5 semantik, CSS modern, dan vanilla JavaScript.

Target User Story: **US-01, US-02, US-03, US-04, US-05, US-06, US-07**.

---

## 1. Menjalankan Server & Preview Lokal

Untuk melihat situs secara lokal dengan path relatif penuh:

```bash
# Jalankan web server lokal bawaan Python (port 8000)
python3 -m http.server 8000
```

Buka peramban di: `http://localhost:8000/`

*Catatan:* Berkas juga dapat dibuka langsung di peramban via protokol `file://` (klik dua kali `index.html`) karena seluruh referensi aset menggunakan jalur relatif (D2).

---

## 2. Struktur Berkas

```
omah-keboen-web/
├── index.html                 # Halaman utama (seluruh konten teks & markup)
├── README.md                  # Panduan pengoperasian & pemeliharaan situs
├── assets/
│   ├── css/
│   │   └── styles.css         # Gaya visual, sistem token, layout responsif (17,9 KB)
│   ├── js/
│   │   └── main.js            # Interaksi navigasi mobile & sorotan hari operasional (2,3 KB)
│   └── img/
│       ├── favicon.svg        # Favicon logo kafe
│       ├── placeholder-map.svg# Peta rute statis lokal
│       └── ig/                # Aset foto kurasi kafe (ig-03.jpg s/d ig-12.jpg)
└── docs/                      # Dokumentasi teknis, pengujian, & aset pendukung
    ├── CLIENT_INPUT.md        # Data referensi resmi klien
    ├── DESIGN_SPEC.md         # Spesifikasi token, warna, tipografi, & komponen UI
    ├── MENU.md                # Daftar menu & harga resmi
    ├── PRD.md                 # Product Requirement Document
    ├── PROJECT_PLAN.md        # Rencana kerja & keputusan proyek
    ├── QA_REPORT_STAGE1.md    # Laporan audit QA Stage 1
    ├── TECH_SPEC.md           # Spesifikasi arsitektur teknis
    ├── TEST_PLAN.md           # Rencana uji kualitas & matriks TC
    └── preview/stage2/        # Screenshot verifikasi Stage 2 (desktop 1440 & mobile 390)
```

**Total Ukuran Kode:** CSS (17.964 byte) + JS (2.331 byte) = **20.295 byte (~20,3 KB)**, jauh di bawah batas anggaran performa 250 KB (TC-48).

---

## 3. Panduan Edit Konten (Semua di `index.html`)

Seluruh teks dan data berada langsung di dalam berkas `index.html` (D3). Anda dapat mengubahnya menggunakan teks editor apa saja tanpa perlu proses *compile* atau *build*.

### A. US-01: Hero & Identitas Brand (`#beranda`)
- **Headline & Slogan:** Cari tag `<h1 class="hero__title">` dan `<p class="hero__lead">`.
- **Proof Bar:** Cari elemen `<div class="hero__proof">` untuk mengedit chip rating, jam operasional, atau status halal.
- **Tombol Aksi (CTA):** Cari kelas `.hero__actions` untuk mengubah tautan WhatsApp atau tombol jangkar `#menu`.
- **Foto Hero:** Cari tag `<img>` di dalam `.hero__media`. Pastikan tetap mempertahankan atribut `loading="eager"` dan `fetchpriority="high"`.

### B. US-02: Daftar Menu & Harga (`#menu`)
Menu terbagi dalam 4 kategori utama (`<h3>`):
1. **Kopi**
2. **Non-Kopi**
3. **Kudapan / Cakeshop** (Subgrup: *Artisan Bakery & Pastry* dan *Camilan*)
4. **Main Course** (Subgrup: *Italian* dan *Nusantara*)

**Format Kartu Menu Tunggal:**
```html
<li class="menu-card">
  <span class="menu-card__name">Nama Makanan / Minuman</span>
  <span class="menu-card__price">Rp20.000</span>
</li>
```

**Format Kartu Menu Multi-Harga (Hangat & Dingin):**
```html
<li class="menu-card">
  <span class="menu-card__name">Kopi Susu Omah Keboen</span>
  <span class="menu-card__prices">
    <span class="menu-card__price-variant"><span class="menu-card__variant-label">Hangat</span> <span class="menu-card__price">Rp20.000</span></span>
    <span class="menu-card__price-variant"><span class="menu-card__variant-label">Dingin</span> <span class="menu-card__price">Rp23.000</span></span>
  </span>
</li>
```

**Format Menu dengan Badge Khusus (mis. Akhir Pekan):**
```html
<li class="menu-card">
  <span class="menu-card__name">Pepes Tongkol <span class="menu-card__badge">Akhir Pekan</span></span>
  <span class="menu-card__price">Rp12.000</span>
</li>
```

### C. US-03: Profil & Cerita Brand (`#tentang`)
- **Paragraf Cerita:** Cari kontainer `<div class="about__story">` untuk menyesuaikan narasi kafe.
- **Trio Nilai:** Cari elemen `<div class="value-trio">` untuk mengubah 3 pilar utama (Kualitas Bahan, Presisi Seduh, Suasana Ramah).

### D. US-04: Galeri Suasana & Produk (`#galeri`)
- **Mengganti Foto:** Letakkan berkas foto baru ke dalam folder `assets/img/ig/`.
- **Mengubah Referensi:** Cari tag `<figure class="gallery__item">` di dalam `#galeri`. Ubah atribut `src`, `width`, `height`, dan `alt` sesuai foto baru. Tetap gunakan `loading="lazy"` dan `decoding="async"`.

### E. US-05: Jam Operasional & Lokasi (`#lokasi`)
- **Alamat:** Cari tag `<address class="location__address">` untuk mengedit teks alamat dua baris.
- **Jam Buka:** Cari tabel `<table class="hours-table">` untuk memperbarui jam operasional harian. Atribut `data-day="0"` s/d `data-day="6"` menandai hari Minggu (0) s/d Sabtu (6) untuk penyorotan otomatis hari ini oleh JavaScript.
- **Peta Rute:** Tautan tombol "Buka di Google Maps" diatur pada tag `<a class="btn btn--secondary btn--map" ...>`.

### F. US-06: Kontak & Saluran Reservasi (`#kontak`)
Cari section `<section id="kontak" class="contact">`:
- **WhatsApp:** `https://wa.me/6285236639216?text=Halo%20Omah%20Keboen...`
- **Instagram:** `https://instagram.com/omahkeboen.jbg`
- **Google Maps:** URL query pencarian resmi lokasi kafe.
*Perhatian:* Seluruh tautan eksternal wajib menyertakan atribut `target="_blank"` dan `rel="noopener noreferrer"` (TC-29).

### G. US-07: Footer & Navigasi Cepat (`#footer`)
- Cari elemen `<footer class="site-footer">` untuk memperbarui tautan navigasi pintas, alamat kaki, badge sertifikasi halal, atau kredit. Tahun hak cipta diperbarui otomatis via JavaScript dengan fallback statis 2026.

---

## 4. Cara Publikasi ke GitHub Pages

Situs ini telah dikonfigurasi untuk diterbitkan otomatis pada repository GitHub:
`https://github.com/rioovs/omah-keboen` → `https://rioovs.github.io/omah-keboen/`

Langkah publikasi ulang jika ada pembaruan:
1. Simpan seluruh perubahan berkas.
2. Commit dan dorong (*push*) ke branch `main`:
   ```bash
   git add index.html assets/ README.md docs/
   git commit -m "feat: perbarui konten menu dan informasi situs"
   git push origin main
   ```
3. GitHub Actions / Pages akan memperbarui halaman publikasi secara instan.

---

## 5. Status Data Klien & Inventaris Placeholder

Pada **Stage 2 (Final UI)**, status placeholder di seluruh kode markup adalah **NIHIL (0 Token Tersisa)** (TC-51 PASS):

| Komponen | Status Data | Sumber Referensi | Pemasok Data |
|---|---|---|---|
| Identitas & Hero Image | **Lengkap** | `assets/img/ig/ig-07.jpg` | Klien / Instagram resmi |
| Menu Minuman & Makanan (65 Item) | **Lengkap & Terverifikasi** | `docs/MENU.md` | Klien (`docs/CLIENT_INPUT.md`) |
| Jam Operasional (7 Hari) | **Lengkap (08.00–21.00 WIB)** | `docs/CLIENT_INPUT.md` | Klien |
| Nomor Kontak & Reservasi WhatsApp | **Lengkap (+62 852-3663-9216)** | `docs/CLIENT_INPUT.md` | Klien |
| Akun Instagram | **Lengkap (@omahkeboen.jbg)** | `docs/CLIENT_INPUT.md` | Klien |
| Alamat & Titik Koordinat Maps | **Lengkap & Terverifikasi** | `docs/CLIENT_INPUT.md` | Klien / Google Maps |
| Foto Galeri (8 Foto) | **Lengkap (Lokal)** | `assets/img/ig/` | Instagram resmi kafe |

Tidak ada data harga karangan (fallback PRD US-02 terpenuhi 100%).
