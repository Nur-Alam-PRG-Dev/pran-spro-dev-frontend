import { House, FileChartColumn, UsersRound } from 'lucide-react';

export const sidebarMenuItems = [
     {
          label: "Homepage",
          href: "/",
          icon: House,
          isCollapsible: false
     },
     {
          label: "Employee Master",
          icon: UsersRound,
          isCollapsible: true,
          subMenu: [
               { label: "Employee", href: "/employee" },
               { label: "Edit Employee", href: "/editEmployee" },
               { label: "Show Password", href: "/showPassword" }
          ],
     },
     {
          label: "Standard Report",
          icon: FileChartColumn,
          isCollapsible: true,
          subMenu: [
               { label: "Standard Report", href: "/standardReport" },
               { label: "TeleSales Report", href: "/teleSalesReport" }
          ],
     },
];