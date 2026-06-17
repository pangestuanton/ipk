import React from 'react';

const Navbar = () => {
  return (
    <nav className="sticky top-0 z-50 border-b border-blue-100 bg-white/85 px-6 py-4 shadow-sm backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-blue-600 text-lg font-black text-white shadow-md shadow-blue-200">
            C
          </div>
          <div>
            <h1 className="text-lg font-black tracking-[0.18em] text-slate-900">CALCUTERA</h1>
            <p className="text-xs font-medium uppercase tracking-[0.24em] text-blue-600">GPA Calculator</p>
          </div>
        </div>
        <div className="hidden rounded-full border border-blue-100 bg-blue-50 px-4 py-2 text-sm font-medium text-slate-600 md:block">
          Clean academic performance dashboard
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
