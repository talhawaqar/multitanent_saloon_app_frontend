"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Calendar } from "@/components/ui/calendar";
import { Separator } from "@/components/ui/separator";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Search,
  MapPin,
  Star,
  Clock,
  ChevronRight,
  ChevronLeft,
  CheckCircle,
  Phone,
  CreditCard,
  CalendarIcon,
  User,
  Building,
  MoreHorizontal,
} from "lucide-react";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";

// Mock salon data
const salons = [
  {
    id: 1,
    name: "Glamour Studio",
    description: "Premium hair and beauty services with expert stylists",
    image: "/placeholder.svg?height=200&width=300&text=Glamour+Studio",
    rating: 4.8,
    reviewCount: 124,
    priceRange: "$50-150",
    services: ["Hair Cut", "Coloring", "Styling"],
    locations: [
      {
        id: 1,
        name: "Downtown Location",
        address: "123 Main St, Downtown",
        phone: "+1 (555) 123-4567",
        distance: "0.5 miles",
      },
      {
        id: 2,
        name: "Uptown Branch",
        address: "456 Oak Ave, Uptown",
        phone: "+1 (555) 123-4568",
        distance: "2.1 miles",
      },
      {
        id: 3,
        name: "Mall Location",
        address: "789 Shopping Center, Westside",
        phone: "+1 (555) 123-4569",
        distance: "3.2 miles",
      },
    ],
  },
  {
    id: 2,
    name: "Bella Beauty Lounge",
    description: "Full-service salon specializing in modern cuts and colors",
    image: "/placeholder.svg?height=200&width=300&text=Bella+Beauty",
    rating: 4.6,
    reviewCount: 89,
    priceRange: "$40-120",
    services: ["Hair Cut", "Highlights", "Treatments"],
    locations: [
      {
        id: 1,
        name: "Central Plaza",
        address: "321 Center St, Midtown",
        phone: "+1 (555) 234-5678",
        distance: "1.0 miles",
      },
      {
        id: 2,
        name: "Riverside Branch",
        address: "654 River Rd, Riverside",
        phone: "+1 (555) 234-5679",
        distance: "2.5 miles",
      },
    ],
  },
  {
    id: 3,
    name: "Luxe Nail Bar",
    description:
      "Luxury nail care and spa treatments in a relaxing environment",
    image: "/placeholder.svg?height=200&width=300&text=Luxe+Nail+Bar",
    rating: 4.9,
    reviewCount: 156,
    priceRange: "$30-80",
    services: ["Manicure", "Pedicure", "Nail Art"],
    locations: [
      {
        id: 1,
        name: "Spa Location",
        address: "987 Wellness Way, Spa District",
        phone: "+1 (555) 345-6789",
        distance: "0.8 miles",
      },
    ],
  },
  {
    id: 4,
    name: "The Hair Studio",
    description:
      "Contemporary salon with experienced stylists and latest trends",
    image: "/placeholder.svg?height=200&width=300&text=Hair+Studio",
    rating: 4.7,
    reviewCount: 67,
    priceRange: "$45-130",
    services: ["Hair Cut", "Balayage", "Extensions"],
    locations: [
      {
        id: 1,
        name: "Fashion District",
        address: "147 Style Ave, Fashion District",
        phone: "+1 (555) 456-7890",
        distance: "2.1 miles",
      },
    ],
  },
  {
    id: 5,
    name: "Radiance Spa & Salon",
    description: "Complete beauty destination with spa and salon services",
    image: "/placeholder.svg?height=200&width=300&text=Radiance+Spa",
    rating: 4.5,
    reviewCount: 203,
    priceRange: "$60-200",
    services: ["Facial", "Massage", "Hair Services"],
    locations: [
      {
        id: 1,
        name: "Luxury Center",
        address: "258 Luxury Blvd, Upscale",
        phone: "+1 (555) 567-8901",
        distance: "1.5 miles",
      },
      {
        id: 2,
        name: "Resort Branch",
        address: "369 Resort Dr, Resort Area",
        phone: "+1 (555) 567-8902",
        distance: "4.2 miles",
      },
    ],
  },
  {
    id: 6,
    name: "Chic Cuts",
    description: "Trendy salon focusing on modern cuts and styling",
    image: "/placeholder.svg?height=200&width=300&text=Chic+Cuts",
    rating: 4.4,
    reviewCount: 45,
    priceRange: "$35-90",
    services: ["Hair Cut", "Styling", "Blowout"],
    locations: [
      {
        id: 1,
        name: "Trendy District",
        address: "741 Trend St, Hip Area",
        phone: "+1 (555) 678-9012",
        distance: "3.0 miles",
      },
    ],
  },
  {
    id: 7,
    name: "Elegance Hair Boutique",
    description: "Upscale salon with personalized styling and premium products",
    image: "/placeholder.svg?height=200&width=300&text=Elegance+Hair",
    rating: 4.9,
    reviewCount: 112,
    priceRange: "$55-180",
    services: ["Hair Cut", "Color", "Keratin Treatment"],
    locations: [
      {
        id: 1,
        name: "Main Location",
        address: "852 Elite St, Fashion District",
        phone: "+1 (555) 789-0123",
        distance: "1.7 miles",
      },
    ],
  },
  {
    id: 8,
    name: "Urban Style Studio",
    description: "Modern salon with cutting-edge techniques and styles",
    image: "/placeholder.svg?height=200&width=300&text=Urban+Style",
    rating: 4.6,
    reviewCount: 78,
    priceRange: "$40-110",
    services: ["Hair Cut", "Color", "Styling"],
    locations: [
      {
        id: 1,
        name: "Downtown Branch",
        address: "963 Urban Ave, Downtown",
        phone: "+1 (555) 890-1234",
        distance: "0.9 miles",
      },
    ],
  },
  {
    id: 9,
    name: "Serenity Day Spa",
    description: "Full-service spa offering relaxation and beauty treatments",
    image: "/placeholder.svg?height=200&width=300&text=Serenity+Spa",
    rating: 4.8,
    reviewCount: 187,
    priceRange: "$70-250",
    services: ["Massage", "Facial", "Body Treatment"],
    locations: [
      {
        id: 1,
        name: "Wellness Center",
        address: "159 Calm St, Spa District",
        phone: "+1 (555) 901-2345",
        distance: "2.3 miles",
      },
    ],
  },
  {
    id: 10,
    name: "The Barber Shop",
    description: "Classic barbershop with modern grooming services for men",
    image: "/placeholder.svg?height=200&width=300&text=Barber+Shop",
    rating: 4.7,
    reviewCount: 92,
    priceRange: "$25-60",
    services: ["Haircut", "Shave", "Beard Trim"],
    locations: [
      {
        id: 1,
        name: "Main Street",
        address: "753 Main St, Downtown",
        phone: "+1 (555) 012-3456",
        distance: "1.2 miles",
      },
    ],
  },
  {
    id: 11,
    name: "Bliss Beauty Bar",
    description: "Trendy beauty bar specializing in makeup and skincare",
    image: "/placeholder.svg?height=200&width=300&text=Bliss+Beauty",
    rating: 4.5,
    reviewCount: 64,
    priceRange: "$30-120",
    services: ["Makeup", "Facial", "Lash Extensions"],
    locations: [
      {
        id: 1,
        name: "Beauty District",
        address: "357 Glam Ave, Fashion District",
        phone: "+1 (555) 123-4570",
        distance: "1.8 miles",
      },
    ],
  },
  {
    id: 12,
    name: "Zen Wellness Center",
    description: "Holistic wellness center offering spa and beauty services",
    image: "/placeholder.svg?height=200&width=300&text=Zen+Wellness",
    rating: 4.9,
    reviewCount: 143,
    priceRange: "$50-200",
    services: ["Massage", "Facial", "Yoga"],
    locations: [
      {
        id: 1,
        name: "Wellness Plaza",
        address: "951 Zen Way, Wellness District",
        phone: "+1 (555) 234-5680",
        distance: "2.7 miles",
      },
    ],
  },
  {
    id: 13,
    name: "Color Me Beautiful",
    description: "Salon specializing in hair coloring and highlights",
    image: "/placeholder.svg?height=200&width=300&text=Color+Me+Beautiful",
    rating: 4.7,
    reviewCount: 89,
    priceRange: "$60-180",
    services: ["Hair Color", "Highlights", "Balayage"],
    locations: [
      {
        id: 1,
        name: "Color Studio",
        address: "753 Rainbow Rd, Artsy District",
        phone: "+1 (555) 345-6790",
        distance: "1.5 miles",
      },
    ],
  },
  {
    id: 14,
    name: "Curl Up & Dye",
    description: "Fun, quirky salon specializing in creative cuts and colors",
    image: "/placeholder.svg?height=200&width=300&text=Curl+Up+And+Dye",
    rating: 4.6,
    reviewCount: 76,
    priceRange: "$45-150",
    services: ["Creative Cuts", "Vibrant Colors", "Styling"],
    locations: [
      {
        id: 1,
        name: "Artistic Quarter",
        address: "159 Creative Blvd, Arts District",
        phone: "+1 (555) 456-7891",
        distance: "2.2 miles",
      },
    ],
  },
  {
    id: 15,
    name: "Polished Nail Lounge",
    description: "Premium nail salon with luxury pedicure services",
    image: "/placeholder.svg?height=200&width=300&text=Polished+Nails",
    rating: 4.8,
    reviewCount: 118,
    priceRange: "$35-90",
    services: ["Manicure", "Pedicure", "Gel Polish"],
    locations: [
      {
        id: 1,
        name: "Luxury Mall",
        address: "357 Shopping Center, Upscale District",
        phone: "+1 (555) 567-8903",
        distance: "3.1 miles",
      },
    ],
  },
  {
    id: 16,
    name: "Men's Grooming Club",
    description: "Exclusive men's salon offering premium grooming services",
    image: "/placeholder.svg?height=200&width=300&text=Mens+Grooming",
    rating: 4.9,
    reviewCount: 87,
    priceRange: "$40-120",
    services: ["Haircut", "Shave", "Facial"],
    locations: [
      {
        id: 1,
        name: "Gentleman's Quarter",
        address: "852 Dapper St, Business District",
        phone: "+1 (555) 678-9013",
        distance: "1.3 miles",
      },
    ],
  },
  {
    id: 17,
    name: "Brow & Lash Studio",
    description: "Specialized salon for eyebrow and eyelash services",
    image: "/placeholder.svg?height=200&width=300&text=Brow+And+Lash",
    rating: 4.7,
    reviewCount: 94,
    priceRange: "$25-80",
    services: ["Brow Shaping", "Lash Extensions", "Tinting"],
    locations: [
      {
        id: 1,
        name: "Beauty Center",
        address: "159 Pretty Blvd, Fashion District",
        phone: "+1 (555) 789-0124",
        distance: "1.9 miles",
      },
    ],
  },
  {
    id: 18,
    name: "Tranquility Massage",
    description: "Peaceful spa focusing on therapeutic massage treatments",
    image: "/placeholder.svg?height=200&width=300&text=Tranquility+Massage",
    rating: 4.9,
    reviewCount: 156,
    priceRange: "$70-150",
    services: ["Swedish Massage", "Deep Tissue", "Hot Stone"],
    locations: [
      {
        id: 1,
        name: "Wellness Center",
        address: "753 Peaceful Lane, Quiet District",
        phone: "+1 (555) 890-1235",
        distance: "2.5 miles",
      },
    ],
  },
  {
    id: 19,
    name: "Skin Revival Clinic",
    description: "Skincare clinic offering advanced facial treatments",
    image: "/placeholder.svg?height=200&width=300&text=Skin+Revival",
    rating: 4.8,
    reviewCount: 112,
    priceRange: "$80-250",
    services: ["Facials", "Chemical Peels", "Microdermabrasion"],
    locations: [
      {
        id: 1,
        name: "Medical Plaza",
        address: "357 Health Way, Medical District",
        phone: "+1 (555) 901-2346",
        distance: "3.0 miles",
      },
    ],
  },
  {
    id: 20,
    name: "Scissors & Combs",
    description: "Family-friendly salon with services for all ages",
    image: "/placeholder.svg?height=200&width=300&text=Scissors+And+Combs",
    rating: 4.5,
    reviewCount: 78,
    priceRange: "$30-80",
    services: ["Family Haircuts", "Kids Cuts", "Styling"],
    locations: [
      {
        id: 1,
        name: "Family Center",
        address: "951 Family Blvd, Residential Area",
        phone: "+1 (555) 012-3457",
        distance: "1.7 miles",
      },
    ],
  },
  {
    id: 21,
    name: "The Hair Loft",
    description: "Upscale salon in a converted industrial space",
    image: "/placeholder.svg?height=200&width=300&text=Hair+Loft",
    rating: 4.7,
    reviewCount: 103,
    priceRange: "$55-170",
    services: ["Precision Cuts", "Color", "Styling"],
    locations: [
      {
        id: 1,
        name: "Industrial District",
        address: "753 Warehouse St, Industrial Area",
        phone: "+1 (555) 123-4571",
        distance: "2.3 miles",
      },
    ],
  },
  {
    id: 22,
    name: "Glow Beauty Spa",
    description: "Full-service spa focusing on natural beauty treatments",
    image: "/placeholder.svg?height=200&width=300&text=Glow+Beauty",
    rating: 4.8,
    reviewCount: 134,
    priceRange: "$60-190",
    services: ["Facials", "Body Treatments", "Waxing"],
    locations: [
      {
        id: 1,
        name: "Natural Beauty Center",
        address: "357 Organic Way, Green District",
        phone: "+1 (555) 234-5681",
        distance: "1.8 miles",
      },
    ],
  },
  {
    id: 23,
    name: "Classic Barber Co.",
    description: "Traditional barbershop with old-school charm",
    image: "/placeholder.svg?height=200&width=300&text=Classic+Barber",
    rating: 4.9,
    reviewCount: 97,
    priceRange: "$30-70",
    services: ["Classic Cuts", "Straight Razor Shaves", "Beard Trims"],
    locations: [
      {
        id: 1,
        name: "Historic District",
        address: "159 Heritage St, Old Town",
        phone: "+1 (555) 345-6791",
        distance: "1.2 miles",
      },
    ],
  },
  {
    id: 24,
    name: "Mane Attraction",
    description: "Hair salon specializing in extensions and weaves",
    image: "/placeholder.svg?height=200&width=300&text=Mane+Attraction",
    rating: 4.6,
    reviewCount: 86,
    priceRange: "$70-250",
    services: ["Extensions", "Weaves", "Braiding"],
    locations: [
      {
        id: 1,
        name: "Style Center",
        address: "753 Fashion Ave, Trendy District",
        phone: "+1 (555) 456-7892",
        distance: "2.1 miles",
      },
    ],
  },
  {
    id: 25,
    name: "Refresh Day Spa",
    description: "Modern spa offering rejuvenating treatments",
    image: "/placeholder.svg?height=200&width=300&text=Refresh+Spa",
    rating: 4.7,
    reviewCount: 124,
    priceRange: "$65-220",
    services: ["Massage", "Facials", "Body Scrubs"],
    locations: [
      {
        id: 1,
        name: "Wellness Plaza",
        address: "357 Rejuvenate Rd, Spa District",
        phone: "+1 (555) 567-8904",
        distance: "2.8 miles",
      },
    ],
  },
  {
    id: 26,
    name: "Shear Perfection",
    description: "Precision haircuts and styling for all hair types",
    image: "/placeholder.svg?height=200&width=300&text=Shear+Perfection",
    rating: 4.5,
    reviewCount: 79,
    priceRange: "$45-120",
    services: ["Precision Cuts", "Styling", "Treatments"],
    locations: [
      {
        id: 1,
        name: "Fashion Center",
        address: "852 Style St, Fashion District",
        phone: "+1 (555) 678-9014",
        distance: "1.5 miles",
      },
    ],
  },
  {
    id: 27,
    name: "Nail Artistry",
    description: "Creative nail salon specializing in nail art and designs",
    image: "/placeholder.svg?height=200&width=300&text=Nail+Artistry",
    rating: 4.8,
    reviewCount: 108,
    priceRange: "$35-100",
    services: ["Nail Art", "Gel Manicure", "Pedicure"],
    locations: [
      {
        id: 1,
        name: "Art District",
        address: "159 Creative Ave, Arts District",
        phone: "+1 (555) 789-0125",
        distance: "2.2 miles",
      },
    ],
  },
  {
    id: 28,
    name: "Harmony Wellness",
    description: "Holistic wellness center with spa and beauty services",
    image: "/placeholder.svg?height=200&width=300&text=Harmony+Wellness",
    rating: 4.9,
    reviewCount: 145,
    priceRange: "$75-230",
    services: ["Massage", "Acupuncture", "Facials"],
    locations: [
      {
        id: 1,
        name: "Holistic Center",
        address: "753 Balance Way, Wellness District",
        phone: "+1 (555) 890-1236",
        distance: "3.1 miles",
      },
    ],
  },
];

