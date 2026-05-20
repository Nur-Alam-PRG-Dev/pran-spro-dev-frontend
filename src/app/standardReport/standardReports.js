// ==========================================
// 1. DATA CONFIGURATION (Report Cards definitions)
// ==========================================
const reportListData = {
     generalReports: [
          {
               title: "Agent/SR Outlet Mapping",
               desc: "Get SR or TSM day wise assign, visit, order or distance wise outlet list and assign those outlet to Tele agent or any Staff.",
               href: '/standardReport/outlet-mapping' // <-- Change this
          },
          {
               title: "Attendance Report",
               desc: "Detailed information on SR attendance including check-in/out times.",
               href: '/standardReport/AttendanceReport' // <-- Point directly to your attendance page folder
          },
          {
               title: "SR Route Outlet Download",
               desc: "Download route-wise outlet coverage, visits, orders, and sales report.",
               href: '/standardReport/route-download'
          },
          {
               title: "Hourly Activity",
               desc: "SR Hourly Activity and SR Hourly Visit and Order Count.",
               href: '/standardReport/hourly-activity'
          }
     ],
     srReports: [
          {
               title: "Order Vs Delivery Report",
               desc: "Order vs Delivery with region, zone, group, sr, or details.",
               href: '#'
          },
          {
               title: "SR Non Productivity Report",
               desc: "Attended, but no further activity (Visit/Order).",
               href: '#'
          },
          {
               title: "SR Performance Overview",
               desc: "SR Performance Report - visit, productive outlet, order amount, LPC & item/order summary (Company / Group / Zone / SR).",
               href: '#'
          },
          {
               title: "SR Productivity Report",
               desc: "Visit, Unique Visit, Order, Amount & Strike Rate.",
               href: '#'
          },
          {
               title: "SR Route Outlet Analysis",
               desc: "Route-wise outlet coverage, visits, orders, and sales amounts.",
               href: '#'
          },
          {
               title: "SR Weekly Performance",
               desc: "SR outlet, visits, orders, and LPC for the current day, the previous week, and the week before.",
               href: '#'
          }
     ],
     otherReports: [
          {
               title: "Target vs Achievement Analysis",
               desc: "Compare dynamic monthly sales targets against real-time operational dashboard values.",
               href: '#'
          }
     ]
};
export default reportListData;