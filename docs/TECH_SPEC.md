# Spesifikasi Teknis — Website Single-Page "Omah Keboen"

**Pemilik:** okta-softwaredeveloper | **Status:** Stage 2 Final (Gate 2 Ready) | **Target:** US-01..US-07 | **Versi:** 2.1

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
- **Ukuran aktual (TC-48):** CSS: 18 KB, JS: 2.3 KB, total JS+CSS: ~20.3 KB, well below 250 KB limit.
- **Data Menu:** Seluruh 60 item menu final dari `docs/MENU.md` telah dimuat lengkap di `index.html` (all 60 final menu items from docs/MENU.md are populated in index.html).
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

## 5. Inventaris Token Placeholder Stage 2 (TC-51)

Semua placeholder telah dihapus seutuhnya (all placeholders have been removed):
- **0 token `PLACEHOLDER_*`**
- **0 atribut `data-placeholder`**
- **0 komentar placeholder**

Seluruh data klien bersifat final (all client data is final):
- **WhatsApp (WA):** `+62 852-3663-9216` (`https://wa.me/6285236639216`)
- **Instagram (IG):** `@omahkeboen.jbg` (`https://instagram.com/omahkeboen.jbg`)
- **Jam operasional (hours):** Senin–Minggu 08.00–21.00 WIB
- **Alamat (address) & Google Maps (maps):** Kedungsari, Karang Dagaan, Kec. Megaluh, Kabupaten Jombang, Jawa Timur 61462 (`https://www.google.com/maps/search/?api=1&query=Kedungsari%2C%20Karang%20Dagaan%2C%20Kec.%20Megaluh%2C%20Kabupaten%20Jombang%2C%20Jawa%20Timur%2061462`)
- **Menu (menu 60 items):** Seluruh 60 item menu final terisi lengkap dari `docs/MENU.md` beserta harga terverifikasi
- **Foto (photos):** Foto kurasi Instagram final di `assets/img/ig/` untuk hero (`ig-07.jpg`) dan 8 foto mosaik galeri

Hasil audit TC-51: lolos 100% tanpa sisa token placeholder.

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
| US-02 | `#menu` | cream | `.menu`, `.menu-card` | 4 kategori H3, 2 subgrup H4, harga terverifikasi, 60 item final (blok `.menu__empty` dihapus) |
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
- Foto kurasi Instagram (`assets/img/ig/`) berstatus final pada Stage 2 tanpa penanda placeholder (TC-51).
- **Resolusi BUG-01:** Footer link touch target width expanded to `min-width: 44px` with `padding-inline: 12px` and `justify-content: center` pada `.footer__links a` untuk memastikan seluruh tautan footer memenuhi kriteria touch target ≥ 44×44 px pada mobile viewport (DESIGN_SPEC §5, TC-45).
- **Penghapusan Blok `.menu__empty` (removal of `.menu__empty` block):** Seluruh 60 item menu final dari `docs/MENU.md` telah terisi di `index.html`, sehingga blok fallback placeholder `.menu__empty` dihapus seutuhnya.
- **Generasi Tangkapan Layar Stage 2 (generation of final screenshots):** Screenshot final telah dihasilkan di `docs/preview/stage2/` (`desktop-1440.png` dan `mobile-390.png`) untuk verifikasi visual Stage 2 Final.

---

## 9. Deviasi yang Disengaja & Resolusi Isu

1. **Fallback Teks Tahun Statis di Markup (TC-32):** DESIGN_SPEC §2.S7 menyarankan span kosong. Untuk memenuhi TC-32 (agar footer tidak kosong saat JavaScript nonaktif), fallback statis `2026` dicantumkan di markup dan disinkronkan JS via `textContent`.
2. **Format URL Google Maps (TC-23, TC-27):** Memakai URL `https://www.google.com/maps/search/?api=1&query=...` (bukan short-link `maps.app.goo.gl`) agar lolos uji regex domain `google.com/maps` (TC-23) dan konsisten dengan alamat fisik (TC-27). Tautan pendek klien tetap dicatat di `docs/CONTENT_DATA.md`.
3. **Resolusi BUG-01 (Footer Link Touch Target Width):** Footer link touch target width expanded to `min-width: 44px` with `padding-inline: 12px` and `justify-content: center` pada `.footer__links a` (sehingga touch target width sekarang ≥ 62 px pada kata pendek seperti "Menu", "Galeri", "Lokasi", melampaui batas minimum 44×44 px).
4. **Penghapusan Blok `.menu__empty` (Removal of `.menu__empty` Block):** Blok fallback `.menu__empty` telah dihapus karena seluruh 60 item menu final dari `docs/MENU.md` sudah terpopulasi lengkap di `index.html`.
5. **Generasi Tangkapan Layar Final Stage 2 (Final Screenshots Generation):** Tangkapan layar final Gate 2 telah digenerasi dan disimpan di `docs/preview/stage2/` (`desktop-1440.png` dan `mobile-390.png`).
6. **Responsivitas Menu Card (320px):** Menambahkan `flex-wrap: wrap` pada `.menu-card` untuk responsivitas sempurna hingga viewport 320px.
