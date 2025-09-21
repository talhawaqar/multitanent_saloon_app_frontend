"use client";
import { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useAtom } from "jotai";
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
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Eye, EyeOff, Mail, Lock, AlertCircle } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { LoginValues } from "../types";
import { useLoginUser } from "../mutations";
import { UserProfileTypeCode } from "../constants";
import { authAtom } from "../atoms";

const validationSchema = Yup.object({
  username: Yup.string().required("Username is required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
});

const initialValues: LoginValues = {
  username: "",
  password: "",
};

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [loginError, setLoginError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const [_, setAuthValues] = useAtom(authAtom);

  const { mutateAsync: loginUser } = useLoginUser();

  const handleSubmit = async (values: LoginValues) => {
    setIsLoading(true);
    setLoginError("");

    try {
      const data = await loginUser(values);

      if (!!data.token) {
        console.log("asad", data.token);
        setAuthValues({
          token: data.token,
          userProfileTypeCode: data.userProfileTypeCode,
        });
      }

      if (data.userProfileTypeCode == UserProfileTypeCode.ADMIM) {
        router.push("/admin/dashboard");
      }
    } catch (error) {
      setLoginError("An error occurred during login. Please try again.");
      console.error("Login error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="container mx-auto px-4 py-12">
        <div className="max-w-md mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="flex items-center justify-center mb-4">
              <div className="bg-purple-600 rounded-full p-3">
                <Mail className="h-8 w-8 text-white" />
              </div>
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Welcome Back
            </h1>
            <p className="text-gray-600">Sign in to your SalonHub account</p>
          </div>

          {/* Login Card */}
          <Card className="shadow-lg">
            <CardHeader className="text-center">
              <CardTitle>Sign In</CardTitle>
              <CardDescription>
                Enter your credentials to access your account
              </CardDescription>
            </CardHeader>

            <CardContent>
              <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
              >
                {({ errors, touched, values }) => (
                  <Form className="space-y-6">
                    {loginError && (
                      <Alert className="border-red-200 bg-red-50">
                        <AlertCircle className="h-4 w-4 text-red-600" />
                        <AlertDescription className="text-red-700">
                          {loginError}
                        </AlertDescription>
                      </Alert>
                    )}

                    <Alert className="border-blue-200 bg-blue-50">
                      <AlertCircle className="h-4 w-4 text-blue-600" />
                      <AlertDescription className="text-blue-700">
                        <strong>Demo Credentials:</strong> user1234 /
                        password123
                      </AlertDescription>
                    </Alert>

                    <div className="space-y-2">
                      <Label htmlFor="username">Username</Label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                        <Field
                          value={values.username}
                          as={Input}
                          id="username"
                          name="username"
                          placeholder="Enter your username"
                          className={`pl-10 ${
                            errors.username && touched.username
                              ? "border-red-500"
                              : ""
                          }`}
                        />
                      </div>
                      <ErrorMessage
                        name="username"
                        component="p"
                        className="text-red-600 text-sm"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="password">Password</Label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                        <Field
                          as={Input}
                          id="password"
                          name="password"
                          value={values.password}
                          type={showPassword ? "text" : "password"}
                          placeholder="Enter your password"
                          className={`pl-10 pr-10 ${
                            errors.password && touched.password
                              ? "border-red-500"
                              : ""
                          }`}
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
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
                        className="text-red-600 text-sm"
                      />
                    </div>

                    {/* Login Button */}
                    <Button
                      type="submit"
                      disabled={isLoading}
                      className="w-full bg-purple-600 hover:bg-purple-700 text-white font-medium py-3 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isLoading ? (
                        <div className="flex items-center justify-center">
                          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                          Signing In...
                        </div>
                      ) : (
                        "Sign In"
                      )}
                    </Button>
                  </Form>
                )}
              </Formik>
            </CardContent>
          </Card>

          {/* Sign Up Link */}
          <div className="text-center mt-6">
            <p className="text-gray-600">
              Don&apos;t have an account?{" "}
              <Link
                href="/signup"
                className="text-purple-600 hover:text-purple-500 font-medium"
              >
                Sign up here
              </Link>
            </p>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
