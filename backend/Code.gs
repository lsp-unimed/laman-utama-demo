/** @OnlyCurrentDoc */
/**
 * Arsip Dokumen LSP UNIMED — backend Apps Script + Spreadsheet sebagai database.
 * Repo: lsp-unimed/laman-utama-demo (folder backend/). TIDAK menyentuh repo SIPINTAR.
 *
 * Tabel (nama tab = nama tabel, JANGAN diganti setelah deploy):
 *   Dokumen, Revisi, SuratMasuk, Disposisi, Nomor, Agenda, AgendaButir,
 *   Templat, Kop, Pengguna, Log
 * Kolom 'id', 'dibuat', 'diubah' otomatis; jangan ditulis di 'kolom'.
 *
 * Aksi bawaan (semua tabel): ping, skema, masuk, list, ambil, tambah, ubah, hapus
 * GET  : ?aksi=list&tabel=x (baca saja)
 * POST : body JSON {aksi, tabel, id, data, opsi, pass} sebagai text/plain
 * Aksi khusus: cekNomor, saranNomor, ringkasan
 */

// ===================== SKEMA =====================
var SKEMA = {
  Dokumen: {
    kolom: ['kode', 'kat', 'judul', 'pemilik', 'terbit', 'sampai', 'status', 'rev', 'alur', 'surat', 'tpl_id', 'tpl_data', 'file_id', 'file_nama', 'ket'],
    publik: [],
    aturan: {
      kode:  { wajib: true, maks: 80, pesan: 'Kode/nomor dokumen wajib diisi.' },
      kat:   { wajib: true, pilihan: ['LIS', 'MUT', 'SKM', 'ASR', 'TUK', 'ASM', 'MNJ', 'KOR'], pesan: 'Kategori tidak dikenal.' },
      judul: { wajib: true, maks: 300, pesan: 'Judul wajib diisi (maks. 300 karakter).' },
      pemilik: { maks: 60 },
      terbit: { jenis: 'tanggal' },
      sampai: { jenis: 'tanggal' },
      status: { pilihan: ['Berlaku', 'Draf', 'Diajukan', 'Disahkan', 'Terkirim', 'Kedaluwarsa'], pesan: 'Status tidak dikenal.' },
      rev:   { jenis: 'angka' },
      alur:  { pilihan: ['', 'Draf', 'Diajukan', 'Disahkan', 'Terkirim'], pesan: 'Alur tidak dikenal.' },
      surat: { pilihan: ['', 'Y', 'T'], pesan: 'Surat harus Y/T.' }
    },
    izin: { list: 'admin', ambil: 'admin', tambah: 'admin', ubah: 'admin', hapus: 'admin' }
  },
  Revisi: {
    kolom: ['dokumen_id', 'rev', 'tanggal', 'oleh', 'catatan', 'file_id'],
    publik: [],
    aturan: {
      dokumen_id: { wajib: true, maks: 20, pesan: 'dokumen_id wajib diisi.' },
      rev: { wajib: true, jenis: 'angka', pesan: 'Revisi harus angka.' },
      tanggal: { jenis: 'tanggal' }
    },
    izin: { list: 'admin', ambil: 'admin', tambah: 'admin', ubah: 'admin', hapus: 'admin' }
  },
  SuratMasuk: {
    kolom: ['agenda', 'tgl_surat', 'terima', 'asal', 'nomor', 'perihal', 'sifat', 'status', 'file_id'],
    publik: [],
    aturan: {
      agenda: { wajib: true, maks: 30, pesan: 'Nomor agenda (SM-xxx/tahun) wajib diisi.' },
      perihal: { wajib: true, maks: 300, pesan: 'Perihal wajib diisi.' },
      tgl_surat: { jenis: 'tanggal' },
      terima: { jenis: 'tanggal' },
      sifat: { pilihan: ['', 'Biasa', 'Segera', 'Sangat segera'], pesan: 'Sifat tidak dikenal.' },
      status: { pilihan: ['', 'Diterima', 'Didisposisi', 'Selesai'], pesan: 'Status tidak dikenal.' }
    },
    izin: { list: 'admin', ambil: 'admin', tambah: 'admin', ubah: 'admin', hapus: 'admin' }
  },
  Disposisi: {
    kolom: ['surat_id', 'tgl', 'ke', 'instruksi', 'catatan', 'batas', 'status'],
    publik: [],
    aturan: {
      surat_id: { wajib: true, maks: 20, pesan: 'surat_id wajib diisi.' },
      ke: { wajib: true, maks: 200, pesan: 'Tujuan disposisi wajib diisi.' },
      instruksi: { maks: 300 }
    },
    izin: { list: 'admin', ambil: 'admin', tambah: 'admin', ubah: 'admin', hapus: 'admin' }
  },
  Nomor: {
    kolom: ['nomor', 'jenis', 'tahun', 'bulan', 'urut', 'dokumen_id', 'ket'],
    publik: [],
    aturan: {
      nomor: { wajib: true, maks: 80, pesan: 'Nomor surat wajib diisi (ketik manual sesuai buku agenda).' },
      jenis: { maks: 10 },
      tahun: { maks: 4 },
      urut: { jenis: 'angka' }
    },
    izin: { list: 'admin', ambil: 'admin', tambah: 'admin', ubah: 'admin', hapus: 'admin' }
  },
  Agenda: {
    kolom: ['nama', 'tanggal', 'tempat', 'catatan'],
    publik: [],
    aturan: {
      nama: { wajib: true, maks: 200, pesan: 'Nama agenda wajib diisi.' },
      tanggal: { wajib: true, jenis: 'tanggal', pesan: 'Tanggal agenda wajib diisi.' }
    },
    izin: { list: 'admin', ambil: 'admin', tambah: 'admin', ubah: 'admin', hapus: 'admin' }
  },
  AgendaButir: {
    kolom: ['agenda_id', 'nama', 'status', 'ket'],
    publik: [],
    aturan: {
      agenda_id: { wajib: true, maks: 20, pesan: 'agenda_id wajib diisi.' },
      nama: { wajib: true, maks: 300, pesan: 'Nama butir wajib diisi.' },
      status: { wajib: true, pilihan: ['ok', 'warn', 'bad'], pesan: 'Status butir: ok/warn/bad.' }
    },
    izin: { list: 'admin', ambil: 'admin', tambah: 'admin', ubah: 'admin', hapus: 'admin' }
  },
  Templat: {
    kolom: ['tpl_id', 'nama', 'kat', 'ket'],
    publik: ['tpl_id', 'nama', 'kat', 'ket'],
    aturan: {
      tpl_id: { wajib: true, maks: 30, pesan: 'tpl_id wajib diisi.' },
      nama: { wajib: true, maks: 120, pesan: 'Nama templat wajib diisi.' }
    },
    izin: { list: 'publik', ambil: 'publik', tambah: 'admin', ubah: 'admin', hapus: 'admin' }
  },
  Kop: {
    kolom: ['l1', 'l2', 'l3', 'l4', 'l5', 'kota', 'jabatan', 'nama', 'nip'],
    publik: ['l1', 'l2', 'l3', 'l4', 'l5', 'kota', 'jabatan', 'nama', 'nip'],
    aturan: {},
    izin: { list: 'publik', ambil: 'publik', tambah: 'admin', ubah: 'admin', hapus: 'admin' }
  },
  Pengguna: {
    kolom: ['nama', 'peran', 'bagian', 'email', 'aktif'],
    publik: [],
    aturan: {
      nama: { wajib: true, maks: 80, pesan: 'Nama pengguna wajib diisi.' },
      peran: { wajib: true, pilihan: ['Ketua LSP', 'Admin', 'Sekretariat', 'Administrasi', 'Bidang Sertifikasi', 'Manajemen Mutu', 'Bidang Skema'], pesan: 'Peran tidak dikenal.' },
      aktif: { pilihan: ['', 'Y', 'T'], pesan: 'Aktif harus Y/T.' }
    },
    izin: { list: 'admin', ambil: 'admin', tambah: 'admin', ubah: 'admin', hapus: 'admin' }
  },
  Log: {
    kolom: ['waktu', 'siapa', 'aksi'],
    publik: [],
    aturan: {
      aksi: { wajib: true, maks: 300, pesan: 'Aksi wajib diisi.' }
    },
    izin: { list: 'admin', ambil: 'admin', tambah: 'admin', ubah: 'admin', hapus: 'admin' }
  }
};

