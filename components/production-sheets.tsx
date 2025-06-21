"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { FileText, Download, Mail, Printer, Package, Filter, Eye } from "lucide-react"

const productionSheets = [
  {
    id: "PS-2024-001",
    date: "2024-01-16",
    type: "Daily Production",
    orders: 12,
    items: 34,
    dietary: ["keto", "gluten-free", "vegan"],
    ndisOrders: 5,
    status: "ready",
    generatedAt: "09:30 AM",
    kitchen: "Main Kitchen",
  },
  {
    id: "PS-2024-002",
    date: "2024-01-15",
    type: "NDIS Special",
    orders: 8,
    items: 18,
    dietary: ["ndis-approved"],
    ndisOrders: 8,
    status: "completed",
    generatedAt: "08:45 AM",
    kitchen: "NDIS Kitchen",
  },
  {
    id: "PS-2024-003",
    date: "2024-01-15",
    type: "Dietary Specific",
    orders: 15,
    items: 42,
    dietary: ["keto", "dairy-free"],
    ndisOrders: 3,
    status: "in-progress",
    generatedAt: "07:15 AM",
    kitchen: "Main Kitchen",
  },
]

const sampleProductionData = {
  summary: {
    totalOrders: 12,
    totalItems: 34,
    ketoItems: 15,
    glutenFreeItems: 12,
    veganItems: 7,
    ndisOrders: 5,
  },
  items: [
    {
      name: "Keto Chicken Bowl",
      quantity: 8,
      dietary: ["keto", "dairy-free"],
      customers: ["Sarah J.", "Mike C.", "Emma W."],
      specialInstructions: ["Extra sauce on side", "No onions"],
      ndisCount: 3,
    },
    {
      name: "Gluten-Free Pasta Salad",
      quantity: 6,
      dietary: ["gluten-free", "vegetarian"],
      customers: ["David B.", "Lisa M.", "Tom R."],
      specialInstructions: ["Light dressing"],
      ndisCount: 1,
    },
    {
      name: "Vegan Buddha Bowl",
      quantity: 4,
      dietary: ["vegan", "gluten-free"],
      customers: ["Emma W.", "Alex K."],
      specialInstructions: ["Extra tahini"],
      ndisCount: 2,
    },
  ],
}

