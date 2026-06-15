// Default Grades Configuration
const defaultGrades = {
    'A': 4.00,
    'AB': 3.50,
    'B': 3.00,
    'BC': 2.50,
    'C': 2.00,
    'D': 1.00,
    'E': 0.00
};

// State
let matkul = [];
let grades = { ...defaultGrades };
let currentId = null; // For editing

// DOM Elements
const elements = {
    // Tabs
    tabBtns: document.querySelectorAll('.tab-btn'),
    tabContents: document.querySelectorAll('.tab-content'),

    // Inputs
    nama: document.getElementById('nama'),
    nim: document.getElementById('nim'),
    prodi: document.getElementById('prodi'),
    kampus: document.getElementById('kampus'),
    semester: document.getElementById('semester'),
    tahun: document.getElementById('tahun'),
    catatan: document.getElementById('catatan'),
    sksSebelumnya: document.getElementById('sks-sebelumnya'),
    ipkSebelumnya: document.getElementById('ipk-sebelumnya'),

    // Table
    matkulBody: document.getElementById('matkul-body'),

    // Buttons
    addMatkulBtn: document.getElementById('add-matkul'),
    resetFormBtn: document.getElementById('reset-form'),
    calculateBtn: document.getElementById('calculate-btn'),
    saveBtn: document.getElementById('save-btn'),
    exportBtn: document.getElementById('export-btn'),

    // Results
    totalSksSemester: document.getElementById('total-sks-semester'),
    totalMutuSemester: document.getElementById('total-mutu-semester'),
    ipSemester: document.getElementById('ip-semester'),
    totalSksKumulatif: document.getElementById('total-sks-kumulatif'),
    totalMutuKumulatif: document.getElementById('total-mutu-kumulatif'),
    ipkAkhir: document.getElementById('ipk-akhir'),

    // History
    historyList: document.getElementById('history-list'),
    searchHistory: document.getElementById('search-history'),

    // Settings
    gradesSettings: document.getElementById('grades-settings'),
    saveSettingsBtn: document.getElementById('save-settings'),
    resetSettingsBtn: document.getElementById('reset-settings'),

    // Modal
    editModal: document.getElementById('edit-modal'),
    confirmEditBtn: document.getElementById('confirm-edit'),
    cancelEditBtn: document.getElementById('cancel-edit'),
    closeModalBtn: document.querySelector('.close-modal')
};

// --- Initialization ---
function init() {
    loadSettings();
    loadHistory();
    addRow(); // Add first empty row
    setupEventListeners();
}

// --- Event Listeners ---
function setupEventListeners() {
    // Tabs
    elements.tabBtns.forEach(btn => {
        btn.addEventListener('click', () => switchTab(btn.dataset.tab));
    });

    // Matkul Actions
    elements.addMatkulBtn.addEventListener('click', () => addRow());
    elements.resetFormBtn.addEventListener('click', resetForm);

    // Calculation & Saving
    elements.calculateBtn.addEventListener('click', calculate);
    elements.saveBtn.addEventListener('click', saveCalculation);
    elements.exportBtn.addEventListener('click', exportToPrint);

    // History
    elements.searchHistory.addEventListener('input', renderHistory);

    // Settings
    elements.saveSettingsBtn.addEventListener('click', saveSettings);
    elements.resetSettingsBtn.addEventListener('click', resetSettings);

    // Modal
    elements.closeModalBtn.addEventListener('click', closeModal);
    elements.cancelEditBtn.addEventListener('click', closeModal);
    elements.confirmEditBtn.addEventListener('click', () => {
        closeModal();
        loadToForm(currentId);
    });

    // Auto-calculate on input change
    const autoCalcInputs = [elements.sksSebelumnya, elements.ipkSebelumnya];
    autoCalcInputs.forEach(input => input.addEventListener('input', calculate));
}

// --- Tab Switching ---
function switchTab(tabId) {
    elements.tabBtns.forEach(btn => btn.classList.remove('active'));
    elements.tabContents.forEach(content => content.classList.remove('active'));

    document.querySelector(`[data-tab="${tabId}"]`).classList.add('active');
    document.getElementById(tabId).classList.add('active');

    if (tabId === 'history') renderHistory();
    if (tabId === 'settings') renderSettings();
}

