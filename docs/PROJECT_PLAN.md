# PROJECT PLAN — Website Single-Page "Omah Keboen" (Plan v1.0)

Owner: sania-projectmanager | Sumber: docs/PRD.md v1.0.0 | Workspace: /home/rioovs/project/omah-keboen-web
Dokumen ini hanya berisi urutan, dependensi, risiko, dan aturan scope-change. Kebutuhan produk tetap di PRD; spec tiap kartu ada di kartu Kanban-nya.

## 1. Keputusan PM (binding — semua kartu ikut, jangan diputuskan ulang)

| # | Keputusan | Alasan |
|---|---|---|
| D1 | 1 halaman statis: `index.html` + `assets/css/`, `assets/js/`, `assets/img/` di root repo. Tanpa framework, tanpa build step. Tidak ada folder `public/` — semua gambar (placeholder + asli) di `assets/img/` | PRD §7 asumsi teknis; MVP tanpa backend; satu path aset = tanpa path rusak |
| D2 | Semua path aset relatif (tanpa leading `/`) | situs terbit di subpath `https://rioovs.github.io/omah-keboen/` |
| D3 | Semua konten yang bisa diedit Rio ada di `index.html` (tanpa file konten terpisah) | Rio non-teknis; README jadi satu-satunya panduan edit |
| D4 | Penanda placeholder seragam: token `PLACEHOLDER_*` di teks + atribut `data-placeholder="true"` + komentar `<!-- PLACEHOLDER: ... -->` | QA deteksi deterministik; Gate 2 wajib nol |
| D5 | Placeholder gambar = SVG lokal di `assets/img/`, bukan hotlink | tanpa request luar, tanpa gambar rusak |
| D6 | Font: Fraunces (judul) + Inter (teks) via Google Fonts, `display=swap`, plus fallback stack | PRD §4 batas 2 family; jaga LCP |
| D7 | Format CTA final: `https://wa.me/<no>?text=<pesan>`, `https://instagram.com/<user>`, link Google Maps place | US-06 |
| D8 | Repo GitHub `rioovs/omah-keboen` (public). `git init` + push pertama = tugas Benimaru saja | 1 penulis repo, hindari history bentrok |
| D9 | Output docs: `DESIGN_SPEC.md`, `TECH_SPEC.md`, `TEST_PLAN.md`, `QA_REPORT_STAGE1.md`, `QA_REPORT.md`, `DEPLOY_RUNBOOK.md`, `CLIENT_INPUT.md`, `DELIVERY_REPORT.md` | shared-rules + pemisahan gate |
| D10 | `openapi.yaml` tidak berlaku — tanpa API/backend | PRD §5 out of scope |
| D11 | Build frontend = `okta-softwaredeveloper` (bukan `rio-softwaredevloper`) | mengikuti rencana eksplisit di kartu tugas Kevin; `rio-softwaredevloper` ada di disk tapi tidak terdaftar sebagai profil aktif (`hermes profile list`), sehingga dispatcher akan drop kartu yang di-assign ke sana |
| D12 | Sumber data konten final = `docs/CONTENT_DATA.md` (verifikasi IG @omahkeboen.jbg 2026-10-20): WA `6285236639216`, IG `@omahkeboen.jbg`, jam 08.00–21.00 WIB setiap hari, alamat Google Maps + Dsn. Karangasem, koordinat `-7.5290625, 112.1723125`, rentang harga Rp20.000–Rp75.000. Rating 4,5, halal ya, 934 followers. | Satu-satunya sumber data verified; PRD §9 item yang sudah resolved tidak lagi blocker Gate 1 |
| D13 | Menu + harga belum final (ada di IG Highlight "Menoe", butuh login). Struktur kategori wajib ada (Kopi, Non-Kopi, Kudapan/Cakeshop, Main Course Italian & Nusantara) dengan harga `—` atau `Tanya via WhatsApp`. **Jangan mengarang harga.** | PRD US-02; CONTENT_DATA §5; PRD §6 (CTA berfungsi dengan tautan final) |
| D14 | Foto asli = 10 file portrait 360–512×640 di `public/img/ig/` (ig-03..ig-12), sebagian overlay teks IG. Hero **wajib pola split** (teks kiri, foto portrait kanan, `object-position: center 45%`), bukan full-bleed. Idealnya klien kirim 1 landscape ≥1600 px tanpa overlay (⚠️ menunggu). | CONTENT_DATA §6; PRD US-01 (hero terlihat dalam 100vh) |
| D15 | Foto disimpan final di `assets/img/ig/` (dipindah dari `public/img/ig/`); `public/` bukan bagian struktur situs (D1). Sumber tiap foto + konfirmasi Rio dicatat di `docs/CLIENT_INPUT.md` (R9). | D1 + R9 |
| D16 | Nama repo deploy default `omah-keboen` (owner `rioovs`), target GitHub Pages via GitHub Actions (D8). | CONTENT_DATA §2 + PRD §7 |

