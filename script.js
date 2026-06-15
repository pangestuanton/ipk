/**
 * KALKULATOR IP & IPK - MAIN SCRIPT
 * ================================
 * Aplikasi universal untuk menghitung IP Semester dan IPK
 */

// ====================================
// DATA & STATE MANAGEMENT
// ====================================

// Bobot nilai default
const BOBOT_DEFAULT = {
    'A': 4.00,
    'AB': 3.50,
    'B': 3.00,
    'BC': 2.50,
    'C': 2.00,
    'D': 1.00,
    'E': 0.00
};

// State aplikasi
let appState = {
    identitas: {
        nama: '',
        nim: '',
        programStudi: '',
        semester: '',
        namaKampus: ''
    },
    sksSebelumnya: 0,
    ipkSebelumnya: 0,
    mataKuliah: [],
    bobotNilai: { ...BOBOT_DEFAULT }
};

// Mode modal untuk tambah atau edit
let modalMode = 'add';
let editingIndex = -1;

// ====================================
// INITIALIZATION
// ====================================

document.addEventListener('DOMContentLoaded', function () {
    initializeApp();
    loadDataFromStorage();
    renderUI();
    attachEventListeners();
});

function initializeApp() {
    // Inisialisasi bobot setting UI
    updateBobotUI();
    
    // Populate nilai select di modal
    const selectNilai = document.getElementById('inputNilai');
    Object.keys(appState.bobotNilai).forEach(nilai => {
        const option = document.createElement('option');
        option.value = nilai;
        option.textContent = `${nilai} (${appState.bobotNilai[nilai].toFixed(2)})`;
        selectNilai.appendChild(option);
    });
}

function attachEventListeners() {
    // Tab navigation
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.addEventListener('click', function () {
            switchTab(this.dataset.tab);
        });
    });

    // Identitas inputs
    document.getElementById('namaMahasiswa').addEventListener('change', function () {
        appState.identitas.nama = this.value;
    });
    document.getElementById('nim').addEventListener('change', function () {
        appState.identitas.nim = this.value;
    });
    document.getElementById('programStudi').addEventListener('change', function () {
        appState.identitas.programStudi = this.value;
    });
    document.getElementById('semester').addEventListener('change', function () {
        appState.identitas.semester = this.value;
    });
    document.getElementById('namaKampus').addEventListener('change', function () {
        appState.identitas.namaKampus = this.value;
    });

    // SKS Sebelumnya
    document.getElementById('sksSebelumnya').addEventListener('change', function () {
        appState.sksSebelumnya = Number(this.value) || 0;
        hitungHasil();
    });
    document.getElementById('ipkSebelumnya').addEventListener('change', function () {
        appState.ipkSebelumnya = Number(this.value) || 0;
        hitungHasil();
    });

    // Tombol Mata Kuliah
    document.getElementById('btnTambahMK').addEventListener('click', openModalTambah);

    // Tombol Pengaturan
    document.getElementById('btnResetBobot').addEventListener('click', resetBobot);
    document.getElementById('btnSimpanData').addEventListener('click', saveDataToStorage);
    document.getElementById('btnMuatData').addEventListener('click', loadDataFromStorage);
    document.getElementById('btnResetSemua').addEventListener('click', resetSemua);
    document.getElementById('btnPrint').addEventListener('click', printHasil);
    document.getElementById('btnExportPDF').addEventListener('click', exportPDF);

    // Modal
    document.querySelector('.close-btn').addEventListener('click', closeModal);
    document.getElementById('btnBatalMK').addEventListener('click', closeModal);
    document.getElementById('formMK').addEventListener('submit', handleFormSubmit);
    document.getElementById('modalMK').addEventListener('click', function (e) {
        if (e.target === this) closeModal();
    });

    // Bobot inputs
    updateBobotEventListeners();
}

// ====================================
// TAB NAVIGATION
// ====================================

function switchTab(tabName) {
    // Hide all tabs
    document.querySelectorAll('.tab-content').forEach(tab => {
        tab.classList.remove('active');
    });

    // Remove active class from buttons
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.classList.remove('active');
    });

    // Show selected tab
    document.getElementById(tabName + '-tab').classList.add('active');

    // Add active class to button
    document.querySelector(`[data-tab="${tabName}"]`).classList.add('active');

    // Update hasil jika tab hasil dibuka
    if (tabName === 'hasil') {
        hitungHasil();
    }
}

