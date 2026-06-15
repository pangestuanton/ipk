/* -------------------------------------------------
   IP & IPK Calculator – Vanilla JS
   ------------------------------------------------- */

// ----- Default grade weights -------------------------------------------------
const DEFAULT_GRADES = {
  A: 4.0,
  AB: 3.5,
  B: 3.0,
  BC: 2.5,
  C: 2.0,
  D: 1.0,
  E: 0.0,
};

let grades = { ...DEFAULT_GRADES };
let editRecordId = null; // when editing a saved record

// ----- DOM References -------------------------------------------------
const dom = {
  // Tabs
  tabButtons: document.querySelectorAll('.tab-btn'),
  tabPanels: document.querySelectorAll('.tab-panel'),

  // Student form
  nama: document.getElementById('nama'),
  nim: document.getElementById('nim'),
  prodi: document.getElementById('prodi'),
  kampus: document.getElementById('kampus'),
  semester: document.getElementById('semester'),
  tahun: document.getElementById('tahun'),
  catatan: document.getElementById('catatan'),

  // Previous cumulative inputs
  prevSks: document.getElementById('prev-sks'),
  prevIpk: document.getElementById('prev-ipk'),

  // Course table
  courseBody: document.getElementById('course-body'),
  addCourseBtn: document.getElementById('add-course'),
  resetFormBtn: document.getElementById('reset-form'),

  // Calculation results
  totalSksSem: document.getElementById('total-sks-sem'),
  totalMutuSem: document.getElementById('total-mutu-sem'),
  ipSem: document.getElementById('ip-sem'),
  totalSksKum: document.getElementById('total-sks-kum'),
  totalMutuKum: document.getElementById('total-mutu-kum'),
  ipkAkhir: document.getElementById('ipk-akhir'),

  // Action buttons
  calcBtn: document.getElementById('calc-btn'),
  saveBtn: document.getElementById('save-btn'),
  printBtn: document.getElementById('print-btn'),

  // History
  searchHistory: document.getElementById('search-history'),
  historyList: document.getElementById('history-list'),

  // Settings
  gradeSettings: document.getElementById('grade-settings'),
  saveGradesBtn: document.getElementById('save-grades'),
  resetGradesBtn: document.getElementById('reset-grades'),
};

// -------------------------------------------------
// Initialization
// -------------------------------------------------
function init() {
  // Load persisted grade config
  const savedGrades = localStorage.getItem('ipk_grades');
  if (savedGrades) grades = JSON.parse(savedGrades);

  // Render UI parts
  renderGradeSettings();
  addCourseRow(); // start with one empty row
  attachEventListeners();
  loadHistory();
}

// -------------------------------------------------
// Tab handling
// -------------------------------------------------
function switchTab(target) {
  dom.tabButtons.forEach(b => b.classList.toggle('active', b.dataset.target === target));
  dom.tabPanels.forEach(p => p.classList.toggle('active', p.id === target));
}

// -------------------------------------------------
// Course table logic
// -------------------------------------------------
function createSelect(options, selected) {
  const sel = document.createElement('select');
  Object.keys(options).forEach(key => {
    const opt = document.createElement('option');
    opt.value = key;
    opt.textContent = key;
    if (key === selected) opt.selected = true;
    sel.appendChild(opt);
  });
  return sel;
}

