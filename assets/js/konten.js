/* Konten contoh untuk demo: berita dan sertifikat. Semua isi bersifat contoh. */
(function () {
  const root = document.body.dataset.root || '';
  window.BERITA = [
    { id: 'penyaksian-bnsp-2026', tgl: '2026-10-17', judul: 'Uji kompetensi perdana 16 skema disaksikan BNSP', img: 'dummy-1.svg',
      ringkas: 'LSP UNIMED menyelenggarakan uji kompetensi untuk 16 skema sekaligus di 12 TUK kampus, disaksikan langsung oleh tim BNSP.',
      isi: ['Lembaga Sertifikasi Profesi Universitas Negeri Medan menyelenggarakan uji kompetensi perdana untuk 16 skema sertifikasi pada Sabtu, 17 Oktober 2026. Uji kompetensi berlangsung serentak di 12 Tempat Uji Kompetensi yang tersebar di lima fakultas.',
        'Kegiatan ini disaksikan oleh tim Badan Nasional Sertifikasi Profesi sebagai bagian dari proses penyaksian. Seluruh tahapan, mulai dari pendaftaran, verifikasi berkas, hingga penetapan asesor dan TUK, dilakukan melalui layanan daring SIPINTAR.',
        'Ketua LSP UNIMED menyampaikan bahwa sertifikasi kompetensi menjadi bekal penting bagi lulusan UNIMED untuk bersaing di dunia kerja. (Berita contoh untuk demo.)'] },
    { id: 'workshop-asesor', tgl: '2026-10-03', judul: 'Workshop penyusunan materi uji kompetensi bersama asesor', img: 'dummy-2.svg',
      ringkas: 'Asesor dari lima fakultas menyelaraskan perangkat asesmen sebelum pelaksanaan uji kompetensi.',
      isi: ['Sebanyak 16 asesor kompetensi mengikuti workshop penyusunan dan validasi materi uji kompetensi (MUK). Workshop membahas keselarasan instrumen asesmen dengan unit kompetensi pada setiap skema.', 'Kegiatan ditutup dengan uji coba perangkat asesmen di beberapa TUK. (Berita contoh untuk demo.)'] },
    { id: 'sosialisasi-skema', tgl: '2026-09-24', judul: 'Sosialisasi skema sertifikasi kepada mahasiswa tingkat akhir', img: 'dummy-3.svg',
      ringkas: 'Mahasiswa diperkenalkan pada skema yang sesuai dengan program studinya serta tata cara pendaftaran.',
      isi: ['LSP UNIMED menggelar sosialisasi skema sertifikasi kepada mahasiswa tingkat akhir dari Fakultas Teknik, Ekonomi, Ilmu Sosial, Ilmu Pendidikan, dan Ilmu Keolahragaan.', 'Mahasiswa diperkenalkan pada persyaratan setiap skema serta cara mendaftar melalui SIPINTAR. (Berita contoh untuk demo.)'] },
    { id: 'verifikasi-tuk', tgl: '2026-09-12', judul: 'Verifikasi kelayakan 12 Tempat Uji Kompetensi', img: 'dummy-4.svg',
      ringkas: 'Tim LSP memeriksa kesiapan sarana, peralatan, dan bahan di setiap TUK sesuai persyaratan skema.',
      isi: ['Verifikasi TUK dilakukan untuk memastikan setiap tempat uji memenuhi persyaratan teknis skema, termasuk peralatan, bahan, dan kondisi keselamatan kerja. (Berita contoh untuk demo.)'] }
  ];
  window.CONTOH_SERTIFIKAT = [
    { no: '62090 2611 3 0000123 2026', nama: 'Andi Pratama', skema: 'Okupasi Web Developer', sampai: '17 Oktober 2029' }
  ];
  const BLN = ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'];
  window.tglID = (s) => { const [y, m, d] = s.split('-').map(Number); return d + ' ' + BLN[m - 1] + ' ' + y; };
  window.renderBeritaRingkas = (el) => {
    const [a, ...rest] = window.BERITA;
    el.innerHTML = `<a class="main" href="${root}berita.html#${a.id}" style="text-decoration:none;color:inherit"><img src="${root}assets/img/${a.img}" alt=""><div class="date-line">${window.tglID(a.tgl)}</div><h3>${window.esc(a.judul)}</h3><p class="muted">${window.esc(a.ringkas)}</p></a>
      <div class="side">${rest.map(b => `<a href="${root}berita.html#${b.id}"><img src="${root}assets/img/${b.img}" alt=""><div><div class="date-line">${window.tglID(b.tgl)}</div><h4>${window.esc(b.judul)}</h4></div></a>`).join('')}</div>`;
  };
})();