// Aksi tambahan khusus Arsip.
var AKSI_KHUSUS = {
  // Cek duplikat nomor surat manual: {nomor} -> {ada:true/false}
  cekNomor: {
    izin: 'admin',
    jalankan: function (body) {
      var nomor = String((body.data && body.data.nomor) || '').trim();
      if (!nomor) throw galat('Nomor kosong.');
      var adaDok = bacaTabel('Dokumen').some(function (r) { return String(r.kode) === nomor; });
      var adaNo = bacaTabel('Nomor').some(function (r) { return String(r.nomor) === nomor; });
      return { nomor: nomor, ada: adaDok || adaNo };
    }
  },
  // Saran urutan berikutnya: {jenis:'UND', bulan:'X', tahun:'2026'} -> {saran:'075/LSP-UNIMED/UND/X/2026', terakhir:[...]}
  saranNomor: {
    izin: 'admin',
    jalankan: function (body) {
      var d = body.data || {};
      var jenis = String(d.jenis || ''), bulan = String(d.bulan || ''), tahun = String(d.tahun || '');
      var semua = bacaTabel('Nomor');
      var cocok = semua.filter(function (r) { return String(r.jenis) === jenis && String(r.bulan) === bulan && String(r.tahun) === tahun; });
      var maks = 0;
      cocok.forEach(function (r) { var n = Number(r.urut) || 0; if (n > maks) maks = n; });
      var urut = maks + 1;
      var tengah = jenis ? '/' + jenis + '/' : '/';
      var saran = String(urut).padStart(3, '0') + '/LSP-UNIMED' + tengah + bulan + '/' + tahun;
      var terakhir = semua.slice(-5).map(function (r) { return r.nomor; });
      return { saran: saran, urut: urut, terakhir: terakhir };
    }
  },
  // Ringkasan dashboard: hitung dokumen per status, surat masuk terbuka, progres agenda.
  ringkasan: {
    izin: 'admin',
    jalankan: function () {
      var dok = bacaTabel('Dokumen');
      var sm = bacaTabel('SuratMasuk');
      var ag = bacaTabel('Agenda');
      var butir = bacaTabel('AgendaButir');
      var byStatus = {};
      dok.forEach(function (r) { var s = r.status || '-'; byStatus[s] = (byStatus[s] || 0) + 1; });
      var smBuka = sm.filter(function (r) { return r.status !== 'Selesai'; }).length;
      var perAgenda = ag.map(function (a) {
        var b = butir.filter(function (x) { return String(x.agenda_id) === String(a.id); });
        var ok = b.filter(function (x) { return x.status === 'ok'; }).length;
        return { id: a.id, nama: a.nama, tanggal: a.tanggal, total: b.length, siap: ok };
      });
      return { dokumen: dok.length, byStatus: byStatus, suratBuka: smBuka, agenda: perAgenda };
    }
  }
};

