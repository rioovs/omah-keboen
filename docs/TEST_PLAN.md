# TEST PLAN — Website Single-Page "Omah Keboen"

Owner: rimuru-qa | Sumber: docs/PRD.md v1.0.0 (rujuk US-ID + §6, teks tidak disalin), docs/DESIGN_SPEC.md v1.0, docs/PROJECT_PLAN.md (D1–D11)
Versi: 2026-10-20 | Kartu t_ab494afb | Bahasa konten web: Indonesia

---

## 1. Lingkup & Konvensi

- Lingkup: tujuh area fungsional `index.html` statis 1 halaman (US-01…US-07), responsive 320–1440 px, a11y, perf, link/placeholder. **Tanpa** testing di luar PRD §5 (checkout, reservasi, CMS, login, SEO advanced, newsletter).
- Tipe TC: `functional`, `responsive`, `a11y`, `perf`, `link`, `placeholder`.
- Gate:
  - **Gate 1** = kolom `1` → wajib hijau saat QA Stage 1 (prototype; placeholder masih boleh sesuai D4, asal 100% ter-inventaris).
  - **Gate 2** = kolom `2` → wajib hijau saat QA final UI; placeholder wajib nol (D4).
  - **`1+2`** = dijalankan di kedua gate: Gate 1 menilai struktur (dicatat), Gate 2 menilai target akhir (data/link final).
  - Semua TC kolom `1`/`1+2` menjadi **regression set** saat Gate 2 (re-run penuh).
- Status: `Belum` / `PASS` / `FAIL` / `Skip` (alasan ditulis di thread kartu).
- Expected result selalu berisi nilai terukur (angka, px, skor, count) — bukan "terlihat bagus".

## 2. Cara Eksekusi (rig QA)

1. Serve: `python3 -m http.server 8000` di root repo (kartu Okta).
2. Chromium headless terpasang host: `/home/rioovs/.hermes/tools/chromium-1208/chrome-linux64/chrome` — screenshot per breakpoint + dump DOM + CDP untuk cek JS-off.
3. Lighthouse: `CHROME_PATH=/home/rioovs/.hermes/tools/chromium-1208/chrome-linux64/chrome npx --yes lighthouse http://localhost:8000 --form-factor=mobile --screenEmulation.mobile --chrome-flags="--headless" --quiet` (v13 terpasang) → skor + LCP/CLS.
4. Placeholder scan deterministik (D4): `grep -rn "PLACEHOLDER_\|data-placeholder\|<!-- PLACEHOLDER" index.html assets/`
5. Link scan: dump semua `href`/`src` dari DOM → anchor internal dicek ke `<id>`; eksternal dicek HTTP status.
6. Bukti: screenshot `docs/preview/stage1/` & `docs/preview/qa2/`; angka ditulis di `docs/QA_REPORT_STAGE1.md` (Stage 1) / `docs/QA_REPORT.md` (Gate 2).

## 3. Tabel Utama — TC-01…TC-59

