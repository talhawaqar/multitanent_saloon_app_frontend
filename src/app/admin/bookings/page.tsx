"use client";

import { useState } from "react";
import { AdminLayout } from "@/components/admin/admin-layout";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Search,
  Filter,
  MoreHorizontal,
  Eye,
  Calendar,
  Clock,
  DollarSign,
  User,
  Building2,
  CheckCircle,
  XCircle,
} from "lucide-react";

// Mock bookings data
const bookings = [
  {
    id: 12345,
    customerName: "Sarah Johnson",
    customerEmail: "sarah.johnson@email.com",
    salonName: "Luxury Hair Studio",
    salonOwner: "Mike Chen",
    serviceName: "Haircut & Styling",
    date: "2024-03-25",
    time: "10:00 AM",
    duration: 60,
    price: 85,
    commission: 8.5,
    status: "confirmed",
    paymentStatus: "paid",
    createdDate: "2024-03-20",
  },
  {
    id: 12346,
    customerName: "Emma Davis",
    customerEmail: "emma.davis@email.com",
    salonName: "Beauty Palace",
    salonOwner: "Lisa Rodriguez",
    serviceName: "Manicure",
    date: "2024-03-24",
    time: "2:30 PM",
    duration: 45,
    price: 35,
    commission: 3.5,
    status: "completed",
    paymentStatus: "paid",
    createdDate: "2024-03-18",
  },
  {
    id: 12347,
    customerName: "David Wilson",
    customerEmail: "david.wilson@email.com",
    salonName: "Glamour Zone",
    salonOwner: "Anna Smith",
    serviceName: "Facial Treatment",
    date: "2024-03-26",
    time: "11:30 AM",
    duration: 90,
    price: 120,
    commission: 12,
    status: "pending",
    paymentStatus: "pending",
    createdDate: "2024-03-21",
  },
  {
    id: 12348,
    customerName: "Lisa Rodriguez",
    customerEmail: "lisa.rodriguez@email.com",
    salonName: "Style Central",
    salonOwner: "John Doe",
    serviceName: "Hair Coloring",
    date: "2024-03-23",
    time: "9:00 AM",
    duration: 120,
    price: 150,
    commission: 15,
    status: "cancelled",
    paymentStatus: "refunded",
    createdDate: "2024-03-15",
  },
  {
    id: 12349,
    customerName: "Michael Brown",
    customerEmail: "michael.brown@email.com",
    salonName: "Quick Cuts",
    salonOwner: "Sarah Wilson",
    serviceName: "Beard Trim",
    date: "2024-03-24",
    time: "4:00 PM",
    duration: 30,
    price: 25,
    commission: 2.5,
    status: "completed",
    paymentStatus: "paid",
    createdDate: "2024-03-22",
  },
];