## 2. Urutan Tugas & Dependensi

| # | Kartu | Owner | US-ID | Parent | Output |
|---|---|---|---|---|---|
| 1 | Design Spec | anton-uiux | US-01…US-07 | — | docs/DESIGN_SPEC.md |
| 2 | Test Plan | rimuru-qa | US-01…US-07 | — | docs/TEST_PLAN.md |
| 3 | Klien: content & konfirmasi | kevin-ceo | US-02, US-05, US-06, US-07 | — | docs/CLIENT_INPUT.md |
| 4 | Stage 1 prototype | okta-softwaredeveloper | US-01…US-07 | 1 | index.html + assets/ + docs/TECH_SPEC.md + screenshot |
| 5 | QA Stage 1 | rimuru-qa | US-01…US-07 | 4, 2 | docs/QA_REPORT_STAGE1.md |
| 6 | Gate 1 — presentasi ke Rio | kevin-ceo | US-01…US-07 | 5 | keputusan di thread kartu |
| 7 | Stage 2 final UI + README | okta-softwaredeveloper | US-01…US-07 | 6, 3 | index.html final, README.md |
| 8 | QA Gate 2 | rimuru-qa | US-01…US-07 | 7 | docs/QA_REPORT.md (STATUS) |
| 9 | Gate 2 — presentasi ke Rio | kevin-ceo | US-01…US-07 | 8 | keputusan di thread kartu |
| 10 | Deploy GitHub Pages | benimaru-devops | — (infra) | 9 | docs/DEPLOY_RUNBOOK.md + .github/workflows/deploy.yml |
| 11 | Gate 3 — UAT di Pages | kevin-ceo | US-01…US-07 | 10 | keputusan di thread kartu |
| 12 | Delivery Report | kevin-ceo | US-01…US-07 | 11 | docs/DELIVERY_REPORT.md |

ID kartu di board `omah-keboen-web`: 1=`t_48b6f580` · 2=`t_ab494afb` · 3=`t_ba09b646` · 4=`t_59f7d1ed` · 5=`t_c8950ccd` · 6=`t_6e6630d2` · 7=`t_bdb18816` · 8=`t_ad3e1a7a` · 9=`t_5640db3d` · 10=`t_8685a4e5` · 11=`t_9b72e04c` · 12=`t_4919a64e`.

Dependency graph: `1 → 4 → 5 → 6 → 7 → 8 → 9 → 10 → 11 → 12`; `2` dan `3` paralel dari awal.
Paralel awal (setelah plan ini): Anton (1) ‖ Rimuru (2) ‖ Kevin (3). Stage 1 (4) mulai hanya setelah DESIGN_SPEC (1) ada — di-board edge parent `1 → 4` belum terpasang karena kartu 4 sempat ter-dispatch sebelum parent dibuat; gating ditegakkan lewat komentar gating di kartu `t_59f7d1ed` (tunggu `docs/DESIGN_SPEC.md`, jika timeout → `kanban_block` dependency).

## 3. Risiko Utama & Mitigasi

