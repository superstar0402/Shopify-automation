"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Search, User, Plus, Mail, Phone, MapPin, Shield, Heart } from "lucide-react"

const customers = [
  {
    id: 1,
    name: "Sarah Johnson",
    email: "sarah.j@email.com",
    phone: "+61 400 123 456",
    address: "123 Main St, Sydney NSW 2000",
    dietaryRequirements: ["keto", "dairy-free"],
    ndisParticipant: true,
    ndisNumber: "NDIS-2024-001",
    totalOrders: 24,
    lastOrder: "2024-01-15",
    preferences: {
      deliveryDay: "Tuesday",
      specialInstructions: "Leave at front door",
    },
  },
  {
    id: 2,
    name: "Michael Chen",
    email: "m.chen@email.com",
    phone: "+61 400 234 567",
    address: "456 Oak Ave, Melbourne VIC 3000",
    dietaryRequirements: ["gluten-free", "vegetarian"],
    ndisParticipant: false,
    ndisNumber: null,
    totalOrders: 18,
    lastOrder: "2024-01-14",
    preferences: {
      deliveryDay: "Wednesday",
      specialInstructions: "Ring doorbell",
    },
  },
  {
    id: 3,
    name: "Emma Wilson",
    email: "emma.w@email.com",
    phone: "+61 400 345 678",
    address: "789 Pine St, Brisbane QLD 4000",
    dietaryRequirements: ["vegan", "gluten-free"],
    ndisParticipant: true,
    ndisNumber: "NDIS-2024-002",
    totalOrders: 31,
    lastOrder: "2024-01-16",
    preferences: {
      deliveryDay: "Thursday",
      specialInstructions: "Call before delivery",
    },
  },
  {
    id: 4,
    name: "David Brown",
    email: "d.brown@email.com",
    phone: "+61 400 456 789",
    address: "321 Elm St, Perth WA 6000",
    dietaryRequirements: ["high-protein", "low-carb"],
    ndisParticipant: false,
    ndisNumber: null,
    totalOrders: 12,
    lastOrder: "2024-01-13",
    preferences: {
      deliveryDay: "Friday",
      specialInstructions: "Leave with neighbor if not home",
    },
  },
]

const dietaryTagColors = {
  keto: "bg-purple-100 text-purple-800",
  "gluten-free": "bg-green-100 text-green-800",
  "dairy-free": "bg-blue-100 text-blue-800",
  vegetarian: "bg-orange-100 text-orange-800",
  vegan: "bg-emerald-100 text-emerald-800",
  "high-protein": "bg-red-100 text-red-800",
  "low-carb": "bg-indigo-100 text-indigo-800",
}

export default function CustomerProfiles() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedFilter, setSelectedFilter] = useState("all")

  const filteredCustomers = customers.filter((customer) => {
    const matchesSearch =
      customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.email.toLowerCase().includes(searchTerm.toLowerCase())

    if (selectedFilter === "all") return matchesSearch
    if (selectedFilter === "ndis") return matchesSearch && customer.ndisParticipant
    return matchesSearch && customer.dietaryRequirements.includes(selectedFilter)
  })

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Customer Profiles</h2>
          <p className="text-gray-600">Customers with captured dietary preferences</p>
        </div>
        <Button className="flex items-center gap-2">
          <Plus className="h-4 w-4" />
          Add Customer
        </Button>
      </div>

      {/* Search and Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <Label htmlFor="search">Search Customers</Label>
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  id="search"
                  placeholder="Search by name or email..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <div>
              <Label htmlFor="filter">Filter by Dietary</Label>
              <select
                id="filter"
                value={selectedFilter}
                onChange={(e) => setSelectedFilter(e.target.value)}
                className="w-full p-2 border rounded-md"
              >
                <option value="all">All Customers</option>
                <option value="keto">Keto</option>
                <option value="gluten-free">Gluten-Free</option>
                <option value="dairy-free">Dairy-Free</option>
                <option value="vegetarian">Vegetarian</option>
                <option value="vegan">Vegan</option>
                <option value="ndis">NDIS Participants</option>
              </select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Customer Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredCustomers.map((customer) => (
          <Card key={customer.id} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex items-start gap-4">
                <Avatar>
                  <AvatarFallback>
                    {customer.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <CardTitle className="text-lg">{customer.name}</CardTitle>
                    {customer.ndisParticipant && (
                      <Badge className="bg-green-600">
                        <Shield className="h-3 w-3 mr-1" />
                        NDIS
                      </Badge>
                    )}
                  </div>
                  <CardDescription>
                    {customer.totalOrders} orders • Last: {customer.lastOrder}
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Contact Info */}
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm">
                  <Mail className="h-4 w-4 text-gray-400" />
                  <span>{customer.email}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Phone className="h-4 w-4 text-gray-400" />
                  <span>{customer.phone}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <MapPin className="h-4 w-4 text-gray-400" />
                  <span>{customer.address}</span>
                </div>
              </div>

              {/* Dietary Requirements */}
              <div>
                <Label className="text-sm font-medium mb-2 block flex items-center gap-1">
                  <Heart className="h-4 w-4" />
                  Dietary Requirements
                </Label>
                <div className="flex flex-wrap gap-1">
                  {customer.dietaryRequirements.map((requirement) => (
                    <Badge
                      key={requirement}
                      variant="secondary"
                      className={dietaryTagColors[requirement as keyof typeof dietaryTagColors]}
                    >
                      {requirement}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* NDIS Info */}
              {customer.ndisParticipant && (
                <div className="p-3 bg-green-50 rounded-lg border border-green-200">
                  <div className="flex items-center gap-2 mb-1">
                    <Shield className="h-4 w-4 text-green-600" />
                    <span className="font-medium text-green-800">NDIS Participant</span>
                  </div>
                  <p className="text-sm text-green-700">Number: {customer.ndisNumber}</p>
                </div>
              )}

              {/* Preferences */}
              <div className="p-3 bg-gray-50 rounded-lg">
                <h4 className="font-medium mb-2">Delivery Preferences</h4>
                <div className="space-y-1 text-sm text-gray-600">
                  <p>
                    <strong>Day:</strong> {customer.preferences.deliveryDay}
                  </p>
                  <p>
                    <strong>Instructions:</strong> {customer.preferences.specialInstructions}
                  </p>
                </div>
              </div>

              <Button variant="outline" className="w-full">
                View Order History
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Key Features */}
      <Card className="bg-purple-50 border-purple-200">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-purple-700">
            <User className="h-5 w-5" />
            Customer Profile Benefits
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <h4 className="font-semibold">Automatic Filtering</h4>
              <p className="text-sm text-gray-600">
                Orders are automatically filtered based on each customer's dietary requirements.
              </p>
            </div>
            <div className="space-y-2">
              <h4 className="font-semibold">NDIS Integration</h4>
              <p className="text-sm text-gray-600">
                NDIS participant status is captured and used for billing and compliance.
              </p>
            </div>
            <div className="space-y-2">
              <h4 className="font-semibold">Preference Memory</h4>
              <p className="text-sm text-gray-600">
                Delivery preferences and special instructions are stored and applied automatically.
              </p>
            </div>
            <div className="space-y-2">
              <h4 className="font-semibold">Order History</h4>
              <p className="text-sm text-gray-600">
                Complete order history helps with personalized recommendations and service.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
