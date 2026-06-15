# 📊 Kalkulator IP & IPK - Universal

Website kalkulator IP Semester dan IPK yang universal, dapat digunakan oleh mahasiswa dari berbagai program studi, jurusan, fakultas, dan kampus.

## 🎯 Fitur Utama

### 1. **Data Diri Mahasiswa** (Opsional)
- Nama Mahasiswa
- NIM / NPM
- Program Studi
- Semester
- Nama Kampus / Universitas

### 2. **Manajemen Mata Kuliah**
- **Tambah Mata Kuliah**: Tambahkan mata kuliah baru dengan fleksibel
- **Edit Mata Kuliah**: Ubah detail mata kuliah yang sudah ditambahkan
- **Hapus Mata Kuliah**: Hapus mata kuliah dari daftar
- **Tampilan Kartu**: Setiap mata kuliah ditampilkan dalam format kartu yang informatif

### 3. **Input Data Mata Kuliah**
- **Nama Mata Kuliah**: Nama bebas sesuai program studi
- **SKS (Satuan Kredit Semester)**: Jumlah kredit mata kuliah
- **Nilai Huruf**: Pilih dari A, AB, B, BC, C, D, E
- **Bobot Nilai Otomatis**: Sistem akan menghitung bobot nilai berdasarkan skala
- **Mutu Otomatis**: Mutu = SKS × Bobot Nilai

### 4. **Sistem Nilai Fleksibel**
Bobot nilai default (dapat dikustomisasi):
- **A** = 4.00
- **AB** = 3.50
- **B** = 3.00
- **BC** = 2.50
- **C** = 2.00
- **D** = 1.00
- **E** = 0.00

### 5. **Pengaturan Bobot Nilai**
Setiap kampus memiliki sistem penilaian yang berbeda. Website ini memungkinkan:
- Mengubah bobot nilai sesuai sistem kampus Anda
- Reset ke bobot default jika diperlukan
- Perubahan bobot akan langsung mempengaruhi perhitungan

### 6. **Perhitungan Lengkap**
Website menghitung dan menampilkan:

#### IP Semester Ini:
- Total SKS Semester
- Total Mutu Semester
- **IP Semester** = Total Mutu Semester / Total SKS Semester

#### IPK Kumulatif:
- Total SKS Kumulatif (semester ini + sebelumnya)
- Total Mutu Kumulatif (semester ini + sebelumnya)
- **IPK Akhir** = Total Mutu Kumulatif / Total SKS Kumulatif

### 7. **Data Semester Sebelumnya**
Isi data ini untuk menghitung IPK kumulatif:
- Total SKS Sebelumnya
- IPK Sebelumnya

### 8. **Manajemen Data**
- **💾 Simpan Data**: Simpan semua data ke localStorage
- **📂 Muat Data Tersimpan**: Muat data yang sebelumnya disimpan
- **🗑️ Reset Semua Data**: Hapus semua data (tidak bisa dikembalikan)

### 9. **Export & Print**
- **🖨️ Print Hasil**: Cetak atau simpan sebagai PDF menggunakan fitur print browser
- **📄 Export PDF**: Generate laporan terformat dengan detail lengkap

### 10. **Validasi Input**
Website melakukan validasi:
- SKS minimal harus 1
- Nama mata kuliah tidak boleh kosong
- Nilai harus dipilih
- IP dan IPK maksimal 4.00
- Total SKS tidak boleh 0

## 🎨 Desain UI/UX

### Tema Warna
- **Hijau Utama**: #16a34a (Tombol, header, highlight)
- **Putih**: Background card dan layout utama
- **Abu-abu Soft**: f3f4f6 (Elemen sekunder, input)

### Layout
- **Navigation Tabs**: Sidebar dengan 4 tab utama
  - 👤 Identitas
  - 📚 Mata Kuliah
  - ⚙️ Pengaturan
  - 📈 Hasil

- **Card Layout**: Setiap section dalam card yang rapi
- **Result Cards**: Hasil perhitungan dalam format card yang highlight

### Responsif
- Desktop: Sidebar + Main content side-by-side
- Tablet (≤1024px): Sidebar berubah menjadi horizontal tab
- Mobile (≤768px): Semua elemen menyesuaikan untuk layar kecil
- Micro (≤480px): Layout yang sangat compact

## 📖 Cara Menggunakan

### Langkah 1: Isi Data Diri (Opsional)
1. Klik tab "Identitas"
2. Isi nama, NIM, program studi, semester, dan kampus
3. Data ini opsional dan digunakan untuk dokumentasi

### Langkah 2: Tambah Mata Kuliah
1. Klik tab "Mata Kuliah"
2. Klik tombol "+ Tambah Mata Kuliah"
3. Isi form:
   - Nama Mata Kuliah
   - SKS
   - Nilai Huruf
4. Klik "Simpan"
5. Ulangi untuk mata kuliah lainnya

### Langkah 3: Isi Data Sebelumnya (Jika ada)
1. Di tab "Identitas", scroll ke bawah
2. Isi "Total SKS Sebelumnya" dan "IPK Sebelumnya"
3. Sistem akan otomatis menghitung IPK kumulatif

