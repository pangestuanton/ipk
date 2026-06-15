# 📊 Kalkulator IP & IPK - Universal

[![License](https://img.shields.io/badge/license-MIT-green.svg)](LICENSE)
[![Status](https://img.shields.io/badge/status-active-success.svg)]()
[![GitHub](https://img.shields.io/badge/github-pangestuanton-blue?logo=github)]()

> **Aplikasi web universal untuk menghitung IP Semester dan IPK** dari mahasiswa berbagai program studi, jurusan, fakultas, dan kampus.

Solusi fleksibel yang **tidak terikat pada satu program studi tertentu**. Cocok digunakan oleh mahasiswa siapa saja untuk menghitung IP dan IPK dengan **cepat, akurat, dan mudah**.

---

## ✨ Keunggulan Utama

- 🎓 **Universal** - Tidak spesifik untuk satu prodi, cocok untuk semua mahasiswa
- ⚙️ **Fleksibel** - Tambah, edit, hapus mata kuliah sesuai kebutuhan
- 🔧 **Customizable** - Sesuaikan bobot nilai dengan sistem kampus Anda  
- 💾 **Persisten** - Simpan data ke browser dengan localStorage
- 📱 **Responsif** - Bekerja sempurna di desktop, tablet, dan mobile
- ⚡ **Cepat** - Tanpa framework eksternal, hanya HTML/CSS/JavaScript
- 🔒 **Aman** - Data tersimpan lokal, tidak dikirim ke server
- 🎨 **Modern** - UI/UX yang bersih dengan tema hijau profesional

---

## 📑 Daftar Isi

- [✨ Keunggulan Utama](#-keunggulan-utama)
- [🚀 Quick Start](#-quick-start)
- [📖 Panduan Lengkap](#-panduan-lengkap)
- [🎯 Fitur Utama](#-fitur-utama)
- [⚙️ Konfigurasi](#️-konfigurasi)
- [🛠️ Teknologi](#️-teknologi)
- [💡 Tips & Trik](#-tips--trik)
- [❓ FAQ](#-faq)
- [📄 Lisensi](#-lisensi)

---

## 🚀 Quick Start

### Cara Cepat Menggunakan (3 Langkah)

```
1. BUKA
   Buka file index.html di browser
   (Tidak perlu instalasi apapun)

2. TAMBAH MATA KULIAH
   Klik "📚 Mata Kuliah" 
   → "+ Tambah Mata Kuliah"
   → Isi data → Simpan

3. LIHAT HASIL
   Klik "📈 Hasil"
   → Lihat IP Semester & IPK
   → Klik "Simpan Data" untuk backup
```

**Itu saja! 🎉**

---

## 📖 Panduan Lengkap

### Tab 1: 👤 Identitas

**Isi data diri Anda (semua opsional):**
- Nama Mahasiswa
- NIM / NPM
- Program Studi  
- Semester
- Nama Kampus

**Isi juga (untuk IPK kumulatif):**
- Total SKS Sebelumnya (dari semester sebelumnya)
- IPK Sebelumnya (dari semester sebelumnya)

### Tab 2: 📚 Mata Kuliah

**Tambah mata kuliah:**
1. Klik "+ Tambah Mata Kuliah"
2. Isi form:
   - **Nama Mata Kuliah** (bebas, sesuai prodi Anda)
   - **SKS** (Satuan Kredit Semester, minimal 1)
   - **Nilai Huruf** (A, AB, B, BC, C, D, E)
3. Klik "Simpan"

**Edit mata kuliah:**
- Pada kartu mata kuliah, klik "✏️ Edit"
- Ubah data → Klik "Simpan"

**Hapus mata kuliah:**
- Pada kartu mata kuliah, klik "🗑️ Hapus"
- Konfirmasi penghapusan

### Tab 3: ⚙️ Pengaturan

#### Pengaturan Bobot Nilai
Setiap kampus memiliki sistem penilaian berbeda. Sesuaikan bobot nilai:

```
Default: A=4.00, AB=3.50, B=3.00, BC=2.50, C=2.00, D=1.00, E=0.00
```

Ubah nilai di field untuk sistem kampus Anda. Perubahan langsung mempengaruhi perhitungan!

#### Manajemen Data
- **💾 Simpan Data** - Simpan ke localStorage browser
- **📂 Muat Data** - Muat data yang tersimpan sebelumnya
- **🗑️ Reset Semua** - Hapus semua data (tidak bisa dipulihkan)

#### Export & Print
- **🖨️ Print Hasil** - Buka dialog print (Ctrl+P)
- **📄 Export PDF** - Generate laporan terformat

### Tab 4: 📈 Hasil

**Ringkasan perhitungan otomatis:**

**IP Semester Ini:**
- Total SKS Semester
- Total Mutu Semester
- **IP Semester** (highlight)

**IPK Kumulatif:**
- Total SKS Kumulatif
- Total Mutu Kumulatif
- **IPK Akhir** (highlight besar)

**Rumus:**
```
Mutu = SKS × Bobot Nilai
IP Semester = Total Mutu Semester / Total SKS Semester
IPK = Total Mutu Kumulatif / Total SKS Kumulatif
```

---

## 🎯 Fitur Utama

### 1. Perhitungan Otomatis
```
Mutu = SKS × Bobot Nilai
IP = Total Mutu / Total SKS
IPK = Total Mutu Kumulatif / Total SKS Kumulatif
```
Sistem menghitung secara real-time saat Anda input data.

### 2. Sistem Nilai Fleksibel
| Nilai | Bobot Default |
|-------|---|
| A | 4.00 |
| AB | 3.50 |
| B | 3.00 |
| BC | 2.50 |
| C | 2.00 |
| D | 1.00 |
| E | 0.00 |

Bobot dapat dikustomisasi sesuai sistem kampus Anda.

### 3. LocalStorage Persistence
- Simpan data ke browser
- Data tetap tersimpan meski reload halaman
- Jangan lupa backup data penting!

### 4. Validasi Input
- ✅ SKS minimal 1
- ✅ Nama mata kuliah tidak kosong
- ✅ Nilai harus dipilih
- ✅ IP & IPK maksimal 4.00
- ✅ Error messages yang jelas

### 5. Responsive Design
- ✅ Desktop optimal
- ✅ Tablet friendly
- ✅ Mobile sempurna
- ✅ Micro responsive

---

## ⚙️ Konfigurasi

### Mengubah Bobot Nilai

1. Tab "Pengaturan" → "Pengaturan Bobot Nilai"
2. Ubah nilai masing-masing huruf
3. Perubahan langsung berlaku
4. Klik "Reset ke Default" jika ingin kembalikan

### Contoh Sistem Bobot Berbeda

**Sistem ITS/IPK Default:**
```
A=4.00, AB=3.50, B=3.00, BC=2.50, C=2.00, D=1.00, E=0.00
```

**Sistem Universitas Negeri:**
```
A=4.00, B+=3.75, B=3.00, B-=2.75, C=2.00, D=1.00, E=0.00
```

**Sistem 4 Skala:**
```
A=4.00, B=3.00, C=2.00, D=1.00, E=0.00
```

---

## 🛠️ Teknologi

**Stack:**
- HTML5 - Struktur semantik
- CSS3 - Modern styling (Grid, Flexbox)
- JavaScript - Vanilla JS (no framework)

**File Structure:**
```
├── index.html    (≈380 lines)   - HTML Structure
├── style.css     (≈700 lines)   - Responsive Styling
├── script.js     (≈740 lines)   - Application Logic
└── README.md     - Dokumentasi
```

**Browser Support:**
- ✅ Chrome/Chromium (recommended)
- ✅ Firefox
- ✅ Safari
- ✅ Edge
- ✅ Opera

**Features:**
- No external dependencies
- No installation required
- 100% offline capable
- Mobile responsive
- Fast loading time

---

## 💡 Tips & Trik

### 1. Simpan Rutin
```
Klik "Simpan Data" setelah update data
Data hanya tersimpan di browser lokal Anda
```

### 2. Backup Important
```
Gunakan "Print Hasil" untuk:
- Cetak laporan IP/IPK
- Simpan sebagai PDF
- Dokumentasi akademik
```

### 3. Custom Bobot Per Kampus
```
Ganti bobot di "Pengaturan"
Perubahan instant, tidak perlu re-input mata kuliah
```

### 4. Multiple Calculations
```
Reset untuk semester baru
Atau input IPK/SKS sebelumnya untuk kumulatif
```

### 5. Share dengan Teman
```
Copy file index.html
Teman bisa langsung pakai tanpa instalasi
```

---

## ❓ FAQ

**Q: Data saya aman?**
A: Ya! Data hanya tersimpan lokal di browser. Tidak dikirim ke server.

**Q: Bagaimana jika ganti browser?**
A: Data tidak terbawa. Setiap browser punya localStorage terpisah.

**Q: Bisa digunakan offline?**
A: Ya! Aplikasi 100% offline capable.

**Q: Ada batasan jumlah mata kuliah?**
A: Tidak ada. Tambah sesuai kebutuhan.

**Q: Bisa buat beberapa perhitungan sekaligus?**
A: Reset untuk yang baru, atau gunakan tab browser baru.

**Q: Sistem nilai berbeda, gimana?**
A: Sesuaikan bobot di tab "Pengaturan".

**Q: Hasil bisa dicetak?**
A: Ya, gunakan "Print Hasil" atau "Export PDF".

**Q: Cocok untuk prodi apa?**
A: Cocok untuk SEMUA prodi! Itu keunggulannya.

---

## 📱 Responsive Design

| Device | Layout | Status |
|--------|--------|--------|
| Desktop (>1024px) | Sidebar + Content | ✅ Optimal |
| Tablet (768-1024px) | Horizontal Tabs | ✅ Perfect |
| Mobile (480-768px) | Vertical Layout | ✅ Great |
| Micro (<480px) | Compact | ✅ Good |

---

## 📄 Lisensi

Project ini dilisensikan di bawah **MIT License**.

Bebas digunakan untuk keperluan pribadi maupun akademik.

---

## 🌟 Terima Kasih

Terima kasih sudah menggunakan **Kalkulator IP & IPK Universal**!

Semoga aplikasi ini membantu Anda menghitung IP dan IPK dengan lebih mudah dan cepat.

**Happy Calculating! 📊**

---

**Made with ❤️ for Students**  
*Support All Universitas & Program Studi*

*Last Updated: 2026-06-15*
