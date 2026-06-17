import React from 'react';

const SummaryStats = ({ ipk, totalSKS, semesterCount }) => {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
      <div className="rounded-[28px] border border-blue-100 bg-white p-6 shadow-[0_18px_48px_rgba(59,130,246,0.08)]">
        <p className="text-xs font-semibold uppercase tracking-[0.24em] text-blue-600">Cumulative GPA</p>
        <p className="mt-4 text-5xl font-black tracking-tight text-slate-900">{ipk}</p>
        <p className="mt-3 text-sm leading-6 text-slate-500">A clear view of your overall academic performance.</p>
      </div>

      <div className="rounded-[28px] border border-blue-100 bg-gradient-to-br from-blue-600 to-sky-500 p-6 text-white shadow-[0_18px_48px_rgba(37,99,235,0.2)]">
        <p className="text-xs font-semibold uppercase tracking-[0.24em] text-blue-100">Semester Summary</p>
        <div className="mt-5 grid grid-cols-2 gap-4">
          <div className="rounded-2xl bg-white/15 p-4 backdrop-blur-sm">
            <p className="text-xs uppercase tracking-[0.2em] text-blue-100">Credits</p>
            <p className="mt-2 text-3xl font-black">{totalSKS}</p>
          </div>
          <div className="rounded-2xl bg-white/15 p-4 backdrop-blur-sm">
            <p className="text-xs uppercase tracking-[0.2em] text-blue-100">Semesters</p>
            <p className="mt-2 text-3xl font-black">{semesterCount}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SummaryStats;
