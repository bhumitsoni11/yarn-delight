export interface MockOrder {
  id: string
  referenceId: string
  createdAt: string
  status: "pending" | "crafting" | "dispatched" | "delivered" | "cancelled"
  totalPaise: number
  customerName: string
  customerEmail: string
  customerPhone: string
  shippingAddress: {
    street: string
    city: string
    state: string
    postalCode: string
    landmark?: string
  }
  items: {
    productId: string
    title: string
    quantity: number
    pricePaise: number
    imageUrl: string
    color?: string
  }[]
  timeline: {
    status: string
    title: string
    description: string
    timestamp: string
    completed: boolean
  }[]
  trackingNumber?: string
  courierPartner?: string
  paymentMethod: "razorpay_upi" | "razorpay_card" | "cod"
}

export interface MockCustomRequest {
  id: string
  referenceId: string
  customerName: string
  customerEmail: string
  customerPhone: string
  silhouette: string
  yarnBlend: string
  palette: string
  dimensions?: string
  hardwarePreference?: string
  referenceImageUrl?: string
  specialNotes: string
  estimatedBudgetPaise: number
  status: "in_review" | "quote_sent" | "approved" | "crafting" | "completed"
  createdAt: string
}

export interface MockAddress {
  id: string
  name: string
  phone: string
  street: string
  city: string
  state: string
  postalCode: string
  landmark?: string
  isDefault: boolean
  type: "home" | "work"
}

export interface MockCustomer {
  id: string
  name: string
  email: string
  phone: string
  city: string
  state: string
  totalOrders: number
  totalSpentPaise: number
  memberTier: "Atelier Club" | "Bespoke Patron" | "VIP Artisan"
  createdAt: string
  lastActive: string
}

export interface MockCoupon {
  code: string
  discountPercent: number
  minOrderPaise: number
  maxDiscountPaise: number
  description: string
  active: boolean
  usageCount: number
}