| TC-ID | US-ID | Skenario/Langkah | Expected Result | Tipe | Prioritas | Gate | Status |
|---|---|---|---|---|---|---|---|
| TC-01 | US-01 | Buka halaman; dump DOM; cari `<h1>` di section hero | `<h1>` berisi "Omah Keboen" persis; hanya 1 `<h1>` per halaman; 1 elemen lead/positioning non-kosong (≥ 12 karakter) | functional | P0 | 1 | Belum |
| TC-02 | US-01 | Dump link/tombol di section hero | Tepat 2 CTA: "Hubungi WhatsApp" (`href` mengandung `wa.me/`) dan "Lihat Menu" (`href="#menu"`); 0 tombol lain di hero | functional | P0 | 1 | Belum |
| TC-03 | US-01 | Klik "Lihat Menu" (mouse dan Enter via keyboard) | `getBoundingClientRect().top` dari `#menu` ∈ [0, 120] px (aturan `scroll-margin-top` DESIGN_SPEC §1.4 tetap berlaku); smooth scroll; 0 error console | functional | P1 | 1 | Belum |
| TC-04 | US-01 | Screenshot 1440×900 dan 390×844 pada viewport awal (scrollY = 0) | Di 1440×900: h1 + lead + kedua CTA punya `bottom ≤ viewportHeight`. Di 390: h1 + lead + kedua CTA terlihat dalam 640 px pertama (`bottom ≤ 640`) per DESIGN_SPEC §2.S1; foto hero boleh di bawah fold (lazy). Bukti 2 file screenshot | responsive | P0 | 1 | Belum |
| TC-05 | US-01 | Periksa `<img>` hero | Punya `width`/`height` eksplisit; rasio 16:9; ≥ 1600 px lebar (Stage 1 paket placeholder SVG 1600×900); `fetchpriority="high"` + `loading="eager"` di desktop (mobile lazy diizinkan sesuai DESIGN_SPEC §1.4 — pilihan Okta dicatat di TECH_SPEC); file ≤ 300 KB di Gate 2; `src` relatif | perf | P1 | 2 | Belum |
| TC-06 | US-02 | Dump heading sub-section menu | 4 kategori tersedia: Kopi, Non-Kopi, Kudapan, Main Course (Italian & Nusantara); teks heading memuat kata kunci (case-insensitive); level heading seragam (semua H3) — DESIGN_SPEC §2.S2 | functional | P0 | 1 | Belum |
| TC-07 | US-02 | Dump item di kategori Kopi | ≥ 1 item per kategori; tiap item punya node nama + node harga; 0 item kosong; (Gate 2: nama & harga final dari CLIENT_INPUT, 0 `PLACEHOLDER_*`) | functional | P0 | 2 | Belum |
| TC-08 | US-02 | Dump item di kategori Non-Kopi | Sama seperti TC-07 | functional | P0 | 2 | Belum |
| TC-09 | US-02 | Dump item di kategori Kudapan | Sama seperti TC-07 | functional | P0 | 2 | Belum |
| TC-10 | US-02 | Dump item di kategori Main Course (dua sub-grup: Italian dan Nusantara) | Kedua sub-grup tampil (≥ 1 item + harga per sub-grup); 0 harga karangan di luar data klien (Gate 2) | functional | P0 | 2 | Belum |
| TC-11 | US-02 | Saat data menu belum tersedia dari Rio, periksa blok fallback (deteksi `.menu__empty`/`data-placeholder="true"`) | Label "Hubungi untuk menu harian" terlihat di section menu + CTA WA tetap ada dekat blok itu; 0 harga karangan di bawah label; placeholder ditandai sesuai D4 (token + atribut + komentar) — DESIGN_SPEC §2.S2 | functional | P0 | 1 | Belum |
| TC-12 | US-02 | RegEx semua node harga di halaman | 100% harga match pola `^Rp\d{1,3}(\.\d{3})*$` (format `Rp20.000`, tanpa spasi); jumlah non-match = 0; 0 varian (`Rp. 20.000`, `Rp 20.000`, `20rb`); harga pakai tabular-nums (DESIGN_SPEC §1.2) | functional | P0 | 2 | Belum |
| TC-13 | US-02 | Screenshot 320 px dan 390 px bagian menu; ukur bounding rect tiap kartu menu | Baris item + harga tidak overlap; harga tidak terpotong; nama kiri + harga kanan (`justify-content: space-between` per DESIGN_SPEC §3); 0 horizontal scroll | responsive | P0 | 1 | Belum |
| TC-14 | US-03 | Dump isi blok Tentang | 1 blok narasi (≤ 4 kalimat, `max-width: 62ch`) memuat 3 konsep: kualitas biji kopi (keyword `kopi`), presisi teknik seduh (keyword `seduh`), pelayanan ramah (keyword `ramah`) — masing-masing ≥ 1 match | functional | P0 | 1 | Belum |
| TC-15 | US-03 | Count item daftar nilai di blok Tentang | Tepat 3 poin nilai: "Kualitas", "Presisi", "Ramah" (label persis); rendering horizontal tanpa kartu per DESIGN_SPEC §2.S3; 0 item tambahan | functional | P0 | 1 | Belum |
| TC-16 | US-04 | Count semua `<img>` di section galeri + periksa dimensi/rasio | 4 ≤ jumlah foto ≤ 8; tiap item memakai rasio 4:5 (`aspect-ratio` CSS atau `width/height` 1000×1250); semua file dari `assets/img/` lokal (Stage 1 boleh placeholder SVG 1000×1250 per D5); Gate 2 = aset final dari klien | functional | P0 | 1+2 | Belum |
| TC-17 | US-04 | Periksa atribut `loading`/`decoding` tiap img galeri | 100% img galeri punya `loading="lazy"` + `decoding="async"` + `width`/`height` eksplisit (CLS 0) — DESIGN_SPEC §3 | functional | P1 | 1 | Belum |
| TC-18 | US-04 | Dump `alt` semua img (hero + galeri) | 100% img punya `alt` non-kosong & deskriptif (menyiratkan interior/suasana/barista/hidangan, panjang ≥ 5 karakter, bukan nama file, bukan kata "placeholder/gambar/foto1"); img dekoratif `alt=""` + `aria-hidden="true"`; 0 img tanpa atribut alt | a11y | P0 | 1 | Belum |
| TC-19 | US-04 | Hitung jumlah kolom grid galeri di tiap breakpoint (computed style) | Sesuai DESIGN_SPEC §1.4: 320–639 → 1 kolom; 640–1023 → 2; 1024–1279 → 3; ≥1280 → 4; 1 foto besar span 2 kolom sebagai anchor; `gutter` satu nilai konsisten; 0 overlap | responsive | P0 | 1 | Belum |
| TC-20 | US-05 | Dump blok alamat (section Lokasi) | Alamat memuat komponen: nama tempat — jalan/nomor — desa/kecamatan — kabupaten (memuat "Jombang"); 1 blok alamat (bukan tersebar 2 blok); (Gate 2: data final klien, 0 `PLACEHOLDER_*`) | functional | P0 | 1+2 | Belum |
| TC-21 | US-05 | Dump struktur jam buka (`.hours-table`) | `<table>` semantik 2 kolom dengan `<th scope="row">`; 7 baris hari lengkap: Senin, Selasa, Rabu, Kamis, Jumat, Sabtu, Minggu; tiap baris punya nilai jam/tutup; (Gate 2: nilai final klien, 0 `PLACEHOLDER_*`) | functional | P0 | 1+2 | Belum |
| TC-22 | US-05 | Periksa format dan konsistensi node jam dari TC-21 | 1 format konsisten di 7 baris (mis. `09.00–22.00`, titik pemisah, tabular-nums); hari tutup ditandai teks "Tutup" (bukan hanya warna); jumlah varian format = 0 | functional | P1 | 2 | Belum |
| TC-23 | US-05 | Dump tombol "Buka di Google Maps" (`.btn--map`) | Tombol ada di section Lokasi; `href` mengandung `google.com/maps` (place/search link); ada icon + label teks; (Gate 2: link final ke place Omah Keboen, address = TC-20) | functional | P0 | 1+2 | Belum |
| TC-24 | US-05 | Periksa cara menampilkan peta (`.map-embed`) | Peta ringan: box placeholder rasio 4:3 + CTA Maps, atau static `<img>`, atau iframe google maps = 0, atau jika iframe dipakai maka `loading="lazy"` + `width`/`height` + `title`; third-party script non-lazy saat initial load = 0; keputusan Okta dicatat di TECH_SPEC | perf | P1 | 1+2 | Belum |
| TC-25 | US-06 | Periksa href tombol WA di section Kontak | `href` cocok pola `^https://wa\.me/\d+` (D7): nomor internasional tanpa `+` dan tanpa leading 0, query `?text=` ter-encode; (Gate 2: nomor final dari klien, 0 `PLACEHOLDER_*`) | link | P0 | 1+2 | Belum |
| TC-26 | US-06 | Periksa href tombol Instagram | `href` cocok pola `^https://instagram\.com/[A-Za-z0-9_.]+$` (D7); tanpa `@`; (Gate 2: username final dari klien, 0 `PLACEHOLDER_*`) | link | P0 | 1+2 | Belum |
| TC-27 | US-06 | Periksa href tombol/tautan Maps di section Kontak (`.contact-action--maps`) | `href` = link Google Maps tempat nyata (place/search address) konsisten dengan alamat TC-20; (Gate 2: bukan link generik `google.com` tanpa place) | link | P0 | 1+2 | Belum |
| TC-28 | US-06 | Dump isi node tiap CTA (WA, Instagram, Maps) | Tiap CTA punya icon (inline SVG / `<img>` / icon font, `aria-hidden="true"`) + node teks label (≥ 3 karakter); 0 icon-only tanpa teks; tinggi tombol ≥ 44 px per DESIGN_SPEC §2.S6 | functional | P0 | 1 | Belum |
| TC-29 | US-06 | Periksa `target`/`rel` semua link eksternal | 100% link eksternal punya `target="_blank"` + `rel` memuat `noopener`; jumlah link eksternal tanpa `noopener` = 0 | a11y | P0 | 1 | Belum |
| TC-30 | US-06 | Audit final-link Gate 2: kumpulkan seluruh CTA (WA / Instagram / Maps) | 100% CTA href final (0 `PLACEHOLDER_*`, `example.com`, `xxx`, `your-`, `href="#"`); status per CTA (final/placeholder) dicatat untuk Kevin | placeholder | P0 | 2 | Belum |
| TC-31 | US-07 | Dump node footer (`.halal-badge`) | 1 elemen `<footer>`; badge Halal = pill bg caramel + teks espresso (kontras 5,6:1 per DESIGN_SPEC §3/§5); terbaca sebagai teks (node teks "Halal" atau `alt`/`aria-label` memuat "Halal"); badge tetap terlihat di 320 px | functional | P0 | 1 | Belum |
| TC-32 | US-07 | Periksa tahun di footer; cek ulang dengan JS dimatikan (CDP `Emulation.setScriptExecutionDisabled`) | Tahun = `new Date().getFullYear()` via JS = tahun berjalan (2026 saat eksekusi); markup tetap memuat fallback tahun statis sehingga tanpa JS footer tidak kosong; 0 tahun hardcoded sebagai satu-satunya sumber | functional | P0 | 1 | Belum |
| TC-33 | US-07 | RegEx semua `href` `<a>` di footer (tautan cepat S1–S6) | 100% `href` internal `#<id>` meresolve ke `<section id>` nyata; jumlah unresolved = 0 | link | P1 | 1 | Belum |
| TC-34 | US-01, US-04 | DevTools viewport 320; ukur `document.scrollWidth` vs `innerWidth`; dump elemen overflow | `scrollWidth ≤ 321` px; nav & grid galeri tetap rapi; 0 elemen melewati viewport | responsive | P0 | 1 | Belum |
| TC-35 | US-01, US-04 | Sama di 360 px (target perangkat PRD §7) | `scrollWidth ≤ 361` px; 0 elemen melewati viewport; bukti screenshot | responsive | P0 | 1 | Belum |
| TC-36 | US-01, US-04 | Sama di 390 px | `scrollWidth ≤ 391` px; 0 elemen melewati viewport | responsive | P0 | 1 | Belum |
| TC-37 | US-01, US-04 | Sama di 768 px (tablet) | `scrollWidth ≤ 769` px; `sm`/`md` layout konsisten (menu/galeri 2 kolom, tentang split 7/5) | responsive | P1 | 1 | Belum |
| TC-38 | US-01, US-04 | Sama di 1024 px (desktop) | `scrollWidth ≤ 1025` px; nav desktop inline 5 tautan (bukan hamburger) | responsive | P1 | 1 | Belum |
| TC-39 | US-01, US-04 | Sama di 1440 px (desktop) | `scrollWidth ≤ 1441` px; margin maks 48 px; 0 elemen melebihi lebar viewport | responsive | P0 | 1 | Belum |
| TC-40 | US-01 | Interaksi nav: tombol "Menu" di < 1024 (klik + Enter/Space) | Nav = disclosure push-down (bukan overlay) berisi 5 anchor + CTA WA; tombol toggle expand/collapse dengan state visual; ESC dan klik anchor menutup panel; `scroll-margin-top` terpasang di setiap section; ≥ 1024 nav inline (DESIGN_SPEC §1.4); 0 tautan nav mati | functional | P0 | 1 | Belum |
| TC-41 | US-04, US-07 | Dump `<html>` dan `<head>` (lang, title, meta viewport) | `<html lang="id">` persis; `<title>` non-kosong ≤ 60 karakter; meta description berbahasa Indonesia; meta viewport `width=device-width, initial-scale=1` tanpa `maximum-scale` | a11y | P0 | 1 | Belum |
| TC-42 | US-04, US-07 | Dump semua heading h1–h6 | 1 `<h1>` (di hero); urutan level tidak melompat (H1 hero → H2 per section → H3 sub) per DESIGN_SPEC §5; setiap section `aria-labelledby` menuju heading-nya; 0 heading kosong | a11y | P0 | 1 | Belum |
| TC-43 | US-04, US-07 | Hitung accessible name tiap kontrol (`<button>`, `<a>`, toggle "Menu") | 100% kontrol punya accessible name ≥ 1 karakter (teks / `aria-label` / `alt` ikon); jumlah kontrol tanpa nama = 0; ikon dekoratif `aria-hidden="true"` | a11y | P0 | 1 | Belum |
| TC-44 | US-04, US-07 | Tab berpindah semua kontrol via keyboard (Chromium headless) | Urutan fokus mengikuti urutan visual (tanpa `tabindex` positif); semua kontrol bisa difokus; focus outline 2 px solid espresso + offset 2 px selalu terlihat (`:focus-visible`) di 100% kontrol; `prefers-reduced-motion: reduce` → `scroll-behavior: smooth` off dan transisi ≤ 0 ms | a11y | P0 | 1 | Belum |
| TC-45 | US-04, US-07 | Hitung rasio kontras teks ke background (computed CSS) | Semua pasangan teks/latar ≥ 4.5:1 (teks besar ≥ 3:1); UI komponen (boundary tombol/ikon) ≥ 3:1; combo yang DESIGN_SPEC §5 nyatakan GAGAL tidak terpakai (contoh: teks caramel di cream ≈ 2,6:1; stone-deep/cream-deep pada teks kecil 4,47:1); jumlah pelanggaran = 0 | a11y | P0 | 1 | Belum |
| TC-46 | US-01, US-04 | Lighthouse mobile (form-factor mobile, throttling simulasi 4G) 3x, ambil median | Performance ≥ 90, Accessibility ≥ 95, Best Practices ≥ 90, SEO ≥ 90 (angka aktual ditulis di report); Gate 1 = baseline dicatat (placeholder boleh), Gate 2 = wajib tercapai | perf | P0 | 2 | Belum |
| TC-47 | US-01, US-04 | Ambil LCP dari audit Lighthouse (simulasi 4G) | LCP < 2500 ms; elemen LCP = teks/img hero; Gate 1 baseline dicatat | perf | P0 | 2 | Belum |
| TC-48 | US-01, US-04 | Ukur total ukuran file semua `.js` + `.css` (`du -b`; catat juga ukuran transfer gzip) | Total JS + CSS ≤ 250 KB; jumlah file `.css` ≤ 2 dan `.js` ≤ 3 (D1: tanpa build step, tanpa framework, tanpa dependency npm); Gate 1 baseline dicatat | perf | P0 | 2 | Belum |
| TC-49 | US-01, US-04 | Periksa `font-family` & teknik loading font di CSS/HTML | Maks 2 font family = Fraunces (H1/H2) + Inter, 3 weight (Fraunces 400; Inter 400 & 600) per DESIGN_SPEC §1.2; semua `@font-face`/link font pakai `display=swap` + preconnect + fallback stack; 0 third-party script (tracking/framework) | perf | P1 | 1 | Belum |
| TC-50 | US-02, US-05, US-06, US-07 | Gate 1 inventory placeholder: `grep -rn "PLACEHOLDER_" index.html assets/`, plus `data-placeholder="true"` dan `<!-- PLACEHOLDER` | Semua penanda D4 (DESIGN_SPEC §6) terdeteksi: token `PLACEHOLDER_WA_NUMBER`, `PLACEHOLDER_IG_USER`, `PLACEHOLDER_MENU_ITEMS`, `PLACEHOLDER_HOURS`, `PLACEHOLDER_HERO_IMAGE`, `PLACEHOLDER_GALLERY_N`, atribut `data-placeholder="true"`, dan komentar `<!-- PLACEHOLDER: … -->`; daftar lengkap dengan US-ID pemilik; 100% ter-inventaris di report (input Kevin chasing data klien) | placeholder | P0 | 1 | Belum |
| TC-51 | US-02, US-05, US-06, US-07 | Gate 2 re-scan placeholder (grep sama) | Jumlah `PLACEHOLDER_*` = 0; jumlah `data-placeholder="true"` = 0; jumlah `<!-- PLACEHOLDER` = 0 (D4) — token/atribut/komentar wajib hilang semua di Stage 2 | placeholder | P0 | 2 | Belum |
| TC-52 | US-02, US-05, US-06, US-07 | Grep teks dummy di `index.html` ("lorem ipsum", "xxx", "TODO", "contoh", "your-") | Jumlah match pada output final = 0 di Gate 2 (di Gate 1 hanya boleh jika ditandai D4 dan tercatat di TC-50) | placeholder | P1 | 2 | Belum |
| TC-53 | US-01, US-07 | Dump semua `href="#..."` di halaman | 100% anchor internal meresolve ke `<id>` eksisting; jumlah id duplikat = 0; jumlah broken anchor = 0 | link | P0 | 1 | Belum |
| TC-54 | US-06 | Kumpulkan semua URL eksternal; cek HTTP status satu-satu | 100% eksternal mengembalikan 200/2xx/3xx; jumlah 4xx/5xx = 0; daftar URL + status dicatat | link | P1 | 2 | Belum |
| TC-55 | US-02, US-06 | Scan elemen di luar PRD §5 (`<form method>`, tombol checkout, cart, login, reservasi, multibahasa) | Jumlah fitur off-scope = 0 (PRD §5: pembayaran, reservasi, backend, halaman tambahan, loyalty, newsletter) | functional | P1 | 1 | Belum |
| TC-56 | US-01, US-04 | Periksa CSS/JS untuk efek larangan PRD §4 + DESIGN_SPEC §1.5 (parallax, carousel otomatis, video loop, 3D, gradient, glassmorphism, shadow pada elemen diam) | 0 `setInterval` auto-advance carousel; 0 `<video autoplay loop>`; 0 `parallax` / `perspective` / `rotate3d` / gradient / glass; shadow hanya di antara kadang hover, 0 pada elemen diam; hover hanya mengubah warna 150 ms tanpa layout shift | functional | P1 | 1 | Belum |
| TC-57 | US-01, US-04 | Ambil CLS dari audit Lighthouse | CLS ≤ 0.1 (target 0); semua `<img>`/iframe punya `width`/`height` atau aspect-ratio | perf | P1 | 2 | Belum |
| TC-58 | US-01, US-04, US-07 | Bandingkan halaman dengan docs/DESIGN_SPEC.md (token, komponen, susunan) | 4 token warna hex sama (`#2B1D16`, `#F7F1E8`, `#C98A4B`, `#8A8078`) dan turunan dipakai sesuai §1.1; font Fraunces + Inter; radius 0 di tombol/kartu (satu-satunya pengecualian: badge Halal pill); urutan 7 section = S1 Hero → S2 Menu → S3 Tentang → S4 Galeri → S5 Lokasi → S6 Kontak → S7 Footer; tanpa hex/px hardcoded melanggar skenario token §1 | functional | P0 | 1 | Belum |
| TC-59 | US-04, US-05 | RegEx semua `src`/`href` aset (`img`, `script`, `link`, `background-image` di CSS) | 100% path relatif tanpa leading `/` (D2); semua path resolve ke file nyata di `assets/`; jumlah hotlink eksternal pada `img` = 0 (D5) | functional | P0 | 1 | Belum |