function addCourseRow(data = null) {
  const tr = document.createElement('tr');
  const rowId = data ? data.id : Date.now();
  tr.dataset.id = rowId;

  // No column – will be filled by updateRowNumbers()
  const tdNo = document.createElement('td');
  const tdName = document.createElement('td');
  const tdSks = document.createElement('td');
  const tdNilai = document.createElement('td');
  const tdBobot = document.createElement('td');
  const tdMutu = document.createElement('td');
  const tdAksi = document.createElement('td');

  // Name input
  const nameInput = document.createElement('input');
  nameInput.type = 'text';
  nameInput.className = 'course-name';
  nameInput.placeholder = 'Mata Kuliah';
  if (data) nameInput.value = data.name;
  tdName.appendChild(nameInput);

  // SKS input
  const sksInput = document.createElement('input');
  sksInput.type = 'number';
  sksInput.min = '1';
  sksInput.className = 'course-sks';
  sksInput.value = data ? data.sks : 1;
  tdSks.appendChild(sksInput);

  // Nilai (grade) select
  const gradeSelect = createSelect(grades, data ? data.grade : 'A');
  gradeSelect.className = 'course-grade';
  tdNilai.appendChild(gradeSelect);

  // Bobot input – auto‑filled from selected grade
  const bobotInput = document.createElement('input');
  bobotInput.type = 'number';
  bobotInput.step = '0.01';
  bobotInput.className = 'course-bobot';
  const initBobot = data ? data.bobot : grades[gradeSelect.value];
  bobotInput.value = initBobot;
  tdBobot.appendChild(bobotInput);

  // Mutu cell (read‑only)
  const mutuSpan = document.createElement('span');
  mutuSpan.className = 'course-mutu';
  mutuSpan.textContent = '0.00';
  tdMutu.appendChild(mutuSpan);

  // Action – delete row
  const delBtn = document.createElement('button');
  delBtn.type = 'button';
  delBtn.className = 'btn btn-danger btn-sm';
  delBtn.textContent = 'Hapus';
  tdAksi.appendChild(delBtn);

  // Assemble row
  tr.append(tdNo, tdName, tdSks, tdNilai, tdBobot, tdMutu, tdAksi);
  dom.courseBody.appendChild(tr);

  // ---- Event listeners for this row ----
  // When SKS or Bobot changes, recalculate mutu
  function updateMutu() {
    const sks = parseFloat(sksInput.value) || 0;
    const bobot = parseFloat(bobotInput.value) || 0;
    const mutu = (sks * bobot).toFixed(2);
    mutuSpan.textContent = mutu;
    calculate();
  }

  sksInput.addEventListener('input', updateMutu);
  bobotInput.addEventListener('input', updateMutu);

  // Grade change -> update bobot automatically
  gradeSelect.addEventListener('change', () => {
    bobotInput.value = grades[gradeSelect.value];
    updateMutu();
  });

  // Delete row
  delBtn.addEventListener('click', () => {
    tr.remove();
    updateRowNumbers();
    calculate();
  });

  updateRowNumbers();
  updateMutu(); // initial calculation for the new row
}

function updateRowNumbers() {
  const rows = dom.courseBody.querySelectorAll('tr');
  rows.forEach((r, i) => {
    r.children[0].textContent = i + 1; // first td is the number
  });
}

// -------------------------------------------------
// Calculation logic
// -------------------------------------------------
function calculate() {
  let totalSks = 0;
  let totalMutu = 0;

  const rows = dom.courseBody.querySelectorAll('tr');
  rows.forEach(r => {
    const sks = parseFloat(r.querySelector('.course-sks').value) || 0;
    const bobot = parseFloat(r.querySelector('.course-bobot').value) || 0;
    totalSks += sks;
    totalMutu += sks * bobot;
  });

  const ipSemester = totalSks > 0 ? totalMutu / totalSks : 0;

  // Cumulative data
  const prevSks = parseFloat(dom.prevSks.value) || 0;
  const prevIpk = parseFloat(dom.prevIpk.value) || 0;
  const prevMutu = prevSks * prevIpk;

  const totalSksKum = prevSks + totalSks;
  const totalMutuKum = prevMutu + totalMutu;
  const ipkAkhir = totalSksKum > 0 ? totalMutuKum / totalSksKum : 0;

  // Update UI
  dom.totalSksSem.textContent = totalSks;
  dom.totalMutuSem.textContent = totalMutu.toFixed(2);
  dom.ipSem.textContent = ipSemester.toFixed(2);
  dom.totalSksKum.textContent = totalSksKum;
  dom.totalMutuKum.textContent = totalMutuKum.toFixed(2);
  dom.ipkAkhir.textContent = ipkAkhir.toFixed(2);
}

// -------------------------------------------------
// Validation
// -------------------------------------------------
function validateForm() {
  let valid = true;
  // Required student fields
  [dom.nama, dom.nim, dom.prodi, dom.kampus, dom.semester, dom.tahun].forEach(inp => {
    if (!inp.value.trim()) {
      inp.classList.add('error');
      valid = false;
    } else {
      inp.classList.remove('error');
    }
  });

  // At least one course with proper data
  const rows = dom.courseBody.querySelectorAll('tr');
  if (rows.length === 0) {
    alert('Tambah minimal satu mata kuliah.');
    return false;
  }

  rows.forEach(r => {
    const nameInp = r.querySelector('.course-name');
    const sksInp = r.querySelector('.course-sks');
    if (!nameInp.value.trim()) {
      nameInp.classList.add('error');
      valid = false;
    } else {
      nameInp.classList.remove('error');
    }
    if (!sksInp.value || parseFloat(sksInp.value) < 1) {
      sksInp.classList.add('error');
      valid = false;
    } else {
      sksInp.classList.remove('error');
    }
  });

  if (!valid) alert('Lengkapi semua data yang wajib.');
  return valid;
}

