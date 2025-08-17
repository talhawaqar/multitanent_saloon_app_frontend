"use client"

import { useState } from "react"
import { Formik, Form, Field, ErrorMessage } from "formik"
import * as Yup from "yup"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Eye, EyeOff, Shield, Lock, User, AlertCircle, CheckCircle, Settings } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"

interface AdminLoginValues {
  email: string
  password: string
  rememberMe: boolean
}

const validationSchema = Yup.object({
  email: Yup.string().email("Invalid email address").required("Email is required"),
  password: Yup.string().min(6, "Password must be at least 6 characters").required("Password is required"),
})

const initialValues: AdminLoginValues = {
  email: "",
  password: "",
  rememberMe: false,
}

export default function AdminLoginPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [loginError, setLoginError] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const handleSubmit = async (values: AdminLoginValues) => {
    setIsLoading(true)
    setLoginError("")

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500))

      // Mock authentication logic
      if (values.email === "admin@salonhub.com" && values.password === "admin123") {
        // Successful login
        console.log("Admin login successful:", values)

        // Store auth token (in real app, this would come from API)
        if (values.rememberMe) {
          localStorage.setItem("adminToken", "mock-admin-token")
        } else {
          sessionStorage.setItem("adminToken", "mock-admin-token")
        }

        // Redirect to admin dashboard
        router.push("/admin/dashboard")
      } else {
        setLoginError("Invalid email or password. Please try again.")
      }
    } catch (error) {
      setLoginError("An error occurred during login. Please try again.")
      console.error("Login error:", error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center p-4">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]"></div>

      <div className="relative w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <div className="bg-purple-600 rounded-full p-3">
              <Shield className="h-8 w-8 text-white" />
            </div>
          </div>
          <h1 className="text-3xl font-bold text-white mb-2">Admin Portal</h1>
          <p className="text-gray-300">SalonHub Administration</p>
        </div>

        {/* Login Card */}
        <Card className="backdrop-blur-sm bg-white/10 border-white/20 shadow-2xl">
          <CardHeader className="text-center">
            <CardTitle className="text-white flex items-center justify-center">
              <Settings className="h-5 w-5 mr-2" />
              Administrator Login
            </CardTitle>
            <CardDescription className="text-gray-300">
              Enter your credentials to access the admin dashboard
            </CardDescription>
          </CardHeader>

          <CardContent>
            <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
              {({ errors, touched }) => (
                <Form className="space-y-6">
                  {/* Login Error Alert */}
                  {loginError && (
                    <Alert className="border-red-500/50 bg-red-500/10">
                      <AlertCircle className="h-4 w-4 text-red-400" />
                      <AlertDescription className="text-red-300">{loginError}</AlertDescription>
                    </Alert>
                  )}

                  {/* Demo Credentials */}
                  <Alert className="border-blue-500/50 bg-blue-500/10">
                    <CheckCircle className="h-4 w-4 text-blue-400" />
                    <AlertDescription className="text-blue-300">
                      <strong>Demo Credentials:</strong>
                      <br />
                      Email: admin@salonhub.com
                      <br />
                      Password: admin123
                    </AlertDescription>
                  </Alert>

                  {/* Email Field */}
                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-white">
                      Email Address
                    </Label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                      <Field
                        as={Input}
                        id="email"
                        name="email"
                        type="email"
                        placeholder="admin@salonhub.com"
                        className={`pl-10 bg-white/10 border-white/20 text-white placeholder:text-gray-400 focus:border-purple-400 focus:ring-purple-400 ${
                          errors.email && touched.email ? "border-red-500" : ""
                        }`}
                      />
                    </div>
                    <ErrorMessage name="email" component="p" className="text-red-400 text-sm" />
                  </div>

                  {/* Password Field */}
                  <div className="space-y-2">
                    <Label htmlFor="password" className="text-white">
                      Password
                    </Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                      <Field
                        as={Input}
                        id="password"
                        name="password"
                        type={showPassword ? "text" : "password"}
                        placeholder="Enter your password"
                        className={`pl-10 pr-10 bg-white/10 border-white/20 text-white placeholder:text-gray-400 focus:border-purple-400 focus:ring-purple-400 ${
                          errors.password && touched.password ? "border-red-500" : ""
                        }`}
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white"
                      >
                        {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </button>
                    </div>
                    <ErrorMessage name="password" component="p" className="text-red-400 text-sm" />
                  </div>

                  {/* Remember Me */}
                  <div className="flex items-center space-x-2">
                    <Field
                      type="checkbox"
                      id="rememberMe"
                      name="rememberMe"
                      className="rounded border-white/20 bg-white/10 text-purple-600 focus:ring-purple-400 focus:ring-offset-0"
                    />
                    <Label htmlFor="rememberMe" className="text-gray-300 text-sm">
                      Remember me for 30 days
                    </Label>
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
                      "Sign In to Admin Panel"
                    )}
                  </Button>
                </Form>
              )}
            </Formik>
          </CardContent>
        </Card>

        {/* Footer Links */}
        <div className="text-center mt-6 space-y-2">
          <p className="text-gray-400 text-sm">
            <Link href="/" className="text-gray-300 hover:text-white underline">
              ← Back to SalonHub
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
