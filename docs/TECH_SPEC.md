# Spesifikasi Teknis — Website Single-Page "Omah Keboen"

**Pemilik:** okta-softwaredeveloper | **Status:** Prototype Stage 1 (Gate 1) | **Target:** US-01..US-07 | **Versi:** 2.0

---

## 1. Menjalankan Server & Preview Lokal (TC-46, TC-47)

Jalankan server lokal dari root repo untuk audit Lighthouse dan QA:

```bash
python3 -m http.server 8000
```

Akses URL: `http://localhost:8000/`.

Situs mendukung pratinjau langsung via protokol berkas (`file://`) karena seluruh jalur aset relatif (D2). Target publikasi produksi: `https://rioovs.github.io/omah-keboen/`.

---

## 2. Struktur Berkas Final & Anggaran Aset (D1, D2, TC-48)

Situs statis murni tanpa framework, build step, bundler, maupun runtime Node.js (D1):

```
omah-keboen-web/
├── index.html
├── assets/
│   ├── css/styles.css
│   ├── js/main.js
│   └── img/
│       ├── placeholder-hero.svg
│       ├── placeholder-gallery-[1..6].svg
│       ├── placeholder-map.svg
│       └── ig/ig-03.jpg ... ig-12.jpg (10 foto)
└── docs/
```

- **Jumlah berkas kode:** 1 CSS (`assets/css/styles.css`) dan 1 JS (`assets/js/main.js`).
- **Ukuran aktual (TC-48):** CSS = 16.985 byte, JS = 2.331 byte. Total = 19.316 byte (~19,3 KB), di bawah batas 250 KB (target < 40 KB terpenuhi).
- **Aset gambar:** 8 SVG fallback di disk (D5), hanya `placeholder-map.svg` dirujuk markup. 10 foto IG di `assets/img/ig/`.

---

## 3. Keputusan Teknis Hero Image (TC-05, TC-47)

Section hero (S1) memakai 1 tag `<img>` tunggal (`assets/img/ig/ig-07.jpg`) dengan `width="512"` dan `height="640"`, box 4:5, `object-fit: cover`, `object-position: center 45%`.

- **Atribut muat:** `loading="eager"` dan `fetchpriority="high"` pada seluruh viewport (termasuk mobile 320–390 px).
- **Alasan & Resolusi:** Hero adalah elemen LCP utama. Lazy-load pada mobile menunda decoding gambar dan memperlambat LCP (TC-47). Keputusan final ini menyelesaikan perbedaan antara DESIGN_SPEC §1.4 (lazy) dan §2.S1 (eager).

---

## 4. Keputusan Penyajian Peta Lokasi (TC-24)

Section Lokasi (S5) memakai gambar statis lokal `assets/img/placeholder-map.svg` rasio 4:3 (1200×900 px, `loading="lazy"`) dan tombol CTA "Buka di Google Maps" (`.btn--map`).

- **Alasan:** Menghindari beban jaringan iframe Maps (third-party embed = 0). Menjamin 0 script pihak ketiga non-lazy saat initial load, bebas API key, LCP aman, dan CLS = 0.

---

## 5. Inventaris Token Placeholder Stage 1 (TC-50, TC-51)

Data terverifikasi (WhatsApp, Instagram, jam operasional, alamat) dipasang final (D12). Token placeholder hanya dipakai pada bagian yang menanti data klien:

| US-ID | Token Placeholder | Lokasi di Markup | Status |
|---|---|---|---|
| US-01 | `PLACEHOLDER_HERO_IMAGE` | Komentar & caption hero image (`data-placeholder="true"`) | Foto portrait IG sementara; menunggu landscape final |
| US-02 | `PLACEHOLDER_ITEM_NAME` | Item Non-Kopi & Main Course Italian (`data-placeholder="true"`) | Menunggu menu final klien |
| US-02 | `PLACEHOLDER_MENU_ITEMS` | Caption blok `.menu__empty` (`data-placeholder="true"`) | Menunggu menu final klien |
| US-04 | `PLACEHOLDER_GALLERY` | Komentar di atas grid galeri | 8 foto IG terpasang; menunggu konfirmasi lisensi (R9) |

