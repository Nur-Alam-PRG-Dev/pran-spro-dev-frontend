'use client'

import React, { useState } from 'react';
import { Search, Plus, Minus, FileText, ChevronRight } from 'lucide-react';
import reportListData from '@/app/standardReport/standardReports';
import ReportCard from '@/Components/ReportCard/ReportCard';
import Link from 'next/link';


// ==========================================
// 2. INTERACTIVE ROUTE COMPONENT
// ==========================================

export default function StandardReportPage() {
     const [searchQuery, setSearchQuery] = useState("");
     
     // Accordion toggle states (True = expanded/open)
     const [sections, setSections] = useState({
          general: true,
          sr: true,
          others: false
     });

     const toggleSection = (section) => {
          setSections(prev => ({ ...prev, [section]: !prev[section] }));
     };

     // Filter reporting cards dynamically based on user typing
     const filterCards = (cardsArray) => {
          return cardsArray.filter(card => 
               card.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
               card.desc.toLowerCase().includes(searchQuery.toLowerCase())
          );
     };

     const filteredGeneral = filterCards(reportListData.generalReports);
     const filteredSR = filterCards(reportListData.srReports);
     const filteredOthers = filterCards(reportListData.otherReports);

     return (
          <div className="min-h-screen bg-slate-50 p-4 sm:p-6 font-sans text-slate-800">
               
               {/* Header Toolbar: Breadcrumb Navigation & Dynamic Search Input */}
               <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-6 border-b border-slate-200 mb-6">
                    <div className="flex items-center gap-2 text-xs font-medium text-slate-500">
                         <Link href="/" className="hover:text-[#410078] cursor-pointer">Home</Link>
                         <ChevronRight className="w-3 h-3 text-slate-400" />
                         <span className="text-slate-800 font-semibold">Standard Report</span>
                    </div>

                    {/* Integrated Search Box Component */}
                    <div className="relative w-full sm:w-72">
                         <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
                         <input
                              type="text"
                              placeholder="You can search report here..."
                              value={searchQuery}
                              onChange={(e) => setSearchQuery(e.target.value)}
                              className="w-full pl-9 pr-4 py-2 bg-white border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#410078]/20 focus:border-[#410078] transition-all"
                         />
                    </div>
               </div>

               {/* MAIN REPORT CATEGORIES BLOCK CONTAINER */}
               <div className="flex flex-col gap-4">

                    {/* SECTION 1: GENERAL REPORT */}
                    <div className="border border-slate-200 rounded-lg overflow-hidden bg-white shadow-sm">
                         <button 
                              onClick={() => toggleSection('general')}
                              className="w-full flex items-center justify-between bg-[#2F4050] text-white px-4 py-3 text-sm font-semibold uppercase tracking-wider"
                         >
                              <div className="flex items-center gap-2.5">
                                   <FileText className="w-4 h-4 text-slate-300" />
                                   <span>General Report</span>
                              </div>
                              {sections.general ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                         </button>
                         
                         {sections.general && (
                              <div className="p-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 bg-slate-50/50">
                                   {filteredGeneral.length > 0 ? (
                                        filteredGeneral.map((report, idx) => (
                                             <ReportCard key={idx} report={report} />
                                        ))
                                   ) : <EmptyStateMessage />}
                              </div>
                         )}
                    </div>

                    {/* SECTION 2: SR REPORT */}
                    <div className="border border-slate-200 rounded-lg overflow-hidden bg-white shadow-sm">
                         <button 
                              onClick={() => toggleSection('sr')}
                              className="w-full flex items-center justify-between bg-[#2F4050] text-white px-4 py-3 text-sm font-semibold uppercase tracking-wider"
                         >
                              <div className="flex items-center gap-2.5">
                                   <FileText className="w-4 h-4 text-slate-300" />
                                   <span>SR Report</span>
                              </div>
                              {sections.sr ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                         </button>
                         
                         {sections.sr && (
                              <div className="p-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 bg-slate-50/50">
                                   {filteredSR.length > 0 ? (
                                        filteredSR.map((report, idx) => (
                                             <ReportCard key={idx} report={report} />
                                        ))
                                   ) : <EmptyStateMessage />}
                              </div>
                         )}
                    </div>

                    {/* SECTION 3: OTHERS REPORT */}
                    <div className="border border-slate-200 rounded-lg overflow-hidden bg-white shadow-sm">
                         <button 
                              onClick={() => toggleSection('others')}
                              className="w-full flex items-center justify-between bg-[#2F4050] text-white px-4 py-3 text-sm font-semibold uppercase tracking-wider"
                         >
                              <div className="flex items-center gap-2.5">
                                   <FileText className="w-4 h-4 text-slate-300" />
                                   <span>Others Report</span>
                              </div>
                              {sections.others ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                         </button>
                         
                         {sections.others && (
                              <div className="p-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 bg-slate-50/50">
                                   {filteredOthers.length > 0 ? (
                                        filteredOthers.map((report, idx) => (
                                             <ReportCard key={idx} report={report} />
                                        ))
                                   ) : <EmptyStateMessage />}
                              </div>
                         )}
                    </div>

               </div>
          </div>
     );
}

// ==========================================
// 3. REUSABLE SUB-COMPONENTS
// ==========================================


function EmptyStateMessage() {
     return (
          <div className="col-span-full text-center py-6 text-slate-400 text-xs font-medium">
               No reports match your current search query.
          </div>
     );
}