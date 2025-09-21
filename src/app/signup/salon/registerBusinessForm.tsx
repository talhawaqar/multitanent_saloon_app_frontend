"use client";

import React, { Dispatch, SetStateAction, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { FormikProps, Form, Field, FieldArray, ErrorMessage } from "formik";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Plus,
  Trash2,
  X,
  MapPin,
  Phone,
  Mail,
  User,
  Building,
  Camera,
  Clock,
  Eye,
  EyeOff,
  Scissors,
} from "lucide-react";
import { registerBusinessFormValues, Service } from "@/app/types";
import { useListAllActiveServices } from "@/app/queries";

interface RegisterBusinessFormProps {
  setCurrentStep: Dispatch<SetStateAction<number>>;
  currentStep: number;
}

export const RegisterBusinessForm: React.FC<
  FormikProps<registerBusinessFormValues> & RegisterBusinessFormProps
> = React.memo(function RegisterBusinessForm({
  values,
  errors,
  touched,
  setFieldValue,
  validateForm,
  currentStep,
  setCurrentStep,
}) {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] =
    useState<boolean>(false);
  const { data: availableServices = [] } = useListAllActiveServices({});

  const addService = (serviceId: number) => {
    const selectedService = availableServices.find(
      (service) => service.id === serviceId
    );
    if (selectedService && !values.services.find((s) => s.id === serviceId)) {
      const newService: Service = {
        id: selectedService.id || 0,
        name: selectedService.name,
        duration: 60,
        price: 1,
      };
      setFieldValue("services", [...values.services, newService]);
    }
  };

  const removeService = (serviceId: number) => {
    const updatedServices = values.services.filter(
      (service: Service) => service.id !== serviceId
    );
    setFieldValue("services", updatedServices);
  };

  const updateServiceDuration = (serviceId: number, duration: number) => {
    const updatedServices = values.services.map((service: Service) =>
      service.id === serviceId ? { ...service, duration } : service
    );
    setFieldValue("services", updatedServices);
  };

  const updateServicePrice = (serviceId: number, price: number) => {
    const updatedServices = values.services.map((service: Service) =>
      service.id === serviceId ? { ...service, price } : service
    );
    setFieldValue("services", updatedServices);
  };

  const handleImageUpload = (locationIndex: number, files: FileList | null) => {
    if (!files) return;

    const newFiles = Array.from(files);
    const currentImages = values.locations[locationIndex].images;
    const totalImages = currentImages.length + newFiles.length;

    if (totalImages > 5) {
      alert("You can only upload up to 5 images per location");
      return;
    }

    const updatedLocations = [...values.locations];
    updatedLocations[locationIndex].images = [...currentImages, ...newFiles];
    setFieldValue("locations", updatedLocations);
  };

  const removeImage = (locationIndex: number, imageIndex: number) => {
    const updatedLocations = [...values.locations];
    updatedLocations[locationIndex].images = updatedLocations[
      locationIndex
    ].images.filter((_, index) => index !== imageIndex);
    setFieldValue("locations", updatedLocations);
  };

  return (
    <Form>
      {/* Step 1: Personal Information */}
      {currentStep === 1 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <User className="h-6 w-6 text-purple-600 mr-2" />
              Personal Information
            </CardTitle>
            <CardDescription>
              Tell us about yourself as the business owner
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="firstName">First Name *</Label>
                <Field
                  as={Input}
                  id="firstName"
                  name="firstName"
                  placeholder="John"
                  className={
                    errors.firstName && touched.firstName
                      ? "border-red-500"
                      : ""
                  }
                />
                <ErrorMessage
                  name="firstName"
                  component="p"
                  className="text-sm text-red-500 mt-1"
                />
              </div>
              <div>
                <Label htmlFor="lastName">Last Name *</Label>
                <Field
                  as={Input}
                  id="lastName"
                  name="lastName"
                  placeholder="Doe"
                  className={
                    errors.lastName && touched.lastName ? "border-red-500" : ""
                  }
                />
                <ErrorMessage
                  name="lastName"
                  component="p"
                  className="text-sm text-red-500 mt-1"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="email">Email Address *</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Field
                    as={Input}
                    id="email"
                    name="email"
                    type="email"
                    placeholder="john@example.com"
                    className={`pl-10 ${
                      errors.email && touched.email ? "border-red-500" : ""
                    }`}
                  />
                </div>
                <ErrorMessage
                  name="email"
                  component="p"
                  className="text-sm text-red-500 mt-1"
                />
              </div>
              <div>
                <Label htmlFor="phone">Phone Number *</Label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Field
                    as={Input}
                    id="phone"
                    name="phone"
                    type="tel"
                    placeholder="+1 (555) 123-4567"
                    className={`pl-10 ${
                      errors.phone && touched.phone ? "border-red-500" : ""
                    }`}
                  />
                </div>
                <ErrorMessage
                  name="phone"
                  component="p"
                  className="text-sm text-red-500 mt-1"
                />
              </div>
            </div>

            <div>
              <Label htmlFor="username">Username *</Label>
              <Field
                as={Input}
                id="username"
                name="username"
                placeholder="Choose a unique username"
                className={
                  errors.username && touched.username ? "border-red-500" : ""
                }
              />
              <ErrorMessage
                name="username"
                component="p"
                className="text-sm text-red-500 mt-1"
              />
              <p className="text-sm text-gray-500 mt-1">
                This will be used for your login and salon profile URL
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="password">Password *</Label>
                <div className="relative">
                  <Field
                    as={Input}
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Create a strong password"
                    className={`pr-10 ${
                      errors.password && touched.password
                        ? "border-red-500"
                        : ""
                    }`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </button>
                </div>
                <ErrorMessage
                  name="password"
                  component="p"
                  className="text-sm text-red-500 mt-1"
                />
              </div>
              <div>
                <Label htmlFor="confirmPassword">Confirm Password *</Label>
                <div className="relative">
                  <Field
                    as={Input}
                    id="confirmPassword"
                    name="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="Confirm your password"
                    className={`pr-10 ${
                      errors.confirmPassword && touched.confirmPassword
                        ? "border-red-500"
                        : ""
                    }`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                  >
                    {showConfirmPassword ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </button>
                </div>
                <ErrorMessage
                  name="confirmPassword"
                  component="p"
                  className="text-sm text-red-500 mt-1"
                />
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Step 2: Business Information */}
      {currentStep === 2 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Building className="h-6 w-6 text-purple-600 mr-2" />
              Business Information
            </CardTitle>
            <CardDescription>Tell us about your salon business</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <Label htmlFor="businessName">Business Name *</Label>
              <Field
                as={Input}
                id="businessName"
                name="businessName"
                placeholder="Your Salon Name"
                className={
                  errors.businessName && touched.businessName
                    ? "border-red-500"
                    : ""
                }
              />
              <ErrorMessage
                name="businessName"
                component="p"
                className="text-sm text-red-500 mt-1"
              />
            </div>

            <div>
              <Label htmlFor="businessDescription">
                Business Description *
              </Label>
              <Field
                as={Textarea}
                id="businessDescription"
                name="businessDescription"
                placeholder="Describe your salon, services, and what makes you special..."
                rows={4}
                className={
                  errors.businessDescription && touched.businessDescription
                    ? "border-red-500"
                    : ""
                }
              />
              <ErrorMessage
                name="businessDescription"
                component="p"
                className="text-sm text-red-500 mt-1"
              />
              <p className="text-sm text-gray-500 mt-1">
                This will be displayed on your public profile to attract
                customers (minimum 20 characters)
              </p>
            </div>
          </CardContent>
        </Card>
      )}

      {currentStep === 3 && (
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Scissors className="h-6 w-6 text-purple-600 mr-2" />
                Services Offered
              </CardTitle>
              <CardDescription>
                Select the services you offer and set the duration for each
                service
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="mb-6">
                <Label htmlFor="serviceSelect">Add Service</Label>
                <select
                  id="serviceSelect"
                  onChange={(e) => {
                    const serviceId = Number.parseInt(e.target.value);
                    if (serviceId) {
                      addService(serviceId);
                      e.target.value = "";
                    }
                  }}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                >
                  <option value="">Select a service to add</option>
                  {availableServices
                    .filter(
                      (service) =>
                        !values.services.find((s) => s.id === service.id)
                    )
                    .map((service) => (
                      <option key={service.id} value={service.id}>
                        {service.name}
                      </option>
                    ))}
                </select>
              </div>

              {values.services.length === 0 && (
                <div className="text-center py-8 text-gray-500">
                  <Scissors className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                  <p>
                    No services selected yet. Choose from the dropdown above.
                  </p>
                </div>
              )}

              <div className="space-y-4">
                {values.services.map((service, index) => (
                  <Card
                    key={service.id}
                    className="border-l-4 border-l-purple-500"
                  >
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <h4 className="font-medium text-gray-900">
                            {service.name}
                          </h4>

                          <div className="flex items-center mt-2">
                            <Clock className="h-4 w-4 text-gray-400 mr-2" />
                            <Label
                              htmlFor={`service-duration-${service.id}`}
                              className="text-sm text-gray-600 mr-2"
                            >
                              Duration (minutes):
                            </Label>
                            <Input
                              id={`service-duration-${service.id}`}
                              type="number"
                              min="15"
                              max="480"
                              step="15"
                              value={service.duration}
                              onChange={(e) =>
                                updateServiceDuration(
                                  service.id,
                                  Number.parseInt(e.target.value)
                                )
                              }
                              className="w-24"
                            />
                            <Label
                              htmlFor={`service-price-${service.id}`}
                              className="text-sm text-gray-600 ml-2 mr-2"
                            >
                              Price ($):
                            </Label>
                            <Input
                              id={`service-price-${service.id}`}
                              type="number"
                              min="1"
                              max="480"
                              value={service.price}
                              onChange={(e) =>
                                updateServicePrice(
                                  service.id,
                                  Number.parseInt(e.target.value)
                                )
                              }
                              className="w-24 no-arrows"
                            />
                          </div>
                          <ErrorMessage
                            name={`services.${index}.duration`}
                            component="p"
                            className="text-sm text-red-500 mt-1"
                          />
                        </div>
                        <Button
                          type="button"
                          onClick={() => removeService(service.id)}
                          variant="outline"
                          size="sm"
                          className="text-red-600 hover:text-red-700 bg-transparent ml-4"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {errors.services && typeof errors.services === "string" && (
                <p className="text-sm text-red-500 mt-4">{errors.services}</p>
              )}
            </CardContent>
          </Card>
        </div>
      )}

      {/* Step 4: Locations */}
      {currentStep === 4 && (
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <div className="flex items-center">
                  <MapPin className="h-6 w-6 text-purple-600 mr-2" />
                  Business Locations
                </div>
                <FieldArray name="locations">
                  {({ push }) => (
                    <Button
                      type="button"
                      onClick={() =>
                        push({
                          name: "",
                          address: "",
                          contact: "",
                          images: [],
                        })
                      }
                      variant="outline"
                      size="sm"
                      className="bg-transparent"
                    >
                      <Plus className="h-4 w-4 mr-2" />
                      Add Location
                    </Button>
                  )}
                </FieldArray>
              </CardTitle>
              <CardDescription>
                Add all your salon locations. You can add multiple locations for
                your business.
              </CardDescription>
            </CardHeader>
          </Card>

          <FieldArray name="locations">
            {({ remove }) => (
              <>
                {values.locations.map((location, index) => (
                  <Card key={index}>
                    <CardHeader>
                      <CardTitle className="flex items-center justify-between">
                        <span>Location {index + 1}</span>
                        {values.locations.length > 1 && (
                          <Button
                            type="button"
                            onClick={() => remove(index)}
                            variant="outline"
                            size="sm"
                            className="text-red-600 hover:text-red-700 bg-transparent"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        )}
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div>
                        <Label htmlFor={`locations.${index}.name`}>
                          Location Name *
                        </Label>
                        <Field
                          as={Input}
                          id={`locations.${index}.name`}
                          name={`locations.${index}.name`}
                          placeholder="Downtown Branch, Main Location, etc."
                          className={
                            errors.locations?.[index]?.name &&
                            touched.locations?.[index]?.name
                              ? "border-red-500"
                              : ""
                          }
                        />
                        <ErrorMessage
                          name={`locations.${index}.name`}
                          component="p"
                          className="text-sm text-red-500 mt-1"
                        />
                      </div>

                      <div>
                        <Label htmlFor={`locations.${index}.address`}>
                          Address *
                        </Label>
                        <Field
                          as={Textarea}
                          id={`locations.${index}.address`}
                          name={`locations.${index}.address`}
                          placeholder="123 Main Street, City, State, ZIP Code"
                          rows={3}
                          className={
                            errors.locations?.[index]?.address &&
                            touched.locations?.[index]?.address
                              ? "border-red-500"
                              : ""
                          }
                        />
                        <ErrorMessage
                          name={`locations.${index}.address`}
                          component="p"
                          className="text-sm text-red-500 mt-1"
                        />
                      </div>

                      <div>
                        <Label htmlFor={`locations.${index}.contact`}>
                          Contact Number *
                        </Label>
                        <div className="relative">
                          <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                          <Field
                            as={Input}
                            id={`locations.${index}.contact`}
                            name={`locations.${index}.contact`}
                            type="tel"
                            placeholder="+1 (555) 123-4567"
                            className={`pl-10 ${
                              errors.locations?.[index]?.contact &&
                              touched.locations?.[index]?.contact
                                ? "border-red-500"
                                : ""
                            }`}
                          />
                        </div>
                        <ErrorMessage
                          name={`locations.${index}.contact`}
                          component="p"
                          className="text-sm text-red-500 mt-1"
                        />
                      </div>

                      {/* Image Upload */}
                      <div>
                        <Label>Location Images (Up to 5 images)</Label>
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
                              id={`images-${index}`}
                            />
                            <label
                              htmlFor={`images-${index}`}
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
                          {location.images.length > 0 && (
                            <div className="mt-4 grid grid-cols-2 md:grid-cols-5 gap-4">
                              {location.images.map((image, imageIndex) => (
                                <div key={imageIndex} className="relative">
                                  <Image
                                    width={200}
                                    height={200}
                                    src={
                                      URL.createObjectURL(image) ||
                                      "/placeholder.svg"
                                    }
                                    alt={`Location ${index + 1} - Image ${
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
                              ))}
                            </div>
                          )}

                          <p className="text-sm text-gray-500 mt-2">
                            {location.images.length}/5 images uploaded
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </>
            )}
          </FieldArray>
        </div>
      )}

      {/* Navigation Buttons */}
      <div className="flex justify-between mt-8">
        <div>
          {currentStep > 1 && (
            <Button
              type="button"
              onClick={() => setCurrentStep(currentStep - 1)}
              variant="outline"
              className="bg-transparent"
            >
              Previous
            </Button>
          )}
        </div>

        <div className="flex gap-4">
          {currentStep < 4 ? (
            <Button
              type="button"
              onClick={async () => {
                const isValid = await validateForm();
                if (Object.keys(isValid).length === 0) {
                  setCurrentStep(currentStep + 1);
                }
              }}
              className="bg-purple-600 hover:bg-purple-700"
            >
              Next Step
            </Button>
          ) : (
            <Button type="submit" className="bg-purple-600 hover:bg-purple-700">
              Register Business
            </Button>
          )}
        </div>
      </div>

      {/* Terms and Conditions */}
      {currentStep === 4 && (
        <div className="mt-6 p-4 bg-gray-50 rounded-lg">
          <p className="text-sm text-gray-600">
            By registering your business, you agree to our{" "}
            <Link href="/terms" className="text-purple-600 hover:underline">
              Terms of Service
            </Link>{" "}
            and{" "}
            <Link href="/privacy" className="text-purple-600 hover:underline">
              Privacy Policy
            </Link>
            . You also agree to pay a 10% commission on all successful bookings
            made through our platform.
          </p>
        </div>
      )}
    </Form>
  );
});
