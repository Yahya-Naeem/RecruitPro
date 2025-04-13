import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ThemeToggle } from "@/components/theme-toggle"

export default function AboutPage() {
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
      </header>

      {/* Main Content */}
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="bg-gray-50 dark:bg-gray-900 py-16 md:py-24">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl font-bold mb-6">About RecruitPro</h1>
              <p className="text-xl text-gray-600 dark:text-gray-400 mb-8">
                Revolutionizing the recruitment process through innovation and technology
              </p>
            </div>
          </div>
        </section>

        {/* Our Story Section */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold mb-8 text-center">Our Story</h2>
              <div className="prose dark:prose-invert max-w-none">
                <p className="text-lg mb-6">
                  RecruitPro was born from the vision and experiences of its founders, Yahya and Mehma. Drawing from
                  their personal challenges navigating the job application landscape, they set out to create a platform
                  that would transform how candidates and employers connect.
                </p>
                <p className="text-lg mb-6">
                  Having experienced firsthand the inefficiencies and frustrations of traditional recruitment processes,
                  Yahya and Mehma designed RecruitPro to streamline job applications and candidate management. Their
                  goal was to create an intuitive, powerful system that would benefit both job seekers and hiring
                  managers.
                </p>
                <p className="text-lg mb-6">
                  RecruitPro represents a significant advancement in recruitment technology, offering a seamless user
                  experience that simplifies every step of the hiring journey. By incorporating cutting-edge AI tools,
                  intelligent matching algorithms, and comprehensive management features, the platform ushers in a new
                  era of application management.
                </p>
                <p className="text-lg mb-6">
                  As one of its kind in the recruitment space, RecruitPro continues to evolve based on user feedback and
                  technological advancements. Yahya and Mehma remain committed to their original vision: creating a
                  platform that makes finding the right job—or the right candidate—more efficient, transparent, and
                  successful for everyone involved.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Mission & Values */}
        <section className="py-16 bg-gray-50 dark:bg-gray-900">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold mb-8 text-center">Our Mission & Values</h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
                <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-md">
                  <h3 className="text-xl font-bold mb-4">Our Mission</h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    To transform the recruitment process by connecting the right talent with the right opportunities
                    through innovative technology and a human-centered approach.
                  </p>
                </div>

                <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-md">
                  <h3 className="text-xl font-bold mb-4">Our Vision</h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    A world where finding the perfect job or candidate is efficient, transparent, and accessible to
                    everyone, regardless of background or industry.
                  </p>
                </div>
              </div>

              <h3 className="text-2xl font-bold mb-6 text-center">Core Values</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
                  <h4 className="text-lg font-bold mb-2">Innovation</h4>
                  <p className="text-gray-600 dark:text-gray-400">
                    We constantly push boundaries to create better solutions for recruitment challenges.
                  </p>
                </div>

                <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
                  <h4 className="text-lg font-bold mb-2">Transparency</h4>
                  <p className="text-gray-600 dark:text-gray-400">
                    We believe in clear, honest communication throughout the hiring process.
                  </p>
                </div>

                <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
                  <h4 className="text-lg font-bold mb-2">Inclusivity</h4>
                  <p className="text-gray-600 dark:text-gray-400">
                    We're committed to creating equal opportunities for all job seekers and employers.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Team Section */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold mb-12 text-center">Meet Our Founders</h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                <div className="text-center">
                  <div className="w-48 h-48 rounded-full overflow-hidden mx-auto mb-6 bg-gray-200 dark:bg-gray-700">
                    <img
                      src="/placeholder.svg?height=192&width=192"
                      alt="Yahya"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <h3 className="text-xl font-bold mb-2">Yahya</h3>
                  <p className="text-brand-dark dark:text-brand-light mb-4">Co-Founder & CEO</p>
                  <p className="text-gray-600 dark:text-gray-400">
                    With a background in technology and recruitment, Yahya brings a unique perspective to solving hiring
                    challenges.
                  </p>
                </div>

                <div className="text-center">
                  <div className="w-48 h-48 rounded-full overflow-hidden mx-auto mb-6 bg-gray-200 dark:bg-gray-700">
                    <img
                      src="/placeholder.svg?height=192&width=192"
                      alt="Mehma"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <h3 className="text-xl font-bold mb-2">Mehma</h3>
                  <p className="text-brand-dark dark:text-brand-light mb-4">Co-Founder & CTO</p>
                  <p className="text-gray-600 dark:text-gray-400">
                    Mehma's expertise in AI and user experience design has shaped RecruitPro's innovative features and
                    intuitive interface.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-brand-dark text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-6">Ready to Transform Your Recruitment Process?</h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto">
              Join thousands of candidates and employers who are already experiencing the future of recruitment with
              RecruitPro.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link href="/signup?type=candidate">
                <Button size="lg" className="bg-white text-brand-dark hover:bg-gray-200 w-full sm:w-auto">
                  Sign Up as Candidate
                </Button>
              </Link>
              <Link href="/signup?type=employer">
                <Button
                  size="lg"
                  variant="outline"
                  className="bg-transparent border-white hover:bg-white hover:text-brand-dark w-full sm:w-auto"
                >
                  Sign Up as Employer
                </Button>
              </Link>
            </div>
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
