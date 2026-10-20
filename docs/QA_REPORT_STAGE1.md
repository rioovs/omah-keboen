# QA REPORT STAGE 1 — Prototype Preview "Omah Keboen"

- **Owner:** rimuru-qa (QA & quality gate)
- **Target Review:** Stage 1 prototype (`index.html`, `assets/`, `docs/TECH_SPEC.md`)
- **Tanggal Eksekusi:** 2026-10-20
- **URL Preview:** `http://localhost:8000/` (disajikan via `python3 -m http.server 8000`)
- **Status Akhir Gate 1:** `STATUS: APPROVED`

---

## 1. Ringkasan Eksekusi & Metrik Utama

Semua 44 Test Case Gate 1 (`1` dan `1+2`) dari `docs/TEST_PLAN.md` telah dieksekusi secara aktual pada rig headless Chromium dan Lighthouse CLI v13.
Sisa 15 Test Case eksklusif Gate 2 diberi status `SKIP (Gate 2)` dengan baseline metrik aktual dicatat sebagai acuan Stage 2.

### Metrik Kunci (Audit Aktual):
| Metrik | Target PRD §6 / Spec | Hasil Aktual Stage 1 | Status |
|---|---|---|---|
| **Lighthouse Mobile — Performance** | ≥ 90 | **99** | PASS |
| **Lighthouse Mobile — Accessibility** | ≥ 95 | **100** | PASS |
| **Lighthouse Mobile — Best Practices** | ≥ 90 | **100** | PASS |
| **Lighthouse Mobile — SEO** | ≥ 90 | **100** | PASS |
| **Largest Contentful Paint (LCP)** | < 2.500 ms (simulasi 4G) | **1.802 ms** (~1,8 s) | PASS |
| **Cumulative Layout Shift (CLS)** | ≤ 0,100 (target 0) | **0,001** | PASS |
| **Total Transfer JS + CSS** | ≤ 250 KB | **20,2 KB** (raw) / **4,0 KB** (gzip) | PASS |
| **Jumlah File CSS** | ≤ 2 file | **1 file** (`assets/css/styles.css`) | PASS |
| **Jumlah File JS** | ≤ 3 file | **1 file** (`assets/js/main.js`) | PASS |
| **Horizontal Scroll (320–1440 px)** | 0 px overflow | **0 px** di semua 6 breakpoint | PASS |
| **Contrast Ratio (WCAG AA)** | Normal ≥4,5:1, UI ≥3,0:1 | 100% compliant (espresso on caramel 5,6:1) | PASS |

---

## 2. Tabel Eksekusi Test Plan (TC-01 … TC-59)

