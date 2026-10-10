# Generator halaman dalam (head + kerangka sama). Jalankan: python3 tools/build_pages.py
HEAD = '''<!doctype html>
<html lang="id">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>{title} — LSP UNIMED</title>
  <link rel="icon" type="image/png" sizes="32x32" href="assets/img/favicon-32.png">
  <link rel="apple-touch-icon" href="assets/img/favicon-180.png">
  <link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="assets/css/site.css">
</head>
<body data-page="{page}">
<main>
  <section class="page-head"><div class="wrap">
    <div class="crumb"><a href="index.html">Beranda</a> / {crumb}</div>
    <h1 style="font-size:clamp(1.9rem,4vw,2.8rem)">{h1}</h1>
    <p class="lead" style="margin:0">{lead}</p>
  </div></section>
'''
TAIL = '''</main>
<script src="assets/js/data.js"></script>
<script src="assets/js/site.js"></script>
<script src="assets/js/konten.js"></script>
{script}
</body>
</html>
'''
def page(fn, title, pg, crumb, h1, lead, body, script=''):
    open(fn, 'w').write(HEAD.format(title=title, page=pg, crumb=crumb, h1=h1, lead=lead) + body + TAIL.format(script=script))

# ---------------- PROFIL ----------------
page('profil.html', 'Profil', 'profil', 'Profil', 'Tentang LSP UNIMED',
 'Lembaga sertifikasi pihak kesatu yang memastikan kompetensi mahasiswa dan alumni UNIMED diakui dunia kerja.',
 '''  <section class="section"><div class="wrap two">
    <div class="prose">
      <h2>Siapa kami</h2>
      <p>LSP Universitas Negeri Medan adalah Lembaga Sertifikasi Profesi Pihak Kesatu (P1) yang dibentuk universitas dan dilisensi oleh Badan Nasional Sertifikasi Profesi (BNSP). LSP melaksanakan sertifikasi kompetensi bagi mahasiswa dan alumni UNIMED berdasarkan skema yang disusun bersama program studi dan mengacu pada standar kompetensi kerja nasional.</p>
      <p>Uji kompetensi diselenggarakan di Tempat Uji Kompetensi (TUK) yang berada di laboratorium dan bengkel fakultas, dan dilaksanakan oleh asesor kompetensi yang teregistrasi di BNSP.</p>
      <h2>Visi</h2>
      <p>Menjadi lembaga sertifikasi profesi yang terpercaya dan diakui secara nasional dalam menjamin kompetensi lulusan Universitas Negeri Medan.</p>
      <h2>Misi</h2>
      <ol>
        <li>Menyelenggarakan sertifikasi kompetensi yang profesional, objektif, transparan, dan mampu telusur sesuai pedoman BNSP.</li>
        <li>Mengembangkan skema sertifikasi bersama program studi sesuai kebutuhan dunia kerja.</li>
        <li>Menyiapkan asesor dan tempat uji kompetensi yang memenuhi persyaratan.</li>
        <li>Membangun kerja sama dengan industri, asosiasi profesi, dan pemangku kepentingan.</li>
      </ol>
      <h2>Kebijakan mutu</h2>
      <p>LSP UNIMED berkomitmen memberikan pelayanan sertifikasi yang adil, tidak memihak, dan menjaga kerahasiaan peserta, dengan menerapkan sistem manajemen mutu sesuai PBNSP 201, PBNSP 202, PBNSP 206, dan ISO/IEC 17024:2012 secara berkelanjutan.</p>
      <h2 id="struktur">Struktur organisasi</h2>
      <p class="muted">Nama pejabat pada bagan berikut adalah contoh. Ganti dengan SK pengangkatan pengurus LSP yang berlaku.</p>
      <div class="org">
        <div class="lvl"><div class="p"><b>Dewan Pengarah</b><span>Pimpinan universitas, industri, asosiasi</span></div></div>
        <div class="lvl"><div class="p top"><b>Ketua LSP</b><span>Nama Ketua (contoh)</span></div></div>
        <div class="lvl"><div class="p"><b>Sekretariat LSP</b><span>Informasi, administrasi asesmen, rekaman</span></div><div class="p"><b>Manajemen Mutu</b><span>Audit internal, keluhan, kaji ulang</span></div></div>
        <div class="lvl"><div class="p"><b>Bagian Administrasi</b><span>Penerimaan permohonan, sertifikat</span></div><div class="p"><b>Bagian Sertifikasi</b><span>Verifikasi, jadwal, asesmen, hasil</span></div><div class="p"><b>Bagian Skema</b><span>Pengembangan dan kaji ulang skema</span></div></div>
      </div>
      <h2 id="lisensi">Lisensi BNSP</h2>
      <dl class="kv"><dt>Nomor lisensi</dt><dd>BNSP-LSP-1928-ID</dd><dt>Nomor SK</dt><dd>KEP.0650/BNSP/IV/2021</dd><dt>Jenis</dt><dd>LSP Pihak Kesatu (P1)</dd><dt>Ruang lingkup</dt><dd>16 skema sertifikasi (lihat halaman skema)</dd></dl>
      <p>Data lisensi resmi dapat dilihat di laman <a href="https://bnsp.go.id/lsp/lsp-unimed" target="_blank" rel="noopener">BNSP — LSP UNIMED</a>.</p>
      <h2>Galeri</h2>
      <div class="gallery"><img src="assets/img/dummy-1.svg" alt="Contoh foto kegiatan"><img src="assets/img/dummy-2.svg" alt="Contoh foto kegiatan"><img src="assets/img/dummy-3.svg" alt="Contoh foto kegiatan"><img src="assets/img/dummy-4.svg" alt="Contoh foto kegiatan"><img src="assets/img/dummy-5.svg" alt="Contoh foto kegiatan"><img src="assets/img/dummy-6.svg" alt="Contoh foto kegiatan"></div>
    </div>
    <aside class="aside">
      <div class="box"><h3>Dokumen acuan</h3><ul><li>PBNSP 201 — Persyaratan umum LSP</li><li>PBNSP 202 — Pelaksanaan sertifikasi</li><li>PBNSP 206 — Sistem manajemen mutu</li><li>ISO/IEC 17024:2012</li><li>SOP XVII/SOP-PKS — Pelayanan sertifikasi</li></ul></div>
      <div class="box"><h3>Ingin disertifikasi?</h3><p class="muted" style="font-size:.93rem">Pendaftaran, status, hasil, dan sertifikat dilayani daring.</p><a class="btn sm" href="https://lsp-unimed.github.io/sipintar/" target="_blank" rel="noopener">Buka SIPINTAR</a></div>
    </aside>
  </div></section>
''')

