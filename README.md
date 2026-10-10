# Laman Utama LSP UNIMED — demo frontend

Demo tampilan situs utama **LSP Universitas Negeri Medan** beserta prototipe **Arsip Dokumen** petugas.
Seluruh konten dan gambar bersifat contoh (gambar dummy di `assets/img/dummy-*.svg`).

## Halaman
| Berkas | Isi |
|---|---|
| `index.html` | Beranda: peta kompetensi fakultas, cek sertifikat, skema, alur, jadwal, berita, tiga laman |
| `profil.html` | Tentang, visi-misi, kebijakan mutu, struktur organisasi, lisensi, galeri |
| `skema.html` | 16 skema dengan filter jenis/fakultas dan detail persyaratan |
| `alur.html` | Alur asesi dan 10 langkah SOP XVII/SOP-PKS |
| `asesor-tuk.html` | Daftar asesor dan TUK |
| `verifikasi.html` | Cek keaslian sertifikat (demo: `62090 2611 3 0000123 2026`) |
| `berita.html`, `kontak.html` | Berita contoh dan kontak |
| `peta-ekosistem.html` | Peta sistem: situs LSP + SIPINTAR + Arsip Dokumen |
| `arsip/` | Prototipe dashboard Arsip Dokumen (calon `arsip.lsp.unimed.ac.id`) |

## Struktur
- `assets/css/site.css` — gaya situs (Plus Jakarta Sans, merah LSP, kuning matahari UNIMED untuk penanda berlisensi)
- `assets/js/site.js` — header, menu, footer bersama; alamat SIPINTAR & Arsip diatur di objek `URL`
- `assets/js/data.js` — skema, asesor, TUK (dari dokumen skema & surat 071/LSP-UNIMED/X/2026)
- `assets/js/konten.js` — berita dan sertifikat contoh
- `tools/build_pages.py` — pembuat halaman dalam (jalankan ulang setelah mengubah isi halaman)

Situs statis tanpa build; aktifkan GitHub Pages dari branch `main` (folder root).
