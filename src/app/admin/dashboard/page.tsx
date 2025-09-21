import { AdminLayout } from "@/components/admin/admin-layout";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Users,
  Building2,
  Scissors,
  DollarSign,
  TrendingUp,
  Calendar,
  Star,
  AlertTriangle,
  Activity,
  Clock,
} from "lucide-react";

// Mock data for dashboard
const dashboardStats = {
  totalSalons: 1247,
  activeSalons: 1189,
  totalServices: 89,
  totalBookings: 15678,
  monthlyRevenue: 234567,
  averageRating: 4.7,
  pendingApprovals: 23,
  activeUsers: 8934,
};

const recentActivities = [
  {
    id: 1,
    type: "salon_registered",
    message: "New salon 'Glamour Studio' registered",
    time: "2 minutes ago",
    status: "pending",
  },
  {
    id: 2,
    type: "booking_completed",
    message: "Booking #12345 completed at Beauty Palace",
    time: "5 minutes ago",
    status: "success",
  },
  {
    id: 3,
    type: "service_added",
    message: "New service 'Deep Conditioning' added",
    time: "10 minutes ago",
    status: "info",
  },
  {
    id: 4,
    type: "salon_suspended",
    message: "Salon 'Quick Cuts' suspended for policy violation",
    time: "15 minutes ago",
    status: "warning",
  },
  {
    id: 5,
    type: "payment_processed",
    message: "Commission payment of $2,450 processed",
    time: "20 minutes ago",
    status: "success",
  },
];

const topPerformingSalons = [
  {
    id: 1,
    name: "Luxury Hair Studio",
    owner: "Sarah Johnson",
    bookings: 234,
    revenue: 12450,
    rating: 4.9,
    status: "active",
  },
  {
    id: 2,
    name: "Beauty Palace",
    owner: "Mike Chen",
    bookings: 198,
    revenue: 9876,
    rating: 4.8,
    status: "active",
  },
  {
    id: 3,
    name: "Glamour Zone",
    owner: "Emma Davis",
    bookings: 167,
    revenue: 8234,
    rating: 4.7,
    status: "active",
  },
  {
    id: 4,
    name: "Style Central",
    owner: "David Wilson",
    bookings: 145,
    revenue: 7123,
    rating: 4.6,
    status: "active",
  },
];

const popularServices = [
  { name: "Haircut", bookings: 2345, percentage: 18.5 },
  { name: "Hair Coloring", bookings: 1876, percentage: 14.8 },
  { name: "Manicure", bookings: 1654, percentage: 13.1 },
  { name: "Facial Treatment", bookings: 1432, percentage: 11.3 },
  { name: "Pedicure", bookings: 1298, percentage: 10.2 },
];

export default function AdminDashboard() {
  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Page Header */}
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            Dashboard Overview
          </h1>
          <p className="text-gray-600 mt-2">
            Monitor your salon platform performance and activities
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Total Salons
              </CardTitle>
              <Building2 className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {dashboardStats.totalSalons.toLocaleString()}
              </div>
              <p className="text-xs text-muted-foreground">
                <span className="text-green-600">+12%</span> from last month
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Active Services
              </CardTitle>
              <Scissors className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {dashboardStats.totalServices}
              </div>
              <p className="text-xs text-muted-foreground">
                <span className="text-green-600">+3</span> new this week
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Total Bookings
              </CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {dashboardStats.totalBookings.toLocaleString()}
              </div>
              <p className="text-xs text-muted-foreground">
                <span className="text-green-600">+8%</span> from last month
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Monthly Revenue
              </CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                ${dashboardStats.monthlyRevenue.toLocaleString()}
              </div>
              <p className="text-xs text-muted-foreground">
                <span className="text-green-600">+15%</span> from last month
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Secondary Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Active Users
              </CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {dashboardStats.activeUsers.toLocaleString()}
              </div>
              <p className="text-xs text-muted-foreground">
                Online in last 24h
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
                {dashboardStats.averageRating}
              </div>
              <p className="text-xs text-muted-foreground">
                Platform-wide rating
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Pending Approvals
              </CardTitle>
              <AlertTriangle className="h-4 w-4 text-orange-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-orange-600">
                {dashboardStats.pendingApprovals}
              </div>
              <p className="text-xs text-muted-foreground">Require attention</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Active Salons
              </CardTitle>
              <Activity className="h-4 w-4 text-green-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">
                {dashboardStats.activeSalons.toLocaleString()}
              </div>
              <p className="text-xs text-muted-foreground">
                Currently operational
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Recent Activities */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Clock className="h-5 w-5 mr-2" />
                Recent Activities
              </CardTitle>
              <CardDescription>
                Latest platform activities and updates
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentActivities.map((activity) => (
                  <div key={activity.id} className="flex items-start space-x-3">
                    <div
                      className={`w-2 h-2 rounded-full mt-2 ${
                        activity.status === "success"
                          ? "bg-green-500"
                          : activity.status === "warning"
                          ? "bg-orange-500"
                          : activity.status === "pending"
                          ? "bg-yellow-500"
                          : "bg-blue-500"
                      }`}
                    />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-gray-900">
                        {activity.message}
                      </p>
                      <p className="text-xs text-gray-500">{activity.time}</p>
                    </div>
                    <Badge
                      variant={
                        activity.status === "success"
                          ? "default"
                          : activity.status === "warning"
                          ? "destructive"
                          : "secondary"
                      }
                      className="text-xs"
                    >
                      {activity.status}
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Top Performing Salons */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <TrendingUp className="h-5 w-5 mr-2" />
                Top Performing Salons
              </CardTitle>
              <CardDescription>
                Highest revenue generating salons this month
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {topPerformingSalons.map((salon, index) => (
                  <div key={salon.id} className="flex items-center space-x-4">
                    <div className="flex-shrink-0">
                      <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                        <span className="text-sm font-medium text-purple-600">
                          #{index + 1}
                        </span>
                      </div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <p className="text-sm font-medium text-gray-900 truncate">
                          {salon.name}
                        </p>
                        <Badge variant="outline" className="ml-2">
                          {salon.rating} ⭐
                        </Badge>
                      </div>
                      <p className="text-xs text-gray-500">{salon.owner}</p>
                      <div className="flex items-center space-x-4 mt-1">
                        <span className="text-xs text-gray-500">
                          {salon.bookings} bookings
                        </span>
                        <span className="text-xs font-medium text-green-600">
                          ${salon.revenue.toLocaleString()}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Popular Services */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Scissors className="h-5 w-5 mr-2" />
              Popular Services
            </CardTitle>
            <CardDescription>
              Most booked services across the platform
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {popularServices.map((service, index) => (
                <div key={service.name} className="flex items-center space-x-4">
                  <div className="flex-shrink-0 w-8 text-center">
                    <span className="text-sm font-medium text-gray-500">
                      #{index + 1}
                    </span>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm font-medium text-gray-900">
                        {service.name}
                      </span>
                      <span className="text-sm text-gray-500">
                        {service.bookings.toLocaleString()} bookings
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-purple-600 h-2 rounded-full"
                        style={{ width: `${service.percentage}%` }}
                      ></div>
                    </div>
                    <div className="flex justify-between mt-1">
                      <span className="text-xs text-gray-500">
                        {service.percentage}% of total bookings
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
}
