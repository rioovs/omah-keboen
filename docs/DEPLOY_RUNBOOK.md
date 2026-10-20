# DEPLOY RUNBOOK — Website Omah Keboen (GitHub Pages)

Owner: **benimaru-devops** · Kartus: `t_8685a4e5` (Deploy) → `t_9b72e04c` (Gate 3 UAT)

Dokumen ini prosedur operasional deploy, publish ulang, rollback, backup, secrets, monitoring, dan smoke test.
Referensi kontrak: **PRD §7** (batasan & asumsi teknis), **PRD §8** (gate & alur persetujuan), **PROJECT_PLAN D1/D2/D8/D16**.
Isi dokumen = prosedur milik DevOps. Teks PRD tidak disalin (D9).

---

## 1. Target & Kontrak Publish

| Item | Nilai |
|---|---|
| Repo | `rioovs/omah-keboen` (public, branch `main`) |
| Source of truth | repo GitHub + mirror lokal `/home/rioovs/project/omah-keboen-web` |
| Metode publish | GitHub Actions → GitHub Pages (`build_type=workflow`) |
| Build step | **tidak ada** (HTML/CSS/JS statis, path aset relatif — D1 + D2) |
| URL live (canonical) | `https://rivos.is-a.dev/omah-keboen/` |
| URL live (alias github.io) | `https://rioovs.github.io/omah-keboen/` (redirect ke canonical) |
| Artefak Pages | `index.html`, `assets/`, `README.md`, `docs/` (**tanpa** `docs/preview/`, **tanpa** `scripts/`, **tanpa** `public/`) |
| CI | `.github/workflows/deploy.yml` |

Konten artifact dikunci di `_site/` saat workflow berjalan (langkah "Assemble artifact"), sehingga folder internal repo
seperti `docs/preview/` (screenshot QA) tidak ikut tayang ke publik.

---

## 2. Environment: Staging vs Produksi

| Environment | Definisi | Pemicu | Verifikasi |
|---|---|---|---|
| **Staging (pra-publish)** | Commit di repo yang sudah QA-approved tapi belum dipush ke `main`; preview lokal via `python3 -m http.server 8000` | manual, oleh dev/QA | localhost + checklist §6 |
| **Produksi (GitHub Pages live)** | Branch `main` di `rioovs/omah-keboen` | `git push origin main` → workflow `Deploy GitHub Pages` | URL live + checklist §6 |

Tidak ada host/server produksi terpisah: GitHub Pages adalah target produksi (PRD §7 asumsi teknis).
Gate sebelum produksi: `docs/QA_REPORT.md` berstatus `STATUS: APPROVED` **dan** Gate 2 disetujui Rio (PRD §8).
Deploy produksi baru sah setelah dua syarat itu terpenuhi.

---

## 3. Prasyarat & Akses

Prasyarat di mesin deploy (host `i5-4690-ubuntu`):

```bash
git --version && gh --version          # minimal git 2.40+, gh 2.x
gh auth status                          # harus: Logged in to github.com account rioovs
```

- **Pemegang akses `gh`**: Rio Oktavian (akun `rioovs`, e-mail `devops@rioovs.my.id`).
  Credential tersimpan di `~/.config/gh/hosts.yml` (mode `0600`, jangan pernah di-commit).
- Token `gh` yang dipakai saat ini ber-scope: `gist, read:org, repo, workflow` — cukup untuk push workflow + trigger Pages.
- Kalau `gh auth status` gagal / token kedaluwarsa: pemanggil melakukan `gh auth login` (login device flow) sendiri;
  DevOps tidak pernah meminta password Rio lewat chat. Bila token hilang tanpa akses ke mesin, kartu diblokir ke PM.

---

## 4. Deploy (langkah normal)

1. Pastikan working tree bersih dan branch `main`:

   ```bash
   cd /home/rioovs/project/omah-keboen-web
   git status --short          # harus kosong
   git branch --show-current   # main
   ```

2. Pastikan gate terpenuhi: `docs/QA_REPORT.md` berisi `STATUS: APPROVED`, dan Gate 2 disetujui di thread kartu PM.

3. Commit perubahan (source final + `docs/DEPLOY_RUNBOOK.md` + `.github/workflows/deploy.yml`):

   ```bash
   git add -A
   git commit -m "chore(deploy): workflow Pages + deploy runbook + source final"
   ```

4. Push ke `main` — ini yang memicu publish:

   ```bash
   git push origin main
   ```

5. Pantau workflow (butuh token `repo`):

   ```bash
   gh run list --repo rioovs/omah-keboen --workflow deploy.yml --limit 5
   gh run watch <run-id> --repo rioovs/omah-keboen
   ```

   Status sukses = `success` pada job `deploy`. Link run: `https://github.com/rioovs/omah-keboen/actions/runs/<run-id>`.

