"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import {
  Calendar,
  Clock,
  MapPin,
  Phone,
  Star,
  User,
  CreditCard,
  Settings,
  MoreHorizontal,
  Heart,
  TrendingUp,
  DollarSign,
  Mail,
  Bell,
  Shield,
  Trash2,
  Edit,
} from "lucide-react";
import Link from "next/link";

const upcomingAppointments = [
  {
    id: 1,
    salon: "Glamour Studio",
    salonImage: "/placeholder.svg?height=40&width=40&text=GS",
    location: "Downtown Branch",
    address: "123 Main St, Downtown",
    phone: "(555) 123-4567",
    date: "2024-01-15",
    time: "2:00 PM",
    stylist: "Sarah Johnson",
    stylistImage: "/placeholder.svg?height=32&width=32&text=SJ",
    services: [
      { name: "Hair Cut & Style", duration: 60, price: 85 },
      { name: "Hair Coloring", duration: 90, price: 120 },
    ],
    status: "confirmed",
    totalPrice: 205,
    totalDuration: 150,
  },
  {
    id: 2,
    salon: "Luxe Nail Bar",
    salonImage: "/placeholder.svg?height=40&width=40&text=LN",
    location: "Mall Location",
    address: "456 Shopping Center",
    phone: "(555) 987-6543",
    date: "2024-01-18",
    time: "11:00 AM",
    stylist: "Maria Garcia",
    stylistImage: "/placeholder.svg?height=32&width=32&text=MG",
    services: [
      { name: "Gel Manicure", duration: 45, price: 35 },
      { name: "Pedicure", duration: 60, price: 45 },
    ],
    status: "pending",
    totalPrice: 80,
    totalDuration: 105,
  },
];

const appointmentHistory = [
  {
    id: 3,
    salon: "Bella Beauty Lounge",
    salonImage: "/placeholder.svg?height=40&width=40&text=BB",
    location: "Uptown Studio",
    date: "2024-01-05",
    time: "3:30 PM",
    stylist: "Emma Wilson",
    stylistImage: "/placeholder.svg?height=32&width=32&text=EW",
    services: [
      { name: "Hair Cut", duration: 45, price: 65 },
      { name: "Blowout", duration: 30, price: 40 },
    ],
    status: "completed",
    totalPrice: 105,
    rating: 5,
    review: "Amazing service! Emma did exactly what I wanted.",
  },
  {
    id: 4,
    salon: "Radiance Spa & Salon",
    salonImage: "/placeholder.svg?height=40&width=40&text=RS",
    location: "Downtown Branch",
    date: "2023-12-20",
    time: "1:00 PM",
    stylist: "Lisa Chen",
    stylistImage: "/placeholder.svg?height=32&width=32&text=LC",
    services: [
      { name: "Facial Treatment", duration: 75, price: 95 },
      { name: "Eyebrow Shaping", duration: 15, price: 25 },
    ],
    status: "completed",
    totalPrice: 120,
    rating: 4,
    review: "Very relaxing experience. Will book again!",
  },
  {
    id: 5,
    salon: "Chic Cuts",
    salonImage: "/placeholder.svg?height=40&width=40&text=CC",
    location: "Main Street",
    date: "2023-12-10",
    time: "4:00 PM",
    stylist: "Alex Rodriguez",
    stylistImage: "/placeholder.svg?height=32&width=32&text=AR",
    services: [{ name: "Hair Cut", duration: 30, price: 45 }],
    status: "cancelled",
    totalPrice: 45,
    cancelReason: "Stylist was sick",
  },
];

const favoriteServices = [
  {
    name: "Hair Cut & Style",
    count: 8,
    lastBooked: "2024-01-05",
    avgPrice: 75,
  },
  { name: "Hair Coloring", count: 4, lastBooked: "2023-12-15", avgPrice: 120 },
  { name: "Manicure", count: 6, lastBooked: "2023-12-28", avgPrice: 35 },
  {
    name: "Facial Treatment",
    count: 3,
    lastBooked: "2023-12-20",
    avgPrice: 95,
  },
];

