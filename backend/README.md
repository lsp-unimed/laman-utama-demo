# Backend Arsip Dokumen LSP UNIMED

Backend: **1 Spreadsheet (database) + 1 Apps Script (API JSON) + 1 folder Drive (file PDF)**.
Repo ini hanya `lsp-unimed/laman-utama-demo` — repo SIPINTAR tidak disentuh.

## File

- `Code.gs` — backend API, tempel ke Apps Script (Extensions > Apps Script).
- `appsscript.json` — manifest (timezone Asia/Jakarta, Web App anonim).
- `Database-Arsip-LSP-UNIMED.xlsx` — template database, upload ke Google Sheets.

## Tabel (nama tab = kontrak API, JANGAN diganti)

Dokumen, Revisi, SuratMasuk, Disposisi, Nomor, Agenda, AgendaButir,
Templat, Kop, Pengguna, Log + Petunjuk.

## Deploy manual (5 langkah)

1. Upload `Database-Arsip-LSP-UNIMED.xlsx` ke Drive → buka → Save as Google Sheets
   (atau buat spreadsheet kosong; tab dibuat otomatis oleh `siapkanSheet()`).
2. Di spreadsheet: Extensions > Apps Script → hapus `Code.gs` bawaan → tempel isi
   `backend/Code.gs` → simpan.
3. Project Settings > Script Properties > tambah `ADMIN_PASS` (kata sandi admin/petugas).
4. Di editor: pilih fungsi `siapkanSheet()` → Run (setujui izin Google).
   Ini membuat/menyesuaikan semua tab + header.
5. Deploy > New deployment > Web app → Execute as: **Me** → Access: **Anyone** →
   salin URL `/exec` → simpan sebagai `API_URL` frontend.

## API

- GET (baca): `?aksi=list&tabel=Dokumen`, `?aksi=ambil&tabel=Dokumen&id=...`,
  `?aksi=ping`, `?aksi=skema`
- POST (tulis, butuh `pass`): `{aksi:'tambah'|'ubah'|'hapus', tabel, id, data, pass}`
- Khusus: `cekNomor {nomor}`, `saranNomor {jenis,bulan,tahun}`, `ringkasan {}`

## Catatan

- Nomor surat **diketik manual** sesuai buku agenda; `cekNomor` menolak duplikat,
  `saranNomor` memberi saran urutan (075, 076, …) + 5 nomor terakhir.
- File PDF disimpan di Drive `ARSIP_LSP/<kategori>/`; cukup simpan `file_id`.
- Frontend `arsip/` masih mode demo (data contoh di browser); penyambungan
  `API_URL` ke backend ini langkah berikutnya setelah URL `/exec` ada.
