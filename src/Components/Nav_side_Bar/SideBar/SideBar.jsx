'use client'

import React, { useState, useEffect } from 'react';
import { PanelLeftOpen, Earth, ChevronDown } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { sidebarMenuItems } from '@/Components/Nav_side_Bar/SideBar/sideBarOption';

const SideBar = () => {
     const pathname = usePathname();
     const [isDrawerOpen, setIsDrawerOpen] = useState(false);

     // Track open states for accordion mode when sidebar is expanded
     const [openMenus, setOpenMenus] = useState({});

     const isPathActive = (href) => {
          if (!href) return false;
          if (href === '/') return pathname === '/';
          return pathname.startsWith(href);
     };

     useEffect(() => {
          const checkbox = document.getElementById('my-drawer-4');
          if (!checkbox) return;

          setIsDrawerOpen(checkbox.checked);

          const handleToggle = (e) => {
               setIsDrawerOpen(e.target.checked);
          };

          checkbox.addEventListener('change', handleToggle);
          return () => checkbox.removeEventListener('change', handleToggle);
     }, []);

     // Sync active items to automatically expand accordions when layout path changes
     useEffect(() => {
          if (!isDrawerOpen) return;
          const initialOpenStates = {};
          sidebarMenuItems.forEach((item) => {
               if (item.isCollapsible) {
                    const hasActiveChild = item.subMenu?.some(subItem => isPathActive(subItem.href));
                    if (hasActiveChild) {
                         initialOpenStates[item.label] = true;
                    }
               }
          });
          setOpenMenus(prev => ({ ...prev, ...initialOpenStates }));
     }, [pathname, isDrawerOpen]);

     const handleMenuHeaderClick = (menuLabel) => {
          if (!isDrawerOpen) return;
          setOpenMenus(prev => ({ ...prev, [menuLabel]: !prev[menuLabel] }));
     };

     return (
          <div className="flex min-h-full flex-col items-start bg-base-200 is-drawer-close:w-16 is-drawer-open:w-64 text-neutral border-r border-base-300 transition-all duration-300 z-30">
               <ul className="menu w-full p-2 gap-1.5 grow font-medium">

                    {/* Sidebar Toggle Controller */}
                    <li className="w-full">
                         <label
                              htmlFor="my-drawer-4"
                              className={`flex items-center gap-4 py-2.5 px-4 rounded-lg hover:bg-base-300 cursor-pointer text-slate-500 transition-colors duration-200 ${isDrawerOpen ? '!bg-[#410078] !text-white' : ''
                                   }`}
                         >
                              {isDrawerOpen ? (
                                   <Earth className="w-5 h-5 shrink-0" />
                              ) : (
                                   <PanelLeftOpen className="w-5 h-5 shrink-0" />
                              )}
                              <span className="is-drawer-close:hidden tracking-wide whitespace-nowrap">
                                   SPRO country_name
                              </span>
                         </label>
                    </li>

                    {/* Dynamic Menu Generation */}
                    {sidebarMenuItems.map((item) => {
                         const IconComponent = item.icon;

                         // Case A: Item has a sub-menu dropdown loop
                         if (item.isCollapsible) {
                              const isParentActive = item.subMenu?.some(subItem => isPathActive(subItem.href));
                              const isMenuOpen = !!openMenus[item.label];

                              return (
                                   <li key={item.label} className="w-full flex flex-col relative group">

                                        {/* Main Dropdown Header Item */}
                                        <div
                                             onClick={() => handleMenuHeaderClick(item.label)}
                                             className={`flex items-center justify-between py-2.5 px-4 rounded-lg transition-colors duration-200 cursor-pointer ${isParentActive
                                                  ? '!bg-[#410078] !text-white'
                                                  : 'hover:bg-base-300 text-slate-600'
                                                  }`}
                                        >
                                             <div className="flex items-center gap-4">
                                                  <IconComponent className={`w-5 h-5 shrink-0 ${isParentActive ? 'text-white' : 'text-slate-500'}`} />
                                                  <span className="is-drawer-close:hidden tracking-wide whitespace-nowrap">{item.label}</span>
                                             </div>
                                             <ChevronDown className={`w-4 h-4 transition-transform duration-200 is-drawer-close:hidden mr-1 ${isMenuOpen ? 'rotate-180' : ''
                                                  } ${isParentActive ? 'text-white' : 'text-slate-400'}`} />
                                        </div>

                                        {/* Dual Layer Adaptive Submenu */}
                                        <ul className={`gap-1 ${isDrawerOpen
                                                  ? `mt-1 ml-4 border-l border-base-300 pl-2 is-drawer-close:hidden ${isMenuOpen ? 'flex flex-col' : 'hidden'}`
                                                  /* Premium LIGHT glassmorphism / White blur effect applied below */
                                                  : 'hidden group-hover:flex flex-col absolute left-full top-0 ml-2 p-2.5 w-60 bg-white/70 backdrop-blur-md rounded-xl shadow-xl border border-white/40 z-[99]'
                                             }`}>

                                             {/* Mini flyout tracking header label (Only visible in collapsed state) */}
                                             <div className="px-3 py-2 text-xs font-bold tracking-wider text-slate-500 uppercase border-b border-slate-200 mb-1.5 is-drawer-open:hidden">
                                                  {item.label}
                                             </div>

                                             {item.subMenu?.map((subItem) => {
                                                  const isSubActive = isPathActive(subItem.href);
                                                  return (
                                                       <li key={subItem.label}>
                                                            <Link
                                                                 href={subItem.href}
                                                                 className={`py-2 px-3 text-sm rounded-md transition-colors duration-150 ${isSubActive
                                                                      ? 'is-drawer-open:!bg-[#410078] is-drawer-open:!text-white is-drawer-close:!bg-[#410078] is-drawer-close:!text-white'
                                                                      : 'text-slate-600 is-drawer-open:hover:bg-base-300 is-drawer-close:hover:bg-[#410078]/10 is-drawer-close:hover:text-[#410078]'
                                                                      }`}
                                                            >
                                                                 {subItem.label}
                                                            </Link>
                                                       </li>
                                                  );
                                             })}
                                        </ul>
                                   </li>
                              );
                         }

                         // Case B: Standalone simple link
                         const isLinkActive = isPathActive(item.href);
                         return (
                              <li key={item.label} className="w-full">
                                   <Link
                                        href={item.href}
                                        className={`flex items-center gap-4 py-2.5 px-4 rounded-lg transition-colors duration-200 ${isLinkActive
                                             ? '!bg-[#410078] !text-white'
                                             : 'hover:bg-base-300 text-slate-600'
                                             }`}
                                   >
                                        <IconComponent className={`w-5 h-5 shrink-0 ${isLinkActive ? 'text-white' : 'text-slate-500'}`} />
                                        <span className="is-drawer-close:hidden tracking-wide whitespace-nowrap">{item.label}</span>
                                   </Link>
                              </li>
                         );
                    })}

               </ul>
          </div>
     );
};

export default SideBar;