*Catatan:* Token WA, IG, jam, dan harga tidak dipakai pada markup karena data telah final per D12 dan D13 (harga memakai label em-dash `—`). Pada Gate 2, seluruh token wajib bernilai 0 (TC-51).

---

## 6. Catatan Keamanan & Integritas Data (TC-25, TC-26, TC-29, TC-30, TC-32, TC-49)

1. **Tautan Eksternal (TC-29):** Semua link `target="_blank"` memuat `rel="noopener noreferrer"`.
2. **Pihak Ketiga (TC-49):** Permintaan eksternal hanya ke Google Fonts via preconnect `fonts.googleapis.com` dan `fonts.gstatic.com`. Bebas analitik, pelacak, maupun cookie.
3. **Pencegahan XSS (TC-32):** Tahun footer diisi via `textContent` (bukan `innerHTML`). Nilai placeholder hanya masuk ke teks atau atribut `data-*`. Bebas URL `javascript:` maupun inline event handler.
4. **URL Statis:** Format URL WA (`https://wa.me/6285236639216`), Instagram (`https://instagram.com/omahkeboen.jbg`), dan Google Maps ditulis statis di markup tanpa input dinamis.

---

## 7. Pemetaan Kebutuhan Produk (US-ID) & Panduan Edit (D3)

| US-ID | ID Section | Ground | Komponen Kunci | Deskripsi |
|---|---|---|---|---|
| US-01 | `#beranda` | cream | `.hero`, `.hero__proof`, `.btn` | H1, positioning, proof bar, 2 CTA, foto split 7/5 |
| US-02 | `#menu` | cream | `.menu`, `.menu-card`, `.menu__empty` | 4 kategori H3, 2 subgrup H4, harga `—`, fallback empty |
| US-03 | `#tentang` | cream-deep | `.about`, `.value-trio` | Narasi brand (kopi, seduh, ramah) & 3 poin nilai |
| US-04 | `#galeri` | cream | `.gallery`, `.gallery__item` | Mosaik 8 foto IG, responsif 1→2→3→4 kolom, anchor 2 kol |
| US-05 | `#lokasi` | cream-deep | `.location`, `.hours-table`, `.map-embed` | Alamat 2 baris, tabel 7 hari 08.00–21.00, penanda hari ini, peta SVG |
| US-06 | `#kontak` | espresso | `.contact`, `.contact-action` | 3 tombol aksi inversi (WA, IG, Maps) & nomor lokal |
| US-07 | `#footer` | espresso | `.site-footer`, `.halal-badge` | Brand display, pill Halal, link cepat S1–S6, tahun 2026 |

**Panduan Edit Konten (D3):** Seluruh konten teks berada langsung di `index.html`. Pengelola dapat mengedit teks tanpa build step.

---

## 8. Catatan Kepatuhan (D1–D16)

- Kepatuhan penuh D1–D16: path relatif tanpa leading slash (D2), radius 0 (eksepsi pill Halal), tipografi Fraunces & Inter (D6), transisi warna 150 ms tanpa transform/shadow pada elemen diam.
- File `assets/img/ig/ig-05.jpg` (poster QR) tidak dipakai di markup agar tidak terpotong (D14).
- Sesuai R9, 10 foto kurasi Instagram difungsikan sebagai konten Stage 1 berlabel placeholder data hingga izin resmi dikonfirmasi.

---

## 9. Deviasi yang Disengaja & Alasannya

1. **Fallback Teks Tahun Statis di Markup (TC-32):** DESIGN_SPEC §2.S7 menyarankan span kosong. Untuk memenuhi TC-32 (agar footer tidak kosong saat JavaScript nonaktif), fallback statis `2026` dicantumkan di markup dan disinkronkan JS via `textContent`.
2. **Format URL Google Maps (TC-23, TC-27):** Memakai URL `https://www.google.com/maps/search/?api=1&query=...` (bukan short-link `maps.app.goo.gl`) agar lolos uji regex domain `google.com/maps` (TC-23) dan konsisten dengan alamat fisik (TC-27). Tautan pendek klien tetap dicatat di `docs/CONTENT_DATA.md`.