# ---------------- SKEMA ----------------
page('skema.html', 'Skema sertifikasi', 'sertifikasi', 'Sertifikasi / Skema', 'Skema sertifikasi',
 'Enam belas skema dari lima fakultas. Pilih skema untuk melihat persyaratan, asesor, dan tempat uji.',
 '''  <section class="section"><div class="wrap">
    <div class="filters" id="fJ"></div>
    <div class="filters" id="fF"></div>
    <div class="skema-rows" id="rows"></div>
  </div></section>
''', '''<script>
(function () {
  const D = window.LSP_DATA, F = window.FAKULTAS, esc = window.esc, SIP = window.LSP_SITE.URL.sipintar;
  let J = 'Semua', K = 'Semua';
  const chips = (el, items, cur, key) => { el.innerHTML = items.map(i => `<button class="chip" type="button" data-${key}="${i[0]}" aria-pressed="${i[0] === cur}">${i[1]}</button>`).join(''); };
  function draw() {
    chips(document.getElementById('fJ'), [['Semua', 'Semua jenis'], ['KKNI', 'KKNI'], ['Okupasi', 'Okupasi'], ['Klaster', 'Klaster']], J, 'j');
    chips(document.getElementById('fF'), [['Semua', 'Semua fakultas']].concat(Object.keys(F).map(k => [k, F[k]])), K, 'k');
    const list = D.skema.filter(s => (J === 'Semua' || s.jenis === J) && (K === 'Semua' || s.fak === K));
    document.getElementById('rows').innerHTML = list.map(s => `<a class="skema-row" href="#${s.id}"><span class="jenis">${s.jenis}</span><div><h3>${esc(s.nama)}</h3><div class="meta">${esc(window.tukNama(s.tuk))}</div></div><span class="meta">${esc(F[s.fak])}</span><span class="go">Persyaratan</span></a>`).join('') || '<p class="muted" style="padding:20px 0">Belum ada skema untuk pilihan ini.</p>';
  }
  document.getElementById('fJ').addEventListener('click', e => { const c = e.target.closest('[data-j]'); if (c) { J = c.dataset.j; draw(); } });
  document.getElementById('fF').addEventListener('click', e => { const c = e.target.closest('[data-k]'); if (c) { K = c.dataset.k; draw(); } });
  draw();
  function detail() {
    document.querySelector('.drawer-back')?.remove();
    const s = D.skema.find(x => x.id === location.hash.slice(1)); if (!s) return;
    document.body.insertAdjacentHTML('beforeend', `<div class="drawer-back"><div class="drawer" role="dialog" aria-modal="true" aria-labelledby="dT"><button class="close" type="button" aria-label="Tutup">×</button>
      <div class="jenis" style="color:var(--red);font-weight:700;font-size:.85rem">${s.jenis} · ${esc(F[s.fak])}</div><h2 id="dT" style="font-size:1.5rem">${esc(s.nama)}</h2>
      <dl class="kv"><dt>Tempat uji</dt><dd>${esc(window.tukNama(s.tuk))}</dd><dt>Asesor</dt><dd>${esc(s.asesor)}<br><span class="muted" style="font-weight:400">No. Reg. MET ${esc(s.met)}</span></dd><dt>Jadwal</dt><dd>Sabtu, 17 Oktober 2026</dd></dl>
      <h3>Persyaratan dasar</h3><ol>${s.syarat.map(x => `<li>${esc(x)}</li>`).join('')}</ol>
      <p class="notice">Formulir FR.APL.01 dan FR.APL.02 skema ini dicetak, diisi dengan tulisan tangan, lalu diunggah saat mendaftar di SIPINTAR.</p>
      <div style="display:flex;gap:10px;flex-wrap:wrap;margin-top:16px"><a class="btn" href="${SIP}#/jadwal" target="_blank" rel="noopener">Daftar skema ini</a><a class="btn ghost" href="${SIP}#/dokumen/${s.id}" target="_blank" rel="noopener">Unduh formulir</a></div></div></div>`);
    const back = document.querySelector('.drawer-back');
    const close = () => { history.replaceState(null, '', location.pathname); back.remove(); };
    back.addEventListener('click', e => { if (e.target === back || e.target.closest('.close')) close(); });
    back.querySelector('.close').focus();
  }
  window.addEventListener('hashchange', detail); detail();
})();
</script>''')