export const MOCK_ORDERS: MockOrder[] = [
  {
    id: "ord-1",
    referenceId: "YD-2026-84920",
    createdAt: "2026-02-18T14:32:00Z",
    status: "crafting",
    totalPaise: 349900,
    customerName: "Ananya Sharma",
    customerEmail: "ananya.sharma@example.com",
    customerPhone: "+91 98201 44521",
    shippingAddress: {
      street: "Flat 402, Magnolia Enclave, 12th Main Road, Indiranagar",
      city: "Bengaluru",
      state: "Karnataka",
      postalCode: "560038",
      landmark: "Near Defence Colony Club",
    },
    items: [
      {
        productId: "prod-1",
        title: "The Sweetheart Rosebud Tote",
        quantity: 1,
        pricePaise: 349900,
        imageUrl:
          "https://lh3.googleusercontent.com/aida-public/AB6AXuBKfeFFDTmNtsDMxOBh7yYBD9iQ7URH7qdFY0zhG5ylGqf_9QbytjlD6JwaHjnQApHQ5ceC7pQ7Nat_XTNNx4ERysrHDeT3-rf3D9btV82PRzx_ytx_ou_BW-FpMOEyliqSUys-san_fPSFfmUCHr78nXorh8BYqI9EAaWbc9f4HKcjqHZ2rbNczBzTognLceP7wPpNqKioA8OWVXnAcQdfeOiLHwZ6teZXdhzn6tI",
        color: "Blush Pink",
      },
    ],
    timeline: [
      {
        status: "placed",
        title: "Order Placed & Confirmed",
        description: "Payment captured via Razorpay UPI. Milk cotton skeins reserved.",
        timestamp: "18 Feb 2026, 02:32 PM",
        completed: true,
      },
      {
        status: "crafting",
        title: "Artisan Hand-Stitching in Gujarat",
        description: "Master artisan Leelaben is hand-crocheting rosette appliques (Hour 6 of 12).",
        timestamp: "19 Feb 2026, 11:15 AM",
        completed: true,
      },
      {
        status: "quality_check",
        title: "Slow-Craft Quality & Tension Inspection",
        description: "Checking handle tensile strength and organic cotton lining stitch perfection.",
        timestamp: "Expected 22 Feb 2026",
        completed: false,
      },
      {
        status: "dispatched",
        title: "Pan-India Courier Handover",
        description: "Handed over to Bluedart Express with eco-friendly canvas tote bag.",
        timestamp: "Expected 23 Feb 2026",
        completed: false,
      },
      {
        status: "delivered",
        title: "Delivered to Doorstep",
        description: "Delivery partner will deliver with OTP verification.",
        timestamp: "Expected 25 Feb 2026",
        completed: false,
      },
    ],
    trackingNumber: "BD994821034IN",
    courierPartner: "Bluedart Express",
    paymentMethod: "razorpay_upi",
  },
  {
    id: "ord-2",
    referenceId: "YD-2026-71203",
    createdAt: "2026-02-12T09:14:00Z",
    status: "delivered",
    totalPaise: 519800,
    customerName: "Rhea Deshmukh",
    customerEmail: "rhea.d@example.com",
    customerPhone: "+91 99302 88129",
    shippingAddress: {
      street: "B-21, Sea Breeze Apartments, Perry Cross Road, Bandra West",
      city: "Mumbai",
      state: "Maharashtra",
      postalCode: "400050",
      landmark: "Opposite Joggers Park",
    },
    items: [
      {
        productId: "prod-5",
        title: "Daisy Coquette Mini Shoulder Bag",
        quantity: 1,
        pricePaise: 329900,
        imageUrl:
          "https://lh3.googleusercontent.com/aida-public/AB6AXuCPqDrkmJ7q4feV66tq4_CTcrfUL295IVuCAQuvAKwalalo9UC1anoCmX0ngaE0_kQfRezjD1EUQS6kkTjvKXb1FbdU_uRHoWW6P5hkiXvjiTmYIhT92VrXvo9bjeFxJXXQ3ypdSrY3gICFqb_HW_30wPqZXSwW_6gy4PziDzC3v2f_vvRrcQ5aeY9mtUfGgHgCXag5MS5Zfv797LhuxL198LxHYLwZnQY2kXV5Z1k",
        color: "Butter Daisy",
      },
      {
        productId: "prod-2",
        title: "Cloud Nine Pearl Clutch",
        quantity: 1,
        pricePaise: 189900,
        imageUrl:
          "https://lh3.googleusercontent.com/aida-public/AB6AXuBKKITwEuAaZoZ8TbaydldOLmDJb7_Uy-zKm1slr3xZS0hpLbJWLkm3S42dQ0L2LZBjhMlElIOePn3OZUL82aQXelX_ZbqhJh-Anho0V5yrOKFd-kPaZ8Ylic5c3EcUuXhujoxgcJ-JK1HKuMP1bhmKIdeUtfXlsU_GtbXxJv01JGRxBax9b8OCbe-A1GZpqjx6odaeFwmUIVp5o-uVIHu9VlGGtaMmV2okUokpRe8",
        color: "Ecru Cream",
      },
    ],
    timeline: [
      {
        status: "placed",
        title: "Order Placed & Confirmed",
        description: "Payment verified via Razorpay Netbanking.",
        timestamp: "12 Feb 2026, 09:14 AM",
        completed: true,
      },
      {
        status: "crafting",
        title: "Handcrafted in Studio",
        description: "Hand-stitched daisy petals woven.",
        timestamp: "13 Feb 2026, 04:00 PM",
        completed: true,
      },
      {
        status: "dispatched",
        title: "Dispatched via Delhivery Express",
        description: "Tracking DEL98120489IN.",
        timestamp: "15 Feb 2026, 11:30 AM",
        completed: true,
      },
      {
        status: "delivered",
        title: "Delivered to Doorstep",
        description: "Delivered with signature confirmation.",
        timestamp: "17 Feb 2026, 03:45 PM",
        completed: true,
      },
    ],
    trackingNumber: "DEL98120489IN",
    courierPartner: "Delhivery Surface & Air",
    paymentMethod: "razorpay_card",
  },
  {
    id: "ord-3",
    referenceId: "YD-2026-60194",
    createdAt: "2026-02-19T18:20:00Z",
    status: "pending",
    totalPaise: 129800,
    customerName: "Kavya Menon",
    customerEmail: "kavya.m@example.com",
    customerPhone: "+91 97412 33401",
    shippingAddress: {
      street: "Villa 14, Palm Meadows, Whitefield",
      city: "Bengaluru",
      state: "Karnataka",
      postalCode: "560066",
      landmark: "Near Forum Value Mall",
    },
    items: [
      {
        productId: "prod-4",
        title: "Coquette Bow Hair Barrettes (Set of 2)",
        quantity: 1,
        pricePaise: 79900,
        imageUrl:
          "https://lh3.googleusercontent.com/aida-public/AB6AXuDgC7HrRR8wzReU8as-tNNdk4yEw3jHB1A1fyKCjGHVmeRv-SRBWD8__kSRDAyzAVBAnbm57ghwbf3cj9f38MlLT6rpr4JAUFmXHAyvxGRXzm2IV4zf3WuIlXqbIIrSUYnEFs3elvevnS77nBKtZL48KWxB3T5Zs3Bg2s3j7O6UlJDNY5ACNf9Y4tHyoxxF9mveRaXCwzKYYFElEfObt_tW7t_DmPD5LqKF2NUXRl0",
        color: "Buttercup Duo",
      },
      {
        productId: "prod-6",
        title: "Blossom Berry Amigurumi Bag Charm",
        quantity: 1,
        pricePaise: 49900,
        imageUrl:
          "https://lh3.googleusercontent.com/aida-public/AB6AXuAvMQdIODzUmIWsj0922e_64kbwP-bL_TScy8IRZG-gtWJiZhytHhI6GK68HqS9oVA5sKpON5nMVtNYQT7ghM7ypW4tjOpJKU2qelguFS8ERskMHkt-PmEilIz9LlYarAqu9GRwwU8fYFBQOAuRjEmRvAoQ516wLT-FkAJtRiygx7ju6GZcS8EH4Aw4oMpmx5H-_e0gbIRYM110MWgsi9A5h3xvspP3diOTzJXDpIc",
        color: "Strawberry Red",
      },
    ],
    timeline: [
      {
        status: "placed",
        title: "Order Placed & Verification Pending",
        description: "Cash on delivery booking awaiting WhatsApp confirmation.",
        timestamp: "19 Feb 2026, 06:20 PM",
        completed: true,
      },
      {
        status: "crafting",
        title: "Scheduled for Crafting",
        description: "Scheduled to begin in slot 4B.",
        timestamp: "Pending confirmation",
        completed: false,
      },
    ],
    paymentMethod: "cod",
  },
]

