"use client"

/**
 * Admin Categories List Component
 * Manages product categories and subcategories with CRUD operations
 */

import { useState } from "react"
import { Plus, Search, Edit, Trash2, GripVertical } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/hooks/use-toast"

const categories = [
  { id: "1", name: "Ghee", slug: "ghee", parent: null, productCount: 12, order: 1 },
  { id: "2", name: "Spices", slug: "spices", parent: null, productCount: 24, order: 2 },
  { id: "3", name: "Turmeric", slug: "turmeric", parent: "Spices", productCount: 8, order: 1 },
  { id: "4", name: "Chili Powder", slug: "chili-powder", parent: "Spices", productCount: 6, order: 2 },
  { id: "5", name: "Dry Fruits", slug: "dry-fruits", parent: null, productCount: 18, order: 3 },
  { id: "6", name: "Oils", slug: "oils", parent: null, productCount: 15, order: 4 },
]

export function AdminCategoriesList() {
  const [searchQuery, setSearchQuery] = useState("")
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [newCategory, setNewCategory] = useState({ name: "", parent: "" })
  const { toast } = useToast()

  const handleAddCategory = () => {
    toast({
      title: "Category Added",
      description: `${newCategory.name} has been added successfully.`,
    })
    setIsAddDialogOpen(false)
    setNewCategory({ name: "", parent: "" })
  }

  return (
    <div className="space-y-6 font-sans">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold mb-2 text-[#6B4423]">Categories</h1>
          <p className="text-[#8B6F47]">Organize your products into categories</p>
        </div>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button className="gap-2 bg-[#2D5F3F] hover:bg-[#2D5F3F]/90">
              <Plus className="h-4 w-4" />
              Add Category
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Category</DialogTitle>
              <DialogDescription>Create a new category or subcategory for your products</DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="category-name">Category Name</Label>
                <Input
                  id="category-name"
                  placeholder="e.g., Organic Spices"
                  value={newCategory.name}
                  onChange={(e) => setNewCategory({ ...newCategory, name: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="parent-category">Parent Category (Optional)</Label>
                <Select
                  value={newCategory.parent}
                  onValueChange={(value) => setNewCategory({ ...newCategory, parent: value })}
                >
                  <SelectTrigger id="parent-category">
                    <SelectValue placeholder="Select parent category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="none">None (Top Level)</SelectItem>
                    <SelectItem value="ghee">Ghee</SelectItem>
                    <SelectItem value="spices">Spices</SelectItem>
                    <SelectItem value="dry-fruits">Dry Fruits</SelectItem>
                    <SelectItem value="oils">Oils</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleAddCategory} className="bg-[#2D5F3F] hover:bg-[#2D5F3F]/90">
                Add Category
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <Card className="rounded-2xl py-5 border-2 border-[#E8DCC8]">
        <CardContent className="p-6">
          <div className="flex items-center gap-4 mb-6">
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#8B6F47]" />
              <Input
                placeholder="Search categories..."
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
                  <TableHead className="w-[50px]"></TableHead>
                  <TableHead className="text-[#6B4423]">Name</TableHead>
                  <TableHead className="text-[#6B4423]">Slug</TableHead>
                  <TableHead className="text-[#6B4423]">Parent</TableHead>
                  <TableHead className="text-[#6B4423]">Products</TableHead>
                  <TableHead className="w-[100px] text-[#6B4423]">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {categories.map((category) => (
                  <TableRow key={category.id}>
                    <TableCell>
                      <Button variant="ghost" size="icon" className="cursor-move">
                        <GripVertical className="h-4 w-4 text-muted-foreground" />
                      </Button>
                    </TableCell>
                    <TableCell className="font-medium text-[#6B4423]">{category.name}</TableCell>
                    <TableCell className="text-[#8B6F47]">{category.slug}</TableCell>
                    <TableCell>
                      {category.parent ? (
                        <Badge variant="outline" className="bg-[#F5F1E8] border-2 border-[#E8DCC8] text-[#6B4423]">{category.parent}</Badge>
                      ) : (
                        <span className="text-[#8B6F47] text-sm">Top Level</span>
                      )}
                    </TableCell>
                    <TableCell>{category.productCount}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Button variant="ghost" size="icon">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon" className="text-destructive">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
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
