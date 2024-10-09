const users = [
  {
    firstName: "John",
    lastName: "Doe",
    email: "john.doe@example.com",
    createdAt: new Date("2023-01-15T09:30:00Z"),
  },
  {
    firstName: "Jane",
    lastName: "Smith",
    email: "jane.smith@example.com",
    createdAt: new Date("2023-02-22T14:45:00Z"),
  },
  {
    firstName: "Michael",
    lastName: "Johnson",
    email: "michael.johnson@example.com",
    createdAt: new Date("2023-03-10T11:20:00Z"),
  },
  {
    firstName: "Emily",
    lastName: "Brown",
    email: "emily.brown@example.com",
    createdAt: new Date("2023-04-05T16:55:00Z"),
  },
  {
    firstName: "David",
    lastName: "Wilson",
    email: "david.wilson@example.com",
    createdAt: new Date("2023-05-18T08:15:00Z"),
  },
  {
    firstName: "Sarah",
    lastName: "Taylor",
    email: "sarah.taylor@example.com",
    createdAt: new Date("2023-06-30T13:40:00Z"),
  },
  {
    firstName: "Robert",
    lastName: "Anderson",
    email: "robert.anderson@example.com",
    createdAt: new Date("2023-07-12T10:05:00Z"),
  },
  {
    firstName: "Lisa",
    lastName: "Martinez",
    email: "lisa.martinez@example.com",
    createdAt: new Date("2023-08-25T15:30:00Z"),
  },
  {
    firstName: "William",
    lastName: "Garcia",
    email: "william.garcia@example.com",
    createdAt: new Date("2023-09-08T12:50:00Z"),
  },
  {
    firstName: "Jennifer",
    lastName: "Lopez",
    email: "jennifer.lopez@example.com",
    createdAt: new Date("2023-10-20T17:10:00Z"),
  },
];

const products = [
  {
    id: 1,
    name: "Morning Blend",
    description: "A smooth, balanced coffee to start your day right.",
    order: 1,
    variants: [
      { id: 1, name: "Whole Bean", price: 12.99 },
      { id: 2, name: "Ground", price: 12.99 },
      { id: 3, name: "K-Cup Pods", price: 14.99 },
    ],
  },
  {
    id: 2,
    name: "Espresso Roast",
    description: "Bold and intense, perfect for espresso-based drinks.",
    order: 2,
    variants: [
      { id: 4, name: "Whole Bean", price: 13.99 },
      { id: 5, name: "Ground", price: 13.99 },
    ],
  },
  {
    id: 3,
    name: "Decaf Colombian",
    description: "All the flavor without the caffeine.",
    order: 3,
    variants: [
      { id: 6, name: "Whole Bean", price: 11.99 },
      { id: 7, name: "Ground", price: 11.99 },
    ],
  },
  {
    id: 4,
    name: "Hazelnut Cream",
    description: "A nutty, indulgent flavored coffee.",
    order: 4,
    variants: [{ id: 8, name: "Ground", price: 13.49 }],
  },
  {
    id: 5,
    name: "Single Origin Ethiopian",
    description: "Bright and fruity with floral notes.",
    order: 5,
    variants: [
      { id: 9, name: "Whole Bean", price: 15.99 },
      { id: 10, name: "Ground", price: 15.99 },
      { id: 11, name: "Cold Brew Packs", price: 17.99 },
    ],
  },
];

