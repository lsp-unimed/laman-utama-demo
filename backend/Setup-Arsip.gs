/**
 * Setup Database Arsip LSP UNIMED — tempel ke Apps Script lalu Run.
 *
 * Cara pakai (2 menit):
 *  1. Buka https://script.google.com > New project > tempel SELURUH file ini > Save.
 *  2. Pilih fungsi buatDatabaseArsip > Run > setujui izin Google.
 *  3. Lihat log (View > Logs): salin URL spreadsheet yang dibuat.
 *  4. Buka spreadsheet itu > Extensions > Apps Script > tempel backend/Code.gs
 *     dari GitHub (lsp-unimed/laman-utama-demo/backend/Code.gs) > Deploy Web App.
 *
 * Yang dibuat otomatis: 11 tab (Dokumen, Revisi, SuratMasuk, Disposisi, Nomor,
 * Agenda, AgendaButir, Templat, Kop, Pengguna, Log) + 1 tab Petunjuk,
 * header + freeze + filter + validasi + contoh isi. Aman diulang: tab yang
 * sudah ada tidak ditimpa, hanya dilengkapi kolom yang kurang.
 */

function buatDatabaseArsip() {
  var NAMA = 'Database Arsip LSP UNIMED';
  var ss = SpreadsheetApp.create(NAMA);
  var TABEL = {
    Dokumen: ['id', 'dibuat', 'diubah', 'kode', 'kat', 'judul', 'pemilik', 'terbit', 'sampai', 'status', 'rev', 'alur', 'surat', 'tpl_id', 'tpl_data', 'file_id', 'file_nama', 'ket'],
    Revisi: ['id', 'dibuat', 'diubah', 'dokumen_id', 'rev', 'tanggal', 'oleh', 'catatan', 'file_id'],
    SuratMasuk: ['id', 'dibuat', 'diubah', 'agenda', 'tgl_surat', 'terima', 'asal', 'nomor', 'perihal', 'sifat', 'status', 'file_id'],
    Disposisi: ['id', 'dibuat', 'diubah', 'surat_id', 'tgl', 'ke', 'instruksi', 'catatan', 'batas', 'status'],
    Nomor: ['id', 'dibuat', 'diubah', 'nomor', 'jenis', 'tahun', 'bulan', 'urut', 'dokumen_id', 'ket'],
    Agenda: ['id', 'dibuat', 'diubah', 'nama', 'tanggal', 'tempat', 'catatan'],
    AgendaButir: ['id', 'dibuat', 'diubah', 'agenda_id', 'nama', 'status', 'ket'],
    Templat: ['id', 'dibuat', 'diubah', 'tpl_id', 'nama', 'kat', 'ket'],
    Kop: ['id', 'dibuat', 'diubah', 'l1', 'l2', 'l3', 'l4', 'l5', 'kota', 'jabatan', 'nama', 'nip'],
    Pengguna: ['id', 'dibuat', 'diubah', 'username', 'nama', 'peran', 'salt', 'password_hash', 'aktif', 'bagian', 'email'],
    Log: ['id', 'dibuat', 'diubah', 'waktu', 'siapa', 'aksi']
  };
  Object.keys(TABEL).forEach(function (n) {
    buatSheet_(ss, n, TABEL[n]);
  });
  isiValidasi_(ss);
  isiContoh_(ss);
  buatPetunjuk_(ss);
  // Hapus Sheet1 bawaan bila masih ada dan bukan bagian tabel.
  var s1 = ss.getSheetByName('Sheet1');
  if (s1 && ss.getSheets().length > 1) ss.deleteSheet(s1);
  Logger.log('SELESAI. Buka spreadsheet: ' + ss.getUrl());
  return ss.getUrl();
}

function buatSheet_(ss, nama, header) {
  var sh = ss.getSheetByName(nama) || ss.insertSheet(nama);
  sh.clear();
  sh.getRange('A:Z').setNumberFormat('@'); // teks: 0 di depan tidak hilang
  sh.appendRow(header);
  sh.setFrozenRows(1);
  sh.getRange(1, 1, 1, header.length).setFontWeight('bold').setBackground('#1F3864').setFontColor('#FFFFFF');
  sh.setColumnWidths(1, header.length, 170);
  try { sh.autoResizeColumns(1, header.length); } catch (e) {}
  if (sh.getFilter()) { try { sh.getFilter().remove(); } catch (e) {} }
  sh.getRange(1, 1, 1, header.length).createFilter();
  return sh;
}

function validasi_(ss, sheet, kolom, daftar) {
  var sh = ss.getSheetByName(sheet);
  if (!sh) return;
  var head = sh.getRange(1, 1, 1, sh.getLastColumn()).getValues()[0].map(String);
  var idx = head.indexOf(kolom) + 1;
  if (!idx) return;
  var aturan = SpreadsheetApp.newDataValidation().requireValueInList(daftar, true).setAllowInvalid(true).build();
  sh.getRange(2, idx, 498, 1).setDataValidation(aturan);
}