export default function ProductionSheets() {
  const [selectedSheet, setSelectedSheet] = useState(productionSheets[0])
  const [viewMode, setViewMode] = useState("summary")

  return (
    <div className="space-y-6">
      {/* Header Actions */}
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Production Sheets</h2>
          <p className="text-gray-600">Automated production-ready order sheets</p>
        </div>
        <div className="flex gap-2">
          <Button className="flex items-center gap-2">
            <FileText className="h-4 w-4" />
            Generate New Sheet
          </Button>
          <Button variant="outline" className="flex items-center gap-2">
            <Download className="h-4 w-4" />
            Export All
          </Button>
        </div>
      </div>

      {/* Production Sheets List */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle>Recent Sheets</CardTitle>
              <CardDescription>Generated production sheets</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {productionSheets.map((sheet) => (
                <div
                  key={sheet.id}
                  className={`p-3 border rounded-lg cursor-pointer transition-colors ${
                    selectedSheet.id === sheet.id ? "border-blue-500 bg-blue-50" : "hover:bg-gray-50"
                  }`}
                  onClick={() => setSelectedSheet(sheet)}
                >
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-medium text-sm">{sheet.id}</h4>
                    <Badge
                      className={
                        sheet.status === "ready"
                          ? "bg-green-600"
                          : sheet.status === "completed"
                            ? "bg-blue-600"
                            : "bg-yellow-600"
                      }
                    >
                      {sheet.status}
                    </Badge>
                  </div>
                  <p className="text-xs text-gray-600 mb-2">{sheet.type}</p>
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-gray-500">{sheet.orders} orders</span>
                    <span className="text-gray-500">{sheet.generatedAt}</span>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Sheet Details */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>{selectedSheet.id}</CardTitle>
                  <CardDescription>
                    {selectedSheet.type} - {selectedSheet.date}
                  </CardDescription>
                </div>
                <div className="flex gap-2">
                  <Button size="sm" variant="outline">
                    <Eye className="h-4 w-4 mr-1" />
                    Preview
                  </Button>
                  <Button size="sm" variant="outline">
                    <Mail className="h-4 w-4 mr-1" />
                    Email
                  </Button>
                  <Button size="sm">
                    <Download className="h-4 w-4 mr-1" />
                    Download
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Tabs value={viewMode} onValueChange={setViewMode} className="space-y-4">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="summary">Summary</TabsTrigger>
                  <TabsTrigger value="detailed">Detailed View</TabsTrigger>
                  <TabsTrigger value="dietary">Dietary Breakdown</TabsTrigger>
                </TabsList>

                <TabsContent value="summary" className="space-y-4">
                  {/* Summary Stats */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="text-center p-3 bg-blue-50 rounded-lg">
                      <div className="text-xl font-bold text-blue-600">{selectedSheet.orders}</div>
                      <div className="text-xs text-gray-600">Total Orders</div>
                    </div>
                    <div className="text-center p-3 bg-green-50 rounded-lg">
                      <div className="text-xl font-bold text-green-600">{selectedSheet.items}</div>
                      <div className="text-xs text-gray-600">Total Items</div>
                    </div>
                    <div className="text-center p-3 bg-purple-50 rounded-lg">
                      <div className="text-xl font-bold text-purple-600">{selectedSheet.ndisOrders}</div>
                      <div className="text-xs text-gray-600">NDIS Orders</div>
                    </div>
                    <div className="text-center p-3 bg-orange-50 rounded-lg">
                      <div className="text-xl font-bold text-orange-600">{selectedSheet.dietary.length}</div>
                      <div className="text-xs text-gray-600">Dietary Types</div>
                    </div>
                  </div>

                  {/* Kitchen Assignment */}
                  <div className="p-4 border rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <Package className="h-4 w-4 text-gray-500" />
                      <h4 className="font-medium">Kitchen Assignment</h4>
                    </div>
                    <p className="text-sm text-gray-600">{selectedSheet.kitchen}</p>
                    <p className="text-xs text-gray-500">Generated at {selectedSheet.generatedAt}</p>
                  </div>

                  {/* Dietary Requirements */}
                  <div className="p-4 border rounded-lg">
                    <div className="flex items-center gap-2 mb-3">
                      <Filter className="h-4 w-4 text-gray-500" />
                      <h4 className="font-medium">Dietary Requirements</h4>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {selectedSheet.dietary.map((diet) => (
                        <Badge key={diet} variant="secondary">
                          {diet}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="detailed" className="space-y-4">
                  <div className="space-y-3">
                    {sampleProductionData.items.map((item, index) => (
                      <div key={index} className="border rounded-lg p-4">
                        <div className="flex items-center justify-between mb-3">
                          <h4 className="font-semibold">{item.name}</h4>
                          <div className="flex items-center gap-2">
                            <Badge className="bg-blue-600">Qty: {item.quantity}</Badge>
                            {item.ndisCount > 0 && <Badge className="bg-green-600">NDIS: {item.ndisCount}</Badge>}
                          </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <h5 className="text-sm font-medium mb-1">Dietary Tags</h5>
                            <div className="flex flex-wrap gap-1">
                              {item.dietary.map((diet) => (
                                <Badge key={diet} variant="outline" className="text-xs">
                                  {diet}
                                </Badge>
                              ))}
                            </div>
                          </div>

                          <div>
                            <h5 className="text-sm font-medium mb-1">Customers</h5>
                            <p className="text-sm text-gray-600">{item.customers.join(", ")}</p>
                          </div>
                        </div>

                        {item.specialInstructions.length > 0 && (
                          <div className="mt-3 p-2 bg-yellow-50 rounded border-l-4 border-yellow-400">
                            <h5 className="text-sm font-medium text-yellow-800">Special Instructions</h5>
                            <ul className="text-sm text-yellow-700 mt-1">
                              {item.specialInstructions.map((instruction, i) => (
                                <li key={i}>• {instruction}</li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </TabsContent>

                <TabsContent value="dietary" className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-lg">Dietary Breakdown</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-3">
                        <div className="flex justify-between items-center">
                          <span className="text-sm">Keto Items</span>
                          <Badge className="bg-purple-600">{sampleProductionData.summary.ketoItems}</Badge>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm">Gluten-Free Items</span>
                          <Badge className="bg-green-600">{sampleProductionData.summary.glutenFreeItems}</Badge>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm">Vegan Items</span>
                          <Badge className="bg-emerald-600">{sampleProductionData.summary.veganItems}</Badge>
                        </div>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader>
                        <CardTitle className="text-lg">NDIS Summary</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-3">
                        <div className="flex justify-between items-center">
                          <span className="text-sm">NDIS Orders</span>
                          <Badge className="bg-blue-600">{sampleProductionData.summary.ndisOrders}</Badge>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm">Regular Orders</span>
                          <Badge variant="outline">
                            {sampleProductionData.summary.totalOrders - sampleProductionData.summary.ndisOrders}
                          </Badge>
                        </div>
                        <div className="text-xs text-gray-500 mt-2">Separate billing required for NDIS orders</div>
                      </CardContent>
                    </Card>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Export Options */}
      <Card>
        <CardHeader>
          <CardTitle>Export & Distribution</CardTitle>
          <CardDescription>Send production sheets to your team</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Button variant="outline" className="h-20 flex flex-col gap-2">
              <Download className="h-6 w-6" />
              <span>Download Excel</span>
              <span className="text-xs opacity-75">Formatted spreadsheet</span>
            </Button>
            <Button variant="outline" className="h-20 flex flex-col gap-2">
              <Mail className="h-6 w-6" />
              <span>Email Kitchen</span>
              <span className="text-xs opacity-75">Send to production team</span>
            </Button>
            <Button variant="outline" className="h-20 flex flex-col gap-2">
              <Printer className="h-6 w-6" />
              <span>Print Ready</span>
              <span className="text-xs opacity-75">Optimized for printing</span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
