"use client";
import { useMemo, useState } from "react";
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
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
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
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
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
  Phone,
  Mail,
  Globe,
  Clock,
  DollarSign,
  Users,
  Scissors,
  Save,
  X,
  Plus,
  Trash2,
  BarChart3,
  User,
  Camera,
} from "lucide-react";
import {
  useBusinessEntityMainInfo,
  useBusinessEntityById,
} from "@/app/queries";
import { BusinessEntityStatus } from "@/app/constants";
import { BusinessEntityMainInfoType } from "@/app/types";

// Available services from backend (like in salon signup)
const availableServices = [
  { id: 1, name: "Haircut" },
  { id: 2, name: "Hair Coloring" },
  { id: 3, name: "Hair Styling" },
  { id: 4, name: "Manicure" },
  { id: 5, name: "Pedicure" },
  { id: 6, name: "Facial Treatment" },
  { id: 7, name: "Eyebrow Threading" },
  { id: 8, name: "Hair Wash & Blow Dry" },
  { id: 9, name: "Deep Conditioning" },
  { id: 10, name: "Massage" },
  { id: 11, name: "Highlights" },
  { id: 12, name: "Keratin Treatment" },
  { id: 13, name: "Beard Trim" },
  { id: 14, name: "Kids Haircut" },
  { id: 15, name: "Bridal Package" },
  { id: 16, name: "Hair Extensions" },
  { id: 17, name: "Premium Cut & Style" },
  { id: 18, name: "Basic Haircut" },
];

