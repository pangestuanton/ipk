# IP & IPK Calculator

Website berbasis data untuk menghitung IP dan IPK mahasiswa yang bersifat general untuk semua prodi dan kampus.

## Fitur Utama

- **Identitas Mahasiswa**: Input data diri lengkap (NIM, Nama, Prodi, Kampus, Semester, Tahun Akademik).
- **Input Mata Kuliah Dinamis**: Tambah, edit, dan hapus mata kuliah secara bebas.
- **Sistem Nilai Fleksibel**: Bobot nilai dapat diubah di pengaturan untuk menyesuaikan standar kampus.
- **Perhitungan Otomatis**: Menghitung IP Semester dan IPK Kumulatif secara real-time.
- **Penyimpanan Data**: Menggunakan localStorage agar data tersimpan di browser tanpa backend.
- **Riwayat Perhitungan**: Simpan, buka kembali, edit, dan hapus riwayat perhitungan.
- **Pencarian Riwayat**: Cari berdasarkan nama, prodi, semester, atau kampus.
- **Export/Print**: Cetak hasil perhitungan.

## Cara Menjalankan

1. Clone atau download repository ini.
2. Buka folder project di terminal.
3. Jalankan server Node.js:
   ```bash
   node server.js
   ```
4. Buka browser dan akses `http://localhost:8080`.

## Struktur File

- `index.html` - Halaman utama HTML.
- `style.css` - Desain dan tata letak CSS.
- `script.js` - Logika JavaScript (perhitungan, penyimpanan, dll).
- `server.js` - Server Node.js sederhana untuk menjalankan website.

## Teknologi

- HTML5
- CSS3 (Flexbox, Grid)
- JavaScript (ES6+)
- LocalStorage (Penyimpanan data sisi klien)

## Penyimpanan Data

Data disimpan di `localStorage` browser dengan struktur JSON:

- `ipk_history`: Array berisi data perhitungan.
- `ipk_grades`: Objek berisi konfigurasi bobot nilai.

## Rumus Perhitungan

- **Mutu** = SKS × Bobot Nilai
- **IP Semester** = Total Mutu Semester / Total SKS Semester
- **Total Mutu Sebelumnya** = Total SKS Sebelumnya × IPK Sebelumnya
- **IPK Akhir** = Total Mutu Kumulatif / Total SKS Kumulatif

## Pengembangan Lebih Lanjut

Website ini siap dikembangkan menjadi aplikasi akademik yang lebih lengkap dengan fitur tambahan seperti:
- Integrasi backend (Supabase, Firebase, dll).
- Multi-user dengan autentikasi.
- Dashboard statistik.
- Export ke PDF/Excel.

## Lisensi

MIT License