export const MOCK_CUSTOM_REQUESTS: MockCustomRequest[] = [
  {
    id: "cr-101",
    referenceId: "CR-2026-101",
    customerName: "Aadhya Iyer",
    customerEmail: "aadhya.iyer@example.com",
    customerPhone: "+91 98840 19283",
    silhouette: "Vintage Structured Box Bag",
    yarnBlend: "Organic Milk Cotton (5-ply) + Raffia Base",
    palette: "Pastel Pistachio, French Cream & Rosette Pink",
    dimensions: "24cm (W) x 18cm (H) x 9cm (D)",
    hardwarePreference: "Brushed Antique Gold Clasps & Feet",
    specialNotes:
      "Looking for a sturdy handbag for wedding season. Needs to fit iPhone 16 Pro Max and a compact perfume bottle. Could we add micro pearl accents around the clasp?",
    estimatedBudgetPaise: 420000,
    status: "in_review",
    createdAt: "2026-02-19T11:45:00Z",
  },
  {
    id: "cr-102",
    referenceId: "CR-2026-102",
    customerName: "Sanya Mehta",
    customerEmail: "sanya.m@example.com",
    customerPhone: "+91 98110 54321",
    silhouette: "Oversized Slouchy Granny Square Tote",
    yarnBlend: "Brushed Merino Wool Blend",
    palette: "Mocha Brown, Butter Yellow, Baby Blue & Lavender",
    dimensions: "36cm (W) x 40cm (H)",
    hardwarePreference: "Wide Crochet Shoulder Strap (No metal)",
    specialNotes:
      "College tote bag. Must carry a 14-inch MacBook and a hardbound sketchbook. Reinforced bottom preferred.",
    estimatedBudgetPaise: 380000,
    status: "quote_sent",
    createdAt: "2026-02-17T16:20:00Z",
  },
  {
    id: "cr-103",
    referenceId: "CR-2026-103",
    customerName: "Pooja Varma",
    customerEmail: "pooja.v@example.com",
    customerPhone: "+91 97422 99812",
    silhouette: "Floral Coquette Waistcoat / Vest",
    yarnBlend: "100% Cotton Fine Twist",
    palette: "Butter Yellow with 3D Daisy Flowers",
    dimensions: "Size S (Bust 34 inches, Length 17 inches)",
    hardwarePreference: "Tortoiseshell Button Closures",
    specialNotes: "Crop length to pair over white linen collared shirts.",
    estimatedBudgetPaise: 480000,
    status: "crafting",
    createdAt: "2026-02-14T10:10:00Z",
  },
]