// Services data
const servicesData = {
  1: [
    {
      category: "Hair Services",
      items: [
        {
          id: 1,
          name: "Women's Haircut",
          price: 65,
          duration: 60,
          description: "Professional haircut with consultation and styling",
        },
        {
          id: 2,
          name: "Men's Haircut",
          price: 45,
          duration: 45,
          description: "Classic or modern men's haircut",
        },
        {
          id: 3,
          name: "Hair Wash & Blow Dry",
          price: 35,
          duration: 30,
          description: "Shampoo, condition, and professional blow dry",
        },
        {
          id: 4,
          name: "Hair Styling",
          price: 50,
          duration: 45,
          description: "Special occasion styling and finishing",
        },
      ],
    },
    {
      category: "Hair Coloring",
      items: [
        {
          id: 5,
          name: "Full Color",
          price: 120,
          duration: 120,
          description: "Complete hair color transformation",
        },
        {
          id: 6,
          name: "Highlights",
          price: 150,
          duration: 150,
          description: "Partial or full highlights with foils",
        },
        {
          id: 7,
          name: "Root Touch-up",
          price: 80,
          duration: 90,
          description: "Color refresh for grown-out roots",
        },
        {
          id: 8,
          name: "Balayage",
          price: 180,
          duration: 180,
          description: "Hand-painted highlights for natural look",
        },
      ],
    },
    {
      category: "Treatments",
      items: [
        {
          id: 9,
          name: "Deep Conditioning",
          price: 40,
          duration: 30,
          description: "Intensive moisture treatment",
        },
        {
          id: 10,
          name: "Keratin Treatment",
          price: 200,
          duration: 180,
          description: "Smoothing treatment for frizz control",
        },
        {
          id: 11,
          name: "Hair Mask",
          price: 35,
          duration: 25,
          description: "Nourishing hair mask treatment",
        },
      ],
    },
  ],
  2: [
    {
      category: "Hair Services",
      items: [
        {
          id: 1,
          name: "Women's Haircut",
          price: 60,
          duration: 60,
          description: "Professional haircut with consultation and styling",
        },
        {
          id: 2,
          name: "Men's Haircut",
          price: 40,
          duration: 45,
          description: "Classic or modern men's haircut",
        },
        {
          id: 3,
          name: "Hair Wash & Blow Dry",
          price: 30,
          duration: 30,
          description: "Shampoo, condition, and professional blow dry",
        },
      ],
    },
    {
      category: "Hair Coloring",
      items: [
        {
          id: 4,
          name: "Full Color",
          price: 110,
          duration: 120,
          description: "Complete hair color transformation",
        },
        {
          id: 5,
          name: "Highlights",
          price: 140,
          duration: 150,
          description: "Partial or full highlights with foils",
        },
      ],
    },
  ],
  3: [
    {
      category: "Nail Services",
      items: [
        {
          id: 1,
          name: "Classic Manicure",
          price: 25,
          duration: 45,
          description: "Traditional manicure with polish",
        },
        {
          id: 2,
          name: "Gel Manicure",
          price: 35,
          duration: 60,
          description: "Long-lasting gel polish manicure",
        },
        {
          id: 3,
          name: "Classic Pedicure",
          price: 30,
          duration: 60,
          description: "Relaxing pedicure with polish",
        },
        {
          id: 4,
          name: "Gel Pedicure",
          price: 40,
          duration: 75,
          description: "Long-lasting gel polish pedicure",
        },
      ],
    },
    {
      category: "Nail Art",
      items: [
        {
          id: 5,
          name: "Nail Art Design",
          price: 15,
          duration: 30,
          description: "Custom nail art per nail",
        },
        {
          id: 6,
          name: "French Tips",
          price: 10,
          duration: 15,
          description: "Classic French tip design",
        },
      ],
    },
  ],
  4: [
    {
      category: "Hair Services",
      items: [
        {
          id: 1,
          name: "Women's Haircut",
          price: 70,
          duration: 60,
          description: "Professional haircut with consultation and styling",
        },
        {
          id: 2,
          name: "Men's Haircut",
          price: 50,
          duration: 45,
          description: "Classic or modern men's haircut",
        },
      ],
    },
    {
      category: "Specialty Services",
      items: [
        {
          id: 3,
          name: "Hair Extensions",
          price: 250,
          duration: 180,
          description: "Professional hair extension application",
        },
        {
          id: 4,
          name: "Balayage",
          price: 200,
          duration: 180,
          description: "Hand-painted highlights for natural look",
        },
      ],
    },
  ],
  5: [
    {
      category: "Spa Services",
      items: [
        {
          id: 1,
          name: "Facial Treatment",
          price: 80,
          duration: 60,
          description: "Deep cleansing facial treatment",
        },
        {
          id: 2,
          name: "Relaxing Massage",
          price: 90,
          duration: 60,
          description: "Full body relaxation massage",
        },
      ],
    },
    {
      category: "Hair Services",
      items: [
        {
          id: 3,
          name: "Women's Haircut",
          price: 75,
          duration: 60,
          description: "Professional haircut with consultation and styling",
        },
        {
          id: 4,
          name: "Hair Styling",
          price: 55,
          duration: 45,
          description: "Special occasion styling and finishing",
        },
      ],
    },
  ],
  6: [
    {
      category: "Hair Services",
      items: [
        {
          id: 1,
          name: "Women's Haircut",
          price: 55,
          duration: 60,
          description: "Professional haircut with consultation and styling",
        },
        {
          id: 2,
          name: "Men's Haircut",
          price: 35,
          duration: 45,
          description: "Classic or modern men's haircut",
        },
        {
          id: 3,
          name: "Blowout",
          price: 40,
          duration: 30,
          description: "Professional blowout styling",
        },
      ],
    },
  ],
};

