import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Calendar,
  Users,
  Star,
  MapPin,
  CreditCard,
  Shield,
  Smartphone,
  TrendingUp,
} from "lucide-react";
import Link from "next/link";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      <Navbar />

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20 text-center">
        <div className="max-w-4xl mx-auto">
          <Badge variant="secondary" className="mb-4">
            🚀 Launch Your Salon Business Online
          </Badge>
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            Connect Salons with Customers
            <span className="text-purple-600"> Seamlessly</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            The ultimate platform for salon owners to grow their business and
            for customers to discover and book their perfect beauty experience.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-purple-600 hover:bg-purple-700">
              <Link href="/signup/customer">Book Your Appointment</Link>
            </Button>
            <Button size="lg" variant="outline">
              <Link href="/signup/salon">List Your Salon</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
          <div>
            <div className="text-3xl font-bold text-purple-600">500+</div>
            <div className="text-gray-600">Partner Salons</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-purple-600">10K+</div>
            <div className="text-gray-600">Happy Customers</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-purple-600">50K+</div>
            <div className="text-gray-600">Bookings Completed</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-purple-600">4.9★</div>
            <div className="text-gray-600">Average Rating</div>
          </div>
        </div>
      </section>

      {/* For Customers Section */}
      <section className="bg-gray-50 py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              For Beauty Enthusiasts
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Discover amazing salons, compare services, and book appointments
              with ease
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="text-center">
              <CardHeader>
                <MapPin className="h-12 w-12 text-purple-600 mx-auto mb-4" />
                <CardTitle>Find Nearby Salons</CardTitle>
                <CardDescription>
                  Discover top-rated salons in your area with detailed profiles
                  and reviews
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="text-center">
              <CardHeader>
                <Calendar className="h-12 w-12 text-purple-600 mx-auto mb-4" />
                <CardTitle>Easy Booking</CardTitle>
                <CardDescription>
                  Book appointments instantly with real-time availability and
                  confirmation
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="text-center">
              <CardHeader>
                <Star className="h-12 w-12 text-purple-600 mx-auto mb-4" />
                <CardTitle>Quality Assured</CardTitle>
                <CardDescription>
                  Read reviews, see ratings, and choose from verified
                  professional salons
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* For Salon Owners Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              For Salon Owners
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Grow your business with our comprehensive salon management
              platform
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card>
              <CardHeader>
                <Users className="h-8 w-8 text-purple-600 mb-2" />
                <CardTitle className="text-lg">More Customers</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600">
                  Reach thousands of potential customers actively looking for
                  salon services
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <Smartphone className="h-8 w-8 text-purple-600 mb-2" />
                <CardTitle className="text-lg">Easy Management</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600">
                  Manage bookings, services, and customer communications from
                  one dashboard
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CreditCard className="h-8 w-8 text-purple-600 mb-2" />
                <CardTitle className="text-lg">Secure Payments</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600">
                  Get paid automatically with our secure payment processing
                  system
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <TrendingUp className="h-8 w-8 text-purple-600 mb-2" />
                <CardTitle className="text-lg">Business Growth</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600">
                  Access analytics and insights to grow your salon business
                  effectively
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="bg-gray-50 py-20">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Simple, Transparent Pricing
          </h2>
          <p className="text-xl text-gray-600 mb-12 max-w-2xl mx-auto">
            We only succeed when you succeed. No hidden fees, no monthly
            charges.
          </p>

          <div className="max-w-md mx-auto">
            <Card className="border-2 border-purple-200">
              <CardHeader>
                <CardTitle className="text-2xl">Commission Based</CardTitle>
                <CardDescription>Perfect for growing salons</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-4xl font-bold text-purple-600 mb-4">
                  10%
                </div>
                <p className="text-gray-600 mb-6">
                  We only charge 10% commission on successful bookings. No
                  upfront costs, no monthly fees.
                </p>
                <ul className="text-left space-y-2 text-sm text-gray-600">
                  <li className="flex items-center">
                    <Shield className="h-4 w-4 text-green-500 mr-2" />
                    Unlimited bookings
                  </li>
                  <li className="flex items-center">
                    <Shield className="h-4 w-4 text-green-500 mr-2" />
                    Customer management
                  </li>
                  <li className="flex items-center">
                    <Shield className="h-4 w-4 text-green-500 mr-2" />
                    Payment processing
                  </li>
                  <li className="flex items-center">
                    <Shield className="h-4 w-4 text-green-500 mr-2" />
                    24/7 support
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Ready to Transform Your Beauty Experience?
            </h2>
            <p className="text-xl text-gray-600 mb-8">
              Join thousands of satisfied customers and successful salon owners
              on our platform
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-purple-600 hover:bg-purple-700">
                <Link href="/signup/customer">Start Booking Now</Link>
              </Button>
              <Button size="lg" variant="outline">
                <Link href="/signup/salon">Register Your Salon</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
}
