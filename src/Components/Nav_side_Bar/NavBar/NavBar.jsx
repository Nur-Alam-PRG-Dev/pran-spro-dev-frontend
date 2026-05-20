'use client'

import React from 'react';
import { Menu } from 'lucide-react'; 
import DigitalClock from '@/Components/DigitalClock/DigitalClock';
import ProfileDropdownMenu from '@/Components/ProfileDropdownMenu/ProfileDropdownMenu';

const NavBar = () => {
     return (
          /* Modified Classes for Glassmorphism Navbar:
            - Swapped bg-base-300 with bg-white/70
            - Added backdrop-blur-md for frosting effect
            - Added border-white/40 and z-40 to stay stacked beautifully over scrollable items
          */
          <nav className="navbar w-full bg-white/90 backdrop-blur-md text-neutral flex items-center justify-between px-3 sm:px-4 gap-2 border-b border-white/40 sticky top-0 left-0 z-10 shadow-sm transition-all duration-300">
               
               {/* Left Section: Mobile Toggle & Clock Wrapper */}
               <div className="flex items-center gap-2 flex-shrink-0">
                    {/* Mobile Hamburger Menu Trigger 
                      - Visible on mobile/tablet (block)
                      - Hidden on desktop layout (lg:hidden)
                      - "htmlFor" must match your Sidebar Drawer checkbox ID exactly
                    */}
                    <label 
                         htmlFor="my-drawer-4" 
                         className="btn btn-ghost btn-sm p-1 lg:hidden flex items-center justify-center text-slate-600 hover:bg-slate-200/50 rounded-md cursor-pointer"
                         aria-label="open sidebar"
                    >
                         <Menu className="w-5 h-5 shrink-0" />
                    </label>

                    <DigitalClock />
               </div>
               
               {/* Right Section: Profile Control Group */}
               <div className="flex-shrink-0">
                    <ProfileDropdownMenu />
               </div>
               
          </nav>
     );
};

export default NavBar;