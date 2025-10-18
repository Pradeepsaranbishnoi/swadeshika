"use client"

import { useState } from "react"
import Link from "next/link"
import { Heart, ShoppingCart, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useCartStore } from "@/lib/cart-store"
import { Loader2 } from "lucide-react"

// Mock wishlist data
const initialWishlistItems = [
  {
    id: "1",
    productId: "1",
    name: "Pure Desi Cow Ghee",
    slug: "pure-desi-cow-ghee",
    price: 850,
    comparePrice: 1000,
    image: "/golden-ghee-in-glass-jar.jpg",
    badge: "Bestseller",
    category: "Ghee",
    inStock: true,
  },
  {
    id: "3",
    productId: "3",
    name: "Premium Kashmiri Almonds",
    slug: "premium-kashmiri-almonds",
    price: 650,
    image: "/kashmiri-almonds.jpg",
    badge: "Premium",
    category: "Dry Fruits",
    inStock: true,
  },
]

export function WishlistContent() {
  const [wishlistItems, setWishlistItems] = useState(initialWishlistItems)
  const [loadingId, setLoadingId] = useState<string | null>(null)
  const addItem = useCartStore((state) => state.addItem)

  const removeItem = (id: string) => {
    setWishlistItems(wishlistItems.filter((item) => item.id !== id))
  }

  if (wishlistItems.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center">
        <Heart className="h-24 w-24 text-[#2D5F3F]/70 mb-4" />
        <h2 className="font-serif text-2xl font-bold mb-2 text-[#6B4423]">Your wishlist is empty</h2>
        <p className="text-[#8B6F47] mb-6">Save your favorite products for later</p>
        <Button asChild className="bg-[#2D5F3F] hover:bg-[#234A32] text-white">
          <Link href="/shop">Browse Products</Link>
        </Button>
      </div>
    )
  }

  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {wishlistItems.map((item) => (
        <Card key={item.id} className="group overflow-hidden rounded-2xl border-2 border-[#E8DCC8] bg-white hover:shadow-xl transition-all">
          <div className="relative">
            <Link href={`/products/${item.slug}`}>
              <div className="relative aspect-square overflow-hidden bg-[#F5F1E8]">
                <img
                  src={item.image || "/placeholder.svg"}
                  alt={item.name}
                  className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300"
                />
                {item.badge && (
                  <Badge className="absolute top-3 left-3 bg-[#FF7E00] text-white border-0">{item.badge}</Badge>
                )}
              </div>
            </Link>
            <Button
              variant="ghost"
              size="icon"
              className="absolute top-2 right-2 bg-background/80 hover:bg-[#F5F1E8]"
              onClick={() => removeItem(item.id)}
            >
              <Trash2 className="h-4 w-4" />
              <span className="sr-only">Remove from wishlist</span>
            </Button>
          </div>

          <CardContent className="p-4">
            <Link href={`/products/${item.slug}`}>
              <p className="text-sm text-[#8B6F47] mb-1">{item.category}</p>
              <h3 className="font-sans font-bold text-[#6B4423] mb-2 text-balance line-clamp-2">{item.name}</h3>
              <div className="flex items-center gap-2 mb-3">
                <span className="text-lg font-bold text-[#2D5F3F]">₹{item.price}</span>
                {item.comparePrice && (
                  <span className="text-sm text-[#8B6F47] line-through">₹{item.comparePrice}</span>
                )}
              </div>
            </Link>
            <Button
              className="w-full gap-2 bg-[#2D5F3F] hover:bg-[#234A32] text-white"
              size="sm"
              disabled={loadingId === item.id}
              onClick={async () => {
                try {
                  setLoadingId(item.id)
                  addItem({
                    id: Number(item.productId),
                    name: item.name,
                    price: item.price,
                    image: item.image,
                    category: item.category,
                  })
                } finally {
                  setLoadingId(null)
                }
              }}
            >
              {loadingId === item.id ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" /> Adding...
                </>
              ) : (
                <>
                  <ShoppingCart className="h-4 w-4" /> Add to Cart
                </>
              )}
            </Button>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
