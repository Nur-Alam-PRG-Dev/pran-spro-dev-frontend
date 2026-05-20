// attendanceReportData.js

export const companies = [
  { id: "C001", name: "Gulf Traders LLC" },
  { id: "C002", name: "Emirates Distribution Co." },
  { id: "C003", name: "Arabian Supply Chain Ltd." },
  { id: "C004", name: "Horizon Logistics Group" },
];

export const groups = [
  { id: "G001", companyId: "C001", name: "GT-Common_Grp" },
  { id: "G002", companyId: "C001", name: "GT-Sales_Grp" },
  { id: "G003", companyId: "C002", name: "ED-North_Grp" },
  { id: "G004", companyId: "C002", name: "ED-South_Grp" },
  { id: "G005", companyId: "C003", name: "AS-Retail_Grp" },
  { id: "G006", companyId: "C003", name: "AS-Wholesale_Grp" },
  { id: "G007", companyId: "C004", name: "HL-Express_Grp" },
  { id: "G008", companyId: "C004", name: "HL-Freight_Grp" },
];

export const regions = [
  { id: "R01", name: "Abu Dhabi" },
  { id: "R02", name: "Dubai" },
  { id: "R03", name: "Sharjah" },
  { id: "R04", name: "Al Ain" },
  { id: "R05", name: "Ajman" },
  { id: "R06", name: "Fujairah" },
  { id: "R07", name: "Ras Al Khaimah" },
  { id: "R08", name: "Umm Al Quwain" },
  { id: "R09", name: "Al Dhafra" },
  { id: "R10", name: "Khor Fakkan" },
  { id: "R11", name: "Kalba" },
  { id: "R12", name: "Dibba" },
  { id: "R13", name: "Madinat Zayed" },
  { id: "R14", name: "Liwa Oasis" },
];

export const zones = {
  "Abu Dhabi":       ["2010-Abu Dhabi Central", "2011-Abu Dhabi East", "2012-Abu Dhabi West"],
  "Dubai":           ["2020-Dubai Downtown", "2021-Dubai South", "2022-Dubai North", "2023-Dubai Industrial"],
  "Sharjah":         ["2030-Sharjah City", "2031-Sharjah Industrial"],
  "Al Ain":          ["2040-Al Ain City", "2041-Al Ain Outskirts"],
  "Ajman":           ["2050-Ajman Central", "2051-Ajman Industrial"],
  "Fujairah":        ["2060-Fujairah City", "2061-Fujairah Port"],
  "Ras Al Khaimah":  ["2070-RAK Central", "2071-RAK Industrial"],
  "Umm Al Quwain":   ["2080-UAQ Central"],
  "Al Dhafra":       ["2090-Al Dhafra West", "2091-Al Dhafra East"],
  "Khor Fakkan":     ["2100-Khor Fakkan Port", "2101-Khor Fakkan City"],
  "Kalba":           ["2110-Kalba Central"],
  "Dibba":           ["2120-Dibba City"],
  "Madinat Zayed":   ["2130-Madinat Zayed Central"],
  "Liwa Oasis":      ["2140-Liwa East", "2141-Liwa West"],
};

// ─── helpers ────────────────────────────────────────────────────────────────
const designations = ["TSM", "HOS", "SR", "Delivery Agent", "Accountant", "Supervisor", "Driver", "Coordinator"];
const faceImages = [
  "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150",
  "https://images.unsplash.com/photo-1628157582853-a796fa650a6a?w=150",
  "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150",
  "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150",
  "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150",
  "https://images.unsplash.com/photo-1527980965255-d3b416303d12?w=150",
  "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150",
];

