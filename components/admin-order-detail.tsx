"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Truck, User, Phone, Mail } from "lucide-react"
import Link from "next/link"

// Mock order data
const mockOrder = {
  id: "ORD-2024-001",
  status: "processing",
  paymentStatus: "paid",
  paymentMethod: "UPI",
  createdAt: "2024-01-15T10:30:00Z",
  total: 2499,
  subtotal: 2299,
  shipping: 100,
  tax: 100,
  items: [
    {
      id: "1",
      name: "Premium A2 Desi Cow Ghee",
      sku: "GHE-001",
      variant: "1 Liter",
      price: 899,
      quantity: 2,
      image: "/traditional-ghee.jpg",
    },
    {
      id: "2",
      name: "Organic Turmeric Powder",
      sku: "SPI-005",
      variant: "500g",
      price: 299,
      quantity: 1,
      image: "/turmeric-powder-in-bowl.jpg",
    },
  ],
  customer: {
    id: "CUST-001",
    name: "Rajesh Kumar",
    email: "rajesh@example.com",
    phone: "+91 98765 43210",
    totalOrders: 5,
  },
  shippingAddress: {
    name: "Rajesh Kumar",
    phone: "+91 98765 43210",
    address: "123, MG Road, Koramangala",
    city: "Bangalore",
    state: "Karnataka",
    pincode: "560034",
  },
  billingAddress: {
    name: "Rajesh Kumar",
    phone: "+91 98765 43210",
    address: "123, MG Road, Koramangala",
    city: "Bangalore",
    state: "Karnataka",
    pincode: "560034",
  },
  notes: "Please deliver between 10 AM - 2 PM",
}

const statusConfig = {
  pending: { label: "Pending", color: "bg-yellow-500" },
  confirmed: { label: "Confirmed", color: "bg-blue-500" },
  processing: { label: "Processing", color: "bg-purple-500" },
  shipped: { label: "Shipped", color: "bg-orange-500" },
  delivered: { label: "Delivered", color: "bg-green-500" },
  cancelled: { label: "Cancelled", color: "bg-red-500" },
}

