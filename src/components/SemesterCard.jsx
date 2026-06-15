import React from 'react';
import CourseRow from './CourseRow';
import { calculateIPS } from '../utils/calculator';

const SemesterCard = ({ semester, onUpdate, onDelete }) => {
  const { ips, totalSKS } = calculateIPS(semester.courses);

  const addCourse = () => {
    const newCourse = { id: Date.now(), name: '', sks: 2, grade: 'A' };
    onUpdate({
      ...semester,
      courses: [...semester.courses, newCourse]
    });
  };

  const updateCourse = (updatedCourse) => {
    onUpdate({
      ...semester,
      courses: semester.courses.map(c => c.id === updatedCourse.id ? updatedCourse : c)
    });
  };

  const deleteCourse = (courseId) => {
    onUpdate({
      ...semester,
      courses: semester.courses.filter(c => c.id !== courseId)
    });
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden mb-6 transition-all hover:shadow-md">
      <div className="bg-slate-50 px-6 py-4 border-b border-slate-100 flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <input
            type="text"
            className="font-bold text-slate-800 bg-transparent border-b border-transparent hover:border-slate-300 focus:border-itera-red focus:outline-none px-1"
            value={semester.name}
            onChange={(e) => onUpdate({ ...semester, name: e.target.value })}
          />
        </div>
        <div className="flex items-center space-x-4">
          <div className="text-right">
            <p className="text-[10px] text-slate-400 uppercase font-bold tracking-wider">IPS</p>
            <p className="font-bold text-itera-red">{ips}</p>
          </div>
          <button
            onClick={onDelete}
            className="p-1.5 text-slate-300 hover:text-red-500 transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </button>
        </div>
      </div>
      <div className="p-6">
        {semester.courses.map(course => (
          <CourseRow
            key={course.id}
            course={course}
            onUpdate={updateCourse}
            onDelete={() => deleteCourse(course.id)}
          />
        ))}
        <button
          onClick={addCourse}
          className="mt-4 w-full py-2 border-2 border-dashed border-slate-200 rounded-lg text-slate-400 font-medium hover:border-itera-red hover:text-itera-red hover:bg-red-50 transition-all flex items-center justify-center space-x-2"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
          </svg>
          <span>Tambah Mata Kuliah</span>
        </button>
      </div>
      <div className="bg-slate-50 px-6 py-2 border-t border-slate-100 flex justify-end">
        <p className="text-xs text-slate-500 font-medium">Total SKS Semester: <span className="text-slate-700 font-bold">{totalSKS}</span></p>
      </div>
    </div>
  );
};

export default SemesterCard;
