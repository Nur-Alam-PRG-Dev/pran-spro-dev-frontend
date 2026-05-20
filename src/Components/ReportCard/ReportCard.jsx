import React from 'react';
import Link from 'next/link';
import { ChevronRight } from 'lucide-react';

/**
 * @fileoverview Single Card showing report titles, summaries, and redirection links.
 */

/**
 * @typedef {Object} ReportCardProps
 * @property {Object} report - Configuration dictionary for a given report dashboard.
 * @property {string} report.title - Title header of the report card.
 * @property {string} report.desc - Description summarizing the report context.
 * @property {string} report.href - Absolute redirection path.
 */

/**
 * Renders standard clickable Report Catalog card items.
 * @param {ReportCardProps} props - Component properties.
 */
const ReportCard = ({ report }) => {
     const { title, desc, href } = report;
     return (
          <Link 
               href={href}
               className="bg-white border border-slate-200 hover:border-[#410078] p-4 rounded-xl shadow-sm transition-all duration-200 cursor-pointer hover:-translate-y-0.5 hover:shadow-md flex flex-col justify-between group"
          >
               <div>
                    <h3 className="text-sm font-bold text-slate-800 mb-2 group-hover:text-[#410078] transition-colors">
                         {title}
                    </h3>
                    <p className="text-xs text-slate-500 leading-relaxed font-normal">
                         {desc}
                    </p>
               </div>
               <div className="mt-4 flex items-center justify-end text-[10px] font-bold text-slate-400 group-hover:text-[#410078] uppercase tracking-wider gap-1 transition-colors">
                    <span>View Report</span>
                    <ChevronRight className="w-3 h-3" />
               </div>
          </Link>
     );
};

export default ReportCard;
export { ReportCard };