// ====================================
// MATA KULIAH MANAGEMENT
// ====================================

function renderMataKuliahCards() {
    const container = document.getElementById('mataKuliahContainer');
    const emptyState = document.getElementById('emptyState');

    if (appState.mataKuliah.length === 0) {
        container.innerHTML = '';
        emptyState.style.display = 'block';
        return;
    }

    emptyState.style.display = 'none';
    container.innerHTML = '';

    appState.mataKuliah.forEach((mk, index) => {
        const mutu = mk.sks * appState.bobotNilai[mk.nilai];
        const card = document.createElement('div');
        card.className = 'course-card';
        card.innerHTML = `
            <div class="course-header">
                <div class="course-info">
                    <div class="course-title">${escapeHtml(mk.nama)}</div>
                    <div class="course-details">
                        <div class="course-detail-item">
                            <span class="course-detail-label">SKS</span>
                            <span class="course-detail-value">${mk.sks}</span>
                        </div>
                        <div class="course-detail-item">
                            <span class="course-detail-label">Nilai</span>
                            <span class="course-detail-value">${mk.nilai}</span>
                        </div>
                        <div class="course-detail-item">
                            <span class="course-detail-label">Bobot</span>
                            <span class="course-detail-value">${appState.bobotNilai[mk.nilai].toFixed(2)}</span>
                        </div>
                        <div class="course-detail-item">
                            <span class="course-detail-label">Mutu</span>
                            <span class="course-detail-value">${mutu.toFixed(2)}</span>
                        </div>
                    </div>
                </div>
                <div class="course-actions">
                    <button class="btn btn-secondary btn-sm" onclick="openModalEdit(${index})">✏️ Edit</button>
                    <button class="btn btn-danger btn-sm" onclick="deleteMataKuliah(${index})">🗑️ Hapus</button>
                </div>
            </div>
        `;
        container.appendChild(card);
    });

    hitungHasil();
}

function openModalTambah() {
    modalMode = 'add';
    document.getElementById('modalTitle').textContent = 'Tambah Mata Kuliah';
    document.getElementById('formMK').reset();
    document.getElementById('modalMK').classList.add('show');
}

function openModalEdit(index) {
    modalMode = 'edit';
    editingIndex = index;
    const mk = appState.mataKuliah[index];
    
    document.getElementById('modalTitle').textContent = 'Edit Mata Kuliah';
    document.getElementById('inputNamaMK').value = mk.nama;
    document.getElementById('inputSKS').value = mk.sks;
    document.getElementById('inputNilai').value = mk.nilai;
    document.getElementById('modalMK').classList.add('show');
}

function closeModal() {
    document.getElementById('modalMK').classList.remove('show');
    document.getElementById('formMK').reset();
}

function handleFormSubmit(e) {
    e.preventDefault();

    const nama = document.getElementById('inputNamaMK').value.trim();
    const sks = Number(document.getElementById('inputSKS').value);
    const nilai = document.getElementById('inputNilai').value;

    // Validasi
    if (!nama) {
        showNotification('Nama mata kuliah tidak boleh kosong', 'error');
        return;
    }
    if (sks < 1) {
        showNotification('SKS minimal harus 1', 'error');
        return;
    }
    if (!nilai) {
        showNotification('Nilai harus dipilih', 'error');
        return;
    }

    if (modalMode === 'add') {
        appState.mataKuliah.push({ nama, sks, nilai });
        showNotification('Mata kuliah berhasil ditambahkan', 'success');
    } else {
        appState.mataKuliah[editingIndex] = { nama, sks, nilai };
        showNotification('Mata kuliah berhasil diperbarui', 'success');
    }

    closeModal();
    renderMataKuliahCards();
}

function deleteMataKuliah(index) {
    if (confirm('Apakah Anda yakin ingin menghapus mata kuliah ini?')) {
        const deleted = appState.mataKuliah[index].nama;
        appState.mataKuliah.splice(index, 1);
        renderMataKuliahCards();
        showNotification(`"${deleted}" berhasil dihapus`, 'success');
    }
}

// ====================================
// BOBOT NILAI MANAGEMENT
// ====================================

function updateBobotUI() {
    const container = document.getElementById('bobotContainer');
    container.innerHTML = '';

    Object.keys(appState.bobotNilai).forEach(nilai => {
        const item = document.createElement('div');
        item.className = 'bobot-item';
        item.innerHTML = `
            <label>${nilai}</label>
            <input type="number" class="bobot-input" data-nilai="${nilai}" 
                   value="${appState.bobotNilai[nilai].toFixed(2)}" 
                   min="0" max="4" step="0.01">
        `;
        container.appendChild(item);
    });

    updateBobotEventListeners();
}