| TC-ID | US-ID | Hasil | Bukti (Screenshot / Angka / Log) | BUG-ID | Catatan |
|---|---|---|---|---|---|
| TC-01 | US-01 | **PASS** | DOM dump: 1 `<h1>` exact `Omah Keboen`; lead 107 karakter (≥12 karakter) | — | Sesuai PRD US-01 & DESIGN_SPEC §2.S1 |
| TC-02 | US-01 | **PASS** | Hero actions: 2 link CTA ("Hubungi WhatsApp" + "Lihat Menu"), 0 `<button>` lain | — | Tepat 2 CTA hero |
| TC-03 | US-01 | **PASS** | Klik & keyboard Enter: `#menu` `getBoundingClientRect().top` = 76 px (rentang [0, 120] px); smooth scroll aktif; 0 console error | — | `scroll-margin-top` berfungsi |
| TC-04 | US-01 | **PASS** | `docs/preview/stage1/desktop-1440-viewport.png` (CTA bottom: 637,8 px ≤ 900 px); `docs/preview/stage1/mobile-390-viewport.png` (CTA bottom: 362,3 px ≤ 640 px); img 512×640 eager+high | — | Lolos batas fold awal |
| TC-05 | US-01 | **SKIP (Gate 2)** | Atribut saat ini: `width="512"` `height="640"`, box 4:5, `loading="eager"`, `fetchpriority="high"`, file `assets/img/ig/ig-07.jpg` (29,8 KB ≤ 300 KB) | — | Baseline dicatat; aset final diuji di Gate 2 |
| TC-06 | US-02 | **PASS** | 4 sub-heading H3 ("Kopi", "Non-Kopi", "Kudapan / Cakeshop", "Main Course"), 2 sub-grup H4 ("Italian", "Nusantara") | — | Struktur hierarki semantik lengkap |
| TC-07 | US-02 | **SKIP (Gate 2)** | Kategori Kopi memuat 4 item dengan placeholder harga `—` per Stage 1 toleransi D4 | — | 14 item final + harga diisi pada Gate 2 (docs/MENU.md) |
| TC-08 | US-02 | **SKIP (Gate 2)** | Kategori Non-Kopi memuat 4 item dengan placeholder harga `—` per Stage 1 | — | 14 item final diisi pada Gate 2 |
| TC-09 | US-02 | **SKIP (Gate 2)** | Kategori Kudapan memuat 4 item dengan placeholder harga `—` per Stage 1 | — | Item final (Artisan Bakery, Pastry, Camilan) diisi Gate 2 |
| TC-10 | US-02 | **SKIP (Gate 2)** | Sub-grup Italian (2 item) dan Nusantara (3 item) tampil dengan harga `—` | — | 13 Makanan Utama + 4 Weekend + Italian diisi Gate 2 |
| TC-11 | US-02 | **PASS** | `.menu__empty` memuat label "Hubungi untuk menu harian", tombol WA aktif, atribut `data-placeholder="true"`, token `PLACEHOLDER_MENU_ITEMS` | — | Fallback D4 valid |
| TC-12 | US-02 | **SKIP (Gate 2)** | Tidak ada harga numerik aktif di Stage 1 (semua placeholder `—`). Regex akan diuji di Gate 2 dengan pengecualian Filter V60 range | — | Gate 2 |
| TC-13 | US-02 | **PASS** | Evaluasi 17 kartu menu: 0 overlap, 0 text cutoff, `justify-content: space-between` pada 320 px & 390 px (`scrollWidth` = `innerWidth` = 320/390) | — | `docs/preview/stage1/mobile-320.png` |
| TC-14 | US-03 | **PASS** | 1 blok cerita (`.about__story`), 3 kalimat (≤4 kalimat), `max-width: 62ch`, kata kunci: `kopi`, `seduh`, `ramah` | — | Storytelling ringkas & terarah |
| TC-15 | US-03 | **PASS** | Tepat 3 nilai horizontal (`.value-trio`): "Kualitas", "Presisi", "Ramah", tanpa kartu | — | Sesuai DESIGN_SPEC §2.S3 |
| TC-16 | US-04 | **PASS** | 8 foto galeri (rentang 4–8), semua lokal `assets/img/ig/*.jpg`, aspek rasio portrait 4:5 | — | Stage 1 memakai foto IG berlabel |
| TC-17 | US-04 | **PASS** | 100% (8/8) img galeri memiliki `loading="lazy"`, `decoding="async"`, `width`, dan `height` eksplisit | — | Menjamin CLS = 0,001 |
| TC-18 | US-04 | **PASS** | 100% (11/11) img halaman memiliki atribut `alt` deskriptif (panjang 42–98 karakter), 0 kata terlarang "placeholder/gambar/foto1" | — | A11y image audit PASS |
| TC-19 | US-04 | **PASS** | Grid galeri computed columns: 320px = 1 col; 640px = 2 cols (`largeColSpan: span 2`); 1024px = 3 cols; 1280px = 4 cols; 1440px = 4 cols | — | Responsive grid rules valid |
| TC-20 | US-05 | **PASS** | 1 elemen `<address>` semantik memuat "Omah Keboen", "Kedungsari, Karang Dagaan, Kec. Megaluh", dan "Kabupaten Jombang" | — | Sesuai D12 & DESIGN_SPEC §2.S5 |
| TC-21 | US-05 | **PASS** | `<table>` `.hours-table` semantik 2 kolom dengan `<th scope="row">` 7 baris hari lengkap (Senin–Minggu); baris hari ini ditandai badge "Hari ini" | — | Sesuai PRD US-05 |
| TC-22 | US-05 | **SKIP (Gate 2)** | Format tabel saat ini seragam `08.00–21.00` di 7 baris | — | Verifikasi final Gate 2 |
| TC-23 | US-05 | **PASS** | Tombol `.btn--map` di Lokasi mengarah ke `google.com/maps/search/?api=1&query=...`, dilengkapi icon SVG + label teks | — | TC-23/TC-27 link Google Maps |
| TC-24 | US-05 | **PASS** | Section Lokasi memakai static placeholder SVG lokal + CTA Maps, 0 iframe, 0 third-party map script | — | Ringan & cepat |
| TC-25 | US-06 | **PASS** | Tombol WA kontak mengarah ke `https://wa.me/6285236639216?text=Halo%20...` (nomor internasional tanpa `+`, query encoded) | — | Format D7 valid |
| TC-26 | US-06 | **PASS** | Tombol Instagram mengarah ke `https://instagram.com/omahkeboen.jbg` (tanpa `@`, tanpa `www.`, tanpa slash akhir) | — | Format D7 valid |
| TC-27 | US-06 | **PASS** | Tombol Maps kontak mengarah ke link Google Maps search API dengan alamat konsisten TC-20 | — | Format D7 valid |
| TC-28 | US-06 | **PASS** | Tiap CTA (WA, IG, Maps) memiliki icon SVG (`aria-hidden="true"`) + label teks (≥ 3 karakter); touch target height ≥ 44 px (48–56 px) | — | Sesuai DESIGN_SPEC §2.S6 |
| TC-29 | US-06 | **PASS** | 100% (7/7) link eksternal memiliki atribut `target="_blank"` dan `rel="noopener noreferrer"` | — | Security & a11y compliant |
| TC-30 | US-06 | **SKIP (Gate 2)** | Status CTA: 3 CTA kontak final (D12). Status dicatat untuk Gate 2 | — | Gate 2 audit |
| TC-31 | US-07 | **PASS** | Badge Halal di footer: pill bg caramel (`#C98A4B`) + teks espresso (`#2B1D16`), kontras terhitung 5,6:1, terbaca teks "Halal", terlihat di 320 px | — | Sesuai PRD US-07 & DESIGN_SPEC §3 |
| TC-32 | US-07 | **PASS** | Markup memuat fallback statis `2026`; `assets/js/main.js` memperbarui via `textContent = String(new Date().getFullYear())`; tidak kosong tanpa JS | — | Sesuai TECH_SPEC §9 |
| TC-33 | US-07 | **PASS** | 100% (6/6) tautan cepat footer (`#beranda`, `#menu`, `#tentang`, `#galeri`, `#lokasi`, `#kontak`) meresolve ke ID section valid | — | 0 broken anchor |
| TC-34 | US-01, US-04 | **PASS** | Viewport 320 px: `scrollWidth = 320`, `innerWidth = 320`, overflow = 0 px. Screenshot: `docs/preview/stage1/mobile-320.png` | — | Target responsif ekstrem |
| TC-35 | US-01, US-04 | **PASS** | Viewport 360 px: `scrollWidth = 360`, `innerWidth = 360`, overflow = 0 px. Screenshot: `docs/preview/stage1/mobile-360.png` | — | Target perangkat PRD §7 |
| TC-36 | US-01, US-04 | **PASS** | Viewport 390 px: `scrollWidth = 390`, `innerWidth = 390`, overflow = 0 px. Screenshot: `docs/preview/stage1/mobile-390.png` | — | Target iPhone standard |
| TC-37 | US-01, US-04 | **PASS** | Viewport 768 px: `scrollWidth = 768`, `innerWidth = 768`, overflow = 0 px. Screenshot: `docs/preview/stage1/tablet-768.png` | — | Tablet layout |
| TC-38 | US-01, US-04 | **PASS** | Viewport 1024 px: `scrollWidth = 1009`, `innerWidth = 1024`, overflow = 0 px; nav inline 5 tautan aktif (toggle burger tersembunyi `display: none`) | — | Desktop breakpoint awal |
| TC-39 | US-01, US-04 | **PASS** | Viewport 1440 px: `scrollWidth = 1425`, `innerWidth = 1440`, overflow = 0 px. Screenshot: `docs/preview/stage1/desktop-1440.png` | — | Desktop widescreen |
| TC-40 | US-01 | **PASS** | Nav mobile: klik tombol "Menu" membuka panel disclosure (`aria-expanded="true"`, `hidden` dicabut); tombol Escape menutup panel & mengembalikan fokus; klik tautan anchor menutup panel; ≥1024px inline nav aktif | — | A11y disclosure disclosure pattern |
| TC-41 | US-04, US-07 | **PASS** | `<html lang="id">`, `<title>` (46 karakter ≤ 60), meta description Bahasa Indonesia ada, meta viewport standard tanpa `maximum-scale` | — | Meta standard |
| TC-42 | US-04, US-07 | **PASS** | Hierarki heading: 1 `<h1>` (hero), berurutan H2 per section, H3 kategori/nilai, H4 subgrup; semua 6 section memiliki `aria-labelledby` valid | — | WCAG 1.3.1 Info & Relationships |
| TC-43 | US-04, US-07 | **PASS** | 100% (1 button, 25 link) memiliki accessible name (teks non-kosong atau aria-label); ikon dekoratif diberi `aria-hidden="true"` | — | WCAG 4.1.2 Name, Role, Value |
| TC-44 | US-04, US-07 | **PASS** | Urutan fokus keyboard sinkron dengan visual (0 tabindex positif); focus outline 2 px solid espresso / cream (:focus-visible); `prefers-reduced-motion: reduce` mematikan smooth-scroll dan transisi menjadi 0,01 ms | — | WCAG 2.4.3 Focus Order & 2.4.7 Focus Visible |
| TC-45 | US-04, US-07 | **PASS** | Rasio kontras terhitung: espresso on cream = 14,5:1; espresso on cream-deep = 12,9:1; espresso on caramel = 5,6:1; caramel on espresso = 5,6:1; stone-deep on cream = 5,0:1; kombinasi gagal (caramel text on cream 2,6:1) tidak dipakai | BUG-01 (minor touch target) | Kontras warna 100% AA; temuan minor pada lebar target link footer |
| TC-46 | US-01, US-04 | **SKIP (Gate 2)** | Lighthouse Mobile baseline: Performance **99**, Accessibility **100**, Best Practices **100**, SEO **100** | — | Melampaui target Gate 2 (semua ≥ 90/95) |
| TC-47 | US-01, US-04 | **SKIP (Gate 2)** | LCP baseline mobile: **1.802 ms** (< 2.500 ms target 4G). Elemen LCP: Hero image (`assets/img/ig/ig-07.jpg`) | — | Gate 2 |
| TC-48 | US-01, US-04 | **SKIP (Gate 2)** | Total ukuran JS+CSS: `styles.css` (17,8 KB) + `main.js` (2,4 KB) = **20,2 KB** (≤ 250 KB target). 1 file CSS, 1 file JS | — | Gate 2 |
| TC-49 | US-01, US-04 | **PASS** | Maksimal 2 font Google (Fraunces + Inter), 3 weight, `display=swap`, 2 preconnect domain, 0 third-party scripts | — | Performance font loading valid |
| TC-50 | US-02, US-05, US-06, US-07 | **PASS** | Inventaris D4 lengkap: 3 token unik (`PLACEHOLDER_HERO_IMAGE`, `PLACEHOLDER_MENU_ITEMS`, `PLACEHOLDER_GALLERY`), 3 atribut `data-placeholder="true"`, 12 komentar penanda | — | Input Kevin chasing data klien |
| TC-51 | US-02, US-05, US-06, US-07 | **SKIP (Gate 2)** | Placeholder masih diizinkan di Stage 1 per D4; re-scan nol placeholder wajib pada Gate 2 | — | Gate 2 |
| TC-52 | US-02, US-05, US-06, US-07 | **SKIP (Gate 2)** | Grep dummy text ("lorem ipsum", "xxx", "TODO", "contoh", "your-"): 0 match ditemukan di `index.html` dan `assets/` | — | Gate 2 |
| TC-53 | US-01, US-07 | **PASS** | 100% (18/18) tautan internal `#...` meresolve ke ID elemen yang ada; 0 ID duplikat; 0 broken link | — | Link integrity PASS |
| TC-54 | US-06 | **SKIP (Gate 2)** | Pengecekan HTTP status external link: Google Fonts (200), WhatsApp API (200), Instagram profile (200), Google Maps (200) | — | Semua endpoint eksternal aktif |
| TC-55 | US-02, US-06 | **PASS** | Scan elemen off-scope PRD §5: 0 `<form method>`, 0 checkout, 0 cart, 0 login/auth, 0 reservasi engine | — | Sesuai batasan PRD §5 |
| TC-56 | US-01, US-04 | **PASS** | 0 parallax, 0 `setInterval` carousel, 0 `<video autoplay loop>`, 0 efek 3D, 0 gradient, 0 glassmorphism | — | Mematuhi PRD §4 |
| TC-57 | US-01, US-04 | **SKIP (Gate 2)** | CLS aktual dari audit Lighthouse: **0,001** (jauh di bawah target 0,100) | — | Gate 2 |
| TC-58 | US-01, US-04, US-07 | **PASS** | Kesesuaian DESIGN_SPEC v1.2: 4 token hex utama terpasang, Fraunces + Inter, border-radius 0 (kecuali badge pill Halal), 7 section terurut S1–S7 | — | Conformance DESIGN_SPEC PASS |
| TC-59 | US-04, US-05 | **PASS** | 100% (14 referensi) path aset relatif tanpa leading `/` (`assets/...`), semua target file fisik eksis di disk, 0 hotlink eksternal pada `<img>` | — | D2 & D5 compliant |