// --- Matkul Table Logic ---
function addRow(data = null) {
    const id = data ? data.id : Date.now();
    const tr = document.createElement('tr');
    tr.dataset.id = id;

    tr.innerHTML = `
        <td class="row-num"></td>
        <td><input type="text" class="mk-name" placeholder="Nama Mata Kuliah" value="${data ? data.name : ''}"></td>
        <td><input type="number" class="mk-sks" min="1" value="${data ? data.sks : 1}"></td>
        <td>
            <select class="mk-grade">
                ${Object.keys(grades).map(g => `<option value="${g}" ${data && data.grade === g ? 'selected' : ''}>${g}</option>`).join('')}
            </select>
        </td>
        <td><input type="number" class="mk-bobot" step="0.01" value="${data ? data.bobot : grades[data?.grade || 'A'] || 4}"></td>
        <td class="mk-mutu">0.00</td>
        <td><button class="btn btn-danger btn-sm delete-row">Hapus</button></td>
    `;

    elements.matkulBody.appendChild(tr);
    updateRowNumbers();
    calculateRowMutu(tr);

    // Add event listeners for this row
    tr.querySelector('.mk-sks').addEventListener('input', () => calculateRowMutu(tr));
    tr.querySelector('.mk-grade').addEventListener('change', (e) => {
        const grade = e.target.value;
        tr.querySelector('.mk-bobot').value = grades[grade];
        calculateRowMutu(tr);
    });
    tr.querySelector('.mk-bobot').addEventListener('input', () => calculateRowMutu(tr));
    tr.querySelector('.delete-row').addEventListener('click', () => {
        tr.remove();
        updateRowNumbers();
        calculate();
    });
}

function calculateRowMutu(tr) {
    const sks = parseFloat(tr.querySelector('.mk-sks').value) || 0;
    const bobot = parseFloat(tr.querySelector('.mk-bobot').value) || 0;
    const mutu = (sks * bobot).toFixed(2);
    tr.querySelector('.mk-mutu').textContent = mutu;
    calculate();
}

function updateRowNumbers() {
    const rows = elements.matkulBody.querySelectorAll('tr');
    rows.forEach((row, index) => {
        row.querySelector('.row-num').textContent = index + 1;
    });
}

// --- Calculation Logic ---
function calculate() {
    let totalSksSemester = 0;
    let totalMutuSemester = 0;

    const rows = elements.matkulBody.querySelectorAll('tr');
    rows.forEach(row => {
        const sks = parseFloat(row.querySelector('.mk-sks').value) || 0;
        const bobot = parseFloat(row.querySelector('.mk-bobot').value) || 0;
        totalSksSemester += sks;
        totalMutuSemester += (sks * bobot);
    });

    const ipSemester = totalSksSemester > 0 ? totalMutuSemester / totalSksSemester : 0;

    // Kumulatif
    const sksSebelumnya = parseFloat(elements.sksSebelumnya.value) || 0;
    const ipkSebelumnya = parseFloat(elements.ipkSebelumnya.value) || 0;
    const mutuSebelumnya = sksSebelumnya * ipkSebelumnya;

    const totalSksKumulatif = sksSebelumnya + totalSksSemester;
    const totalMutuKumulatif = mutuSebelumnya + totalMutuSemester;
    const ipkAkhir = totalSksKumulatif > 0 ? totalMutuKumulatif / totalSksKumulatif : 0;

    // Update UI
    elements.totalSksSemester.textContent = totalSksSemester;
    elements.totalMutuSemester.textContent = totalMutuSemester.toFixed(2);
    elements.ipSemester.textContent = ipSemester.toFixed(2);
    elements.totalSksKumulatif.textContent = totalSksKumulatif;
    elements.totalMutuKumulatif.textContent = totalMutuKumulatif.toFixed(2);
    elements.ipkAkhir.textContent = ipkAkhir.toFixed(2);
}

