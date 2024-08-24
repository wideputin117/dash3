import React from 'react';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import '@fortawesome/fontawesome-free/css/all.min.css';

const Navbar = ({ searchTerm, onSearchChange }) => {
  return (
    <nav className="bg-white p-2">
      <div className="container mx-auto flex justify-between items-center h-10">
        <div className="text-blue-600 text-lg font-semibold">
          <span className='text-opacity-50 text-slate-400'>
            Home<ChevronRightIcon className='pb-1' />
          </span>
          Dashboard V2
        </div>
        <div className="relative w-1/4 mr-40">
          <input
            type="text"
            placeholder="Search Anything"
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            className="px-8 py-1 rounded-md border bg-slate-200 border-blue-400 focus:outline-4 focus:ring-1 focus:ring-blue-400 h-6 w-full"
          />
          <span className="absolute inset-y-0 left-2 flex items-center pl-1 pr-1 pointer-events-none">
            <i className="fas fa-search text-gray-400"></i>
          </span>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;