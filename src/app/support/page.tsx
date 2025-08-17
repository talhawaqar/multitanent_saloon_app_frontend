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
  MessageCircle,
  Phone,
  Mail,
  Clock,
  Search,
  HelpCircle,
  BookOpen,
  Users,
  CreditCard,
  Calendar,
  Settings,
  Shield,
  AlertCircle,
  CheckCircle,
  ArrowRight,
  ExternalLink,
} from "lucide-react";
import Link from "next/link";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";

export default function SupportPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      <Navbar />

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20 text-center">
        <div className="max-w-4xl mx-auto">
          <Badge variant="secondary" className="mb-4">
            🎧 24/7 Support
          </Badge>
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            We're Here to
            <span className="text-purple-600"> Help</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Get instant answers to your questions or reach out to our support
            team. We're committed to making your experience smooth and
            successful.
          </p>

          {/* Quick Search */}
          <div className="max-w-md mx-auto relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <Input
              placeholder="Search for help..."
              className="pl-10 pr-4 py-3 text-lg"
            />
          </div>
        </div>
      </section>

      {/* Contact Options */}
      <section className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Get in Touch
          </h2>
          <p className="text-xl text-gray-600">
            Choose the best way to reach us
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          <Card className="text-center hover:shadow-lg transition-shadow">
            <CardHeader>
              <MessageCircle className="h-12 w-12 text-purple-600 mx-auto mb-4" />
              <CardTitle>Live Chat</CardTitle>
              <CardDescription>
                Get instant help from our support team
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-center mb-4">
                <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                <span className="text-sm text-green-600 font-medium">
                  Online Now
                </span>
              </div>
              <Button className="w-full bg-purple-600 hover:bg-purple-700">
                Start Chat
              </Button>
            </CardContent>
          </Card>

          <Card className="text-center hover:shadow-lg transition-shadow">
            <CardHeader>
              <Mail className="h-12 w-12 text-blue-600 mx-auto mb-4" />
              <CardTitle>Email Support</CardTitle>
              <CardDescription>Send us a detailed message</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-center mb-4">
                <Clock className="w-4 h-4 text-gray-500 mr-2" />
                <span className="text-sm text-gray-600">
                  Response within 2 hours
                </span>
              </div>
              <Button variant="outline" className="w-full bg-transparent">
                <Link href="mailto:support@salonhub.com">Send Email</Link>
              </Button>
            </CardContent>
          </Card>

          <Card className="text-center hover:shadow-lg transition-shadow">
            <CardHeader>
              <Phone className="h-12 w-12 text-green-600 mx-auto mb-4" />
              <CardTitle>Phone Support</CardTitle>
              <CardDescription>Speak directly with our team</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-center mb-4">
                <Clock className="w-4 h-4 text-gray-500 mr-2" />
                <span className="text-sm text-gray-600">Mon-Fri 9AM-6PM</span>
              </div>
              <Button variant="outline" className="w-full bg-transparent">
                <Link href="tel:+1-555-SALON-01">Call Now</Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Quick Help Categories */}
      <section className="bg-gray-50 py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Popular Help Topics
            </h2>
            <p className="text-xl text-gray-600">
              Find quick answers to common questions
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card className="hover:shadow-lg transition-shadow cursor-pointer">
              <CardHeader>
                <div className="flex items-center">
                  <Calendar className="h-6 w-6 text-purple-600 mr-3" />
                  <CardTitle className="text-lg">
                    Booking & Appointments
                  </CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li className="flex items-center">
                    <ArrowRight className="h-3 w-3 mr-2" />
                    How to book an appointment
                  </li>
                  <li className="flex items-center">
                    <ArrowRight className="h-3 w-3 mr-2" />
                    Canceling or rescheduling
                  </li>
                  <li className="flex items-center">
                    <ArrowRight className="h-3 w-3 mr-2" />
                    Finding available time slots
                  </li>
                  <li className="flex items-center">
                    <ArrowRight className="h-3 w-3 mr-2" />
                    Booking confirmation issues
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow cursor-pointer">
              <CardHeader>
                <div className="flex items-center">
                  <CreditCard className="h-6 w-6 text-green-600 mr-3" />
                  <CardTitle className="text-lg">Payments & Billing</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li className="flex items-center">
                    <ArrowRight className="h-3 w-3 mr-2" />
                    Payment methods accepted
                  </li>
                  <li className="flex items-center">
                    <ArrowRight className="h-3 w-3 mr-2" />
                    Refund policy
                  </li>
                  <li className="flex items-center">
                    <ArrowRight className="h-3 w-3 mr-2" />
                    Commission structure
                  </li>
                  <li className="flex items-center">
                    <ArrowRight className="h-3 w-3 mr-2" />
                    Payment processing times
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow cursor-pointer">
              <CardHeader>
                <div className="flex items-center">
                  <Users className="h-6 w-6 text-blue-600 mr-3" />
                  <CardTitle className="text-lg">Account Management</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li className="flex items-center">
                    <ArrowRight className="h-3 w-3 mr-2" />
                    Creating an account
                  </li>
                  <li className="flex items-center">
                    <ArrowRight className="h-3 w-3 mr-2" />
                    Password reset
                  </li>
                  <li className="flex items-center">
                    <ArrowRight className="h-3 w-3 mr-2" />
                    Profile settings
                  </li>
                  <li className="flex items-center">
                    <ArrowRight className="h-3 w-3 mr-2" />
                    Account verification
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow cursor-pointer">
              <CardHeader>
                <div className="flex items-center">
                  <Settings className="h-6 w-6 text-orange-600 mr-3" />
                  <CardTitle className="text-lg">Salon Management</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li className="flex items-center">
                    <ArrowRight className="h-3 w-3 mr-2" />
                    Setting up your salon profile
                  </li>
                  <li className="flex items-center">
                    <ArrowRight className="h-3 w-3 mr-2" />
                    Managing services & pricing
                  </li>
                  <li className="flex items-center">
                    <ArrowRight className="h-3 w-3 mr-2" />
                    Calendar management
                  </li>
                  <li className="flex items-center">
                    <ArrowRight className="h-3 w-3 mr-2" />
                    Customer communications
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow cursor-pointer">
              <CardHeader>
                <div className="flex items-center">
                  <Shield className="h-6 w-6 text-red-600 mr-3" />
                  <CardTitle className="text-lg">Safety & Security</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li className="flex items-center">
                    <ArrowRight className="h-3 w-3 mr-2" />
                    Data privacy policy
                  </li>
                  <li className="flex items-center">
                    <ArrowRight className="h-3 w-3 mr-2" />
                    Secure payment processing
                  </li>
                  <li className="flex items-center">
                    <ArrowRight className="h-3 w-3 mr-2" />
                    Reporting issues
                  </li>
                  <li className="flex items-center">
                    <ArrowRight className="h-3 w-3 mr-2" />
                    Account security tips
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow cursor-pointer">
              <CardHeader>
                <div className="flex items-center">
                  <BookOpen className="h-6 w-6 text-indigo-600 mr-3" />
                  <CardTitle className="text-lg">Getting Started</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li className="flex items-center">
                    <ArrowRight className="h-3 w-3 mr-2" />
                    Platform overview
                  </li>
                  <li className="flex items-center">
                    <ArrowRight className="h-3 w-3 mr-2" />
                    First booking guide
                  </li>
                  <li className="flex items-center">
                    <ArrowRight className="h-3 w-3 mr-2" />
                    Salon onboarding
                  </li>
                  <li className="flex items-center">
                    <ArrowRight className="h-3 w-3 mr-2" />
                    Best practices
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="container mx-auto px-4 py-20">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-xl text-gray-600">
            Quick answers to the most common questions
          </p>
        </div>

        <div className="max-w-4xl mx-auto space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center text-lg">
                <HelpCircle className="h-5 w-5 text-purple-600 mr-2" />
                How do I book an appointment?
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">
                Simply search for salons in your area, browse their services,
                select your preferred time slot, and confirm your booking.
                You'll receive an instant confirmation email with all the
                details.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center text-lg">
                <HelpCircle className="h-5 w-5 text-purple-600 mr-2" />
                What is the cancellation policy?
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">
                You can cancel your appointment up to 24 hours before the
                scheduled time for a full refund. Cancellations within 24 hours
                may be subject to the salon's individual cancellation policy.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center text-lg">
                <HelpCircle className="h-5 w-5 text-purple-600 mr-2" />
                How much commission do salon owners pay?
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">
                Salon owners pay a 10% commission on successful bookings. There
                are no setup fees, monthly charges, or hidden costs. You only
                pay when you earn from bookings through our platform.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center text-lg">
                <HelpCircle className="h-5 w-5 text-purple-600 mr-2" />
                How do I get paid as a salon owner?
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">
                Payments are processed automatically after each completed
                service. You'll receive 90% of the booking amount within 7
                business days via direct deposit to your registered bank
                account.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center text-lg">
                <HelpCircle className="h-5 w-5 text-purple-600 mr-2" />
                Is my payment information secure?
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">
                Yes, we use industry-standard encryption and work with trusted
                payment processors to ensure your financial information is
                completely secure. We never store your full payment details on
                our servers.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center text-lg">
                <HelpCircle className="h-5 w-5 text-purple-600 mr-2" />
                Can I modify my salon's services and pricing?
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">
                You can update your services, pricing, availability, and salon
                information anytime through your salon dashboard. Changes are
                reflected immediately on your public profile.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Contact Form */}
      <section className="bg-gray-50 py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Still Need Help?
              </h2>
              <p className="text-xl text-gray-600">
                Send us a message and we'll get back to you within 2 hours
              </p>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Contact Support</CardTitle>
                <CardDescription>
                  Fill out the form below and our support team will assist you
                  as soon as possible.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="firstName">First Name</Label>
                      <Input id="firstName" placeholder="John" />
                    </div>
                    <div>
                      <Label htmlFor="lastName">Last Name</Label>
                      <Input id="lastName" placeholder="Doe" />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="email">Email Address</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="john@example.com"
                    />
                  </div>

                  <div>
                    <Label htmlFor="userType">I am a...</Label>
                    <select
                      id="userType"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                    >
                      <option value="">Select user type</option>
                      <option value="customer">Customer</option>
                      <option value="salon-owner">Salon Owner</option>
                      <option value="potential-user">Potential User</option>
                    </select>
                  </div>

                  <div>
                    <Label htmlFor="subject">Subject</Label>
                    <Input id="subject" placeholder="How can we help you?" />
                  </div>

                  <div>
                    <Label htmlFor="message">Message</Label>
                    <Textarea
                      id="message"
                      placeholder="Please describe your issue or question in detail..."
                      rows={5}
                    />
                  </div>

                  <Button
                    className="w-full bg-purple-600 hover:bg-purple-700"
                    size="lg"
                  >
                    Send Message
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Status & Resources */}
      <section className="container mx-auto px-4 py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* System Status */}
          <div>
            <h3 className="text-2xl font-bold text-gray-900 mb-6">
              System Status
            </h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-green-50 rounded-lg">
                <div className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-green-600 mr-3" />
                  <span className="font-medium">Booking System</span>
                </div>
                <Badge
                  variant="secondary"
                  className="bg-green-100 text-green-800"
                >
                  Operational
                </Badge>
              </div>

              <div className="flex items-center justify-between p-4 bg-green-50 rounded-lg">
                <div className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-green-600 mr-3" />
                  <span className="font-medium">Payment Processing</span>
                </div>
                <Badge
                  variant="secondary"
                  className="bg-green-100 text-green-800"
                >
                  Operational
                </Badge>
              </div>

              <div className="flex items-center justify-between p-4 bg-green-50 rounded-lg">
                <div className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-green-600 mr-3" />
                  <span className="font-medium">Notifications</span>
                </div>
                <Badge
                  variant="secondary"
                  className="bg-green-100 text-green-800"
                >
                  Operational
                </Badge>
              </div>

              <div className="flex items-center justify-between p-4 bg-yellow-50 rounded-lg">
                <div className="flex items-center">
                  <AlertCircle className="h-5 w-5 text-yellow-600 mr-3" />
                  <span className="font-medium">Search Function</span>
                </div>
                <Badge
                  variant="secondary"
                  className="bg-yellow-100 text-yellow-800"
                >
                  Maintenance
                </Badge>
              </div>
            </div>

            <Button variant="outline" className="mt-4 bg-transparent">
              <ExternalLink className="h-4 w-4 mr-2" />
              View Full Status Page
            </Button>
          </div>

          {/* Resources */}
          <div>
            <h3 className="text-2xl font-bold text-gray-900 mb-6">
              Helpful Resources
            </h3>
            <div className="space-y-4">
              <Card className="hover:shadow-md transition-shadow cursor-pointer">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <BookOpen className="h-5 w-5 text-purple-600 mr-3" />
                      <span className="font-medium">User Guide</span>
                    </div>
                    <ArrowRight className="h-4 w-4 text-gray-400" />
                  </div>
                </CardContent>
              </Card>

              <Card className="hover:shadow-md transition-shadow cursor-pointer">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <Settings className="h-5 w-5 text-blue-600 mr-3" />
                      <span className="font-medium">Salon Owner Handbook</span>
                    </div>
                    <ArrowRight className="h-4 w-4 text-gray-400" />
                  </div>
                </CardContent>
              </Card>

              <Card className="hover:shadow-md transition-shadow cursor-pointer">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <Shield className="h-5 w-5 text-green-600 mr-3" />
                      <span className="font-medium">Privacy & Security</span>
                    </div>
                    <ArrowRight className="h-4 w-4 text-gray-400" />
                  </div>
                </CardContent>
              </Card>

              <Card className="hover:shadow-md transition-shadow cursor-pointer">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <MessageCircle className="h-5 w-5 text-orange-600 mr-3" />
                      <span className="font-medium">Community Forum</span>
                    </div>
                    <ArrowRight className="h-4 w-4 text-gray-400" />
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
