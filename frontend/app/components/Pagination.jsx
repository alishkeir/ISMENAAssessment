'use client';
import { useState } from 'react';

export default function Pagination({ lastPage, current, handleClick }) {
  const [currentPage, setCurrentPage] = useState(current || 1);

  function setPage(index) {
    setCurrentPage(index);
    handleClick(index);
  }

  function DisplayPages() {
    const pages = [];

    for (let i = 1; i <= lastPage; i++) {
      if (i === currentPage) {
        pages.push(
          <a
            key={i}
            style={{ pointerEvents: 'none', userSelect: 'none' }}
            className='relative z-10 inline-flex items-center bg-indigo-600 px-4 py-2 text-sm font-semibold text-white focus:z-20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'
          >
            {i}
          </a>
        );
      } else {
        pages.push(
          <a
            key={i}
            style={{ userSelect: 'none' }}
            onClick={() => setPage(i)}
            className='relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0'
          >
            {i}
          </a>
        );
      }
    }

    return pages;
  }

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: '20px',
      }}
    >
      <DisplayPages />
    </div>
  );
}