const orders: {
  id: number;
  createdAt: Date;
  printedAt: Date | null;
  tracking: string | null;
  label: string;
  address: {
    name: string;
    city: string;
    state: string;
    zip: string;
  };
  amount: number;
}[] = [
  {
    id: 1,
    createdAt: new Date("2023-01-15T09:30:00Z"),
    printedAt: null,
    tracking: null,
    label: "https://ups.com/label/1234567890",
    address: {
      name: "2930 16th St NW",
      city: "Washington",
      state: "DC",
      zip: "20011",
    },
    amount: 10,
  },
  {
    id: 2,
    createdAt: new Date("2023-03-22T14:45:00Z"),
    printedAt: new Date("2023-03-22T15:30:00Z"),
    tracking: null,
    label: "https://ups.com/label/1234567890",
    address: {
      name: "123 Main St",
      city: "New York",
      state: "NY",
      zip: "10001",
    },
    amount: 25,
  },
  {
    id: 3,
    createdAt: new Date("2023-05-07T11:15:00Z"),
    printedAt: null,
    tracking: "https://usps.com/5678901234",
    label: "https://usps.com/label/5678901234",
    address: {
      name: "456 Oak Ave",
      city: "Los Angeles",
      state: "CA",
      zip: "90001",
    },
    amount: 15,
  },
  {
    id: 4,
    createdAt: new Date("2023-07-18T08:00:00Z"),
    printedAt: new Date("2023-07-18T09:30:00Z"),
    tracking: null,
    label: "https://dhl.com/label/2468101214",
    address: {
      name: "789 Pine Rd",
      city: "Chicago",
      state: "IL",
      zip: "60601",
    },
    amount: 30,
  },
  {
    id: 5,
    createdAt: new Date("2023-09-03T16:20:00Z"),
    printedAt: null,
    tracking: null,
    label: "https://ups.com/label/1357924680",
    address: {
      name: "321 Elm St",
      city: "Houston",
      state: "TX",
      zip: "77001",
    },
    amount: 20,
  },
  {
    id: 6,
    createdAt: new Date("2023-11-11T10:45:00Z"),
    printedAt: new Date("2023-11-11T11:30:00Z"),
    tracking: null,
    label: "https://fedex.com/label/3692581470",
    address: {
      name: "159 Maple Dr",
      city: "Miami",
      state: "FL",
      zip: "33101",
    },
    amount: 35,
  },
  {
    id: 7,
    createdAt: new Date("2023-12-25T12:00:00Z"),
    printedAt: null,
    tracking: "https://usps.com/9876543210",
    label: "https://usps.com/label/9876543210",
    address: {
      name: "753 Cedar Ln",
      city: "Seattle",
      state: "WA",
      zip: "98101",
    },
    amount: 40,
  },
];

const cart = [
  {
    id: 1,
    userId: 1,
    userEmail: "john.doe@example.com",
    cardId: 1,
    shippingId: 1,
    items: 3,
    cost: 12.58,
  },
  {
    id: 2,
    userId: 2,
    userEmail: "jane.smith@example.com",
    cardId: 2,
    shippingId: 2,
    items: 5,
    cost: 45.99,
  },
  {
    id: 3,
    userId: 3,
    userEmail: "mike.johnson@example.com",
    cardId: 3,
    shippingId: 3,
    items: 2,
    cost: 29.99,
  },
  {
    id: 4,
    userId: 4,
    userEmail: "emily.brown@example.com",
    cardId: 4,
    shippingId: 4,
    items: 1,
    cost: 9.99,
  },
  {
    id: 5,
    userId: 5,
    userEmail: "david.wilson@example.com",
    cardId: 5,
    shippingId: 5,
    items: 4,
    cost: 67.5,
  },
  {
    id: 6,
    userId: 6,
    userEmail: "sarah.lee@example.com",
    cardId: 6,
    shippingId: 6,
    items: 2,
    cost: 24.99,
  },
  {
    id: 7,
    userId: 7,
    userEmail: "chris.taylor@example.com",
    cardId: 7,
    shippingId: 7,
    items: 6,
    cost: 89.95,
  },
  {
    id: 8,
    userId: 8,
    userEmail: "lisa.anderson@example.com",
    cardId: 8,
    shippingId: 8,
    items: 1,
    cost: 15.99,
  },
  {
    id: 9,
    userId: 9,
    userEmail: "robert.martin@example.com",
    cardId: 9,
    shippingId: 9,
    items: 3,
    cost: 39.97,
  },
  {
    id: 10,
    userId: 10,
    userEmail: "amanda.white@example.com",
    cardId: 10,
    shippingId: 10,
    items: 2,
    cost: 19.98,
  },
];

export { users, products, orders, cart };
