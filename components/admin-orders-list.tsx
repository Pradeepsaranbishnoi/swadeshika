"use client"

import { useState } from "react"
import Link from "next/link"
import { Search, Eye, Download } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

const orders = [
  {
    id: "1",
    orderNumber: "ORD-20250116-1234",
    customer: "Priya Sharma",
    email: "priya@example.com",
    amount: 1880,
    status: "Delivered",
    date: "Jan 16, 2025",
    items: 2,
  },
  {
    id: "2",
    orderNumber: "ORD-20250116-5678",
    customer: "Rajesh Kumar",
    email: "rajesh@example.com",
    amount: 650,
    status: "Shipped",
    date: "Jan 16, 2025",
    items: 1,
  },
  {
    id: "3",
    orderNumber: "ORD-20250116-9012",
    customer: "Anita Desai",
    email: "anita@example.com",
    amount: 1200,
    status: "Processing",
    date: "Jan 16, 2025",
    items: 3,
  },
  {
    id: "4",
    orderNumber: "ORD-20250115-3456",
    customer: "Vikram Singh",
    email: "vikram@example.com",
    amount: 450,
    status: "Pending",
    date: "Jan 15, 2025",
    items: 1,
  },
]

const statusColors: Record<string, string> = {
  Delivered: "bg-[#2D5F3F]/10 text-[#2D5F3F]",
  Shipped: "bg-[#FF7E00]/10 text-[#FF7E00]",
  Processing: "bg-[#8B6F47]/10 text-[#6B4423]",
  Pending: "bg-[#FF7E00]/10 text-[#FF7E00]",
  Cancelled: "bg-red-100 text-red-700",
}

export function AdminOrdersList() {
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-serif text-3xl font-bold mb-2 text-[#6B4423]">Orders</h1>
          <p className="text-[#8B6F47]">Manage and track customer orders</p>
        </div>
        <Button variant="outline" className="gap-2 bg-transparent border-2 border-[#E8DCC8] hover:bg-[#F5F1E8]">
          <Download className="h-4 w-4" />
          Export
        </Button>
      </div>

      <Card className="rounded-2xl border-2 border-[#E8DCC8]">
        <CardContent className="p-6">
          <div className="flex items-center gap-4 mb-6">
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#8B6F47]" />
              <Input
                placeholder="Search orders..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9 border-2 border-[#E8DCC8] focus-visible:ring-0 focus-visible:border-[#2D5F3F]"
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-48 border-2 border-[#E8DCC8] focus:ring-0">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Orders</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="processing">Processing</SelectItem>
                <SelectItem value="shipped">Shipped</SelectItem>
                <SelectItem value="delivered">Delivered</SelectItem>
                <SelectItem value="cancelled">Cancelled</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="rounded-2xl border-2 border-[#E8DCC8] overflow-hidden bg-white">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="text-[#6B4423]">Order Number</TableHead>
                  <TableHead className="text-[#6B4423]">Customer</TableHead>
                  <TableHead className="text-[#6B4423]">Date</TableHead>
                  <TableHead className="text-[#6B4423]">Items</TableHead>
                  <TableHead className="text-[#6B4423]">Amount</TableHead>
                  <TableHead className="text-[#6B4423]">Status</TableHead>
                  <TableHead className="w-[50px]"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {orders.map((order) => (
                  <TableRow key={order.id}>
                    <TableCell className="font-medium text-[#6B4423]">{order.orderNumber}</TableCell>
                    <TableCell>
                      <div>
                        <p className="font-medium text-[#6B4423]">{order.customer}</p>
                        <p className="text-sm text-[#8B6F47]">{order.email}</p>
                      </div>
                    </TableCell>
                    <TableCell>{order.date}</TableCell>
                    <TableCell>{order.items}</TableCell>
                    <TableCell className="font-semibold text-[#2D5F3F]">₹{order.amount}</TableCell>
                    <TableCell>
                      <Badge className={`${statusColors[order.status]} border-0`}>{order.status}</Badge>
                    </TableCell>
                    <TableCell>
                      <Button variant="ghost" size="icon" asChild>
                        <Link href={`/admin/orders/${order.id}`}>
                          <Eye className="h-4 w-4" />
                        </Link>
                      </Button>
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
