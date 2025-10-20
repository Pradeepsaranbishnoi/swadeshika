"use client"

import { useState, useMemo, useEffect } from "react"
import Link from "next/link"
import { ProductCard } from "@/components/product-card"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { LayoutGrid, List } from "lucide-react"

interface ProductGridProps {
  category?: string
  priceRange?: number[]
  selectedCategories?: string[]
  selectedBrands?: string[]
  selectedTags?: string[]
}

// Mock products data
const allProducts = [
  {
    id: "1",
    name: "Pure Desi Cow Ghee",
    slug: "pure-desi-cow-ghee",
    price: 850,
    comparePrice: 1000,
    image: "/golden-ghee-in-glass-jar.jpg",
    badge: "Bestseller",
    category: "Ghee",
    rating: 4.8,
    reviews: 124,
  },
  {
    id: "2",
    name: "Organic Turmeric Powder",
    slug: "organic-turmeric-powder",
    price: 180,
    comparePrice: 220,
    image: "/turmeric-powder-in-bowl.jpg",
    badge: "Organic",
    category: "Spices",
    rating: 4.9,
    reviews: 89,
  },
  {
    id: "3",
    name: "Premium Kashmiri Almonds",
    slug: "premium-kashmiri-almonds",
    price: 650,
    image: "/kashmiri-almonds.jpg",
    badge: "Premium",
    category: "Dry Fruits",
    rating: 4.7,
    reviews: 56,
  },
  {
    id: "4",
    name: "Cold Pressed Coconut Oil",
    slug: "cold-pressed-coconut-oil",
    price: 320,
    image: "/coconut-oil-in-glass-bottle.jpg",
    badge: "New",
    category: "Oils",
    rating: 4.6,
    reviews: 43,
  },
  {
    id: "5",
    name: "A2 Buffalo Ghee",
    slug: "a2-buffalo-ghee",
    price: 750,
    comparePrice: 900,
    image: "/golden-ghee-in-glass-jar.jpg",
    category: "Ghee",
    rating: 4.7,
    reviews: 78,
  },
  {
    id: "6",
    name: "Red Chilli Powder",
    slug: "red-chilli-powder",
    price: 120,
    image: "/turmeric-powder-in-bowl.jpg",
    badge: "Hot",
    category: "Spices",
    rating: 4.5,
    reviews: 92,
  },
  {
    id: "7",
    name: "Premium Cashews",
    slug: "premium-cashews",
    price: 580,
    image: "/kashmiri-almonds.jpg",
    category: "Dry Fruits",
    rating: 4.8,
    reviews: 67,
  },
  {
    id: "8",
    name: "Mustard Oil",
    slug: "mustard-oil",
    price: 280,
    image: "/coconut-oil-in-glass-bottle.jpg",
    category: "Oils",
    rating: 4.4,
    reviews: 34,
  },
]

export function ProductGrid({
  category,
  priceRange = [0, 2000],
  selectedCategories = [],
  selectedBrands = [],
  selectedTags = [],
}: ProductGridProps) {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [sortBy, setSortBy] = useState("featured")
  const [query, setQuery] = useState("")

  // Read query string on client after mount to keep prerender static
  useEffect(() => {
    try {
      const sp = new URLSearchParams(window.location.search)
      setQuery((sp.get("q") || "").trim().toLowerCase())
    } catch {
      // no-op
    }
  }, [])

  const filteredProducts = useMemo(() => {
    let filtered = [...allProducts]

    // Filter by category (from URL or selected categories)
    if (category) {
      filtered = filtered.filter((p) => p.category.toLowerCase().replace(" ", "-") === category)
    } else if (selectedCategories.length > 0) {
      filtered = filtered.filter((p) => selectedCategories.includes(p.category.toLowerCase().replace(" ", "-")))
    }

    // Filter by price range
    filtered = filtered.filter((p) => p.price >= priceRange[0] && p.price <= priceRange[1])

    // Filter by search query (name, category)
    if (query) {
      filtered = filtered.filter((p) =>
        p.name.toLowerCase().includes(query) || p.category.toLowerCase().includes(query)
      )
    }

    // Filter by brands (if implemented in product data)
    if (selectedBrands.length > 0) {
      // Add brand filtering logic when product data includes brands
    }

    // Filter by tags
    if (selectedTags.length > 0) {
      filtered = filtered.filter((p) => selectedTags.includes(p.badge?.toLowerCase() || ""))
    }

    // Sort products
    switch (sortBy) {
      case "price-low":
        filtered.sort((a, b) => a.price - b.price)
        break
      case "price-high":
        filtered.sort((a, b) => b.price - a.price)
        break
      case "rating":
        filtered.sort((a, b) => b.rating - a.rating)
        break
      case "newest":
        // Assuming newer products have higher IDs
        filtered.sort((a, b) => Number(b.id) - Number(a.id))
        break
      default:
        // Featured - keep original order
        break
    }

    return filtered
  }, [category, priceRange, selectedCategories, selectedBrands, selectedTags, sortBy, query])

  return (
    <div className="space-y-6">
      {/* Toolbar */}
      <div className="flex items-center justify-between rounded-2xl border-2 border-[#E8DCC8] bg-white p-4">
        <p className="text-sm text-[#8B6F47]">
          {query ? (
            <>
              Showing <span className="font-semibold text-[#6B4423]">{filteredProducts.length}</span> results for
              <span className="ml-1 font-semibold text-[#6B4423]">“{query}”</span>
            </>
          ) : (
            <>Showing <span className="font-semibold text-[#6B4423]">{filteredProducts.length}</span> products</>
          )}
        </p>

        <div className="flex items-center gap-4">
          {/* Sort */}
          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="w-48 border-2 border-[#E8DCC8] bg-white">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="featured">Featured</SelectItem>
              <SelectItem value="price-low">Price: Low to High</SelectItem>
              <SelectItem value="price-high">Price: High to Low</SelectItem>
              <SelectItem value="newest">Newest</SelectItem>
              <SelectItem value="rating">Highest Rated</SelectItem>
            </SelectContent>
          </Select>

          {/* View Mode */}
          <div className="hidden sm:flex items-center gap-1 border-2 border-[#E8DCC8] rounded-xl p-1 bg-[#F5F1E8]">
            <Button
              variant={viewMode === "grid" ? "secondary" : "ghost"}
              size="icon"
              className="h-8 w-8"
              onClick={() => setViewMode("grid")}
            >
              <LayoutGrid className="h-4 w-4" />
              <span className="sr-only">Grid view</span>
            </Button>
            <Button
              variant={viewMode === "list" ? "secondary" : "ghost"}
              size="icon"
              className="h-8 w-8"
              onClick={() => setViewMode("list")}
            >
              <List className="h-4 w-4" />
              <span className="sr-only">List view</span>
            </Button>
          </div>
        </div>
      </div>

      {/* Products - unified with Home via ProductCard */}
      {viewMode === "grid" ? (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProducts.map((product) => (
            <ProductCard
              key={product.id}
              id={Number(product.id)}
              name={product.name}
              slug={product.slug}
              price={product.price}
              comparePrice={product.comparePrice}
              image={product.image}
              badge={product.badge}
              category={product.category}
              rating={product.rating}
              reviews={product.reviews}
            />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4">
          {filteredProducts.map((product) => (
            <ProductCard
              key={product.id}
              id={Number(product.id)}
              name={product.name}
              slug={product.slug}
              price={product.price}
              comparePrice={product.comparePrice}
              image={product.image}
              badge={product.badge}
              category={product.category}
              rating={product.rating}
              reviews={product.reviews}
            />
          ))}
        </div>
      )}
    </div>
  )
}