function updateBobotEventListeners() {
    document.querySelectorAll('.bobot-input').forEach(input => {
        input.addEventListener('change', function () {
            const nilai = this.dataset.nilai;
            appState.bobotNilai[nilai] = Number(this.value);
            
            // Update select options di modal
            updateModalSelectOptions();
            
            // Render ulang dan hitung
            renderMataKuliahCards();
            showNotification('Bobot nilai berhasil diperbarui', 'success');
        });
    });
}

function updateModalSelectOptions() {
    const selectNilai = document.getElementById('inputNilai');
    selectNilai.innerHTML = '';
    Object.keys(appState.bobotNilai).forEach(nilai => {
        const option = document.createElement('option');
        option.value = nilai;
        option.textContent = `${nilai} (${appState.bobotNilai[nilai].toFixed(2)})`;
        selectNilai.appendChild(option);
    });
}

function resetBobot() {
    if (confirm('Reset bobot nilai ke default? Ini tidak bisa dibatalkan.')) {
        appState.bobotNilai = { ...BOBOT_DEFAULT };
        updateBobotUI();
        renderMataKuliahCards();
        showNotification('Bobot nilai direset ke default', 'success');
    }
}

// ====================================
// CALCULATION
// ====================================

function hitungHasil() {
    if (appState.mataKuliah.length === 0) {
        resetHasilDisplay();
        return;
    }

    // Hitung semester ini
    let totalSksSemester = 0;
    let totalMutuSemester = 0;

    appState.mataKuliah.forEach(mk => {
        totalSksSemester += mk.sks;
        totalMutuSemester += mk.sks * appState.bobotNilai[mk.nilai];
    });

    const ipSemester = totalSksSemester > 0 ? totalMutuSemester / totalSksSemester : 0;

    // Hitung kumulatif
    const mutuSebelumnya = appState.sksSebelumnya * appState.ipkSebelumnya;
    const totalSksKumulatif = appState.sksSebelumnya + totalSksSemester;
    const totalMutuKumulatif = mutuSebelumnya + totalMutuSemester;
    const ipk = totalSksKumulatif > 0 ? totalMutuKumulatif / totalSksKumulatif : 0;

    // Cap nilai max 4.00
    const displayIPSemester = Math.min(ipSemester, 4.00);
    const displayIPK = Math.min(ipk, 4.00);

    // Update display
    document.getElementById('hasilTotalSksSemester').textContent = totalSksSemester;
    document.getElementById('hasilTotalMutuSemester').textContent = totalMutuSemester.toFixed(2);
    document.getElementById('hasilIPSemester').textContent = displayIPSemester.toFixed(2);
    
    document.getElementById('hasilTotalSksKumulatif').textContent = totalSksKumulatif;
    document.getElementById('hasilTotalMutuKumulatif').textContent = totalMutuKumulatif.toFixed(2);
    document.getElementById('hasilIPK').textContent = displayIPK.toFixed(2);

    // Store hasil untuk export
    window.lastResults = {
        semester: appState.identitas.semester,
        totalSksSemester,
        totalMutuSemester,
        ipSemester: displayIPSemester,
        totalSksKumulatif,
        totalMutuKumulatif,
        ipk: displayIPK
    };
}

function resetHasilDisplay() {
    document.getElementById('hasilTotalSksSemester').textContent = '0';
    document.getElementById('hasilTotalMutuSemester').textContent = '0.00';
    document.getElementById('hasilIPSemester').textContent = '0.00';
    document.getElementById('hasilTotalSksKumulatif').textContent = '0';
    document.getElementById('hasilTotalMutuKumulatif').textContent = '0.00';
    document.getElementById('hasilIPK').textContent = '0.00';
}

// ====================================
// STORAGE (LOCALSTORAGE)
// ====================================

function saveDataToStorage() {
    try {
        localStorage.setItem('appState', JSON.stringify(appState));
        showNotification('Data berhasil disimpan', 'success');
    } catch (error) {
        showNotification('Gagal menyimpan data: ' + error.message, 'error');
    }
}