6. Verifikasi URL live (lihat §6). Deploy dianggap selesai hanya setelah §6 lulus.

### 4b. Deploy manual (tanpa push baru)

Workflow punya trigger `workflow_dispatch` untuk publish ulang commit yang sudah ada di `main`:

```bash
gh workflow run deploy.yml --repo rioovs/omah-keboen --ref main
gh run list --repo rioovs/omah-keboen --workflow deploy.yml --limit 1
```

### 4c. Aktivasi Pages (hanya sekali)

Sudah aktif di repo ini (`build_type=workflow`). Kalau repo baru/setting hilang:

```bash
gh api -X POST repos/rioovs/omah-keboen/pages -f build_type=workflow
```

`Settings → Pages → Build and deployment → Source = GitHub Actions` adalah padanan UI dari perintah di atas.

---

## 5. Update Konten (tanpa deploy ulang penuh)

Tidak ada pipeline build, jadi "publish ulang" = commit + push. Tidak perlu langkah manual tambahan.

- **Konten teks/menu/harga/jam buka/CTA** → edit `index.html` (D3), lalu `git add index.html && git commit -m "docs(content): <apa yang berubah>" && git push origin main`.
  Workflow mem-publish ulang seluruh situs otomatis (< 1 menit).
- **Ganti foto** → taruh file baru di `assets/img/` (D15: `assets/img/ig/` untuk foto galeri/hero), sesuaikan `src` di `index.html`, commit, push.
- **Perubahan CSS/JS** → edit `assets/css/styles.css` / `assets/js/main.js`, commit, push.
- Setelah edit, wajib: cek anchor & asset path tetap **relatif** (tanpa leading `/`) agar tidak rusak di subpath `/omah-keboen/` (D2).

Tidak perlu rebuild, tidak perlu clear cache, tidak perlu upload manual via Settings Pages.

---

## 6. Smoke Test Checklist (wajib setelah setiap deploy)

```bash
BASE=https://rivos.is-a.dev/omah-keboen
curl -sI $BASE/ | head -1                                   # expect: HTTP/2 200
curl -sI $BASE/assets/css/styles.css | head -1             # expect: 200
curl -sI $BASE/assets/js/main.js | head -1                 # expect: 200
curl -sI $BASE/assets/img/ig/ig-07.jpg | head -1            # expect: 200 (hero)
curl -s $BASE/ | grep -c "Omah Keboen"                     # expect: > 0 (index ter-render)
```

Checklist fungsional (ringkas, sebagian sudah otomatis di QA — `docs/QA_REPORT.md`):

- [ ] `index.html` HTTP 200 dan berisi konten final (bukan placeholder).
- [ ] `assets/css/styles.css` 200, `assets/js/main.js` 200, `assets/img/ig/*.jpg` 200 (tidak 404).
- [ ] Path relatif bekerja di URL live (aset dipanggil via `assets/...`, bukan `/assets/...`).
- [ ] Nav anchor jalan (`#menu`, `#tentang`, `#galeri`, `#lokasi`, `#kontak`).
- [ ] CTA hero = 2 (WhatsApp + Lihat Menu), link `wa.me/6285236639216` & `instagram.com/omahkeboen.jbg` benar.
- [ ] Badge Halal + rating 4,5 tampil; tabel jam buka 7 hari tampil.
- [ ] 404 tidak muncul di console browser; tidak ada horizontal scroll di 320–1440 px.
- [ ] Lighthouse mobile pada URL live: Performance ≥ 90, Accessibility ≥ 95, Best Practices ≥ 90, SEO ≥ 90 (PRD §6).

### 6.1 Hasil Lighthouse pada URL live (post-deploy 2026-10-20)

Diukur dengan Lighthouse 13.5.0, `--form-factor=mobile`, terhadap
`https://rivos.is-a.dev/omah-keboen/` (laporan mentah tersimpan di repo — path `docs/preview/qa2/lighthouse-live-mobile.json`;
folder `docs/preview/` tidak ikut dipublish ke Pages).

| Run | Performance | Accessibility | Best Practices | SEO | FCP | LCP | CLS | TBT |
|---|---|---|---|---|---|---|---|---|
| 1 (cold, cache kosong) | **81** | 96 | 100 | 100 | 3,2 s | 3,2 s | 0,143 | 0 ms |
| 2 (warm) | **92** | 96 | 100 | 100 | 2,0 s | 2,0 s | 0,143 | 0 ms |
| 3 (warm) | **93** | 96 | 100 | 100 | 1,7 s | 1,7 s | 0,143 | 0 ms |
| Build lokal (`localhost:8000`, QA) | 91 | 96 | 100 | 100 | 2,1 s | 2,1 s | 0,143 | 0 ms |

