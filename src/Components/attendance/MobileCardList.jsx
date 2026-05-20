'use client';

import React from 'react';
import { ChevronDown, ChevronUp, MapPin } from 'lucide-react';
import EmptyState from '@/Components/attendance/EmptyState';
import { formatTime } from '@/lib/attendanceUtils';
import { STATUS_STYLE, DESIG_STYLE, REGION_COLOR } from '@/lib/attendanceStyles';

/**
 * @fileoverview Compact, mobile-friendly lists showing cards instead of tables.
 */

/**
 * @typedef {Object} MobileCardListProps
 * @property {any[]} pageData - Slice of dataset showing on the current page.
 * @property {number} currentPage - Page index.
 * @property {number} entriesPerPage - Display threshold count per page.
 * @property {boolean} hasSearched - Denotes if the user triggered filters search.
 * @property {Record<number, boolean>} expandedRows - Registry containing indices of expanded cards.
 * @property {function(number): void} toggleRow - Method to fold/unfold specific employee card details.
 */

/**
 * Renders card components for small screen viewports.
 * @param {MobileCardListProps} props - Component properties.
 */
export function MobileCardList({
  pageData,
  currentPage,
  entriesPerPage,
  hasSearched,
  expandedRows,
  toggleRow
}) {
  return (
    <div className="block lg:hidden divide-y divide-slate-100">
      {pageData.length > 0 ? (
        pageData.map((row, idx) => {
          const exp = !!expandedRows[row.id];
          const startFmt = formatTime(row.startTime);
          const endFmt = formatTime(row.endTime);

          return (
            <div key={row.id} className="p-4 hover:bg-slate-50/60 transition-colors">
              <div className="flex items-start justify-between gap-2">
                <div className="space-y-1 flex-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="mono text-[10px] text-slate-400 font-bold">
                      #{(currentPage - 1) * entriesPerPage + idx + 1}
                    </span>
                    <span className="mono text-xs font-bold text-slate-900">{row.date}</span>
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${STATUS_STYLE[row.status]}`}>
                      {row.status}
                    </span>
                  </div>
                  <p className="text-sm font-bold text-slate-900">{row.staffName}</p>
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="mono text-[11px] text-slate-500">{row.staffId}</span>
                    <span className={`px-1.5 py-0.5 text-[10px] rounded border font-bold ${DESIG_STYLE[row.designation] || ''}`}>
                      {row.designation}
                    </span>
                    <span className={`text-xs ${REGION_COLOR(row.region)}`}>{row.region}</span>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => toggleRow(row.id)}
                  className="p-2 border border-slate-200 rounded-xl bg-slate-50 text-slate-500
                    hover:bg-[#410078]/10 hover:border-[#410078]/20 hover:text-[#410078] transition-colors flex-shrink-0"
                >
                  {exp ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                </button>
              </div>

              {exp && (
                <div
                  className="mt-3 pt-3 border-t border-dashed border-slate-200 grid grid-cols-2 gap-3 text-xs bg-slate-50 p-3 rounded-xl animate-fadeSlideDown"
                  style={{ animation: 'fadeSlideDown .15s ease' }}
                >
                  {[
                    ['Company', row.company],
                    ['Group', row.group],
                    ['Zone', row.zone],
                    ['Mobile', row.staffMobile]
                  ].map(([l, v]) => (
                    <div key={l}>
                      <span className="text-[9px] font-bold uppercase text-slate-400 tracking-wider block">{l}</span>
                      <span className="text-slate-800 font-semibold mono">{v || '—'}</span>
                    </div>
                  ))}

                  {/* Time logs */}
                  <div className="col-span-2 border-t border-slate-200 pt-2 grid grid-cols-2 gap-1 mono text-[11px]">
                    <div>
                      <span className="text-[9px] font-bold uppercase text-slate-400 block">In</span>
                      <span className="font-bold text-emerald-700">{startFmt}</span>
                    </div>
                    <div>
                      <span className="text-[9px] font-bold uppercase text-slate-400 block">Out</span>
                      <span className="font-bold text-rose-600">{endFmt}</span>
                    </div>
                  </div>

                  {/* Media attachment + GPS */}
                  <div className="col-span-2 flex items-center justify-between border-t border-slate-200 pt-2.5">
                    <div className="flex gap-4">
                      {[['In', row.startImage], ['Out', row.endImage]].map(([l, img]) => (
                        <div key={l} className="flex flex-col items-center gap-1">
                          <span className="text-[9px] font-bold uppercase text-slate-400">{l}</span>
                          {img ? (
                            <img src={img} alt="" className="w-9 h-9 rounded-lg object-cover border border-slate-200" />
                          ) : (
                            <span className="mono text-[10px] text-slate-400">None</span>
                          )}
                        </div>
                      ))}
                    </div>
                    <a
                      href={row.location}
                      target="_blank"
                      rel="noreferrer"
                      className="flex items-center gap-1.5 px-3 py-2 bg-sky-50 text-sky-600 border border-sky-200 rounded-xl font-bold text-[11px] hover:bg-sky-100 transition-colors"
                    >
                      <MapPin className="w-3.5 h-3.5" /> GPS
                    </a>
                  </div>
                </div>
              )}
            </div>
          );
        })
      ) : (
        <EmptyState hasSearched={hasSearched} />
      )}
    </div>
  );
}

export default MobileCardList;
