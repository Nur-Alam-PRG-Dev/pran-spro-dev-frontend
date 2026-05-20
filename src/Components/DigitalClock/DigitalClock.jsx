"use client";

import React, { useState, useEffect } from 'react';

export default function CorporateDigitalClock() {
     const [time, setTime] = useState(null);

     useEffect(() => {
          setTime(new Date());
          const timerId = setInterval(() => {
               setTime(new Date());
          }, 1000);

          return () => clearInterval(timerId);
     }, []);

     if (!time) {
          return (
               <div className="inline-flex items-center px-3 py-1.5 font-mono text-xs sm:text-sm font-medium text-slate-400 bg-slate-50 border border-slate-200 rounded-lg">
                    -- : --
               </div>
          );
     }

     const hours = time.getHours();
     const displayHours = String(hours % 12 || 12).padStart(2, '0');
     const minutes = String(time.getMinutes()).padStart(2, '0');
     const seconds = String(time.getSeconds()).padStart(2, '0');
     const ampm = hours >= 12 ? 'PM' : 'AM';

     const dateString = time.toLocaleDateString('en-US', {
          weekday: 'short',
          month: 'short',
          day: 'numeric'
     });

     return (
          <div className="inline-flex items-center gap-2 sm:gap-4 px-2.5 py-1.5 sm:px-4 sm:py-2 bg-white border border-slate-200 rounded-lg shadow-sm font-sans text-xs sm:text-sm">

               {/* 1. Date Context - Hidden on mobile, visible on sm and up */}
               <div className="hidden sm:block text-xs font-semibold tracking-wide text-slate-500 border-r border-slate-200 pr-3 uppercase">
                    {dateString}
               </div>

               {/* 2. Main Digital Readout */}
               <div className="flex items-center font-mono text-sm sm:text-lg font-bold tracking-wider text-slate-800">
                    <span>{displayHours}</span>
                    <span className="mx-0.5 sm:mx-1 text-[#ED1D24] font-sans">:</span>
                    <span>{minutes}</span>

                    {/* Seconds Counter - Hidden on mobile, visible on sm and up */}
                    <span className="hidden sm:inline-flex items-center">
                         <span className="mx-1 text-[#FED000] font-sans">:</span>
                         <span className="text-sm font-medium text-slate-400 w-[2ch]">
                              {seconds}
                         </span>
                    </span>
               </div>

               {/* 3. AM/PM Indicator */}
               <div
                    className="text-[9px] sm:text-[10px] font-bold px-1.5 py-0.5 sm:px-2 rounded text-white tracking-wider"
                    style={{ backgroundColor: '#410078' }}
               >
                    {ampm}
               </div>
          </div>
     );
}