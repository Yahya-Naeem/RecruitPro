"use client"

import Link from "next/link"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  LayoutDashboardIcon,
  BriefcaseIcon,
  UsersIcon,
  BarChartIcon,
  BellIcon,
  MenuIcon,
  XIcon,
  MailIcon,
  PlusCircleIcon,
} from "lucide-react"
import { ThemeToggle } from "@/components/theme-toggle"
import { useAuth } from "@/contexts/auth-context"

export function AdminNavbar() {
  const { user, logout } = useAuth()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [isFixed, setIsFixed] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsFixed(true)
      } else {
        setIsFixed(false)
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const handleLogout = async () => {
    try {
      await logout()
    } catch (error) {
      console.error("Error logging out:", error)
    }
  }

  return (
    <header
      className={`bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 w-full z-40 ${
        isFixed ? "fixed top-0 left-0 right-0 shadow-sm" : ""
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center">
            <Link href="/admin/dashboard" className="flex items-center">
              <span className="text-xl font-bold text-brand-dark dark:text-white">RecruitPro</span>
              <span className="ml-2 text-xs bg-brand-light/20 text-brand-dark dark:bg-brand-light/30 dark:text-white px-2 py-0.5 rounded-full">
                Admin
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-4 lg:space-x-6">
            <Link
              href="/admin/dashboard"
              className="flex items-center text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-brand-dark dark:hover:text-white"
              data-tour="dashboard-link"
            >
              <LayoutDashboardIcon className="h-4 w-4 mr-2" />
              Dashboard
            </Link>
            <Link
              href="/admin/post-job"
              className="flex items-center text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-brand-dark dark:hover:text-white"
              data-tour="post-job"
            >
              <PlusCircleIcon className="h-4 w-4 mr-2" />
              Post Job
            </Link>
            <Link
              href="/admin/jobs"
              className="flex items-center text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-brand-dark dark:hover:text-white"
              data-tour="jobs-link"
            >
              <BriefcaseIcon className="h-4 w-4 mr-2" />
              Jobs
            </Link>
            <Link
              href="/admin/candidates"
              className="flex items-center text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-brand-dark dark:hover:text-white"
              data-tour="candidates-link"
            >
              <UsersIcon className="h-4 w-4 mr-2" />
              Candidates
            </Link>
            <Link
              href="/admin/analytics"
              className="flex items-center text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-brand-dark dark:hover:text-white"
              data-tour="analytics-link"
            >
              <BarChartIcon className="h-4 w-4 mr-2" />
              Analytics
            </Link>
            <Link
              href="/admin/communications"
              className="flex items-center text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-brand-dark dark:hover:text-white"
              data-tour="communications-link"
            >
              <MailIcon className="h-4 w-4 mr-2" />
              Messages
            </Link>
          </nav>

          <div className="flex items-center space-x-4">
            <ThemeToggle />

            <Button variant="ghost" size="icon" className="relative">
              <BellIcon className="h-5 w-5" />
              <span className="absolute top-0 right-0 h-2 w-2 rounded-full bg-red-500"></span>
            </Button>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={user?.photoURL || ""} alt={user?.displayName || "Admin"} />
                    <AvatarFallback>{user?.displayName?.charAt(0) || "A"}</AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>Admin Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link href="/admin/profile" className="w-full cursor-pointer" data-tour="profile-link">
                    Company Profile
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/admin/settings" className="w-full cursor-pointer">
                    Settings
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleLogout} className="cursor-pointer">
                  Log out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Mobile menu button */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <XIcon className="h-5 w-5" /> : <MenuIcon className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 space-y-2 animate-in slide-in-from-top-5">
            <Link
              href="/admin/dashboard"
              className="flex items-center py-2 text-base font-medium text-gray-700 dark:text-gray-300 hover:text-brand-dark dark:hover:text-white"
              onClick={() => setMobileMenuOpen(false)}
              data-tour="dashboard-link-mobile"
            >
              <LayoutDashboardIcon className="h-5 w-5 mr-3" />
              Dashboard
            </Link>
            <Link
              href="/admin/post-job"
              className="flex items-center py-2 text-base font-medium text-gray-700 dark:text-gray-300 hover:text-brand-dark dark:hover:text-white"
              onClick={() => setMobileMenuOpen(false)}
              data-tour="post-job-mobile"
            >
              <PlusCircleIcon className="h-5 w-5 mr-3" />
              Post Job
            </Link>
            <Link
              href="/admin/jobs"
              className="flex items-center py-2 text-base font-medium text-gray-700 dark:text-gray-300 hover:text-brand-dark dark:hover:text-white"
              onClick={() => setMobileMenuOpen(false)}
              data-tour="jobs-link-mobile"
            >
              <BriefcaseIcon className="h-5 w-5 mr-3" />
              Jobs
            </Link>
            <Link
              href="/admin/candidates"
              className="flex items-center py-2 text-base font-medium text-gray-700 dark:text-gray-300 hover:text-brand-dark dark:hover:text-white"
              onClick={() => setMobileMenuOpen(false)}
              data-tour="candidates-link-mobile"
            >
              <UsersIcon className="h-5 w-5 mr-3" />
              Candidates
            </Link>
            <Link
              href="/admin/analytics"
              className="flex items-center py-2 text-base font-medium text-gray-700 dark:text-gray-300 hover:text-brand-dark dark:hover:text-white"
              onClick={() => setMobileMenuOpen(false)}
              data-tour="analytics-link-mobile"
            >
              <BarChartIcon className="h-5 w-5 mr-3" />
              Analytics
            </Link>
            <Link
              href="/admin/communications"
              className="flex items-center py-2 text-base font-medium text-gray-700 dark:text-gray-300 hover:text-brand-dark dark:hover:text-white"
              onClick={() => setMobileMenuOpen(false)}
              data-tour="communications-link-mobile"
            >
              <MailIcon className="h-5 w-5 mr-3" />
              Messages
            </Link>
          </div>
        )}
      </div>
    </header>
  )
}
