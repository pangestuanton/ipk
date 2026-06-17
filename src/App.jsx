import React from 'react';
import Navbar from './components/Navbar';
import SemesterCard from './components/SemesterCard';
import SummaryStats from './components/SummaryStats';
import { useLocalStorage } from './hooks/useLocalStorage';
import { calculateIPK } from './utils/calculator';

const App = () => {
  const [semesters, setSemesters] = useLocalStorage('calcetera-gpa-data', [
    {
      id: 1,
      name: 'Semester 1',
      courses: [
        { id: Date.now(), name: 'Calculus I', sks: 3, grade: 'A' },
        { id: Date.now() + 1, name: 'Programming Fundamentals', sks: 3, grade: 'AB' }
      ]
    }
  ]);

  const { ipk, cumulativeSKS } = calculateIPK(semesters);

  const addSemester = () => {
    const newSemester = {
      id: Date.now(),
      name: `Semester ${semesters.length + 1}`,
      courses: [{ id: Date.now() + 1, name: '', sks: 3, grade: 'A' }]
    };
    setSemesters([...semesters, newSemester]);
  };

  const updateSemester = (updatedSemester) => {
    setSemesters(semesters.map((s) => (s.id === updatedSemester.id ? updatedSemester : s)));
  };

  const deleteSemester = (semesterId) => {
    if (semesters.length > 1) {
      setSemesters(semesters.filter((s) => s.id !== semesterId));
    } else {
      alert('At least one semester is required.');
    }
  };

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top,_#eff6ff,_#f8fbff_45%,_#ffffff_100%)] text-slate-900">
      <Navbar />
      <main className="mx-auto flex w-full max-w-6xl flex-col gap-8 px-4 py-8 md:px-6 lg:py-12">
        <section className="grid gap-6 lg:grid-cols-[1.15fr_0.85fr] lg:items-start">
          <div className="rounded-[28px] border border-blue-100 bg-white/90 p-8 shadow-[0_20px_60px_rgba(37,99,235,0.08)] backdrop-blur">
            <span className="inline-flex items-center rounded-full border border-blue-200 bg-blue-50 px-3 py-1 text-xs font-semibold uppercase tracking-[0.24em] text-blue-700">
              CALCUTERA
            </span>
            <h1 className="mt-5 text-4xl font-black tracking-tight text-slate-900 md:text-5xl">
              Modern GPA tracking with a clear semester overview.
            </h1>
            <p className="mt-4 max-w-2xl text-base leading-7 text-slate-600 md:text-lg">
              Add courses, select grades, and calculate your cumulative GPA with a clean academic dashboard.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <button
                onClick={addSemester}
                className="inline-flex items-center justify-center rounded-2xl bg-blue-600 px-6 py-4 text-sm font-bold text-white shadow-lg shadow-blue-200 transition hover:bg-blue-700"
              >
                Calculate & Add Semester
              </button>
              <div className="inline-flex items-center rounded-2xl border border-blue-100 bg-blue-50 px-5 py-4 text-sm font-medium text-blue-800">
                Semester Summary: {semesters.length} semesters · {cumulativeSKS} credits
              </div>
            </div>
          </div>
          <SummaryStats ipk={ipk} totalSKS={cumulativeSKS} semesterCount={semesters.length} />
        </section>

        <section className="space-y-6">
          {semesters.map((semester) => (
            <SemesterCard
              key={semester.id}
              semester={semester}
              onUpdate={updateSemester}
              onDelete={() => deleteSemester(semester.id)}
            />
          ))}
        </section>
      </main>
    </div>
  );
};

export default App;