# ---------------- ALUR ----------------
page('alur.html', 'Alur & persyaratan', 'sertifikasi', 'Sertifikasi / Alur', 'Alur sertifikasi',
 'Sepuluh langkah pelayanan sesuai SOP XVII/SOP-PKS, dari informasi skema sampai pengendalian rekaman.',
 '''  <section class="section"><div class="wrap two">
    <div class="prose">
      <h2>Yang dilakukan asesi</h2>
      <ol>
        <li><b>Pilih skema</b> yang sesuai program studi dan baca persyaratannya.</li>
        <li><b>Siapkan berkas</b>: FR.APL.01 dan FR.APL.02 skema (dicetak, diisi tulisan tangan, ditandatangani), KTP, pas foto, KHS, surat keterangan aktif, dan bukti pendukung.</li>
        <li><b>Daftar di SIPINTAR</b>, unggah berkas, simpan nomor registrasi.</li>
        <li><b>Tunggu pemeriksaan kelengkapan</b>. Bila belum lengkap, unggah ulang dari menu Status.</li>
        <li><b>Datang verifikasi langsung</b> dengan membawa seluruh berkas asli.</li>
        <li><b>Ikuti uji kompetensi</b> sesuai jadwal, asesor, dan TUK yang diumumkan melalui email.</li>
        <li><b>Terima hasil</b>. Asesi yang kompeten menerima sertifikat; yang belum kompeten dapat mengajukan banding.</li>
      </ol>
      <h2>Sepuluh langkah pelayanan LSP</h2>
      <div class="table-wrap"><table class="table"><thead><tr><th>Langkah</th><th>Penanggung jawab</th></tr></thead><tbody>
        <tr><td>1. Pelayanan informasi</td><td>Sekretariat LSP</td></tr><tr><td>2. Penerimaan permohonan sertifikasi</td><td>Bagian Administrasi</td></tr>
        <tr><td>3. Verifikasi persyaratan peserta</td><td>Bagian Sertifikasi</td></tr><tr><td>4. Penjadwalan sertifikasi</td><td>Bagian Sertifikasi</td></tr>
        <tr><td>5. Pelayanan administrasi asesmen</td><td>Sekretariat LSP</td></tr><tr><td>6. Pelaksanaan pelayanan sertifikasi</td><td>Bagian Sertifikasi</td></tr>
        <tr><td>7. Penyampaian hasil sertifikasi</td><td>Bagian Sertifikasi</td></tr><tr><td>8. Penyerahan sertifikat kompetensi</td><td>Bagian Administrasi</td></tr>
        <tr><td>9. Penanganan keluhan pelayanan</td><td>Bagian Manajemen Mutu</td></tr><tr><td>10. Pengendalian rekaman pelayanan</td><td>Sekretariat LSP</td></tr>
      </tbody></table></div>
      <h2>Hak asesi</h2>
      <ul><li>Mendapat informasi skema, jadwal, dan biaya secara jelas.</li><li>Diases secara adil oleh asesor yang tidak memiliki konflik kepentingan.</li><li>Mengajukan banding atas keputusan asesmen dan menyampaikan keluhan pelayanan.</li><li>Kerahasiaan data dan hasil asesmen.</li></ul>
    </div>
    <aside class="aside">
      <div class="box"><h3>Mulai sekarang</h3><p class="muted" style="font-size:.93rem">Pendaftaran gelombang ini dibuka sampai 14 Oktober 2026.</p><a class="btn sm" href="https://lsp-unimed.github.io/sipintar/#/jadwal" target="_blank" rel="noopener">Daftar di SIPINTAR</a></div>
      <div class="box"><h3>Butuh bantuan?</h3><ul><li><a href="https://lsp-unimed.github.io/sipintar/#/status" target="_blank" rel="noopener">Lacak status permohonan</a></li><li><a href="https://lsp-unimed.github.io/sipintar/#/banding" target="_blank" rel="noopener">Ajukan banding</a></li><li><a href="https://lsp-unimed.github.io/sipintar/#/keluhan" target="_blank" rel="noopener">Sampaikan keluhan</a></li></ul></div>
    </aside>
  </div></section>
''')

