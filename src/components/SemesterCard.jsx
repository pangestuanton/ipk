import React from 'react';
import CourseRow from './CourseRow';
import { calculateIPS } from '../utils/calculator';

const SemesterCard = ({ semester, onUpdate, onDelete }) => {
  const { ips, totalSKS } = calculateIPS(semester.courses);

  const addCourse = () => {
    const newCourse = { id: Date.now(), name: '', sks: 3, grade: 'A' };
    onUpdate({
      ...semester,
      courses: [...semester.courses, newCourse]
    });
  };

  const updateCourse = (updatedCourse) => {
    onUpdate({
      ...semester,
      courses: semester.courses.map((c) => (c.id === updatedCourse.id ? updatedCourse : c))
    });
  };

  const deleteCourse = (courseId) => {
    onUpdate({
      ...semester,
      courses: semester.courses.filter((c) => c.id !== courseId)
    });
  };

  return (
    <div className="overflow-hidden rounded-[28px] border border-blue-100 bg-white shadow-[0_18px_45px_rgba(15,23,42,0.06)] transition-all hover:shadow-[0_24px_60px_rgba(37,99,235,0.10)]">
      <div className="flex flex-col gap-4 border-b border-blue-100 bg-gradient-to-r from-blue-50 to-white px-6 py-5 md:flex-row md:items-center md:justify-between">
        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-600 text-sm font-black uppercase tracking-[0.2em] text-white">
            {semester.name.slice(0, 2)}
          </div>
          <div>
            <input
              type="text"
              className="w-full border-b border-transparent bg-transparent px-1 text-xl font-black text-slate-900 outline-none transition hover:border-blue-200 focus:border-blue-500"
              value={semester.name}
              onChange={(e) => onUpdate({ ...semester, name: e.target.value })}
            />
            <p className="mt-1 text-sm text-slate-500">Course inputs and semester performance summary</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <div className="rounded-2xl border border-blue-100 bg-white px-4 py-3 text-right shadow-sm">
            <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-slate-400">Semester GPA</p>
            <p className="text-2xl font-black text-blue-700">{ips}</p>
          </div>
          <button
            onClick={onDelete}
            className="rounded-2xl border border-slate-200 px-3 py-3 text-sm font-semibold text-slate-500 transition hover:border-blue-200 hover:text-blue-700"
          >
            Remove
          </button>
        </div>
      </div>
      <div className="p-6">
        <div className="mb-4 grid grid-cols-12 gap-3 px-1 text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">
          <div className="col-span-6">Course</div>
          <div className="col-span-2">Credits</div>
          <div className="col-span-3">Grade</div>
          <div className="col-span-1 text-center">Action</div>
        </div>
        {semester.courses.map((course) => (
          <CourseRow
            key={course.id}
            course={course}
            onUpdate={updateCourse}
            onDelete={() => deleteCourse(course.id)}
          />
        ))}
        <div className="mt-5 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <button
            onClick={addCourse}
            className="inline-flex items-center justify-center rounded-2xl border border-blue-200 bg-blue-50 px-5 py-3 text-sm font-bold text-blue-700 transition hover:bg-blue-100"
          >
            Add Course
          </button>
          <button className="inline-flex items-center justify-center rounded-2xl bg-blue-600 px-5 py-3 text-sm font-bold text-white shadow-md shadow-blue-200 transition hover:bg-blue-700">
            Calculate
          </button>
        </div>
      </div>
      <div className="flex justify-end border-t border-blue-100 bg-slate-50/80 px-6 py-3">
        <p className="text-sm font-medium text-slate-500">
          Semester Credits: <span className="font-black text-slate-800">{totalSKS}</span>
        </p>
      </div>
    </div>
  );
};

export default SemesterCard;
