"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Play, Download, FileText, CheckCircle, Clock, Zap, AlertCircle, Package, Users, Filter } from "lucide-react"

const sampleOrders = [
  {
    id: "ORD-001",
    customer: "Sarah Johnson",
    items: [
      { name: "Keto Chicken Bowl", quantity: 2, dietary: ["keto", "dairy-free"] },
      { name: "Low-Carb Salmon Plate", quantity: 1, dietary: ["keto", "low-carb"] },
    ],
    customerDietary: ["keto", "dairy-free"],
    ndisParticipant: true,
    total: 61.0,
    status: "pending",
  },
  {
    id: "ORD-002",
    customer: "Michael Chen",
    items: [
      { name: "Gluten-Free Pasta Salad", quantity: 3, dietary: ["gluten-free", "vegetarian"] },
      { name: "Vegan Buddha Bowl", quantity: 1, dietary: ["vegan", "gluten-free"] },
    ],
    customerDietary: ["gluten-free", "vegetarian"],
    ndisParticipant: false,
    total: 58.5,
    status: "pending",
  },
  {
    id: "ORD-003",
    customer: "Emma Wilson",
    items: [
      { name: "Vegan Buddha Bowl", quantity: 2, dietary: ["vegan", "gluten-free"] },
      { name: "Gluten-Free Pasta Salad", quantity: 1, dietary: ["gluten-free", "vegetarian"] },
    ],
    customerDietary: ["vegan", "gluten-free"],
    ndisParticipant: true,
    total: 47.0,
    status: "pending",
  },
]

export default function OrderProcessing() {
  const [isProcessing, setIsProcessing] = useState(false)
  const [processStep, setProcessStep] = useState(0)
  const [showResults, setShowResults] = useState(false)

  const processSteps = [
    "Fetching orders from Shopify",
    "Loading customer dietary profiles",
    "Filtering products by dietary requirements",
    "Checking NDIS eligibility",
    "Generating production sheets",
    "Quality assurance checks",
    "Exporting final files",
  ]

  const handleStartProcessing = async () => {
    setIsProcessing(true)
    setShowResults(false)

    for (let i = 0; i < processSteps.length; i++) {
      setProcessStep(i)
      await new Promise((resolve) => setTimeout(resolve, 800))
    }

    setIsProcessing(false)
    setShowResults(true)
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Order Processing</h2>
          <p className="text-gray-600">One-click automated order pull workflow</p>
        </div>
        <div className="flex gap-2">
          <Button onClick={handleStartProcessing} disabled={isProcessing} className="flex items-center gap-2">
            {isProcessing ? <Clock className="h-4 w-4 animate-spin" /> : <Play className="h-4 w-4" />}
            {isProcessing ? "Processing..." : "Start Order Pull"}
          </Button>
        </div>
      </div>

      {/* Processing Status */}
      {isProcessing && (
        <Card className="border-blue-200 bg-blue-50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-blue-700">
              <Zap className="h-5 w-5" />
              Processing Orders
            </CardTitle>
            <CardDescription>Automated workflow in progress...</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              {processSteps.map((step, index) => (
                <div key={index} className="flex items-center gap-3">
                  <div
                    className={`w-6 h-6 rounded-full flex items-center justify-center ${
                      index < processStep ? "bg-green-500" : index === processStep ? "bg-blue-500" : "bg-gray-200"
                    }`}
                  >
                    {index < processStep ? (
                      <CheckCircle className="h-4 w-4 text-white" />
                    ) : index === processStep ? (
                      <Clock className="h-4 w-4 text-white animate-spin" />
                    ) : (
                      <span className="text-xs text-gray-500">{index + 1}</span>
                    )}
                  </div>
                  <span className={`text-sm ${index <= processStep ? "text-gray-900" : "text-gray-500"}`}>{step}</span>
                </div>
              ))}
            </div>
            <Progress value={(processStep / processSteps.length) * 100} className="w-full" />
          </CardContent>
        </Card>
      )}

      {/* Sample Orders */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Package className="h-5 w-5" />
            Sample Orders
          </CardTitle>
          <CardDescription>Current orders ready for processing</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {sampleOrders.map((order) => (
              <div key={order.id} className="border rounded-lg p-4">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <h3 className="font-semibold">{order.id}</h3>
                    <span className="text-gray-600">{order.customer}</span>
                    {order.ndisParticipant && <Badge className="bg-green-600">NDIS</Badge>}
                  </div>
                  <div className="text-right">
                    <div className="font-semibold">${order.total.toFixed(2)}</div>
                    <Badge variant="outline">{order.status}</Badge>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm">
                    <Users className="h-4 w-4 text-gray-400" />
                    <span>Customer dietary: </span>
                    <div className="flex gap-1">
                      {order.customerDietary.map((diet) => (
                        <Badge key={diet} variant="secondary" className="text-xs">
                          {diet}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-1">
                    {order.items.map((item, index) => (
                      <div key={index} className="flex items-center justify-between text-sm">
                        <span>
                          {item.quantity}x {item.name}
                        </span>
                        <div className="flex gap-1">
                          {item.dietary.map((diet) => (
                            <Badge key={diet} variant="outline" className="text-xs">
                              {diet}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Results */}
      {showResults && (
        <Card className="border-green-200 bg-green-50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-green-700">
              <CheckCircle className="h-5 w-5" />
              Processing Complete!
            </CardTitle>
            <CardDescription>Production sheets generated successfully</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="text-center p-4 bg-white rounded-lg">
                <div className="text-2xl font-bold text-green-600 mb-1">3</div>
                <div className="text-sm text-gray-600">Orders Processed</div>
              </div>
              <div className="text-center p-4 bg-white rounded-lg">
                <div className="text-2xl font-bold text-blue-600 mb-1">8</div>
                <div className="text-sm text-gray-600">Items Filtered</div>
              </div>
              <div className="text-center p-4 bg-white rounded-lg">
                <div className="text-2xl font-bold text-purple-600 mb-1">2</div>
                <div className="text-sm text-gray-600">NDIS Orders</div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <Button className="flex items-center gap-2">
                <Download className="h-4 w-4" />
                Download Production Sheet
              </Button>
              <Button variant="outline" className="flex items-center gap-2">
                <FileText className="h-4 w-4" />
                View NDIS Report
              </Button>
              <Button variant="outline" className="flex items-center gap-2">
                <Filter className="h-4 w-4" />
                Dietary Summary
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Automation Benefits */}
      <Card>
        <CardHeader>
          <CardTitle>Automation Benefits</CardTitle>
          <CardDescription>What this system eliminates</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold text-red-600 mb-3">Manual Process Issues</h4>
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm">
                  <AlertCircle className="h-4 w-4 text-red-500" />
                  <span>Manual dietary requirement checking</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <AlertCircle className="h-4 w-4 text-red-500" />
                  <span>Product filtering by hand</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <AlertCircle className="h-4 w-4 text-red-500" />
                  <span>NDIS eligibility verification</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <AlertCircle className="h-4 w-4 text-red-500" />
                  <span>Data reformatting for production</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <AlertCircle className="h-4 w-4 text-red-500" />
                  <span>Error-prone manual data entry</span>
                </div>
              </div>
            </div>

            <div>
              <h4 className="font-semibold text-green-600 mb-3">Automated Solutions</h4>
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span>Automatic dietary filtering</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span>Smart product matching</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span>NDIS auto-verification</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span>Production-ready formatting</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span>Zero manual data entry</span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
