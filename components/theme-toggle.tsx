"use client"

import { useState, useEffect } from "react"
import { useTheme } from "next-themes"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { SunIcon, MoonIcon, EyeIcon } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

export function ThemeToggle() {
  const { setTheme, theme } = useTheme()
  const [colorBlindMode, setColorBlindMode] = useState(false)

  useEffect(() => {
    // Check if color blind mode was previously enabled
    const savedColorBlindMode = localStorage.getItem("color-blind-mode") === "true"
    setColorBlindMode(savedColorBlindMode)

    if (savedColorBlindMode) {
      document.documentElement.classList.add("color-blind-mode")
    }
  }, [])

  const toggleColorBlindMode = () => {
    const newValue = !colorBlindMode
    setColorBlindMode(newValue)
    localStorage.setItem("color-blind-mode", String(newValue))

    if (newValue) {
      document.documentElement.classList.add("color-blind-mode")
    } else {
      document.documentElement.classList.remove("color-blind-mode")
    }
  }

  return (
    <div className="flex items-center space-x-4">
      <div className="flex items-center space-x-2">
        <Switch id="color-blind-mode" checked={colorBlindMode} onCheckedChange={toggleColorBlindMode} />
        <Label htmlFor="color-blind-mode" className="flex items-center">
          <EyeIcon className="h-4 w-4 mr-1" />
          <span className="sr-only sm:not-sr-only sm:text-xs">Color Blind Mode</span>
        </Label>
      </div>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" size="icon">
            <SunIcon className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
            <MoonIcon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
            <span className="sr-only">Toggle theme</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem onClick={() => setTheme("light")}>Light</DropdownMenuItem>
          <DropdownMenuItem onClick={() => setTheme("dark")}>Dark</DropdownMenuItem>
          <DropdownMenuItem onClick={() => setTheme("system")}>System</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}