export default function ClientDashboard() {
  const [activeTab, setActiveTab] = useState("overview");

  const getStatusColor = (status: string) => {
    switch (status) {
      case "confirmed":
        return "bg-green-100 text-green-800";
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "completed":
        return "bg-blue-100 text-blue-800";
      case "cancelled":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const totalBookings = upcomingAppointments.length + appointmentHistory.length;
  const completedBookings = appointmentHistory.filter(
    (apt) => apt.status === "completed"
  ).length;
  const totalSpent = appointmentHistory
    .filter((apt) => apt.status === "completed")
    .reduce((sum, apt) => sum + apt.totalPrice, 0);

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center space-x-4 mb-4">
            <Avatar className="h-16 w-16">
              <AvatarImage src="/placeholder.svg?height=64&width=64&text=JD" />
              <AvatarFallback>JD</AvatarFallback>
            </Avatar>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                Welcome back, John!
              </h1>
              <p className="text-gray-600">
                Manage your appointments and beauty journey
              </p>
            </div>
          </div>

          <Button className="bg-purple-600 hover:bg-purple-700" asChild>
            <Link href="/book-appointment">
              <Calendar className="h-4 w-4 mr-2" />
              Book New Appointment
            </Link>
          </Button>
        </div>

        <Tabs
          value={activeTab}
          onValueChange={setActiveTab}
          className="space-y-6"
        >
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
            <TabsTrigger value="history">History</TabsTrigger>
            <TabsTrigger value="profile">Profile</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <Card>
                <CardContent className="p-4 text-center">
                  <Calendar className="h-8 w-8 text-purple-600 mx-auto mb-2" />
                  <p className="text-sm text-gray-600">Upcoming</p>
                  <p className="text-2xl font-bold">
                    {upcomingAppointments.length}
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4 text-center">
                  <TrendingUp className="h-8 w-8 text-green-600 mx-auto mb-2" />
                  <p className="text-sm text-gray-600">Total Bookings</p>
                  <p className="text-2xl font-bold">{totalBookings}</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4 text-center">
                  <Heart className="h-8 w-8 text-red-500 mx-auto mb-2" />
                  <p className="text-sm text-gray-600">Favorite Services</p>
                  <p className="text-2xl font-bold">
                    {favoriteServices.length}
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4 text-center">
                  <User className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                  <p className="text-sm text-gray-600">Member Since</p>
                  <p className="text-2xl font-bold">2023</p>
                </CardContent>
              </Card>
            </div>

            {/* Next Appointment */}
            {upcomingAppointments.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Clock className="h-5 w-5 mr-2" />
                    Next Appointment
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-start space-x-4">
                    <Avatar className="h-12 w-12">
                      <AvatarImage
                        src={
                          upcomingAppointments[0].salonImage ||
                          "/placeholder.svg"
                        }
                      />
                      <AvatarFallback>GS</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <h3 className="font-semibold text-lg">
                            {upcomingAppointments[0].salon}
                          </h3>
                          <p className="text-gray-600">
                            {upcomingAppointments[0].location}
                          </p>
                        </div>
                        <Badge
                          className={getStatusColor(
                            upcomingAppointments[0].status
                          )}
                        >
                          {upcomingAppointments[0].status}
                        </Badge>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                        <div className="flex items-center text-sm text-gray-600">
                          <Calendar className="h-4 w-4 mr-2" />
                          {formatDate(upcomingAppointments[0].date)}
                        </div>
                        <div className="flex items-center text-sm text-gray-600">
                          <Clock className="h-4 w-4 mr-2" />
                          {upcomingAppointments[0].time} (
                          {upcomingAppointments[0].totalDuration} min)
                        </div>
                        <div className="flex items-center text-sm text-gray-600">
                          <User className="h-4 w-4 mr-2" />
                          {upcomingAppointments[0].stylist}
                        </div>
                        <div className="flex items-center text-sm text-gray-600">
                          <DollarSign className="h-4 w-4 mr-2" />$
                          {upcomingAppointments[0].totalPrice}
                        </div>
                      </div>
                      <div className="space-y-2">
                        {upcomingAppointments[0].services.map(
                          (service, index) => (
                            <div
                              key={index}
                              className="flex justify-between items-center text-sm"
                            >
                              <span>{service.name}</span>
                              <span className="text-gray-600">
                                ${service.price}
                              </span>
                            </div>
                          )
                        )}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Favorite Services */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Heart className="h-5 w-5 mr-2" />
                  Your Favorite Services
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {favoriteServices.map((service, index) => (
                    <div
                      key={index}
                      className="flex justify-between items-center p-3 bg-gray-50 rounded-lg"
                    >
                      <div>
                        <h4 className="font-medium">{service.name}</h4>
                        <p className="text-sm text-gray-600">
                          Booked {service.count} times
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold">${service.avgPrice}</p>
                        <Button size="sm" variant="outline" asChild>
                          <Link href="/salons">Book Again</Link>
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Recent Activity */}
            <Card>
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {appointmentHistory.slice(0, 3).map((appointment) => (
                    <div
                      key={appointment.id}
                      className="flex items-center space-x-4 p-3 bg-gray-50 rounded-lg"
                    >
                      <Avatar>
                        <AvatarImage
                          src={appointment.salonImage || "/placeholder.svg"}
                        />
                        <AvatarFallback>BB</AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <div className="flex justify-between items-start">
                          <div>
                            <h4 className="font-medium">{appointment.salon}</h4>
                            <p className="text-sm text-gray-600">
                              {formatDate(appointment.date)}
                            </p>
                          </div>
                          <div className="text-right">
                            <Badge
                              className={getStatusColor(appointment.status)}
                            >
                              {appointment.status}
                            </Badge>
                            {appointment.rating && (
                              <div className="flex items-center mt-1">
                                {[...Array(5)].map((_, i) => (
                                  <Star
                                    key={i}
                                    className={`h-3 w-3 ${
                                      i < appointment.rating
                                        ? "fill-yellow-400 text-yellow-400"
                                        : "text-gray-300"
                                    }`}
                                  />
                                ))}
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Upcoming Appointments Tab */}
          <TabsContent value="upcoming" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold">Upcoming Appointments</h2>
              <Button className="bg-purple-600 hover:bg-purple-700" asChild>
                <Link href="/salons">Book New Appointment</Link>
              </Button>
            </div>

            {upcomingAppointments.length > 0 ? (
              <div className="space-y-4">
                {upcomingAppointments.map((appointment) => (
                  <Card key={appointment.id}>
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-start space-x-4">
                          <Avatar className="h-12 w-12">
                            <AvatarImage
                              src={appointment.salonImage || "/placeholder.svg"}
                            />
                            <AvatarFallback>GS</AvatarFallback>
                          </Avatar>
                          <div>
                            <h3 className="font-semibold text-lg">
                              {appointment.salon}
                            </h3>
                            <p className="text-gray-600">
                              {appointment.location}
                            </p>
                            <div className="flex items-center text-sm text-gray-500 mt-1">
                              <MapPin className="h-4 w-4 mr-1" />
                              {appointment.address}
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Badge className={getStatusColor(appointment.status)}>
                            {appointment.status}
                          </Badge>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="sm">
                                <MoreHorizontal className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem>
                                <Phone className="h-4 w-4 mr-2" />
                                Call Salon
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <Edit className="h-4 w-4 mr-2" />
                                Reschedule
                              </DropdownMenuItem>
                              <DropdownMenuItem className="text-red-600">
                                <Trash2 className="h-4 w-4 mr-2" />
                                Cancel
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                        <div className="flex items-center">
                          <Calendar className="h-4 w-4 mr-2 text-gray-500" />
                          <span className="text-sm">
                            {formatDate(appointment.date)}
                          </span>
                        </div>
                        <div className="flex items-center">
                          <Clock className="h-4 w-4 mr-2 text-gray-500" />
                          <span className="text-sm">
                            {appointment.time} ({appointment.totalDuration} min)
                          </span>
                        </div>
                        <div className="flex items-center">
                          <User className="h-4 w-4 mr-2 text-gray-500" />
                          <span className="text-sm">{appointment.stylist}</span>
                        </div>
                      </div>

                      <div className="border-t pt-4">
                        <h4 className="font-medium mb-2">Services</h4>
                        <div className="space-y-2">
                          {appointment.services.map((service, index) => (
                            <div
                              key={index}
                              className="flex justify-between items-center text-sm"
                            >
                              <span>
                                {service.name} ({service.duration} min)
                              </span>
                              <span className="font-medium">
                                ${service.price}
                              </span>
                            </div>
                          ))}
                        </div>
                        <div className="flex justify-between items-center mt-3 pt-3 border-t font-semibold">
                          <span>Total</span>
                          <span>${appointment.totalPrice}</span>
                        </div>
                      </div>

                      <div className="flex items-center justify-between mt-4 pt-4 border-t">
                        <div className="flex items-center text-sm text-gray-600">
                          <Phone className="h-4 w-4 mr-1" />
                          {appointment.phone}
                        </div>
                        <div className="flex space-x-2">
                          <Button variant="outline" size="sm">
                            <Phone className="h-4 w-4 mr-2" />
                            Call
                          </Button>
                          <Button variant="outline" size="sm">
                            <Mail className="h-4 w-4 mr-2" />
                            Email
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <Card>
                <CardContent className="p-12 text-center">
                  <Calendar className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    No upcoming appointments
                  </h3>
                  <p className="text-gray-600 mb-4">
                    Book your next beauty appointment today!
                  </p>
                  <Button className="bg-purple-600 hover:bg-purple-700" asChild>
                    <Link href="/salons">Browse Salons</Link>
                  </Button>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          {/* History Tab */}
          <TabsContent value="history" className="space-y-6">
            <h2 className="text-2xl font-bold">Appointment History</h2>

            <div className="space-y-4">
              {appointmentHistory.map((appointment) => (
                <Card key={appointment.id}>
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-start space-x-4">
                        <Avatar className="h-12 w-12">
                          <AvatarImage
                            src={appointment.salonImage || "/placeholder.svg"}
                          />
                          <AvatarFallback>BB</AvatarFallback>
                        </Avatar>
                        <div>
                          <h3 className="font-semibold text-lg">
                            {appointment.salon}
                          </h3>
                          <p className="text-gray-600">
                            {appointment.location}
                          </p>
                          <div className="flex items-center text-sm text-gray-500 mt-1">
                            <Calendar className="h-4 w-4 mr-1" />
                            {formatDate(appointment.date)} at {appointment.time}
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <Badge className={getStatusColor(appointment.status)}>
                          {appointment.status}
                        </Badge>
                        {appointment.rating && (
                          <div className="flex items-center mt-2">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className={`h-4 w-4 ${
                                  i < appointment.rating
                                    ? "fill-yellow-400 text-yellow-400"
                                    : "text-gray-300"
                                }`}
                              />
                            ))}
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                      <div className="flex items-center">
                        <User className="h-4 w-4 mr-2 text-gray-500" />
                        <span className="text-sm">{appointment.stylist}</span>
                      </div>
                      <div className="flex items-center">
                        <DollarSign className="h-4 w-4 mr-2 text-gray-500" />
                        <span className="text-sm">
                          ${appointment.totalPrice}
                        </span>
                      </div>
                    </div>

                    <div className="border-t pt-4">
                      <h4 className="font-medium mb-2">Services</h4>
                      <div className="space-y-2">
                        {appointment.services.map((service, index) => (
                          <div
                            key={index}
                            className="flex justify-between items-center text-sm"
                          >
                            <span>{service.name}</span>
                            <span>${service.price}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {appointment.review && (
                      <div className="mt-4 p-3 bg-gray-50 rounded-lg">
                        <h5 className="font-medium text-sm mb-1">
                          Your Review
                        </h5>
                        <p className="text-sm text-gray-700">
                          "{appointment.review}"
                        </p>
                      </div>
                    )}

                    {appointment.cancelReason && (
                      <div className="mt-4 p-3 bg-red-50 rounded-lg">
                        <h5 className="font-medium text-sm mb-1 text-red-800">
                          Cancellation Reason
                        </h5>
                        <p className="text-sm text-red-700">
                          {appointment.cancelReason}
                        </p>
                      </div>
                    )}

                    {appointment.status === "completed" && (
                      <div className="flex justify-end mt-4">
                        <Button variant="outline" size="sm" asChild>
                          <Link href="/salons">Book Again</Link>
                        </Button>
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Profile Tab */}
          <TabsContent value="profile" className="space-y-6">
            <h2 className="text-2xl font-bold">Profile & Settings</h2>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Profile Info */}
              <div className="lg:col-span-2 space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <User className="h-5 w-5 mr-2" />
                      Personal Information
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center space-x-4">
                      <Avatar className="h-16 w-16">
                        <AvatarImage src="/placeholder.svg?height=64&width=64&text=JD" />
                        <AvatarFallback>JD</AvatarFallback>
                      </Avatar>
                      <div>
                        <h3 className="font-semibold text-lg">John Doe</h3>
                        <p className="text-gray-600">john.doe@email.com</p>
                        <Button
                          variant="outline"
                          size="sm"
                          className="mt-2 bg-transparent"
                        >
                          Change Photo
                        </Button>
                      </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="text-sm font-medium text-gray-700">
                          Full Name
                        </label>
                        <p className="text-gray-900">John Doe</p>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-gray-700">
                          Email
                        </label>
                        <p className="text-gray-900">john.doe@email.com</p>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-gray-700">
                          Phone
                        </label>
                        <p className="text-gray-900">(555) 123-4567</p>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-gray-700">
                          Member Since
                        </label>
                        <p className="text-gray-900">January 2023</p>
                      </div>
                    </div>
                    <Button variant="outline">
                      <Edit className="h-4 w-4 mr-2" />
                      Edit Profile
                    </Button>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Settings className="h-5 w-5 mr-2" />
                      Account Settings
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <CreditCard className="h-5 w-5 mr-3 text-gray-500" />
                        <div>
                          <p className="font-medium">Payment Methods</p>
                          <p className="text-sm text-gray-600">
                            Manage your payment options
                          </p>
                        </div>
                      </div>
                      <Button variant="outline" size="sm">
                        Manage
                      </Button>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <Bell className="h-5 w-5 mr-3 text-gray-500" />
                        <div>
                          <p className="font-medium">Notifications</p>
                          <p className="text-sm text-gray-600">
                            Email and SMS preferences
                          </p>
                        </div>
                      </div>
                      <Button variant="outline" size="sm">
                        Settings
                      </Button>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <Shield className="h-5 w-5 mr-3 text-gray-500" />
                        <div>
                          <p className="font-medium">Privacy & Security</p>
                          <p className="text-sm text-gray-600">
                            Password and privacy settings
                          </p>
                        </div>
                      </div>
                      <Button variant="outline" size="sm">
                        Manage
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Stats Sidebar */}
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <TrendingUp className="h-5 w-5 mr-2" />
                      Your Stats
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="text-center">
                      <p className="text-2xl font-bold text-purple-600">
                        {totalBookings}
                      </p>
                      <p className="text-sm text-gray-600">Total Bookings</p>
                    </div>
                    <div className="text-center">
                      <p className="text-2xl font-bold text-green-600">
                        {completedBookings}
                      </p>
                      <p className="text-sm text-gray-600">Completed</p>
                    </div>
                    <div className="text-center">
                      <p className="text-2xl font-bold text-blue-600">
                        ${totalSpent}
                      </p>
                      <p className="text-sm text-gray-600">Total Spent</p>
                    </div>
                    <div className="text-center">
                      <p className="text-2xl font-bold text-yellow-600">4.8</p>
                      <p className="text-sm text-gray-600">Avg Rating Given</p>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-4 text-center">
                    <Trash2 className="h-8 w-8 text-red-500 mx-auto mb-2" />
                    <p className="text-sm text-gray-600 mb-3">
                      Need to delete your account?
                    </p>
                    <Button variant="destructive" size="sm">
                      Delete Account
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>

      <Footer />
    </div>
  );
}