// Time slots
const timeSlots = [
  "9:00 AM",
  "9:30 AM",
  "10:00 AM",
  "10:30 AM",
  "11:00 AM",
  "11:30 AM",
  "12:00 PM",
  "12:30 PM",
  "1:00 PM",
  "1:30 PM",
  "2:00 PM",
  "2:30 PM",
  "3:00 PM",
  "3:30 PM",
  "4:00 PM",
  "4:30 PM",
  "5:00 PM",
  "5:30 PM",
  "6:00 PM",
  "6:30 PM",
];

interface SelectedService {
  id: number;
  name: string;
  price: number;
  duration: number;
}

export default function BookAppointmentPage() {
  const [currentStep, setCurrentStep] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedSalon, setSelectedSalon] = useState<(typeof salons)[0] | null>(
    null
  );
  const [selectedLocation, setSelectedLocation] = useState<
    (typeof salons)[0]["locations"][0] | null
  >(null);
  const [selectedServices, setSelectedServices] = useState<SelectedService[]>(
    []
  );
  const [selectedDate, setSelectedDate] = useState<Date>();
  const [selectedTime, setSelectedTime] = useState<string>("");
  const [expandedCategories, setExpandedCategories] = useState<string[]>([]);

  const itemsPerPage = 10; // Updated to 10 salons per page

  // Filter and paginate salons
  const filteredSalons = salons.filter(
    (salon) =>
      salon.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      salon.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      salon.services.some((service) =>
        service.toLowerCase().includes(searchQuery.toLowerCase())
      )
  );

  const totalPages = Math.ceil(filteredSalons.length / itemsPerPage);
  const paginatedSalons = filteredSalons.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Function to generate pagination items
  const generatePaginationItems = () => {
    const maxVisiblePages = 5; // Maximum number of page buttons to show
    const items = [];

    // Always show first page
    items.push(
      <Button
        key={1}
        variant={currentPage === 1 ? "default" : "outline"}
        size="sm"
        onClick={() => setCurrentPage(1)}
        className={currentPage === 1 ? "bg-purple-600 hover:bg-purple-700" : ""}
      >
        1
      </Button>
    );

    // Calculate start and end page numbers
    let startPage = Math.max(2, currentPage - Math.floor(maxVisiblePages / 2));
    const endPage = Math.min(totalPages - 1, startPage + maxVisiblePages - 3);

    if (endPage - startPage < maxVisiblePages - 3) {
      startPage = Math.max(2, endPage - (maxVisiblePages - 3) + 1);
    }

    // Add ellipsis after first page if needed
    if (startPage > 2) {
      items.push(
        <Button
          key="start-ellipsis"
          variant="outline"
          size="sm"
          disabled
          className="cursor-default bg-transparent"
        >
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      );
    }

    // Add page numbers between first and last
    for (let i = startPage; i <= endPage; i++) {
      items.push(
        <Button
          key={i}
          variant={currentPage === i ? "default" : "outline"}
          size="sm"
          onClick={() => setCurrentPage(i)}
          className={
            currentPage === i ? "bg-purple-600 hover:bg-purple-700" : ""
          }
        >
          {i}
        </Button>
      );
    }

    // Add ellipsis before last page if needed
    if (endPage < totalPages - 1) {
      items.push(
        <Button
          key="end-ellipsis"
          variant="outline"
          size="sm"
          disabled
          className="cursor-default bg-transparent"
        >
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      );
    }

    // Always show last page if there is more than one page
    if (totalPages > 1) {
      items.push(
        <Button
          key={totalPages}
          variant={currentPage === totalPages ? "default" : "outline"}
          size="sm"
          onClick={() => setCurrentPage(totalPages)}
          className={
            currentPage === totalPages
              ? "bg-purple-600 hover:bg-purple-700"
              : ""
          }
        >
          {totalPages}
        </Button>
      );
    }

    return items;
  };

  const toggleCategory = (category: string) => {
    setExpandedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category]
    );
  };

  const toggleService = (service: any) => {
    setSelectedServices((prev) => {
      const exists = prev.find((s) => s.id === service.id);
      if (exists) {
        return prev.filter((s) => s.id !== service.id);
      } else {
        return [
          ...prev,
          {
            id: service.id,
            name: service.name,
            price: service.price,
            duration: service.duration,
          },
        ];
      }
    });
  };

  const isServiceSelected = (serviceId: number) => {
    return selectedServices.some((s) => s.id === serviceId);
  };

  const getTotalPrice = () => {
    return selectedServices.reduce(
      (total, service) => total + service.price,
      0
    );
  };

  const getTotalDuration = () => {
    return selectedServices.reduce(
      (total, service) => total + service.duration,
      0
    );
  };

  const isDateDisabled = (date: Date) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return date < today;
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const handleBooking = () => {
    console.log("Booking data:", {
      salon: selectedSalon,
      location: selectedLocation,
      services: selectedServices,
      date: selectedDate,
      time: selectedTime,
      total: getTotalPrice(),
    });
    setCurrentStep(5); // Show confirmation
  };

  const canProceedToStep2 = selectedSalon !== null;
  const canProceedToStep3 = selectedLocation !== null;
  const canProceedToStep4 =
    selectedServices.length > 0 && selectedDate && selectedTime;

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Book Your Appointment
          </h1>
          <p className="text-gray-600">
            Follow the steps below to schedule your perfect salon experience
          </p>
        </div>

        {/* Progress Steps */}
        <div className="mb-8">
          <div className="flex items-center justify-center space-x-4">
            {[1, 2, 3, 4].map((step) => (
              <div key={step} className="flex items-center">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium ${
                    currentStep >= step
                      ? "bg-purple-600 text-white"
                      : "bg-gray-200 text-gray-600"
                  }`}
                >
                  {currentStep > step ? (
                    <CheckCircle className="h-5 w-5" />
                  ) : (
                    step
                  )}
                </div>
                {step < 4 && (
                  <div
                    className={`w-20 h-1 mx-2 ${
                      currentStep > step ? "bg-purple-600" : "bg-gray-200"
                    }`}
                  />
                )}
              </div>
            ))}
          </div>
          <div className="flex justify-center mt-4">
            <div className="text-sm text-gray-600 font-medium">
              {currentStep === 1 && "Choose Salon"}
              {currentStep === 2 && "Select Location"}
              {currentStep === 3 && "Services & Date/Time"}
              {currentStep === 4 && "Payment & Confirmation"}
              {currentStep === 5 && "Booking Complete"}
            </div>
          </div>
        </div>

        {/* Step 1: Choose Salon */}
        {currentStep === 1 && (
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Building className="h-5 w-5 mr-2" />
                  Choose Your Salon
                </CardTitle>
                <CardDescription>
                  Browse and select from our featured salons
                </CardDescription>
              </CardHeader>
              <CardContent>
                {/* Search */}
                <div className="relative mb-6">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input
                    placeholder="Search salons, services, or locations..."
                    value={searchQuery}
                    onChange={(e) => {
                      setSearchQuery(e.target.value);
                      setCurrentPage(1);
                    }}
                    className="pl-10"
                  />
                </div>

                {/* Salon Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
                  {paginatedSalons.map((salon) => (
                    <Card
                      key={salon.id}
                      className={`cursor-pointer transition-all hover:shadow-lg ${
                        selectedSalon?.id === salon.id
                          ? "ring-2 ring-purple-600 bg-purple-50"
                          : ""
                      }`}
                      onClick={() => setSelectedSalon(salon)}
                    >
                      <div className="relative">
                        <img
                          src={salon.image || "/placeholder.svg"}
                          alt={salon.name}
                          className="w-full h-48 object-cover rounded-t-lg"
                        />
                        {selectedSalon?.id === salon.id && (
                          <div className="absolute top-2 right-2">
                            <CheckCircle className="h-6 w-6 text-purple-600 bg-white rounded-full" />
                          </div>
                        )}
                      </div>
                      <CardContent className="p-4">
                        <div className="flex justify-between items-start mb-2">
                          <h3 className="font-semibold text-lg">
                            {salon.name}
                          </h3>
                          <div className="flex items-center">
                            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                            <span className="ml-1 text-sm font-medium">
                              {salon.rating}
                            </span>
                            <span className="ml-1 text-sm text-gray-500">
                              ({salon.reviewCount})
                            </span>
                          </div>
                        </div>
                        <p className="text-gray-600 text-sm mb-3">
                          {salon.description}
                        </p>
                        <div className="flex items-center justify-between mb-2">
                          <Badge variant="outline">{salon.priceRange}</Badge>
                          <span className="text-sm text-gray-500">
                            {salon.locations.length} location
                            {salon.locations.length > 1 ? "s" : ""}
                          </span>
                        </div>
                        <div className="flex flex-wrap gap-1">
                          {salon.services.slice(0, 3).map((service, index) => (
                            <Badge
                              key={index}
                              variant="secondary"
                              className="text-xs"
                            >
                              {service}
                            </Badge>
                          ))}
                          {salon.services.length > 3 && (
                            <Badge variant="secondary" className="text-xs">
                              +{salon.services.length - 3} more
                            </Badge>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>

                {/* Pagination */}
                {totalPages > 1 && (
                  <div className="flex justify-center items-center space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() =>
                        setCurrentPage(Math.max(1, currentPage - 1))
                      }
                      disabled={currentPage === 1}
                    >
                      <ChevronLeft className="h-4 w-4" />
                    </Button>

                    {/* Improved pagination with ellipses */}
                    {generatePaginationItems()}

                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() =>
                        setCurrentPage(Math.min(totalPages, currentPage + 1))
                      }
                      disabled={currentPage === totalPages}
                    >
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                  </div>
                )}

                {/* Continue Button */}
                {canProceedToStep2 && (
                  <div className="flex justify-end mt-6">
                    <Button
                      onClick={() => setCurrentStep(2)}
                      className="bg-purple-600 hover:bg-purple-700"
                    >
                      Continue to Location Selection
                      <ChevronRight className="h-4 w-4 ml-2" />
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        )}

        {/* Step 2: Select Location */}
        {currentStep === 2 && selectedSalon && (
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <MapPin className="h-5 w-5 mr-2" />
                  Select Location
                </CardTitle>
                <CardDescription>
                  Choose a location for {selectedSalon.name}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {selectedSalon.locations.map((location) => (
                    <Card
                      key={location.id}
                      className={`cursor-pointer transition-all hover:shadow-md ${
                        selectedLocation?.id === location.id
                          ? "ring-2 ring-purple-600 bg-purple-50"
                          : ""
                      }`}
                      onClick={() => setSelectedLocation(location)}
                    >
                      <CardContent className="p-4">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <h3 className="font-semibold text-lg mb-2">
                              {location.name}
                            </h3>
                            <div className="space-y-1 text-sm text-gray-600">
                              <div className="flex items-center">
                                <MapPin className="h-4 w-4 mr-2" />
                                <span>{location.address}</span>
                              </div>
                              <div className="flex items-center">
                                <Phone className="h-4 w-4 mr-2" />
                                <span>{location.phone}</span>
                              </div>
                              <div className="flex items-center">
                                <Clock className="h-4 w-4 mr-2" />
                                <span>{location.distance} away</span>
                              </div>
                            </div>
                          </div>
                          {selectedLocation?.id === location.id && (
                            <CheckCircle className="h-6 w-6 text-purple-600" />
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>

                {/* Navigation */}
                <div className="flex justify-between mt-6">
                  <Button variant="outline" onClick={() => setCurrentStep(1)}>
                    <ChevronLeft className="h-4 w-4 mr-2" />
                    Back to Salon Selection
                  </Button>
                  {canProceedToStep3 && (
                    <Button
                      onClick={() => setCurrentStep(3)}
                      className="bg-purple-600 hover:bg-purple-700"
                    >
                      Continue to Services & Date/Time
                      <ChevronRight className="h-4 w-4 ml-2" />
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Step 3: Services & Date/Time */}
        {currentStep === 3 && selectedSalon && selectedLocation && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Services Selection */}
            <div className="lg:col-span-2 space-y-6">
              {/* Services */}
              <Card>
                <CardHeader>
                  <CardTitle>Select Services</CardTitle>
                  <CardDescription>
                    Choose the services you'd like to book
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {servicesData[
                      selectedSalon.id as keyof typeof servicesData
                    ]?.map((category) => (
                      <Card key={category.category}>
                        <CardHeader
                          className="cursor-pointer"
                          onClick={() => toggleCategory(category.category)}
                        >
                          <div className="flex items-center justify-between">
                            <CardTitle className="text-lg">
                              {category.category}
                            </CardTitle>
                            <ChevronRight
                              className={`h-5 w-5 transition-transform ${
                                expandedCategories.includes(category.category)
                                  ? "rotate-90"
                                  : ""
                              }`}
                            />
                          </div>
                        </CardHeader>

                        {expandedCategories.includes(category.category) && (
                          <CardContent className="pt-0">
                            <div className="space-y-3">
                              {category.items.map((service) => (
                                <div
                                  key={service.id}
                                  className="border rounded-lg p-4"
                                >
                                  <div className="flex items-start justify-between">
                                    <div className="flex-1">
                                      <h4 className="font-medium">
                                        {service.name}
                                      </h4>
                                      <p className="text-sm text-gray-600 mt-1">
                                        {service.description}
                                      </p>
                                      <div className="flex items-center space-x-4 mt-2 text-sm text-gray-500">
                                        <div className="flex items-center space-x-1">
                                          <Clock className="h-3 w-3" />
                                          <span>{service.duration} min</span>
                                        </div>
                                        <span className="font-medium text-green-600">
                                          ${service.price}
                                        </span>
                                      </div>
                                    </div>
                                    <Button
                                      variant={
                                        isServiceSelected(service.id)
                                          ? "default"
                                          : "outline"
                                      }
                                      size="sm"
                                      onClick={() => toggleService(service)}
                                      className={
                                        isServiceSelected(service.id)
                                          ? "bg-purple-600 hover:bg-purple-700"
                                          : ""
                                      }
                                    >
                                      {isServiceSelected(service.id)
                                        ? "Selected"
                                        : "Select"}
                                    </Button>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </CardContent>
                        )}
                      </Card>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Date & Time Selection */}
              {selectedServices.length > 0 && (
                <div className="space-y-6">
                  {/* Date Selection */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center">
                        <CalendarIcon className="h-5 w-5 mr-2" />
                        Select Date
                      </CardTitle>
                      <CardDescription>
                        Choose your preferred appointment date
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex justify-center">
                        <Calendar
                          mode="single"
                          selected={selectedDate}
                          onSelect={setSelectedDate}
                          disabled={isDateDisabled}
                          className="rounded-md border"
                        />
                      </div>
                    </CardContent>
                  </Card>

                  {/* Time Selection */}
                  {selectedDate && (
                    <Card>
                      <CardHeader>
                        <CardTitle className="flex items-center">
                          <Clock className="h-5 w-5 mr-2" />
                          Select Time
                        </CardTitle>
                        <CardDescription>
                          Choose your preferred appointment time
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-3">
                          {timeSlots.map((time) => (
                            <Button
                              key={time}
                              variant={
                                selectedTime === time ? "default" : "outline"
                              }
                              className={`${
                                selectedTime === time
                                  ? "bg-purple-600 hover:bg-purple-700"
                                  : "bg-white hover:bg-gray-50"
                              }`}
                              onClick={() => setSelectedTime(time)}
                            >
                              {time}
                            </Button>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  )}
                </div>
              )}

              {/* Navigation */}
              <div className="flex justify-between">
                <Button variant="outline" onClick={() => setCurrentStep(2)}>
                  <ChevronLeft className="h-4 w-4 mr-2" />
                  Back to Location
                </Button>
                {canProceedToStep4 && (
                  <Button
                    onClick={() => setCurrentStep(4)}
                    className="bg-purple-600 hover:bg-purple-700"
                  >
                    Continue to Payment
                    <ChevronRight className="h-4 w-4 ml-2" />
                  </Button>
                )}
              </div>
            </div>

            {/* Sidebar - Booking Summary */}
            <div className="space-y-6">
              {/* Selected Salon & Location */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">
                    {selectedSalon.name}
                  </CardTitle>
                  <CardDescription>{selectedLocation.name}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center">
                      <MapPin className="h-4 w-4 mr-2 text-gray-400" />
                      <span>{selectedLocation.address}</span>
                    </div>
                    <div className="flex items-center">
                      <Phone className="h-4 w-4 mr-2 text-gray-400" />
                      <span>{selectedLocation.phone}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Selected Services */}
              <Card>
                <CardHeader>
                  <CardTitle>Selected Services</CardTitle>
                  <CardDescription>
                    {selectedServices.length === 0
                      ? "No services selected"
                      : `${selectedServices.length} service(s) selected`}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {selectedServices.length === 0 ? (
                    <p className="text-gray-500 text-center py-4">
                      Select services to continue
                    </p>
                  ) : (
                    <div className="space-y-3">
                      {selectedServices.map((service) => (
                        <div
                          key={service.id}
                          className="flex justify-between text-sm"
                        >
                          <span>{service.name}</span>
                          <span>${service.price}</span>
                        </div>
                      ))}

                      <Separator />

                      {/* Appointment Details */}
                      {selectedDate && selectedTime && (
                        <div>
                          <h4 className="font-medium mb-2">Appointment</h4>
                          <div className="space-y-1 text-sm text-gray-600">
                            <div className="flex items-center">
                              <CalendarIcon className="h-3 w-3 mr-2" />
                              <span>{formatDate(selectedDate)}</span>
                            </div>
                            <div className="flex items-center">
                              <Clock className="h-3 w-3 mr-2" />
                              <span>
                                {selectedTime} ({getTotalDuration()} min)
                              </span>
                            </div>
                          </div>
                        </div>
                      )}

                      <Separator />

                      {/* Total */}
                      <div className="flex justify-between font-semibold text-lg">
                        <span>Total</span>
                        <span>${getTotalPrice()}</span>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        )}

        {/* Step 4: Payment & Confirmation */}
        {currentStep === 4 && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <User className="h-5 w-5 mr-2" />
                    Appointment Information
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between pt-4">
                    <Button variant="outline" onClick={() => setCurrentStep(3)}>
                      <ChevronLeft className="h-4 w-4 mr-2" />
                      Back
                    </Button>
                    <Button
                      onClick={handleBooking}
                      className="bg-purple-600 hover:bg-purple-700"
                      // disabled={!canCompleteBooking}
                    >
                      <CreditCard className="h-4 w-4 mr-2" />
                      Confirm Booking - ${getTotalPrice()}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Booking Summary */}
            <div>
              <Card>
                <CardHeader>
                  <CardTitle>Booking Summary</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {/* Salon & Location */}
                    <div>
                      <h4 className="font-medium mb-2">Location</h4>
                      <div className="text-sm text-gray-600">
                        <div className="font-medium">{selectedSalon?.name}</div>
                        <div>{selectedLocation?.name}</div>
                        <div>{selectedLocation?.address}</div>
                      </div>
                    </div>

                    <Separator />

                    {/* Services */}
                    <div>
                      <h4 className="font-medium mb-2">Services</h4>
                      <div className="space-y-1">
                        {selectedServices.map((service) => (
                          <div
                            key={service.id}
                            className="flex justify-between text-sm"
                          >
                            <span>{service.name}</span>
                            <span>${service.price}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <Separator />

                    {/* Date & Time */}
                    <div>
                      <h4 className="font-medium mb-2">Appointment</h4>
                      <div className="text-sm text-gray-600">
                        <div>{selectedDate && formatDate(selectedDate)}</div>
                        <div>
                          {selectedTime} ({getTotalDuration()} minutes)
                        </div>
                      </div>
                    </div>

                    <Separator />

                    {/* Total */}
                    <div className="flex justify-between font-semibold text-lg">
                      <span>Total</span>
                      <span>${getTotalPrice()}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        )}

        {/* Step 5: Confirmation */}
        {currentStep === 5 && (
          <Card>
            <CardContent className="p-8 text-center">
              <CheckCircle className="h-16 w-16 text-green-600 mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                Booking Confirmed!
              </h2>
              <p className="text-gray-600 mb-6">
                Your appointment has been successfully booked. You'll receive a
                confirmation email shortly.
              </p>

              <div className="bg-gray-50 rounded-lg p-6 mb-6 text-left max-w-md mx-auto">
                <h3 className="font-semibold mb-4">Appointment Details</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Salon:</span>
                    <span>{selectedSalon?.name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Location:</span>
                    <span>{selectedLocation?.name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Date:</span>
                    <span>{selectedDate && formatDate(selectedDate)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Time:</span>
                    <span>{selectedTime}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Duration:</span>
                    <span>{getTotalDuration()} minutes</span>
                  </div>
                  <div className="flex justify-between font-semibold">
                    <span>Total:</span>
                    <span>${getTotalPrice()}</span>
                  </div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button variant="outline">View My Appointments</Button>
                <Button
                  onClick={() => {
                    setCurrentStep(1);
                    setSelectedSalon(null);
                    setSelectedLocation(null);
                    setSelectedServices([]);
                    setSelectedDate(undefined);
                    setSelectedTime("");
                    setCustomerInfo({
                      firstName: "",
                      lastName: "",
                      email: "",
                      phone: "",
                      notes: "",
                    });
                  }}
                >
                  Book Another Appointment
                </Button>
              </div>
            </CardContent>
          </Card>
        )}
      </div>

      <Footer />
    </div>
  );
}
