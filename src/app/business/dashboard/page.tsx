"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Calendar,
  DollarSign,
  Users,
  MapPin,
  Clock,
  TrendingUp,
  MoreHorizontal,
  Phone,
  Mail,
  Star,
  Download,
  Eye,
  Edit,
  CheckCircle,
  XCircle,
  AlertCircle,
  Building2,
  BarChart3,
} from "lucide-react";

// Mock data for business owner
const businessData = {
  owner: {
    name: "Sarah Johnson",
    email: "sarah@luxesalon.com",
    phone: "+1 (555) 123-4567",
    businessName: "Luxe Beauty Salon",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  stats: {
    totalRevenue: 45680,
    monthlyRevenue: 12340,
    totalAppointments: 1247,
    monthlyAppointments: 156,
    totalCustomers: 892,
    activeLocations: 3,
    averageRating: 4.8,
    completionRate: 94,
  },
  locations: [
    {
      id: 1,
      name: "Downtown Branch",
      address: "123 Main St",
      appointments: 45,
      revenue: 5680,
    },
    {
      id: 2,
      name: "Mall Location",
      address: "456 Shopping Center",
      appointments: 38,
      revenue: 4320,
    },
    {
      id: 3,
      name: "Uptown Studio",
      address: "789 Elite Ave",
      appointments: 32,
      revenue: 3890,
    },
  ],
  recentAppointments: [
    {
      id: 1,
      customerName: "Emma Wilson",
      customerAvatar: "/placeholder.svg?height=32&width=32",
      services: ["Haircut & Style", "Hair Color"],
      date: "2024-01-15",
      time: "10:00 AM",
      duration: "2h 30m",
      total: 180,
      status: "confirmed",
      location: "Downtown Branch",
      stylist: "Maria Garcia",
      phone: "+1 (555) 987-6543",
      email: "emma.wilson@email.com",
    },
    {
      id: 2,
      customerName: "Jessica Brown",
      customerAvatar: "/placeholder.svg?height=32&width=32",
      services: ["Manicure", "Pedicure"],
      date: "2024-01-15",
      time: "2:00 PM",
      duration: "1h 30m",
      total: 85,
      status: "in-progress",
      location: "Mall Location",
      stylist: "Lisa Chen",
      phone: "+1 (555) 456-7890",
      email: "jessica.brown@email.com",
    },
    {
      id: 3,
      customerName: "Amanda Davis",
      customerAvatar: "/placeholder.svg?height=32&width=32",
      services: ["Facial Treatment", "Eyebrow Shaping"],
      date: "2024-01-15",
      time: "4:00 PM",
      duration: "1h 45m",
      total: 120,
      status: "pending",
      location: "Uptown Studio",
      stylist: "Sophie Martinez",
      phone: "+1 (555) 321-0987",
      email: "amanda.davis@email.com",
    },
  ],
  upcomingAppointments: [
    {
      id: 4,
      customerName: "Rachel Green",
      customerAvatar: "/placeholder.svg?height=32&width=32",
      services: ["Wedding Hair & Makeup"],
      date: "2024-01-16",
      time: "9:00 AM",
      duration: "3h 00m",
      total: 350,
      status: "confirmed",
      location: "Downtown Branch",
      stylist: "Maria Garcia",
      phone: "+1 (555) 111-2222",
      email: "rachel.green@email.com",
    },
    {
      id: 5,
      customerName: "Monica Geller",
      customerAvatar: "/placeholder.svg?height=32&width=32",
      services: ["Deep Conditioning", "Blowout"],
      date: "2024-01-16",
      time: "11:00 AM",
      duration: "2h 00m",
      total: 140,
      status: "confirmed",
      location: "Mall Location",
      stylist: "Lisa Chen",
      phone: "+1 (555) 333-4444",
      email: "monica.geller@email.com",
    },
  ],
  completedAppointments: [
    {
      id: 6,
      customerName: "Phoebe Buffay",
      customerAvatar: "/placeholder.svg?height=32&width=32",
      services: ["Haircut", "Highlights"],
      date: "2024-01-14",
      time: "3:00 PM",
      duration: "2h 15m",
      total: 195,
      status: "completed",
      location: "Uptown Studio",
      stylist: "Sophie Martinez",
      rating: 5,
      review: "Amazing service! Sophie did exactly what I wanted.",
      phone: "+1 (555) 555-6666",
      email: "phoebe.buffay@email.com",
    },
    {
      id: 7,
      customerName: "Chandler Bing",
      customerAvatar: "/placeholder.svg?height=32&width=32",
      services: ["Men's Haircut", "Beard Trim"],
      date: "2024-01-14",
      time: "1:00 PM",
      duration: "45m",
      total: 65,
      status: "completed",
      location: "Downtown Branch",
      stylist: "Maria Garcia",
      rating: 4,
      review: "Great cut, very professional.",
      phone: "+1 (555) 777-8888",
      email: "chandler.bing@email.com",
    },
  ],
};

const getStatusColor = (status: string) => {
  switch (status) {
    case "confirmed":
      return "bg-green-100 text-green-800";
    case "pending":
      return "bg-yellow-100 text-yellow-800";
    case "in-progress":
      return "bg-blue-100 text-blue-800";
    case "completed":
      return "bg-gray-100 text-gray-800";
    case "cancelled":
      return "bg-red-100 text-red-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
};

const getStatusIcon = (status: string) => {
  switch (status) {
    case "confirmed":
      return <CheckCircle className="h-4 w-4" />;
    case "pending":
      return <AlertCircle className="h-4 w-4" />;
    case "in-progress":
      return <Clock className="h-4 w-4" />;
    case "completed":
      return <CheckCircle className="h-4 w-4" />;
    case "cancelled":
      return <XCircle className="h-4 w-4" />;
    default:
      return <Clock className="h-4 w-4" />;
  }
};

export default function BusinessDashboard() {
  const [selectedLocation, setSelectedLocation] = useState("all");
  const [selectedStatus, setSelectedStatus] = useState("all");

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <Building2 className="h-8 w-8 text-purple-600" />
              <div>
                <h1 className="text-xl font-bold text-gray-900">
                  {businessData.owner.businessName}
                </h1>
                <p className="text-sm text-gray-500">Business Dashboard</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Button variant="outline" size="sm">
                <Download className="h-4 w-4 mr-2" />
                Export Data
              </Button>
              <Avatar>
                <AvatarImage
                  src={businessData.owner.avatar || "/placeholder.svg"}
                />
                <AvatarFallback>
                  {businessData.owner.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="appointments">Appointments</TabsTrigger>
            <TabsTrigger value="revenue">Revenue</TabsTrigger>
            <TabsTrigger value="locations">Locations</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Total Revenue
                  </CardTitle>
                  <DollarSign className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    ${businessData.stats.totalRevenue.toLocaleString()}
                  </div>
                  <p className="text-xs text-muted-foreground">
                    <TrendingUp className="h-3 w-3 inline mr-1" />
                    +12.5% from last month
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Total Appointments
                  </CardTitle>
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {businessData.stats.totalAppointments}
                  </div>
                  <p className="text-xs text-muted-foreground">
                    <TrendingUp className="h-3 w-3 inline mr-1" />
                    +8.2% from last month
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Total Customers
                  </CardTitle>
                  <Users className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {businessData.stats.totalCustomers}
                  </div>
                  <p className="text-xs text-muted-foreground">
                    <TrendingUp className="h-3 w-3 inline mr-1" />
                    +15.3% from last month
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Average Rating
                  </CardTitle>
                  <Star className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {businessData.stats.averageRating}
                  </div>
                  <p className="text-xs text-muted-foreground">
                    <TrendingUp className="h-3 w-3 inline mr-1" />
                    +0.2 from last month
                  </p>
                </CardContent>
              </Card>
            </div>

            {/* Today's Appointments */}
            <Card>
              <CardHeader>
                <CardTitle>Today's Appointments</CardTitle>
                <CardDescription>
                  Recent and upcoming appointments for today
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {businessData.recentAppointments.map((appointment) => (
                    <div
                      key={appointment.id}
                      className="flex items-center justify-between p-4 border rounded-lg"
                    >
                      <div className="flex items-center space-x-4">
                        <Avatar>
                          <AvatarImage
                            src={
                              appointment.customerAvatar || "/placeholder.svg"
                            }
                          />
                          <AvatarFallback>
                            {appointment.customerName
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium">
                            {appointment.customerName}
                          </p>
                          <p className="text-sm text-gray-500">
                            {appointment.services.join(", ")}
                          </p>
                          <p className="text-sm text-gray-500">
                            {appointment.location} • {appointment.stylist}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-medium">{appointment.time}</p>
                        <p className="text-sm text-gray-500">
                          {appointment.duration}
                        </p>
                        <Badge className={getStatusColor(appointment.status)}>
                          {getStatusIcon(appointment.status)}
                          <span className="ml-1 capitalize">
                            {appointment.status}
                          </span>
                        </Badge>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-lg">
                          ${appointment.total}
                        </p>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem>
                              <Eye className="h-4 w-4 mr-2" />
                              View Details
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Phone className="h-4 w-4 mr-2" />
                              Call Customer
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Edit className="h-4 w-4 mr-2" />
                              Edit Appointment
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Appointments Tab */}
          <TabsContent value="appointments" className="space-y-6">
            {/* Filters */}
            <Card>
              <CardHeader>
                <CardTitle>Appointment Management</CardTitle>
                <CardDescription>
                  Manage all appointments across your locations
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col sm:flex-row gap-4 mb-6">
                  <Input placeholder="Search customers..." className="flex-1" />
                  <Select
                    value={selectedLocation}
                    onValueChange={setSelectedLocation}
                  >
                    <SelectTrigger className="w-48">
                      <SelectValue placeholder="All Locations" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Locations</SelectItem>
                      {businessData.locations.map((location) => (
                        <SelectItem
                          key={location.id}
                          value={location.id.toString()}
                        >
                          {location.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <Select
                    value={selectedStatus}
                    onValueChange={setSelectedStatus}
                  >
                    <SelectTrigger className="w-48">
                      <SelectValue placeholder="All Status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Status</SelectItem>
                      <SelectItem value="confirmed">Confirmed</SelectItem>
                      <SelectItem value="pending">Pending</SelectItem>
                      <SelectItem value="in-progress">In Progress</SelectItem>
                      <SelectItem value="completed">Completed</SelectItem>
                      <SelectItem value="cancelled">Cancelled</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Upcoming Appointments */}
                <div className="space-y-4 mb-8">
                  <h3 className="text-lg font-semibold">
                    Upcoming Appointments
                  </h3>
                  {businessData.upcomingAppointments.map((appointment) => (
                    <div
                      key={appointment.id}
                      className="flex items-center justify-between p-4 border rounded-lg bg-blue-50"
                    >
                      <div className="flex items-center space-x-4">
                        <Avatar>
                          <AvatarImage
                            src={
                              appointment.customerAvatar || "/placeholder.svg"
                            }
                          />
                          <AvatarFallback>
                            {appointment.customerName
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium">
                            {appointment.customerName}
                          </p>
                          <p className="text-sm text-gray-600">
                            {appointment.services.join(", ")}
                          </p>
                          <p className="text-sm text-gray-500">
                            <MapPin className="h-3 w-3 inline mr-1" />
                            {appointment.location} • {appointment.stylist}
                          </p>
                          <p className="text-sm text-gray-500">
                            <Phone className="h-3 w-3 inline mr-1" />
                            {appointment.phone}
                          </p>
                        </div>
                      </div>
                      <div className="text-center">
                        <p className="font-medium">{appointment.date}</p>
                        <p className="text-sm text-gray-500">
                          {appointment.time}
                        </p>
                        <p className="text-sm text-gray-500">
                          {appointment.duration}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-lg">
                          ${appointment.total}
                        </p>
                        <Badge className={getStatusColor(appointment.status)}>
                          {getStatusIcon(appointment.status)}
                          <span className="ml-1 capitalize">
                            {appointment.status}
                          </span>
                        </Badge>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm" className="mt-2">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem>
                              <Eye className="h-4 w-4 mr-2" />
                              View Details
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Phone className="h-4 w-4 mr-2" />
                              Call Customer
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Mail className="h-4 w-4 mr-2" />
                              Send Email
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Edit className="h-4 w-4 mr-2" />
                              Reschedule
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Completed Appointments */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">
                    Recent Completed Appointments
                  </h3>
                  {businessData.completedAppointments.map((appointment) => (
                    <div
                      key={appointment.id}
                      className="flex items-center justify-between p-4 border rounded-lg"
                    >
                      <div className="flex items-center space-x-4">
                        <Avatar>
                          <AvatarImage
                            src={
                              appointment.customerAvatar || "/placeholder.svg"
                            }
                          />
                          <AvatarFallback>
                            {appointment.customerName
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium">
                            {appointment.customerName}
                          </p>
                          <p className="text-sm text-gray-600">
                            {appointment.services.join(", ")}
                          </p>
                          <p className="text-sm text-gray-500">
                            <MapPin className="h-3 w-3 inline mr-1" />
                            {appointment.location} • {appointment.stylist}
                          </p>
                          {appointment.review && (
                            <p className="text-sm text-gray-600 italic mt-1">
                              "{appointment.review}"
                            </p>
                          )}
                        </div>
                      </div>
                      <div className="text-center">
                        <p className="font-medium">{appointment.date}</p>
                        <p className="text-sm text-gray-500">
                          {appointment.time}
                        </p>
                        {appointment.rating && (
                          <div className="flex items-center justify-center mt-1">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className={`h-3 w-3 ${
                                  i < appointment.rating
                                    ? "text-yellow-400 fill-current"
                                    : "text-gray-300"
                                }`}
                              />
                            ))}
                          </div>
                        )}
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-lg">
                          ${appointment.total}
                        </p>
                        <Badge className={getStatusColor(appointment.status)}>
                          {getStatusIcon(appointment.status)}
                          <span className="ml-1 capitalize">
                            {appointment.status}
                          </span>
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Revenue Tab */}
          <TabsContent value="revenue" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Monthly Revenue</CardTitle>
                  <CardDescription>Current month performance</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">
                    ${businessData.stats.monthlyRevenue.toLocaleString()}
                  </div>
                  <p className="text-sm text-green-600 mt-2">
                    <TrendingUp className="h-4 w-4 inline mr-1" />
                    +12.5% from last month
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Monthly Appointments</CardTitle>
                  <CardDescription>Appointments this month</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">
                    {businessData.stats.monthlyAppointments}
                  </div>
                  <p className="text-sm text-green-600 mt-2">
                    <TrendingUp className="h-4 w-4 inline mr-1" />
                    +8.2% from last month
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Completion Rate</CardTitle>
                  <CardDescription>Successful appointments</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">
                    {businessData.stats.completionRate}%
                  </div>
                  <p className="text-sm text-green-600 mt-2">
                    <TrendingUp className="h-4 w-4 inline mr-1" />
                    +2.1% from last month
                  </p>
                </CardContent>
              </Card>
            </div>

            {/* Revenue by Location */}
            <Card>
              <CardHeader>
                <CardTitle>Revenue by Location</CardTitle>
                <CardDescription>
                  Performance breakdown by location
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {businessData.locations.map((location) => (
                    <div
                      key={location.id}
                      className="flex items-center justify-between p-4 border rounded-lg"
                    >
                      <div>
                        <p className="font-medium">{location.name}</p>
                        <p className="text-sm text-gray-500">
                          {location.address}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-lg">
                          ${location.revenue.toLocaleString()}
                        </p>
                        <p className="text-sm text-gray-500">
                          {location.appointments} appointments
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Locations Tab */}
          <TabsContent value="locations" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Location Management</CardTitle>
                <CardDescription>
                  Manage your salon locations and their performance
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {businessData.locations.map((location) => (
                    <Card key={location.id}>
                      <CardHeader>
                        <CardTitle className="text-lg">
                          {location.name}
                        </CardTitle>
                        <CardDescription>{location.address}</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-2">
                          <div className="flex justify-between">
                            <span className="text-sm text-gray-500">
                              Monthly Appointments:
                            </span>
                            <span className="font-medium">
                              {location.appointments}
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-sm text-gray-500">
                              Monthly Revenue:
                            </span>
                            <span className="font-medium">
                              ${location.revenue.toLocaleString()}
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-sm text-gray-500">
                              Avg per Appointment:
                            </span>
                            <span className="font-medium">
                              $
                              {Math.round(
                                location.revenue / location.appointments
                              )}
                            </span>
                          </div>
                        </div>
                        <Button
                          className="w-full mt-4 bg-transparent"
                          variant="outline"
                        >
                          <BarChart3 className="h-4 w-4 mr-2" />
                          View Analytics
                        </Button>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