export default function ManageSalons() {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [selectedSalon, setSelectedSalon] = useState<any>(null);
  const [isViewMode, setIsViewMode] = useState(true);
  const [editedSalon, setEditedSalon] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedBusinessEntityId, setSelectedBusinessEntityId] =
    useState<number>();

  const { data: businessEntities = [] } = useBusinessEntityMainInfo({});
  const { data: selectedBusinessEntity } = useBusinessEntityById(
    selectedBusinessEntityId
  );

  console.log("selected Entity", selectedBusinessEntity);

  const { activeEntitiesCount, pendingEntitiesCount, suspendedEntitiesCount } =
    useMemo(
      () => ({
        activeEntitiesCount: businessEntities.filter(
          (be) => be.status == BusinessEntityStatus.Active
        ).length,
        pendingEntitiesCount: businessEntities.filter(
          (be) => be.status == BusinessEntityStatus.Pending
        ).length,
        suspendedEntitiesCount: businessEntities.filter(
          (be) => be.status == BusinessEntityStatus.Suspended
        ).length,
      }),
      [businessEntities]
    );

  const filteredSalons = businessEntities.filter((salon) => {
    const matchesSearch =
      salon.business_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      salon.owner_name.toLowerCase().includes(searchTerm.toLowerCase());
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

  const handleViewDetails = (salon: BusinessEntityMainInfoType) => {
    setSelectedBusinessEntityId(salon.business_id);
    // setSelectedSalon(salon);
    // setEditedSalon({ ...salon });
    setIsViewMode(true);
    setIsModalOpen(true);
  };

  const handleEditSalon = (salon: BusinessEntityMainInfoType) => {
    setSelectedSalon(salon);
    setEditedSalon({ ...salon });
    setIsViewMode(false);
    setIsModalOpen(true);
  };

  const handleSaveChanges = () => {
    // Validate at least one service
    if (editedSalon.services.length === 0) {
      alert("At least one service must be offered by the salon.");
      return;
    }

    // Validate service prices and durations
    const invalidServices = editedSalon.services.filter(
      (service) => service.price <= 0 || service.duration < 15
    );

    if (invalidServices.length > 0) {
      alert(
        "All services must have a valid price (> $0) and duration (≥ 15 minutes)."
      );
      return;
    }

    // Here you would make an API call to save the changes
    console.log("Saving changes:", editedSalon);
    setIsViewMode(true);
    // Update the salon in the list
    // setSalons(prev => prev.map(s => s.id === editedSalon.id ? editedSalon : s))
  };

  const handleApprove = (salonId: number) => {
    console.log("Approving salon:", salonId);
    // API call to approve salon
  };

  const handleSuspend = (salonId: number) => {
    console.log("Suspending salon:", salonId);
    // API call to suspend salon
  };

  const addLocation = () => {
    const newLocation = {
      id: Date.now(),
      name: "",
      address: "",
      phone: "",
      hours: "",
      images: [],
    };
    setEditedSalon((prev) => ({
      ...prev,
      locations: [...prev.locations, newLocation],
    }));
  };

  const removeLocation = (locationId: number) => {
    setEditedSalon((prev) => ({
      ...prev,
      locations: prev.locations.filter((loc) => loc.id !== locationId),
    }));
  };

  const addService = (serviceId: number) => {
    const selectedService = availableServices.find(
      (service) => service.id === serviceId
    );
    if (
      selectedService &&
      !editedSalon.services.find((s) => s.id === serviceId)
    ) {
      const newService = {
        id: selectedService.id,
        name: selectedService.name,
        price: 0,
        duration: 30,
      };
      setEditedSalon((prev) => ({
        ...prev,
        services: [...prev.services, newService],
      }));
    }
  };

  const removeService = (serviceId: number) => {
    setEditedSalon((prev) => ({
      ...prev,
      services: prev.services.filter((service) => service.id !== serviceId),
    }));
  };

  const handleImageUpload = (locationIndex: number, files: FileList | null) => {
    if (!files) return;

    const newFiles = Array.from(files);
    const currentImages = editedSalon.locations[locationIndex].images;
    const totalImages = currentImages.length + newFiles.length;

    if (totalImages > 5) {
      alert("You can only upload up to 5 images per location");
      return;
    }

    const updatedLocations = [...editedSalon.locations];
    const newImageUrls = newFiles.map((file) => URL.createObjectURL(file));
    updatedLocations[locationIndex].images = [
      ...currentImages,
      ...newImageUrls,
    ];
    setEditedSalon((prev) => ({ ...prev, locations: updatedLocations }));
  };

  const removeImage = (locationIndex: number, imageIndex: number) => {
    const updatedLocations = [...editedSalon.locations];
    updatedLocations[locationIndex].images = updatedLocations[
      locationIndex
    ].images.filter((_, index) => index !== imageIndex);
    setEditedSalon((prev) => ({ ...prev, locations: updatedLocations }));
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
              <div className="text-2xl font-bold">
                {businessEntities.length}
              </div>
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
              <div className="text-2xl font-bold text-green-600">
                {activeEntitiesCount}
              </div>
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
              <div className="text-2xl font-bold text-yellow-600">
                {pendingEntitiesCount}
              </div>
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
              <div className="text-2xl font-bold text-red-600">
                {suspendedEntitiesCount}
              </div>
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
                    <TableRow key={salon.business_id}>
                      <TableCell>
                        <div>
                          <div className="font-medium">{salon.name}</div>
                          <div className="text-sm text-gray-500 flex items-center mt-1">
                            <Calendar className="h-3 w-3 mr-1" />
                            Joined{" "}
                            {new Date(
                              salon.business_created_at
                            ).toLocaleDateString()}
                          </div>
                          <div className="text-sm text-gray-500">
                            {salon.no_of_services} services offered
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div>
                          <div className="font-medium">{salon.owner_name}</div>
                          <div className="text-sm text-gray-500">
                            {salon.owner_email}
                          </div>
                          <div className="text-sm text-gray-500">
                            {salon.owner_contact}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-start">
                          <MapPin className="h-4 w-4 text-gray-400 mr-1 mt-0.5" />
                          <span className="text-sm">
                            {salon.location_addresses[0]}
                          </span>
                        </div>
                        {salon.location_addresses.length > 1 && (
                          <div className="text-xs text-gray-500 mt-1">
                            +{salon.location_addresses.length - 1} more location
                            {salon.location_addresses.length > 2 ? "s" : ""}
                          </div>
                        )}
                      </TableCell>
                      <TableCell>
                        <div className="space-y-1">
                          <div className="flex items-center">
                            <Star className="h-3 w-3 text-yellow-400 mr-1" />
                            <span className="text-sm font-medium">
                              {salon.average_rating}
                            </span>
                          </div>
                          <div className="text-sm text-gray-500">
                            {salon.total_bookings} bookings
                          </div>
                          {/* <div className="text-sm font-medium text-green-600">
                            ${salon.revenue.toLocaleString()}
                          </div> */}
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
                            <DropdownMenuItem
                              onClick={() => handleViewDetails(salon)}
                            >
                              <Eye className="h-4 w-4 mr-2" />
                              View Details
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              onClick={() => handleEditSalon(salon)}
                            >
                              <Edit className="h-4 w-4 mr-2" />
                              Edit Salon
                            </DropdownMenuItem>
                            {salon.status === "pending" && (
                              <DropdownMenuItem
                                onClick={() => handleApprove(salon.business_id)}
                              >
                                <CheckCircle className="h-4 w-4 mr-2" />
                                Approve
                              </DropdownMenuItem>
                            )}
                            {salon.status === "active" && (
                              <DropdownMenuItem
                                onClick={() => handleSuspend(salon.business_id)}
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

        {/* Salon Details/Edit Modal */}
        <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <div className="flex items-center justify-between">
                <div>
                  <DialogTitle className="text-2xl">
                    {isViewMode ? "Salon Details" : "Edit Salon"}
                  </DialogTitle>
                  <DialogDescription>
                    {isViewMode
                      ? "View comprehensive information about this salon"
                      : "Edit salon information, locations, and services"}
                  </DialogDescription>
                </div>
                <div className="flex items-center space-x-2">
                  {!isViewMode && (
                    <Button
                      onClick={handleSaveChanges}
                      className="bg-green-600 hover:bg-green-700"
                    >
                      <Save className="h-4 w-4 mr-2" />
                      Save Changes
                    </Button>
                  )}
                  {isViewMode && (
                    <Button
                      onClick={() => setIsViewMode(false)}
                      variant="outline"
                    >
                      <Edit className="h-4 w-4 mr-2" />
                      Edit
                    </Button>
                  )}
                  <Button
                    variant="outline"
                    onClick={() => setIsModalOpen(false)}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </DialogHeader>

            {selectedSalon && (
              <Tabs defaultValue="overview" className="w-full">
                <TabsList className="grid w-full grid-cols-4">
                  <TabsTrigger value="overview">Overview</TabsTrigger>
                  <TabsTrigger value="owner">Owner Info</TabsTrigger>
                  <TabsTrigger value="locations">Locations</TabsTrigger>
                  <TabsTrigger value="services">Services</TabsTrigger>
                </TabsList>

                <TabsContent value="overview" className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Card>
                      <CardHeader>
                        <CardTitle className="flex items-center">
                          <Users className="h-5 w-5 mr-2" />
                          Business Information
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div>
                          <Label htmlFor="salonName">Salon Name</Label>
                          {isViewMode ? (
                            <p className="text-sm text-gray-900 mt-1">
                              {selectedSalon.name}
                            </p>
                          ) : (
                            <Input
                              id="salonName"
                              value={editedSalon.name}
                              onChange={(e) =>
                                setEditedSalon((prev) => ({
                                  ...prev,
                                  name: e.target.value,
                                }))
                              }
                            />
                          )}
                        </div>
                        <div>
                          <Label htmlFor="description">Description</Label>
                          {isViewMode ? (
                            <p className="text-sm text-gray-900 mt-1">
                              {selectedSalon.business.description}
                            </p>
                          ) : (
                            <Textarea
                              id="description"
                              value={editedSalon.business.description}
                              onChange={(e) =>
                                setEditedSalon((prev) => ({
                                  ...prev,
                                  business: {
                                    ...prev.business,
                                    description: e.target.value,
                                  },
                                }))
                              }
                              rows={3}
                            />
                          )}
                        </div>
                        <div>
                          <Label htmlFor="website">Website</Label>
                          {isViewMode ? (
                            <p className="text-sm text-gray-900 mt-1 flex items-center">
                              <Globe className="h-4 w-4 mr-2" />
                              <a
                                href={selectedSalon.business.website}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-blue-600 hover:underline"
                              >
                                {selectedSalon.business.website}
                              </a>
                            </p>
                          ) : (
                            <Input
                              id="website"
                              value={editedSalon.business.website}
                              onChange={(e) =>
                                setEditedSalon((prev) => ({
                                  ...prev,
                                  business: {
                                    ...prev.business,
                                    website: e.target.value,
                                  },
                                }))
                              }
                            />
                          )}
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <Label htmlFor="taxId">Tax ID</Label>
                            {isViewMode ? (
                              <p className="text-sm text-gray-900 mt-1">
                                {selectedSalon.business.taxId}
                              </p>
                            ) : (
                              <Input
                                id="taxId"
                                value={editedSalon.business.taxId}
                                onChange={(e) =>
                                  setEditedSalon((prev) => ({
                                    ...prev,
                                    business: {
                                      ...prev.business,
                                      taxId: e.target.value,
                                    },
                                  }))
                                }
                              />
                            )}
                          </div>
                          <div>
                            <Label htmlFor="licenseNumber">
                              License Number
                            </Label>
                            {isViewMode ? (
                              <p className="text-sm text-gray-900 mt-1">
                                {selectedSalon.business.licenseNumber}
                              </p>
                            ) : (
                              <Input
                                id="licenseNumber"
                                value={editedSalon.business.licenseNumber}
                                onChange={(e) =>
                                  setEditedSalon((prev) => ({
                                    ...prev,
                                    business: {
                                      ...prev.business,
                                      licenseNumber: e.target.value,
                                    },
                                  }))
                                }
                              />
                            )}
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader>
                        <CardTitle className="flex items-center">
                          <BarChart3 className="h-5 w-5 mr-2" />
                          Performance Metrics
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                          <div className="text-center p-4 bg-green-50 rounded-lg">
                            <div className="text-2xl font-bold text-green-600">
                              {selectedSalon.rating}
                            </div>
                            <div className="text-sm text-gray-600 flex items-center justify-center">
                              <Star className="h-4 w-4 mr-1" />
                              Rating
                            </div>
                          </div>
                          <div className="text-center p-4 bg-blue-50 rounded-lg">
                            <div className="text-2xl font-bold text-blue-600">
                              {selectedSalon.bookings}
                            </div>
                            <div className="text-sm text-gray-600 flex items-center justify-center">
                              <Calendar className="h-4 w-4 mr-1" />
                              Bookings
                            </div>
                          </div>
                        </div>
                        <div className="text-center p-4 bg-purple-50 rounded-lg">
                          <div className="text-2xl font-bold text-purple-600">
                            ${selectedSalon.revenue.toLocaleString()}
                          </div>
                          <div className="text-sm text-gray-600 flex items-center justify-center">
                            <DollarSign className="h-4 w-4 mr-1" />
                            Total Revenue
                          </div>
                        </div>
                        <div className="flex items-center justify-center">
                          {getStatusBadge(selectedSalon.status)}
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </TabsContent>

                <TabsContent value="owner" className="space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center">
                        <User className="h-5 w-5 mr-2" />
                        Owner Information
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div>
                        <Label htmlFor="ownerName">Full Name</Label>
                        {isViewMode ? (
                          <p className="text-sm text-gray-900 mt-1">
                            {selectedSalon.owner.name}
                          </p>
                        ) : (
                          <Input
                            id="ownerName"
                            value={editedSalon.owner.name}
                            onChange={(e) =>
                              setEditedSalon((prev) => ({
                                ...prev,
                                owner: { ...prev.owner, name: e.target.value },
                              }))
                            }
                          />
                        )}
                      </div>
                      <div>
                        <Label htmlFor="ownerEmail">Email Address</Label>
                        {isViewMode ? (
                          <p className="text-sm text-gray-900 mt-1 flex items-center">
                            <Mail className="h-4 w-4 mr-2" />
                            {selectedSalon.owner.email}
                          </p>
                        ) : (
                          <Input
                            id="ownerEmail"
                            type="email"
                            value={editedSalon.owner.email}
                            onChange={(e) =>
                              setEditedSalon((prev) => ({
                                ...prev,
                                owner: { ...prev.owner, email: e.target.value },
                              }))
                            }
                          />
                        )}
                      </div>
                      <div>
                        <Label htmlFor="ownerPhone">Phone Number</Label>
                        {isViewMode ? (
                          <p className="text-sm text-gray-900 mt-1 flex items-center">
                            <Phone className="h-4 w-4 mr-2" />
                            {selectedSalon.owner.phone}
                          </p>
                        ) : (
                          <Input
                            id="ownerPhone"
                            type="tel"
                            value={editedSalon.owner.phone}
                            onChange={(e) =>
                              setEditedSalon((prev) => ({
                                ...prev,
                                owner: { ...prev.owner, phone: e.target.value },
                              }))
                            }
                          />
                        )}
                      </div>
                      <div>
                        <Label>Join Date</Label>
                        <p className="text-sm text-gray-900 mt-1 flex items-center">
                          <Calendar className="h-4 w-4 mr-2" />
                          {new Date(
                            selectedSalon.owner.joinDate
                          ).toLocaleDateString()}
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="locations" className="space-y-6">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold">Salon Locations</h3>
                    {!isViewMode && (
                      <Button onClick={addLocation} size="sm">
                        <Plus className="h-4 w-4 mr-2" />
                        Add Location
                      </Button>
                    )}
                  </div>

                  <div className="space-y-4">
                    {(isViewMode
                      ? selectedSalon.locations
                      : editedSalon.locations
                    ).map((location, index) => (
                      <Card key={location.id}>
                        <CardHeader className="pb-3">
                          <div className="flex items-center justify-between">
                            <CardTitle className="text-base flex items-center">
                              <MapPin className="h-4 w-4 mr-2" />
                              Location {index + 1}
                            </CardTitle>
                            {!isViewMode &&
                              editedSalon.locations.length > 1 && (
                                <Button
                                  variant="outline"
                                  size="sm"
                                  onClick={() => removeLocation(location.id)}
                                  className="text-red-600 hover:text-red-700"
                                >
                                  <Trash2 className="h-4 w-4" />
                                </Button>
                              )}
                          </div>
                        </CardHeader>
                        <CardContent className="space-y-3">
                          <div>
                            <Label htmlFor={`locationName-${location.id}`}>
                              Location Name
                            </Label>
                            {isViewMode ? (
                              <p className="text-sm text-gray-900 mt-1">
                                {location.name}
                              </p>
                            ) : (
                              <Input
                                id={`locationName-${location.id}`}
                                value={location.name}
                                onChange={(e) => {
                                  const updatedLocations =
                                    editedSalon.locations.map((loc) =>
                                      loc.id === location.id
                                        ? { ...loc, name: e.target.value }
                                        : loc
                                    );
                                  setEditedSalon((prev) => ({
                                    ...prev,
                                    locations: updatedLocations,
                                  }));
                                }}
                              />
                            )}
                          </div>
                          <div>
                            <Label htmlFor={`locationAddress-${location.id}`}>
                              Address
                            </Label>
                            {isViewMode ? (
                              <p className="text-sm text-gray-900 mt-1">
                                {location.address}
                              </p>
                            ) : (
                              <Input
                                id={`locationAddress-${location.id}`}
                                value={location.address}
                                onChange={(e) => {
                                  const updatedLocations =
                                    editedSalon.locations.map((loc) =>
                                      loc.id === location.id
                                        ? { ...loc, address: e.target.value }
                                        : loc
                                    );
                                  setEditedSalon((prev) => ({
                                    ...prev,
                                    locations: updatedLocations,
                                  }));
                                }}
                              />
                            )}
                          </div>
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <Label htmlFor={`locationPhone-${location.id}`}>
                                Phone
                              </Label>
                              {isViewMode ? (
                                <p className="text-sm text-gray-900 mt-1 flex items-center">
                                  <Phone className="h-4 w-4 mr-2" />
                                  {location.phone}
                                </p>
                              ) : (
                                <Input
                                  id={`locationPhone-${location.id}`}
                                  value={location.phone}
                                  onChange={(e) => {
                                    const updatedLocations =
                                      editedSalon.locations.map((loc) =>
                                        loc.id === location.id
                                          ? { ...loc, phone: e.target.value }
                                          : loc
                                      );
                                    setEditedSalon((prev) => ({
                                      ...prev,
                                      locations: updatedLocations,
                                    }));
                                  }}
                                />
                              )}
                            </div>
                            <div>
                              <Label htmlFor={`locationHours-${location.id}`}>
                                Hours
                              </Label>
                              {isViewMode ? (
                                <p className="text-sm text-gray-900 mt-1 flex items-center">
                                  <Clock className="h-4 w-4 mr-2" />
                                  {location.hours}
                                </p>
                              ) : (
                                <Input
                                  id={`locationHours-${location.id}`}
                                  value={location.hours}
                                  onChange={(e) => {
                                    const updatedLocations =
                                      editedSalon.locations.map((loc) =>
                                        loc.id === location.id
                                          ? { ...loc, hours: e.target.value }
                                          : loc
                                      );
                                    setEditedSalon((prev) => ({
                                      ...prev,
                                      locations: updatedLocations,
                                    }));
                                  }}
                                />
                              )}
                            </div>
                          </div>
                          {/* Location Images */}
                          <div>
                            <Label>Location Images (Up to 5 images)</Label>
                            {isViewMode ? (
                              <div className="mt-2">
                                {location.images &&
                                location.images.length > 0 ? (
                                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                                    {location.images.map(
                                      (image, imageIndex) => (
                                        <div
                                          key={imageIndex}
                                          className="relative"
                                        >
                                          <img
                                            src={image || "/placeholder.svg"}
                                            alt={`${location.name} - Image ${
                                              imageIndex + 1
                                            }`}
                                            className="w-full h-32 object-cover rounded-lg border"
                                          />
                                        </div>
                                      )
                                    )}
                                  </div>
                                ) : (
                                  <p className="text-sm text-gray-500 mt-2">
                                    No images uploaded
                                  </p>
                                )}
                              </div>
                            ) : (
                              <div className="mt-2">
                                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-purple-400 transition-colors">
                                  <input
                                    type="file"
                                    multiple
                                    accept="image/*"
                                    onChange={(e) =>
                                      handleImageUpload(index, e.target.files)
                                    }
                                    className="hidden"
                                    id={`images-${location.id}`}
                                  />
                                  <label
                                    htmlFor={`images-${location.id}`}
                                    className="cursor-pointer flex flex-col items-center"
                                  >
                                    <Camera className="h-12 w-12 text-gray-400 mb-4" />
                                    <span className="text-sm font-medium text-gray-900">
                                      Click to upload images
                                    </span>
                                    <span className="text-sm text-gray-500">
                                      PNG, JPG, GIF up to 10MB each
                                    </span>
                                  </label>
                                </div>

                                {/* Image Preview */}
                                {location.images &&
                                  location.images.length > 0 && (
                                    <div className="mt-4 grid grid-cols-2 md:grid-cols-5 gap-4">
                                      {location.images.map(
                                        (image, imageIndex) => (
                                          <div
                                            key={imageIndex}
                                            className="relative"
                                          >
                                            <img
                                              src={image || "/placeholder.svg"}
                                              alt={`${location.name} - Image ${
                                                imageIndex + 1
                                              }`}
                                              className="w-full h-24 object-cover rounded-lg"
                                            />
                                            <button
                                              type="button"
                                              onClick={() =>
                                                removeImage(index, imageIndex)
                                              }
                                              className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
                                            >
                                              <X className="h-3 w-3" />
                                            </button>
                                          </div>
                                        )
                                      )}
                                    </div>
                                  )}

                                <p className="text-sm text-gray-500 mt-2">
                                  {location.images?.length || 0}/5 images
                                  uploaded
                                </p>
                              </div>
                            )}
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </TabsContent>

                <TabsContent value="services" className="space-y-6">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold">Services Offered</h3>
                    {!isViewMode && (
                      <div className="flex items-center space-x-2">
                        <select
                          onChange={(e) => {
                            const serviceId = Number.parseInt(e.target.value);
                            if (serviceId) {
                              addService(serviceId);
                              e.target.value = "";
                            }
                          }}
                          className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                        >
                          <option value="">Select a service to add</option>
                          {availableServices
                            .filter(
                              (service) =>
                                !editedSalon.services.find(
                                  (s) => s.id === service.id
                                )
                            )
                            .map((service) => (
                              <option key={service.id} value={service.id}>
                                {service.name}
                              </option>
                            ))}
                        </select>
                      </div>
                    )}
                  </div>

                  {/* Service validation message */}
                  {!isViewMode && editedSalon.services.length === 0 && (
                    <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                      <p className="text-sm text-yellow-800">
                        ⚠️ At least one service must be offered by the salon.
                      </p>
                    </div>
                  )}

                  <div className="space-y-4">
                    {(isViewMode
                      ? selectedSalon.services
                      : editedSalon.services
                    ).map((service, index) => (
                      <Card key={service.id}>
                        <CardHeader className="pb-3">
                          <div className="flex items-center justify-between">
                            <CardTitle className="text-base flex items-center">
                              <Scissors className="h-4 w-4 mr-2" />
                              {service.name}
                            </CardTitle>
                            {!isViewMode && editedSalon.services.length > 1 && (
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => removeService(service.id)}
                                className="text-red-600 hover:text-red-700"
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            )}
                          </div>
                        </CardHeader>
                        <CardContent className="space-y-3">
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <Label htmlFor={`servicePrice-${service.id}`}>
                                Price ($)
                              </Label>
                              {isViewMode ? (
                                <p className="text-sm text-gray-900 mt-1 flex items-center">
                                  <DollarSign className="h-4 w-4 mr-2" />$
                                  {service.price}
                                </p>
                              ) : (
                                <Input
                                  id={`servicePrice-${service.id}`}
                                  type="number"
                                  min="0"
                                  step="0.01"
                                  value={service.price}
                                  onChange={(e) => {
                                    const updatedServices =
                                      editedSalon.services.map((svc) =>
                                        svc.id === service.id
                                          ? {
                                              ...svc,
                                              price: Number(e.target.value),
                                            }
                                          : svc
                                      );
                                    setEditedSalon((prev) => ({
                                      ...prev,
                                      services: updatedServices,
                                    }));
                                  }}
                                  required
                                />
                              )}
                            </div>
                            <div>
                              <Label htmlFor={`serviceDuration-${service.id}`}>
                                Duration (minutes)
                              </Label>
                              {isViewMode ? (
                                <p className="text-sm text-gray-900 mt-1 flex items-center">
                                  <Clock className="h-4 w-4 mr-2" />
                                  {service.duration} min
                                </p>
                              ) : (
                                <Input
                                  id={`serviceDuration-${service.id}`}
                                  type="number"
                                  min="15"
                                  max="480"
                                  step="15"
                                  value={service.duration}
                                  onChange={(e) => {
                                    const updatedServices =
                                      editedSalon.services.map((svc) =>
                                        svc.id === service.id
                                          ? {
                                              ...svc,
                                              duration: Number(e.target.value),
                                            }
                                          : svc
                                      );
                                    setEditedSalon((prev) => ({
                                      ...prev,
                                      services: updatedServices,
                                    }));
                                  }}
                                  required
                                />
                              )}
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>

                  {(isViewMode ? selectedSalon.services : editedSalon.services)
                    .length === 0 && (
                    <div className="text-center py-8 text-gray-500">
                      <Scissors className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                      <p>No services selected yet.</p>
                    </div>
                  )}
                </TabsContent>
              </Tabs>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </AdminLayout>
  );
}