## 4. Self-Check Cakupan (US-ID → TC)

Baris boleh mengutip > 1 US-ID (TC lintas area), jadi jumlah di bawah lebih dari 59.

| US-ID | TC | Jumlah baris |
|---|---|---|
| US-01 | TC-01…TC-05, TC-34…TC-40, TC-46…TC-49, TC-53, TC-56…TC-58 | 20 |
| US-02 | TC-06…TC-13, TC-50…TC-52, TC-55 | 12 |
| US-03 | TC-14, TC-15 | 2 |
| US-04 | TC-16…TC-19, TC-34…TC-39, TC-41…TC-49, TC-56…TC-59 | 23 |
| US-05 | TC-20…TC-24, TC-50…TC-52, TC-59 | 9 |
| US-06 | TC-25…TC-30, TC-50…TC-52, TC-54, TC-55 | 11 |
| US-07 | TC-31…TC-33, TC-41…TC-45, TC-50…TC-53, TC-58 | 13 |
| **Total TC** | TC-01…TC-59 (unik, berurutan, tanpa celah) | **59** |

Check: 59 baris, 59 TC-ID unik, urutan `TC-01`→`TC-59` tanpa duplikat/celah; tidak ada US-ID tanpa TC.

## 5. Reuse untuk QA Stage 1 (kartu t_c8950ccd)