var BATAS_KIRIM_PER_MENIT = 30;
var DETIK_CACHE = 60;
var MAKS_PER_HALAMAN = 200;
// =================== AKHIR PENGATURAN ===================


function doGet(e) {
  var p = (e && e.parameter) || {};
  var bolehGet = ['ping', 'skema', 'list', 'ambil'].indexOf(p.aksi) >= 0 ||
                 (AKSI_KHUSUS[p.aksi] && AKSI_KHUSUS[p.aksi].izin === 'publik');
  if (!bolehGet) return balas({ ok: false, pesan: 'Aksi ini harus lewat POST.' });
  var body = { aksi: p.aksi, tabel: p.tabel, id: p.id, opsi: {} };
  ['cari', 'urut', 'turun', 'halaman', 'per'].forEach(function (k) { if (p[k] != null) body.opsi[k] = p[k]; });
  return jalankan(body, false);
}

function doPost(e) {
  var body;
  try {
    body = JSON.parse((e && e.postData && e.postData.contents) || '{}');
  } catch (err) {
    return balas({ ok: false, pesan: 'Format permintaan salah.' });
  }
  return jalankan(body, true);
}

function jalankan(body, lewatPost) {
  try {
    var isAdmin = lewatPost && body.pass ? cekAdmin(body.pass) : false;
    var aksi = String(body.aksi || '');

    if (aksi === 'ping')  return balas({ ok: true, data: { waktu: new Date().toISOString() } });
    if (aksi === 'skema') return balas({ ok: true, data: skemaPublik(isAdmin) });
    if (aksi === 'masuk') { if (!isAdmin) throw galat('Kata sandi salah.'); return balas({ ok: true, data: true }); }

    if (AKSI_KHUSUS[aksi]) {
      izinkan(AKSI_KHUSUS[aksi].izin, isAdmin);
      return balas({ ok: true, data: AKSI_KHUSUS[aksi].jalankan(body, isAdmin) });
    }

    var nama = String(body.tabel || '');
    var t = SKEMA[nama];
    if (!t) throw galat('Tabel "' + nama + '" tidak dikenal.');
    if (!t.izin || !t.izin[aksi]) throw galat('Aksi tidak diizinkan.');
    izinkan(t.izin[aksi], isAdmin);

    switch (aksi) {
      case 'list':   return balas({ ok: true, data: list(nama, body.opsi || {}, isAdmin) });
      case 'ambil':  return balas({ ok: true, data: ambil(nama, String(body.id || ''), isAdmin) });
      case 'tambah': return balas({ ok: true, data: tambah(nama, body.data || {}, isAdmin) });
      case 'ubah':   return balas({ ok: true, data: ubah(nama, String(body.id || ''), body.data || {}, isAdmin) });
      case 'hapus':  return balas({ ok: true, data: hapus(nama, String(body.id || '')) });
    }
    throw galat('Aksi tidak dikenal.');
  } catch (err) {
    if (err && err.publik) return balas({ ok: false, pesan: err.message });
    console.error(err && err.stack || err);
    return balas({ ok: false, pesan: 'Terjadi kesalahan di server.' });
  }
}


