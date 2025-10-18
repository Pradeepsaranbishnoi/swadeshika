"use client"

import { useState } from "react"
import { Search, Eye, Mail } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"

const customers = [
  {
    id: "1",
    name: "Priya Sharma",
    email: "priya@example.com",
    phone: "+91 9876543210",
    orders: 12,
    totalSpent: 18500,
    joinDate: "Jan 2024",
    status: "Active",
  },
  {
    id: "2",
    name: "Rajesh Kumar",
    email: "rajesh@example.com",
    phone: "+91 9876543211",
    orders: 8,
    totalSpent: 12300,
    joinDate: "Feb 2024",
    status: "Active",
  },
  {
    id: "3",
    name: "Anita Desai",
    email: "anita@example.com",
    phone: "+91 9876543212",
    orders: 15,
    totalSpent: 24800,
    joinDate: "Dec 2023",
    status: "Active",
  },
  {
    id: "4",
    name: "Vikram Singh",
    email: "vikram@example.com",
    phone: "+91 9876543213",
    orders: 5,
    totalSpent: 6500,
    joinDate: "Mar 2024",
    status: "Active",
  },
]

export function AdminCustomersList() {
  const [searchQuery, setSearchQuery] = useState("")

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-serif text-3xl font-bold mb-2 text-[#6B4423]">Customers</h1>
        <p className="text-[#8B6F47]">Manage your customer base</p>
      </div>

      <Card className="rounded-2xl border-2 border-[#E8DCC8]">
        <CardContent className="p-6">
          <div className="flex items-center gap-4 mb-6">
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#8B6F47]" />
              <Input
                placeholder="Search customers..."
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
                  <TableHead className="text-[#6B4423]">Customer</TableHead>
                  <TableHead className="text-[#6B4423]">Contact</TableHead>
                  <TableHead className="text-[#6B4423]">Orders</TableHead>
                  <TableHead className="text-[#6B4423]">Total Spent</TableHead>
                  <TableHead className="text-[#6B4423]">Join Date</TableHead>
                  <TableHead className="text-[#6B4423]">Status</TableHead>
                  <TableHead className="w-[100px]"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {customers.map((customer) => (
                  <TableRow key={customer.id}>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <Avatar>
                          <AvatarFallback>{customer.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <span className="font-medium text-[#6B4423]">{customer.name}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div>
                        <p className="text-sm text-[#6B4423]">{customer.email}</p>
                        <p className="text-sm text-[#8B6F47]">{customer.phone}</p>
                      </div>
                    </TableCell>
                    <TableCell>{customer.orders}</TableCell>
                    <TableCell className="font-semibold text-[#2D5F3F]">₹{customer.totalSpent.toLocaleString()}</TableCell>
                    <TableCell>{customer.joinDate}</TableCell>
                    <TableCell>
                      <Badge className="bg-[#2D5F3F]/10 text-[#2D5F3F] border-0">{customer.status}</Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-1">
                        <Button variant="ghost" size="icon">
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon">
                          <Mail className="h-4 w-4" />
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
