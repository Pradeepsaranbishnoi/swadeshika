"use client"

/**
 * Admin Coupons List Component
 * Manages discount coupons and promotional codes
 */

import { useState } from "react"
import { Plus, Search, Edit, Trash2, Copy, Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { useToast } from "@/hooks/use-toast"

const coupons = [
  {
    id: "1",
    code: "WELCOME10",
    discount: "10%",
    type: "Percentage",
    minOrder: 500,
    usageLimit: 100,
    used: 45,
    expiryDate: "Mar 31, 2025",
    status: "Active",
  },
  {
    id: "2",
    code: "FLAT200",
    discount: "₹200",
    type: "Fixed",
    minOrder: 1000,
    usageLimit: 50,
    used: 32,
    expiryDate: "Feb 28, 2025",
    status: "Active",
  },
  {
    id: "3",
    code: "NEWYEAR25",
    discount: "25%",
    type: "Percentage",
    minOrder: 1500,
    usageLimit: 200,
    used: 198,
    expiryDate: "Jan 31, 2025",
    status: "Expiring Soon",
  },
]

export function AdminCouponsList() {
  const [searchQuery, setSearchQuery] = useState("")
  const [copiedCode, setCopiedCode] = useState<string | null>(null)
  const { toast } = useToast()

  const handleCopyCode = (code: string) => {
    navigator.clipboard.writeText(code)
    setCopiedCode(code)
    toast({
      title: "Code Copied",
      description: `Coupon code "${code}" copied to clipboard.`,
    })
    setTimeout(() => setCopiedCode(null), 2000)
  }

  return (
    <div className="space-y-6 font-sans">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold mb-2 text-[#6B4423]">Coupons & Discounts</h1>
          <p className="text-[#8B6F47]">Create and manage promotional codes</p>
        </div>
        <Button className="gap-2 bg-[#2D5F3F] hover:bg-[#2D5F3F]/90">
          <Plus className="h-4 w-4" />
          Create Coupon
        </Button>
      </div>

      <Card className="rounded-2xl py-5 border-2 border-[#E8DCC8]">
        <CardContent className="p-6">
          <div className="flex items-center gap-4 mb-6">
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#8B6F47]" />
              <Input
                placeholder="Search coupons..."
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
                  <TableHead className="text-[#6B4423]">Code</TableHead>
                  <TableHead className="text-[#6B4423]">Discount</TableHead>
                  <TableHead className="text-[#6B4423]">Min. Order</TableHead>
                  <TableHead className="text-[#6B4423]">Usage</TableHead>
                  <TableHead className="text-[#6B4423]">Expiry</TableHead>
                  <TableHead className="text-[#6B4423]">Status</TableHead>
                  <TableHead className="w-[100px] text-[#6B4423]">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {coupons.map((coupon) => (
                  <TableRow key={coupon.id}>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <code className="font-mono font-semibold bg-[#F5F1E8] border-2 border-[#E8DCC8] text-[#6B4423] px-2 py-1 rounded">{coupon.code}</code>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-6 w-6"
                          onClick={() => handleCopyCode(coupon.code)}
                        >
                          {copiedCode === coupon.code ? (
                            <Check className="h-3 w-3 text-green-600" />
                          ) : (
                            <Copy className="h-3 w-3" />
                          )}
                        </Button>
                      </div>
                    </TableCell>
                    <TableCell className="font-semibold">{coupon.discount}</TableCell>
                    <TableCell className="font-semibold text-[#6B4423]">₹{coupon.minOrder}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <span className="text-sm">
                          {coupon.used}/{coupon.usageLimit}
                        </span>
                        <div className="w-20 h-2 bg-muted rounded-full overflow-hidden">
                          <div
                            className="h-full bg-[#2D5F3F]"
                            style={{ width: `${(coupon.used / coupon.usageLimit) * 100}%` }}
                          />
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="text-sm">{coupon.expiryDate}</TableCell>
                    <TableCell>
                      <Badge
                        className={
                          coupon.status === "Active"
                            ? "bg-[#2D5F3F]/10 text-[#2D5F3F] border-0"
                            : "bg-[#FF7E00]/10 text-[#FF7E00] border-0"
                        }
                      >
                        {coupon.status}
                      </Badge>
                    </TableCell>
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
