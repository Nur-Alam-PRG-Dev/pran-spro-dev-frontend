'use client';

import React from 'react';
import { TrendingUp, ShieldAlert } from 'lucide-react';

/**
 * @fileoverview Placeholder component shown when no filters have been submitted or when search yields empty arrays.
 */

/**
 * @typedef {Object} EmptyStateProps
 * @property {boolean} hasSearched - Denotes if the user has triggered an active lookup.
 */

/**
 * Renders an inline placeholder message.
 * @param {EmptyStateProps} props - Component properties.
 */
export function EmptyState({ hasSearched }) {
  if (!hasSearched) {
    return (
      <div className="w-full text-center py-24 flex flex-col items-center gap-4">
        <div className="w-16 h-16 rounded-2xl bg-[#410078]/5 flex items-center justify-center border border-[#410078]/10">
          <TrendingUp className="w-8 h-8 text-[#410078]/30" />
        </div>
        <div>
          <p className="text-sm font-bold text-slate-700">Ready to load data</p>
          <p className="text-xs text-slate-400 max-w-xs mt-1">
            Set your filters above and click <span className="font-bold text-[#410078]">Show Results</span> to fetch attendance records.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full text-center py-20 flex flex-col items-center gap-3">
      <div className="w-14 h-14 rounded-2xl bg-slate-100 flex items-center justify-center">
        <ShieldAlert className="w-7 h-7 text-slate-300" />
      </div>
      <p className="text-sm font-bold text-slate-700">No Records Found</p>
      <p className="text-xs text-slate-400 max-w-xs">
        Adjust your filters and click Show Results, or expand the date range.
      </p>
    </div>
  );
}

export default EmptyState;