# ---------------- ASESOR & TUK ----------------
page('asesor-tuk.html', 'Asesor & TUK', 'data', 'Asesor & TUK', 'Asesor dan tempat uji kompetensi',
 'Asesor kompetensi teregistrasi BNSP dan tempat uji yang telah diverifikasi untuk setiap skema.',
 '''  <section class="section"><div class="wrap">
    <h2>Asesor kompetensi</h2>
    <div class="table-wrap" style="margin-bottom:40px"><table class="table"><thead><tr><th>Nama asesor</th><th>No. Reg. MET</th><th>Skema yang diampu</th></tr></thead><tbody id="as"></tbody></table></div>
    <h2>Tempat uji kompetensi</h2>
    <div class="table-wrap"><table class="table"><thead><tr><th>Kode</th><th>Tempat uji</th><th>Penanggung jawab</th></tr></thead><tbody id="tk"></tbody></table></div>
  </div></section>
''', '''<script>
(function () {
  const D = window.LSP_DATA, esc = window.esc;
  document.getElementById('as').innerHTML = D.skema.map(s => `<tr><td><b>${esc(s.asesor)}</b></td><td>${esc(s.met)}</td><td>${esc(s.nama)}</td></tr>`).join('');
  document.getElementById('tk').innerHTML = D.tuk.map(t => `<tr><td>${esc(t.id)}</td><td><b>${esc(t.nama)}</b></td><td>${esc(t.pj)}</td></tr>`).join('');
})();
</script>''')

# ---------------- VERIFIKASI ----------------
page('verifikasi.html', 'Cek sertifikat', 'verifikasi', 'Cek sertifikat', 'Cek keaslian sertifikat',
 'Untuk perusahaan, instansi, dan pemegang sertifikat yang ingin memastikan sertifikat kompetensi diterbitkan melalui LSP UNIMED.',
 '''  <section class="section"><div class="wrap two">
    <div>
      <form id="fV" class="form" style="max-width:560px"><label>Nomor sertifikat<input id="no" placeholder="mis. 62090 2611 3 0000123 2026" autocomplete="off"></label><label>Nama pemegang (opsional)<input id="nm" placeholder="Sesuai yang tertulis di sertifikat"></label><div><button class="btn" type="submit">Cek sertifikat</button></div></form>
      <div id="out" style="max-width:560px"></div>
    </div>
    <aside class="aside"><div class="box"><h3>Cara membaca nomor</h3><p class="muted" style="font-size:.93rem">Nomor sertifikat tercetak di bagian depan sertifikat kompetensi. Seluruh sertifikat BNSP juga dapat diperiksa melalui laman resmi BNSP.</p><a href="https://bnsp.go.id" target="_blank" rel="noopener">www.bnsp.go.id</a></div>
      <div class="notice">Versi demo: coba nomor <b>62090 2611 3 0000123 2026</b>. Pada versi akhir, data diambil dari SIPINTAR.</div></aside>
  </div></section>
''', '''<script>
document.getElementById('fV').addEventListener('submit', (e) => {
  e.preventDefault();
  const v = document.getElementById('no').value.trim(), out = document.getElementById('out'), esc = window.esc;
  if (!v) { out.innerHTML = '<div class="result no">Masukkan nomor sertifikat.</div>'; return; }
  const hit = window.CONTOH_SERTIFIKAT.find(s => s.no.replace(/\\s/g, '') === v.replace(/\\s/g, ''));
  out.innerHTML = hit ? `<div class="result ok"><b>Sertifikat terdaftar di LSP UNIMED</b><dl><dt>Nomor</dt><dd>${esc(hit.no)}</dd><dt>Nama</dt><dd>${esc(hit.nama)}</dd><dt>Skema</dt><dd>${esc(hit.skema)}</dd><dt>Berlaku sampai</dt><dd>${esc(hit.sampai)}</dd></dl></div>`
    : '<div class="result no"><b>Nomor tidak ditemukan.</b> Periksa kembali penulisan nomor, atau hubungi lspunimed@unimed.ac.id.</div>';
});
</script>''')