| # | Risiko | Dampak | Mitigasi (pemilik) |
|---|---|---|---|
| R1 | Data klien (WA, IG, foto, menu+harga, jam buka) belum ada | Gate 1/2 tidak bisa PASS | Kartu 3 Kevin mulai hari pertama; fallback eksplisit per PRD US-02; belum ada = hard blocker, eskalasi ke Sania |
| R2 | Deadline 5 hari kerja (PRD §7) | Pipeline panjang 12 kartu | Jalur kritis terpendek; kartu 2/3 paralel; tidak menambah kartu di luar daftar ini tanpa Kevin |
| R3 | Foto asli besar (hero ≥1600px) merusak LCP <2,5s dan Lighthouse ≥90 | QA FAIL di Gate 2 | Lazy-load + WebP/AVIF + dimensi eksplisit; QA ukur di kartu 5 dan 8 |
| R4 | `gh` auth / pembuatan repo `rioovs/omah-keboen` gagal | Deploy terblokir | Benimaru cek auth di awal; kalau gagal → `kanban_block` capability, eskalasi Sania |
| R5 | Scope creep ke framework/backend (PRD §5 out of scope) | Bundle naik, deadline jebol | D1 + D10 mengikat; Okta wajib catat penyimpangan di kartu, bukan diam-diam pakai |
| R6 | Placeholder tersisa bocor ke produksi | Gate 2 FAIL | D4 + inventory placeholder di QA Stage 1 (kartu 5) → Kevin dikejar (kartu 6) |
| R7 | Perubahan scope setelah PRD sign-off | Requirement liar | Aturan §4 di bawah |
| R8 | Reject QA berulang (>2 siklus) | Proyek macet | shared-rules #6: maks 2 rework, lalu Sania memutuskan |
| R9 | Asal/izin foto tidak jelas (foto diambil dari Instagram, belum dikonfirmasi Rio) | Risiko hak cipta + Gate 2/3 FAIL | Kevin catat sumber (akun + URL post) + konfirmasi Rio di `docs/CLIENT_INPUT.md`; tanpa konfirmasi → foto dipakai sebagai placeholder berlabel, bukan aset final |
| R10 | Semua foto portrait kecil (360–512×640) + overlay teks IG | Hero full-bleed mustahil (D14); LCP & kualitas visual turun | Hero split 7/5 (D14); foto tanpa overlay diprioritaskan (ig-03/07/09/12); minta klien 1 landscape ≥1600 px bersih (⚠️ menunggu) |
| R11 | Harga menu belum ada (highlight IG butuh login) | Pengunjung tidak bisa lihat estimasi biaya | D13: harga `—` / `Tanya via WhatsApp` + rentang Rp20.000–Rp75.000 (D12); jangan mengarang harga; Kevin kejar daftar final |
| R12 | Overlay teks IG terbaca di web | Tampilan tidak bersih / teks tabrakan | Pilih foto overlay paling sedikit; `alt` mendeskripsikan isi, bukan isi overlay; minta versi bersih ke klien |

## 4. Aturan Scope-Change

1. Hanya Kevin bicara ke klien (shared-rules #7). Permintaan perubahan masuk lewat Kevin.
2. Setelah PRD sign-off: Kevin nilai dampak, revisi PRD (bump versi, mis. 1.0.0 → 1.1.0). Sania lalu update **hanya** kartu terdampak (isi acceptance criteria + parent bila berubah).
3. Tidak ada perubahan senyap. Perubahan isi kartu selalu dicatat: US-ID yang kena, alasan, kartu mana yang di-update.
4. Permintaan fitur baru di luar PRD §5 = US-ID baru di PRD oleh Kevin, lalu kartu baru dibuat oleh Sania (bukan ditumpuki ke kartu lama).
5. Perubahan yang menyentuh D1–D11 wajib Sania replikasi ke semua kartu terdampak di batch yang sama.
6. Maks 2 siklus rework per kartu. Setelah 2× REJECT dari rimuru-qa, Sania memutuskan salah satu — revisi spec, ubah scope, atau reassign ke profil lain — lalu menulis keputusannya di thread kartu terkait.
7. Gate 1 dan Gate 2 hanya Rio yang memutuskan, lewat Kevin. QA hanya memberi status APPROVED/REJECTED atas bukti.

## 5. Definition of Done (seragam semua kartu)

- [ ] Acceptance criteria di kartu terpenuhi semua, dan buktinya (path file / screenshot / angka) ada di thread kartu.
- [ ] Test/self-check milik kartu lulus (unit test untuk kode; TC-* dieksekusi untuk QA; walkthrough checklist untuk dokumen).
- [ ] US-ID relevan dikutip di output (US-01…US-07; TC-* untuk QA; BUG-* untuk defect).
- [ ] Output sesuai D9, tanpa menyalin teks PRD (rujuk US-ID).
- [ ] Handoff block (≤6 baris) ditulis di akhir thread: Handoff / Done / Output / Next / Blockers.
- [ ] Laporan proaktif dikirim: `/home/rioovs/.hermes/scripts/agency-report.sh --project-dir /home/rioovs/project/omah-keboen-web --profile <profil> --status <status> --message <isi>`.

## 6. Escalation & Ownership Dokumen

- PRD → kevin-ceo. DESIGN_SPEC → anton-uiux. TECH_SPEC → okta-softwaredeveloper. TEST_PLAN / QA_REPORT → rimuru-qa. DEPLOY_RUNBOOK → benimaru-devops. PLAN + kartu → sania-projectmanager.
- Ambiguitas: tulis di thread kartu sebagai pertanyaan ke owner dokumen tersebut. Jangan menebak, jangan blocker kecuali benar-benar butuh keputusan manusia.
- Kontrak teknis lintas-kartu (D1–D10) hanya diubah lewat Sania, lalu disalin ke tiap kartu terdampak.
