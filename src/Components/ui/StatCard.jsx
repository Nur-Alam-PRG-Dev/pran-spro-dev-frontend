'use client';

import React from 'react';

/**
 * @fileoverview Generic statistics card showcasing key numbers, descriptive labels, and decorative icons.
 */

/**
 * @typedef {Object} StatCardProps
 * @property {React.ComponentType<any>} icon - Lucide icon component to display.
 * @property {string} label - Card label description.
 * @property {string|number} value - Quantified metric to demonstrate.
 * @property {string} color - Tailwind color classes for the icon container.
 * @property {string} [sub] - Accompanying helper description.
 */

/**
 * Renders a standard styled metric card with smooth animations.
 * @param {StatCardProps} props - Component properties.
 */
export function StatCard({
  icon: Icon,
  label,
  value,
  color,
  sub
}) {
  return (
    <div className="bg-white rounded-xl border border-slate-200 px-4 py-3.5 flex items-center gap-3 shadow-sm hover:-translate-y-px transition-transform duration-200">
      <div className={`w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0 ${color}`}>
        <Icon className="w-[18px] h-[18px]" />
      </div>
      <div>
        <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
          {label}
        </p>
        <p className="text-xl font-black text-slate-900 leading-tight">
          {Number(value).toLocaleString()}
        </p>
        {sub && (
          <p className="text-[10px] text-slate-500 mt-0.5">
            {sub}
          </p>
        )}
      </div>
    </div>
  );
}

export default StatCard;
