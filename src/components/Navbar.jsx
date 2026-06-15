import React from 'react';

const Navbar = () => {
  return (
    <nav className="bg-itera-red text-white shadow-lg py-4 px-6 sticky top-0 z-50">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center">
            <span className="text-itera-red font-bold text-xl">I</span>
          </div>
          <div>
            <h1 className="text-xl font-bold tracking-tight">ITERA GPA Calculator</h1>
            <p className="text-xs text-itera-gold font-medium uppercase tracking-widest">Institut Teknologi Sumatera</p>
          </div>
        </div>
        <div className="hidden md:block text-sm font-medium opacity-80">
          Akademik & Perencanaan Masa Depan
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
