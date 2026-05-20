'use client';

import React, { useMemo } from 'react';

/**
 * @fileoverview Ellipsis-based pagination control supporting next/previous options and numerical shortcuts.
 */

/**
 * @typedef {Object} PaginationProps
 * @property {number} currentPage - The current active page index.
 * @property {number} totalPages - Total available pages.
 * @property {function(number|function):void} onChange - Triggered upon moving pages.
 */

/**
 * Renders standard page navigation controls.
 * @param {PaginationProps} props - Component properties.
 */
export function Pagination({
  currentPage,
  totalPages,
  onChange
}) {
  const pages = useMemo(() => {
    if (totalPages <= 7) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }
    const arr = [];
    if (currentPage <= 4) {
      for (let i = 1; i <= 5; i++) arr.push(i);
      arr.push('…');
      arr.push(totalPages);
    } else if (currentPage >= totalPages - 3) {
      arr.push(1);
      arr.push('…');
      for (let i = totalPages - 4; i <= totalPages; i++) arr.push(i);
    } else {
      arr.push(1);
      arr.push('…');
      for (let i = currentPage - 1; i <= currentPage + 1; i++) arr.push(i);
      arr.push('…');
      arr.push(totalPages);
    }
    return arr;
  }, [currentPage, totalPages]);

  return (
    <div className="flex items-center gap-1 flex-wrap justify-center">
      <button
        onClick={() => onChange(p => Math.max(p - 1, 1))}
        disabled={currentPage === 1}
        className="px-3 py-1.5 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 text-xs font-bold disabled:opacity-40 disabled:cursor-not-allowed transition-all"
      >
        Prev
      </button>

      {pages.map((p, i) =>
        p === '…' ? (
          <span key={`e${i}`} className="px-1 text-slate-400 text-xs">
            …
          </span>
        ) : (
          <button
            key={p}
            onClick={() => onChange(p)}
            className={`w-8 h-8 rounded-lg text-xs font-bold border transition-all
              ${currentPage === p
                ? 'bg-[#410078] border-[#410078] text-white shadow-md shadow-[#410078]/30'
                : 'bg-white border-slate-200 hover:border-[#410078]/30 hover:bg-slate-50'}`}
          >
            {p}
          </button>
        )
      )}

      <button
        onClick={() => onChange(p => Math.min(p + 1, totalPages))}
        disabled={currentPage === totalPages}
        className="px-3 py-1.5 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 text-xs font-bold disabled:opacity-40 disabled:cursor-not-allowed transition-all"
      >
        Next
      </button>
    </div>
  );
}

export default Pagination;
