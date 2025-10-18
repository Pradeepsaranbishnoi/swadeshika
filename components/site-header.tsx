"use client"

import Link from "next/link"
import Image from "next/image"
import { Search, User, Menu, Heart, X, ShoppingBag, Package, Phone, MapPin, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Sheet, SheetContent, SheetTrigger, SheetClose } from "@/components/ui/sheet"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { AnnouncementBar } from "@/components/announcement-bar"
import { CartButton } from "@/components/cart-button"
import { useState } from "react"
import { useRouter } from "next/navigation"

/**
 * Navigation structure for the site
 * Organized by categories with icons for better mobile UX
 */
const navigation = [
  { name: "Shop All", href: "/shop", icon: ShoppingBag },
  { name: "Ghee", href: "/shop/ghee", icon: Package },
  { name: "Spices", href: "/shop/spices", icon: Package },
  { name: "Dry Fruits", href: "/shop/dry-fruits", icon: Package },
  { name: "Oils", href: "/shop/oils", icon: Package },
]

/**
 * Quick links for mobile menu
 */
const quickLinks = [
  { name: "Track Order", href: "/track-order", icon: MapPin },
  { name: "Contact Us", href: "/contact", icon: Phone },
]

/**
 * SiteHeader Component
 *
 * Main navigation header with responsive design optimized for mobile, tablet, and desktop
 *
 * Features:
 * - Announcement bar for promotions
 * - Sticky header with backdrop blur
 * - Mobile-optimized slide-in menu with categories and quick links
 * - Tablet-responsive layout with optimized breakpoints
 * - Desktop navigation with full menu
 * - Search functionality (desktop and mobile)
 * - Cart, wishlist, and user account access
 *
 * Mobile/Tablet Improvements:
 * - Full-screen mobile menu with smooth animations
 * - Category icons for better visual navigation
 * - Integrated search in mobile menu
 * - Quick access to account and orders
 * - Better touch targets for mobile users
 */