// --- Validation ---
function validate() {
    let isValid = true;
    const inputs = [
        { el: elements.nama, msg: 'Nama harus diisi' },
        { el: elements.nim, msg: 'NIM harus diisi' },
        { el: elements.prodi, msg: 'Program Studi harus diisi' },
        { el: elements.kampus, msg: 'Kampus harus diisi' },
        { el: elements.semester, msg: 'Semester harus diisi' },
        { el: elements.tahun, msg: 'Tahun Akademik harus diisi' }
    ];

    inputs.forEach(item => {
        if (!item.el.value.trim()) {
            item.el.classList.add('error');
            isValid = false;
        } else {
            item.el.classList.remove('error');
        }
    });

    // Validasi Tabel
    const rows = elements.matkulBody.querySelectorAll('tr');
    if (rows.length === 0 || rows[0].querySelector('.mk-name').value === '') {
        alert('Silakan tambahkan minimal 1 mata kuliah.');
        return false;
    }

    rows.forEach(row => {
        const name = row.querySelector('.mk-name').value.trim();
        const sks = parseFloat(row.querySelector('.mk-sks').value);
        if (!name) {
            row.querySelector('.mk-name').classList.add('error');
            isValid = false;
        } else {
            row.querySelector('.mk-name').classList.remove('error');
        }
        
        if (!sks || sks < 1) {
            row.querySelector('.mk-sks').classList.add('error');
            isValid = false;
        } else {
            row.querySelector('.mk-sks').classList.remove('error');
        }
    });

    if (!isValid) alert('Harap lengkapi data yang dibutuhkan.');
    return isValid;
}

// --- Save / Load Data ---
function saveCalculation() {
    if (!validate()) return;

    const data = {
        id: currentId || Date.now(),
        timestamp: new Date().toISOString(),
        identity: {
            nama: elements.nama.value,
            nim: elements.nim.value,
            prodi: elements.prodi.value,
            kampus: elements.kampus.value,
            semester: elements.semester.value,
            tahun: elements.tahun.value,
            catatan: elements.catatan.value
        },
        kumulatif: {
            sksSebelumnya: parseFloat(elements.sksSebelumnya.value) || 0,
            ipkSebelumnya: parseFloat(elements.ipkSebelumnya.value) || 0
        },
        matkul: Array.from(elements.matkulBody.querySelectorAll('tr')).map(row => ({
            name: row.querySelector('.mk-name').value,
            sks: parseFloat(row.querySelector('.mk-sks').value),
            grade: row.querySelector('.mk-grade').value,
            bobot: parseFloat(row.querySelector('.mk-bobot').value),
            mutu: parseFloat(row.querySelector('.mk-mutu').textContent)
        })),
        result: {
            ipSemester: parseFloat(elements.ipSemester.textContent),
            ipkAkhir: parseFloat(elements.ipkAkhir.textContent)
        }
    };

    let history = JSON.parse(localStorage.getItem('ipk_history') || '[]');
    
    // Update jika edit, tambah jika baru
    const index = history.findIndex(h => h.id === data.id);
    if (index > -1) {
        history[index] = data;
    } else {
        history.unshift(data); // Add to top
    }

    localStorage.setItem('ipk_history', JSON.stringify(history));
    
    // Reset currentId after save
    currentId = null;
    
    alert('Data berhasil disimpan!');
    loadHistory(); // Refresh history view if open
}

function loadToForm(id) {
    currentId = id;
    const history = JSON.parse(localStorage.getItem('ipk_history') || '[]');
    const data = history.find(h => h.id === id);
    if (!data) return;

    // Fill Identity
    elements.nama.value = data.identity.nama;
    elements.nim.value = data.identity.nim;
    elements.prodi.value = data.identity.prodi;
    elements.kampus.value = data.identity.kampus;
    elements.semester.value = data.identity.semester;
    elements.tahun.value = data.identity.tahun;
    elements.catatan.value = data.identity.catatan;

    // Fill Kumulatif
    elements.sksSebelumnya.value = data.kumulatif.sksSebelumnya;
    elements.ipkSebelumnya.value = data.kumulatif.ipkSebelumnya;

    // Fill Matkul
    elements.matkulBody.innerHTML = '';
    data.matkul.forEach(mk => addRow(mk));

    calculate();
    switchTab('calculator');
}