function isiValidasi_(ss) {
  validasi_(ss, 'Dokumen', 'kat', ['LIS', 'MUT', 'SKM', 'ASR', 'TUK', 'ASM', 'MNJ', 'KOR']);
  validasi_(ss, 'Dokumen', 'status', ['Berlaku', 'Draf', 'Diajukan', 'Disahkan', 'Terkirim', 'Kedaluwarsa']);
  validasi_(ss, 'Dokumen', 'alur', ['Draf', 'Diajukan', 'Disahkan', 'Terkirim']);
  validasi_(ss, 'Dokumen', 'surat', ['Y', 'T']);
  validasi_(ss, 'SuratMasuk', 'sifat', ['Biasa', 'Segera', 'Sangat segera']);
  validasi_(ss, 'SuratMasuk', 'status', ['Diterima', 'Didisposisi', 'Selesai']);
  validasi_(ss, 'AgendaButir', 'status', ['ok', 'warn', 'bad']);
  validasi_(ss, 'Pengguna', 'peran', ['Ketua LSP', 'Admin', 'Sekretariat', 'Administrasi', 'Bidang Sertifikasi', 'Manajemen Mutu', 'Bidang Skema']);
  validasi_(ss, 'Pengguna', 'aktif', ['Y', 'T']);
}

function tambahBaris_(ss, sheet, baris) {
  var sh = ss.getSheetByName(sheet);
  if (!sh) return;
  var nkol = sh.getLastColumn();
  baris.forEach(function (r) {
    var row = r.concat(Array(Math.max(0, nkol - r.length)).fill(''));
    sh.appendRow(row.slice(0, nkol));
  });
}