Deviasi vs build lokal (catatan untuk QA, bukan blocker deploy):

- Performance live **92–93** (target PRD §6: ≥ 90) — setara/lebih baik dari lokal.
- Run 1 (81) adalah cold start: DNS+TLS+font Google baru, tanpa cache. Warm load naik ke 92–93.
- Accessibility 96, Best Practices 100, SEO 100 identik dengan lokal — **tidak ada regresi** dari publish.
- CLS 0,143 identik dengan lokal; penyebabnya `section#beranda > .hero__media` (gambar hero dimuat setelah
  placeholder). Bukan konsekuensi deploy — muncul juga di build lokal.
- Console error: 0. Tidak ada request 404 di live.
- Catatan kecil: run cold LCP 3,2 s > 2,5 s (PRD §6). Penyebab: font + hero image lewat jaringan lambat
  pada cache kosong. Tidak diubah di sisi deploy (perubahan CSS/HTML = area kode, escalated ke QA/Okta).

---

## 7. Rollback

Ada 3 mekanisme; pilih yang paling murah.

> **Penting (ditemukan saat drill):** environment `github-pages` memakai *deployment branch policy* — hanya branch
> `main` yang boleh deploy. `gh workflow run --ref <branch-lain>` **ditolak** dengan
> `Branch "<branch>" is not allowed to deploy to github-pages due to environment protection rules`.
> Artinya rollback hanya lewat jalur `main`: `git revert` (7.2), re-run run lama (7.1), atau rollback dari UI (7.3).
> Jangan matikan proteksi ini tanpa persetujuan Rio — ini yang mencegah branch tak terduga menimpa situs live.

### 7.1 Rollback cepat (re-deploy isi commit lama, tanpa commit baru)

Re-run workflow run lama → artifact commit lama di-deploy ulang:

```bash
gh run rerun <run-id-lama> --repo rioovs/omah-keboen
gh run watch <run-id-lama> --repo rioovs/omah-keboen
```

Commit yang pernah ada di `main` tetap bisa di-deploy ulang (Pages menyimpan artifact tiap run).

### 7.2 Rollback permanen (revert di `main`)

```bash
git log --oneline -10                       # identifikasi commit yang bermasalah
git revert <commit-sha>                     # revert, bukan reset (aman untuk history bersama)
git push origin main                        # trigger publish ulang
```

`git reset --hard` **dilarang** di `main` — repo dipakai lebih dari satu penulis (D8).

### 7.3 Rollback dari UI GitHub

`https://github.com/rioovs/omah-keboen/deployments` → pilih deployment lama → **Rollback to this deployment**.

### 7.4 Hasil uji rollback (drill, wajib sebelum UAT)

Drill dilakukan pada repo live dengan marker `docs/ROLLBACK_DRILL.md` (commit `171e32c` → di-revert ke `f94dcbc`):

| Skenario | Perintah | Hasil terverifikasi |
|---|---|---|
| Deploy commit baru (marker) | `git push origin main` | run `39438506051` success → `GET /docs/ROLLBACK_DRILL.md` = **200** |
| Rollback permanen | `git revert` + push | run `39438695748` success → marker = **404**, `GET /` = 200 |
| Rollback cepat (re-run run lama) | `gh run rerun 39438506051` | success → marker kembali **200** (isi commit lama aktif lagi) |
| Restore final | `gh workflow run deploy.yml --ref main` | run `39439123493` success → marker **404**, index/css/hero 200 |
| Branch non-`main` | `gh workflow run --ref rollback-drill` | **ditolak** environment policy (proteksi, bukan kegagalan deploy) |

Kesimpulan: rollback via `git revert` **dan** via `gh run rerun` keduanya terbukti mengembalikan isi situs live.
Sisa file drill (`ROLLBACK_DRILL.md`) sudah di-revert; `git status` bersih, tidak ada sisa di live site.

---

## 8. Backup & Schedule

Situs statis ⇒ backup = isi repo. GitHub Pages tidak punya versioning; sumber kebenaran ada di git.

- **Backup primer**: repository `rioovs/omah-keboen` (public, branch `main`) + tag rilis per versi Gate.
- **Backup sekunder (host)**: bundle git harian ke storage besar `/mnt/hdd-4000gb/backups/omah-keboen/`.

Backup dijalankan otomatis oleh cron (lihat script di §10):

| Job | Jadwal | Output |
|---|---|---|
| Backup repo (git bundle) | `17 2 * * *` (daily 02:17) | `/mnt/hdd-4000gb/backups/omah-keboen/omah-keboen-<YYYYmmdd>.bundle.gz` |
| Retensi | keep 14 bundle terakhir | bundle lama dihapus otomatis |
| Health check URL live | `*/30 * * * *` (tiap 30 menit) | `/home/rioovs/deploy/omah-keboen/logs/health.log` |

