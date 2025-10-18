"use client"

import { Plus, MapPin, Edit, Trash2 } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

const addresses = [
  {
    id: "1",
    name: "John Doe",
    phone: "+91 1234567890",
    addressLine1: "123 Main Street",
    addressLine2: "Apartment 4B",
    city: "Mumbai",
    state: "Maharashtra",
    postalCode: "400001",
    isDefault: true,
  },
  {
    id: "2",
    name: "John Doe",
    phone: "+91 1234567890",
    addressLine1: "456 Park Avenue",
    addressLine2: "",
    city: "Pune",
    state: "Maharashtra",
    postalCode: "411001",
    isDefault: false,
  },
]

export function AddressesList() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <p className="text-[#8B6F47]">Manage your saved addresses</p>
        <Button className="gap-2 bg-[#2D5F3F] hover:bg-[#234A32] text-white">
          <Plus className="h-4 w-4" />
          Add New Address
        </Button>
      </div>

      <div className="grid sm:grid-cols-2 gap-6">
        {addresses.map((address) => (
          <Card key={address.id} className="rounded-2xl border-2 border-[#E8DCC8]">
            <CardContent className="p-6 space-y-4">
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-3">
                  <MapPin className="h-5 w-5 text-[#2D5F3F] mt-0.5" />
                  <div>
                    <p className="font-semibold text-[#6B4423]">{address.name}</p>
                    <p className="text-sm text-[#8B6F47]">{address.phone}</p>
                  </div>
                </div>
                {address.isDefault && (
                  <Badge className="bg-[#FF7E00]/10 text-[#FF7E00] border-0">Default</Badge>
                )}
              </div>

              <div className="text-sm text-[#6B4423]">
                <p>{address.addressLine1}</p>
                {address.addressLine2 && <p>{address.addressLine2}</p>}
                <p>
                  {address.city}, {address.state} {address.postalCode}
                </p>
              </div>

              <div className="flex gap-2 pt-2">
                <Button
                  variant="outline"
                  size="sm"
                  className="flex-1 gap-2 bg-transparent border-2 border-[#E8DCC8] hover:bg-[#F5F1E8]"
                >
                  <Edit className="h-4 w-4" />
                  Edit
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="flex-1 gap-2 text-destructive hover:text-destructive bg-transparent border-2 border-[#E8DCC8]"
                >
                  <Trash2 className="h-4 w-4" />
                  Delete
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
