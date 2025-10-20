"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Download, BarChart3, ShoppingCart, Users, Package, CreditCard, Wallet, Percent, RotateCcw } from "lucide-react"

export function AdminReports() {
  return (
    <div className="space-y-6 font-sans">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold mb-2 text-[#6B4423]">Reports</h1>
          <p className="text-[#8B6F47]">Analyze performance across sales, products, and customers</p>
        </div>
        <div className="flex items-center gap-3">
          <Select>
            <SelectTrigger className="w-40 border-2 border-[#E8DCC8]">
              <SelectValue placeholder="Last 30 days" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="7">Last 7 days</SelectItem>
              <SelectItem value="30">Last 30 days</SelectItem>
              <SelectItem value="90">Last 90 days</SelectItem>
              <SelectItem value="365">Last 12 months</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" className="gap-2 bg-transparent border-2 border-[#E8DCC8] hover:bg-[#F5F1E8]">
            <Download className="h-4 w-4" />
            Export CSV
          </Button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { title: "Revenue", value: "₹1,24,580", icon: BarChart3 },
          { title: "Orders", value: "156", icon: ShoppingCart },
          { title: "Products", value: "48", icon: Package },
          { title: "Customers", value: "892", icon: Users },
        ].map((kpi) => (
          <Card key={kpi.title} className="rounded-2xl border-2 border-[#E8DCC8]">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#2D5F3F]/10 text-[#2D5F3F]">
                  <kpi.icon className="h-5 w-5" />
                </div>
              </div>
              <p className="text-2xl font-bold text-[#6B4423]">{kpi.value}</p>
              <p className="text-sm text-[#8B6F47]">{kpi.title}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Orders by Status and Payment Methods */}
      <div className="grid lg:grid-cols-2 gap-6">
        <Card className="rounded-2xl py-5 border-2 border-[#E8DCC8]">
          <CardHeader>
            <CardTitle className="text-[#6B4423]">Orders by Status</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {[{label:"Pending", value: 18, color:"#FF7E00"}, {label:"Processing", value: 32, color:"#8B6F47"}, {label:"Shipped", value: 44, color:"#2D5F3F"}, {label:"Delivered", value: 56, color:"#2D5F3F"}, {label:"Cancelled", value: 6, color:"#DC2626"}].map((s) => (
              <div key={s.label} className="flex items-center justify-between p-3 bg-white rounded-xl border-2 border-[#E8DCC8]">
                <div className="flex items-center gap-2">
                  <span className="h-3 w-3 rounded-full" style={{backgroundColor: s.color}} />
                  <p className="text-[#6B4423]">{s.label}</p>
                </div>
                <p className="font-semibold text-[#2D5F3F]">{s.value}</p>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card className="rounded-2xl py-5 border-2 border-[#E8DCC8]">
          <CardHeader>
            <CardTitle className="text-[#6B4423]">Payment Methods</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {[{icon: CreditCard, name: "Razorpay/UPI", value: 62}, {icon: Wallet, name: "COD", value: 28}, {icon: CreditCard, name: "Cards", value: 10}].map((m) => (
              <div key={m.name} className="flex items-center justify-between p-3 bg-white rounded-xl border-2 border-[#E8DCC8]">
                <div className="flex items-center gap-2 text-[#6B4423]">
                  <m.icon className="h-4 w-4" />
                  <span>{m.name}</span>
                </div>
                <div className="flex items-center gap-2 w-28">
                  <div className="flex-1 h-2 bg-[#F5F1E8] rounded-full overflow-hidden">
                    <div className="h-full bg-[#2D5F3F]" style={{width: `${m.value}%`}} />
                  </div>
                  <span className="text-sm font-medium text-[#2D5F3F]">{m.value}%</span>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Sales by Category */}
      <Card className="rounded-2xl py-5 border-2 border-[#E8DCC8]">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-[#6B4423]">Sales by Category</CardTitle>
          <Button variant="outline" size="sm" className="bg-transparent border-2 border-[#E8DCC8] hover:bg-[#F5F1E8]">
            Export
          </Button>
        </CardHeader>
        <CardContent className="space-y-3">
          {[
            { name: "Ghee", value: 405000 },
            { name: "Spices", value: 164000 },
            { name: "Dry Fruits", value: 254000 },
            { name: "Oils", value: 98000 },
          ].map((row) => (
            <div key={row.name} className="flex items-center justify-between p-3 bg-white rounded-xl border-2 border-[#E8DCC8]">
              <p className="font-medium text-[#6B4423]">{row.name}</p>
              <p className="font-semibold text-[#2D5F3F]">₹{row.value.toLocaleString()}</p>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Top Customers & Top Products */}
      <div className="grid lg:grid-cols-2 gap-6">
        <Card className="rounded-2xl py-5 border-2 border-[#E8DCC8]">
          <CardHeader>
            <CardTitle className="text-[#6B4423]">Top Customers</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {["Priya Sharma", "Rajesh Kumar", "Anita Desai", "Vikram Singh"].map((name, i) => (
              <div key={name} className="flex items-center justify-between p-3 bg-white rounded-xl border-2 border-[#E8DCC8]">
                <p className="text-[#6B4423]">{i + 1}. {name}</p>
                <p className="font-semibold text-[#2D5F3F]">₹{(100000 - i * 8500).toLocaleString()}</p>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card className="rounded-2xl py-5 border-2 border-[#E8DCC8]">
          <CardHeader>
            <CardTitle className="text-[#6B4423]">Top Products</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {["Pure Desi Cow Ghee", "Organic Turmeric Powder", "Kashmiri Almonds", "Coconut Oil"].map((name, i) => (
              <div key={name} className="flex items-center justify-between p-3 bg-white rounded-xl border-2 border-[#E8DCC8]">
                <p className="text-[#6B4423]">{i + 1}. {name}</p>
                <p className="font-semibold text-[#2D5F3F]">{(120 - i * 8)} sales</p>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Coupon Performance & Returns */}
      <div className="grid lg:grid-cols-2 gap-6">
        <Card className="rounded-2xl py-5 border-2 border-[#E8DCC8]">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-[#6B4423]">Coupon Performance</CardTitle>
            <Percent className="h-5 w-5 text-[#8B6F47]" />
          </CardHeader>
          <CardContent className="space-y-3">
            {[{code:"WELCOME10", usage:45, limit:100, revenue:54000}, {code:"NEWYEAR25", usage:198, limit:200, revenue:82000}, {code:"FLAT200", usage:32, limit:50, revenue:14000}].map((c) => (
              <div key={c.code} className="flex items-center justify-between p-3 bg-white rounded-xl border-2 border-[#E8DCC8]">
                <div className="flex items-center gap-2">
                  <code className="font-mono font-semibold bg-[#F5F1E8] border-2 border-[#E8DCC8] text-[#6B4423] px-2 py-1 rounded">{c.code}</code>
                  <span className="text-sm text-[#8B6F47]">{c.usage}/{c.limit}</span>
                </div>
                <p className="font-semibold text-[#2D5F3F]">₹{c.revenue.toLocaleString()}</p>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card className="rounded-2xl py-5 border-2 border-[#E8DCC8]">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-[#6B4423]">Returns & Refunds</CardTitle>
            <RotateCcw className="h-5 w-5 text-[#8B6F47]" />
          </CardHeader>
          <CardContent className="space-y-3">
            {[{label:"Return Rate", value:"2.1%"}, {label:"Avg. Resolution Time", value:"1.8 days"}, {label:"Refunded Amount", value:"₹12,450"}].map((r) => (
              <div key={r.label} className="flex items-center justify-between p-3 bg-white rounded-xl border-2 border-[#E8DCC8]">
                <p className="text-[#6B4423]">{r.label}</p>
                <p className="font-semibold text-[#2D5F3F]">{r.value}</p>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
