# Design Spec — Website Single-Page "Omah Keboen"

**Owner:** anton-uiux | **Dokumen:** `docs/DESIGN_SPEC.md` | **Versi:** 1.2 (Stage 1)  
**Rujukan:** `docs/PRD.md` v1.0.0 (US-01…US-07), `docs/PROJECT_PLAN.md` (D1…D16), `docs/CONTENT_DATA.md` (data klien terverifikasi), `docs/MENU.md` (menu+harga final, 60 item), `docs/TECH_SPEC.md` (keputusan teknis Okta), `docs/TEST_PLAN.md` (TC-01…TC-59) + delta §8 — keputusan di sini merujuk ID, tidak menyalin isi PRD.  
**Cakupan:** 1 halaman, 7 section, mobile-first 320–1440 px. Bahasa UI Indonesia.  
**Aturan pakai:** semua warna/ukuran/spacing diimplementasi Okta lewat token (CSS custom properties) yang didefinisikan di §1. Tidak ada hex/px hardcoded di komponen.

---

## 0. Cara baca

Keputusan + alasan singkat (shared-rules #3). Setiap section di §2 memetakan ke US-ID dan menyebut nama komponen yang bisa langsung dibangun. Kode CSS/JS tidak ditulis di dokumen ini (implementasi = kartu Okta).

---

## 1. Design tokens

### 1.1 Warna (hex + peran)

**4 token wajib PRD** (brand, tidak boleh diubah):

| Token | Hex | Peran |
|---|---|---|
| `--color-espresso` | `#2B1D16` | Ink utama: semua teks body, judul, ikon, CTA primary. Field S6/S7 (latar gelap) memakai espresso sebagai ground. |
| `--color-cream` | `#F7F1E8` | Ground utama: 70–90% halaman (S1, S2, S4). |
| `--color-caramel` | `#C98A4B` | Fill aksen ≤5% layar: badge Halal di footer, marker dekoratif besar di hero, indikator aktif. **Bukan** warna teks (lihat §5). |
| `--color-stone` | `#8A8078` | Dekoratif/sekunder besar saja: angka besar (≥24 px), ikon non-teks, SVG placeholder. 3,4:1 di cream — tidak untuk teks kecil. |

**Token turunan** (variasi aksesibilitas dari 4 warna di atas; diperlukan agar Lighthouse A11y ≥95, §5):

| Token | Hex | Sumber | Peran |
|---|---|---|---|
| `--color-cream-deep` | `#EDE4D6` | cream −6% lightness | Surface: kartu menu, panel tabel, field S3/S5. |
| `--color-cream-soft` | `#FBF7F0` | cream −2% lightness | Ground lembut untuk placeholder SVG. |
| `--color-espresso-soft` | `#4A3527` | espresso +8% lightness | Teks sekunder di field gelap (S6/S7), tetap 10,2:1 di cream. |
| `--color-stone-deep` | `#6E6660` | stone −14% lightness | Teks sekunder kecil di cream (5,0:1). |
| `--color-caramel-deep` | `#A9702F` | caramel −14% lightness | Grafis/border ≥3:1 (3,7:1 di cream). |
| `--color-caramel-text` | `#8F5F26` | caramel −22% lightness | Teks aksen kecil (4,9:1 di cream / 5,5:1 di putih). |
| `--color-espresso-hover` | `#3E2B21` | espresso +6% lightness | Hover CTA primary. |
| `--color-bone` | `#E8DFD1` | cream −10% lightness | Latar placeholder SVG (netral). |

Alasan: 4 warna PRD tidak cukup untuk teks sekunder dan permukaan; turunan tetap satu keluarga hue sehingga identitas brand tidak berubah.

### 1.2 Tipografi

- **Family (maks 2, D6):** `Fraunces` (display/judul) + `Inter` (teks/sans), via Google Fonts `display=swap`, preconnect (D6).
- **Fallback:** `--font-display: "Fraunces", "Georgia", "Times New Roman", serif`; `--font-text: "Inter", "Helvetica Neue", Arial, sans-serif`.
- **Weights:** Fraunces 400 (H1 + H2) ; Inter 400 (teks) & 600 (tombol, badge, nama kartu, H3). Total 3 weight — payload font kecil untuk LCP (D6).
- **Pemetaan:** H1/H2 = Fraunces 400; H3 (kategori menu, poin nilai) = Inter 600 pada ukuran `--type-body` (bukan ukuran baru); teks/judul-kartu = Inter 400/600; tahun & harga = Inter 400 tabular-nums.
- **4 ukuran (mobile-first clamp, 360→1440):**

| Token | Nilai | Pemakaian |
|---|---|---|
| `--type-display` | `clamp(2.5rem, 1.5rem + 5.5vw, 5.5rem)` | H1 hero (40→88 px) |
| `--type-section` | `clamp(1.75rem, 1.3rem + 2.2vw, 3rem)` | H2 section (28→48 px) |
| `--type-body` | `clamp(1.0625rem, 1rem + 0.25vw, 1.1875rem)` | Paragraf (17→19 px) |
| `--type-small` | `0.875rem` | Harga, caption, meta (14 px) |

- **Setting:** display `line-height: 0.95`, `letter-spacing: -0.03em`, `text-wrap: balance`, `max-width: 14ch`. Body `line-height: 1.5`, `max-width: 62ch`, `text-wrap: pretty`. Harga `font-variant-numeric: tabular-nums`.
- **Alasan 4 ukuran, bukan 6:** PRD batas 3–4; gap jelas antar step agar tidak "mush" (taste type law). Tidak ada subheading size tambahan.

### 1.3 Spacing & radius

- **Base unit 4 px.** Skala: `--space-1 4`, `--space-2 8`, `--space-3 12`, `--space-4 16`, `--space-5 24`, `--space-6 32`, `--space-7 48`, `--space-8 64`, `--space-9 96`.
- **Jarak antar-section:** `--space-section: clamp(4.5rem, 8vw, 8.5rem)` (72→136 px) — lega, mobile 72 px min.
- **Radius:** `--radius: 0` (square) untuk tombol, kartu, panel — diputuskan sekali. Alasan: editorial, hindari "soft radius 9–16 px" yang menurut taste-skill terbaca generik. Badge Halal = fully round (pill) — satu-satunya pengecualian, karena badge.
- **Margin/grid:** `--margin: clamp(1rem, 4vw, 3rem)` (16→48 px); `--gutter: clamp(0.75rem, 2vw, 1.5rem)`; grid 12 kolom; max layout 1360 px (bukan container 1200 px).

### 1.4 Breakpoint & grid (mobile-first)

| Nama | Min-width | Perubahan layout |
|---|---|---|
| base | 320 px | 1 kolom, nav mobile (disclosure) |
| `sm` | 640 px | menu/galeri 2 kolom |
| `md` | 768 px | about split 7/5 |
| `lg` | 1024 px | nav inline 5 link, galeri 3 kolom, lokasi split map |
| `xl` | 1280 px | galeri 4 kolom, container max |
| `2xl` | 1440 px | margin maks (48 px), type display maks |

- Target perangkat: 360 px+ Android (PRD §7), desktop 1440 px. Tanpa horizontal scroll 320–1440 px.
- Grid fluid via `clamp()`; breakpoint hanya saat layout berubah.
- Mobile nav: header sticky (plain bar, tanpa border/shadow) — wordmark kiri + tombol teks "Menu" kanan yang membuka panel push-down (bukan overlay) berisi 5 anchor + CTA WA. Toggle = elemen `<button>` (bukan div) → Enter/Space aktif otomatis, `aria-expanded` ikut berubah. Panel menutup saat anchor diklik / ESC. Alasan: hindari nav menutupi konten (taste layout law) dan menghindari JS berat.
- **Catatan loading foto hero:** aturan `loading` foto hero ditetapkan satu kali di §2.S1 (eager di semua viewport). §1.4 tidak menambah varian lain (tidak ada lazy di mobile) — ini satu-satunya sumber kebenaran untuk TC-05.
- Nav desktop inline aktif ≥1024 px; pada <1024 px hanya tombol toggle yang tampil. Alasan: target perangkat 360 px+ (PRD §7) + hierarki 1 aksi di layar pertama.
- `--header-h: 56px` (mobile) / `64px` (≥768 px). `scroll-margin-top: calc(var(--header-h) + 12px)` pada setiap section → 68–76 px, target scroll pas ke section tanpa tertutup header.

### 1.5 Motion & interaksi tokens

- `--dur-fast: 150ms`, `--dur-med: 250ms`, `--ease-out: cubic-bezier(0.2, 0.8, 0.2, 1)`.
- Hover: hanya warna (150 ms), tidak ada layout shift/transform. Focus: outline 2 px solid `--color-espresso`, offset 2 px.
- `scroll-behavior: smooth` pada `html`, dinonaktifkan di `prefers-reduced-motion: reduce`.
- **Dilarang (PRD §4):** parallax, video loop, carousel otomatis, efek 3D, gradient (taste house rule), glassmorphism, shadow pada elemen diam.

---

## 2. Layout & pemetaan section → US-ID

Urutan (7 section, 1 halaman): **S1 Hero → S2 Menu → S3 Tentang → S4 Galeri → S5 Lokasi & Jam → S6 Kontak → S7 Footer.** Setiap section = komponen dengan nama yang bisa dibangun langsung. Ground bergantian (cream / cream-deep / espresso) — section dibedakan oleh tone, bukan garis.

| Section | US-ID | id anchor | Ground | Komposisi | Komponen |
|---|---|---|---|---|---|
| S1 Hero | US-01 | `#beranda` | cream | Split 7/5: teks kiri (nama, positioning, 2 CTA) + foto hero kanan | `.hero`, `.hero__title`, `.hero__lead`, `.btn--primary`, `.btn--secondary`, `.hero__media` |
| S2 Menu & Harga | US-02 | `#menu` | cream | Group per kategori, kartu item 1 kolom → 2 kolom | `.menu`, `.menu__category`, `.menu-card`, `.menu-card__price` |
| S3 Tentang | US-03 | `#tentang` | cream-deep | Teks kiri (7 kolom) + 3 poin nilai (horizontal, tanpa kartu) | `.about`, `.about__story`, `.value-trio`, `.value-trio__item` |
| S4 Galeri | US-04 | `#galeri` | cream | Mosaic full-bleed: 1 foto besar + tile kecil, aspect 4:5 | `.gallery`, `.gallery__item` |
| S5 Lokasi & Jam | US-05 | `#lokasi` | cream-deep | Split: alamat + tabel jam (kiri) / placeholder peta (kanan) | `.location`, `.hours-table`, `.map-embed`, `.btn--map` |
| S6 Kontak & Aksi | US-06 | `#kontak` | espresso (inverted) | 3 tombol besar cream pada espresso | `.contact`, `.contact-action` |
| S7 Footer | US-07 | — | espresso (lanjut) | Nama full-width + badge Halal + tautan cepat + tahun | `.footer`, `.halal-badge`, `.footer__links` |

- Nav anchor (desktop & mobile, 5 link): `#menu`, `#tentang`, `#galeri`, `#lokasi`, `#kontak`. Semua `href="#id"` wajib resolve ke `<section id>` yang ada.
- Konten tidak dibungkus container terpusat (centered 1200 px): teks menempel ke margin kiri, gambar besar boleh full-bleed. Alasan: layout law §2 + TC-39.
- 1 `<h1>` saja di halaman (h1 = "Omah Keboen"); tiap section punya h2; kategori menu h3; sub-grup Main Course h4; poin nilai h3.

### S1 Hero (US-01) — komponen & kriteria
- `.hero`: min-height `100svh` desktop; di mobile min-height auto. **Kriteria terukur (TC-04):** pada 390×844, `bottom` dari CTA kedua ≤ **640 px**; pada 1440×900, `bottom` CTA kedua ≤ **900 px** — tanpa scroll, tanpa horizontal scroll. Foto hero di bawah CTA di mobile (boleh di bawah fold; posisi, bukan `loading`).
- H1 = "Omah Keboen" (display). Lead 1 kalimat positioning (≤2 baris): `--type-body`, `max-width: 40ch`, warna espresso-soft (10,2:1 di cream).
- **Proof bar social proof (D12, CONTENT_DATA §7.4):** satu baris di bawah lead, sebelum CTA — `<ul class="hero__proof">` berisi 3 chip: `Halal` (pill, fill caramel, teks espresso 5,6:1), `Buka 08.00–21.00 WIB`, `Rating 4,5 Google Maps` (dua terakhir `--type-small`, `--color-stone-deep`). **Tanpa CTA tambahan** (TC-02 tetap tepat 2 tombol) dan tanpa menduplikasi badge Halal footer (TC-31 tetap pill besar di footer). Alasan: konten verified D12 + CONTENT_DATA §7.4, kontras tetap terukur (5,6:1 / 5,0:1) — bukan pill ikon tanpa teks.
- 2 CTA berdampingan: **Hubungi WhatsApp** (primary) + **Lihat Menu** (secondary, `href="#menu"` persis). Tepat 2, tidak ada tombol lain di hero. Keduanya `aria-label` deskriptif.
- Foto hero: pakai aset asli `assets/img/ig/ig-07.jpg` (eksterior + papan nama; alternatif `ig-09.jpg`) di box **aspect 4:5**, `object-fit: cover; object-position: center 45%` — **bukan** 16:9 full-bleed (D14: tidak ada foto landscape; hero wajib split 7/5 teks kiri + foto kanan di semua viewport).
- **Loading foto hero = satu elemen `<img>`, `loading="eager"` + `fetchpriority="high"` + `width`/`height` eksplisit (512×640), di SEMUA viewport 320–1440 px.** Tidak ada varian lazy di mobile dan tidak ada `<picture>`/media-query swap. Alasan: hero = elemen LCP; lazy menunda decode dan menggeser LCP (TC-05/TC-47). Ini satu-satunya aturan loading untuk foto hero — §1.4 dan §4 merujuk ke sini, tidak menambah aturan lain.
- Alasan split 7/5 + teks kiri: hindari teks di atas foto (kontras tidak terukur) dan memberi ruang foto besar. Ideal klien mengirim 1 landscape ≥1600 px tanpa overlay (⚠️ menunggu, tidak memblokir Stage 1).

### S2 Menu & Harga (US-02)
- 4 kategori dengan heading level **h3** (TC-06): **Kopi**, **Non-Kopi**, **Kudapan / Cakeshop**, **Main Course**. Main Course punya 2 sub-grup: **Italian** & **Nusantara** (h4, bukan heading level baru).
- **Pemetaan data `docs/MENU.md` → 4 kategori (60 item unik):** Kopi ← Minuman Kopi (14); Non-Kopi ← Minuman Non Kopi (14); Main Course ← Makanan Utama (13) + Italian (Spaghetti Bolognese, Pizza) + Special Weekend (4 item, badge "Sabtu–Minggu"); Kudapan/Cakeshop ← Artisan Bakery + Pastry & Bakery + Camilan (dedup item ganda, §9 MENU.md). Alasan: struktur 4 kategori terkunci PRD US-02 / TC-06; MENU.md rincian lengkap dimuat seluruhnya, tanpa menambah kategori baru.
- Kartu `.menu-card` (tile cream-deep) dibungkus `<ul class="menu-list">` / `<li class="menu-card">`: nama item (Inter 600), harga pojok kanan-bawah `Rp20.000` (tabular-nums). Tidak ada foto di kartu (mengurangi aset & CLS).
- Kartu minuman dua harga memakai 2 nilai kecil berdampingan dengan label mini "Hangat" / "Dingin" (`--type-small`, stone-deep); item satu harga = satu nilai saja, jangan mengarang varian kedua (§9 MENU.md). Kedua nilai tetap sesuai format `Rp20.000`.
- Format harga persis `Rp20.000`: huruf `Rp` + angka tanpa spasi, titik ribuan. **Dilarang**: `Rp. 20.000`, `Rp 20.000`, `20rb`, `Rp20,000`.
- Harga `white-space: nowrap`; nama boleh wrap 2 baris; pada 320 px baris item + harga tidak boleh overlap/terpotong (TC-13).
- **Ejaan menu ikut dokumen asli klien** (MENU.md §2: "Red Valved", "Jus Banana Coffe") — daftar harga = data klien, bukan tampilan yang dikoreksi diam-diam (Gate 2, TC-07/TC-08 nama & harga final).
- **Pengecualian rentang (MENU.md §1):** "Filter V60" tampil `Rp25.000 – Rp35.000` (satu slot, en dash, tanpa kolom varian). Ini satu-satunya node harga non-single; QA perlu memperbarui regex TC-12 agar range ini valid (diencerkan di §8). "Kopi Susu Gula Aren" harga tampil di kolom Dingin saja, jangan di-copy ke kolom Hangat.
- **Kalimat rentang global "Rp20.000 – Rp75.000" TIDAK ditampilkan di halaman menu** (data tetap di `docs/CONTENT_DATA.md` §1). Alasan: TC-12 mensyaratkan 100% node harga match pola `Rp20.000`; kalimat rentang global jadi 1 node non-contoh. Gate 2 sudah punya harga per item, jadi rentang tidak perlu.
- **Stage 1 (Gate 1, sebelum harga terpasang — D13):** slot harga memakai em-dash `—` (tabular-nums, `--color-stone-deep`) + 1 baris `.menu__note`: "Harga final menyusul — tanya langsung lewat WhatsApp." Dilarang: angka harga karangan, rentang harga sebagai harga per item, atau "mulai dari RpX" per item (TC-10/TC-12).
- **Gate 2:** harga `—` diganti harga final MENU.md; blok `.menu__empty` dihapus. **State kosong (data belum siap):** 1 blok `.menu__empty` bertuliskan "Hubungi untuk menu harian" + CTA WA (US-02 fallback), hanya dirender bila data menu belum ada. Beri `data-placeholder="true"` + komentar `<!-- PLACEHOLDER: menu final dari klien -->`. 0 harga karangan di bawah label fallback (TC-11).

### S3 Tentang / Brand Story (US-03)
- 1 blok narasi (≤4 kalimat, `--type-body`, max 62 ch). Copy wajib memuat 3 konsep: **kopi** (biji kopi), **seduh** (teknik presisi), **ramah** (pelayanan) — label nilai tetap persis "Kualitas / Presisi / Ramah".
- 3 poin nilai **Kualitas / Presisi / Ramah** sebagai baris horizontal (tanpa kartu, tanpa ikon, tanpa angka 01/02/03) — masing-masing heading kecil (h3, Inter 600, ukuran `--type-body`) + 1 kalimat. Alasan: hindari "row of identical cards" (taste house rule) dan menjaga section ini berbeda dari S2.

### S4 Galeri (US-04)
- Grid mosaic: **1 kolom** (320–639) → 2 (640–1023) → 3 (1024–1279) → 4 (≥1280); 4–8 foto, aspect ratio 4:5 (portrait), `loading="lazy"`, width/height eksplisit, `alt` deskriptif (interior/suasana/barista/hidangan; ≥5 karakter, bukan "gambar"/"foto1"/nama file).
- **Sumber foto (D14/D15):** 10 file asli `assets/img/ig/ig-03.jpg` … `ig-12.jpg`, semuanya portrait 360–512×640 → tampil di slot 4:5 dengan `object-fit: cover` (potong, bukan distorsi). Prioritas tampil: `ig-07` (eksterior + papan), `ig-09` (kopi bokeh), `ig-03` (proses menguleni adonan), `ig-12` (bakwan udang) → `ig-04` (suasana), `ig-06` (jeruk), `ig-08` (kwetiau), `ig-10` (barista), `ig-11` (servis). `ig-05` (poster LOCATION + QR) **jangan** di-crop dan jangan dipakai sebagai tile — pakai di blok lokasi (S5) atau hero alternatif.
- Foto ber-overlay-teks IG akan menampilkan overlay-nya di web (R12): pilih yang overlay-nya paling sedikit, `alt` mendeskripsikan **isi** foto (bukan isi overlay), dan minta versi bersih ke klien (⚠️ menunggu).
- 1 foto besar (span 2 kolom) sebagai anchor; sisanya tile. Square corners.
- Tidak ada carousel otomatis; grid statis. Jarak antar item = 1 nilai `gap` yang sama untuk semua breakpoint.

### S5 Lokasi & Jam (US-05)
- Kiri: alamat lengkap (teks) + tabel `.hours-table` 7 baris (hari, jam) + tombol "Buka di Google Maps" (`.btn--map`).
- **Alamat dua baris (D12):** baris utama = alamat Google Maps "Kedungsari, Karang Dagaan, Kec. Megaluh, Kabupaten Jombang, Jawa Timur 61462"; baris sekunder (lebih kecil, `--color-stone-deep`) = "Dsn. Karangasem, Kec. Bandar Kedungmulyo". Dua-duanya benar, beda penamaan wilayah — jangan pilih salah satu, jangan tampilkan sebagai 2 blok alamat terpisah (TC-20: 1 blok alamat). Keduanya berada di 1 elemen `<address>` (satu blok, 2 baris) + 1 label nama "Omah Keboen" di atasnya, memuat "Jombang" (TC-20).
- **Jam buka (D12):** setiap hari Senin–Minggu 08.00–21.00 WIB. Tabel tetap 7 baris (satu per hari, nilai sama) — bukan 1 baris ringkas, supaya US-05 "jam buka per hari" terpenuhi dan TC-21 bisa diuji.
- Kanan: `.map-embed` = kotak placeholder (rasio 4:3) + tombol Maps di bawahnya. Peta ringan (US-05): `static map <img>` lokal **atau** `iframe` Google Maps — jika iframe: wajib `loading="lazy"`, width/height, `title="Peta lokasi Omah Keboen"`. 0 script pihak ketiga non-lazy di initial.
- **Link Maps (WAJIB `google.com/maps`, TC-23/TC-27):** `https://www.google.com/maps/search/?api=1&query=Kedungsari%2C%20Karang%20Dagaan%2C%20Kec.%20Megaluh%2C%20Kabupaten%20Jombang%2C%20Jawa%20Timur%2061462` (query = alamat persis yang tampil, agar konsisten dengan TC-20/TC-27). Short-link klien `https://maps.app.goo.gl/XCTT1TPcTkko9Pbi9` tetap tercatat di `docs/CONTENT_DATA.md`, **tidak** dipakai di `href` (shortlink tidak memuat `google.com/maps` → TC-23 gagal).
- Tabel semantik `<table>` dengan `<th scope="row">`, tabular-nums, baris "Tutup" ditandai teks (bukan warna saja). Format jam konsisten 7 baris: `HH.MM–HH.MM` (en dash), hari tutup teks "Tutup".

### S6 Kontak & Aksi (US-06)
- Field espresso (inverted): 3 tombol besar cream (`--color-cream` pada espresso, 14,5:1):
  1. **Hubungi WhatsApp** — `https://wa.me/6285236639216?text=Halo%20Omah%20Keboen%2C%20saya%20mau%20tanya%20menu%20dan%20reservasi.` (D7 + D12), ikon + label.
  2. **Instagram** — `https://instagram.com/omahkeboen.jbg` (D12; **tanpa** `www.` dan **tanpa** slash akhir — TC-26), ikon + label.
  3. **Buka di Google Maps** — link Maps yang sama dengan S5 (`https://www.google.com/maps/search/?api=1&query=…alamat…`, TC-27), ikon + label.
- Nomor WA ditampilkan sebagai `0852-3663-9216` (format lokal, enak dibaca), link tetap format internasional `6285236639216` (D7).
- Semua dengan ikon + label teks (US-06). Tombol sekunder = outline 2 px cream pada espresso.
- Nama kelas: `.contact-action--wa` (fill cream, teks espresso — CTA utama), `.contact-action--ig` (outline 2 px cream, teks cream), `.contact-action--maps` (outline 2 px cream, teks cream). Ketiganya ≥44 px tinggi, `display:inline-flex`, ikon 20 px + label teks.

### S7 Footer (US-07)
- Nama "Omah Keboen" besar (display, cream) sebagai penutup.
- Badge `.halal-badge`: pill, fill caramel, teks espresso (5,6:1), label "Halal" + ikon centang.
- Tautan cepat (anchor ke S1–S6) + alamat singkat + tahun: markup `<span id="year">2026</span>` (fallback statis) — JS `document.getElementById('year').textContent = new Date().getFullYear()` menimpanya dengan tahun berjalan. Alasan: TC-32 mengharuskan footer tetap terbaca tanpa JS, tapi tahun berjalan tetap berasal dari `Date` (0 tahun hardcoded sebagai satu-satunya sumber). Fallback diperbarui manual saat tahun berganti (dicatat di README, bukan di JS).
- Field espresso dilanjutkan dari S6 (satu field, tanpa garis pemisah).

---

## 3. Komponen kunci

### Tombol (`.btn`)
- Base: flat, square (radius 0), padding 12 px 20 px, min-height 44 px, Inter 600, `--type-small` → naik ke body untuk CTA hero.
- `.btn--primary`: bg espresso, teks cream. Hover bg espresso-hover (150 ms).
- `.btn--secondary`: bg transparan, border 2 px espresso, teks espresso. (CTA kedua di hero; boundary 14,5:1.)
- `.btn--accent`: bg caramel, teks espresso (5,6:1) — **hanya** di field espresso/footer (badge, CTA di S6 boleh caramel).
- `.btn--map`: bg transparan, teks espresso, underline on hover.
- Focus: outline 2 px espresso, offset 2 px, tidak dihapus.
- Alasan 2 varian fill (espresso/caramel) + outline: cukup untuk hierarki, tidak menambah warna baru.

### Kartu menu (`.menu-card`)
- Tile cream-deep, padding 20 px, square corners.
- Layout: nama (Inter 600, body) + deskripsi (Inter 400, small, max 2 baris, clamp) + baris harga (tabular-nums, body, espresso).
- Harga rata kanan; nama rata kiri; `display: flex; justify-content: space-between; align-items: baseline`.
- Hover: bg cream (tone step), 150 ms. Tidak ada shadow/border.

### Kartu galeri (`.gallery__item`)
- `aspect-ratio: 4/5`, `object-fit: cover`, square corners.
- `loading="lazy"`, `decoding="async"`, width/height eksplisit.
- Alt text deskriptif (bukan "image1"). Foto dekoratif (jika ada) `alt=""`.

### Tabel jam (`.hours-table`)
- `<table>` semantik, 2 kolom: hari (th scope row) + jam (td, tabular-nums).
- Baris hari ini: bg cream-deep + teks espresso (bukan warna saja; ditambah label "Hari ini").
- State "Tutup": teks "Tutup" (bukan hanya warna).

### Badge Halal (`.halal-badge`)
- Pill (border-radius 999 px), padding 6 px 12 px, bg caramel, teks espresso, Inter 600, small.
- Ikon centang + teks "Halal". Kontras 5,6:1 di footer espresso.

### Placeholder SVG (D5)
- Lokasi: `assets/img/placeholder-*.svg`, lokal, tanpa request luar.
- Style netral: latar bone/cream-soft, motif garis sederhana warna stone (opacity 0,35), **tanpa** gradient/filter/dekorasi. Label kecil "Foto menyusul" (stone-deep) agar terasa disengaja, bukan rusak. Alt teks tetap deskriptif asli (bukan kata "placeholder").
- Dimensi minimum: hero ideal 1600×900 (16:9) landscape tanpa overlay; kalau belum ada pakai portrait 360–512×640 dengan `object-fit: cover` di box 4:5; galeri 1000×1250 (4:5) atau portrait 360–512×640 (CLS aman karena width/height eksplisit); lainnya sesuai slot.

---

## 4. State & interaksi

| State | Perilaku |
|---|---|
| Hover tombol | bg espresso→espresso-hover, 150 ms ease-out; link underline offset 0,18 em |
| Hover kartu menu | bg cream-deep→cream, 150 ms |
| Focus keyboard | outline 2 px espresso, offset 2 px, selalu terlihat (`:focus-visible`) |
| Smooth scroll | `scroll-behavior: smooth`; dinonaktifkan di `prefers-reduced-motion` |
| Mobile nav | disclosure push-down (lihat §1.4) |
| Loading gambar | Foto hero: `loading="eager"` + `fetchpriority="high"` di semua viewport (§2.S1). Foto galeri/peta: `loading="lazy"` + `decoding="async"`. Placeholder SVG menampilkan rasio slot final |
| Error gambar | `alt` tampil; tidak ada ikon rusak (SVG lokal tidak rusak) |
| Empty menu | blok "Hubungi untuk menu harian" + CTA WA |
| Reduced motion | semua transisi ≤0 ms, smooth scroll off |

Tidak ada parallax, video loop, carousel otomatis, efek 3D, gradient, glass, shadow pada elemen diam (PRD §4 + taste house rule).

---

## 5. Aksesibilitas (target Lighthouse ≥95)

**Rasio kontras (dihitung, WCAG 2.1 relative luminance):**

| Teks / Latar | Rasio | Status |
|---|---|---|
| espresso / cream | 14,5:1 | AA ✓ (body & display) |
| cream / espresso | 14,5:1 | AA ✓ (CTA primary, S6/S7) |
| espresso / cream-deep | 12,9:1 | AA ✓ |
| espresso / caramel | 5,6:1 | AA ✓ (badge Halal di footer) |
| stone-deep / cream | 5,0:1 | AA ✓ (teks sekunder kecil) |
| espresso-soft / cream-deep | 9,1:1 | AA ✓ (teks sekunder di S3/S5) |
| `--color-caramel-text` / cream | 4,9:1 | AA ✓ (teks aksen) |
| `--color-caramel-text` / putih | 5,5:1 | AA ✓ |
| stone-deep / cream-deep | 4,47:1 | **GAGAL** body (batas 4,5) — ganti espresso-soft |
| `--color-caramel-text` / cream-deep | 4,35:1 | **GAGAL** body — teks aksen hanya di cream/putih |
| stone / cream | 3,4:1 | **Hanya** teks besar (≥24 px regular / ≥18,7 px bold) |
| stone / putih | 3,9:1 | **Hanya** teks besar |
| caramel / cream | 2,6:1 | **GAGAL** — jangan jadi teks; fill di footer |
| caramel-deep / cream | 3,7:1 | Grafis ≥3:1 ✓, teks body ✗ |
| caramel-deep / putih | 4,2:1 | teks body ✗ (pakai `--color-caramel-text`) |
| caramel / putih | 2,9:1 | **GAGAL** |
| CTA espresso (fill) / ground cream | 14,5:1 | Boundary UI ≥3:1 ✓ |
| CTA caramel (fill) / ground cream | 2,6:1 | Boundary **GAGAL** — CTA caramel hanya di field espresso |

Aturan praktis:
- Teks body di cream = espresso (atau stone-deep untuk sekunder). Caramel **tidak** dipakai sebagai warna teks di cream.
- Teks di atas caramel = **espresso** (5,6:1). Cream di atas caramel = 2,6:1 → **GAGAL**, jangan dipakai.
- Teks di atas espresso = cream (14,5:1) atau cream-deep (12,9:1).
- Teks sekunder kecil di cream = stone-deep, bukan stone. Di cream-deep (S3/S5) gunakan espresso-soft (9,1:1), bukan stone-deep (4,47:1).

**Touch target:** semua kontrol interaktif ≥44×44 px CSS (WCAG 2.5.5/2.5.8). Tautan teks dalam paragraf min padding 8 px vertikal.

**Label & semantik:**
- `<html lang="id">`, meta viewport `width=device-width, initial-scale=1` (tanpa `maximum-scale`).
- `<title>` ≤60 karakter, Bahasa Indonesia: "Omah Keboen — Kafe & Restaurant di Jombang". Meta description 1 kalimat Bahasa Indonesia (bukan boilerplate English). `theme-color` = `--color-cream`.
- Landmark: `header`, `nav`, `main`, `section` (aria-labelledby), `footer`.
- Heading berurutan H1 (hero) → H2 (per section) → H3 (kategori menu, poin nilai) → H4 (sub-grup Main Course), tanpa loncat. Tepat 1 `<h1>`.
- Setiap ikon tombol punya label teks (US-06: "ikon + label teks"). Ikon dekoratif `aria-hidden="true"`.
- Semua gambar punya `alt` deskriptif; dekoratif `alt=""`. Alt minimal 5 karakter, **tidak** berisi kata "placeholder", "gambar", "foto1", atau nama file — penanda placeholder memakai atribut D4, bukan alt.
- Tabel jam semantik dengan `scope`.
- Link eksternal: `target="_blank" rel="noopener noreferrer"`.
- Tanpa analytics/tracking script; satu-satunya request pihak ketiga = Google Fonts (D6). Kontras, alt, dan label diverifikasi Rimuru (TC dari TEST_PLAN).

---

## 6. Skema placeholder (D4) + guidance gambar (D5)

**Penanda (seragam, D4):**
- Atribut `data-placeholder="true"` pada elemen placeholder + komentar HTML `<!-- PLACEHOLDER: <deskripsi> -->` sebelum elemen.
- **Token aktif Stage 1 (sudah final = tanpa token):** WA `6285236639216`, IG `omahkeboen.jbg`, jam buka, alamat, dan link Maps sudah final (D12) → **tanpa** `PLACEHOLDER_WA_NUMBER` / `PLACEHOLDER_IG_USER` / `PLACEHOLDER_HOURS`. Yang tersisa hanya 4 token:

| Token | Lokasi | Status |
|---|---|---|
| `PLACEHOLDER_HERO_IMAGE` | Caption + komentar di bawah slot foto hero (`data-placeholder="true"`) | Foto portrait IG terpasang sementara (ig-07); menunggu landscape final klien (⚠️ D14) |
| `PLACEHOLDER_ITEM_NAME` | Nama item pada kartu menu yang belum punya data final | Menunggu konfirmasi klien untuk 2 item konflik MENU.md |
| `PLACEHOLDER_MENU_ITEMS` | Caption blok `.menu__empty` | Menunggu harga final terpasang |
| `PLACEHOLDER_GALLERY` | Komentar di atas grid galeri | Foto IG terpasang sebagai placeholder berlabel; menunggu izin klien (R9) |

- Bentuk di Stage 1: 1 baris caption kecil di bawah slot placeholder (mis. `PLACEHOLDER_MENU — Hubungi untuk menu harian`), diberi `data-placeholder="true"` + komentar; token hilang total di Gate 2 (TC-51: jumlah `PLACEHOLDER_` = 0).
- Gambar: SVG lokal di `assets/img/` (D5), bukan hotlink. Semua path relatif tanpa leading `/` (D2).

**Dimensi minimum, rasio & budget:**
**Hero:** ideal landscape ≥1600×900 (16:9) tanpa overlay teks (⚠️ menunggu klien). Sementara: portrait 360–512×640 di box 4:5 dengan `object-fit: cover; object-position: center 45%`, format WebP/AVIF/JPEG, ≤300 KB, `loading="eager"` + `fetchpriority="high"` (LCP element). Jangan full-bleed 16:9 dengan foto portrait.
- Galeri: portrait 4:5, ≥1000 px lebar (1000×1250), ≤150 KB/foto, `loading="lazy"`.
- Kartu menu: tanpa gambar (MVP).

**Gaya netral (agar placeholder tetap rapi):**
- Latar bone/cream-soft, motif garis sederhana warna stone (opacity 0,35), **tanpa** gradient/filter/dekorasi.
- Label kecil "Foto menyusul" (stone-deep) agar terasa disengaja, bukan rusak.
- Aspect ratio placeholder = slot final (mencegah CLS saat swap aset nyata).

**Stage 1 vs Stage 2:** Stage 1 render semua section dengan placeholder SVG + token PLACEHOLDER_*. Stage 2 (Okta) swap aset nyata dari klien; **token, tipografi, layout tidak berubah**.

---

## 7. Asumsi & pertanyaan terbuka

Asumsi (dapat diveto PM/klien, rujuk US-ID):
1. Menu disajikan sebagai kartu per item dalam grup kategori, tanpa foto (US-02). Bila klien ingin foto hidangan, tambah slot gambar 1:1 di kartu — perlu US-ID baru dari Kevin. Foto menu `assets/img/menu-cetak-*.jpg` dipakai sebagai bahan verifikasi, bukan aset web.
2. Nav mobile = disclosure push-down, bukan overlay (§1.4). Bila Okta lebih suka hamburger overlay, kontrak touch-target & `scroll-margin-top` tetap berlaku.
3. Tidak ada foto di kartu menu (MVP). Galeri menampung semua foto (US-04).
4. Peta = placeholder box + CTA "Buka di Google Maps"; embed iframe ringan = keputusan teknis Okta (US-05).
5. Kategori menu final = Kopi / Non-Kopi / Kudapan/Cakeshop / Main Course (Italian & Nusantara) per PRD US-02, isi 60 item dari `docs/MENU.md` (§2.S2). Bila klien ubah, update isi kategori tanpa ubah token. 2 item konflik MENU.md (Filter V60, Kopi Susu Gula Aren) menunggu konfirmasi Rio — harga karangan dilarang.
6. Hero memakai foto portrait 4:5 (D14) sampai klien mengirim landscape ≥1600 px. Keputusan ini berbeda dari ekspektasi rasio 16:9 pada TC-05 versi lama — QA diminta memperbarui TC-05 (§8).

**Pertanyaan untuk Sania (bila ada):** tidak ada yang memblokir penulisan spec ini — semua keputusan desain di atas berada dalam remit anton-uiux (design owner, shared-rules §6). Jika PM/klien ingin mengubah salah satu asumsi di atas, catat di thread kartu ini (US-ID terdampak + alasan) sebelum Okta implementasi.

---

## 8. Rekonsiliasi dengan TEST_PLAN (delta untuk QA)

Spec ini sumber kebenaran tunggal. TEST_PLAN (59 TC) disusun sebelum `docs/CONTENT_DATA.md`, `docs/MENU.md`, dan keputusan hero D14 ada. Delta berikut wajib QA terapkan agar tiap TC punya **expected result tunggal**:

| TC | Expected lama | Expected baru (authoritative) | Alasan |
|---|---|---|---|
| TC-04 | "foto boleh di bawah fold (**lazy**) di mobile" | Foto hero: 1 elemen `<img>`, `loading="eager"` + `fetchpriority="high"` + `width`/`height` eksplisit di **semua** viewport 320–1440 px. Di mobile fotonya boleh di bawah CTA — itu **posisi/layout**, bukan `loading` | Kontradiksi §1.4 vs §2.S1 (catatan QA 2026-10-20). Lazy di mobile menunda decode pada elemen LCP |
| TC-05 | rasio **16:9**, ≥1600 px lebar, "mobile lazy diizinkan" | Box foto **4:5** (portrait), `width`/`height` = dimensi file asli (512×640), `loading="eager"` + `fetchpriority="high"` semua viewport, `src` relatif, ≤300 KB | D14 (tidak ada foto landscape) + §2.S1. Rasio 16:9 mustahil sampai klien kirim landscape |
| TC-12 | 100% harga match `^Rp\d{1,3}(\.\d{3})*$` | Regex tetap + **1 pengecualian sah**: node range `Rp25.000 – Rp35.000` (Filter V60, MENU.md §1). Semua node lain WAJIB single value | MENU.md menetapkan range itu; tidak muat ke pola single |
| TC-32 | "0 tahun hardcoded sebagai satu-satunya sumber" | Markup: fallback statis `2026`; JS `textContent = new Date().getFullYear()` menimpanya. Tahun berjalan tetap dari `Date` | Footer tidak boleh kosong tanpa JS (catatan Okta, TECH_SPEC §9) |
| TC-50 | token `PLACEHOLDER_WA_NUMBER`, `PLACEHOLDER_IG_USER`, `PLACEHOLDER_HOURS` | Token yang boleh ada di Stage 1 hanya 4: `PLACEHOLDER_HERO_IMAGE`, `PLACEHOLDER_ITEM_NAME`, `PLACEHOLDER_MENU_ITEMS`, `PLACEHOLDER_GALLERY` (WA/IG/jam/alamat sudah final, D12) | §6 |
| TC-07…TC-10 | "nama & harga final dari CLIENT_INPUT" | Sumber = `docs/MENU.md` (60 item, dipetakan ke 4 kategori, §2.S2): 1 harga = 1 nilai; 2 harga = 2 nilai berlabel "Hangat"/"Dingin" | MENU.md landing 2026-10-20 |
| TC-58 | token hex, urutan 7 section S1–S7, radius 0 + badge Halal pill, 6 breakpoint | Tidak berubah — tetap valid | — |

Catatan: tabel di atas adalah **usulan spec**; versi final TEST_PLAN tetap milik QA. Tidak ada expected result ganda yang dibiarkan menggantung.

---

## Handoff (di thread kartu)

Handoff: anton-uiux → okta-softwaredeveloper  
Done: `docs/DESIGN_SPEC.md` v1.2 (token warna/tipografi/spacing, layout 7 section US-01..US-07, komponen, state, a11y, placeholder, rekonsiliasi TC).  
Output: `docs/DESIGN_SPEC.md` + rasio kontras terhitung (§5).  
Next: Okta implementasi Stage 1 dengan placeholder SVG; Rimuru QA pakai TEST_PLAN + delta §8.  
Blockers: 2 item konflik harga MENU.md (Filter V60, Kopi Susu Gula Aren) menunggu Rio; foto landscape hero & izin klien untuk foto IG masih ⚠️.
