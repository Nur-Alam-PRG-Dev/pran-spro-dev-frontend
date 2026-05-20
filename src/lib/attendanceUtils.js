/**
 * @fileoverview Utility helpers for standard attendance reports date/time operations.
 */

/**
 * List of month names for date range display.
 * @type {string[]}
 */
export const MONTHS = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];

/**
 * Weekdays labels.
 * @type {string[]}
 */
export const WEEKDAYS = ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'];

/**
 * Pads a single-digit number with a leading zero.
 * @param {number} n - The number to pad.
 * @returns {string} The padded string representation.
 */
export function pad2(n) {
  return String(n).padStart(2, '0');
}

/**
 * Formats "2026-05-18 08:59:46" → "08:59 am"
 * Returns "—" for absent sentinel "0000-00-00 00:00:00"
 * @param {string} raw - The raw time string.
 * @returns {string} The formatted time string.
 */
export function formatTime(raw) {
  if (!raw || raw.startsWith('0000')) return '—';
  const timePart = raw.includes(' ') ? raw.split(' ')[1] : raw;
  const [hStr, mStr] = timePart.split(':');
  let h = parseInt(hStr, 10);
  const m = mStr;
  const ampm = h >= 12 ? 'pm' : 'am';
  h = h % 12 || 12;
  return `${String(h).padStart(2, '0')}:${m} ${ampm}`;
}

/**
 * Formats a Date object to "YYYY-MM-DD".
 * @param {Date|null} d - The Date object.
 * @returns {string} The formatted date string.
 */
export function fmtD(d) {
  return d ? `${d.getFullYear()}-${pad2(d.getMonth() + 1)}-${pad2(d.getDate())}` : '';
}

/**
 * Parses a Date string "YYYY-MM-DD" into a Date object.
 * @param {string|null} s - The date string.
 * @returns {Date|null} The parsed Date object or null.
 */
export function parseD(s) {
  return s ? new Date(s + 'T00:00:00') : null;
}

/**
 * Formats a Date string into short human-readable layout.
 * @param {string} s - The raw date string.
 * @returns {string} The formatted display date.
 */
export function fmtDisplay(s) {
  if (!s) return '—';
  const d = new Date(s + 'T00:00:00');
  return d.toLocaleDateString('en-GB', { weekday: 'short', day: '2-digit', month: 'short' });
}

// Default export containing all utility helpers
const attendanceUtils = {
  MONTHS,
  WEEKDAYS,
  pad2,
  formatTime,
  fmtD,
  parseD,
  fmtDisplay
};

export default attendanceUtils;
