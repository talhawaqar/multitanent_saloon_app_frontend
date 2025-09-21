"use client";
import { useState, useCallback } from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import { Badge } from "@/components/ui/badge";
import { CheckCircle } from "lucide-react";
import Link from "next/link";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { RegisterBusinessForm } from "./registerBusinessForm";
import { registerBusinessFormValues } from "../../types";
import {
  personalInfoSchema,
  businessInfoSchema,
  locationsSchema,
  servicesSchema,
} from "./registerBusinessFormSchema";
import { useRegisterUser } from "../../mutations";
import { UserProfileTypeCode } from "../../constants";

export default function SalonRegistrationPage() {
  const [currentStep, setCurrentStep] = useState<number>(1);

  const { mutateAsync: registerBusiness } = useRegisterUser();

  const initialValues: registerBusinessFormValues = {
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    username: "",
    password: "",
    confirmPassword: "",
    businessName: "",
    businessDescription: "",
    locations: [
      {
        name: "",
        address: "",
        contact: "",
        images: [],
      },
    ],
    services: [],
  };

  const getValidationSchema = useCallback((step: number) => {
    switch (step) {
      case 1:
        return personalInfoSchema;
      case 2:
        return businessInfoSchema;
      case 3:
        return servicesSchema;
      case 4:
        return locationsSchema;
      default:
        return Yup.object();
    }
  }, []);

  const handleSubmit = async (values: registerBusinessFormValues) => {
    try {
      const user = {
        username: values.username,
        firstName: values.firstName,
        lastName: values.lastName,
        email: values.email,
        password: values.password,
        contact: values.phone,
      };

      const businessEntity = {
        name: values.businessName,
        description: values.businessDescription,
        services: values.services.map((ser) => ({
          serviceId: ser.id,
          duration: ser.duration,
          price: ser.price,
        })),
        locations: values.locations,
      };

      const formData = new FormData();

      formData.append("user", JSON.stringify(user));
      formData.append(
        "userProfileTypeCode",
        UserProfileTypeCode.BUSINESS_OWNER
      );
      formData.append("businessEntity", JSON.stringify(businessEntity));

      businessEntity.locations?.forEach((location, locIndex) => {
        formData.append(
          `location_${locIndex}`,
          JSON.stringify({ ...location, images: undefined })
        );

        location.images?.forEach((file) => {
          formData.append(`images_location_${locIndex}`, file);
        });
      });

      const token = await registerBusiness(formData);

      console.log("Form submitted:", values);
      // Here you would typically send the data to your API
      alert("Registration submitted successfully!");
    } catch (error) {
      console.error("Submission error:", error);
      alert(
        "There was an error submitting your registration. Please try again."
      );
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      <Navbar />
      {/* Hero Section */}
      <section className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto text-center mb-8">
          <Badge variant="secondary" className="mb-4">
            🏢 Business Registration
          </Badge>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Register Your{" "}
            <span className="text-purple-600">Salon Business</span>
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Join thousands of successful salon owners on our platform. Start
            attracting more customers today!
          </p>
        </div>

        {/* Progress Indicator */}
        <div className="max-w-2xl mx-auto mb-8">
          <div className="flex items-center justify-between">
            <div
              className={`flex items-center ${
                currentStep >= 1 ? "text-purple-600" : "text-gray-400"
              }`}
            >
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  currentStep >= 1 ? "bg-purple-600 text-white" : "bg-gray-200"
                }`}
              >
                {currentStep > 1 ? <CheckCircle className="h-5 w-5" /> : "1"}
              </div>
              <span className="ml-2 text-sm font-medium">Personal Info</span>
            </div>

            <div
              className={`flex-1 h-1 mx-4 ${
                currentStep >= 2 ? "bg-purple-600" : "bg-gray-200"
              }`}
            ></div>

            <div
              className={`flex items-center ${
                currentStep >= 2 ? "text-purple-600" : "text-gray-400"
              }`}
            >
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  currentStep >= 2 ? "bg-purple-600 text-white" : "bg-gray-200"
                }`}
              >
                {currentStep > 2 ? <CheckCircle className="h-5 w-5" /> : "2"}
              </div>
              <span className="ml-2 text-sm font-medium">Business Info</span>
            </div>

            <div
              className={`flex-1 h-1 mx-4 ${
                currentStep >= 3 ? "bg-purple-600" : "bg-gray-200"
              }`}
            ></div>

            <div
              className={`flex items-center ${
                currentStep >= 3 ? "text-purple-600" : "text-gray-400"
              }`}
            >
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  currentStep >= 3 ? "bg-purple-600 text-white" : "bg-gray-200"
                }`}
              >
                {currentStep > 3 ? <CheckCircle className="h-5 w-5" /> : "3"}
              </div>
              <span className="ml-2 text-sm font-medium">Services Info</span>
            </div>

            <div
              className={`flex-1 h-1 mx-4 ${
                currentStep >= 4 ? "bg-purple-600" : "bg-gray-200"
              }`}
            ></div>

            <div
              className={`flex items-center ${
                currentStep >= 4 ? "text-purple-600" : "text-gray-400"
              }`}
            >
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  currentStep >= 4 ? "bg-purple-600 text-white" : "bg-gray-200"
                }`}
              >
                {currentStep > 4 ? <CheckCircle className="h-5 w-5" /> : "4"}
              </div>
              <span className="ml-2 text-sm font-medium">Locations</span>
            </div>
          </div>
        </div>
      </section>

      {/* Registration Form */}
      <section className="container mx-auto px-4 pb-20">
        <div className="max-w-4xl mx-auto">
          <Formik
            initialValues={initialValues}
            validationSchema={getValidationSchema(currentStep)}
            onSubmit={handleSubmit}
            validateOnChange={true}
            validateOnBlur={true}
          >
            {(props) => (
              <RegisterBusinessForm
                {...props}
                setCurrentStep={setCurrentStep}
                currentStep={currentStep}
              />
            )}
          </Formik>

          {/* Already have an account */}
          <div className="text-center mt-8">
            <p className="text-gray-600">
              Already have an account?{" "}
              <Link
                href="/login"
                className="text-purple-600 hover:underline font-medium"
              >
                Sign in here
              </Link>
            </p>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
}
