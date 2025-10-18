"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Package, Truck, CheckCircle, Search, MapPin } from "lucide-react"

export default function TrackOrderContent() {
  const [orderId, setOrderId] = useState("")
  const [email, setEmail] = useState("")
  const [tracking, setTracking] = useState<any>(null)
  const [loading, setLoading] = useState(false)

  const handleTrack = () => {
    setLoading(true)
    // Simulate API call
    setTimeout(() => {
      setTracking({
        orderId: "ORD-2024-001",
        status: "shipped",
        estimatedDelivery: "2024-01-20",
        carrier: "Blue Dart",
        trackingNumber: "BD123456789IN",
        currentLocation: "Bangalore Sorting Hub",
        timeline: [
          {
            status: "Order Placed",
            location: "Swadeshika Warehouse",
            date: "2024-01-15T10:30:00Z",
            completed: true,
          },
          {
            status: "Order Confirmed",
            location: "Swadeshika Warehouse",
            date: "2024-01-15T11:00:00Z",
            completed: true,
          },
          {
            status: "Packed & Ready",
            location: "Swadeshika Warehouse",
            date: "2024-01-16T09:00:00Z",
            completed: true,
          },
          {
            status: "Shipped",
            location: "Bangalore Hub",
            date: "2024-01-17T14:30:00Z",
            completed: true,
          },
          {
            status: "In Transit",
            location: "Bangalore Sorting Hub",
            date: "2024-01-18T08:00:00Z",
            completed: true,
          },
          {
            status: "Out for Delivery",
            location: "Koramangala Delivery Center",
            date: null,
            completed: false,
          },
          {
            status: "Delivered",
            location: "Your Address",
            date: null,
            completed: false,
          },
        ],
      })
      setLoading(false)
    }, 1000)
  }

  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-serif font-bold mb-3 text-balance">Track Your Order</h1>
        <p className="text-muted-foreground text-lg">Enter your order details to track your shipment</p>
      </div>

      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Order Tracking</CardTitle>
          <CardDescription>Enter your order ID and email to track your order</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="orderId">Order ID</Label>
                <Input
                  id="orderId"
                  placeholder="ORD-2024-001"
                  value={orderId}
                  onChange={(e) => setOrderId(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="your@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>
            <Button onClick={handleTrack} disabled={loading} className="w-full">
              <Search className="h-4 w-4 mr-2" />
              {loading ? "Tracking..." : "Track Order"}
            </Button>
          </div>
        </CardContent>
      </Card>

      {tracking && (
        <div className="space-y-6">
          {/* Order Status Card */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Order #{tracking.orderId}</CardTitle>
                  <CardDescription className="mt-1">
                    Estimated delivery:{" "}
                    {new Date(tracking.estimatedDelivery).toLocaleDateString("en-IN", {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    })}
                  </CardDescription>
                </div>
                <Badge className="bg-orange-500">
                  <Truck className="h-3 w-3 mr-1" />
                  {tracking.status}
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-muted-foreground">Carrier</p>
                  <p className="font-medium">{tracking.carrier}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Tracking Number</p>
                  <p className="font-medium">{tracking.trackingNumber}</p>
                </div>
                <div className="md:col-span-2">
                  <p className="text-muted-foreground">Current Location</p>
                  <div className="flex items-center gap-2 mt-1">
                    <MapPin className="h-4 w-4 text-primary" />
                    <p className="font-medium">{tracking.currentLocation}</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Tracking Timeline */}
          <Card>
            <CardHeader>
              <CardTitle>Tracking History</CardTitle>
              <CardDescription>Detailed shipment timeline</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {tracking.timeline.map((event: any, index: number) => {
                  const isLast = index === tracking.timeline.length - 1

                  return (
                    <div key={index} className="flex gap-4">
                      <div className="flex flex-col items-center">
                        <div className={`rounded-full p-2 ${event.completed ? "bg-primary" : "bg-muted"}`}>
                          {event.completed ? (
                            <CheckCircle className="h-4 w-4 text-white" />
                          ) : (
                            <Package className="h-4 w-4 text-muted-foreground" />
                          )}
                        </div>
                        {!isLast && <div className={`w-0.5 h-16 ${event.completed ? "bg-primary" : "bg-muted"}`} />}
                      </div>
                      <div className="flex-1 pb-8">
                        <p className={`font-medium ${event.completed ? "text-foreground" : "text-muted-foreground"}`}>
                          {event.status}
                        </p>
                        <p className="text-sm text-muted-foreground">{event.location}</p>
                        {event.date && (
                          <p className="text-sm text-muted-foreground mt-1">
                            {new Date(event.date).toLocaleDateString("en-IN", {
                              day: "numeric",
                              month: "short",
                              hour: "2-digit",
                              minute: "2-digit",
                            })}
                          </p>
                        )}
                      </div>
                    </div>
                  )
                })}
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}