function isiContoh_(ss) {
  tambahBaris_(ss, 'Kop', [[
    'k000000001', '', '',
    'LEMBAGA SERTIFIKASI PROFESI', 'UNIVERSITAS NEGERI MEDAN',
    'Sertifikat Lisensi Nomor : BNSP-LSP-1928-ID',
    'Sekretariat: Gedung FT, Jl. Willem Iskandar Pasar V, Medan Estate, Medan, 20221',
    'Website : https://lsp.unimed.ac.id', 'Medan',
    'Ketua LSP Universitas Negeri Medan', 'Nama Ketua LSP', 'NIP. 19xxxxxxxxxxxxxxxx']]);
  tambahBaris_(ss, 'Templat', [
    ['t000000001', '', '', 'undangan', 'Surat undangan rapat', 'KOR', 'Undangan rapat atau kegiatan'],
    ['t000000002', '', '', 'tugas', 'Surat tugas', 'ASR', 'Penugasan asesor/panitia'],
    ['t000000003', '', '', 'sk', 'Surat keputusan (SK)', 'ASR', 'Keputusan ketua'],
    ['t000000004', '', '', 'ba', 'Berita acara', 'ASM', 'Berita acara asesmen'],
    ['t000000005', '', '', 'hadir', 'Daftar hadir', 'MNJ', 'Daftar hadir kegiatan'],
    ['t000000006', '', '', 'notulen', 'Notulen rapat', 'MNJ', 'Notulen rapat']]);
  tambahBaris_(ss, 'Pengguna', [
    ['u000000001', '', '', 'ketua', 'Ketua LSP', 'Ketua LSP', '', '', 'Y', '', ''],
    ['u000000002', '', '', 'admin', 'Admin Arsip', 'Admin', '', '', 'Y', '', ''],
    ['u000000003', '', '', 'sekretariat', 'Sekretariat', 'Sekretariat', '', '', 'Y', 'Sekretariat', ''],
    ['u000000004', '', '', 'sertifikasi', 'Bidang Sertifikasi', 'Bidang Sertifikasi', '', '', 'Y', 'Bidang Sertifikasi', ''],
    ['u000000005', '', '', 'mutu', 'Manajemen Mutu', 'Manajemen Mutu', '', '', 'Y', 'Manajemen Mutu', ''],
    ['u000000006', '', '', 'skema', 'Bidang Skema', 'Bidang Skema', '', '', 'Y', 'Bidang Skema', ''],
    ['u000000007', '', '', 'administrasi', 'Administrasi', 'Administrasi', '', '', 'Y', 'Administrasi', '']]);
  tambahBaris_(ss, 'Dokumen', [
    ['d000000001', '2026-10-05T00:00:00', '', '072/LSP-UNIMED/SK/X/2026', 'ASR', 'SK Ketua LSP tentang Penugasan Asesor 17 Oktober 2026', 'Sekretariat', '2026-10-05', '', 'Disahkan', 1, 'Disahkan', 'Y', 'sk', '{"tanggal":"2026-10-05"}', '', '', ''],
    ['d000000002', '2026-10-09T00:00:00', '', '074/LSP-UNIMED/UND/X/2026', 'MNJ', 'Undangan Rapat Pleno Hasil Uji Kompetensi', 'Sekretariat', '2026-10-09', '', 'Draf', 1, 'Draf', 'Y', 'undangan', '{"tanggal":"2026-10-09","tglAcara":"2026-10-20"}', '', '', ''],
    ['d000000003', '2026-09-30T00:00:00', '', 'LSP-UNIMED/MUT/005/2026', 'MUT', 'Daftar Induk Dokumen', 'Manajemen Mutu', '2026-09-30', '', 'Berlaku', 9, '', '', '', '', 'Daftar_Induk_Dokumen.pdf', '']]);
  tambahBaris_(ss, 'SuratMasuk', [
    ['s000000001', '2026-09-20T00:00:00', '', 'SM-040/2026', '2026-09-18', '2026-09-20', 'Badan Nasional Sertifikasi Profesi', 'Surat BNSP (contoh)', 'Jadwal penyaksian (witness) uji kompetensi LSP UNIMED', 'Segera', 'Didisposisi', ''],
    ['s000000002', '2026-10-08T00:00:00', '', 'SM-043/2026', '2026-10-08', '2026-10-08', 'Rektorat UNIMED', '2210/UN33/KP/2026', 'Undangan rapat koordinasi unit layanan universitas', 'Sangat segera', 'Diterima', '']]);
  tambahBaris_(ss, 'Disposisi', [
    ['p000000001', '2026-09-20T00:00:00', '', 's000000001', '2026-09-20', 'Sekretariat, Bidang Sertifikasi, Manajemen Mutu', 'Tindak lanjuti', 'Siapkan seluruh dokumen dan rapat persiapan', '2026-10-15', '']]);
  tambahBaris_(ss, 'Nomor', [
    ['n000000001', '2026-10-05T00:00:00', '', '072/LSP-UNIMED/SK/X/2026', 'SK', '2026', 'X', 72, 'd000000001', ''],
    ['n000000002', '2026-10-09T00:00:00', '', '074/LSP-UNIMED/UND/X/2026', 'UND', '2026', 'X', 74, 'd000000002', '']]);
  tambahBaris_(ss, 'Agenda', [
    ['a000000001', '2026-10-10T00:00:00', '', 'Penyaksian (witness) uji kompetensi BNSP', '2026-10-17', 'TUK Multimedia dan Pemrograman, Kampus UNIMED', '16 skema disaksikan BNSP'],
    ['a000000002', '2026-10-10T00:00:00', '', 'Rapat pleno hasil uji kompetensi', '2026-10-20', 'Ruang Rapat LSP UNIMED', 'Penetapan keputusan sertifikasi']]);
  tambahBaris_(ss, 'AgendaButir', [
    ['b000000001', '2026-10-10T00:00:00', '', 'a000000001', 'Panduan mutu dan daftar induk dokumen', 'ok', 'Revisi terbaru 30 Sep 2026'],
    ['b000000002', '2026-10-10T00:00:00', '', 'a000000001', 'Lisensi BNSP', 'bad', 'Berakhir 6 Apr 2026 - lampirkan bukti perpanjangan'],
    ['b000000003', '2026-10-10T00:00:00', '', 'a000000002', 'Undangan rapat pleno', 'ok', '074/LSP-UNIMED/UND/X/2026 draf']]);
  tambahBaris_(ss, 'Revisi', [
    ['r000000001', '2026-10-09T15:42:00', '', 'd000000003', 9, '2026-09-30', 'Sekretariat', 'Revisi 9 Daftar Induk Dokumen', '']]);
  tambahBaris_(ss, 'Log', [
    ['l000000001', '2026-10-09T15:42:00', '', '2026-10-09 15:42', 'Sekretariat', 'Mengunggah revisi 9 Daftar Induk Dokumen']]);
}

function buatPetunjuk_(ss) {
  var sh = ss.getSheetByName('Petunjuk') || ss.insertSheet('Petunjuk');
  sh.clear();
  sh.getRange('A1').setValue('Petunjuk: Database Arsip LSP UNIMED').setFontWeight('bold').setFontSize(14);
  var baris = [
    '1. Spreadsheet ini dibuat otomatis oleh buatDatabaseArsip(). JANGAN ubah nama tab dan urutan kolom.',
    '2. Buka Extensions > Apps Script, tempel backend/Code.gs dari GitHub lsp-unimed/laman-utama-demo.',
    '3. Di Project Settings > Script Properties, tambah ADMIN_PASS (kata sandi petugas).',
    '4. Di editor pilih siapkanSheet() > Run sekali, lalu Deploy > New deployment > Web app (Execute as: Me, Access: Anyone).',
    '5. Salin URL /exec ke frontend arsip sebagai API_URL.',
    '6. Nomor surat diketik MANUAL sesuai buku agenda; backend hanya mengecek duplikat (cekNomor) dan memberi saran (saranNomor).'];
  baris.forEach(function (t, i) { sh.getRange(i + 3, 1).setValue(t); });
  sh.setColumnWidth(1, 140);
}
