'use client';

import React from 'react';
import { SlidersHorizontal, RefreshCw, ChevronUp, ChevronDown, TrendingUp } from 'lucide-react';
import Select from '@/Components/ui/Select';
import DateRangePicker from '@/Components/attendance/DateRangePicker';

import {
  companies as COMPANIES_LIST,
  groups as GROUPS_LIST,
  regions as REGIONS_LIST,
} from '@/app/standardReport/AttendanceReport/attendanceReportData';

/**
 * @fileoverview Filter Panel container compiling filter settings into a collapsible sheet.
 */

/**
 * @typedef {Object} FilterPanelProps
 * @property {Object} form - Active state of input filters.
 * @property {string|string[]} form.company - Company selections.
 * @property {string|string[]} form.group - Group selections.
 * @property {string|string[]} form.region - Region selections.
 * @property {string|string[]} form.zone - Zone selections.
 * @property {string} form.userType - Toggle value ('all' | 'sr' | 'sv').
 * @property {string} form.staffId - Raw typed staff query.
 * @property {string} form.startDate - Starting date string.
 * @property {string} form.endDate - Ending date string.
 * @property {function(string, any): void} setF - Setter mutating specific filter fields.
 * @property {string[]} zoneOptions - List of zones matching selected region.
 * @property {boolean} isDirty - Denotes if any fields have unsaved state.
 * @property {function(): void} onShow - Callback triggering main results filtering.
 * @property {function(): void} onReset - Callback clearing form inputs.
 * @property {boolean} filterOpen - Boolean describing collapse toggles.
 * @property {function(boolean): void} setFilterOpen - Setter toggling filter panel views.
 */

// Derived metadata lists for select filters
const COMPANY_NAMES = COMPANIES_LIST.map(c => c.name);
const GROUP_NAMES = GROUPS_LIST.map(g => g.name);
const REGION_NAMES = REGIONS_LIST.map(r => r.name);

/**
 * Renders the search settings console box.
 * @param {FilterPanelProps} props - Component properties.
 */
