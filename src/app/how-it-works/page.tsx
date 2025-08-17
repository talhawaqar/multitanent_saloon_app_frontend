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
  Search,
  MapPin,
  Calendar,
  CreditCard,
  Star,
  CheckCircle,
  UserPlus,
  Store,
  Settings,
  TrendingUp,
  ArrowRight,
  Clock,
  Shield,
  Smartphone,
} from "lucide-react";
import Link from "next/link";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";

export default function HowItWorksPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      <Navbar />

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20 text-center">
        <div className="max-w-4xl mx-auto">
          <Badge variant="secondary" className="mb-4">
            📋 Simple Process
          </Badge>
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            How SalonHub
            <span className="text-purple-600"> Works</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Whether you're looking to book a salon appointment or grow your
            salon business, we've made the process simple and straightforward.
          </p>
        </div>
      </section>

      {/* Process Toggle */}
      <section className="container mx-auto px-4 pb-12">
        <div className="flex justify-center">
          <div className="bg-white rounded-full p-2 shadow-lg border">
            <div className="flex">
              <Button variant="default" className="rounded-full px-8">
                For Customers
              </Button>
              <Button variant="ghost" className="rounded-full px-8">
                <Link href="#salon-owners">For Salon Owners</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Customer Process */}
      <section className="container mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Book Your Perfect Salon Experience
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Find, compare, and book appointments at top-rated salons in just a
            few clicks
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {/* Step 1 */}
          <div className="text-center">
            <div className="bg-purple-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
              <Search className="h-8 w-8 text-purple-600" />
            </div>
            <div className="bg-purple-600 text-white rounded-full w-8 h-8 flex items-center justify-center mx-auto mb-4 text-sm font-bold">
              1
            </div>
            <h3 className="text-xl font-semibold mb-2">Search & Discover</h3>
            <p className="text-gray-600">
              Browse salons by location, services, ratings, and price range
            </p>
          </div>

          {/* Step 2 */}
          <div className="text-center">
            <div className="bg-purple-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
              <MapPin className="h-8 w-8 text-purple-600" />
            </div>
            <div className="bg-purple-600 text-white rounded-full w-8 h-8 flex items-center justify-center mx-auto mb-4 text-sm font-bold">
              2
            </div>
            <h3 className="text-xl font-semibold mb-2">Choose Your Salon</h3>
            <p className="text-gray-600">
              View detailed profiles, services, photos, and customer reviews
            </p>
          </div>

          {/* Step 3 */}
          <div className="text-center">
            <div className="bg-purple-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
              <Calendar className="h-8 w-8 text-purple-600" />
            </div>
            <div className="bg-purple-600 text-white rounded-full w-8 h-8 flex items-center justify-center mx-auto mb-4 text-sm font-bold">
              3
            </div>
            <h3 className="text-xl font-semibold mb-2">Book Appointment</h3>
            <p className="text-gray-600">
              Select services, pick your preferred time, and book instantly
            </p>
          </div>

          {/* Step 4 */}
          <div className="text-center">
            <div className="bg-purple-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="h-8 w-8 text-purple-600" />
            </div>
            <div className="bg-purple-600 text-white rounded-full w-8 h-8 flex items-center justify-center mx-auto mb-4 text-sm font-bold">
              4
            </div>
            <h3 className="text-xl font-semibold mb-2">Enjoy & Review</h3>
            <p className="text-gray-600">
              Get your service done and share your experience with others
            </p>
          </div>
        </div>

        {/* Customer Features */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <Card className="text-center">
            <CardHeader>
              <Clock className="h-12 w-12 text-purple-600 mx-auto mb-4" />
              <CardTitle>Real-Time Availability</CardTitle>
              <CardDescription>
                See live availability and book appointments that fit your
                schedule
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="text-center">
            <CardHeader>
              <Shield className="h-12 w-12 text-purple-600 mx-auto mb-4" />
              <CardTitle>Secure Payments</CardTitle>
              <CardDescription>
                Pay securely online or at the salon with multiple payment
                options
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="text-center">
            <CardHeader>
              <Smartphone className="h-12 w-12 text-purple-600 mx-auto mb-4" />
              <CardTitle>Mobile Friendly</CardTitle>
              <CardDescription>
                Book and manage appointments on any device, anywhere, anytime
              </CardDescription>
            </CardHeader>
          </Card>
        </div>
      </section>

      {/* Salon Owner Process */}
      <section id="salon-owners" className="bg-gray-50 py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Grow Your Salon Business
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Join our platform and start attracting more customers while
              managing your business efficiently
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
            {/* Step 1 */}
            <div className="text-center">
              <div className="bg-blue-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <UserPlus className="h-8 w-8 text-blue-600" />
              </div>
              <div className="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center mx-auto mb-4 text-sm font-bold">
                1
              </div>
              <h3 className="text-xl font-semibold mb-2">Sign Up</h3>
              <p className="text-gray-600">
                Create your salon owner account in just a few minutes
              </p>
            </div>

            {/* Step 2 */}
            <div className="text-center">
              <div className="bg-blue-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Store className="h-8 w-8 text-blue-600" />
              </div>
              <div className="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center mx-auto mb-4 text-sm font-bold">
                2
              </div>
              <h3 className="text-xl font-semibold mb-2">Setup Profile</h3>
              <p className="text-gray-600">
                Add your salon details, services, photos, and pricing
              </p>
            </div>

            {/* Step 3 */}
            <div className="text-center">
              <div className="bg-blue-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Settings className="h-8 w-8 text-blue-600" />
              </div>
              <div className="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center mx-auto mb-4 text-sm font-bold">
                3
              </div>
              <h3 className="text-xl font-semibold mb-2">Manage Bookings</h3>
              <p className="text-gray-600">
                Accept bookings, manage your calendar, and serve customers
              </p>
            </div>

            {/* Step 4 */}
            <div className="text-center">
              <div className="bg-blue-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <TrendingUp className="h-8 w-8 text-blue-600" />
              </div>
              <div className="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center mx-auto mb-4 text-sm font-bold">
                4
              </div>
              <h3 className="text-xl font-semibold mb-2">Grow & Earn</h3>
              <p className="text-gray-600">
                Build your reputation, get more bookings, and increase revenue
              </p>
            </div>
          </div>

          {/* Salon Owner Benefits */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <CreditCard className="h-6 w-6 text-blue-600 mr-2" />
                  Simple Pricing
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">
                  Only pay 10% commission on successful bookings. No setup fees,
                  no monthly charges.
                </p>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                    No upfront costs
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                    Automatic payment processing
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                    Weekly payouts
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Star className="h-6 w-6 text-blue-600 mr-2" />
                  Marketing Support
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">
                  We help promote your salon to thousands of potential
                  customers.
                </p>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                    Featured listings
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                    Social media promotion
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                    SEO optimization
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Process Flow Diagram */}
      <section className="container mx-auto px-4 py-20">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            The Complete Journey
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            See how customers and salon owners interact on our platform
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            {/* Customer Side */}
            <div className="bg-purple-50 rounded-lg p-6">
              <h3 className="text-xl font-bold text-purple-800 mb-4 text-center">
                Customer Journey
              </h3>
              <div className="space-y-4">
                <div className="flex items-center">
                  <div className="bg-purple-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold mr-3">
                    1
                  </div>
                  <span className="text-sm">Searches for salons</span>
                </div>
                <div className="flex items-center">
                  <div className="bg-purple-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold mr-3">
                    2
                  </div>
                  <span className="text-sm">Compares options</span>
                </div>
                <div className="flex items-center">
                  <div className="bg-purple-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold mr-3">
                    3
                  </div>
                  <span className="text-sm">Books appointment</span>
                </div>
                <div className="flex items-center">
                  <div className="bg-purple-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold mr-3">
                    4
                  </div>
                  <span className="text-sm">Receives confirmation</span>
                </div>
                <div className="flex items-center">
                  <div className="bg-purple-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold mr-3">
                    5
                  </div>
                  <span className="text-sm">Visits salon</span>
                </div>
                <div className="flex items-center">
                  <div className="bg-purple-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold mr-3">
                    6
                  </div>
                  <span className="text-sm">Leaves review</span>
                </div>
              </div>
            </div>

            {/* Arrow */}
            <div className="flex justify-center">
              <ArrowRight className="h-8 w-8 text-gray-400 hidden md:block" />
            </div>

            {/* Salon Side */}
            <div className="bg-blue-50 rounded-lg p-6">
              <h3 className="text-xl font-bold text-blue-800 mb-4 text-center">
                Salon Journey
              </h3>
              <div className="space-y-4">
                <div className="flex items-center">
                  <div className="bg-blue-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold mr-3">
                    1
                  </div>
                  <span className="text-sm">Gets booking notification</span>
                </div>
                <div className="flex items-center">
                  <div className="bg-blue-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold mr-3">
                    2
                  </div>
                  <span className="text-sm">Confirms appointment</span>
                </div>
                <div className="flex items-center">
                  <div className="bg-blue-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold mr-3">
                    3
                  </div>
                  <span className="text-sm">Prepares for service</span>
                </div>
                <div className="flex items-center">
                  <div className="bg-blue-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold mr-3">
                    4
                  </div>
                  <span className="text-sm">Serves customer</span>
                </div>
                <div className="flex items-center">
                  <div className="bg-blue-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold mr-3">
                    5
                  </div>
                  <span className="text-sm">Receives payment (90%)</span>
                </div>
                <div className="flex items-center">
                  <div className="bg-blue-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold mr-3">
                    6
                  </div>
                  <span className="text-sm">Builds reputation</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="bg-gray-50 py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Frequently Asked Questions
            </h2>
          </div>

          <div className="max-w-3xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">
                  How do I cancel a booking?
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  You can cancel your booking up to 24 hours before your
                  appointment through your account dashboard or by contacting
                  the salon directly.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">
                  When do salons get paid?
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Salons receive 90% of the booking amount within 7 days after
                  the service is completed. We handle all payment processing
                  securely.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">
                  Is there a booking fee for customers?
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  No, customers don't pay any additional booking fees. You only
                  pay the salon's listed price for the services you book.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">
                  How do I update my salon information?
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Salon owners can update their profile, services, pricing, and
                  availability anytime through the salon dashboard.
                </p>
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
              Ready to Get Started?
            </h2>
            <p className="text-xl text-gray-600 mb-8">
              Join thousands of happy customers and successful salon owners
              today
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-purple-600 hover:bg-purple-700">
                <Link href="/signup/customer">Book Your First Appointment</Link>
              </Button>
              <Button size="lg" variant="outline">
                <Link href="/signup/salon">List Your Salon</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
