import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { BriefcaseIcon, MapPinIcon, ClockIcon, ArrowRightIcon } from "lucide-react"
import { ThemeToggle } from "@/components/theme-toggle"

export default function LandingPage() {
  // This would come from your API in a real application
  const featuredJobs = [
    {
      id: 1,
      title: "Senior Frontend Developer",
      company: "TechCorp",
      location: "San Francisco, CA (Remote)",
      type: "Full-time",
      postedAt: "2 days ago",
      skills: ["React", "TypeScript", "Next.js"],
    },
    {
      id: 2,
      title: "UX/UI Designer",
      company: "DesignHub",
      location: "New York, NY",
      type: "Full-time",
      postedAt: "1 week ago",
      skills: ["Figma", "Adobe XD", "User Research"],
    },
    {
      id: 3,
      title: "Backend Engineer",
      company: "DataSystems",
      location: "Austin, TX (Hybrid)",
      type: "Full-time",
      postedAt: "3 days ago",
      skills: ["Go", "PostgreSQL", "Docker"],
    },
    {
      id: 4,
      title: "Financial Analyst",
      company: "FinGroup",
      location: "Chicago, IL",
      type: "Full-time",
      postedAt: "5 days ago",
      skills: ["Financial Modeling", "Excel", "Data Analysis"],
    },
  ]

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <header className="bg-brand-dark text-white">
        <div className="container mx-auto px-4 py-6">
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold">RecruitPro</h1>
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
            <h2 className="text-4xl md:text-5xl font-bold mb-6">Find Your Dream Job Today</h2>
            <p className="text-xl mb-8">
              Connect with top employers and discover opportunities that match your skills and career goals.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/signup">
                <Button size="lg" className="bg-white text-brand-dark hover:bg-gray-200">
                  Create Account
                </Button>
              </Link>
              <Link href="/jobs">
                <Button
                  size="lg"
                  variant="outline"
                  className="bg-transparent border-white hover:bg-white hover:text-brand-dark"
                >
                  Browse Jobs
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Featured Jobs Section */}
      <section className="py-16 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-10">
            <h2 className="text-3xl font-bold">Featured Jobs</h2>
            <Link href="/jobs" className="text-brand hover:text-brand-light flex items-center">
              View all jobs <ArrowRightIcon className="ml-2 h-4 w-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredJobs.map((job) => (
              <Card key={job.id} className="hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="mb-4">
                    <h3 className="text-xl font-semibold mb-1">{job.title}</h3>
                    <p className="text-muted-foreground mb-2">{job.company}</p>
                    <div className="flex items-center text-muted-foreground mb-2">
                      <MapPinIcon className="h-4 w-4 mr-1" />
                      <span className="text-sm">{job.location}</span>
                    </div>
                    <div className="flex items-center text-muted-foreground">
                      <ClockIcon className="h-4 w-4 mr-1" />
                      <span className="text-sm">{job.postedAt}</span>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {job.skills.map((skill) => (
                      <Badge key={skill} variant="secondary">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                  <div className="flex justify-between items-center">
                    <Badge variant="outline" className="flex items-center">
                      <BriefcaseIcon className="h-3 w-3 mr-1" />
                      {job.type}
                    </Badge>
                    <Link href={`/login?redirect=/jobs/${job.id}`}>
                      <Button variant="outline" size="sm">
                        Apply Now
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-16 dark:bg-gray-800">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">How It Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-brand-light/20 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <span className="text-brand-dark dark:text-white text-2xl font-bold">1</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Create Your Profile</h3>
              <p className="text-muted-foreground">
                Sign up and build your professional profile with your experience, skills, and resume.
              </p>
            </div>
            <div className="text-center">
              <div className="bg-brand-light/20 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <span className="text-brand-dark dark:text-white text-2xl font-bold">2</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Discover Opportunities</h3>
              <p className="text-muted-foreground">
                Browse through job listings or get matched with positions that fit your skills and preferences.
              </p>
            </div>
            <div className="text-center">
              <div className="bg-brand-light/20 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <span className="text-brand-dark dark:text-white text-2xl font-bold">3</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Apply and Connect</h3>
              <p className="text-muted-foreground">
                Apply to jobs with a single click and connect directly with employers who are interested in your
                profile.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* For Employers Section */}
      <section className="py-16 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 mb-8 md:mb-0 md:pr-8">
              <h2 className="text-3xl font-bold mb-4">For Employers</h2>
              <p className="text-muted-foreground mb-6">
                Find the perfect candidates for your open positions. Our platform helps you identify the best matches
                based on skills, experience, and other criteria.
              </p>
              <ul className="space-y-3 mb-6">
                <li className="flex items-start">
                  <div className="bg-green-100 dark:bg-green-900 rounded-full p-1 mr-3 mt-1">
                    <svg className="h-3 w-3 text-green-600 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20">
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <span>Post job listings with detailed requirements</span>
                </li>
                <li className="flex items-start">
                  <div className="bg-green-100 dark:bg-green-900 rounded-full p-1 mr-3 mt-1">
                    <svg className="h-3 w-3 text-green-600 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20">
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <span>Access analytics to track application metrics</span>
                </li>
                <li className="flex items-start">
                  <div className="bg-green-100 dark:bg-green-900 rounded-full p-1 mr-3 mt-1">
                    <svg className="h-3 w-3 text-green-600 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20">
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <span>View candidates categorized by match quality</span>
                </li>
              </ul>
              <Link href="/signup?type=employer">
                <Button className="bg-brand-dark hover:bg-brand text-white">Get Started as Employer</Button>
              </Link>
            </div>
            <div className="md:w-1/2">
              <img
                src="/placeholder.svg?height=400&width=600"
                alt="Employer Dashboard"
                className="rounded-lg shadow-lg"
                width={600}
                height={400}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-brand-dark text-white py-12">
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
                  <Link href="/browse-jobs" className="text-gray-400 hover:text-white">
                    Browse Jobs
                  </Link>
                </li>
                <li>
                  <Link href="/create-profile" className="text-gray-400 hover:text-white">
                    Create Profile
                  </Link>
                </li>
                <li>
                  <Link href="/job-alerts" className="text-gray-400 hover:text-white">
                    Job Alerts
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">For Employers</h4>
              <ul className="space-y-2">
                <li>
                  <Link href="/post-job" className="text-gray-400 hover:text-white">
                    Post a Job
                  </Link>
                </li>
                <li>
                  <Link href="/browse-candidates" className="text-gray-400 hover:text-white">
                    Browse Candidates
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
