'use client';

import React from 'react';
import { ChevronUp, ChevronDown, ArrowUpDown } from 'lucide-react';

/**
 * @fileoverview Reusable table header component with dynamic sorting state indicators.
 */

/**
 * @typedef {Object} SortTHProps
 * @property {string} col - Key identifier of the sorting column.
 * @property {string} label - Display label text of the header.
 * @property {Object} sortConfig - Configuration object outlining active sort parameters.
 * @property {string} sortConfig.key - Sorting column key.
 * @property {string} sortConfig.direction - Directing toggle ('asc' | 'desc').
 * @property {function} onSort - Method invoked upon clicking to adjust table order.
 * @property {string} [className] - Optional custom styles.
 */

/**
 * Renders a sortable table header element.
 * @param {SortTHProps} props - Component properties.
 */
export function SortTH({
  col,
  label,
  sortConfig,
  onSort,
  className = ''
}) {
  const active = sortConfig.key === col;

  return (
    <th
      onClick={() => onSort(col)}
      className={`py-3.5 px-3 cursor-pointer hover:bg-white/10 transition-colors select-none whitespace-nowrap ${className}`}
    >
      <div className="flex items-center gap-1.5">
        {label}
        {active ? (
          sortConfig.direction === 'asc' ? (
            <ChevronUp className="w-3 h-3 text-violet-300" />
          ) : (
            <ChevronDown className="w-3 h-3 text-violet-300" />
          )
        ) : (
          <ArrowUpDown className="w-3 h-3 opacity-40" />
        )}
      </div>
    </th>
  );
}

export default SortTH;
