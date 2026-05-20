'use client';

import React from 'react';
import { Search, X, Download } from 'lucide-react';

/**
 * @fileoverview Desktop and tablet toolbar containing table pagination thresholds, search queries, and exports.
 */

/**
 * @typedef {Object} TableToolbarProps
 * @property {number} entriesPerPage - Threshold of records showcased per view page.
 * @property {function(number): void} setEntries - Mutator adjusting entries limits.
 * @property {string} searchQuery - The active dynamic search keyword.
 * @property {function(string): void} setSearch - Mutator updating searches.
 * @property {function(number): void} setPage - Mutator resetting index to first page.
 */

/**
 * Renders toolbar wrapper box containing search inputs and controls.
 * @param {TableToolbarProps} props - Component properties.
 */
export function TableToolbar({
  entriesPerPage,
  setEntries,
  searchQuery,
  setSearch,
  setPage
}) {
  const handleEntriesChange = (e) => {
    setEntries(Number(e.target.value));
    setPage(1);
  };

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
    setPage(1);
  };

  const clearSearch = () => {
    setSearch('');
    setPage(1);
  };

  return (
    <div className="px-5 py-4 border-b border-slate-100 bg-slate-50/50 flex flex-col md:flex-row items-center gap-3">
      {/* Entries per page threshold selector */}
      <div className="flex items-center gap-2 self-start md:self-auto">
        <span className="text-xs font-semibold text-slate-500">Show</span>
        <select
          value={entriesPerPage}
          onChange={handleEntriesChange}
          className="bg-white border border-slate-200 rounded-lg py-1.5 px-2 text-xs font-bold text-slate-700 outline-none focus:border-[#410078]"
        >
          {[10, 25, 50, 100].map(v => (
            <option key={v} value={v}>
              {v}
            </option>
          ))}
        </select>
        <span className="text-xs font-semibold text-slate-500">entries</span>
      </div>

      {/* Lookup controls */}
      <div className="flex items-center gap-2.5 ml-auto w-full md:w-auto">
        <div className="relative flex-1 md:w-64">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" />
          <input
            type="text"
            placeholder="Search in results…"
            value={searchQuery}
            onChange={handleSearchChange}
            className="w-full pl-9 pr-8 py-2 bg-white border border-slate-200 rounded-xl text-xs outline-none focus:ring-2 focus:ring-[#410078]/15 focus:border-[#410078] transition-all"
          />
          {searchQuery && (
            <button
              onClick={clearSearch}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        <button
          className="flex items-center gap-1.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs py-2 px-4 rounded-xl shadow-sm transition-all whitespace-nowrap hover:shadow-md"
        >
          <Download className="w-3.5 h-3.5" /> Export Excel
        </button>
      </div>
    </div>
  );
}

export default TableToolbar;