---

## 3. Inventaris Placeholder Stage 1 (Input Kevin-CEO)

Sesuai aturan D4 dan DESIGN_SPEC §6, data yang belum final dari klien ditandai secara formal agar Kevin dapat menagih ke klien:

| Token / Atribut | Lokasi di `index.html` | US-ID | Keterangan & Rencana Stage 2 |
|---|---|---|---|
| `PLACEHOLDER_HERO_IMAGE` & `data-placeholder="true"` | Baris 69, 73 (Hero caption) | US-01 | Foto portrait Instagram (`ig-07.jpg`) terpasang sementara; menunggu aset foto landscape final dari klien (⚠️ D14). |
| `PLACEHOLDER_MENU_ITEMS` & `data-placeholder="true"` | Baris 190–191 (`.menu__empty`) | US-02 | Fallback menu harian dengan tombol WhatsApp. Di Stage 2 akan digantikan 60 item menu final dari `docs/MENU.md`. |
| `PLACEHOLDER_GALLERY` & `data-placeholder="true"` | Baris 227, 254 (Galeri caption) | US-04 | Foto kurasi Instagram (`ig-03`..`ig-12`) terpasang sementara; menunggu konfirmasi izin klien (R9) pada Stage 2. |
| Komentar harga menu (`<!-- PLACEHOLDER: ... -->`) | Baris 85, 108, 131, 156, 170 | US-02 | Penanda harga sementara berlabel `—`. Rio telah menyepakati harga final di `docs/MENU.md` (Tongkol Rp17.000, Choco Cheese Sourdough Rp22.000). |

