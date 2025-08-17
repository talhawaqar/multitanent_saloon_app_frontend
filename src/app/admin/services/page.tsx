"use client";

import { useCallback, useMemo, useState } from "react";
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
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Search,
  Filter,
  MoreHorizontal,
  Plus,
  Edit,
  Trash2,
  Scissors,
} from "lucide-react";
import { CategoryType, ServiceType } from "../../types";
import {
  useCreateCategory,
  useUpdateCategory,
  useCreateService,
  useUpdateService,
} from "@/app/mutations";
import { ModelStatus } from "../../constants";
import { useListAllCategories, useListAllServices } from "@/app/queries";

export default function ManageServices() {
  const { mutateAsync: createCategory } = useCreateCategory();
  const { mutateAsync: updateCategory } = useUpdateCategory();
  const { mutateAsync: createService } = useCreateService();
  const { mutateAsync: updateService } = useUpdateService();

  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [isAddDialogOpen, setIsAddDialogOpen] = useState({
    dialog: false,
    isEdit: false,
  });
  const [newService, setNewService] = useState<ServiceType>({
    name: "",
    categoryId: 0,
    description: "",
    status: ModelStatus.Active,
  });

  const { data: listAllCategories = [] } = useListAllCategories({});
  const { data: listAllServices = [] } = useListAllServices({});

  const [isAddCategoryDialogOpen, setIsAddCategoryDialogOpen] = useState({
    dialog: false,
    isEdit: false,
  });

  const [newCategory, setNewCategory] = useState<CategoryType>({
    name: "",
    description: "",
    status: ModelStatus.Active,
  });

  const [newCategoryError, setNewCategoryError] = useState({
    categoryName: false,
    categoryDescription: false,
  });

  const [activeTab, setActiveTab] = useState("services"); // "services" or "categories"

  const activeCategories = useMemo(
    () => listAllCategories.filter((c) => c.status == ModelStatus.Active),
    [listAllCategories]
  );

  const filteredServices = listAllServices.filter((service) => {
    const matchesSearch =
      service.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      service.category?.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory =
      categoryFilter === "all" || service.category?.name === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  const handleAddService = async () => {
    if (isAddDialogOpen.isEdit) {
      await updateService(newService);
    } else {
      await createService(newService);
    }
    setIsAddDialogOpen((prev) => ({ ...prev, dialog: false, isEdit: false }));
    setNewService({
      name: "",
      categoryId: 0,
      description: "",
      status: ModelStatus.Active,
    });
  };

  const handleEditServiceClick = useCallback((service: ServiceType) => {
    setNewService(service);
    setIsAddDialogOpen((prev) => ({ ...prev, isEdit: true, dialog: true }));
  }, []);

  const handleDeleteService = (service: ServiceType) => {
    updateService({ ...service, status: ModelStatus.InActive });
  };

  const handleAddCategory = async () => {
    if (isAddCategoryDialogOpen.isEdit) {
      await updateCategory(newCategory);
    } else {
      await createCategory(newCategory);
    }
    setIsAddCategoryDialogOpen((prev) => ({
      ...prev,
      dialog: false,
      isEdit: false,
    }));
    setNewCategory({ name: "", description: "", status: ModelStatus.Active });
  };

  const handleEditCategoryClick = (category: CategoryType) => {
    setIsAddCategoryDialogOpen((prev) => ({
      ...prev,
      dialog: true,
      isEdit: true,
    }));

    setNewCategory(category);
  };

  const handleDeleteCategory = async (category: CategoryType) => {
    await updateCategory({ ...category, status: ModelStatus.InActive });
  };

  const getStatusBadge = (status: string) => {
    return status === ModelStatus.Active ? (
      <Badge className="bg-green-100 text-green-800">Active</Badge>
    ) : (
      <Badge className="bg-gray-100 text-gray-800">Inactive</Badge>
    );
  };

  const validateNewCategory = (e: React.FocusEvent<HTMLInputElement>) => {
    setNewCategoryError((prev) => ({
      ...prev,
      [e.target.id]: !!e.target.value.trim() ? false : true,
    }));
  };

  const { activeServicesCount, activeServicePercentage } = useMemo(() => {
    const activeServicesCount = listAllServices.filter(
      (service) => service.status === ModelStatus.Active
    ).length;

    const activeServicePercentage = (
      (activeServicesCount / listAllServices.length) *
      100
    ).toFixed(2);

    return { activeServicesCount, activeServicePercentage };
  }, [listAllServices]);

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Page Header with Tabs */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                Manage Services
              </h1>
              <p className="text-gray-600 mt-2">
                Manage platform-wide services and categories
              </p>
            </div>
            <div className="flex space-x-2">
              {activeTab === "categories" && (
                <Dialog
                  open={!!isAddCategoryDialogOpen.dialog}
                  onOpenChange={() =>
                    setIsAddCategoryDialogOpen((prev) => ({
                      ...prev,
                      dialog: true,
                    }))
                  }
                >
                  <DialogTrigger asChild>
                    <Button className="bg-purple-600 hover:bg-purple-700">
                      <Plus className="h-4 w-4 mr-2" />
                      Add New Category
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>
                        {!!isAddCategoryDialogOpen.isEdit
                          ? "Edit Category"
                          : "Add New Category"}
                      </DialogTitle>
                      <DialogDescription>
                        {!!isAddCategoryDialogOpen.isEdit
                          ? ""
                          : "Create a new service category for organizing services."}
                      </DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="categoryName">Category Name</Label>
                        <Input
                          id="categoryName"
                          value={newCategory.name}
                          onChange={(e) =>
                            setNewCategory({
                              ...newCategory,
                              name: e.target.value,
                            })
                          }
                          placeholder="e.g., Hair Services"
                          onBlur={validateNewCategory}
                        />
                        {newCategoryError.categoryName && (
                          <p className="text-red-500 text-sm font-semibold">
                            Name is required
                          </p>
                        )}
                      </div>
                      <div>
                        <Label htmlFor="categoryDescription">Description</Label>
                        <Textarea
                          id="categoryDescription"
                          value={newCategory.description}
                          onChange={(e) =>
                            setNewCategory({
                              ...newCategory,
                              description: e.target.value,
                            })
                          }
                          placeholder="Describe the category..."
                          rows={3}
                        />
                        {newCategoryError.categoryDescription && (
                          <p className="text-red-500 text-sm font-semibold">
                            Description is required
                          </p>
                        )}
                      </div>
                      <div className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          id="categoryStatus"
                          checked={newCategory.status == ModelStatus.Active}
                          onChange={(e) =>
                            setNewCategory({
                              ...newCategory,
                              status: e.target.checked
                                ? ModelStatus.Active
                                : ModelStatus.InActive,
                            })
                          }
                          className="rounded border-gray-300 text-purple-600 focus:ring-purple-500"
                        />
                        <Label
                          htmlFor="categoryStatus"
                          className="text-sm font-medium"
                        >
                          Active (category will be available for use)
                        </Label>
                      </div>
                    </div>
                    <DialogFooter>
                      <Button
                        variant="outline"
                        onClick={() => setIsAddCategoryDialogOpen(false)}
                      >
                        Cancel
                      </Button>
                      <Button
                        disabled={
                          newCategoryError.categoryName ||
                          newCategoryError.categoryDescription
                        }
                        onClick={handleAddCategory}
                        className="bg-purple-600 hover:bg-purple-700"
                      >
                        {isAddCategoryDialogOpen.isEdit
                          ? "Edit Category"
                          : "Add Category"}
                      </Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              )}

              {activeTab === "services" && (
                <Dialog
                  open={isAddDialogOpen.dialog}
                  onOpenChange={() =>
                    setIsAddDialogOpen((prev) => ({ ...prev, dialog: true }))
                  }
                >
                  <DialogTrigger asChild>
                    <Button className="bg-purple-600 hover:bg-purple-700">
                      <Plus className="h-4 w-4 mr-2" />
                      {isAddDialogOpen.isEdit
                        ? "Edit Service"
                        : "Add New Service"}
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>
                        {isAddDialogOpen.isEdit
                          ? "Edit Service"
                          : "Add New Service"}
                      </DialogTitle>
                      {!isAddDialogOpen.isEdit && (
                        <DialogDescription a new service that salonsscription>
                          can offer to their customers.
                        </DialogDescription>
                      )}
                    </DialogHeader>
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="serviceName">Service Name</Label>
                        <Input
                          id="serviceName"
                          value={newService.name}
                          onChange={(e) =>
                            setNewService({
                              ...newService,
                              name: e.target.value,
                            })
                          }
                          placeholder="e.g., Deep Conditioning Treatment"
                        />
                      </div>
                      <div>
                        <Label htmlFor="serviceCategory">Category</Label>
                        <select
                          id="serviceCategory"
                          value={newService.categoryId.toString()}
                          onChange={(e) =>
                            setNewService({
                              ...newService,
                              categoryId: parseInt(e.target.value),
                            })
                          }
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                        >
                          <option value="">Select a category</option>
                          {activeCategories.map((category) => (
                            <option key={category.id} value={category.id}>
                              {category.name}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <Label htmlFor="serviceDescription">Description</Label>
                        <Textarea
                          id="serviceDescription"
                          value={newService.description}
                          onChange={(e) =>
                            setNewService({
                              ...newService,
                              description: e.target.value,
                            })
                          }
                          placeholder="Describe the service..."
                          rows={3}
                        />
                      </div>
                      <div className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          id="serviceStatus"
                          checked={newService.status == ModelStatus.Active}
                          onChange={(e) =>
                            setNewService({
                              ...newService,
                              status: e.target.checked
                                ? ModelStatus.Active
                                : ModelStatus.InActive,
                            })
                          }
                          className="rounded border-gray-300 text-purple-600 focus:ring-purple-500"
                        />
                        <Label
                          htmlFor="categoryStatus"
                          className="text-sm font-medium"
                        >
                          Active (Service will be available for use)
                        </Label>
                      </div>
                    </div>
                    <DialogFooter>
                      <Button
                        variant="outline"
                        onClick={() =>
                          setIsAddDialogOpen((prev) => ({
                            ...prev,
                            isEdit: false,
                            dialog: false,
                          }))
                        }
                      >
                        Cancel
                      </Button>
                      <Button
                        onClick={handleAddService}
                        className="bg-purple-600 hover:bg-purple-700"
                      >
                        {isAddDialogOpen.isEdit
                          ? "Edit Service"
                          : "Add Service"}
                      </Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              )}
            </div>
          </div>

          {/* Tabs */}
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex space-x-8">
              <button
                onClick={() => setActiveTab("services")}
                className={`py-2 px-1 border-b-2 font-medium text-sm ${
                  activeTab === "services"
                    ? "border-purple-500 text-purple-600"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }`}
              >
                Services ({filteredServices.length})
              </button>
              <button
                onClick={() => setActiveTab("categories")}
                className={`py-2 px-1 border-b-2 font-medium text-sm ${
                  activeTab === "categories"
                    ? "border-purple-500 text-purple-600"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }`}
              >
                Categories ({listAllCategories.length})
              </button>
            </nav>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">
                Total Services
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{listAllServices.length}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">
                Active Services
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">
                {activeServicesCount}
              </div>
              <p className="text-xs text-gray-500">
                {" "}
                {activeServicePercentage}% of total
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">
                Categories
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">12</div>
              <p className="text-xs text-gray-500">Service categories</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">
                Avg. Bookings
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">1,247</div>
              <p className="text-xs text-green-600">+8% this month</p>
            </CardContent>
          </Card>
        </div>

        {/* Categories Table View */}
        {activeTab === "categories" && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Scissors className="h-5 w-5 mr-2" />
                Service Categories
              </CardTitle>
              <CardDescription>
                Manage service categories and organization
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center space-x-4 mb-6">
                <div className="relative flex-1 max-w-sm">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input placeholder="Search categories..." className="pl-10" />
                </div>
              </div>

              {/* Categories Table */}
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Category Name</TableHead>
                      <TableHead>Description</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {listAllCategories.map((category: CategoryType) => (
                      <TableRow key={category.id}>
                        <TableCell>
                          <div>
                            <div className="font-medium">{category.name}</div>
                            {/* <div className="text-sm text-gray-500">
                              {category.serviceCount} services •{" "}
                              {category.totalBookings.toLocaleString()} bookings
                            </div> */}
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="max-w-md">
                            <p className="text-sm text-gray-900">
                              {category.description}
                            </p>
                          </div>
                        </TableCell>
                        <TableCell>{getStatusBadge(category.status)}</TableCell>
                        <TableCell>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" className="h-8 w-8 p-0">
                                <MoreHorizontal className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem
                                onClick={() =>
                                  handleEditCategoryClick(category)
                                }
                              >
                                <Edit className="h-4 w-4 mr-2" />
                                Edit Category
                              </DropdownMenuItem>
                              <DropdownMenuItem
                                onClick={() => handleDeleteCategory(category)}
                                className="text-red-600"
                              >
                                <Trash2 className="h-4 w-4 mr-2" />
                                Delete Category
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
        )}

        {/* Services Management */}
        {activeTab === "services" && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Scissors className="h-5 w-5 mr-2" />
                Service Directory
              </CardTitle>
              <CardDescription>
                Manage all available services on the platform
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center space-x-4 mb-6">
                <div className="relative flex-1 max-w-sm">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input
                    placeholder="Search services..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>

                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline">
                      <Filter className="h-4 w-4 mr-2" />
                      Category:{" "}
                      {categoryFilter === "all" ? "All" : categoryFilter}
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuItem onClick={() => setCategoryFilter("all")}>
                      All Categories
                    </DropdownMenuItem>
                    {listAllCategories.map((category) => (
                      <DropdownMenuItem
                        key={category.id}
                        onClick={() => setCategoryFilter(category.name)}
                      >
                        {category.name}
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>

              {/* Services Table */}
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Service Details</TableHead>
                      <TableHead>Category</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredServices.map((service) => (
                      <TableRow key={service.id}>
                        <TableCell>
                          <div>
                            <div className="font-medium">{service.name}</div>
                            <div className="text-sm text-gray-500 mt-1">
                              {service.description}
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline">
                            {service.category?.name}
                          </Badge>
                        </TableCell>

                        <TableCell>{getStatusBadge(service.status)}</TableCell>
                        <TableCell>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" className="h-8 w-8 p-0">
                                <MoreHorizontal className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem
                                onClick={() => handleEditServiceClick(service)}
                              >
                                <Edit className="h-4 w-4 mr-2" />
                                Edit Service
                              </DropdownMenuItem>
                              <DropdownMenuItem
                                onClick={() => handleDeleteService(service)}
                                className="text-red-600"
                              >
                                <Trash2 className="h-4 w-4 mr-2" />
                                Delete Service
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
        )}
      </div>
    </AdminLayout>
  );
}
