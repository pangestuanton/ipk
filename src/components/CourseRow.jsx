import React from 'react';
const CourseRow = ({ course, onUpdate, onDelete }) => {
  const grades = ['A', 'AB', 'B', 'BC', 'C', 'D', 'E'];

  return (
    <div className="grid grid-cols-12 gap-3 mb-3 items-center animate-fadeIn">
      <div className="col-span-6">
        <input
          type="text"
          placeholder="Nama Mata Kuliah"
          className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg focus:ring-2 focus:ring-itera-red focus:border-transparent outline-none transition-all"
          value={course.name}
          onChange={(e) => onUpdate({ ...course, name: e.target.value })}
        />
      </div>
      <div className="col-span-2">
        <input
          type="number"
          placeholder="SKS"
          min="1"
          max="6"
          className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg focus:ring-2 focus:ring-itera-red focus:border-transparent outline-none transition-all"
          value={course.sks}
          onChange={(e) => onUpdate({ ...course, sks: e.target.value })}
        />
      </div>
      <div className="col-span-3">
        <select
          className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg focus:ring-2 focus:ring-itera-red focus:border-transparent outline-none transition-all cursor-pointer"
          value={course.grade}
          onChange={(e) => onUpdate({ ...course, grade: e.target.value })}
        >
          {grades.map(g => (
            <option key={g} value={g}>{g}</option>
          ))}
        </select>
      </div>
      <div className="col-span-1 flex justify-center">
        <button
          onClick={onDelete}
          className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-full transition-colors"
          title="Hapus Matakuliah"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default CourseRow;