export default function ManageBookings() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [paymentFilter, setPaymentFilter] = useState("all");

  const filteredBookings = bookings.filter((booking) => {
    const matchesSearch =
      booking.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      booking.salonName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      booking.id.toString().includes(searchTerm);
    const matchesStatus =
      statusFilter === "all" || booking.status === statusFilter;
    const matchesPayment =
      paymentFilter === "all" || booking.paymentStatus === paymentFilter;
    return matchesSearch && matchesStatus && matchesPayment;
  });

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "confirmed":
        return <Badge className="bg-blue-100 text-blue-800">Confirmed</Badge>;
      case "completed":
        return <Badge className="bg-green-100 text-green-800">Completed</Badge>;
      case "pending":
        return <Badge className="bg-yellow-100 text-yellow-800">Pending</Badge>;
      case "cancelled":
        return <Badge className="bg-red-100 text-red-800">Cancelled</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  const getPaymentBadge = (status: string) => {
    switch (status) {
      case "paid":
        return <Badge className="bg-green-100 text-green-800">Paid</Badge>;
      case "pending":
        return <Badge className="bg-yellow-100 text-yellow-800">Pending</Badge>;
      case "refunded":
        return <Badge className="bg-gray-100 text-gray-800">Refunded</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Page Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              Manage Bookings
            </h1>
            <p className="text-gray-600 mt-2">
              Monitor all platform bookings and transactions
            </p>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">
                Total Bookings
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">15,678</div>
              <p className="text-xs text-green-600">+234 this week</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">
                Completed
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">14,234</div>
              <p className="text-xs text-gray-500">90.8% success rate</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">
                Revenue
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">$234,567</div>
              <p className="text-xs text-green-600">+15% this month</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">
                Commission
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-purple-600">$23,457</div>
              <p className="text-xs text-gray-500">10% avg commission</p>
            </CardContent>
          </Card>
        </div>

        {/* Bookings Management */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Calendar className="h-5 w-5 mr-2" />
              Booking Directory
            </CardTitle>
            <CardDescription>
              View and manage all platform bookings
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center space-x-4 mb-6">
              <div className="relative flex-1 max-w-sm">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Search bookings..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline">
                    <Filter className="h-4 w-4 mr-2" />
                    Status: {statusFilter === "all" ? "All" : statusFilter}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem onClick={() => setStatusFilter("all")}>
                    All Statuses
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() => setStatusFilter("confirmed")}
                  >
                    Confirmed
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() => setStatusFilter("completed")}
                  >
                    Completed
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setStatusFilter("pending")}>
                    Pending
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() => setStatusFilter("cancelled")}
                  >
                    Cancelled
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline">
                    <Filter className="h-4 w-4 mr-2" />
                    Payment: {paymentFilter === "all" ? "All" : paymentFilter}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem onClick={() => setPaymentFilter("all")}>
                    All Payments
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setPaymentFilter("paid")}>
                    Paid
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setPaymentFilter("pending")}>
                    Pending
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() => setPaymentFilter("refunded")}
                  >
                    Refunded
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>

            {/* Bookings Table */}
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Booking Details</TableHead>
                    <TableHead>Customer</TableHead>
                    <TableHead>Salon & Service</TableHead>
                    <TableHead>Schedule</TableHead>
                    <TableHead>Payment</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredBookings.map((booking) => (
                    <TableRow key={booking.id}>
                      <TableCell>
                        <div>
                          <div className="font-medium">#{booking.id}</div>
                          <div className="text-sm text-gray-500">
                            Created{" "}
                            {new Date(booking.createdDate).toLocaleDateString()}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="space-y-1">
                          <div className="flex items-center">
                            <User className="h-3 w-3 mr-2 text-gray-400" />
                            <span className="font-medium">
                              {booking.customerName}
                            </span>
                          </div>
                          <div className="text-sm text-gray-500">
                            {booking.customerEmail}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="space-y-1">
                          <div className="flex items-center">
                            <Building2 className="h-3 w-3 mr-2 text-gray-400" />
                            <span className="font-medium">
                              {booking.salonName}
                            </span>
                          </div>
                          <div className="text-sm text-gray-500">
                            {booking.serviceName}
                          </div>
                          <div className="text-sm text-gray-500">
                            by {booking.salonOwner}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="space-y-1">
                          <div className="flex items-center">
                            <Calendar className="h-3 w-3 mr-2 text-gray-400" />
                            <span className="text-sm">
                              {new Date(booking.date).toLocaleDateString()}
                            </span>
                          </div>
                          <div className="flex items-center">
                            <Clock className="h-3 w-3 mr-2 text-gray-400" />
                            <span className="text-sm">
                              {booking.time} ({booking.duration}min)
                            </span>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="space-y-1">
                          <div className="flex items-center">
                            <DollarSign className="h-3 w-3 mr-2 text-gray-400" />
                            <span className="font-medium">
                              ${booking.price}
                            </span>
                          </div>
                          <div className="text-sm text-gray-500">
                            Commission: ${booking.commission}
                          </div>
                          <div>{getPaymentBadge(booking.paymentStatus)}</div>
                        </div>
                      </TableCell>
                      <TableCell>{getStatusBadge(booking.status)}</TableCell>
                      <TableCell>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="h-8 w-8 p-0">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem>
                              <Eye className="h-4 w-4 mr-2" />
                              View Details
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <User className="h-4 w-4 mr-2" />
                              Contact Customer
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Building2 className="h-4 w-4 mr-2" />
                              Contact Salon
                            </DropdownMenuItem>
                            {booking.status === "pending" && (
                              <DropdownMenuItem>
                                <CheckCircle className="h-4 w-4 mr-2" />
                                Confirm Booking
                              </DropdownMenuItem>
                            )}
                            {booking.status !== "cancelled" && (
                              <DropdownMenuItem className="text-red-600">
                                <XCircle className="h-4 w-4 mr-2" />
                                Cancel Booking
                              </DropdownMenuItem>
                            )}
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
}
