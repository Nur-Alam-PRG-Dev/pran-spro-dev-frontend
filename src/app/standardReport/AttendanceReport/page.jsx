'use client';

import React, { useState, useMemo } from 'react';
import { ChevronRight } from 'lucide-react';
import Link from 'next/link';

// Core database imports
import {
  attendanceReportData,
  zones as ZONES_MAP,
} from '@/app/standardReport/AttendanceReport/attendanceReportData';

// Modular dashboard components
import FilterPanel from '@/Components/attendance/FilterPanel';
import StatStrip from '@/Components/attendance/StatStrip';
import TableToolbar from '@/Components/attendance/TableToolbar';
import AttendanceTable from '@/Components/attendance/AttendanceTable';
import MobileCardList from '@/Components/attendance/MobileCardList';
import Pagination from '@/Components/attendance/Pagination';

/**
 * @fileoverview Main orchestrator page for standard Attendance Reports.
 */

const DEFAULT_FORM = {
  company: 'All',
  group: 'All',
  region: 'All',
  zone: 'All',
  userType: 'all',
  staffId: '',
  startDate: '',
  endDate: '',
};

export default function AttendanceReportPage() {
  // 1. All useState declarations
  const [form, setForm] = useState({ ...DEFAULT_FORM });
  const [applied, setApplied] = useState(null); // null = never searched
  const [hasSearched, setHasSearched] = useState(false);
  const [isDirty, setIsDirty] = useState(false);

  const [searchQuery, setSearchQuery] = useState('');
  const [entriesPerPage, setEntriesPerPage] = useState(25);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortConfig, setSortConfig] = useState({ key: 'id', direction: 'asc' });
  const [expandedRows, setExpandedRows] = useState({});
  const [filterOpen, setFilterOpen] = useState(true);

  // 2. Handlers
  const setF = (key, val) => {
    setForm(f => ({
      ...f,
      [key]: val,
      ...(key === 'region' ? { zone: 'All' } : {})
    }));
    setIsDirty(true);
  };

  const handleShow = () => {
    setApplied({ ...form });
    setHasSearched(true);
    setCurrentPage(1);
    setIsDirty(false);
  };

  const handleReset = () => {
    setForm({ ...DEFAULT_FORM });
    setApplied(null);
    setHasSearched(false);
    setSearchQuery('');
    setCurrentPage(1);
    setIsDirty(false);
  };

  const handleSort = key => {
    setSortConfig(s => ({
      key,
      direction: s.key === key && s.direction === 'asc' ? 'desc' : 'asc'
    }));
    setCurrentPage(1);
  };

  const toggleRow = id => {
    setExpandedRows(p => ({ ...p, [id]: !p[id] }));
  };

  // Helper matching select filters supporting single strings and multi-select arrays
  const matchFilter = (appliedValue, itemValue) => {
    if (!appliedValue || appliedValue === 'All') return true;
    if (Array.isArray(appliedValue)) {
      if (appliedValue.length === 0 || appliedValue.includes('All')) return true;
      return appliedValue.includes(itemValue);
    }
    return itemValue === appliedValue;
  };

  // 3. All useMemo derived values

  // Cascade zone selections based on selected region(s)
  const zoneOptions = useMemo(() => {
    if (form.region === 'All' || (Array.isArray(form.region) && (form.region.length === 0 || form.region.includes('All')))) {
      return Object.values(ZONES_MAP).flat().sort();
    }
    if (Array.isArray(form.region)) {
      return form.region.flatMap(r => ZONES_MAP[r] || []).sort();
    }
    return ZONES_MAP[form.region] || [];
  }, [form.region]);

  // Apply filters snapshot
  const filteredData = useMemo(() => {
    if (!applied) return [];
    return attendanceReportData.filter(item => {
      if (!matchFilter(applied.company, item.company)) return false;
      if (!matchFilter(applied.group, item.group)) return false;
      if (!matchFilter(applied.region, item.region)) return false;
      if (!matchFilter(applied.zone, item.zone)) return false;

      // User Type filter (All, SR only, or SV designations)
      if (applied.userType === 'sr' && item.designation !== 'SR') return false;
      if (applied.userType === 'sv' && !['TSM', 'HOS'].includes(item.designation)) return false;

      // Staff ID search input
      if (applied.staffId && !item.staffId.toLowerCase().includes(applied.staffId.toLowerCase())) return false;

      // Date Range filters
      if (applied.startDate && item.date < applied.startDate) return false;
      if (applied.endDate && item.date > applied.endDate) return false;

      return true;
    });
  }, [applied]);

  // Real-time inline search query
  const searchedData = useMemo(() => {
    const q = searchQuery.toLowerCase().trim();
    if (!q) return filteredData;
    return filteredData.filter(item =>
      item.staffName.toLowerCase().includes(q) ||
      item.staffId.toLowerCase().includes(q) ||
      item.region.toLowerCase().includes(q) ||
      item.zone.toLowerCase().includes(q) ||
      item.designation.toLowerCase().includes(q) ||
      item.status.toLowerCase().includes(q) ||
      (item.company || '').toLowerCase().includes(q)
    );
  }, [filteredData, searchQuery]);

  // Sort records
  const sortedData = useMemo(() => {
    return [...searchedData].sort((a, b) => {
      let va = a[sortConfig.key] ?? '', vb = b[sortConfig.key] ?? '';
      if (typeof va === 'string') va = va.toLowerCase();
      if (typeof vb === 'string') vb = vb.toLowerCase();
      if (va < vb) return sortConfig.direction === 'asc' ? -1 : 1;
      if (va > vb) return sortConfig.direction === 'asc' ? 1 : -1;
      return 0;
    });
  }, [searchedData, sortConfig]);

  // Paged entries slice
  const totalPages = Math.ceil(sortedData.length / entriesPerPage) || 1;
  const pageData = useMemo(() =>
    sortedData.slice((currentPage - 1) * entriesPerPage, currentPage * entriesPerPage),
    [sortedData, currentPage, entriesPerPage]
  );

  // Dynamic statistics
  const stats = useMemo(() => {
    const totalPresent = filteredData.filter(r => r.status === 'Attendance').length;
    const totalAbsent = filteredData.filter(r => r.status === 'Absent').length;
    const attendRate = filteredData.length ? Math.round((totalPresent / filteredData.length) * 100) : 0;
    return {
      present: totalPresent,
      absent: totalAbsent,
      rate: attendRate
    };
  }, [filteredData]);

  // 4. Return JSX composition
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@400;500;600;700;800;900&family=JetBrains+Mono:wght@400;500;700&display=swap');
        .att-root { font-family:'Outfit',sans-serif; }
        .mono     { font-family:'JetBrains Mono',monospace; }
        @keyframes fadeSlideDown { from{opacity:0;transform:translateY(-8px)} to{opacity:1;transform:translateY(0)} }
        @keyframes rowIn         { from{opacity:0;transform:translateX(-4px)} to{opacity:1;transform:translateX(0)} }
        .row-in    { animation: rowIn .15s ease forwards; }
        .dirty-pulse { animation: dirtyRing 1.6s ease infinite; }
        @keyframes dirtyRing {
          0%  { box-shadow:0 0 0 0   rgba(65,0,120,.35); }
          70% { box-shadow:0 0 0 8px rgba(65,0,120,0);   }
          100%{ box-shadow:0 0 0 0   rgba(65,0,120,0);   }
        }
      `}</style>

      <div className="att-root min-h-screen bg-[#F0F2F5] text-slate-800 antialiased p-4 lg:p-6">
        {/* Breadcrumb navigation */}
        <div className="flex items-center justify-between mb-5">
          <nav className="flex items-center gap-2 text-xs font-semibold text-slate-500">
            <Link href="/" className="hover:text-[#410078] cursor-pointer transition-colors">
              Home
            </Link>
            <ChevronRight className="w-3 h-3 text-slate-400" />
            <Link href="/standardReport" className="hover:text-[#410078] cursor-pointer transition-colors">
              Standard Report
            </Link>
            <ChevronRight className="w-3 h-3 text-slate-400" />
            <span className="text-[#410078] font-bold">Attendance Report</span>
          </nav>
        </div>

        {/* Filter Panel parameters */}
        <FilterPanel
          form={form}
          setF={setF}
          zoneOptions={zoneOptions}
          isDirty={isDirty}
          onShow={handleShow}
          onReset={handleReset}
          filterOpen={filterOpen}
          setFilterOpen={setFilterOpen}
        />

        {/* Stat strip ribbon */}
        {hasSearched && (
          <StatStrip
            total={filteredData.length}
            present={stats.present}
            absent={stats.absent}
            inView={sortedData.length}
            attendRate={stats.rate}
          />
        )}

        {/* Table data records card */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
          {/* Table Toolbar */}
          <TableToolbar
            entriesPerPage={entriesPerPage}
            setEntries={setEntriesPerPage}
            searchQuery={searchQuery}
            setSearch={setSearchQuery}
            setPage={setCurrentPage}
          />

          {/* Desktop Table View */}
          <AttendanceTable
            pageData={pageData}
            sortConfig={sortConfig}
            onSort={handleSort}
            currentPage={currentPage}
            entriesPerPage={entriesPerPage}
            hasSearched={hasSearched}
          />

          {/* Mobile Card List View */}
          <MobileCardList
            pageData={pageData}
            currentPage={currentPage}
            entriesPerPage={entriesPerPage}
            hasSearched={hasSearched}
            expandedRows={expandedRows}
            toggleRow={toggleRow}
          />

          {/* Pagination Footer */}
          <div className="px-5 py-4 border-t border-slate-100 bg-slate-50/50 flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-xs font-semibold text-slate-500">
              {hasSearched ? (
                <>
                  Showing{' '}
                  <span className="text-slate-900 font-bold">
                    {sortedData.length > 0 ? (currentPage - 1) * entriesPerPage + 1 : 0}
                  </span>
                  {' – '}
                  <span className="text-slate-900 font-bold">
                    {Math.min(currentPage * entriesPerPage, sortedData.length)}
                  </span>
                  {' of '}
                  <span className="text-[#410078] font-black">
                    {sortedData.length.toLocaleString()}
                  </span>{' '}
                  results
                </>
              ) : (
                <span className="text-slate-400 italic">
                  Use filters above and click Show Results
                </span>
              )}
            </p>
            {hasSearched && sortedData.length > 0 && (
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onChange={setCurrentPage}
              />
            )}
          </div>
        </div>
      </div>
    </>
  );
}