/**
 * @fileoverview Styling configuration maps and helper functions for standard attendance report.
 */

/**
 * Styling mappings for attendance status badges.
 * @type {Record<string, string>}
 */
export const STATUS_STYLE = {
  Attendance: 'bg-emerald-50 text-emerald-700 border border-emerald-200',
  Absent: 'bg-rose-50 text-rose-700 border border-rose-200',
};

/**
 * Styling mappings for employee designations badges.
 * @type {Record<string, string>}
 */
export const DESIG_STYLE = {
  HOS: 'bg-violet-100 text-violet-800 border border-violet-200',
  TSM: 'bg-blue-100 text-blue-800 border border-violet-200',
  SR: 'bg-teal-50 text-teal-700 border border-teal-200',
  'Delivery Agent': 'bg-slate-100 text-slate-700 border border-slate-200',
  Accountant: 'bg-amber-100 text-amber-800 border border-amber-200',
  Supervisor: 'bg-indigo-100 text-indigo-800 border border-indigo-200',
  Driver: 'bg-orange-100 text-orange-800 border border-orange-200',
  Coordinator: 'bg-pink-100 text-pink-800 border border-pink-200',
};

/**
 * Maps a region name to a consistent, high-contrast Tailwind text color class.
 * @param {string} r - The region name.
 * @returns {string} Tailwind CSS class list for region name coloring.
 */
export const REGION_COLOR = (r = '') => {
  const map = {
    'abu dhabi': 'text-indigo-700',
    'dubai': 'text-cyan-700',
    'sharjah': 'text-emerald-700',
    'ajman': 'text-orange-700',
    'fujairah': 'text-rose-700',
    'al ain': 'text-violet-700',
    'ras al khaimah': 'text-blue-700',
    'umm al quwain': 'text-teal-700',
  };
  return (map[r.toLowerCase()] || 'text-slate-700') + ' font-semibold';
};

const attendanceStyles = {
  STATUS_STYLE,
  DESIG_STYLE,
  REGION_COLOR
};

export default attendanceStyles;
