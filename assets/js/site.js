/* LSP UNIMED — kerangka bersama (header, footer, menu) untuk semua halaman demo. */
(function () {
  'use strict';

  // Alamat tiga laman. Saat domain resmi siap, cukup ganti di sini.
  const URL = {
    utama: 'index.html',
    sipintar: 'https://lsp-unimed.github.io/sipintar/',
    arsip: 'arsip/index.html'
  };
  const LSP = {
    nama: 'LSP Universitas Negeri Medan',
    lisensi: 'BNSP-LSP-1928-ID',
    sk: 'KEP.0650/BNSP/IV/2021',
    alamat: 'Kampus FT UNIMED, Jl. Willem Iskandar Pasar V, Medan Estate, Medan',
    telp: '(061) 6625971',
    hp: '0812-6405-075',
    email: 'lspunimed@unimed.ac.id'
  };
  window.LSP_SITE = { URL, LSP };

  const page = document.body.dataset.page || '';
  const root = document.body.dataset.root || '';
  const esc = (s) => String(s == null ? '' : s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  window.esc = esc;

  const menu = [
    ['beranda', 'Beranda', 'index.html'],
    ['profil', 'Profil', null, [
      ['profil.html', 'Tentang LSP', 'Sejarah, visi, misi, kebijakan mutu'],
      ['profil.html#struktur', 'Struktur organisasi', 'Dewan pengarah dan pelaksana'],
      ['profil.html#lisensi', 'Lisensi BNSP', 'Nomor lisensi dan ruang lingkup']]],
    ['sertifikasi', 'Sertifikasi', null, [
      ['skema.html', 'Skema sertifikasi', '16 skema KKNI, okupasi, dan klaster'],
      ['alur.html', 'Alur & persyaratan', 'Dari pendaftaran sampai sertifikat'],
      [URL.sipintar, 'Daftar uji kompetensi', 'Layanan daring SIPINTAR']]],
    ['data', 'Asesor & TUK', 'asesor-tuk.html'],
    ['verifikasi', 'Cek sertifikat', 'verifikasi.html'],
    ['berita', 'Berita', 'berita.html'],
    ['kontak', 'Kontak', 'kontak.html']
  ];
  const href = (h) => /^https?:/.test(h) ? h : root + h;

  const nav = menu.map(m => m[3]
    ? `<div class="dd${page === m[0] ? ' on' : ''}"><button type="button" aria-expanded="false">${m[1]}</button><div class="dd-menu">${m[3].map(s => `<a href="${href(s[0])}"${/^https?:/.test(s[0]) ? ' target="_blank" rel="noopener"' : ''}>${esc(s[1])}<small>${esc(s[2])}</small></a>`).join('')}</div></div>`
    : `<a href="${href(m[2])}" class="${page === m[0] ? 'on' : ''}">${m[1]}</a>`).join('');

  document.body.insertAdjacentHTML('afterbegin', `
    <div class="demo-flag">Versi demo — konten dan gambar contoh, belum untuk publikasi resmi.</div>
    <div class="topbar"><div class="wrap">
      <span class="lic"><i aria-hidden="true"></i>Lembaga Sertifikasi Profesi P1 berlisensi BNSP · ${LSP.lisensi}</span>
      <span><a href="mailto:${LSP.email}">${LSP.email}</a> &nbsp; ${LSP.telp}</span>
    </div></div>
    <header class="site-header"><div class="wrap">
      <a class="brand" href="${href('index.html')}"><img src="${root}assets/img/logo-lsp.png" alt=""><span><b>LSP UNIMED</b><span>Lembaga Sertifikasi Profesi Universitas Negeri Medan</span></span></a>
      <nav class="nav" aria-label="Menu utama">${nav}</nav>
      <a class="btn sm cta" href="${URL.sipintar}" target="_blank" rel="noopener">Layanan SIPINTAR</a>
      <button class="menu-btn" type="button" aria-label="Buka menu">☰</button>
    </div></header>`);

  document.body.insertAdjacentHTML('beforeend', `
    <footer class="site-footer"><div class="wrap">
      <div class="foot-grid">
        <div>
          <div class="foot-logos"><img src="${root}assets/img/logo-unimed.png" alt="Universitas Negeri Medan"><img src="${root}assets/img/logo-lsp.png" alt="LSP UNIMED"><img src="${root}assets/img/logo-bnsp.png" alt="BNSP"></div>
          <b>${LSP.nama}</b>
          <p>${LSP.alamat}</p>
          <p>Berlisensi Badan Nasional Sertifikasi Profesi<br>No. ${LSP.lisensi} · SK ${LSP.sk}<br><a href="https://bnsp.go.id" target="_blank" rel="noopener">www.bnsp.go.id</a></p>
        </div>
        <div><b>Sertifikasi</b><ul>
          <li><a href="${href('skema.html')}">Skema sertifikasi</a></li><li><a href="${href('alur.html')}">Alur & persyaratan</a></li>
          <li><a href="${href('asesor-tuk.html')}">Asesor & TUK</a></li><li><a href="${href('verifikasi.html')}">Cek sertifikat</a></li></ul></div>
        <div><b>Layanan daring</b><ul>
          <li><a href="${URL.sipintar}" target="_blank" rel="noopener">SIPINTAR — pendaftaran & status</a></li>
          <li><a href="${URL.sipintar}#/keluhan" target="_blank" rel="noopener">Sampaikan keluhan</a></li>
          <li><a href="${URL.sipintar}#/banding" target="_blank" rel="noopener">Ajukan banding</a></li>
          <li><a href="${href(URL.arsip)}">Arsip dokumen (petugas)</a></li></ul></div>
        <div><b>Kontak</b><ul>
          <li><a href="mailto:${LSP.email}">${LSP.email}</a></li><li>Telp. ${LSP.telp}</li><li>HP ${LSP.hp}</li><li>Senin–Jumat, 08.00–16.00 WIB</li></ul></div>
      </div>
      <div class="foot-bottom"><span>© 2026 ${LSP.nama}</span><span><a href="${href('peta-ekosistem.html')}">Peta sistem web LSP</a></span></div>
    </div></footer>`);

  // menu HP & dropdown
  document.querySelector('.menu-btn').addEventListener('click', () => document.body.classList.toggle('nav-open'));
  document.querySelectorAll('.dd > button').forEach(b => b.addEventListener('click', (e) => {
    e.stopPropagation();
    const dd = b.parentElement, open = !dd.classList.contains('open');
    document.querySelectorAll('.dd.open').forEach(x => { x.classList.remove('open'); x.firstElementChild.setAttribute('aria-expanded', 'false'); });
    if (open) { dd.classList.add('open'); b.setAttribute('aria-expanded', 'true'); }
  }));
  document.addEventListener('click', () => document.querySelectorAll('.dd.open').forEach(x => x.classList.remove('open')));
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape') { document.querySelectorAll('.dd.open').forEach(x => x.classList.remove('open')); document.body.classList.remove('nav-open'); } });

  // util bersama
  window.FAKULTAS = {
    FT: 'Fakultas Teknik', FE: 'Fakultas Ekonomi', FIS: 'Fakultas Ilmu Sosial', FIP: 'Fakultas Ilmu Pendidikan', FIK: 'Fakultas Ilmu Keolahragaan'
  };
  window.tukNama = (id) => ((window.LSP_DATA.tuk.find(t => t.id === id) || {}).nama || id);
})();