export function FilterPanel({
  form,
  setF,
  zoneOptions,
  isDirty,
  onShow,
  onReset,
  filterOpen,
  setFilterOpen
}) {
  return (
    <div
      className="bg-white rounded-2xl border border-slate-200 shadow-sm mb-5 transition-all duration-250"
      style={{ animation: 'fadeSlideDown .2s ease' }}
    >
      {/* Header bar */}
      <div
        role="button"
        tabIndex={0}
        onClick={() => setFilterOpen(!filterOpen)}
        onKeyDown={e => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            setFilterOpen(!filterOpen);
          }
        }}
        className="w-full flex items-center justify-between px-5 py-3.5 border-b border-slate-100 bg-slate-50/60 hover:bg-slate-100/60 transition-colors cursor-pointer select-none outline-none focus:bg-slate-100 rounded-t-2xl"
      >
        <div className="flex items-center gap-2">
          <SlidersHorizontal className="w-4 h-4 text-[#410078]" />
          <span className="text-sm font-bold text-slate-700">Filter Parameters</span>
          {isDirty && (
            <span className="text-[10px] font-bold bg-amber-100 text-amber-700 border border-amber-200 px-2 py-0.5 rounded-full animate-pulse">
              Unsaved changes
            </span>
          )}
        </div>
        <div className="flex items-center gap-3">
          {filterOpen && (
            <button
              type="button"
              onClick={ev => {
                ev.stopPropagation();
                onReset();
              }}
              className="flex items-center gap-1.5 text-xs font-bold text-slate-500 hover:text-rose-600 px-2.5 py-1.5 rounded-lg hover:bg-rose-50 transition-colors"
            >
              <RefreshCw className="w-3.5 h-3.5" /> Reset
            </button>
          )}
          <div className="w-7 h-7 rounded-lg bg-slate-100 flex items-center justify-center text-slate-500">
            {filterOpen ? (
              <ChevronUp className="w-4 h-4" />
            ) : (
              <ChevronDown className="w-4 h-4" />
            )}
          </div>
        </div>
      </div>

      {/* Foldable console options */}
      {filterOpen && (
        <div className="p-5" style={{ animation: 'fadeSlideDown .18s ease' }}>
          {/* Row 1 - Company, Group, Region, Zone dropdown selects */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
            <Select
              label="Company"
              required
              value={form.company}
              onChange={v => setF('company', v)}
              options={COMPANY_NAMES}
              multiple={true}
            />
            <Select
              label="Group"
              required
              value={form.group}
              onChange={v => setF('group', v)}
              options={GROUP_NAMES}
              multiple={true}
            />
            <Select
              label="Region"
              required
              value={form.region}
              onChange={v => setF('region', v)}
              options={REGION_NAMES}
              multiple={true}
            />
            <Select
              label="Zone"
              value={form.zone}
              onChange={v => setF('zone', v)}
              options={zoneOptions}
              multiple={true}
            />
          </div>

          {/* Row 2 - User Type, Staff ID, Date Range Selector */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* User Type pill buttons */}
            <div className="flex flex-col gap-1.5">
              <label className="text-[11px] font-bold uppercase tracking-wider text-slate-500">
                User Type<span className="text-rose-500 ml-0.5">*</span>
              </label>
              <div className="flex gap-1">
                {[
                  ['all', 'All'],
                  ['sr', 'SR'],
                  ['sv', 'SV']
                ].map(([val, lbl]) => (
                  <button
                    key={val}
                    type="button"
                    onClick={() => setF('userType', val)}
                    className={`flex-1 py-2.5 rounded-xl text-xs font-bold border transition-all ${
                      form.userType === val
                        ? 'bg-[#410078] text-white border-[#410078] shadow-md shadow-[#410078]/20'
                        : 'bg-white text-slate-600 border-slate-200 hover:border-[#410078]/30'
                    }`}
                  >
                    {lbl}
                  </button>
                ))}
              </div>
            </div>

            {/* Staff ID text input */}
            <div className="flex flex-col gap-1.5">
              <label className="text-[11px] font-bold uppercase tracking-wider text-slate-500">
                Staff ID
              </label>
              <input
                type="text"
                placeholder="e.g. UAE1023"
                value={form.staffId}
                onChange={e => setF('staffId', e.target.value)}
                className="w-full text-xs px-3 py-2.5 bg-white border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-[#410078]/15 focus:border-[#410078] transition-all font-medium mono shadow-sm"
              />
            </div>

            {/* Date Range Selector */}
            <div className="flex flex-col gap-1.5 sm:col-span-2 lg:col-span-2 relative z-20">
              <label className="text-[11px] font-bold uppercase tracking-wider text-slate-500">
                Date Range<span className="text-rose-500 ml-0.5">*</span>
              </label>
              <DateRangePicker
                startDate={form.startDate}
                endDate={form.endDate}
                onChange={({ startDate, endDate }) => {
                  setF('startDate', startDate);
                  setF('endDate', endDate);
                }}
              />
            </div>
          </div>

          {/* Show results button */}
          <div className="mt-5 flex justify-end">
            <button
              type="button"
              onClick={onShow}
              className={`flex items-center gap-2 bg-[#410078] hover:bg-[#330060] text-white font-bold text-sm px-8 py-3 rounded-xl shadow-lg shadow-[#410078]/30 transition-all hover:scale-[1.02] active:scale-[0.98] ${
                isDirty ? 'dirty-pulse shadow-md ring-2 ring-violet-500/10' : ''
              }`}
            >
              <TrendingUp className="w-4 h-4" />
              Show Results
              {isDirty && (
                <span className="w-2 h-2 rounded-full bg-amber-300 ml-1 flex-shrink-0" />
              )}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default FilterPanel;