function deleteHistory(id) {
    if (!confirm('Yakin ingin menghapus data ini?')) return;
    let history = JSON.parse(localStorage.getItem('ipk_history') || '[]');
    history = history.filter(h => h.id !== id);
    localStorage.setItem('ipk_history', JSON.stringify(history));
    renderHistory();
}

// --- History Rendering ---
function renderHistory() {
    const query = elements.searchHistory.value.toLowerCase();
    let history = JSON.parse(localStorage.getItem('ipk_history') || '[]');

    // Filter
    history = history.filter(item => {
        const { nama, prodi, semester, kampus } = item.identity;
        return (
            nama.toLowerCase().includes(query) ||
            prodi.toLowerCase().includes(query) ||
            semester.includes(query) ||
            kampus.toLowerCase().includes(query)
        );
    });

    elements.historyList.innerHTML = '';

    if (history.length === 0) {
        elements.historyList.innerHTML = '<div class="empty-state">Tidak ada data ditemukan.</div>';
        return;
    }

    history.forEach(item => {
        const date = new Date(item.timestamp).toLocaleDateString('id-ID');
        const div = document.createElement('div');
        div.className = 'history-item';
        div.innerHTML = `
            <div class="history-info">
                <h4>${item.identity.nama} (${item.identity.nim})</h4>
                <div class="history-meta">
                    <span>📍 ${item.identity.kampus}</span>
                    <span>🎓 ${item.identity.prodi}</span>
                    <span>📅 Semester ${item.identity.semester}</span>
                    <span>📅 ${item.identity.tahun}</span>
                </div>
                <div class="history-meta" style="margin-top: 5px;">
                    <span><strong>IP:</strong> ${item.result.ipSemester.toFixed(2)}</span>
                    <span><strong>IPK:</strong> ${item.result.ipkAkhir.toFixed(2)}</span>
                    <span style="color: #888;">${date}</span>
                </div>
            </div>
            <div class="history-actions">
                <button class="btn btn-primary btn-sm" onclick="loadToForm(${item.id})">Buka</button>
                <button class="btn btn-danger btn-sm" onclick="deleteHistory(${item.id})">Hapus</button>
            </div>
        `;
        elements.historyList.appendChild(div);
    });
}

// --- Settings Logic ---
function renderSettings() {
    elements.gradesSettings.innerHTML = '';
    Object.entries(grades).forEach(([grade, weight]) => {
        const div = document.createElement('div');
        div.className = 'grade-setting';
        div.innerHTML = `
            <label>${grade}</label>
            <input type="number" step="0.01" value="${weight}" data-grade="${grade}">
        `;
        elements.gradesSettings.appendChild(div);
    });
}

function saveSettings() {
    const inputs = elements.gradesSettings.querySelectorAll('input');
    inputs.forEach(input => {
        grades[input.dataset.grade] = parseFloat(input.value) || 0;
    });
    localStorage.setItem('ipk_grades', JSON.stringify(grades));
    alert('Pengaturan bobot nilai berhasil disimpan!');
    
    // Refresh table dropdowns
    const rows = elements.matkulBody.querySelectorAll('tr');
    rows.forEach(row => {
        const select = row.querySelector('.mk-grade');
        const currentVal = select.value;
        select.innerHTML = Object.keys(grades).map(g => `<option value="${g}" ${g === currentVal ? 'selected' : ''}>${g}</option>`).join('');
    });
}

function resetSettings() {
    grades = { ...defaultGrades };
    localStorage.setItem('ipk_grades', JSON.stringify(grades));
    renderSettings();
    alert('Reset ke default berhasil!');
}

function loadSettings() {
    const saved = localStorage.getItem('ipk_grades');
    if (saved) grades = JSON.parse(saved);
}

// --- Utilities ---
function resetForm() {
    if (confirm('Yakin ingin mereset form? Data yang belum disimpan akan hilang.')) {
        elements.matkulBody.innerHTML = '';
        currentId = null;
        document.querySelectorAll('input, textarea').forEach(el => el.value = '');
        elements.sksSebelumnya.value = 0;
        elements.ipkSebelumnya.value = 0;
        addRow();
        calculate();
    }
}

function exportToPrint() {
    window.print();
}

// Start App
init();