- TC wajib hijau Stage 1 = semua baris dengan Gate `1` atau `1+2` → **44 TC** (36 baris Gate `1` + 8 baris Gate `1+2`).
- TC eksklusif Gate 2 = 15 baris (TC-05, TC-07…TC-10, TC-12, TC-22, TC-30, TC-46…TC-48, TC-51, TC-52, TC-54, TC-57) → di Stage 1 cukup `Skip` dengan alasan (data final / placeholder masih di toleransi D4).
- Toleransi Gate 1: placeholder boleh ada, tapi **100% ter-inventaris** (TC-50). CTA dinilai dari sintaks format; finality dinilai di Gate 2 (TC-30).
- QA Stage 1 isi `docs/QA_REPORT_STAGE1.md`: kolom `TC-ID | US-ID | Hasil (PASS/FAIL) | Bukti (path screenshot/angka) | BUG-ID | Catatan`, inventaris placeholder per US-ID, daftar BUG-xx + severity, status akhir.
- QA Gate 2 (kartu terpisah): re-run seluruh TC-01…TC-59 sebagai regression + tulis `docs/QA_REPORT.md` dengan STATUS.

## 6. Alat QA di Host

| Alat | Cara pakai |
|---|---|
| Chromium headless | `/home/rioovs/.hermes/tools/chromium-1208/chrome-linux64/chrome --headless --screenshot=<out>.png --window-size=<w>,<h> http://localhost:8000` |
| Lighthouse CLI | `CHROME_PATH=/home/rioovs/.hermes/tools/chromium-1208/chrome-linux64/chrome npx --yes lighthouse <url> --form-factor=mobile --screenEmulation.mobile --quiet` (v13 terpasang) |
| Grep placeholder | `grep -rn "PLACEHOLDER_\|data-placeholder\|<!-- PLACEHOLDER" index.html assets/` |
| DOM dump | `chrome --headless --dump-dom http://localhost:8000` |
| Serve | `python3 -m http.server 8000` (disediakan Okta) |

## 7. Kriteria PASS / Format Defect

- **PASS** = seluruh expected-result terpenuhi, bukti (screenshot / log angka / audit output) tersimpan di `docs/preview/…` atau thread kartu.
- **FAIL** = expected-result tidak tercapai (angka/count/px/skor) atau tidak bisa dibuktikan.
- Defect: `BUG-01…BUG-xx` ringkas — symptom, langkah reproduksi, expected vs actual, TC-ID/US-ID terkait, severity `blocker` / `major` / `minor`.
- Release gate QA: `APPROVED` bila semua TC P0 pada gate aktif PASS dan kondisi placeholder sesuai D4; `REJECTED` bila ada ≥ 1 TC P0 gate aktif FAIL dengan bukti, atau ≥ 1 BUG blocker belum fix.