const staffNames = [
  "Md. Masum Billah","UAE-HOS(GT)-Latif","UAE-Asst-Lokman","MD. ANAMUL HOQ RAJU","DA-Abdul Rouf",
  "Rakib Hasan","Sabbir Ahmed","Mehedi Hasan","Jahidul Islam","Tanvir Hossain",
  "Naim Hossain","Riyad Ahmed","Sakib Al Hasan","Mizanur Rahman","Hasib Karim",
  "Shuvo Das","Arif Hasan","Imran Kabir","Fahim Chowdhury","Rakibul Islam",
  "Mahmudul Hasan","Sohanur Rahman","Shamim Reza","Nayeem Islam","Tariqul Islam",
  "Jubayer Hossain","Masud Rana","Habibur Rahman","Saiful Islam","Ashraful Alam",
  "Rasel Ahmed","Kawsar Hossain","Jisan Karim","Morshed Alam","Nadim Hasan",
  "Minhaz Uddin","Rifat Mahmud","Sajjad Hossain","Tanmoy Das","Emran Kabir",
  "Arafat Islam","Mahfuz Rahman","Rakib Chowdhury","Sabbir Hasan","Nazmul Huda",
  "Rezaul Karim","Shakil Ahmed","Riad Mahmud","Foysal Ahmed","Towhidul Islam",
  "Hasan Mahmud","Arman Hossain","Nahid Rana","Mubin Islam","Rashed Karim",
  "Siam Ahmed","Tariq Hasan","Shawon Kabir","Jewel Rana","Shakib Rahman",
  "Nabil Hasan","Imtiaz Ahmed","Rony Islam","Fardin Mahmud","Sajib Khan",
  "Rakibul Hasan","Tamim Iqbal","Shihab Uddin","Parvez Alam","Moinul Islam",
  "Asif Rahman","Jahid Hasan","Raihan Kabir","Kamrul Islam","Naeem Hossain",
  "Sajib Ahmed","Muntasir Rahman","Tanvir Alam","Fahad Karim","Rashedul Islam",
  "Mahin Chowdhury","Rakib Ahmed","Sabbir Hossain","Shahriar Kabir","Minarul Islam",
  "Imran Hossain","Rony Hasan","Saad Rahman","Faisal Ahmed","Tariqul Hasan",
  "Noman Islam","Sayeed Hossain","Rifat Karim","Junaid Ahmed","Rakibul Karim",
  "Mohiuddin Alam","Ashik Rahman","Kamal Uddin","Riadul Hasan","Shuvo Rahman",
  "Tahmid Islam","Mahadi Hasan","Anik Hossain","Nafis Alam","Rafsan Karim",
  // Extra names for variety
  "Zubair Hassan","Khalid Al Mansoori","Omar Farouq","Bilal Siddiqui","Tariq Nawaz",
  "Farrukh Tashkentov","Ravi Shankar","Pradeep Kumar","Suresh Nair","Anwar Ibrahim",
  "Jassim Al Hammadi","Majid Al Rashidi","Saeed Al Zaabi","Nasser Al Ketbi","Ali Al Nuaimi",
  "Mohammed Al Mulla","Ahmed Al Shamsi","Salem Al Mazrouei","Khalifa Al Suwaidi","Hamad Al Dhaheri",
  "Yusuf Al Bloushi","Ibrahim Al Kaabi","Rashid Al Falahi","Sultan Al Ameri","Hazza Al Neyadi",
  "Prakash Menon","Arun Pillai","Deepak Sharma","Vijay Krishnan","Santosh Yadav",
  "Ajith Nambiar","Manoj Tiwari","Ramesh Gupta","Sunil Verma","Anil Kapoor",
  "Juan dela Cruz","Mark Santos","Carlo Reyes","Patrick Garcia","Jomar Dela Torre",
  "Robert Mensah","Emmanuel Osei","Charles Acheampong","Daniel Nkrumah","Joseph Asante",
  "Khaled Benali","Youssef Chakroun","Amine Bouali","Sofiane Djebari","Mehdi Salhi",
];

function pad(n) { return String(n).padStart(2, "0"); }