// -------------------------------------------------
// Persistence – LocalStorage
// -------------------------------------------------
function getHistory() {
  const raw = localStorage.getItem('ipk_history');
  return raw ? JSON.parse(raw) : [];
}

function setHistory(arr) {
  localStorage.setItem('ipk_history', JSON.stringify(arr));
}

function saveRecord() {
  if (!validateForm()) return;

  const record = {
    id: editRecordId || Date.now(),
    timestamp: new Date().toISOString(),
    student: {
      nama: dom.nama.value,
      nim: dom.nim.value,
      prodi: dom.prodi.value,
      kampus: dom.kampus.value,
      semester: dom.semester.value,
      tahun: dom.tahun.value,
      catatan: dom.catatan.value,
    },
    prev: {
      sks: parseFloat(dom.prevSks.value) || 0,
      ipk: parseFloat(dom.prevIpk.value) || 0,
    },
    courses: Array.from(dom.courseBody.querySelectorAll('tr')).map(r => ({
      name: r.querySelector('.course-name').value,
      sks: parseFloat(r.querySelector('.course-sks').value),
      grade: r.querySelector('.course-grade').value,
      bobot: parseFloat(r.querySelector('.course-bobot').value),
      mutu: parseFloat(r.querySelector('.course-mutu').textContent),
    })),
    result: {
      ipSemester: parseFloat(dom.ipSem.textContent),
      ipkAkhir: parseFloat(dom.ipkAkhir.textContent),
    },
  };

  const history = getHistory();
  const idx = history.findIndex(r => r.id === record.id);
  if (idx > -1) history[idx] = record; // update
  else history.unshift(record); // new record on top

  setHistory(history);
  editRecordId = null; // reset edit state
  alert('Data berhasil disimpan.');
  loadHistory();
}

function loadHistory(filter = '') {
  const history = getHistory();
  const term = filter.toLowerCase();
  const filtered = history.filter(rec => {
    const { nama, prodi, kampus, semester } = rec.student;
    return (
      nama.toLowerCase().includes(term) ||
      prodi.toLowerCase().includes(term) ||
      kampus.toLowerCase().includes(term) ||
      String(semester).includes(term)
    );
  });

  // Clear list
  dom.historyList.innerHTML = '';
  if (filtered.length === 0) {
    dom.historyList.innerHTML = '<p class="empty-state">Tidak ada riwayat.</p>';
    return;
  }

  filtered.forEach(rec => {
    const card = document.createElement('div');
    card.className = 'history-item';
    card.innerHTML = `
      <div class="history-info">
        <h3>${rec.student.nama} (${rec.student.nim})</h3>
        <div class="history-meta">
          <span>Kampus: ${rec.student.kampus}</span>
          <span>Prodi: ${rec.student.prodi}</span>
          <span>Semester: ${rec.student.semester}</span>
          <span>IP: ${rec.result.ipSemester.toFixed(2)}</span>
          <span>IPK: ${rec.result.ipkAkhir.toFixed(2)}</span>
          <span>${new Date(rec.timestamp).toLocaleDateString('id-ID')}</span>
        </div>
      </div>
      <div class="history-actions">
        <button class="btn btn-primary btn-sm" data-id="${rec.id}" data-action="load">Buka</button>
        <button class="btn btn-danger btn-sm" data-id="${rec.id}" data-action="delete">Hapus</button>
      </div>
    `;
    dom.historyList.appendChild(card);
  });
}

function loadRecord(id) {
  const history = getHistory();
  const rec = history.find(r => r.id === id);
  if (!rec) return;

  // Populate student fields
  dom.nama.value = rec.student.nama;
  dom.nim.value = rec.student.nim;
  dom.prodi.value = rec.student.prodi;
  dom.kampus.value = rec.student.kampus;
  dom.semester.value = rec.student.semester;
  dom.tahun.value = rec.student.tahun;
  dom.catatan.value = rec.student.catatan;

  // Prev cumulative
  dom.prevSks.value = rec.prev.sks;
  dom.prevIpk.value = rec.prev.ipk;

  // Courses – rebuild table
  dom.courseBody.innerHTML = '';
  rec.courses.forEach(c => addCourseRow(c));

  calculate();
  editRecordId = id; // set edit mode
  switchTab('calc');
}

