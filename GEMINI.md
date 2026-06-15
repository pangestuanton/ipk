# Spesifikasi dan Panduan Pengembangan: Web Kalkulator IPK/IPS Mahasiswa ITERA

Dokumen ini berisi panduan lengkap, arsitektur, dan blueprint kode untuk membangun aplikasi berbasis web yang responsif untuk menghitung Indeks Prestasi Semester (IPS) dan Indeks Prestasi Kumulatif (IPK) khusus untuk mahasiswa **Institut Teknologi Sumatera (ITERA)**.

---

## 1. Ringkasan Proyek

Aplikasi **ITERA GPA Calculator** adalah *responsive web application* yang dirancang untuk membantu mahasiswa ITERA dalam merencanakan, menghitung, dan melacak pencapaian akademis mereka. Aplikasi ini disesuaikan dengan sistem penilaian dan peraturan akademik yang berlaku di ITERA.

### Fitur Utama:
* **Perhitungan IPS & IPK:** Menghitung bobot nilai berdasarkan SKS secara real-time.
* **Sistem Nilai ITERA:** Mendukung skala nilai huruf resmi ITERA (A, AB, B, BC, C, D, E).
* **Desain Responsif & Modern:** Tampilan optimal di perangkat mobile, tablet, maupun desktop dengan estetika modern (*Dark Mode / Tech-oriented UI*).
* **Manajemen Multi-Semester:** Kemampuan menambah, mengedit, dan menghapus data semester secara dinamis.
* **Penyimpanan Lokal (Local Storage):** Data otomatis tersimpan di browser pengguna sehingga tidak hilang saat halaman dimuat ulang.

---

## 2. Standar Penilaian Akademik ITERA

Perhitungan bobot nilai di web ini wajib menggunakan standar resmi Institut Teknologi Sumatera:

| Nilai Huruf | Bobot Angka | Status |
| :---: | :---: | :---: |
| **A** | 4.00 | Lulus |
| **AB** | 3.50 | Lulus |
| **B** | 3.00 | Lulus |
| **BC** | 2.50 | Lulus |
| **C** | 2.00 | Lulus |
| **D** | 1.00 | Lulus Bersyarat |
| **E** | 0.00 | Tidak Lulus |

### Rumus Perhitungan:

$$\text{IPS} = \frac{\sum (\text{SKS Matakuliah} \times \text{Bobot Nilai})}{\sum \text{SKS Terambil pada Semester Tersebut}}$$

$$\text{IPK} = \frac{\sum (\text{Total SKS Semua Semester} \times \text{Total Bobot Semua Semester})}{\sum \text{Total SKS Kumulatif}}$$

---

## 3. Arsitektur & Teknologi Stack

Untuk memastikan performa yang cepat, ringan, dan responsif, berikut adalah rekomendasi *tech stack* yang digunakan:

* **Frontend Framework:** React.js (Sangat cocok untuk manajemen state dinamis seperti menambah form matakuliah).
* **Styling Engine:** Tailwind CSS (Memudahkan pembuatan layout responsif menggunakan utility classes seperti `grid-cols-1 md:grid-cols-2`).
* **State Management:** React Context API atau Hooks (`useState`, `useEffect`) untuk sinkronisasi LocalStorage.
* **Icons:** Lucide React / React Icons (Untuk elemen UI yang interaktif).

---

## 4. Struktur Direktori Proyek (React.js)

```text
itera-gpa-calculator/
├── public/
│   └── index.html
├── src/
│   ├── components/
│   │   ├── Navbar.jsx         # Header dengan branding ITERA
│   │   ├── SemesterCard.jsx   # Komponen per-semester
│   │   ├── CourseRow.jsx      # Baris input matakuliah (Nama, SKS, Nilai)
│   │   └── SummaryStats.jsx   # Panel visualisasi IPK & Total SKS
│   ├── hooks/
│   │   └── useLocalStorage.js # Custom hook untuk auto-save data
│   ├── utils/
│   │   └── calculator.js      # Logika matematika perhitungan IPK
│   ├── App.jsx                # Komponen utama penampung state
│   ├── main.jsx
│   └── index.css              # Konfigurasi Tailwind CSS
├── package.json
└── tailwind.config.js