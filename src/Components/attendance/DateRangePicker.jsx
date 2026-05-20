'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Calendar, ChevronDown, ChevronLeft, ChevronRight, X } from 'lucide-react';
import { fmtDisplay, fmtD, parseD, MONTHS, WEEKDAYS } from '@/lib/attendanceUtils';

/**
 * @fileoverview Custom Calendar Date Range Selector Dropdown component with localized grids.
 */

/**
 * @typedef {Object} DateRangePickerProps
 * @property {string} startDate - Selected start date string (YYYY-MM-DD).
 * @property {string} endDate - Selected end date string (YYYY-MM-DD).
 * @property {function({startDate: string, endDate: string}): void} onChange - Callback triggered upon updating dates.
 */

/**
 * Custom DateRangePicker input component.
 * @param {DateRangePickerProps} props - Component properties.
 */
export function DateRangePicker({
  startDate,
  endDate,
  onChange
}) {
  const [open, setOpen] = useState(false);
  const [selecting, setSelecting] = useState('start');
  const [hoverDate, setHover] = useState(null);
  const initMonth = startDate ? parseD(startDate) : new Date();
  const [viewMonth, setViewMonth] = useState(new Date(initMonth.getFullYear(), initMonth.getMonth(), 1));
  const containerRef = useRef(null);

  // Click outside listener
  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handleOutsideClick);
    return () => document.removeEventListener('mousedown', handleOutsideClick);
  }, []);

  const yr = viewMonth.getFullYear();
  const mo = viewMonth.getMonth();
  const daysInMonth = new Date(yr, mo + 1, 0).getDate();
  const firstDayOffset = (() => {
    const d = new Date(yr, mo, 1).getDay();
    return d === 0 ? 6 : d - 1;
  })();

  const cells = [];
  for (let i = 0; i < firstDayOffset; i++) cells.push(null);
  for (let d = 1; d <= daysInMonth; d++) cells.push(new Date(yr, mo, d));

  const s = parseD(startDate);
  const e = parseD(endDate);

  const isSameDay = (a, b) => a && b && fmtD(a) === fmtD(b);
  const isStart = d => isSameDay(d, s);
  const isEnd = d => isSameDay(d, e);
  const isInRange = d => {
    const effEnd = selecting === 'end' && hoverDate ? hoverDate : e;
    return s && effEnd && d > s && d < effEnd;
  };

  const handleDayClick = d => {
    if (selecting === 'start') {
      onChange({ startDate: fmtD(d), endDate: '' });
      setSelecting('end');
    } else {
      if (s && d < s) {
        onChange({ startDate: fmtD(d), endDate: fmtD(s) });
      } else {
        onChange({ startDate, endDate: fmtD(d) });
      }
      setSelecting('start');
      setOpen(false);
    }
  };

  return (
    <div className="relative w-full" ref={containerRef}>
      {/* Scoped fade animation */}
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes drpFadeIn {
          from { opacity: 0; transform: translateY(-8px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}} />

      {/* Trigger button */}
      <button
        type="button"
        onClick={() => { setOpen(o => !o); setSelecting('start'); }}
        className="flex items-center gap-2 w-full text-xs px-3 py-2.5 bg-white border border-slate-200 rounded-xl hover:border-[#410078]/40 focus:border-[#410078] focus:ring-2 focus:ring-[#410078]/15 transition-all shadow-sm font-medium text-slate-700"
      >
        <Calendar className="w-3.5 h-3.5 text-[#410078] flex-shrink-0" />
        <span className="flex-1 text-left truncate">
          {startDate ? (
            <>
              <span className="text-slate-900 font-bold">{fmtDisplay(startDate)}</span>
              <span className="text-slate-400 mx-1.5">→</span>
              {endDate ? (
                <span className="text-slate-900 font-bold">{fmtDisplay(endDate)}</span>
              ) : (
                <span className="text-slate-400 italic">End date…</span>
              )}
            </>
          ) : (
            <span className="text-slate-400">Select date range</span>
          )}
        </span>
        {(startDate || endDate) && (
          <span
            role="button"
            onClick={ev => {
              ev.stopPropagation();
              onChange({ startDate: '', endDate: '' });
            }}
            className="text-slate-300 hover:text-slate-500 transition-colors p-0.5"
          >
            <X className="w-3 h-3" />
          </span>
        )}
        <ChevronDown className={`w-3.5 h-3.5 text-slate-400 transition-transform duration-200 flex-shrink-0 ${open ? 'rotate-180' : ''}`} />
      </button>

      {/* Dropdown calendar */}
      {open && (
        <div
          className="absolute top-full left-0 mt-2 z-[9999] bg-white rounded-2xl shadow-2xl border border-slate-200/80"
          style={{ width: 320, animation: 'drpFadeIn .18s ease-out forwards' }}
        >
          {/* From / To header */}
          <div className="grid grid-cols-2 border-b border-slate-100">
            {[['From', startDate, 'start'], ['To', endDate, 'end']].map(([label, val, sel]) => (
              <button
                key={label}
                type="button"
                onClick={() => setSelecting(sel)}
                className={`py-3 px-4 text-center transition-colors border-l first:border-l-0 border-slate-100 ${
                  selecting === sel ? 'bg-[#410078]/5 border-b-2 border-[#410078]' : ''
                }`}
              >
                <div className="text-[10px] font-bold uppercase tracking-widest text-slate-400">{label}</div>
                <div className="text-sm font-bold text-slate-900 mt-0.5">
                  {val ? fmtDisplay(val) : <span className="text-slate-300">—</span>}
                </div>
              </button>
            ))}
          </div>

          {/* Month Navigation */}
          <div className="flex items-center justify-between px-4 py-3">
            <button
              type="button"
              onClick={() => setViewMonth(new Date(yr, mo - 1, 1))}
              className="w-8 h-8 flex items-center justify-center rounded-full border border-slate-200 hover:bg-slate-100 transition-colors"
            >
              <ChevronLeft className="w-4 h-4 text-slate-600" />
            </button>
            <span className="text-sm font-bold text-slate-800">{MONTHS[mo]}, {yr}</span>
            <button
              type="button"
              onClick={() => setViewMonth(new Date(yr, mo + 1, 1))}
              className="w-8 h-8 flex items-center justify-center rounded-full border border-slate-200 hover:bg-slate-100 transition-colors"
            >
              <ChevronRight className="w-4 h-4 text-slate-600" />
            </button>
          </div>

          {/* Weekday Labels */}
          <div className="grid grid-cols-7 px-3 mb-1">
            {WEEKDAYS.map(d => (
              <div key={d} className="text-[10px] font-bold text-[#410078] text-center py-1">{d}</div>
            ))}
          </div>

          {/* Day Grid */}
          <div className="grid grid-cols-7 px-3 pb-3 gap-y-0.5">
            {cells.map((d, i) => {
              if (!d) return <div key={i} />;
              const sel = isStart(d) || isEnd(d);
              const inR = isInRange(d);
              return (
                <button
                  key={i}
                  type="button"
                  onClick={() => handleDayClick(d)}
                  onMouseEnter={() => selecting === 'end' && setHover(d)}
                  onMouseLeave={() => setHover(null)}
                  className={`relative h-9 text-sm font-medium transition-all ${
                    inR ? 'bg-[#410078]/10 rounded-none' : ''
                  } ${isStart(d) ? 'rounded-l-full' : ''} ${isEnd(d) ? 'rounded-r-full' : ''} ${
                    sel
                      ? 'bg-[#410078] text-white rounded-full z-10 font-bold shadow-md'
                      : 'hover:bg-[#410078]/10 rounded-full text-slate-700'
                  }`}
                >
                  {d.getDate()}
                </button>
              );
            })}
          </div>

          {/* Action buttons */}
          <div className="grid grid-cols-2 gap-3 px-4 pb-4">
            <button
              type="button"
              onClick={() => { onChange({ startDate: '', endDate: '' }); setOpen(false); }}
              className="py-2.5 rounded-xl border-2 border-slate-200 text-sm font-bold text-slate-600 hover:bg-slate-50 transition-colors"
            >
              Clear
            </button>
            <button
              type="button"
              onClick={() => { setOpen(false); setSelecting('start'); }}
              className="py-2.5 rounded-xl bg-[#410078] text-sm font-bold text-white hover:bg-[#330060] transition-colors shadow-lg shadow-[#410078]/30"
            >
              Apply
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default DateRangePicker;