### Status Verifikasi CTA (PRD §6):
- **CTA Hero 1 (WhatsApp):** `https://wa.me/6285236639216?text=...` → **Final** (nomor resmi dari D12 / `docs/CONTENT_DATA.md`).
- **CTA Hero 2 (Lihat Menu):** `#menu` → **Final** (anchor internal ke section Menu).
- **CTA Menu Fallback (WhatsApp):** `https://wa.me/6285236639216?text=...` → **Final**.
- **CTA Lokasi (Google Maps):** `https://www.google.com/maps/search/?api=1&query=...` → **Final** (link search alamat presisi).
- **CTA Kontak 1 (WhatsApp):** `https://wa.me/6285236639216?text=...` → **Final**.
- **CTA Kontak 2 (Instagram):** `https://instagram.com/omahkeboen.jbg` → **Final** (profil IG resmi klien).
- **CTA Kontak 3 (Google Maps):** `https://www.google.com/maps/search/?api=1&query=...` → **Final**.

---

## 4. Daftar Temuan Defect (Defect Log)

Hanya ada 1 temuan berderajat **Minor** yang tidak memblokir Gate 1:

### `BUG-01`: Touch Target Width Tautan Cepat Footer di Bawah 44 px pada Kata Pendek
- **Severity:** Minor (Non-blocking)
- **Terkait:** US-07, TC-45, DESIGN_SPEC §5 (Touch target ≥ 44×44 px)
- **Symptom:** Pada mobile viewport 390 px, tautan cepat teks di footer (`.footer__links a`) memiliki tinggi bounding box 44,0 px (memenuhi target tinggi), namun untuk teks pendek:
  - "Menu": lebar 38,3 px
  - "Galeri": lebar 39,8 px
  - "Lokasi": lebar 43,8 px
