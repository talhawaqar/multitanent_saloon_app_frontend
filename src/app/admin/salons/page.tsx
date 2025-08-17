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
  Edit,
  Ban,
  CheckCircle,
  XCircle,
  MapPin,
  Star,
  Calendar,
} from "lucide-react";

// Mock salon data
const salons = [
  {
    id: 1,
    name: "Luxury Hair Studio",
    owner: "Sarah Johnson",
    email: "sarah@luxuryhair.com",
    phone: "+1 (555) 123-4567",
    address: "123 Main St, New York, NY",
    status: "active",
    rating: 4.9,
    bookings: 234,
    revenue: 12450,
    joinDate: "2024-01-15",
    services: 12,
  },
  {
    id: 2,
    name: "Beauty Palace",
    owner: "Mike Chen",
    email: "mike@beautypalace.com",
    phone: "+1 (555) 234-5678",
    address: "456 Oak Ave, Los Angeles, CA",
    status: "pending",
    rating: 4.8,
    bookings: 198,
    revenue: 9876,
    joinDate: "2024-02-20",
    services: 8,
  },
  {
    id: 3,
    name: "Quick Cuts",
    owner: "Emma Davis",
    email: "emma@quickcuts.com",
    phone: "+1 (555) 345-6789",
    address: "789 Pine St, Chicago, IL",
    status: "suspended",
    rating: 3.2,
    bookings: 45,
    revenue: 1234,
    joinDate: "2024-01-08",
    services: 5,
  },
  {
    id: 4,
    name: "Glamour Zone",
    owner: "David Wilson",
    email: "david@glamourzone.com",
    phone: "+1 (555) 456-7890",
    address: "321 Elm St, Miami, FL",
    status: "active",
    rating: 4.7,
    bookings: 167,
    revenue: 8234,
    joinDate: "2024-01-22",
    services: 15,
  },
];

export default function ManageSalons() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const filteredSalons = salons.filter((salon) => {
    const matchesSearch =
      salon.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      salon.owner.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus =
      statusFilter === "all" || salon.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return <Badge className="bg-green-100 text-green-800">Active</Badge>;
      case "pending":
        return <Badge className="bg-yellow-100 text-yellow-800">Pending</Badge>;
      case "suspended":
        return <Badge className="bg-red-100 text-red-800">Suspended</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  const handleApprove = (salonId: number) => {
    console.log("Approving salon:", salonId);
    // API call to approve salon
  };

  const handleSuspend = (salonId: number) => {
    console.log("Suspending salon:", salonId);
    // API call to suspend salon
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Page Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Manage Salons</h1>
            <p className="text-gray-600 mt-2">
              Oversee and manage all registered salons
            </p>
          </div>
          <Button className="bg-purple-600 hover:bg-purple-700">
            <CheckCircle className="h-4 w-4 mr-2" />
            Approve All Pending
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">
                Total Salons
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">1,247</div>
              <p className="text-xs text-green-600">+12% from last month</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">
                Active Salons
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">1,189</div>
              <p className="text-xs text-gray-500">95.3% of total</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">
                Pending Approval
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-yellow-600">23</div>
              <p className="text-xs text-gray-500">Require review</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">
                Suspended
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-red-600">35</div>
              <p className="text-xs text-gray-500">Policy violations</p>
            </CardContent>
          </Card>
        </div>

        {/* Filters and Search */}
        <Card>
          <CardHeader>
            <CardTitle>Salon Directory</CardTitle>
            <CardDescription>
              View and manage all registered salons
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center space-x-4 mb-6">
              <div className="relative flex-1 max-w-sm">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Search salons or owners..."
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
                  <DropdownMenuItem onClick={() => setStatusFilter("active")}>
                    Active
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setStatusFilter("pending")}>
                    Pending
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() => setStatusFilter("suspended")}
                  >
                    Suspended
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>

            {/* Salons Table */}
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Salon Details</TableHead>
                    <TableHead>Owner</TableHead>
                    <TableHead>Location</TableHead>
                    <TableHead>Performance</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredSalons.map((salon) => (
                    <TableRow key={salon.id}>
                      <TableCell>
                        <div>
                          <div className="font-medium">{salon.name}</div>
                          <div className="text-sm text-gray-500 flex items-center mt-1">
                            <Calendar className="h-3 w-3 mr-1" />
                            Joined{" "}
                            {new Date(salon.joinDate).toLocaleDateString()}
                          </div>
                          <div className="text-sm text-gray-500">
                            {salon.services} services offered
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div>
                          <div className="font-medium">{salon.owner}</div>
                          <div className="text-sm text-gray-500">
                            {salon.email}
                          </div>
                          <div className="text-sm text-gray-500">
                            {salon.phone}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-start">
                          <MapPin className="h-4 w-4 text-gray-400 mr-1 mt-0.5" />
                          <span className="text-sm">{salon.address}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="space-y-1">
                          <div className="flex items-center">
                            <Star className="h-3 w-3 text-yellow-400 mr-1" />
                            <span className="text-sm font-medium">
                              {salon.rating}
                            </span>
                          </div>
                          <div className="text-sm text-gray-500">
                            {salon.bookings} bookings
                          </div>
                          <div className="text-sm font-medium text-green-600">
                            ${salon.revenue.toLocaleString()}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>{getStatusBadge(salon.status)}</TableCell>
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
                              <Edit className="h-4 w-4 mr-2" />
                              Edit Salon
                            </DropdownMenuItem>
                            {salon.status === "pending" && (
                              <DropdownMenuItem
                                onClick={() => handleApprove(salon.id)}
                              >
                                <CheckCircle className="h-4 w-4 mr-2" />
                                Approve
                              </DropdownMenuItem>
                            )}
                            {salon.status === "active" && (
                              <DropdownMenuItem
                                onClick={() => handleSuspend(salon.id)}
                              >
                                <Ban className="h-4 w-4 mr-2" />
                                Suspend
                              </DropdownMenuItem>
                            )}
                            <DropdownMenuItem className="text-red-600">
                              <XCircle className="h-4 w-4 mr-2" />
                              Delete
                            </DropdownMenuItem>
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
