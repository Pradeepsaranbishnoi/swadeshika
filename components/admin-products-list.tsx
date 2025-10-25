"use client"

import { useState } from "react"
import { Plus, Search, Edit, Trash2, MoreVertical } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

const products = [
  {
    id: "1",
    name: "Pure Desi Cow Ghee",
    category: "Ghee",
    price: 850,
    stock: 100,
    status: "Active",
    image: "/golden-ghee-in-glass-jar.jpg",
  },
  {
    id: "2",
    name: "Organic Turmeric Powder",
    category: "Spices",
    price: 180,
    stock: 150,
    status: "Active",
    image: "/turmeric-powder-in-bowl.jpg",
  },
  {
    id: "3",
    name: "Premium Kashmiri Almonds",
    category: "Dry Fruits",
    price: 650,
    stock: 80,
    status: "Active",
    image: "/kashmiri-almonds.jpg",
  },
  {
    id: "4",
    name: "Cold Pressed Coconut Oil",
    category: "Oils",
    price: 320,
    stock: 0,
    status: "Out of Stock",
    image: "/coconut-oil-in-glass-bottle.jpg",
  },
]

export function AdminProductsList() {
  const [searchQuery, setSearchQuery] = useState("")

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-serif text-3xl font-bold mb-2 text-[#6B4423]">Products</h1>
          <p className="text-[#8B6F47]">Manage your product inventory</p>
        </div>
        <Button className="gap-2 bg-[#2D5F3F] hover:bg-[#234A32] text-white" asChild>
          <Link href="/admin/products/new">
            <Plus className="h-4 w-4" />
            Add Product
          </Link>
        </Button>
      </div>

      <Card className="rounded-2xl border-2 border-[#E8DCC8]">
        <CardContent className="p-6">
          <div className="flex items-center gap-4 mb-6">
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#8B6F47]" />
              <Input
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9 border-2 border-[#E8DCC8] focus-visible:ring-0 focus-visible:border-[#2D5F3F]"
              />
            </div>
          </div>

          <div className="rounded-2xl border-2 border-[#E8DCC8] overflow-hidden bg-white">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="text-[#6B4423]">Product</TableHead>
                  <TableHead className="text-[#6B4423]">Category</TableHead>
                  <TableHead className="text-[#6B4423]">Price</TableHead>
                  <TableHead className="text-[#6B4423]">Stock</TableHead>
                  <TableHead className="text-[#6B4423]">Status</TableHead>
                  <TableHead className="w-[50px]"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {products.map((product) => (
                  <TableRow key={product.id}>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <div className="relative w-12 h-12 flex-shrink-0 overflow-hidden rounded-md bg-[#F5F1E8] border-2 border-[#E8DCC8]">
                          <img
                            src={product.image || "/placeholder.svg"}
                            alt={product.name}
                            className="object-cover w-full h-full"
                          />
                        </div>
                        <span className="font-medium text-[#6B4423]">{product.name}</span>
                      </div>
                    </TableCell>
                    <TableCell>{product.category}</TableCell>
                    <TableCell className="text-[#6B4423]">₹{product.price}</TableCell>
                    <TableCell className="text-[#6B4423]">{product.stock}</TableCell>
                    <TableCell>
                      <Badge
                        className={
                          product.status === "Active"
                            ? "bg-[#2D5F3F]/10 text-[#2D5F3F] border-0"
                            : "bg-red-100 text-red-700"
                        }
                      >
                        {product.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreVertical className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>
                            <Edit className="h-4 w-4 mr-2" />
                            Edit
                          </DropdownMenuItem>
                          <DropdownMenuItem className="text-destructive">
                            <Trash2 className="h-4 w-4 mr-2" />
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