// ===================== Aksi =====================

function list(nama, opsi, isAdmin) {
  var kunciCache = 'list:' + nama;
  var cache = CacheService.getScriptCache();
  var baris;
  var simpan = !isAdmin && cache.get(kunciCache);
  if (simpan) {
    baris = JSON.parse(simpan);
  } else {
    baris = bacaTabel(nama).map(function (r) { return saring(nama, r, isAdmin); });
    if (!isAdmin) { try { cache.put(kunciCache, JSON.stringify(baris), DETIK_CACHE); } catch (e) {} }
  }

  if (opsi.cari) {
    var q = String(opsi.cari).toLowerCase();
    baris = baris.filter(function (r) {
      return Object.keys(r).some(function (k) { return String(r[k]).toLowerCase().indexOf(q) >= 0; });
    });
  }
  if (opsi.saring && typeof opsi.saring === 'object') {
    Object.keys(opsi.saring).forEach(function (k) {
      baris = baris.filter(function (r) { return String(r[k]) === String(opsi.saring[k]); });
    });
  }
  var urut = opsi.urut || 'dibuat';
  var turun = opsi.turun == null ? true : String(opsi.turun) !== 'false';
  baris.sort(function (a, b) {
    var x = a[urut], y = b[urut];
    if (x === y) return 0;
    return (x > y ? 1 : -1) * (turun ? -1 : 1);
  });

  var per = Math.min(Number(opsi.per) || MAKS_PER_HALAMAN, MAKS_PER_HALAMAN);
  var hal = Math.max(Number(opsi.halaman) || 1, 1);
  return { baris: baris.slice((hal - 1) * per, hal * per), total: baris.length, halaman: hal, per: per };
}

