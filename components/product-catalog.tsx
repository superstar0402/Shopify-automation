"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Search, Plus, Package, Tag, CheckCircle } from "lucide-react"

const products = [
  {
    id: 1,
    name: "Keto Chicken Bowl",
    sku: "KCB-001",
    category: "Main Meals",
    dietaryTags: ["keto", "gluten-free", "dairy-free"],
    ndisApproved: true,
    price: 18.5,
    stock: 45,
  },
  {
    id: 2,
    name: "Gluten-Free Pasta Salad",
    sku: "GPS-002",
    category: "Salads",
    dietaryTags: ["gluten-free", "vegetarian"],
    ndisApproved: false,
    price: 14.0,
    stock: 32,
  },
  {
    id: 3,
    name: "NDIS Approved Protein Box",
    sku: "NPB-003",
    category: "Protein Boxes",
    dietaryTags: ["high-protein", "low-carb"],
    ndisApproved: true,
    price: 22.0,
    stock: 28,
  },
  {
    id: 4,
    name: "Vegan Buddha Bowl",
    sku: "VBB-004",
    category: "Bowls",
    dietaryTags: ["vegan", "gluten-free", "dairy-free"],
    ndisApproved: false,
    price: 16.5,
    stock: 38,
  },
  {
    id: 5,
    name: "Low-Carb Salmon Plate",
    sku: "LCS-005",
    category: "Main Meals",
    dietaryTags: ["keto", "low-carb", "high-protein"],
    ndisApproved: true,
    price: 24.0,
    stock: 22,
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

export default function ProductCatalog() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedFilter, setSelectedFilter] = useState("all")

  const filteredProducts = products.filter((product) => {
    const matchesSearch =
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.sku.toLowerCase().includes(searchTerm.toLowerCase())

    if (selectedFilter === "all") return matchesSearch
    if (selectedFilter === "ndis") return matchesSearch && product.ndisApproved
    return matchesSearch && product.dietaryTags.includes(selectedFilter)
  })

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Product Catalog</h2>
          <p className="text-gray-600">Properly structured products with dietary tags</p>
        </div>
        <Button className="flex items-center gap-2">
          <Plus className="h-4 w-4" />
          Add Product
        </Button>
      </div>

      {/* Search and Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <Label htmlFor="search">Search Products</Label>
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  id="search"
                  placeholder="Search by name or SKU..."
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
                <option value="all">All Products</option>
                <option value="keto">Keto</option>
                <option value="gluten-free">Gluten-Free</option>
                <option value="dairy-free">Dairy-Free</option>
                <option value="vegetarian">Vegetarian</option>
                <option value="vegan">Vegan</option>
                <option value="ndis">NDIS Approved</option>
              </select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Product Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProducts.map((product) => (
          <Card key={product.id} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle className="text-lg">{product.name}</CardTitle>
                  <CardDescription>
                    {product.sku} • {product.category}
                  </CardDescription>
                </div>
                {product.ndisApproved && (
                  <Badge className="bg-green-600">
                    <CheckCircle className="h-3 w-3 mr-1" />
                    NDIS
                  </Badge>
                )}
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Dietary Tags */}
              <div>
                <Label className="text-sm font-medium mb-2 block">Dietary Tags</Label>
                <div className="flex flex-wrap gap-1">
                  {product.dietaryTags.map((tag) => (
                    <Badge
                      key={tag}
                      variant="secondary"
                      className={dietaryTagColors[tag as keyof typeof dietaryTagColors]}
                    >
                      <Tag className="h-3 w-3 mr-1" />
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Price and Stock */}
              <div className="flex justify-between items-center pt-2 border-t">
                <div>
                  <span className="text-2xl font-bold">${product.price}</span>
                </div>
                <div className="text-right">
                  <div className="text-sm text-gray-600">Stock</div>
                  <div className="font-semibold">{product.stock} units</div>
                </div>
              </div>

              <Button variant="outline" className="w-full">
                Edit Product
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Key Features */}
      <Card className="bg-blue-50 border-blue-200">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-blue-700">
            <Package className="h-5 w-5" />
            Product Structure Benefits
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <h4 className="font-semibold">Automated Filtering</h4>
              <p className="text-sm text-gray-600">
                Products are automatically filtered based on customer dietary requirements during order processing.
              </p>
            </div>
            <div className="space-y-2">
              <h4 className="font-semibold">NDIS Compliance</h4>
              <p className="text-sm text-gray-600">
                Clear NDIS approval status ensures compliance and proper billing for eligible customers.
              </p>
            </div>
            <div className="space-y-2">
              <h4 className="font-semibold">Consistent Tagging</h4>
              <p className="text-sm text-gray-600">
                Standardized dietary tags enable reliable automation and reduce manual checking.
              </p>
            </div>
            <div className="space-y-2">
              <h4 className="font-semibold">Production Ready</h4>
              <p className="text-sm text-gray-600">
                Structured data flows directly into production sheets without reformatting.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
