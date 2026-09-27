# LilitanTrafo

Aplikasi web statis dan Progressive Web App (PWA) untuk perhitungan teknis perbaikan & rewinding lilitan transformator distribusi 3 fasa.

## Fitur Utama

- **Kalkulator Rumus 1 (PT Mulya Jatra)**:
  - Jumlah Lilitan Sekunder (TR)
  - Jumlah Lilitan Primer (TM)
  - Jumlah Antar Tap Primer
  - Selisih / Kelebihan / Kekurangan Lilitan
- **Kalkulator Rumus 2 (Standar Jurnal)**:
  - Rasio Tegangan Antar Tap (X)
  - Jumlah Lilitan Sekunder (Ns)
  - Jumlah Lilitan Primer (Np)
  - Jumlah Lilitan Dalam Satu Lapis (Ny)
  - Jumlah Lapisan Lilitan (Nl)
- **Progressive Web App (PWA)**:
  - Dapat diinstal di desktop dan perangkat seluler.
  - Mendukung akses offline menggunakan Service Worker.
- **Penyimpanan Lokal**:
  - Menyimpan data trafo dan arsip hasil perhitungan di `localStorage`.
- **Antarmuka Pengguna**:
  - Mode Tema Terang / Gelap (Light / Dark mode).
  - Tampilan responsif untuk desktop dan perangkat seluler (HP).

## Teknologi

- HTML5
- CSS3 (Vanilla CSS)
- JavaScript (ES6+)
- Service Worker & Web App Manifest

## Struktur Proyek

```text
lilitan_trafo/
├── css/
│   └── style.css
├── js/
│   ├── app.js
│   ├── formula-1.js
│   └── formula-2.js
├── img/
│   ├── icon-192.png
│   ├── icon-512.png
│   └── Transformator.png
├── index.html
├── data-info-1.html
├── data-info-2.html
├── formula-1.html
├── formula-2.html
├── archive.html
├── manifest.json
├── sw.js
└── README.md
```

## Cara Menjalankan

Buka file `index.html` langsung di browser, atau jalankan menggunakan web server lokal:

```bash
npx http-server . -p 8080
```