function ambil(nama, id, isAdmin) {
  var r = bacaTabel(nama).filter(function (x) { return String(x.id) === id; })[0];
  if (!r) throw galat('Data tidak ditemukan.');
  return saring(nama, r, isAdmin);
}

function tambah(nama, data, isAdmin) {
  if (data.situs) return null;
  if (!isAdmin) batasiKiriman();
  var bersih = validasi(nama, data, false);
  bersih.id = Utilities.getUuid().replace(/-/g, '').slice(0, 10);
  bersih.dibuat = new Date().toISOString();
  bersih.diubah = '';

  denganKunci(function () {
    var sh = sheetTabel(nama);
    var judul = judulKolom(sh);
    sh.appendRow(judul.map(function (j) { return bersih[j] != null ? bersih[j] : ''; }));
  });
  hapusCache(nama);
  return saring(nama, bersih, isAdmin);
}

function ubah(nama, id, data, isAdmin) {
  if (!id) throw galat('ID kosong.');
  var bersih = validasi(nama, data, true);
  bersih.diubah = new Date().toISOString();
  var hasil = {};
  denganKunci(function () {
    var sh = sheetTabel(nama);
    var judul = judulKolom(sh);
    var rentang = sh.getRange(cariBaris(sh, id), 1, 1, judul.length);
    var nilai = rentang.getValues()[0];
    judul.forEach(function (j, i) { if (bersih.hasOwnProperty(j)) nilai[i] = bersih[j]; });
    rentang.setValues([nilai]);
    judul.forEach(function (j, i) { hasil[j] = nilai[i] instanceof Date ? nilai[i].toISOString() : nilai[i]; });
  });
  hapusCache(nama);
  return saring(nama, hasil, isAdmin);
}

function hapus(nama, id) {
  if (!id) throw galat('ID kosong.');
  denganKunci(function () {
    var sh = sheetTabel(nama);
    sh.deleteRow(cariBaris(sh, id));
  });
  hapusCache(nama);
  return { id: id };
}


// ===================== Validasi & izin =====================

function validasi(nama, data, sebagian) {
  var t = SKEMA[nama], aturan = t.aturan || {}, bersih = {};
  t.kolom.forEach(function (k) {
    if (sebagian && !data.hasOwnProperty(k)) return;
    var a = aturan[k] || {};
    var v = data[k] == null ? '' : String(data[k]).trim();
    var salah = a.pesan || ('Isian "' + k + '" tidak valid.');
    if (a.wajib && !v) throw galat(salah);
    if (v) {
      if (v.length > (a.maks || 2000)) throw galat(salah);
      if (a.pola && !new RegExp(a.pola).test(v)) throw galat(salah);
      if (a.pilihan && a.pilihan.indexOf(v) < 0) throw galat(salah);
      if (a.jenis === 'angka' && isNaN(Number(v))) throw galat(salah);
      if (a.jenis === 'email' && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v)) throw galat(salah);
      if (a.jenis === 'tanggal' && isNaN(new Date(v).getTime())) throw galat(salah);
    }
    bersih[k] = amankanSel(v);
  });
  return bersih;
}

function izinkan(tingkat, isAdmin) {
  if (tingkat === 'publik') return;
  if (tingkat === 'admin' && isAdmin) return;
  throw galat(tingkat === 'admin' ? 'Perlu masuk sebagai admin.' : 'Aksi tidak diizinkan.');
}

function cekAdmin(pass) {
  var benar = PropertiesService.getScriptProperties().getProperty('ADMIN_PASS');
  if (!benar) throw galat('Kata sandi admin belum diatur di Script Properties.');
  if (String(pass) !== benar) { Utilities.sleep(800); throw galat('Kata sandi salah.'); }
  return true;
}

function saring(nama, r, isAdmin) {
  if (isAdmin) return r;
  var o = { id: r.id, dibuat: r.dibuat };
  (SKEMA[nama].publik || []).forEach(function (k) { o[k] = r[k]; });
  return o;
}

