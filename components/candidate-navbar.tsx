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
import { BriefcaseIcon, HomeIcon, UserIcon, BellIcon, MenuIcon, XIcon } from "lucide-react"
import { ThemeToggle } from "@/components/theme-toggle"
import { useAuth } from "@/contexts/auth-context"

export function CandidateNavbar() {
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
            <Link href="/candidate/dashboard" className="flex items-center">
              <span className="text-xl font-bold text-brand-dark dark:text-white">RecruitPro</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            <Link
              href="/candidate/dashboard"
              className="flex items-center text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-brand-dark dark:hover:text-white"
              data-tour="dashboard-link"
            >
              <HomeIcon className="h-4 w-4 mr-2" />
              Dashboard
            </Link>
            <Link
              href="/feed"
              className="flex items-center text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-brand-dark dark:hover:text-white"
              data-tour="jobs-link"
            >
              <BriefcaseIcon className="h-4 w-4 mr-2" />
              Browse Jobs
            </Link>
            <Link
              href="/candidate/profile"
              className="flex items-center text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-brand-dark dark:hover:text-white"
              data-tour="profile-link"
            >
              <UserIcon className="h-4 w-4 mr-2" />
              My Profile
            </Link>
            <Link
              href="/candidate/applications"
              className="flex items-center text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-brand-dark dark:hover:text-white"
              data-tour="applications-link"
            >
              <BriefcaseIcon className="h-4 w-4 mr-2" />
              Applications
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
                    <AvatarImage src={user?.photoURL || ""} alt={user?.displayName || "User"} />
                    <AvatarFallback>{user?.displayName?.charAt(0) || "U"}</AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link href="/candidate/profile" className="w-full cursor-pointer">
                    Profile
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/candidate/applications" className="w-full cursor-pointer">
                    My Applications
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/candidate/settings" className="w-full cursor-pointer">
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
              href="/candidate/dashboard"
              className="flex items-center py-2 text-base font-medium text-gray-700 dark:text-gray-300 hover:text-brand-dark dark:hover:text-white"
              onClick={() => setMobileMenuOpen(false)}
              data-tour="dashboard-link-mobile"
            >
              <HomeIcon className="h-5 w-5 mr-3" />
              Dashboard
            </Link>
            <Link
              href="/feed"
              className="flex items-center py-2 text-base font-medium text-gray-700 dark:text-gray-300 hover:text-brand-dark dark:hover:text-white"
              onClick={() => setMobileMenuOpen(false)}
              data-tour="jobs-link-mobile"
            >
              <BriefcaseIcon className="h-5 w-5 mr-3" />
              Browse Jobs
            </Link>
            <Link
              href="/candidate/profile"
              className="flex items-center py-2 text-base font-medium text-gray-700 dark:text-gray-300 hover:text-brand-dark dark:hover:text-white"
              onClick={() => setMobileMenuOpen(false)}
              data-tour="profile-link-mobile"
            >
              <UserIcon className="h-5 w-5 mr-3" />
              My Profile
            </Link>
            <Link
              href="/candidate/applications"
              className="flex items-center py-2 text-base font-medium text-gray-700 dark:text-gray-300 hover:text-brand-dark dark:hover:text-white"
              onClick={() => setMobileMenuOpen(false)}
              data-tour="applications-link-mobile"
            >
              <BriefcaseIcon className="h-5 w-5 mr-3" />
              Applications
            </Link>
          </div>
        )}
      </div>
    </header>
  )
}