export function SiteHeader() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [mobileSearchValue, setMobileSearchValue] = useState("")
  const [desktopSearchValue, setDesktopSearchValue] = useState("")
  const router = useRouter()

  const submitSearch = (value: string) => {
    const q = value.trim()
    router.push(q ? `/shop?q=${encodeURIComponent(q)}` : "/shop")
    setMobileMenuOpen(false)
  }

  return (
    <>
      {/* Announcement bar for promotions */}
      <AnnouncementBar />

      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-4">
          {/* Top bar - Hidden on mobile for cleaner design */}
          <div className="hidden md:flex h-12 items-center justify-between border-b text-sm">
            <p className="text-muted-foreground">Free shipping on orders above ₹999</p>
            <div className="flex items-center gap-6">
              <Link href="/track-order" className="text-muted-foreground hover:text-primary transition-colors">
                Track Order
              </Link>
              <Link href="/contact" className="text-muted-foreground hover:text-primary transition-colors">
                Contact
              </Link>
            </div>
          </div>

          {/* Main header */}
          <div className="flex h-16 md:h-20 items-center justify-between gap-2 md:gap-4">
            <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
              <SheetTrigger asChild className="lg:hidden">
                <Button variant="ghost" size="icon" className="h-10 w-10">
                  <Menu className="h-5 w-5" />
                  <span className="sr-only">Toggle menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-full sm:w-96 p-0">
                {/* Mobile menu header */}
                <div className="flex items-center justify-between p-4 border-b">
                  <Link href="/" onClick={() => setMobileMenuOpen(false)} className="flex items-center gap-2">
                    <div className="relative h-8 w-8">
                      <Image
                        src="/logo.png"
                        alt="Swadeshika Logo"
                        width={32}
                        height={32}
                        className="object-contain"
                      />
                    </div>
                    <span className="font-bold text-xl">Swadeshika</span>
                  </Link>
                  <SheetClose asChild>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <X className="h-5 w-5" />
                    </Button>
                  </SheetClose>
                </div>

                {/* Mobile menu content */}
                <div className="flex flex-col h-[calc(100vh-73px)] overflow-y-auto">
                  {/* Search in mobile menu */}
                  <div className="p-4 border-b">
                    <form
                    className="relative"
                    onSubmit={(e) => {
                      e.preventDefault()
                      submitSearch(mobileSearchValue)
                    }}
                  >
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      type="search"
                      placeholder="Search products..."
                      className="pl-9 h-11"
                      value={mobileSearchValue}
                      onChange={(e) => setMobileSearchValue(e.target.value)}
                    />
                  </form>
                  </div>

                  {/* Navigation categories */}
                  <nav className="flex-1 p-4">
                    <div className="space-y-1">
                      <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">
                        Categories
                      </p>
                      {navigation.map((item) => {
                        const Icon = item.icon
                        return (
                          <Link
                            key={item.name}
                            href={item.href}
                            onClick={() => setMobileMenuOpen(false)}
                            className="flex items-center justify-between p-3 rounded-lg hover:bg-accent transition-colors group"
                          >
                            <div className="flex items-center gap-3">
                              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                                <Icon className="h-5 w-5" />
                              </div>
                              <span className="font-medium">{item.name}</span>
                            </div>
                            <ChevronRight className="h-4 w-4 text-muted-foreground" />
                          </Link>
                        )
                      })}
                    </div>

                    {/* Quick links */}
                    <div className="mt-6 space-y-1">
                      <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">
                        Quick Links
                      </p>
                      {quickLinks.map((item) => {
                        const Icon = item.icon
                        return (
                          <Link
                            key={item.name}
                            href={item.href}
                            onClick={() => setMobileMenuOpen(false)}
                            className="flex items-center gap-3 p-3 rounded-lg hover:bg-accent transition-colors"
                          >
                            <Icon className="h-5 w-5 text-muted-foreground" />
                            <span className="font-medium">{item.name}</span>
                          </Link>
                        )
                      })}
                    </div>
                  </nav>

                  {/* User account section in mobile menu */}
                  <div className="p-4 border-t bg-muted/30">
                    <div className="space-y-2">
                      <Link
                        href="/login"
                        onClick={() => setMobileMenuOpen(false)}
                        className="flex items-center justify-center gap-2 h-11 px-4 rounded-lg bg-primary text-primary-foreground font-medium hover:bg-primary/90 transition-colors"
                      >
                        <User className="h-4 w-4" />
                        Sign In
                      </Link>
                      <Link
                        href="/account"
                        onClick={() => setMobileMenuOpen(false)}
                        className="flex items-center justify-center gap-2 h-11 px-4 rounded-lg border border-input bg-background hover:bg-accent transition-colors"
                      >
                        My Account
                      </Link>
                    </div>
                  </div>
                </div>
              </SheetContent>
            </Sheet>

            {/* Logo - Optimized for mobile */}
            <Link href="/" className="flex items-center gap-2">
              <div className="relative h-full w-40">
                <Image
                  src="/logo.png"
                  alt="Swadeshika Logo"
                  width={160}
                  height={48}
                  className="object-contain"
                />
              </div>
            </Link>

            {/* Desktop navigation - Hidden on mobile/tablet */}
            <nav className="hidden lg:flex items-center gap-6 flex-1 justify-center">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
                >
                  {item.name}
                </Link>
              ))}
            </nav>

            {/* Actions - Optimized spacing for mobile */}
            <div className="flex items-center gap-1 md:gap-2">
              {/* Desktop search */}
              <form
                className="hidden lg:flex items-center relative"
                onSubmit={(e) => {
                  e.preventDefault()
                  submitSearch(desktopSearchValue)
                }}
              >
                <Search className="absolute left-3 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search products..."
                  className="w-72 pl-9"
                  value={desktopSearchValue}
                  onChange={(e) => setDesktopSearchValue(e.target.value)}
                />
              </form>

              <Button
                variant="ghost"
                size="icon"
                className="lg:hidden h-9 w-9 md:h-10 md:w-10"
                onClick={() => setMobileMenuOpen(true)}
              >
                <Search className="h-5 w-5" />
                <span className="sr-only">Search</span>
              </Button>

              {/* Wishlist - Hidden on small mobile */}
              <Button variant="ghost" size="icon" asChild className="hidden sm:flex h-9 w-9 md:h-10 md:w-10">
                <Link href="/wishlist">
                  <Heart className="h-5 w-5" />
                  <span className="sr-only">Wishlist</span>
                </Link>
              </Button>

              {/* Cart */}
              <CartButton />

              {/* User account - Desktop only */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild className="hidden lg:flex">
                  <Button variant="ghost" size="icon">
                    <User className="h-5 w-5" />
                    <span className="sr-only">User account</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48">
                  <DropdownMenuItem asChild>
                    <Link href="/login">Sign In</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/signup">Create Account</Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link href="/account">My Account</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/orders">My Orders</Link>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </div>
      </header>
    </>
  )
}
