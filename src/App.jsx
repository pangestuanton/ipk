import React from 'react';
import Navbar from './components/Navbar';
import SemesterCard from './components/SemesterCard';
import SummaryStats from './components/SummaryStats';
import { useLocalStorage } from './hooks/useLocalStorage';
import { calculateIPK } from './utils/calculator';

const App = () => {
  const [semesters, setSemesters] = useLocalStorage('itera-gpa-data', [
    {
      id: 1,
      name: 'Semester 1',
      courses: [
        { id: Date.now(), name: 'Matematika Dasar IA', sks: 3, grade: 'A' },
        { id: Date.now() + 1, name: 'Fisika Dasar IA', sks: 3, grade: 'AB' }
      ]
    }
  ]);

  const { ipk, cumulativeSKS } = calculateIPK(semesters);

  const addSemester = () => {
    const newSemester = {
      id: Date.now(),
      name: `Semester ${semesters.length + 1}`,
      courses: [{ id: Date.now() + 1, name: '', sks: 2, grade: 'A' }]
    };
    setSemesters([...semesters, newSemester]);
  };

  const updateSemester = (updatedSemester) => {
    setSemesters(semesters.map(s => s.id === updatedSemester.id ? updatedSemester : s));
  };

  const deleteSemester = (semesterId) => {
    if (semesters.length > 1) {
      setSemesters(semesters.filter(s => s.id !== semesterId));
    } else {
      alert("Minimal harus ada satu semester.");
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <Navbar />
      
      <main className="container mx-auto px-4 py-8 max-w-4xl flex-grow">
        <header className="mb-10">
          <h2 className="text-3xl font-black text-slate-800 mb-2">Kalkulator IPK</h2>
          <p className="text-slate-500">Pantau pencapaian akademikmu di ITERA dengan mudah dan cepat.</p>
        </header>

        <SummaryStats ipk={ipk} totalSKS={cumulativeSKS} />

        <div className="space-y-6">
          {semesters.map(semester => (
            <SemesterCard
              key={semester.id}
              semester={semester}
              onUpdate={updateSemester}
              onDelete={() => deleteSemester(semester.id)}
            />
          ))}
        </div>

        <button
          onClick={addSemester}
          className="mt-8 w-full py-4 bg-white border-2 border-slate-200 rounded-2xl text-slate-600 font-bold hover:border-itera-red hover:text-itera-red transition-all flex items-center justify-center space-x-2 group shadow-sm"
        >
          <div className="w-8 h-8 bg-slate-100 rounded-full flex items-center justify-center group-hover:bg-red-100 transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
            </svg>
          </div>
          <span>Tambah Semester Baru</span>
        </button>
      </main>

      <footer className="bg-white border-t border-slate-100 py-8 mt-12">
        <div className="container mx-auto px-4 text-center">
          <p className="text-slate-400 text-sm">
            © {new Date().getFullYear()} ITERA GPA Calculator. Dikembangkan untuk Mahasiswa Institut Teknologi Sumatera.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default App;
