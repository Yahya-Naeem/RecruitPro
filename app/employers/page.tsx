import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { CheckIcon, BarChart3Icon, UsersIcon, CalendarIcon, MessageSquareIcon, SearchIcon } from "lucide-react"
import { ThemeToggle } from "@/components/theme-toggle"
import { BarChart } from "@/components/charts"

export default function EmployersPage() {
  // Mock data for the chart
  const applicationData = [
    { name: "Week 1", value: 45 },
    { name: "Week 2", value: 62 },
    { name: "Week 3", value: 78 },
    { name: "Week 4", value: 95 },
  ]

  return (
    <div className="flex flex-col min-h-screen">
      {/* Header */}
      <header className="bg-brand-dark text-white">
        <div className="container mx-auto px-4 py-6">
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <Link href="/" className="text-2xl font-bold">
                RecruitPro
              </Link>
            </div>
            <nav className="hidden md:flex space-x-8">
              <Link href="/jobs" className="hover:text-gray-300 transition-colors">
                Browse Jobs
              </Link>
              <Link href="/employers" className="hover:text-gray-300 transition-colors">
                For Employers
              </Link>
              <Link href="/about" className="hover:text-gray-300 transition-colors">
                About Us
              </Link>
            </nav>
            <div className="flex items-center space-x-4">
              <ThemeToggle />
              <Link href="/login">
                <Button variant="outline" className="bg-transparent border-white hover:bg-white hover:text-brand-dark">
                  Log In
                </Button>
              </Link>
              <Link href="/signup">
                <Button className="bg-white text-brand-dark hover:bg-gray-200">Sign Up</Button>
              </Link>
            </div>
          </div>
        </div>

        <div className="container mx-auto px-4 py-20">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Hire the Best Talent with RecruitPro</h1>
            <p className="text-xl mb-8">
              Our AI-powered platform helps you find, evaluate, and hire the perfect candidates faster and more
              efficiently than ever before.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/signup?type=employer">
                <Button size="lg" className="bg-white text-brand-dark hover:bg-gray-200 w-full sm:w-auto">
                  Get Started
                </Button>
              </Link>
              <Link href="#features">
                <Button
                  size="lg"
                  variant="outline"
                  className="bg-transparent border-white hover:bg-white hover:text-brand-dark w-full sm:w-auto"
                >
                  Learn More
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow">
        {/* Stats Section */}
        <section className="py-16 bg-gray-50 dark:bg-gray-900">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-md text-center">
                <div className="text-4xl font-bold text-brand-dark dark:text-brand-light mb-2">85%</div>
                <p className="text-gray-600 dark:text-gray-400">Faster time-to-hire compared to traditional methods</p>
              </div>
              <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-md text-center">
                <div className="text-4xl font-bold text-brand-dark dark:text-brand-light mb-2">92%</div>
                <p className="text-gray-600 dark:text-gray-400">Of employers report better quality candidates</p>
              </div>
              <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-md text-center">
                <div className="text-4xl font-bold text-brand-dark dark:text-brand-light mb-2">3.5x</div>
                <p className="text-gray-600 dark:text-gray-400">Return on investment for recruitment spending</p>
              </div>
            </div>
          </div>
        </section>

        {/* Application Trends Chart */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold mb-8 text-center">Track Your Recruitment Performance</h2>
              <Card>
                <CardContent className="pt-6">
                  <h3 className="text-xl font-semibold mb-4">Application Trends</h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-6">
                    Monitor application volume and quality over time with our comprehensive analytics dashboard.
                  </p>
                  <div className="h-[300px]">
                    <BarChart data={applicationData} className="h-full" />
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="py-16 bg-gray-50 dark:bg-gray-900">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-12 text-center">Powerful Recruitment Tools</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
                <div className="w-12 h-12 bg-brand-light/20 rounded-full flex items-center justify-center mb-4">
                  <SearchIcon className="h-6 w-6 text-brand-dark dark:text-brand-light" />
                </div>
                <h3 className="text-xl font-bold mb-2">AI-Powered Candidate Matching</h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Our intelligent algorithms match candidates to your job requirements with unprecedented accuracy.
                </p>
              </div>

              <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
                <div className="w-12 h-12 bg-brand-light/20 rounded-full flex items-center justify-center mb-4">
                  <BarChart3Icon className="h-6 w-6 text-brand-dark dark:text-brand-light" />
                </div>
                <h3 className="text-xl font-bold mb-2">Comprehensive Analytics</h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Gain insights into your recruitment process with detailed metrics and performance tracking.
                </p>
              </div>

              <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
                <div className="w-12 h-12 bg-brand-light/20 rounded-full flex items-center justify-center mb-4">
                  <UsersIcon className="h-6 w-6 text-brand-dark dark:text-brand-light" />
                </div>
                <h3 className="text-xl font-bold mb-2">Candidate Database</h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Build and maintain a searchable database of qualified candidates for future openings.
                </p>
              </div>

              <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
                <div className="w-12 h-12 bg-brand-light/20 rounded-full flex items-center justify-center mb-4">
                  <MessageSquareIcon className="h-6 w-6 text-brand-dark dark:text-brand-light" />
                </div>
                <h3 className="text-xl font-bold mb-2">AI Message Generation</h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Create personalized candidate communications with our AI-powered message templates.
                </p>
              </div>

              <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
                <div className="w-12 h-12 bg-brand-light/20 rounded-full flex items-center justify-center mb-4">
                  <CalendarIcon className="h-6 w-6 text-brand-dark dark:text-brand-light" />
                </div>
                <h3 className="text-xl font-bold mb-2">Interview Scheduling</h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Seamlessly schedule and manage interviews with calendar integration and automated reminders.
                </p>
              </div>

              <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
                <div className="w-12 h-12 bg-brand-light/20 rounded-full flex items-center justify-center mb-4">
                  <CheckIcon className="h-6 w-6 text-brand-dark dark:text-brand-light" />
                </div>
                <h3 className="text-xl font-bold mb-2">Collaborative Hiring</h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Involve your entire team in the hiring process with collaborative tools and feedback systems.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-12 text-center">What Employers Say</h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 rounded-full overflow-hidden bg-gray-200 dark:bg-gray-700 mr-4">
                    <img
                      src="/placeholder.svg?height=48&width=48"
                      alt="Sarah Johnson"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <h4 className="font-bold">Sarah Johnson</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">HR Director, TechCorp</p>
                  </div>
                </div>
                <p className="text-gray-600 dark:text-gray-400">
                  "RecruitPro has transformed our hiring process. We've reduced our time-to-hire by 60% and the quality
                  of candidates has improved dramatically."
                </p>
              </div>

              <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 rounded-full overflow-hidden bg-gray-200 dark:bg-gray-700 mr-4">
                    <img
                      src="/placeholder.svg?height=48&width=48"
                      alt="Michael Chen"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <h4 className="font-bold">Michael Chen</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">CEO, StartupX</p>
                  </div>
                </div>
                <p className="text-gray-600 dark:text-gray-400">
                  "As a startup, finding the right talent is critical. RecruitPro's AI matching has helped us build our
                  team with precision and efficiency."
                </p>
              </div>

              <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 rounded-full overflow-hidden bg-gray-200 dark:bg-gray-700 mr-4">
                    <img
                      src="/placeholder.svg?height=48&width=48"
                      alt="Jessica Martinez"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <h4 className="font-bold">Jessica Martinez</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Talent Acquisition, Global Corp</p>
                  </div>
                </div>
                <p className="text-gray-600 dark:text-gray-400">
                  "The analytics and reporting features have given us unprecedented insights into our recruitment
                  funnel. We can now make data-driven decisions."
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Pricing */}
        <section className="py-16 bg-gray-50 dark:bg-gray-900">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-12 text-center">Simple, Transparent Pricing</h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
                <div className="p-6 border-b border-gray-200 dark:border-gray-700">
                  <h3 className="text-xl font-bold mb-2">Starter</h3>
                  <div className="text-3xl font-bold mb-2">
                    $99<span className="text-sm font-normal text-gray-600 dark:text-gray-400">/month</span>
                  </div>
                  <p className="text-gray-600 dark:text-gray-400">Perfect for small businesses</p>
                </div>
                <div className="p-6">
                  <ul className="space-y-3">
                    <li className="flex items-center">
                      <CheckIcon className="h-5 w-5 text-green-500 mr-2" />
                      <span>Up to 5 active job postings</span>
                    </li>
                    <li className="flex items-center">
                      <CheckIcon className="h-5 w-5 text-green-500 mr-2" />
                      <span>Basic candidate matching</span>
                    </li>
                    <li className="flex items-center">
                      <CheckIcon className="h-5 w-5 text-green-500 mr-2" />
                      <span>Email support</span>
                    </li>
                  </ul>
                  <Link href="/signup?type=employer&plan=starter" className="block mt-6">
                    <Button className="w-full">Get Started</Button>
                  </Link>
                </div>
              </div>

              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden transform scale-105 border-2 border-brand-dark dark:border-brand-light">
                <div className="p-6 border-b border-gray-200 dark:border-gray-700 bg-brand-dark dark:bg-brand text-white">
                  <h3 className="text-xl font-bold mb-2">Professional</h3>
                  <div className="text-3xl font-bold mb-2">
                    $199<span className="text-sm font-normal text-gray-300">/month</span>
                  </div>
                  <p className="text-gray-300">Most popular for growing teams</p>
                </div>
                <div className="p-6">
                  <ul className="space-y-3">
                    <li className="flex items-center">
                      <CheckIcon className="h-5 w-5 text-green-500 mr-2" />
                      <span>Up to 15 active job postings</span>
                    </li>
                    <li className="flex items-center">
                      <CheckIcon className="h-5 w-5 text-green-500 mr-2" />
                      <span>Advanced AI candidate matching</span>
                    </li>
                    <li className="flex items-center">
                      <CheckIcon className="h-5 w-5 text-green-500 mr-2" />
                      <span>Priority email & phone support</span>
                    </li>
                    <li className="flex items-center">
                      <CheckIcon className="h-5 w-5 text-green-500 mr-2" />
                      <span>AI message generation</span>
                    </li>
                    <li className="flex items-center">
                      <CheckIcon className="h-5 w-5 text-green-500 mr-2" />
                      <span>Calendar integration</span>
                    </li>
                  </ul>
                  <Link href="/signup?type=employer&plan=professional" className="block mt-6">
                    <Button className="w-full">Get Started</Button>
                  </Link>
                </div>
              </div>

              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
                <div className="p-6 border-b border-gray-200 dark:border-gray-700">
                  <h3 className="text-xl font-bold mb-2">Enterprise</h3>
                  <div className="text-3xl font-bold mb-2">
                    $399<span className="text-sm font-normal text-gray-600 dark:text-gray-400">/month</span>
                  </div>
                  <p className="text-gray-600 dark:text-gray-400">For large organizations</p>
                </div>
                <div className="p-6">
                  <ul className="space-y-3">
                    <li className="flex items-center">
                      <CheckIcon className="h-5 w-5 text-green-500 mr-2" />
                      <span>Unlimited job postings</span>
                    </li>
                    <li className="flex items-center">
                      <CheckIcon className="h-5 w-5 text-green-500 mr-2" />
                      <span>Premium AI candidate matching</span>
                    </li>
                    <li className="flex items-center">
                      <CheckIcon className="h-5 w-5 text-green-500 mr-2" />
                      <span>Dedicated account manager</span>
                    </li>
                    <li className="flex items-center">
                      <CheckIcon className="h-5 w-5 text-green-500 mr-2" />
                      <span>Custom integrations</span>
                    </li>
                    <li className="flex items-center">
                      <CheckIcon className="h-5 w-5 text-green-500 mr-2" />
                      <span>Advanced analytics</span>
                    </li>
                  </ul>
                  <Link href="/signup?type=employer&plan=enterprise" className="block mt-6">
                    <Button className="w-full">Contact Sales</Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-brand-dark text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-6">Ready to Transform Your Hiring Process?</h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto">
              Join thousands of employers who are already finding better candidates faster with RecruitPro.
            </p>
            <Link href="/signup?type=employer">
              <Button size="lg" className="bg-white text-brand-dark hover:bg-gray-200">
                Get Started Today
              </Button>
            </Link>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4">RecruitPro</h3>
              <p className="text-gray-400">Connecting talented professionals with the best opportunities worldwide.</p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">For Job Seekers</h4>
              <ul className="space-y-2">
                <li>
                  <Link href="/jobs" className="text-gray-400 hover:text-white">
                    Browse Jobs
                  </Link>
                </li>
                <li>
                  <Link href="/signup?type=candidate" className="text-gray-400 hover:text-white">
                    Create Profile
                  </Link>
                </li>
                <li>
                  <Link href="/resources" className="text-gray-400 hover:text-white">
                    Career Resources
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">For Employers</h4>
              <ul className="space-y-2">
                <li>
                  <Link href="/employers" className="text-gray-400 hover:text-white">
                    Why RecruitPro
                  </Link>
                </li>
                <li>
                  <Link href="/signup?type=employer" className="text-gray-400 hover:text-white">
                    Post a Job
                  </Link>
                </li>
                <li>
                  <Link href="/pricing" className="text-gray-400 hover:text-white">
                    Pricing
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-2">
                <li>
                  <Link href="/about" className="text-gray-400 hover:text-white">
                    About Us
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="text-gray-400 hover:text-white">
                    Contact
                  </Link>
                </li>
                <li>
                  <Link href="/privacy" className="text-gray-400 hover:text-white">
                    Privacy Policy
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; {new Date().getFullYear()} RecruitPro. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