export default function AdminOrderDetailContent({ orderId }: { orderId: string }) {
  const [order, setOrder] = useState(mockOrder)
  const [orderStatus, setOrderStatus] = useState(order.status)
  const [trackingNumber, setTrackingNumber] = useState("")
  const [carrier, setCarrier] = useState("")
  const [adminNotes, setAdminNotes] = useState("")

  const handleUpdateStatus = () => {
    setOrder({ ...order, status: orderStatus })
    alert(`Order status updated to ${orderStatus}`)
  }

  const handleAddTracking = () => {
    if (trackingNumber && carrier) {
      alert(`Tracking added: ${carrier} - ${trackingNumber}`)
      setTrackingNumber("")
      setCarrier("")
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-serif font-bold text-balance">Order #{order.id}</h1>
          <p className="text-muted-foreground mt-1">
            Placed on{" "}
            {new Date(order.createdAt).toLocaleDateString("en-IN", {
              day: "numeric",
              month: "long",
              year: "numeric",
              hour: "2-digit",
              minute: "2-digit",
            })}
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Badge className={statusConfig[order.status as keyof typeof statusConfig].color}>
            {statusConfig[order.status as keyof typeof statusConfig].label}
          </Badge>
          <Badge variant={order.paymentStatus === "paid" ? "default" : "secondary"}>
            {order.paymentStatus === "paid" ? "Paid" : "Unpaid"}
          </Badge>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Order Items */}
          <Card>
            <CardHeader>
              <CardTitle>Order Items</CardTitle>
              <CardDescription>{order.items.length} items</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {order.items.map((item) => (
                  <div key={item.id} className="flex gap-4 pb-4 border-b last:border-0 last:pb-0">
                    <img
                      src={item.image || "/placeholder.svg"}
                      alt={item.name}
                      className="w-20 h-20 object-cover rounded-lg"
                    />
                    <div className="flex-1">
                      <h4 className="font-medium">{item.name}</h4>
                      <p className="text-sm text-muted-foreground">SKU: {item.sku}</p>
                      <p className="text-sm text-muted-foreground">{item.variant}</p>
                      <p className="text-sm text-muted-foreground">Qty: {item.quantity}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">₹{(item.price * item.quantity).toLocaleString("en-IN")}</p>
                      <p className="text-sm text-muted-foreground">₹{item.price} each</p>
                    </div>
                  </div>
                ))}
              </div>

              <Separator className="my-4" />

              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span>₹{order.subtotal.toLocaleString("en-IN")}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Shipping</span>
                  <span>₹{order.shipping.toLocaleString("en-IN")}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Tax</span>
                  <span>₹{order.tax.toLocaleString("en-IN")}</span>
                </div>
                <Separator />
                <div className="flex justify-between font-medium text-lg">
                  <span>Total</span>
                  <span>₹{order.total.toLocaleString("en-IN")}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Customer Information */}
          <Card>
            <CardHeader>
              <CardTitle>Customer Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-start gap-4">
                <div className="rounded-full bg-primary/10 p-3">
                  <User className="h-5 w-5 text-primary" />
                </div>
                <div className="flex-1">
                  <p className="font-medium">{order.customer.name}</p>
                  <p className="text-sm text-muted-foreground">{order.customer.totalOrders} orders</p>
                  <div className="mt-2 space-y-1">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Mail className="h-4 w-4" />
                      <span>{order.customer.email}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Phone className="h-4 w-4" />
                      <span>{order.customer.phone}</span>
                    </div>
                  </div>
                  <Button variant="outline" size="sm" className="mt-3 bg-transparent" asChild>
                    <Link href={`/admin/customers/${order.customer.id}`}>View Customer</Link>
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Addresses */}
          <div className="grid md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Shipping Address</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 text-sm">
                <p className="font-medium">{order.shippingAddress.name}</p>
                <p className="text-muted-foreground">{order.shippingAddress.address}</p>
                <p className="text-muted-foreground">
                  {order.shippingAddress.city}, {order.shippingAddress.state} - {order.shippingAddress.pincode}
                </p>
                <p className="text-muted-foreground">{order.shippingAddress.phone}</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Billing Address</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 text-sm">
                <p className="font-medium">{order.billingAddress.name}</p>
                <p className="text-muted-foreground">{order.billingAddress.address}</p>
                <p className="text-muted-foreground">
                  {order.billingAddress.city}, {order.billingAddress.state} - {order.billingAddress.pincode}
                </p>
                <p className="text-muted-foreground">{order.billingAddress.phone}</p>
              </CardContent>
            </Card>
          </div>

          {/* Customer Notes */}
          {order.notes && (
            <Card>
              <CardHeader>
                <CardTitle>Customer Notes</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">{order.notes}</p>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Update Status */}
          <Card>
            <CardHeader>
              <CardTitle>Update Status</CardTitle>
              <CardDescription>Change order status</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Order Status</Label>
                <Select value={orderStatus} onValueChange={setOrderStatus}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="confirmed">Confirmed</SelectItem>
                    <SelectItem value="processing">Processing</SelectItem>
                    <SelectItem value="shipped">Shipped</SelectItem>
                    <SelectItem value="delivered">Delivered</SelectItem>
                    <SelectItem value="cancelled">Cancelled</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Button onClick={handleUpdateStatus} className="w-full">
                Update Status
              </Button>
            </CardContent>
          </Card>

          {/* Add Tracking */}
          <Card>
            <CardHeader>
              <CardTitle>Shipping Details</CardTitle>
              <CardDescription>Add tracking information</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Carrier</Label>
                <Select value={carrier} onValueChange={setCarrier}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select carrier" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="bluedart">Blue Dart</SelectItem>
                    <SelectItem value="delhivery">Delhivery</SelectItem>
                    <SelectItem value="dtdc">DTDC</SelectItem>
                    <SelectItem value="fedex">FedEx</SelectItem>
                    <SelectItem value="indiapost">India Post</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Tracking Number</Label>
                <Input
                  placeholder="Enter tracking number"
                  value={trackingNumber}
                  onChange={(e) => setTrackingNumber(e.target.value)}
                />
              </div>
              <Button onClick={handleAddTracking} className="w-full bg-transparent" variant="outline">
                <Truck className="h-4 w-4 mr-2" />
                Add Tracking
              </Button>
            </CardContent>
          </Card>

          {/* Payment Info */}
          <Card>
            <CardHeader>
              <CardTitle>Payment Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Method</span>
                <span className="font-medium">{order.paymentMethod}</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Status</span>
                <Badge variant={order.paymentStatus === "paid" ? "default" : "secondary"}>
                  {order.paymentStatus === "paid" ? "Paid" : "Unpaid"}
                </Badge>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Amount</span>
                <span className="font-medium">₹{order.total.toLocaleString("en-IN")}</span>
              </div>
            </CardContent>
          </Card>

          {/* Admin Notes */}
          <Card>
            <CardHeader>
              <CardTitle>Admin Notes</CardTitle>
              <CardDescription>Internal notes (not visible to customer)</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Textarea
                placeholder="Add notes about this order..."
                value={adminNotes}
                onChange={(e) => setAdminNotes(e.target.value)}
                rows={4}
              />
              <Button variant="outline" className="w-full bg-transparent">
                Save Notes
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
