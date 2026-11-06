import { LostFoundItem, CollegeLocation, ItemCategory, TeamMember, CampusLocationHub } from '../types';

export const COLLEGE_LOCATIONS: CollegeLocation[] = [
  'Sci building',
  'Comm building',
  'Arts building',
  'Canteen',
  'Rupangan',
  'Black facility building',
  'New law building',
  'Front gate',
  'Backgate',
  'Garden'
];

export const TEAM_MEMBERS: TeamMember[] = [
  { name: 'Raj vishwakarma', role: 'Frontend' },
  { name: 'Manish yadav', role: 'Backend' },
  { name: 'Darshil', role: 'Frontend' },
  { name: 'Arya pendulkar', role: 'Frontend' },
  { name: 'Elvisha tuscano', role: 'Backend' }
];

export const COLLEGE_HUBS: CampusLocationHub[] = [
  {
    id: 'hub-1',
    name: 'Canteen',
    deskLocation: 'Main Counter Service Desk',
    hours: 'Mon – Sat: 7:30 AM – 8:00 PM',
    phone: '(555) 019-2101'
  },
  {
    id: 'hub-2',
    name: 'Sci building',
    deskLocation: 'Ground Floor Science Administration Office',
    hours: 'Mon – Fri: 8:00 AM – 6:00 PM',
    phone: '(555) 019-2102'
  },
  {
    id: 'hub-3',
    name: 'Rupangan',
    deskLocation: 'Auditorium Staff Desk',
    hours: 'Mon – Sat: 8:30 AM – 7:00 PM',
    phone: '(555) 019-2103'
  },
  {
    id: 'hub-4',
    name: 'New law building',
    deskLocation: 'Law Library Circulation Desk, 1st Floor',
    hours: 'Mon – Fri: 8:00 AM – 7:30 PM',
    phone: '(555) 019-2104'
  },
  {
    id: 'hub-5',
    name: 'Front gate',
    deskLocation: 'Main Security Gatehouse (24/7)',
    hours: '24 Hours / 7 Days',
    phone: '(555) 019-2105'
  }
];

