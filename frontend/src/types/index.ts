export type ItemStatus = 'lost' | 'found' | 'reunited';

export type ItemCategory = 
  | 'Electronics'
  | 'Wallets & Bags'
  | 'Keys & IDs'
  | 'Books & Notes'
  | 'Clothing & Gear'
  | 'Jewelry & Accessories'
  | 'Other';

export type CollegeLocation =
  | 'Sci building'
  | 'Comm building'
  | 'Arts building'
  | 'Canteen'
  | 'Rupangan'
  | 'Black facility building'
  | 'New law building'
  | 'Front gate'
  | 'Backgate'
  | 'Garden';

export interface CampusLocationHub {
  id: string;
  name: CollegeLocation;
  deskLocation: string;
  hours: string;
  phone: string;
}

export interface LostFoundItem {
  id: string;
  title: string;
  type: 'lost' | 'found';
  category: ItemCategory;
  location: CollegeLocation;
  specificSpot?: string;
  dateReported: string;
  dateOccurred: string;
  status: ItemStatus;
  description: string;
  imageUrl?: string;
  verificationQuestion?: string;
  heldAtHub?: CollegeLocation | string;
  reportedBy: {
    name: string;
    role: 'Student' | 'Faculty' | 'Campus Staff' | 'Anonymous';
    contactMethod: 'Campus Portal' | 'Student Email' | 'Security Desk';
  };
  tags: string[];
}

export interface TeamMember {
  name: string;
  role: 'Frontend' | 'Backend';
}
