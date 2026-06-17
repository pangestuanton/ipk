import React from 'react';

const CourseRow = ({ course, onUpdate, onDelete }) => {
  const grades = ['A', 'AB', 'B', 'BC', 'C', 'D', 'E'];

  return (
    <div className="mb-3 grid grid-cols-12 items-center gap-3">
      <div className="col-span-12 md:col-span-6">
        <input
          type="text"
          placeholder="Course name"
          className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-700 outline-none transition focus:border-blue-400 focus:bg-white focus:ring-4 focus:ring-blue-100"
          value={course.name}
          onChange={(e) => onUpdate({ ...course, name: e.target.value })}
        />
      </div>
      <div className="col-span-4 md:col-span-2">
        <input
          type="number"
          placeholder="Credits"
          min="1"
          max="6"
          className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-700 outline-none transition focus:border-blue-400 focus:bg-white focus:ring-4 focus:ring-blue-100"
          value={course.sks}
          onChange={(e) => onUpdate({ ...course, sks: e.target.value })}
        />
      </div>
      <div className="col-span-5 md:col-span-3">
        <select
          className="w-full cursor-pointer rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-700 outline-none transition focus:border-blue-400 focus:bg-white focus:ring-4 focus:ring-blue-100"
          value={course.grade}
          onChange={(e) => onUpdate({ ...course, grade: e.target.value })}
        >
          {grades.map((g) => (
            <option key={g} value={g}>{g}</option>
          ))}
        </select>
      </div>
      <div className="col-span-3 flex justify-center md:col-span-1">
        <button
          onClick={onDelete}
          className="rounded-2xl border border-slate-200 px-3 py-3 text-sm font-semibold text-slate-500 transition hover:border-blue-200 hover:text-blue-700"
          title="Remove course"
        >
          Del
        </button>
      </div>
    </div>
  );
};

export default CourseRow;