function loadDataFromStorage() {
    try {
        const saved = localStorage.getItem('appState');
        if (saved) {
            const loaded = JSON.parse(saved);
            appState = { ...appState, ...loaded };
            
            // Update UI dengan data tersimpan
            document.getElementById('namaMahasiswa').value = appState.identitas.nama || '';
            document.getElementById('nim').value = appState.identitas.nim || '';
            document.getElementById('programStudi').value = appState.identitas.programStudi || '';
            document.getElementById('semester').value = appState.identitas.semester || '';
            document.getElementById('namaKampus').value = appState.identitas.namaKampus || '';
            
            document.getElementById('sksSebelumnya').value = appState.sksSebelumnya || '';
            document.getElementById('ipkSebelumnya').value = appState.ipkSebelumnya || '';
            
            updateBobotUI();
            renderMataKuliahCards();
            
            showNotification('Data tersimpan berhasil dimuat', 'success');
        }
    } catch (error) {
        showNotification('Gagal memuat data tersimpan', 'warning');
    }
}

function resetSemua() {
    if (confirm('Reset SEMUA data? Data akan dihapus permanen dan tidak bisa dikembalikan.')) {
        appState = {
            identitas: {
                nama: '',
                nim: '',
                programStudi: '',
                semester: '',
                namaKampus: ''
            },
            sksSebelumnya: 0,
            ipkSebelumnya: 0,
            mataKuliah: [],
            bobotNilai: { ...BOBOT_DEFAULT }
        };

        document.getElementById('namaMahasiswa').value = '';
        document.getElementById('nim').value = '';
        document.getElementById('programStudi').value = '';
        document.getElementById('semester').value = '';
        document.getElementById('namaKampus').value = '';
        document.getElementById('sksSebelumnya').value = '';
        document.getElementById('ipkSebelumnya').value = '';

        updateBobotUI();
        renderMataKuliahCards();
        resetHasilDisplay();
        localStorage.removeItem('appState');

        showNotification('Semua data telah direset', 'success');
    }
}

// ====================================
// EXPORT & PRINT
// ====================================

function printHasil() {
    window.print();
}

function exportPDF() {
    // Simple PDF export using canvas and download
    const printArea = generatePrintContent();
    const printWindow = window.open('', '', 'height=500,width=800');
    printWindow.document.write(printArea);
    printWindow.document.close();
    
    setTimeout(() => {
        printWindow.print();
    }, 250);
}

