"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Textarea } from "@/components/ui/textarea"

export function AdminSettings() {
  return (
    <div className="space-y-6 font-sans">
      <div>
        <h1 className="text-3xl font-bold mb-2 text-[#6B4423]">Settings</h1>
        <p className="text-[#8B6F47]">Manage store configuration and preferences</p>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Store Details */}
        <Card className="rounded-2xl py-5 border-2 border-[#E8DCC8]">
          <CardHeader>
            <CardTitle className="text-[#6B4423]">Store Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="store-name">Store Name</Label>
              <Input id="store-name" placeholder="Swadeshika" className="border-2 border-[#E8DCC8] focus-visible:ring-0 focus-visible:border-[#2D5F3F]" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="store-email">Support Email</Label>
              <Input id="store-email" type="email" placeholder="support@swadeshika.com" className="border-2 border-[#E8DCC8] focus-visible:ring-0 focus-visible:border-[#2D5F3F]" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="store-phone">Support Phone</Label>
              <Input id="store-phone" placeholder="+91 98765 43210" className="border-2 border-[#E8DCC8] focus-visible:ring-0 focus-visible:border-[#2D5F3F]" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="store-address">Store Address</Label>
              <Textarea id="store-address" placeholder="Street, City, State, PIN" className="border-2 border-[#E8DCC8] focus-visible:ring-0 focus-visible:border-[#2D5F3F]" rows={3} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="store-logo">Logo URL</Label>
              <Input id="store-logo" placeholder="https://.../logo.png" className="border-2 border-[#E8DCC8] focus-visible:ring-0 focus-visible:border-[#2D5F3F]" />
            </div>
          </CardContent>
        </Card>

        {/* Orders & Checkout */}
        <Card className="rounded-2xl py-5 border-2 border-[#E8DCC8]">
          <CardHeader>
            <CardTitle className="text-[#6B4423]">Orders & Checkout</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-[#6B4423]">Enable Guest Checkout</p>
                <p className="text-sm text-[#8B6F47]">Allow customers to checkout without creating an account</p>
              </div>
              <Switch />
            </div>
            <div className="space-y-2">
              <Label>Default Order Status</Label>
              <Select>
                <SelectTrigger className="border-2 border-[#E8DCC8]">
                  <SelectValue placeholder="Pending" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="confirmed">Confirmed</SelectItem>
                  <SelectItem value="processing">Processing</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Payments */}
        <Card className="rounded-2xl py-5 border-2 border-[#E8DCC8]">
          <CardHeader>
            <CardTitle className="text-[#6B4423]">Payments</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="payment-gateway">Payment Gateway</Label>
              <Select>
                <SelectTrigger id="payment-gateway" className="border-2 border-[#E8DCC8]">
                  <SelectValue placeholder="Select gateway" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="razorpay">Razorpay</SelectItem>
                  <SelectItem value="stripe">Stripe</SelectItem>
                  <SelectItem value="cashfree">Cashfree</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="currency">Currency</Label>
              <Select>
                <SelectTrigger id="currency" className="border-2 border-[#E8DCC8]">
                  <SelectValue placeholder="INR" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="inr">INR</SelectItem>
                  <SelectItem value="usd">USD</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Notifications */}
        <Card className="rounded-2xl py-5 border-2 border-[#E8DCC8]">
          <CardHeader>
            <CardTitle className="text-[#6B4423]">Notifications</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-[#6B4423]">Order Email Alerts</p>
                <p className="text-sm text-[#8B6F47]">Send email when a new order is placed</p>
              </div>
              <Switch />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-[#6B4423]">Low Stock Alerts</p>
                <p className="text-sm text-[#8B6F47]">Notify when products go below threshold</p>
              </div>
              <Switch />
            </div>
          </CardContent>
        </Card>

        {/* Shipping & Delivery */}
        <Card className="rounded-2xl py-5 border-2 border-[#E8DCC8]">
          <CardHeader>
            <CardTitle className="text-[#6B4423]">Shipping & Delivery</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="shipping-method">Default Shipping Method</Label>
              <Select>
                <SelectTrigger id="shipping-method" className="border-2 border-[#E8DCC8]">
                  <SelectValue placeholder="Standard" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="standard">Standard</SelectItem>
                  <SelectItem value="express">Express</SelectItem>
                  <SelectItem value="pickup">Store Pickup</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="free-threshold">Free Shipping Threshold (₹)</Label>
              <Input id="free-threshold" type="number" placeholder="999" className="border-2 border-[#E8DCC8] focus-visible:ring-0 focus-visible:border-[#2D5F3F]" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="flat-rate">Flat Rate (₹)</Label>
              <Input id="flat-rate" type="number" placeholder="49" className="border-2 border-[#E8DCC8] focus-visible:ring-0 focus-visible:border-[#2D5F3F]" />
            </div>
          </CardContent>
        </Card>

        {/* Tax Settings */}
        <Card className="rounded-2xl py-5 border-2 border-[#E8DCC8]">
          <CardHeader>
            <CardTitle className="text-[#6B4423]">Tax Settings</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="gst-percent">GST Percentage (%)</Label>
              <Input id="gst-percent" type="number" placeholder="18" className="border-2 border-[#E8DCC8] focus-visible:ring-0 focus-visible:border-[#2D5F3F]" />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-[#6B4423]">Prices include tax</p>
                <p className="text-sm text-[#8B6F47]">Show prices inclusive of GST</p>
              </div>
              <Switch />
            </div>
          </CardContent>
        </Card>

        {/* Email Templates */}
        <Card className="rounded-2xl py-5 border-2 border-[#E8DCC8]">
          <CardHeader>
            <CardTitle className="text-[#6B4423]">Email Templates</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email-from">From Address</Label>
              <Input id="email-from" type="email" placeholder="no-reply@swadeshika.com" className="border-2 border-[#E8DCC8] focus-visible:ring-0 focus-visible:border-[#2D5F3F]" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="order-subject">Order Confirmation Subject</Label>
              <Input id="order-subject" placeholder="Thank you for your order!" className="border-2 border-[#E8DCC8] focus-visible:ring-0 focus-visible:border-[#2D5F3F]" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="order-template">Order Confirmation Template</Label>
              <Textarea id="order-template" rows={4} placeholder="Hi {{name}}, your order {{orderNumber}} has been received..." className="border-2 border-[#E8DCC8] focus-visible:ring-0 focus-visible:border-[#2D5F3F]" />
            </div>
          </CardContent>
        </Card>

        {/* SEO & Analytics */}
        <Card className="rounded-2xl py-5 border-2 border-[#E8DCC8]">
          <CardHeader>
            <CardTitle className="text-[#6B4423]">SEO & Analytics</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="meta-title">Default Meta Title</Label>
              <Input id="meta-title" placeholder="Swadeshika - Authentic Organic Foods" className="border-2 border-[#E8DCC8] focus-visible:ring-0 focus-visible:border-[#2D5F3F]" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="meta-description">Default Meta Description</Label>
              <Textarea id="meta-description" rows={3} placeholder="Shop organic, ethically sourced foods from Swadeshika..." className="border-2 border-[#E8DCC8] focus-visible:ring-0 focus-visible:border-[#2D5F3F]" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="ga-id">Google Analytics ID</Label>
              <Input id="ga-id" placeholder="G-XXXXXXXXXX" className="border-2 border-[#E8DCC8] focus-visible:ring-0 focus-visible:border-[#2D5F3F]" />
            </div>
          </CardContent>
        </Card>

        {/* Regional & Locale */}
        <Card className="rounded-2xl py-5 border-2 border-[#E8DCC8]">
          <CardHeader>
            <CardTitle className="text-[#6B4423]">Regional & Locale</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="timezone">Timezone</Label>
              <Select>
                <SelectTrigger id="timezone" className="border-2 border-[#E8DCC8]">
                  <SelectValue placeholder="Asia/Kolkata (IST)" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="asia-kolkata">Asia/Kolkata (IST)</SelectItem>
                  <SelectItem value="utc">UTC</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="units">Measurement Units</Label>
              <Select>
                <SelectTrigger id="units" className="border-2 border-[#E8DCC8]">
                  <SelectValue placeholder="Metric" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="metric">Metric</SelectItem>
                  <SelectItem value="imperial">Imperial</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Store Policies */}
        <Card className="rounded-2xl py-5 border-2 border-[#E8DCC8]">
          <CardHeader>
            <CardTitle className="text-[#6B4423]">Store Policies</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="refund-policy">Refund Policy</Label>
              <Textarea id="refund-policy" rows={4} placeholder="Describe your refund/return policy..." className="border-2 border-[#E8DCC8] focus-visible:ring-0 focus-visible:border-[#2D5F3F]" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="privacy-url">Privacy Policy URL</Label>
              <Input id="privacy-url" placeholder="https://.../privacy" className="border-2 border-[#E8DCC8] focus-visible:ring-0 focus-visible:border-[#2D5F3F]" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="terms-url">Terms & Conditions URL</Label>
              <Input id="terms-url" placeholder="https://.../terms" className="border-2 border-[#E8DCC8] focus-visible:ring-0 focus-visible:border-[#2D5F3F]" />
            </div>
          </CardContent>
        </Card>

        {/* Inventory */}
        <Card className="rounded-2xl py-5 border-2 border-[#E8DCC8]">
          <CardHeader>
            <CardTitle className="text-[#6B4423]">Inventory</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="low-stock">Low Stock Threshold</Label>
              <Input id="low-stock" type="number" placeholder="10" className="border-2 border-[#E8DCC8] focus-visible:ring-0 focus-visible:border-[#2D5F3F]" />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-[#6B4423]">Allow Backorders</p>
                <p className="text-sm text-[#8B6F47]">Permit purchase when stock is zero</p>
              </div>
              <Switch />
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="flex justify-end">
        <Button className="bg-[#2D5F3F] hover:bg-[#234A32] text-white">Save Changes</Button>
      </div>
    </div>
  )
}
