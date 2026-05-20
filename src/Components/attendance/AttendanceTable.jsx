'use client';

import React from 'react';
import { MapPin } from 'lucide-react';
import SortTH from '@/Components/ui/SortTH';
import EmptyState from '@/Components/attendance/EmptyState';
import { formatTime } from '@/lib/attendanceUtils';
import { STATUS_STYLE, DESIG_STYLE, REGION_COLOR } from '@/lib/attendanceStyles';

/**
 * @fileoverview Desktop layout data table for attendance logs.
 */

/**
 * @typedef {Object} AttendanceTableProps
 * @property {any[]} pageData - Slice of dataset showing on the current page.
 * @property {Object} sortConfig - Active sorting layout parameters.
 * @property {string} sortConfig.key - Sort key field.
 * @property {string} sortConfig.direction - Directing toggle ('asc' | 'desc').
 * @property {function(string): void} onSort - Method controlling sort keys toggle.
 * @property {number} currentPage - Page index.
 * @property {number} entriesPerPage - Display threshold count per page.
 * @property {boolean} hasSearched - Denotes if the user triggered filters search.
 */

/**
 * Sub-component to format and display checked-in and out timestamps.
 * @param {{ startTime: string, endTime: string }} props
 */
function TimeRangeCell({ startTime, endTime }) {
  const start = formatTime(startTime);
  const end = formatTime(endTime);
  const isAbsent = start === '—';

  if (isAbsent) {
    return <span className="mono text-[10px] text-slate-300">—</span>;
  }

  return (
    <div className="flex flex-col gap-0.5 leading-tight">
      <span className="mono text-[11px] text-emerald-700 font-semibold">{start}</span>
      <span className="mono text-[11px] text-rose-600 font-semibold">{end}</span>
    </div>
  );
}

/**
 * Renders the tabular attendance report for large monitors.
 * @param {AttendanceTableProps} props - Component properties.
 */
export function AttendanceTable({
  pageData,
  sortConfig,
  onSort,
  currentPage,
  entriesPerPage,
  hasSearched
}) {
  return (
    <div className="hidden lg:block overflow-x-auto">
      <table className="w-full text-left text-xs border-collapse">
        <thead>
          <tr className="bg-[#2F4050] text-white text-[11px] font-bold uppercase tracking-wider">
            <th className="py-3.5 px-4 text-center w-12 border-r border-white/10">#</th>
            <SortTH col="date" label="Date" sortConfig={sortConfig} onSort={onSort} />
            <SortTH col="company" label="Company" sortConfig={sortConfig} onSort={onSort} />
            <SortTH col="group" label="Group" sortConfig={sortConfig} onSort={onSort} />
            <SortTH col="region" label="Region" sortConfig={sortConfig} onSort={onSort} />
            <SortTH col="zone" label="Zone" sortConfig={sortConfig} onSort={onSort} />
            <SortTH col="staffId" label="Staff ID" sortConfig={sortConfig} onSort={onSort} />
            <SortTH col="staffName" label="Name" sortConfig={sortConfig} onSort={onSort} />
            <SortTH col="designation" label="Designation" sortConfig={sortConfig} onSort={onSort} />
            <th className="py-3.5 px-3 whitespace-nowrap">Mobile</th>
            <th className="py-3.5 px-3 whitespace-nowrap">Time Range</th>
            <SortTH col="status" label="Status" sortConfig={sortConfig} onSort={onSort} className="text-center" />
            <th className="py-3.5 px-3 text-center">In</th>
            <th className="py-3.5 px-3 text-center">Out</th>
            <th className="py-3.5 px-3 text-center">GPS</th>
          </tr>
        </thead>
        <tbody>
          {pageData.length > 0 ? (
            pageData.map((row, idx) => (
              <tr
                key={row.id}
                className="row-in border-b border-slate-100 hover:bg-[#410078]/[0.02] transition-colors"
                style={{ animationDelay: `${idx * 0.012}s` }}
              >
                <td className="py-3 px-4 text-center mono text-slate-400 text-[11px] bg-slate-50/60 border-r border-slate-100">
                  {(currentPage - 1) * entriesPerPage + idx + 1}
                </td>
                <td className="py-3 px-3 mono font-bold text-slate-900 whitespace-nowrap">{row.date}</td>
                <td className="py-3 px-3 text-slate-600 whitespace-nowrap text-[11px]">{row.company}</td>
                <td className="py-3 px-3 text-slate-500 whitespace-nowrap text-[11px]">{row.group}</td>
                <td className={`py-3 px-3 whitespace-nowrap ${REGION_COLOR(row.region)}`}>{row.region}</td>
                <td className="py-3 px-3 mono text-slate-500 text-[10px] whitespace-nowrap">{row.zone}</td>
                <td className="py-3 px-3 mono font-bold text-slate-900 bg-slate-50/50 whitespace-nowrap">{row.staffId}</td>
                <td className="py-3 px-3 font-bold text-slate-900 whitespace-nowrap">{row.staffName}</td>
                <td className="py-3 px-3 whitespace-nowrap">
                  <span className={`px-2 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wide border
                    ${DESIG_STYLE[row.designation] || 'bg-slate-100 border-slate-200 text-slate-600'}`}>
                    {row.designation}
                  </span>
                </td>
                <td className="py-3 px-3 mono text-slate-600 whitespace-nowrap text-[11px]">{row.staffMobile}</td>

                {/* Merged time logs */}
                <td className="py-3 px-3 whitespace-nowrap">
                  <TimeRangeCell startTime={row.startTime} endTime={row.endTime} />
                </td>

                <td className="py-3 px-3 text-center">
                  <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wide
                    ${STATUS_STYLE[row.status] || 'bg-slate-100'}`}>
                    {row.status}
                  </span>
                </td>
                <td className="py-3 px-2 text-center">
                  {row.startImage ? (
                    <img
                      src={row.startImage}
                      alt="in"
                      className="w-8 h-8 object-cover rounded-lg mx-auto border border-slate-200 shadow-sm hover:scale-150 transition-transform cursor-zoom-in"
                    />
                  ) : (
                    <span className="mono text-[10px] text-slate-300">—</span>
                  )}
                </td>
                <td className="py-3 px-2 text-center">
                  {row.endImage ? (
                    <img
                      src={row.endImage}
                      alt="out"
                      className="w-8 h-8 object-cover rounded-lg mx-auto border border-slate-200 shadow-sm hover:scale-150 transition-transform cursor-zoom-in"
                    />
                  ) : (
                    <span className="mono text-[10px] text-slate-300">—</span>
                  )}
                </td>
                <td className="py-3 px-3 text-center">
                  <a
                    href={row.location}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center justify-center w-7 h-7 bg-sky-50 hover:bg-sky-100 border border-sky-200 text-sky-600 rounded-lg transition-colors"
                  >
                    <MapPin className="w-3.5 h-3.5" />
                  </a>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={15}>
                <EmptyState hasSearched={hasSearched} />
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default AttendanceTable;