export const INITIAL_ITEMS: LostFoundItem[] = [
  {
    id: 'LF-2026-0901',
    title: 'Boat Earbuds',
    type: 'lost',
    category: 'Electronics',
    location: 'Canteen',
    specificSpot: 'Table 6 near juice counter',
    dateReported: '2 days ago',
    dateOccurred: 'Nov 3, 2:30 PM',
    status: 'lost',
    description: 'Black boAt Airdopes wireless earbuds inside matte black charging case. Misplaced on wooden bench in Canteen after lunch rush.',
    verificationQuestion: 'What color is the silicone case accent, or what device name appears when Bluetooth scans it?',
    reportedBy: {
      name: 'Rohan Sharma',
      role: 'Student',
      contactMethod: 'Campus Portal'
    },
    tags: ['boAt', 'Earbuds', 'Canteen', 'Audio']
  },
  {
    id: 'LF-2026-0902',
    title: 'Skybags Backpack',
    type: 'found',
    category: 'Wallets & Bags',
    location: 'Comm building',
    specificSpot: 'Classroom 204 second row',
    dateReported: '3 days ago',
    dateOccurred: 'Nov 2, 11:15 AM',
    status: 'found',
    description: 'Navy blue Skybags casual campus backpack with accounts textbooks and notebooks found on 2nd floor Comm building.',
    verificationQuestion: 'What subject notebook is in the front pocket and what brand of scientific calculator is inside?',
    heldAtHub: 'Comm building',
    reportedBy: {
      name: 'Pooja Verma',
      role: 'Campus Staff',
      contactMethod: 'Security Desk'
    },
    tags: ['Skybags', 'Backpack', 'Comm building', 'Books']
  },
  {
    id: 'LF-2026-0903',
    title: 'Fastrack Watch',
    type: 'lost',
    category: 'Jewelry & Accessories',
    location: 'Rupangan',
    specificSpot: 'Row F, Seat 12',
    dateReported: '1 week ago',
    dateOccurred: 'Oct 29, 1:40 PM',
    status: 'lost',
    description: 'Mens analog Fastrack watch with metallic silver casing, black textured dial, red seconds hand, and black textured strap. Left during drama rehearsal in Rupangan.',
    verificationQuestion: 'What engraving or numbers appear on the stainless steel caseback?',
    reportedBy: {
      name: 'Aman Patel',
      role: 'Student',
      contactMethod: 'Student Email'
    },
    tags: ['Fastrack', 'Watch', 'Rupangan', 'Accessories']
  },
  {
    id: 'LF-2026-0904',
    title: 'Hydro Flask Bottle',
    type: 'found',
    category: 'Other',
    location: 'Sci building',
    specificSpot: 'Chemistry Lab Room 102',
    dateReported: '1 week ago',
    dateOccurred: 'Oct 28, 4:00 PM',
    status: 'found',
    description: 'White 24oz Hydro Flask stainless steel insulated water tumbler with black flex loop lid. Safely turned in at Sci building office.',
    verificationQuestion: 'What color is the silicone ring inside the cap, and is there any sticker on the side?',
    heldAtHub: 'Sci building',
    reportedBy: {
      name: 'Prof. David K.',
      role: 'Faculty',
      contactMethod: 'Campus Portal'
    },
    tags: ['Hydro Flask', 'Bottle', 'Sci building', 'Drinkware']
  },
  {
    id: 'LF-2026-0905',
    title: 'College ID Card & Lanyard',
    type: 'found',
    category: 'Keys & IDs',
    location: 'Front gate',
    specificSpot: 'Security turnstile checkpoint',
    dateReported: 'Yesterday',
    dateOccurred: 'Nov 4, 8:45 AM',
    status: 'found',
    description: 'College student ID card with blue university lanyard and bus transit pass found near the turnstiles.',
    verificationQuestion: 'What is the student roll number and blood group printed on the card?',
    heldAtHub: 'Front gate',
    reportedBy: {
      name: 'Officer Shinde',
      role: 'Campus Staff',
      contactMethod: 'Security Desk'
    },
    tags: ['ID Card', 'Front gate', 'Lanyard']
  },
  {
    id: 'LF-2026-0906',
    title: 'HP Pavilion Laptop Charger',
    type: 'lost',
    category: 'Electronics',
    location: 'New law building',
    specificSpot: 'Moot Court Hall Table 3',
    dateReported: '3 days ago',
    dateOccurred: 'Nov 2, 4:10 PM',
    status: 'lost',
    description: '65W blue tip HP original power adapter with yellow sticker near the plug.',
    verificationQuestion: 'What text is handwritten on the yellow sticker on the adapter?',
    reportedBy: {
      name: 'Siddharth Rao',
      role: 'Student',
      contactMethod: 'Student Email'
    },
    tags: ['HP', 'Charger', 'New law building']
  },
  {
    id: 'LF-2026-0907',
    title: 'Ray-Ban Sunglasses in Leather Case',
    type: 'found',
    category: 'Jewelry & Accessories',
    location: 'Garden',
    specificSpot: 'Stone bench under banyan tree',
    dateReported: '4 days ago',
    dateOccurred: 'Nov 1, 5:20 PM',
    status: 'found',
    description: 'Classic black frame Wayfarer style sunglasses in brown protective button pouch found on garden bench.',
    verificationQuestion: 'What color is the cleaning cloth inside the leather pouch?',
    heldAtHub: 'Front gate',
    reportedBy: {
      name: 'Neha Kapoor',
      role: 'Student',
      contactMethod: 'Campus Portal'
    },
    tags: ['Ray-Ban', 'Garden', 'Accessories']
  },
  {
    id: 'LF-2026-0908',
    title: 'Bike Keys with Keyring',
    type: 'lost',
    category: 'Keys & IDs',
    location: 'Backgate',
    specificSpot: 'Two-wheeler parking row 4',
    dateReported: '5 days ago',
    dateOccurred: 'Oct 31, 6:00 PM',
    status: 'lost',
    description: 'Honda Activa key with silver superhero keychain charm left near the parking gate.',
    verificationQuestion: 'What superhero character is on the keychain charm?',
    reportedBy: {
      name: 'Varun Joshi',
      role: 'Student',
      contactMethod: 'Campus Portal'
    },
    tags: ['Keys', 'Backgate', 'Parking']
  },
  {
    id: 'LF-2026-0909',
    title: 'Organic Chemistry Reference Textbook',
    type: 'found',
    category: 'Books & Notes',
    location: 'Arts building',
    specificSpot: 'Staircase landing 2nd floor',
    dateReported: '6 days ago',
    dateOccurred: 'Oct 30, 1:15 PM',
    status: 'found',
    description: 'Hardcover Organic Chemistry textbook with sticky tabs on chapters 4 and 7.',
    verificationQuestion: 'What student name is penciled on the inside front cover?',
    heldAtHub: 'Arts building',
    reportedBy: {
      name: 'Ananya Sen',
      role: 'Student',
      contactMethod: 'Student Email'
    },
    tags: ['Textbook', 'Arts building', 'Chemistry']
  },
  {
    id: 'LF-2026-0910',
    title: 'Gym Duffle Bag (Puma)',
    type: 'found',
    category: 'Clothing & Gear',
    location: 'Black facility building',
    specificSpot: 'Indoor sports badminton court locker',
    dateReported: '1 week ago',
    dateOccurred: 'Oct 29, 6:30 PM',
    status: 'reunited',
    description: 'Black and yellow Puma sports duffle bag safely returned to owner via security verification.',
    reportedBy: {
      name: 'Coach Thomas',
      role: 'Faculty',
      contactMethod: 'Campus Portal'
    },
    tags: ['Puma', 'Black facility building', 'Reunited']
  }
];

export const CATEGORIES: ItemCategory[] = [
  'Electronics',
  'Wallets & Bags',
  'Keys & IDs',
  'Books & Notes',
  'Clothing & Gear',
  'Jewelry & Accessories',
  'Other'
];
