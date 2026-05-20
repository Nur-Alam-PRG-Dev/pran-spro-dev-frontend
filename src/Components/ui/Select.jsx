'use client';

import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown, Check, X, Search } from 'lucide-react';

/**
 * @fileoverview Styled select dropdown component supporting single or multi-selection with an inline search bar.
 */

/**
 * @typedef {Object} SelectProps
 * @property {string} label - Label text of the select element.
 * @property {boolean} [required] - Denotes if the field is mandatory.
 * @property {string|string[]} value - Active selection(s). Can be single string or array of strings.
 * @property {function} onChange - Triggered upon selection adjustment.
 * @property {string[]} options - Complete list of select options.
 * @property {string} [placeholder] - Default placeholder string.
 * @property {boolean} [multiple] - Enables multi-select checkboxes.
 */

/**
 * Custom dropdown select component with support for single/multiple values and list filtering.
 * @param {SelectProps} props - Component properties.
 */
export function Select({
  label,
  required,
  value,
  onChange,
  options,
  placeholder,
  multiple = false
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState('');
  const containerRef = useRef(null);

  // Click outside to close dropdown
  useEffect(() => {
    function handleClickOutside(event) {
      if (containerRef.current && !containerRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Reset search when opening/closing
  useEffect(() => {
    if (!isOpen) setSearch('');
  }, [isOpen]);

  const isSelected = (opt) => {
    if (multiple) {
      return Array.isArray(value) && value.includes(opt);
    }
    return value === opt;
  };

  const handleOptionClick = (opt) => {
    if (multiple) {
      let currentValues = Array.isArray(value) ? [...value] : [];
      if (opt === 'All') {
        onChange('All');
      } else {
        // Remove 'All' if it exists
        currentValues = currentValues.filter(v => v !== 'All');
        if (currentValues.includes(opt)) {
          currentValues = currentValues.filter(v => v !== opt);
        } else {
          currentValues.push(opt);
        }
        onChange(currentValues.length === 0 ? 'All' : currentValues);
      }
    } else {
      onChange(opt);
      setIsOpen(false);
    }
  };

  const clearSelection = (e) => {
    e.stopPropagation();
    onChange(multiple ? [] : 'All');
  };

  // Filter options based on search input
  const filteredOptions = options.filter(opt =>
    opt.toLowerCase().includes(search.toLowerCase())
  );

  // Determine display label for trigger
  const getDisplayLabel = () => {
    if (multiple) {
      if (!Array.isArray(value) || value.length === 0 || (value.length === 1 && value[0] === 'All')) {
        return placeholder || `All ${label}s`;
      }
      if (value.length === 1) return value[0];
      return `${value.length} Selected`;
    } else {
      if (value === 'All') return placeholder || `All ${label}s`;
      return value;
    }
  };

  return (
    <div className="flex flex-col gap-1.5 w-full relative" ref={containerRef}>
      <label className="text-[11px] font-bold uppercase tracking-wider text-slate-500 flex items-center">
        {label}
        {required && <span className="text-rose-500 ml-0.5">*</span>}
      </label>

      {/* Trigger Button */}
      <div className="relative">
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className={`w-full text-left text-xs px-3 py-2.5 bg-white border border-slate-200 rounded-xl
            outline-none transition-all font-medium text-slate-700 pr-10 shadow-sm flex items-center justify-between
            ${isOpen ? 'border-[#410078] ring-2 ring-[#410078]/15' : 'hover:border-[#410078]/40'}`}
        >
          <span className="truncate block pr-2">
            {getDisplayLabel()}
          </span>
          <div className="flex items-center gap-1.5 absolute right-2.5 top-1/2 -translate-y-1/2">
            {((multiple && Array.isArray(value) && value.length > 0 && value[0] !== 'All') ||
              (!multiple && value !== 'All')) && (
              <span
                role="button"
                onClick={clearSelection}
                className="p-0.5 rounded-full hover:bg-slate-100 text-slate-400 hover:text-slate-600 transition-colors"
              >
                <X className="w-3 h-3" />
              </span>
            )}
            <ChevronDown className={`w-3.5 h-3.5 text-slate-400 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
          </div>
        </button>
      </div>

      {/* Dropdown Options List */}
      {isOpen && (
        <div
          className="absolute top-full left-0 right-0 mt-1.5 bg-white rounded-2xl shadow-2xl border border-slate-200/80 z-[99999] p-2 flex flex-col gap-1.5"
          style={{
            maxHeight: '260px',
            animation: 'fadeSlideDown 0.15s ease-out forwards',
          }}
        >
          {/* Search bar inside dropdown if there are more than 5 options */}
          {options.length > 5 && (
            <div className="relative flex items-center bg-slate-50 border border-slate-200 rounded-lg p-1.5 gap-1.5 mx-1 mb-1">
              <Search className="w-3.5 h-3.5 text-slate-400 ml-1.5" />
              <input
                type="text"
                placeholder={`Search ${label}s...`}
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full bg-transparent text-xs outline-none text-slate-700 font-medium placeholder-slate-400"
              />
              {search && (
                <button
                  type="button"
                  onClick={() => setSearch('')}
                  className="text-slate-400 hover:text-slate-600 p-0.5"
                >
                  <X className="w-3 h-3" />
                </button>
              )}
            </div>
          )}

          {/* List items */}
          <div className="overflow-y-auto flex-1 flex flex-col gap-0.5 pr-0.5 max-h-[180px]">
            {/* 'All' default Option */}
            <button
              type="button"
              onClick={() => handleOptionClick('All')}
              className={`w-full text-left text-xs px-3 py-2 rounded-lg font-medium transition-all flex items-center justify-between
                ${isSelected('All') || (multiple && (!Array.isArray(value) || value.length === 0 || value.includes('All')))
                  ? 'bg-[#410078]/5 text-[#410078] font-bold'
                  : 'hover:bg-slate-50 text-slate-600'}`}
            >
              <span>{placeholder || `All ${label}s`}</span>
              {(isSelected('All') || (multiple && (!Array.isArray(value) || value.length === 0 || value.includes('All')))) && (
                <Check className="w-3.5 h-3.5 stroke-[3]" />
              )}
            </button>

            {/* Filtered list items */}
            {filteredOptions.length > 0 ? (
              filteredOptions.map((opt) => (
                <button
                  key={opt}
                  type="button"
                  onClick={() => handleOptionClick(opt)}
                  className={`w-full text-left text-xs px-3 py-2 rounded-lg font-medium transition-all flex items-center justify-between
                    ${isSelected(opt)
                      ? 'bg-[#410078]/5 text-[#410078] font-bold'
                      : 'hover:bg-slate-50 text-slate-600'}`}
                >
                  <div className="flex items-center gap-2 truncate">
                    {multiple && (
                      <input
                        type="checkbox"
                        checked={isSelected(opt)}
                        readOnly
                        className="rounded border-slate-300 text-[#410078] focus:ring-[#410078]/30 w-3.5 h-3.5 pointer-events-none accent-[#410078]"
                      />
                    )}
                    <span className="truncate">{opt}</span>
                  </div>
                  {isSelected(opt) && !multiple && (
                    <Check className="w-3.5 h-3.5 stroke-[3]" />
                  )}
                </button>
              ))
            ) : (
              <span className="text-[11px] text-slate-400 italic text-center py-4">
                No matching options
              </span>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default Select;
