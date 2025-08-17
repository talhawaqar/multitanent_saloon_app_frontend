"use client"

import { useState } from "react"
import { AdminLayout } from "@/components/admin/admin-layout"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import {
  Search,
  Filter,
  MoreHorizontal,
  Eye,
  Flag,
  CheckCircle,
  XCircle,
  Star,
  User,
  Building2,
  Calendar,
  MessageSquare,
  AlertTriangle,
  ThumbsUp,
} from "lucide-react"

// Mock reviews data
const reviews = [
  {
    id: 1,
    customerName: "Sarah Johnson",
    customerEmail: "sarah.johnson@email.com",
    salonName: "Luxury Hair Studio",
    serviceName: "Haircut & Styling",
    rating: 5,
    title: "Amazing experience!",
    comment:
      "The staff was incredibly professional and the results exceeded my expectations. Will definitely be coming back!",
    date: "2024-03-20",
    status: "approved",
    helpful: 12,
    reported: 0,
    bookingId: 12345,
  },
  {
    id: 2,
    customerName: "Emma Davis",
    customerEmail: "emma.davis@email.com",
    salonName: "Beauty Palace",
    serviceName: "Manicure",
    rating: 4,
    title: "Good service",
    comment:
      "Nice salon with friendly staff. The manicure was well done, though I had to wait a bit longer than expected.",
    date: "2024-03-18",
    status: "approved",
    helpful: 8,
    reported: 0,
    bookingId: 12346,
  },
  {
    id: 3,
    customerName: "David Wilson",
    customerEmail: "david.wilson@email.com",
    salonName: "Quick Cuts",
    serviceName: "Haircut",
    rating: 2,
    title: "Disappointing experience",
    comment: "The haircut was not what I asked for and the staff seemed rushed. Not worth the price.",
    date: "2024-03-15",
    status: "flagged",
    helpful: 3,
    reported: 2,
    bookingId: 12347,
  },
  {
    id: 4,
    customerName: "Lisa Rodriguez",
    customerEmail: "lisa.rodriguez@email.com",
    salonName: "Glamour Zone",
    serviceName: "Facial Treatment",
    rating: 5,
    title: "Relaxing and rejuvenating",
    comment:
      "Absolutely loved the facial treatment. The ambiance was perfect and the results were visible immediately.",
    date: "2024-03-12",
    status: "approved",
    helpful: 15,
    reported: 0,
    bookingId: 12348,
  },
  {
    id: 5,
    customerName: "Michael Brown",
    customerEmail: "michael.brown@email.com",
    salonName: "Style Central",
    serviceName: "Hair Coloring",
    rating: 1,
    title: "Terrible service - inappropriate content",
    comment:
      "This review contains inappropriate language and personal attacks against staff members that violate our community guidelines.",
    date: "2024-03-10",
    status: "pending",
    helpful: 0,
    reported: 5,
    bookingId: 12349,
  },
]

