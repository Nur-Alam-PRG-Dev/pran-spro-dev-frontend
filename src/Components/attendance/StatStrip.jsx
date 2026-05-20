'use client';

import React from 'react';
import { Users, UserCheck, UserX, Clock } from 'lucide-react';
import StatCard from '@/Components/ui/StatCard';

/**
 * @fileoverview Summary statistics ribbon displaying key counters for active attendance data views.
 */

/**
 * @typedef {Object} StatStripProps
 * @property {number} total - Total staff size matching criteria.
 * @property {number} present - Present staff count.
 * @property {number} absent - Absent staff count.
 * @property {number} inView - Items match search queries.
 * @property {number} attendRate - Computed attendance rate integer (%).
 */

/**
 * Renders the dashboard statistics dashboard grid.
 * @param {StatStripProps} props - Component properties.
 */
export function StatStrip({
  total,
  present,
  absent,
  inView,
  attendRate
}) {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-5">
      <StatCard
        icon={Users}
        label="Total Staff"
        value={total}
        color="bg-slate-100 text-slate-600"
        sub="after filters"
      />
      <StatCard
        icon={UserCheck}
        label="Present"
        value={present}
        color="bg-emerald-100 text-emerald-600"
        sub={`${attendRate}% rate`}
      />
      <StatCard
        icon={UserX}
        label="Absent"
        value={absent}
        color="bg-rose-100 text-rose-600"
        sub={`${100 - attendRate}% rate`}
      />
      <StatCard
        icon={Clock}
        label="In View"
        value={inView}
        color="bg-violet-100 text-violet-600"
        sub="matching search"
      />
    </div>
  );
}

export default StatStrip;
