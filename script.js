const STORAGE_KEY = 'calcetera-gpa-data';
const GRADE_WEIGHTS = {
  A: 4.0,
  AB: 3.5,
  B: 3.0,
  BC: 2.5,
  C: 2.0,
  D: 1.0,
  E: 0.0
};

const semesterListEl = document.getElementById('semester-list');
const cumulativeGpaEl = document.getElementById('cumulative-gpa');
const totalCreditsEl = document.getElementById('total-credits');
const totalSemestersEl = document.getElementById('total-semesters');
const heroSummaryEl = document.getElementById('hero-summary');
const addSemesterTopEl = document.getElementById('add-semester-top');
const semesterTemplate = document.getElementById('semester-template');
const courseTemplate = document.getElementById('course-template');

const createId = () => Date.now() + Math.floor(Math.random() * 10000);

const defaultData = () => ([
  {
    id: 1,
    name: 'Semester 1',
    courses: [
      { id: createId(), name: 'Calculus I', sks: 3, grade: 'A' },
      { id: createId(), name: 'Programming Fundamentals', sks: 3, grade: 'AB' }
    ]
  }
]);

const loadSemesters = () => {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : defaultData();
  } catch {
    return defaultData();
  }
};

let semesters = loadSemesters();

const saveSemesters = () => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(semesters));
};

const calculateSemester = (courses) => {
  let totalSKS = 0;
  let totalPoints = 0;

  courses.forEach((course) => {
    const sks = Number(course.sks) || 0;
    const gradeWeight = GRADE_WEIGHTS[course.grade] ?? 0;
    totalSKS += sks;
    totalPoints += sks * gradeWeight;
  });

  return {
    totalSKS,
    totalPoints,
    ips: totalSKS ? (totalPoints / totalSKS).toFixed(2) : '0.00'
  };
};

const calculateCumulative = () => {
  let cumulativeSKS = 0;
  let cumulativePoints = 0;

  semesters.forEach((semester) => {
    const { totalSKS, totalPoints } = calculateSemester(semester.courses);
    cumulativeSKS += totalSKS;
    cumulativePoints += totalPoints;
  });

  return {
    cumulativeSKS,
    ipk: cumulativeSKS ? (cumulativePoints / cumulativeSKS).toFixed(2) : '0.00'
  };
};

const updateSemester = (semesterId, updater) => {
  semesters = semesters.map((semester) => {
    if (semester.id !== semesterId) return semester;
    return typeof updater === 'function' ? updater(semester) : updater;
  });
  persistAndRender();
};

const deleteSemester = (semesterId) => {
  if (semesters.length === 1) return;
  semesters = semesters.filter((semester) => semester.id !== semesterId);
  persistAndRender();
};

const addSemester = () => {
  semesters.push({
    id: createId(),
    name: `Semester ${semesters.length + 1}`,
    courses: [{ id: createId(), name: '', sks: 3, grade: 'A' }]
  });
  persistAndRender();
};

const addCourse = (semesterId) => {
  updateSemester(semesterId, (semester) => ({
    ...semester,
    courses: [...semester.courses, { id: createId(), name: '', sks: 3, grade: 'A' }]
  }));
};

const removeCourse = (semesterId, courseId) => {
  updateSemester(semesterId, (semester) => ({
    ...semester,
    courses: semester.courses.filter((course) => course.id !== courseId)
  }));
};

const updateCourse = (semesterId, courseId, field, value) => {
  updateSemester(semesterId, (semester) => ({
    ...semester,
    courses: semester.courses.map((course) => (
      course.id === courseId ? { ...course, [field]: value } : course
    ))
  }));
};

const renderCourse = (semesterId, course) => {
  const fragment = courseTemplate.content.cloneNode(true);
  const row = fragment.querySelector('.course-row');
  const nameInput = fragment.querySelector('.course-name-input');
  const sksInput = fragment.querySelector('.course-sks-input');
  const gradeInput = fragment.querySelector('.course-grade-input');
  const removeButton = fragment.querySelector('.remove-course-btn');

  row.dataset.courseId = course.id;
  nameInput.value = course.name;
  sksInput.value = course.sks;
  gradeInput.value = course.grade;

  nameInput.addEventListener('input', (event) => {
    updateCourse(semesterId, course.id, 'name', event.target.value);
  });

  sksInput.addEventListener('input', (event) => {
    updateCourse(semesterId, course.id, 'sks', event.target.value);
  });

  gradeInput.addEventListener('change', (event) => {
    updateCourse(semesterId, course.id, 'grade', event.target.value);
  });

  removeButton.addEventListener('click', () => {
    removeCourse(semesterId, course.id);
  });

  return fragment;
};

const renderSemester = (semester) => {
  const fragment = semesterTemplate.content.cloneNode(true);
  const card = fragment.querySelector('.semester-card');
  const badge = fragment.querySelector('.semester-badge');
  const semesterNameInput = fragment.querySelector('.semester-name-input');
  const semesterGpaValue = fragment.querySelector('.semester-gpa-value');
  const semesterTotalCredits = fragment.querySelector('.semester-total-credits');
  const courseList = fragment.querySelector('.course-list');
  const removeSemesterButton = fragment.querySelector('.remove-semester-btn');
  const addCourseButton = fragment.querySelector('.add-course-btn');

  const { ips, totalSKS } = calculateSemester(semester.courses);

  card.dataset.semesterId = semester.id;
  badge.textContent = semester.name.slice(0, 2).toUpperCase();
  semesterNameInput.value = semester.name;
  semesterGpaValue.textContent = ips;
  semesterTotalCredits.textContent = totalSKS;

  semesterNameInput.addEventListener('input', (event) => {
    updateSemester(semester.id, {
      ...semester,
      name: event.target.value
    });
  });

  removeSemesterButton.addEventListener('click', () => {
    deleteSemester(semester.id);
  });

  addCourseButton.addEventListener('click', () => {
    addCourse(semester.id);
  });

  semester.courses.forEach((course) => {
    courseList.appendChild(renderCourse(semester.id, course));
  });

  return fragment;
};

const renderSummary = () => {
  const { ipk, cumulativeSKS } = calculateCumulative();
  cumulativeGpaEl.textContent = ipk;
  totalCreditsEl.textContent = cumulativeSKS;
  totalSemestersEl.textContent = semesters.length;
  heroSummaryEl.textContent = `Semester Summary: ${semesters.length} semesters · ${cumulativeSKS} credits`;
};

const render = () => {
  semesterListEl.innerHTML = '';
  semesters.forEach((semester) => {
    semesterListEl.appendChild(renderSemester(semester));
  });
  renderSummary();
};

const persistAndRender = () => {
  saveSemesters();
  render();
};

addSemesterTopEl.addEventListener('click', addSemester);

render();