function skemaPublik(isAdmin) {
  var hasil = {};
  Object.keys(SKEMA).forEach(function (n) {
    var t = SKEMA[n];
    hasil[n] = { kolom: isAdmin ? t.kolom : (t.publik || []), aturan: t.aturan || {}, izin: t.izin };
  });
  return { tabel: hasil, aksiKhusus: Object.keys(AKSI_KHUSUS) };
}

function batasiKiriman() {
  var cache = CacheService.getScriptCache();
  var k = 'kirim-' + Math.floor(Date.now() / 60000);
  var n = Number(cache.get(k) || 0) + 1;
  cache.put(k, String(n), 120);
  if (n > BATAS_KIRIM_PER_MENIT) throw galat('Server sedang sibuk. Coba lagi sebentar.');
}


// ===================== Spreadsheet =====================

function bacaTabel(nama) {
  var nilai = sheetTabel(nama).getDataRange().getValues();
  var judul = (nilai.shift() || []).map(String);
  return nilai
    .filter(function (b) { return b.join('') !== ''; })
    .map(function (b) {
      var o = {};
      judul.forEach(function (j, i) { if (j) o[j] = b[i] instanceof Date ? b[i].toISOString() : b[i]; });
      return o;
    });
}

function sheetTabel(nama) {
  var ss = SpreadsheetApp.getActive();
  var sh = ss.getSheetByName(nama) || ss.insertSheet(nama);
  var perlu = ['id', 'dibuat', 'diubah'].concat(SKEMA[nama].kolom);
  if (sh.getLastRow() === 0) {
    sh.getRange('A:Z').setNumberFormat('@');
    sh.appendRow(perlu);
    sh.setFrozenRows(1);
    sh.getRange(1, 1, 1, perlu.length).setFontWeight('bold');
    return sh;
  }
  var ada = judulKolom(sh);
  var kurang = perlu.filter(function (k) { return ada.indexOf(k) < 0; });
  if (kurang.length) {
    var mulai = ada.length + 1;
    sh.getRange(1, mulai, 1, kurang.length).setValues([kurang]).setFontWeight('bold');
    sh.getRange(1, mulai, sh.getMaxRows(), kurang.length).setNumberFormat('@');
    if (kurang.indexOf('id') >= 0) isiIdKosong(sh);
  }
  return sh;
}

function isiIdKosong(sh) {
  var kol = judulKolom(sh).indexOf('id') + 1, n = sh.getLastRow() - 1;
  if (n < 1) return;
  var r = sh.getRange(2, kol, n, 1), v = r.getValues();
  v.forEach(function (b) { if (!b[0]) b[0] = Utilities.getUuid().replace(/-/g, '').slice(0, 10); });
  r.setValues(v);
}

function judulKolom(sh) {
  var n = sh.getLastColumn();
  return n ? sh.getRange(1, 1, 1, n).getValues()[0].map(String) : [];
}

function cariBaris(sh, id) {
  var kol = judulKolom(sh).indexOf('id') + 1;
  if (!kol) throw galat('Kolom id tidak ada.');
  var ids = sh.getRange(1, kol, sh.getLastRow(), 1).getValues();
  for (var i = 1; i < ids.length; i++) if (String(ids[i][0]) === id) return i + 1;
  throw galat('Data tidak ditemukan.');
}

function denganKunci(fn) {
  var kunci = LockService.getScriptLock();
  kunci.waitLock(10000);
  try { fn(); } finally { kunci.releaseLock(); }
}

function hapusCache(nama) { CacheService.getScriptCache().remove('list:' + nama); }

/** Jalankan sekali dari editor: membuat/menyesuaikan semua tab dan memicu layar izin Google. */
function siapkanSheet() {
  Object.keys(SKEMA).forEach(function (n) { sheetTabel(n); });
  Logger.log('Siap: ' + Object.keys(SKEMA).join(', '));
}

function amankanSel(v) { return /^[=+\-@]/.test(v) ? "'" + v : v; }

function galat(pesan) { var e = new Error(pesan); e.publik = true; return e; }

function balas(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(ContentService.MimeType.JSON);
}