export default function ManageReviews() {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [ratingFilter, setRatingFilter] = useState("all")

  const filteredReviews = reviews.filter((review) => {
    const matchesSearch =
      review.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      review.salonName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      review.title.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "all" || review.status === statusFilter
    const matchesRating = ratingFilter === "all" || review.rating.toString() === ratingFilter
    return matchesSearch && matchesStatus && matchesRating
  })

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "approved":
        return <Badge className="bg-green-100 text-green-800">Approved</Badge>
      case "pending":
        return <Badge className="bg-yellow-100 text-yellow-800">Pending</Badge>
      case "flagged":
        return <Badge className="bg-red-100 text-red-800">Flagged</Badge>
      case "rejected":
        return <Badge className="bg-gray-100 text-gray-800">Rejected</Badge>
      default:
        return <Badge variant="secondary">{status}</Badge>
    }
  }

  const renderStars = (rating: number) => {
    return (
      <div className="flex items-center">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star key={star} className={`h-4 w-4 ${star <= rating ? "text-yellow-400 fill-current" : "text-gray-300"}`} />
        ))}
        <span className="ml-2 text-sm font-medium">{rating}.0</span>
      </div>
    )
  }

  const handleApproveReview = (reviewId: number) => {
    console.log("Approving review:", reviewId)
    // API call to approve review
  }

  const handleRejectReview = (reviewId: number) => {
    console.log("Rejecting review:", reviewId)
    // API call to reject review
  }

  const handleFlagReview = (reviewId: number) => {
    console.log("Flagging review:", reviewId)
    // API call to flag review
  }

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Page Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Manage Reviews</h1>
            <p className="text-gray-600 mt-2">Monitor and moderate customer reviews and ratings</p>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Total Reviews</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">8,456</div>
              <p className="text-xs text-green-600">+89 this week</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Average Rating</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold flex items-center">
                4.7
                <Star className="h-5 w-5 text-yellow-400 fill-current ml-1" />
              </div>
              <p className="text-xs text-green-600">+0.1 this month</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Pending Review</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-yellow-600">23</div>
              <p className="text-xs text-gray-500">Awaiting moderation</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Flagged Reviews</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-red-600">7</div>
              <p className="text-xs text-gray-500">Require attention</p>
            </CardContent>
          </Card>
        </div>

        {/* Reviews Management */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <MessageSquare className="h-5 w-5 mr-2" />
              Review Directory
            </CardTitle>
            <CardDescription>View and moderate all customer reviews</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center space-x-4 mb-6">
              <div className="relative flex-1 max-w-sm">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Search reviews..."
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
                  <DropdownMenuItem onClick={() => setStatusFilter("all")}>All Statuses</DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setStatusFilter("approved")}>Approved</DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setStatusFilter("pending")}>Pending</DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setStatusFilter("flagged")}>Flagged</DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setStatusFilter("rejected")}>Rejected</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline">
                    <Filter className="h-4 w-4 mr-2" />
                    Rating: {ratingFilter === "all" ? "All" : `${ratingFilter} stars`}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem onClick={() => setRatingFilter("all")}>All Ratings</DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setRatingFilter("5")}>5 Stars</DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setRatingFilter("4")}>4 Stars</DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setRatingFilter("3")}>3 Stars</DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setRatingFilter("2")}>2 Stars</DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setRatingFilter("1")}>1 Star</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>

            {/* Reviews Table */}
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Review Details</TableHead>
                    <TableHead>Customer</TableHead>
                    <TableHead>Salon & Service</TableHead>
                    <TableHead>Rating</TableHead>
                    <TableHead>Engagement</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredReviews.map((review) => (
                    <TableRow key={review.id}>
                      <TableCell>
                        <div className="max-w-md">
                          <div className="font-medium mb-1">{review.title}</div>
                          <div className="text-sm text-gray-600 line-clamp-2">{review.comment}</div>
                          <div className="flex items-center text-sm text-gray-500 mt-2">
                            <Calendar className="h-3 w-3 mr-1" />
                            {new Date(review.date).toLocaleDateString()}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="space-y-1">
                          <div className="flex items-center">
                            <User className="h-3 w-3 mr-2 text-gray-400" />
                            <span className="font-medium">{review.customerName}</span>
                          </div>
                          <div className="text-sm text-gray-500">{review.customerEmail}</div>
                          <div className="text-sm text-gray-500">Booking #{review.bookingId}</div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="space-y-1">
                          <div className="flex items-center">
                            <Building2 className="h-3 w-3 mr-2 text-gray-400" />
                            <span className="font-medium">{review.salonName}</span>
                          </div>
                          <div className="text-sm text-gray-500">{review.serviceName}</div>
                        </div>
                      </TableCell>
                      <TableCell>{renderStars(review.rating)}</TableCell>
                      <TableCell>
                        <div className="space-y-1">
                          <div className="flex items-center text-sm">
                            <ThumbsUp className="h-3 w-3 mr-1 text-green-500" />
                            <span>{review.helpful} helpful</span>
                          </div>
                          {review.reported > 0 && (
                            <div className="flex items-center text-sm text-red-600">
                              <AlertTriangle className="h-3 w-3 mr-1" />
                              <span>{review.reported} reports</span>
                            </div>
                          )}
                        </div>
                      </TableCell>
                      <TableCell>{getStatusBadge(review.status)}</TableCell>
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
                              View Full Review
                            </DropdownMenuItem>
                            {review.status === "pending" && (
                              <>
                                <DropdownMenuItem onClick={() => handleApproveReview(review.id)}>
                                  <CheckCircle className="h-4 w-4 mr-2" />
                                  Approve Review
                                </DropdownMenuItem>
                                <DropdownMenuItem onClick={() => handleRejectReview(review.id)}>
                                  <XCircle className="h-4 w-4 mr-2" />
                                  Reject Review
                                </DropdownMenuItem>
                              </>
                            )}
                            {review.status === "approved" && (
                              <DropdownMenuItem onClick={() => handleFlagReview(review.id)}>
                                <Flag className="h-4 w-4 mr-2" />
                                Flag Review
                              </DropdownMenuItem>
                            )}
                            <DropdownMenuItem>
                              <User className="h-4 w-4 mr-2" />
                              Contact Customer
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Building2 className="h-4 w-4 mr-2" />
                              Contact Salon
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
  )
}