function randomTime(baseHour, baseMin, jitterMin = 30) {
  const totalMin = baseHour * 60 + baseMin + Math.floor(Math.random() * jitterMin);
  const h = Math.floor(totalMin / 60) % 24;
  const m = totalMin % 60;
  const s = Math.floor(Math.random() * 60);
  return `${pad(h)}:${pad(m)}:${pad(s)}`;
}

function makeStartTime(date, absent) {
  if (absent) return "0000-00-00 00:00:00";
  const t = randomTime(7, 0, 120); // 07:00 ± 2h
  return `${date} ${t}`;
}

function makeEndTime(date, startTime, absent) {
  if (absent) return "0000-00-00 00:00:00";
  const [h, m] = startTime.split(" ")[1].split(":").map(Number);
  const workMins = 540 + Math.floor(Math.random() * 180); // 9–12 hrs
  const endTotal = h * 60 + m + workMins;
  const eh = Math.floor(endTotal / 60) % 24;
  const em = endTotal % 60;
  const es = Math.floor(Math.random() * 60);
  return `${date} ${pad(eh)}:${pad(em)}:${pad(es)}`;
}

// ─── generate records ────────────────────────────────────────────────────────
const regionList = Object.keys(zones);
const groupList  = groups.map(g => g.name);
const companyList = companies.map(c => c.name);

let idCounter = 1;

function makeRecord(overrides = {}) {
  const region  = overrides.region  || regionList[Math.floor(Math.random() * regionList.length)];
  const zoneArr = zones[region];
  const zone    = zoneArr[Math.floor(Math.random() * zoneArr.length)];
  const group   = overrides.group   || groupList[Math.floor(Math.random() * groupList.length)];
  const company = overrides.company || companyList[Math.floor(Math.random() * companyList.length)];
  const desig   = designations[Math.floor(Math.random() * designations.length)];
  const name    = staffNames[Math.floor(Math.random() * staffNames.length)];
  const img     = faceImages[Math.floor(Math.random() * faceImages.length)];
  const isAbsent = Math.random() < 0.22; // ~22% absent rate
  const date    = overrides.date || "2026-05-18";
  const staffId = `UAE${String(1000 + idCounter).slice(1)}`;
  const mobile  = `97155${String(1000000 + Math.floor(Math.random() * 9000000))}`;
  const startT  = makeStartTime(date, isAbsent);
  const endT    = makeEndTime(date, startT, isAbsent);
  const lat     = (23.5 + Math.random() * 2.5).toFixed(4);
  const lng     = (54.0 + Math.random() * 2.5).toFixed(4);

  return {
    id: idCounter++,
    date,
    company,
    group,
    region,
    zone,
    staffId,
    staffName: name,
    designation: desig,
    staffMobile: mobile,
    startTime: startT,
    endTime: endT,
    status: isAbsent ? "Absent" : "Attendance",
    startImage: isAbsent ? null : img,
    endImage: isAbsent ? null : img,
    location: isAbsent ? "https://maps.google.com" : `https://maps.google.com/?q=${lat},${lng}`,
  };
}