function deleteRecord(id) {
  if (!confirm('Hapus data riwayat ini?')) return;
  const history = getHistory().filter(r => r.id !== id);
  setHistory(history);
  loadHistory();
}

// -------------------------------------------------
// Settings – Grade weights
// -------------------------------------------------
function renderGradeSettings() {
  dom.gradeSettings.innerHTML = '';
  Object.entries(grades).forEach(([grade, weight]) => {
    const wrapper = document.createElement('div');
    wrapper.className = 'grade-setting';
    wrapper.innerHTML = `
      <label>${grade}</label>
      <input type="number" step="0.01" data-grade="${grade}" value="${weight}">
    `;
    dom.gradeSettings.appendChild(wrapper);
  });
}

function saveGrades() {
  const inputs = dom.gradeSettings.querySelectorAll('input');
  inputs.forEach(inp => {
    const g = inp.dataset.grade;
    const val = parseFloat(inp.value);
    if (!isNaN(val)) grades[g] = val;
  });
  localStorage.setItem('ipk_grades', JSON.stringify(grades));
  alert('Bobot nilai disimpan.');
  // refresh grade dropdowns in existing rows
  dom.courseBody.querySelectorAll('tr').forEach(row => {
    const sel = row.querySelector('.course-grade');
    const current = sel.value;
    sel.innerHTML = '';
    Object.keys(grades).forEach(g => {
      const opt = document.createElement('option');
      opt.value = g;
      opt.textContent = g;
      if (g === current) opt.selected = true;
      sel.appendChild(opt);
    });
  });
}

function resetGrades() {
  grades = { ...DEFAULT_GRADES };
  localStorage.setItem('ipk_grades', JSON.stringify(grades));
  renderGradeSettings();
  alert('Bobot nilai dikembalikan ke default.');
}

// -------------------------------------------------
// Global event listeners
// -------------------------------------------------
function attachEventListeners() {
  // Tab navigation
  dom.tabButtons.forEach(btn => btn.addEventListener('click', () => switchTab(btn.dataset.target)));

  // Course actions
  dom.addCourseBtn.addEventListener('click', () => addCourseRow());
  dom.resetFormBtn.addEventListener('click', resetForm);

  // Calculation & Save
  dom.calcBtn.addEventListener('click', calculate);
  dom.saveBtn.addEventListener('click', saveRecord);
  dom.printBtn.addEventListener('click', () => window.print());

  // History actions – delegation
  dom.historyList.addEventListener('click', e => {
    const btn = e.target.closest('button');
    if (!btn) return;
    const id = parseInt(btn.dataset.id, 10);
    const action = btn.dataset.action;
    if (action === 'load') loadRecord(id);
    else if (action === 'delete') deleteRecord(id);
  });

  // History search
  dom.searchHistory.addEventListener('input', e => loadHistory(e.target.value));

  // Settings actions
  dom.saveGradesBtn.addEventListener('click', saveGrades);
  dom.resetGradesBtn.addEventListener('click', resetGrades);
}

// -------------------------------------------------
// Reset form (clear all inputs)
// -------------------------------------------------
function resetForm() {
  if (!confirm('Reset semua data? Data yang belum disimpan akan hilang.')) return;
  // student fields
  [dom.nama, dom.nim, dom.prodi, dom.kampus, dom.semester, dom.tahun, dom.catatan].forEach(inp => (inp.value = ''));
  dom.prevSks.value = '0';
  dom.prevIpk.value = '0';

  // courses
  dom.courseBody.innerHTML = '';
  addCourseRow();

  // results
  dom.totalSksSem.textContent = '0';
  dom.totalMutuSem.textContent = '0.00';
  dom.ipSem.textContent = '0.00';
  dom.totalSksKum.textContent = '0';
  dom.totalMutuKum.textContent = '0.00';
  dom.ipkAkhir.textContent = '0.00';

  editRecordId = null;
}

// -------------------------------------------------
// Start app
// -------------------------------------------------
init();