export const MOCK_ADDRESSES: MockAddress[] = [
  {
    id: "addr-1",
    name: "Ananya Sharma",
    phone: "+91 98201 44521",
    street: "Flat 402, Magnolia Enclave, 12th Main Road, Indiranagar",
    city: "Bengaluru",
    state: "Karnataka",
    postalCode: "560038",
    landmark: "Near Defence Colony Club",
    isDefault: true,
    type: "home",
  },
  {
    id: "addr-2",
    name: "Ananya Sharma (Work)",
    phone: "+91 98201 44521",
    street: "WeWork Galaxy, 43 Residency Road, Shanthala Nagar",
    city: "Bengaluru",
    state: "Karnataka",
    postalCode: "560025",
    landmark: "Near Mayo Hall",
    isDefault: false,
    type: "work",
  },
]

export const MOCK_CUSTOMERS: MockCustomer[] = [
  {
    id: "cust-1",
    name: "Ananya Sharma",
    email: "ananya.sharma@example.com",
    phone: "+91 98201 44521",
    city: "Bengaluru",
    state: "Karnataka",
    totalOrders: 3,
    totalSpentPaise: 949700,
    memberTier: "Bespoke Patron",
    createdAt: "2025-10-14T08:00:00Z",
    lastActive: "Today at 02:32 PM",
  },
  {
    id: "cust-2",
    name: "Rhea Deshmukh",
    email: "rhea.d@example.com",
    phone: "+91 99302 88129",
    city: "Mumbai",
    state: "Maharashtra",
    totalOrders: 2,
    totalSpentPaise: 689800,
    memberTier: "Atelier Club",
    createdAt: "2025-11-20T12:00:00Z",
    lastActive: "Yesterday",
  },
  {
    id: "cust-3",
    name: "Aadhya Iyer",
    email: "aadhya.iyer@example.com",
    phone: "+91 98840 19283",
    city: "Chennai",
    state: "Tamil Nadu",
    totalOrders: 1,
    totalSpentPaise: 420000,
    memberTier: "Atelier Club",
    createdAt: "2026-01-05T10:00:00Z",
    lastActive: "3 days ago",
  },
  {
    id: "cust-4",
    name: "Kavya Menon",
    email: "kavya.m@example.com",
    phone: "+91 97412 33401",
    city: "Kochi",
    state: "Kerala",
    totalOrders: 1,
    totalSpentPaise: 129800,
    memberTier: "Atelier Club",
    createdAt: "2026-02-19T18:20:00Z",
    lastActive: "Just now",
  },
]

export const MOCK_COUPONS: MockCoupon[] = [
  {
    code: "ATELIER10",
    discountPercent: 10,
    minOrderPaise: 150000,
    maxDiscountPaise: 50000,
    description: "10% off on all artisan crochet pieces above ₹1,500.",
    active: true,
    usageCount: 142,
  },
  {
    code: "GENZCOQUETTE",
    discountPercent: 15,
    minOrderPaise: 250000,
    maxDiscountPaise: 80000,
    description: "15% off for first-time coquette accessories & bags.",
    active: true,
    usageCount: 89,
  },
  {
    code: "FREESHIP",
    discountPercent: 0,
    minOrderPaise: 99900,
    maxDiscountPaise: 19900,
    description: "Free pan-India shipping on orders over ₹999.",
    active: true,
    usageCount: 312,
  },
]

export const MOCK_INVENTORY_ITEMS = [
  {
    id: "raw-1",
    materialName: "Organic Milk Cotton Yarn (Pastel Pink)",
    sku: "YARN-MC-PNK-01",
    batch: "B26-01",
    quantitySkeins: 42,
    threshold: 15,
    unitCostPaise: 22000,
    supplier: "Gujarat Khadi & Craft Weaver Collective",
    status: "healthy",
  },
  {
    id: "raw-2",
    materialName: "Egyptian Mercerized Cotton (Ecru Cream)",
    sku: "YARN-EMC-ECR-04",
    batch: "B26-02",
    quantitySkeins: 8,
    threshold: 12,
    unitCostPaise: 31000,
    supplier: "Coimbatore Fine Spinners",
    status: "low_stock",
  },
  {
    id: "raw-3",
    materialName: "Freshwater Mother of Pearl Bag Handles",
    sku: "ACC-MOP-HDL-09",
    batch: "B26-03",
    quantitySkeins: 14,
    threshold: 10,
    unitCostPaise: 45000,
    supplier: "Jaipur Artisan Guild",
    status: "healthy",
  },
  {
    id: "raw-4",
    materialName: "Brushed Highland Alpaca Blend (Lavender)",
    sku: "YARN-ALP-LAV-02",
    batch: "B26-01",
    quantitySkeins: 5,
    threshold: 10,
    unitCostPaise: 52000,
    supplier: "Himachal Wool Cooperative",
    status: "critical",
  },
]