Restore dari backup:

```bash
git clone /mnt/hdd-4000gb/backups/omah-keboen/omah-keboen-2026xxxx.bundle omah-keboen-restore
cd omah-keboen-restore && git checkout main && git push origin main
```

---

## 9. Secrets Management

- **Repo tidak boleh berisi secret apa pun.** Situs statis butuh 0 secret runtime (tanpa API key, tanpa DB, tanpa auth).
- Tidak ada file `.env` di repo. Jangan pernah `git add` file berisi token/password/kredensial.
- Credential GitHub CLI: `~/.config/gh/hosts.yml` (mode `0600`, di luar repo, tidak di-commit).
- Workflow memakai `GITHUB_TOKEN` otomatis milik runner dengan `permissions:` minimal
  (`contents: read`, `pages: write`, `id-token: write`). Tidak ada `secrets.*` yang didefinisikan di repo ini.
- Kalau nanti butuh secret (mis. API pihak ketiga), simpan di **Settings → Secrets and variables → Actions** (repo secret),
  bukan di `Settings → Pages` (branch/starter workflow) dan tidak pernah di dalam `index.html`/`docs/`.
- Rotation: token `gh` di-refresh berkala (`gh auth refresh -s repo,workflow`); token lama langsung tidak berlaku.

---

## 10. Monitoring & Automation Scripts

Lokasi script (di luar repo — repo hanya berisi situs + dokumentasi):

| File | Fungsi |
|---|---|
| `/home/rioovs/deploy/omah-keboen/backup-repo.sh` | `git bundle` repo → `/mnt/hdd-4000gb/backups/omah-keboen/`, retensi 14 file |
| `/home/rioovs/deploy/omah-keboen/healthcheck.sh` | cek HTTP status URL live + 4 aset kunci → append ke `/home/rioovs/deploy/omah-keboen/logs/health.log` |
| `/home/rioovs/.hermes/scripts/agency-report.sh` | laporan proaktif ke Rio (Telegram/Discord) |

Cron (user crontab `rioovs`):

```
17 2 * * * /home/rioovs/deploy/omah-keboen/backup-repo.sh >> /home/rioovs/deploy/omah-keboen/logs/backup.log 2>&1
*/30 * * * * /home/rioovs/deploy/omah-keboen/healthcheck.sh >> /home/rioovs/deploy/omah-keboen/logs/health.log 2>&1
```

Monitoring yang tersedia tanpa tooling tambahan:

1. **Status build**: `gh run list --repo rioovs/omah-keboen --workflow deploy.yml` → run terakhir harus `success`.
2. **Uptime URL**: `curl -sI https://rivos.is-a.dev/omah-keboen/` (health check cron, 30 menit).
3. **Deployments**: `https://github.com/rioovs/omah-keboen/deployments` (riwayat publish + tombol rollback).
4. **Sinyal``: kalau run `failure` atau health check non-200 → DevOps cek log, rollback bila perlu, laporkan ke PM.

---

## 11. Troubleshooting

| Gejala | Cause | Aksi |
|---|---|---|
| Run workflow `failure` di step *Configure Pages* | Pages belum aktif / `build_type` salah | `gh api -X POST repos/rioovs/omah-keboen/pages -f build_type=workflow` lalu re-run |
| Run `failure` di step *Upload Pages artifact* | folder `_site/` kosong (source belum di-push) | pastikan `index.html` + `assets/` ada di commit, push ulang |
| Live 404 di `/assets/...` | ada path absolut (leading `/`) | ubah ke path relatif (D2), commit, push |
| Live masih versi lama | CDN cache / run belum selesai | tunggu run `success`, lalu `curl -sI` ulang (cache biasanya < 60 dtk) |
| `gh auth status` gagal | token expired | `gh auth login` oleh pemilik akun `rioovs` |
| Halaman redirect ke `rivos.is-a.dev/omah-keboen/` | domain kanal user site | normal; canonical URL = `rivos.is-a.dev` |

---

## 12. Ownership & Escalation

| Area | Owner |
|---|---|
| Deploy, CI, Pages, backup, monitoring | benimaru-devops |
| Approve gate / bicara ke Rio | kevin-ceo |
| QA & status `APPROVED` | rimuru-qa |
| Plan, scope commit repo, kontrak D1–D16 | sania-projectmanager |
| Kode & konten situs | okta-softwaredeveloper |

Escalasi: kegagalan deploy/rollback → thread kartu `t_8685a4e5` + laporan ke PM (Sania); kendala akses → `kanban_block(kind="capability")`.
