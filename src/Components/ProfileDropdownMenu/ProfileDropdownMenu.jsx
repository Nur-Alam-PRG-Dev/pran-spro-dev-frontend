import React from 'react';
import { User, Settings, LogOut } from 'lucide-react';
import Link from 'next/link';

const ProfileDropdownMenu = () => {
     return (
          /* DaisyUI Dropdown wrapper aligned cleanly to the right end of your navbar */
          <div className="dropdown dropdown-end">

               {/* 1. Trigger Button */}
               <div
                    tabIndex={0}
                    role="button"
                    className="btn btn-ghost flex items-center gap-2.5 px-3 rounded-full hover:bg-slate-100 transition-colors duration-200"
               >
                    <img
                         src="https://readymadeui.com/profile_6.webp"
                         className="w-8 h-8 rounded-full object-cover ring-2 ring-slate-100"
                         alt="User Profile"
                    />
                    <span className="text-sm font-semibold text-slate-800 max-w-[100px] truncate">
                         John Doe
                    </span>
                    <svg
                         xmlns="http://www.w3.org/2000/svg"
                         className="size-2.5 fill-slate-500"
                         viewBox="0 0 512 512"
                    >
                         <path d="M511 138.2c-3-13.8-11.2-23.1-25.2-27-15.3-4.3-28 .4-38.8 11.3-41.9 42-83.7 84.1-125.5 126.2-21 21-42.2 41.9-65.4 65L64.7 122.3c-16-16-38.8-16.9-53.6-2.8s-15 38 .6 53.7C83.9 245.8 156.4 318.3 229 390.5c15.8 15.7 38 16.1 53.5.6 73-72.5 145.7-145.2 218.2-218.1 9.5-9.6 13.3-21.4 10.3-34.8" />
                    </svg>
               </div>

               {/* 2. Dropdown List Panel */}
               <ul
                    tabIndex={0}
                    className="dropdown-content menu p-1.5 mt-2 z-[50] w-52 bg-white border border-slate-200 rounded-xl shadow-xl font-medium text-slate-700 gap-0.5"
               >
                    {/* Profile Link */}
                    <li>
                         <Link
                              href="/profile"
                              className="flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-slate-100 active:!bg-[#410078] active:!text-white"
                         >
                              <User className="w-[18px] h-[18px] text-slate-500" />
                              <span>My Profile</span>
                         </Link>
                    </li>

                    {/* Settings Link */}
                    <li>
                         <Link
                              href="/settings"
                              className="flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-slate-100 active:!bg-[#410078] active:!text-white"
                         >
                              <Settings className="w-[18px] h-[18px] text-slate-500" />
                              <span>Settings</span>
                         </Link>
                    </li>

                    {/* Separation Border Line before core action */}
                    <div className="my-1 border-t border-slate-100" />

                    {/* Logout Link */}
                    <li>
                         <Link
                              href="/logout"
                              className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-rose-600 hover:bg-rose-50 hover:text-rose-700 active:!bg-rose-600 active:!text-white"
                         >
                              <LogOut className="w-[18px] h-[18px]" />
                              <span className="font-semibold">Logout</span>
                         </Link>
                    </li>
               </ul>

          </div>
     );
};

export default ProfileDropdownMenu;