# CLIENT INPUT — Omah Keboen (Status Data Klien per Gate 1)

Owner: kevin-ceo | Sumber: Instagram @omahkeboen.jbg + Google Maps + 4 Foto Menu Asli
Tanggal verifikasi: 2026-10-20

Dokumen ini merangkum status final data klien untuk rujukan implementasi Stage 2 (okta-softwaredeveloper) dan QA Gate 2 (rimuru-qa).

---

## 1. Status Data per US-ID

| Item Data | US-ID | Status | Sumber / Nilai Final | Catatan & Placeholder |
|---|---|---|---|---|
| **WhatsApp** | US-06 | **FINAL** | `6285236639216` (`https://wa.me/6285236639216?text=Halo%20Omah%20Keboen%2C%20saya%20mau%20tanya%20menu%20dan%20reservasi.`) | Nomor tampil `0852-3663-9216`. Format D7. |
| **Instagram** | US-06 | **FINAL** | `@omahkeboen.jbg` (`https://instagram.com/omahkeboen.jbg`) | Tanpa `@`, tanpa `www.`, tanpa trailing slash. |
| **Alamat & Google Maps** | US-05, US-06 | **FINAL** | Alamat utama: Kedungsari, Karang Dagaan, Kec. Megaluh, Kabupaten Jombang 61462.<br>Alamat sekunder: Dsn. Karangasem, Kec. Bandar Kedungmulyo.<br>Plus Code: `F5CC+9W`. Koordinat: `-7.5290625, 112.1723125`.<br>Maps URL: `https://www.google.com/maps/search/?api=1&query=Kedungsari%2C%20Karang%20Dagaan%2C%20Kec.%20Megaluh%2C%20Kabupaten%20Jombang%2C%20Jawa%20Timur%2061462` | Tombol CTA peta statis SVG + link pencarian Google Maps. |
| **Jam Operasional** | US-05 | **FINAL** | Senin – Minggu: `08.00 – 21.00 WIB` (Buka Setiap Hari). | 7 hari dalam tabel semantik. |
| **Menu & Harga** | US-02 | **FINAL** | 60 item di `docs/MENU.md`.<br>2 item konflik diputuskan Rio: Tongkol Sambal Kecombrang = `Rp17.000`, Choco Cheese Sourdough = `Rp22.000`. | Format `Rp20.000`. V60 rentang `Rp25.000 – Rp35.000`. Siap diisi penuh di Stage 2. |
| **Badge Halal & Rating** | US-07, US-01 | **FINAL** | Badge "Halal" di hero & footer.<br>Social proof rating Google Maps "4,5". | Telah disetujui Rio sebagai klaim valid. |
| **Foto Galeri** | US-04 | **FINAL** | 10 foto IG resmi di `assets/img/ig/ig-03.jpg` … `ig-12.jpg`. | Rasio portrait 4:5, `loading="lazy"`, `alt` deskriptif. Hak cipta & izin pemakaian akun resmi disetujui Rio. |
| **Foto Hero** | US-01 | **FINAL (Split)** | Menggunakan `assets/img/ig/ig-07.jpg` dengan pola split (teks kiri, foto portrait kanan). | Non-blocking. Jika klien menyediakan foto landscape clean ≥1600 px di masa depan, dapat diperbarui. |
| **Nama Repository** | D8, D16 | **FINAL** | `rioovs/omah-keboen` | Target GitHub Pages. |

---

## 2. Status Kelayakan Gate 1

Seluruh data inti klien (WA, IG, jam buka, alamat/Maps, 60 menu dan harga, lisensi foto IG, klaim halal/rating) telah **LENGKAP DAN TERVERIFIKASI**.
Tidak ada data klien yang memblokir kelulusan Gate 1 maupun pengerjaan Stage 2.
