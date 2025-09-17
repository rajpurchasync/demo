export interface Location {
  id: string;
  name: string;
  country: string;
  state: string;
  city: string;
  street: string;
  details: string;
  isDefault: boolean;
}

export const mockLocations: Location[] = [
  {
    id: '1',
    name: 'Head Office',
    country: 'United Arab Emirates',
    state: 'Dubai',
    city: 'Dubai',
    street: 'Sheikh Zayed Road',
    details: 'Tower 1, Floor 15, Office 1501',
    isDefault: true
  },
  {
    id: '2',
    name: 'Branch Office',
    country: 'United Arab Emirates',
    state: 'Abu Dhabi',
    city: 'Abu Dhabi',
    street: 'Corniche Road',
    details: 'Marina Mall, Level 2',
    isDefault: false
  },
  {
    id: '3',
    name: 'Warehouse',
    country: 'United Arab Emirates',
    state: 'Sharjah',
    city: 'Sharjah',
    street: 'Industrial Area',
    details: 'Warehouse Complex B, Unit 12',
    isDefault: false
  }
];