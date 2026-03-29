// Mock inventory data
export interface PartListing {
  id: string
  name: string
  make: string
  partType: string
  price: number
  condition: 'excellent' | 'good' | 'fair'
  warranty: string
  location: string
  image: string
  rating: number
  reviews: number
  description: string
  compatibility: string[]
}

export const mockParts: PartListing[] = [
  {
    id: 'part-001',
    name: 'Complete Engine - V6 3.0L',
    make: 'Honda Accord',
    partType: 'Engines',
    price: 1200,
    condition: 'excellent',
    warranty: '30 days',
    location: 'Los Angeles, CA',
    image: '/images/used-engines.jpg',
    rating: 4.8,
    reviews: 42,
    description: 'Low mileage engine from a 2018 Honda Accord with clean history',
    compatibility: ['2015-2019 Honda Accord'],
  },
  {
    id: 'part-002',
    name: 'Automatic Transmission AT',
    make: 'Toyota Camry',
    partType: 'Transmissions',
    price: 800,
    condition: 'good',
    warranty: '60 days',
    location: 'Houston, TX',
    image: '/images/used-transmissions.jpg',
    rating: 4.6,
    reviews: 28,
    description: 'Reliable transmission with 85k miles. Tested and working',
    compatibility: ['2010-2014 Toyota Camry'],
  },
  {
    id: 'part-003',
    name: 'Complete Engine - V8 5.0L',
    make: 'Ford Mustang',
    partType: 'Engines',
    price: 2500,
    condition: 'excellent',
    warranty: '90 days',
    location: 'Phoenix, AZ',
    image: '/images/used-engines.jpg',
    rating: 4.9,
    reviews: 65,
    description: 'High-performance V8 engine, recently rebuilt',
    compatibility: ['2015-2020 Ford Mustang GT'],
  },
  {
    id: 'part-004',
    name: 'Transmission CVT',
    make: 'Nissan Altima',
    partType: 'Transmissions',
    price: 650,
    condition: 'fair',
    warranty: '30 days',
    location: 'Miami, FL',
    image: '/images/used-transmissions.jpg',
    rating: 4.2,
    reviews: 15,
    description: 'Functional CVT transmission, minor wear',
    compatibility: ['2012-2018 Nissan Altima'],
  },
  {
    id: 'part-005',
    name: 'Engine 4-Cylinder 2.0L',
    make: 'BMW 3 Series',
    partType: 'Engines',
    price: 1800,
    condition: 'good',
    warranty: '45 days',
    location: 'Seattle, WA',
    image: '/images/used-engines.jpg',
    rating: 4.7,
    reviews: 33,
    description: 'Well-maintained BMW engine with service records',
    compatibility: ['2008-2012 BMW 3 Series'],
  },
  {
    id: 'part-006',
    name: 'Automatic Transmission',
    make: 'Chevrolet Silverado',
    partType: 'Transmissions',
    price: 950,
    condition: 'excellent',
    warranty: '60 days',
    location: 'Dallas, TX',
    image: '/images/used-transmissions.jpg',
    rating: 4.8,
    reviews: 50,
    description: 'Heavy-duty transmission, perfect condition',
    compatibility: ['2014-2019 Chevrolet Silverado'],
  },
  {
    id: 'part-007',
    name: 'Engine V6 3.5L',
    make: 'Toyota Camry',
    partType: 'Engines',
    price: 1400,
    condition: 'good',
    warranty: '45 days',
    location: 'Denver, CO',
    image: '/images/used-engines.jpg',
    rating: 4.5,
    reviews: 22,
    description: 'Reliable Toyota V6 engine with full documentation',
    compatibility: ['2006-2011 Toyota Camry'],
  },
  {
    id: 'part-008',
    name: 'Manual Transmission 6-Speed',
    make: 'Volkswagen Jetta',
    partType: 'Transmissions',
    price: 550,
    condition: 'good',
    warranty: '30 days',
    location: 'Portland, OR',
    image: '/images/used-transmissions.jpg',
    rating: 4.4,
    reviews: 18,
    description: 'Smooth shifting manual transmission',
    compatibility: ['2011-2018 Volkswagen Jetta'],
  },
]

export const partTypes = ['Engines', 'Transmissions', 'Parts']
export const conditions = ['excellent', 'good', 'fair']
export const warranties = ['30 days', '45 days', '60 days', '90 days']
export const locations = [
  'Los Angeles, CA',
  'Houston, TX',
  'Phoenix, AZ',
  'Miami, FL',
  'Seattle, WA',
  'Dallas, TX',
  'Denver, CO',
  'Portland, OR',
]