### Langkah 4: Lihat Hasil
1. Klik tab "Hasil"
2. Lihat perhitungan IP Semester dan IPK Akhir
3. Rumus perhitungan ditampilkan untuk referensi

### Langkah 5: Sesuaikan Bobot (Jika Perlu)
1. Klik tab "Pengaturan"
2. Ubah bobot nilai sesuai sistem kampus Anda
3. Klik "Reset ke Default" jika ingin kembali ke default

### Langkah 6: Simpan Data
1. Tab "Pengaturan" → Klik "Simpan Data"
2. Data akan tersimpan di browser Anda
3. Reload halaman, data akan otomatis dimuat

### Langkah 7: Export/Print
1. Tab "Pengaturan" → Klik "Print Hasil" atau "Export PDF"
2. Browser akan membuka dialog print/save
3. Atur pengaturan dan print/save sesuai kebutuhan

## 🛠️ Teknologi

Aplikasi ini dibuat menggunakan:
- **HTML5**: Struktur semantik yang bersih
- **CSS3**: Styling modern dengan Grid, Flexbox, dan Media Queries
- **JavaScript (Vanilla)**: Logic tanpa framework/library eksternal

### File Structure
```
index.html    - Struktur HTML
style.css     - Stylesheet (responsive)
script.js     - Logic aplikasi
README.md     - Dokumentasi ini
```

## 💾 Penyimpanan Data

Aplikasi menggunakan **localStorage** browser untuk menyimpan data:
- Semua data disimpan lokal di perangkat Anda
- Data tidak dikirim ke server
- Simpan data sebelum menutup tab/browser untuk keamanan
- Clear browser cache akan menghapus semua data

## ⚙️ Pengaturan Sistem Bobot

### Cara Mengubah Bobot Nilai

1. Buka tab "Pengaturan"
2. Lihat section "Pengaturan Bobot Nilai"
3. Setiap nilai (A, AB, B, BC, C, D, E) memiliki input field
4. Ubah nilai sesuai sistem kampus Anda
5. Perubahan langsung berlaku untuk perhitungan

### Contoh Sistem Bobot Berbeda

**Sistem ITS (Default):**
- A = 4.00, AB = 3.50, B = 3.00, BC = 2.50, C = 2.00, D = 1.00, E = 0.00

**Sistem Universitas Negeri:**
- A = 4.00, B+ = 3.50, B = 3.00, C+ = 2.50, C = 2.00, D = 1.00, E = 0.00

**Sistem 4 Skala:**
- A = 4.00, B = 3.00, C = 2.00, D = 1.00, E = 0.00
- (Gunakan nilai yang sama untuk A=AB, B=BC, dll)

## 🐛 Fitur Validasi

Website melakukan pengecekan:

1. **Input Mata Kuliah**
   - ✅ SKS minimal 1
   - ✅ Nama tidak boleh kosong
   - ✅ Nilai harus dipilih

2. **Perhitungan**
   - ✅ Total SKS tidak boleh 0 untuk menghitung IP
   - ✅ IP dan IPK di-cap maksimal 4.00
   - ✅ Format 2 desimal untuk nilai desimal

3. **Notifikasi**
   - ✅ Notifikasi sukses (hijau) untuk operasi berhasil
   - ✅ Notifikasi error (merah) untuk input tidak valid
   - ✅ Notifikasi warning (kuning) untuk peringatan

## 📱 Responsive Design

Aplikasi fully responsive:

- **Desktop (>1024px)**: Sidebar + Main content
- **Tablet (768px - 1024px)**: Horizontal tabs
- **Mobile (480px - 768px)**: Vertical layout
- **Micro (<480px)**: Compact mobile layout

Hasil perhitungan tetap jelas dibaca di semua ukuran layar.

## 🚀 Tips Penggunaan

1. **Simpan Data Secara Berkala**
   - Klik "Simpan Data" setelah menambah/mengubah mata kuliah
   - Jangan lupa simpan sebelum menutup browser

2. **Backup Data**
   - Gunakan fitur screenshot/print untuk backup visual
   - Export PDF untuk dokumentasi formal

3. **Penghitungan IPK**
   - Pastikan isi "IPK Sebelumnya" dengan benar
   - Sistem akan otomatis menghitung IPK kumulatif

4. **Edit & Update**
   - Klik "Edit" pada kartu mata kuliah untuk mengubah
   - Perubahan langsung mempengaruhi perhitungan

5. **Multi-browser**
   - Data tersimpan per-browser (localStorage)
   - Jika ganti browser, data tidak terbawa

## ⚠️ Catatan Penting

- Aplikasi ini adalah kalkulator lokal (tidak ada koneksi internet)
- Data hanya tersimpan di perangkat Anda
- Jangan lupa simpan data secara berkala
- Hasil perhitungan mengikuti rumus IP/IPK umum
- Verifikasi hasil dengan akademik kampus Anda

## 📞 Dukungan

Jika menemukan bug atau error:
1. Reload halaman (F5)
2. Clear cache browser
3. Cek input data
4. Verifikasi bobot nilai dengan kampus

## 📄 Lisensi

Aplikasi ini bebas digunakan untuk keperluan akademik.

---

**Kalkulator IP & IPK Universal** - Dibuat untuk memudahkan mahasiswa dari semua program studi menghitung IP dan IPK dengan cepat dan akurat.