function generatePrintContent() {
    const hasil = window.lastResults || {};
    const identitas = appState.identitas;

    let html = `
        <!DOCTYPE html>
        <html>
        <head>
            <title>Laporan IP & IPK</title>
            <style>
                body {
                    font-family: Arial, sans-serif;
                    padding: 20px;
                    background: white;
                    color: #333;
                }
                .header {
                    text-align: center;
                    margin-bottom: 30px;
                    border-bottom: 3px solid #16a34a;
                    padding-bottom: 20px;
                }
                .header h1 {
                    margin: 0;
                    color: #16a34a;
                }
                .identitas {
                    margin-bottom: 30px;
                    border: 1px solid #ddd;
                    padding: 15px;
                    border-radius: 8px;
                }
                .identitas-row {
                    display: grid;
                    grid-template-columns: 1fr 1fr;
                    gap: 10px;
                    margin-bottom: 10px;
                }
                .identitas-row div {
                    display: flex;
                    gap: 20px;
                }
                .identitas-row span:first-child {
                    font-weight: bold;
                    width: 150px;
                }
                table {
                    width: 100%;
                    border-collapse: collapse;
                    margin-bottom: 30px;
                }
                table th, table td {
                    border: 1px solid #ddd;
                    padding: 12px;
                    text-align: left;
                }
                table th {
                    background: #16a34a;
                    color: white;
                    font-weight: bold;
                }
                table tr:nth-child(even) {
                    background: #f9f9f9;
                }
                .results {
                    display: grid;
                    grid-template-columns: 1fr 1fr;
                    gap: 15px;
                    margin-bottom: 30px;
                }
                .result-item {
                    border: 2px solid #16a34a;
                    padding: 15px;
                    border-radius: 8px;
                    text-align: center;
                }
                .result-item-label {
                    font-size: 12px;
                    color: #666;
                    margin-bottom: 5px;
                }
                .result-item-value {
                    font-size: 24px;
                    font-weight: bold;
                    color: #16a34a;
                }
                .footer {
                    margin-top: 50px;
                    display: flex;
                    justify-content: space-around;
                }
                .footer-item {
                    text-align: center;
                }
                .signature-space {
                    height: 60px;
                    border-top: 1px solid #333;
                    margin-top: 40px;
                }
                @media print {
                    body { background: white; }
                }
            </style>
        </head>
        <body>
            <div class="header">
                <h1>📊 Laporan IP & IPK</h1>
                <p>Kalkulator IP & IPK Universal</p>
            </div>
    `;

    // Identitas
    if (identitas.nama || identitas.nim || identitas.programStudi) {
        html += `
            <div class="identitas">
                <h3>Data Mahasiswa</h3>
                <div class="identitas-row">
                    <div>
                        ${identitas.nama ? `<span>Nama:</span><span>${escapeHtml(identitas.nama)}</span>` : ''}
                    </div>
                    <div>
                        ${identitas.nim ? `<span>NIM:</span><span>${escapeHtml(identitas.nim)}</span>` : ''}
                    </div>
                </div>
                <div class="identitas-row">
                    <div>
                        ${identitas.programStudi ? `<span>Program Studi:</span><span>${escapeHtml(identitas.programStudi)}</span>` : ''}
                    </div>
                    <div>
                        ${identitas.semester ? `<span>Semester:</span><span>${identitas.semester}</span>` : ''}
                    </div>
                </div>
                ${identitas.namaKampus ? `
                    <div class="identitas-row">
                        <div>
                            <span>Kampus:</span><span>${escapeHtml(identitas.namaKampus)}</span>
                        </div>
                    </div>
                ` : ''}
            </div>
        `;
    }

    // Tabel Mata Kuliah
    if (appState.mataKuliah.length > 0) {
        html += `
            <h3>Daftar Mata Kuliah</h3>
            <table>
                <thead>
                    <tr>
                        <th>No</th>
                        <th>Mata Kuliah</th>
                        <th>SKS</th>
                        <th>Nilai</th>
                        <th>Bobot</th>
                        <th>Mutu</th>
                    </tr>
                </thead>
                <tbody>
        `;

        appState.mataKuliah.forEach((mk, index) => {
            const mutu = mk.sks * appState.bobotNilai[mk.nilai];
            html += `
                <tr>
                    <td>${index + 1}</td>
                    <td>${escapeHtml(mk.nama)}</td>
                    <td>${mk.sks}</td>
                    <td>${mk.nilai}</td>
                    <td>${appState.bobotNilai[mk.nilai].toFixed(2)}</td>
                    <td>${mutu.toFixed(2)}</td>
                </tr>
            `;
        });

        html += `
                </tbody>
            </table>
        `;
    }

    // Hasil
    html += `
        <h3>Hasil Perhitungan</h3>
        <div class="results">
            <div class="result-item">
                <div class="result-item-label">Total SKS Semester Ini</div>
                <div class="result-item-value">${hasil.totalSksSemester || 0}</div>
            </div>
            <div class="result-item">
                <div class="result-item-label">Total Mutu Semester Ini</div>
                <div class="result-item-value">${(hasil.totalMutuSemester || 0).toFixed(2)}</div>
            </div>
            <div class="result-item">
                <div class="result-item-label">IP Semester Ini</div>
                <div class="result-item-value">${(hasil.ipSemester || 0).toFixed(2)}</div>
            </div>
            <div class="result-item">
                <div class="result-item-label">Total SKS Kumulatif</div>
                <div class="result-item-value">${hasil.totalSksKumulatif || 0}</div>
            </div>
            <div class="result-item">
                <div class="result-item-label">Total Mutu Kumulatif</div>
                <div class="result-item-value">${(hasil.totalMutuKumulatif || 0).toFixed(2)}</div>
            </div>
            <div class="result-item">
                <div class="result-item-label">IPK Akhir</div>
                <div class="result-item-value">${(hasil.ipk || 0).toFixed(2)}</div>
            </div>
        </div>

        <p style="margin-top: 30px; font-size: 12px; color: #999;">
            Laporan ini digenera pada ${new Date().toLocaleString('id-ID')}
        </p>
    `;

    html += `
        </body>
        </html>
    `;

    return html;
}

// ====================================
// UTILITIES
// ====================================

function showNotification(message, type = 'info') {
    const notification = document.getElementById('notification');
    notification.className = `notification ${type} show`;
    notification.textContent = message;

    setTimeout(() => {
        notification.classList.remove('show');
    }, 3500);
}

function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

function renderUI() {
    renderMataKuliahCards();
    hitungHasil();
}