// ─── seed records (original 5 preserved, then generated) ────────────────────
export const attendanceReportData = [
  // ── Original records (slightly enriched with company field) ──
  {
    id: idCounter++, date: "2026-05-18", company: "Gulf Traders LLC",
    group: "GT-Common_Grp", region: "Abu Dhabi", zone: "2010-Abu Dhabi Central",
    staffId: "359160", staffName: "Md. Masum Billah", designation: "TSM",
    staffMobile: "01533123161", startTime: "0000-00-00 00:00:00", endTime: "0000-00-00 00:00:00",
    status: "Absent", startImage: null, endImage: null, location: "https://maps.google.com",
  },
  {
    id: idCounter++, date: "2026-05-18", company: "Gulf Traders LLC",
    group: "GT-Common_Grp", region: "Abu Dhabi", zone: "2010-Abu Dhabi Central",
    staffId: "UAE0245", staffName: "UAE-HOS(GT)-Latif", designation: "HOS",
    staffMobile: "971555939488", startTime: "2026-05-18 08:59:46", endTime: "2026-05-18 18:10:27",
    status: "Attendance",
    startImage: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150",
    endImage: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150",
    location: "https://maps.google.com",
  },
  {
    id: idCounter++, date: "2026-05-18", company: "Gulf Traders LLC",
    group: "GT-Common_Grp", region: "Abu Dhabi", zone: "2011-Abu Dhabi East",
    staffId: "UAE1728", staffName: "UAE-Asst-Lokman", designation: "Accountant",
    staffMobile: "971555123456", startTime: "0000-00-00 00:00:00", endTime: "0000-00-00 00:00:00",
    status: "Absent", startImage: null, endImage: null, location: "https://maps.google.com",
  },
  {
    id: idCounter++, date: "2026-05-18", company: "Gulf Traders LLC",
    group: "GT-Common_Grp", region: "Dubai", zone: "2020-Dubai Downtown",
    staffId: "UAE0049", staffName: "MD. ANAMUL HOQ RAJU", designation: "Delivery Agent",
    staffMobile: "971555987654", startTime: "2026-05-18 09:35:10", endTime: "2026-05-18 23:44:37",
    status: "Attendance",
    startImage: "https://images.unsplash.com/photo-1628157582853-a796fa650a6a?w=150",
    endImage: "https://images.unsplash.com/photo-1628157582853-a796fa650a6a?w=150",
    location: "https://maps.google.com",
  },
  {
    id: idCounter++, date: "2026-05-18", company: "Emirates Distribution Co.",
    group: "ED-North_Grp", region: "Sharjah", zone: "2030-Sharjah City",
    staffId: "UAE0122", staffName: "DA-Abdul Rouf", designation: "Delivery Agent",
    staffMobile: "971555456789", startTime: "2026-05-18 07:14:10", endTime: "2026-05-18 20:28:04",
    status: "Attendance",
    startImage: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150",
    endImage: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150",
    location: "https://maps.google.com",
  },

  // ── Generated bulk records ──
  // 2026-05-18 – all 14 regions represented
  ...Array.from({ length: 40 }, () => makeRecord({ date: "2026-05-18", company: "Gulf Traders LLC", group: "GT-Common_Grp" })),
  ...Array.from({ length: 35 }, () => makeRecord({ date: "2026-05-18", company: "Gulf Traders LLC", group: "GT-Sales_Grp" })),
  ...Array.from({ length: 38 }, () => makeRecord({ date: "2026-05-18", company: "Emirates Distribution Co.", group: "ED-North_Grp" })),
  ...Array.from({ length: 30 }, () => makeRecord({ date: "2026-05-18", company: "Emirates Distribution Co.", group: "ED-South_Grp" })),
  ...Array.from({ length: 32 }, () => makeRecord({ date: "2026-05-18", company: "Arabian Supply Chain Ltd.", group: "AS-Retail_Grp" })),
  ...Array.from({ length: 28 }, () => makeRecord({ date: "2026-05-18", company: "Arabian Supply Chain Ltd.", group: "AS-Wholesale_Grp" })),
  ...Array.from({ length: 25 }, () => makeRecord({ date: "2026-05-18", company: "Horizon Logistics Group", group: "HL-Express_Grp" })),
  ...Array.from({ length: 22 }, () => makeRecord({ date: "2026-05-18", company: "Horizon Logistics Group", group: "HL-Freight_Grp" })),

  // 2026-05-19 data
  ...Array.from({ length: 38 }, () => makeRecord({ date: "2026-05-19", company: "Gulf Traders LLC", group: "GT-Common_Grp" })),
  ...Array.from({ length: 30 }, () => makeRecord({ date: "2026-05-19", company: "Gulf Traders LLC", group: "GT-Sales_Grp" })),
  ...Array.from({ length: 35 }, () => makeRecord({ date: "2026-05-19", company: "Emirates Distribution Co.", group: "ED-North_Grp" })),
  ...Array.from({ length: 28 }, () => makeRecord({ date: "2026-05-19", company: "Emirates Distribution Co.", group: "ED-South_Grp" })),
  ...Array.from({ length: 30 }, () => makeRecord({ date: "2026-05-19", company: "Arabian Supply Chain Ltd.", group: "AS-Retail_Grp" })),
  ...Array.from({ length: 25 }, () => makeRecord({ date: "2026-05-19", company: "Arabian Supply Chain Ltd.", group: "AS-Wholesale_Grp" })),
  ...Array.from({ length: 22 }, () => makeRecord({ date: "2026-05-19", company: "Horizon Logistics Group", group: "HL-Express_Grp" })),
  ...Array.from({ length: 20 }, () => makeRecord({ date: "2026-05-19", company: "Horizon Logistics Group", group: "HL-Freight_Grp" })),

  // 2026-05-20 data
  ...Array.from({ length: 36 }, () => makeRecord({ date: "2026-05-20", company: "Gulf Traders LLC", group: "GT-Common_Grp" })),
  ...Array.from({ length: 32 }, () => makeRecord({ date: "2026-05-20", company: "Gulf Traders LLC", group: "GT-Sales_Grp" })),
  ...Array.from({ length: 33 }, () => makeRecord({ date: "2026-05-20", company: "Emirates Distribution Co.", group: "ED-North_Grp" })),
  ...Array.from({ length: 27 }, () => makeRecord({ date: "2026-05-20", company: "Emirates Distribution Co.", group: "ED-South_Grp" })),
  ...Array.from({ length: 29 }, () => makeRecord({ date: "2026-05-20", company: "Arabian Supply Chain Ltd.", group: "AS-Retail_Grp" })),
  ...Array.from({ length: 24 }, () => makeRecord({ date: "2026-05-20", company: "Arabian Supply Chain Ltd.", group: "AS-Wholesale_Grp" })),
  ...Array.from({ length: 21 }, () => makeRecord({ date: "2026-05-20", company: "Horizon Logistics Group", group: "HL-Express_Grp" })),
  ...Array.from({ length: 18 }, () => makeRecord({ date: "2026-05-20", company: "Horizon Logistics Group", group: "HL-Freight_Grp" })),

  // 2026-05-21 data
  ...Array.from({ length: 35 }, () => makeRecord({ date: "2026-05-21", company: "Gulf Traders LLC", group: "GT-Common_Grp" })),
  ...Array.from({ length: 30 }, () => makeRecord({ date: "2026-05-21", company: "Gulf Traders LLC", group: "GT-Sales_Grp" })),
  ...Array.from({ length: 32 }, () => makeRecord({ date: "2026-05-21", company: "Emirates Distribution Co.", group: "ED-North_Grp" })),
  ...Array.from({ length: 26 }, () => makeRecord({ date: "2026-05-21", company: "Emirates Distribution Co.", group: "ED-South_Grp" })),
  ...Array.from({ length: 28 }, () => makeRecord({ date: "2026-05-21", company: "Arabian Supply Chain Ltd.", group: "AS-Retail_Grp" })),
  ...Array.from({ length: 23 }, () => makeRecord({ date: "2026-05-21", company: "Arabian Supply Chain Ltd.", group: "AS-Wholesale_Grp" })),
  ...Array.from({ length: 20 }, () => makeRecord({ date: "2026-05-21", company: "Horizon Logistics Group", group: "HL-Express_Grp" })),
  ...Array.from({ length: 17 }, () => makeRecord({ date: "2026-05-21", company: "Horizon Logistics Group", group: "HL-Freight_Grp" })),
];