- **Langkah Reproduksi:**
  1. Buka preview pada viewport mobile 390×844 px.
  2. Inspect elemen `.footer__links a[href="#menu"]`.
  3. Amati computed bounding box: 38,3 × 44,0 px.
- **Expected vs Actual:**
  - *Expected (DESIGN_SPEC §5):* Semua touch target kontrol interaktif ≥ 44×44 px.
  - *Actual:* Tinggi 44 px, lebar < 44 px (antara 38,3–43,8 px). Tetap lolos WCAG 2.5.8 Level AA (minimum 24 px) dan Lighthouse Accessibility 100/100.
- **Bukti:** `docs/preview/qa-stage1/bug-01-footer-touch-targets.png`
- **Rekomendasi untuk Stage 2 (Okta):** Tambahkan `min-width: 44px; justify-content: center; display: inline-flex;` atau naikkan padding horizontal menjadi `padding-inline: 12px;` pada `.footer__links a`.

---

## 5. Bukti Visual yang Tersimpan

1. `docs/preview/stage1/mobile-320.png` & `mobile-320-viewport.png` (320×800)
2. `docs/preview/stage1/mobile-360.png` & `mobile-360-viewport.png` (360×800)
3. `docs/preview/stage1/mobile-390.png` & `mobile-390-viewport.png` (390×844)
4. `docs/preview/stage1/tablet-768.png` & `tablet-768-viewport.png` (768×1024)
5. `docs/preview/stage1/desktop-1024.png` & `desktop-1024-viewport.png` (1024×768)
6. `docs/preview/stage1/desktop-1440.png` & `desktop-1440-viewport.png` (1440×900)
7. `docs/preview/stage1/lighthouse-report.json` (Lighthouse raw mobile audit run)
8. `docs/preview/qa-stage1/bug-01-footer-touch-targets.png` (Bukti temuan minor BUG-01)

---

## 6. Kesimpulan & Gate Verdict

- Seluruh 44 Test Case Gate 1 dan Gate 1+2 berstatus **PASS**.
- Skor audit Lighthouse Mobile luar biasa: **Performance 99**, **Accessibility 100**, **Best Practices 100**, **SEO 100**.
- LCP 1,8 s dan total bundle CSS+JS 20,2 KB jauh di bawah ambang batas (250 KB).
- Tidak ditemukan defect blocker atau major. Satu-satunya temuan adalah defect minor touch target lebar link footer yang direkomendasikan disempurnakan di Stage 2.

**STATUS: APPROVED**
Prototype Stage 1 disetujui untuk dipresentasikan kepada Rio. Lanjut ke Stage 2.