# ---------------- BERITA ----------------
page('berita.html', 'Berita', 'berita', 'Berita', 'Berita dan kegiatan',
 'Kabar terbaru tentang uji kompetensi, asesor, dan kerja sama LSP UNIMED.',
 '''  <section class="section"><div class="wrap two"><div id="art"></div><aside class="aside"><div class="box"><h3>Berita lainnya</h3><ul id="lst"></ul></div></aside></div></section>
''', '''<script>
(function () {
  const B = window.BERITA, esc = window.esc;
  function show() {
    const b = B.find(x => x.id === location.hash.slice(1)) || B[0];
    document.getElementById('art').innerHTML = `<article class="prose"><img src="assets/img/${b.img}" alt="" style="border-radius:16px;margin-bottom:16px"><div class="date-line">${window.tglID(b.tgl)}</div><h2 style="margin-top:6px">${esc(b.judul)}</h2>${b.isi.map(p => `<p>${esc(p)}</p>`).join('')}</article>`;
    document.getElementById('lst').innerHTML = B.filter(x => x !== b).map(x => `<li><a href="#${x.id}">${esc(x.judul)}</a><br><span class="date-line">${window.tglID(x.tgl)}</span></li>`).join('');
    window.scrollTo(0, 0);
  }
  window.addEventListener('hashchange', show); show();
})();
</script>''')

# ---------------- KONTAK ----------------
page('kontak.html', 'Kontak', 'kontak', 'Kontak', 'Hubungi kami',
 'Sekretariat LSP UNIMED melayani pertanyaan seputar skema, pendaftaran, dan sertifikat pada hari kerja.',
 '''  <section class="section"><div class="wrap contact-grid">
    <div>
      <dl class="kv" style="grid-template-columns:110px 1fr"><dt>Alamat</dt><dd>Kantor LSP UNIMED, Gedung 18 Fakultas Teknik<br>Jl. Willem Iskandar Pasar V, Medan Estate, Medan</dd><dt>Email</dt><dd><a href="mailto:lspunimed@unimed.ac.id">lspunimed@unimed.ac.id</a></dd><dt>Telepon</dt><dd>(061) 6625971</dd><dt>HP</dt><dd>0812-6405-075</dd><dt>Jam layanan</dt><dd>Senin–Jumat, 08.00–16.00 WIB</dd></dl>
      <div class="map-ph" role="img" aria-label="Peta lokasi (gambar contoh)"></div>
    </div>
    <div>
      <h2 style="font-size:1.4rem">Kirim pertanyaan</h2>
      <p class="muted">Untuk keluhan pelayanan atau banding asesmen, gunakan menu di SIPINTAR agar mendapat nomor tiket.</p>
      <form class="form" id="fK"><label>Nama<input required></label><label>Email<input type="email" required></label><label>Pertanyaan<textarea rows="5" required></textarea></label><div><button class="btn" type="submit">Kirim pertanyaan</button></div><div id="kOut"></div></form>
    </div>
  </div></section>
''', '''<script>document.getElementById('fK').addEventListener('submit', e => { e.preventDefault(); document.getElementById('kOut').innerHTML = '<div class="result ok">Versi demo: pertanyaan tidak dikirim. Pada versi akhir, pertanyaan diteruskan ke email sekretariat.</div>'; });</script>''')
print('ok')
