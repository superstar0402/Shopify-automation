"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ShoppingCart, Users, Package, Clock, CheckCircle, AlertTriangle, Zap, Settings, FileText } from "lucide-react"
import ProductCatalog from "@/components/product-catalog"
import CustomerProfiles from "@/components/customer-profiles"
import OrderProcessing from "@/components/order-processing"
import AutomationDashboard from "@/components/automation-dashboard"
import ShopifyIntegration from "@/components/shopify-integration"
import AutomationTools from "@/components/automation-tools"
import ProductionSheets from "@/components/production-sheets"

export default function ShopifyAutomationDemo() {
  const [activeTab, setActiveTab] = useState("dashboard")

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50">
      <div className="container mx-auto p-6">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-purple-600 rounded-lg">
              <Zap className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Shopify Automation Specialist Demo</h1>
              <p className="text-gray-600">Eliminate Manual Work, Build Seamless Order Pull Workflow</p>
            </div>
          </div>

          {/* Key Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-orange-500" />
                  <div>
                    <p className="text-sm text-gray-600">Manual Time</p>
                    <p className="text-2xl font-bold text-orange-500">4+ hrs</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-2">
                  <Zap className="h-4 w-4 text-green-500" />
                  <div>
                    <p className="text-sm text-gray-600">Automated Time</p>
                    <p className="text-2xl font-bold text-green-500">2 min</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-blue-500" />
                  <div>
                    <p className="text-sm text-gray-600">Accuracy</p>
                    <p className="text-2xl font-bold text-blue-500">99.9%</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-2">
                  <AlertTriangle className="h-4 w-4 text-red-500" />
                  <div>
                    <p className="text-sm text-gray-600">Manual Errors</p>
                    <p className="text-2xl font-bold text-red-500">0</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Main Content */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-7">
            <TabsTrigger value="dashboard" className="flex items-center gap-2">
              <Zap className="h-4 w-4" />
              Dashboard
            </TabsTrigger>
            <TabsTrigger value="products" className="flex items-center gap-2">
              <Package className="h-4 w-4" />
              Products
            </TabsTrigger>
            <TabsTrigger value="customers" className="flex items-center gap-2">
              <Users className="h-4 w-4" />
              Customers
            </TabsTrigger>
            <TabsTrigger value="orders" className="flex items-center gap-2">
              <ShoppingCart className="h-4 w-4" />
              Orders
            </TabsTrigger>
            <TabsTrigger value="shopify" className="flex items-center gap-2">
              <Settings className="h-4 w-4" />
              Shopify
            </TabsTrigger>
            <TabsTrigger value="automation" className="flex items-center gap-2">
              <Zap className="h-4 w-4" />
              Automation
            </TabsTrigger>
            <TabsTrigger value="production" className="flex items-center gap-2">
              <FileText className="h-4 w-4" />
              Production
            </TabsTrigger>
          </TabsList>

          <TabsContent value="dashboard">
            <AutomationDashboard />
          </TabsContent>

          <TabsContent value="products">
            <ProductCatalog />
          </TabsContent>

          <TabsContent value="customers">
            <CustomerProfiles />
          </TabsContent>

          <TabsContent value="orders">
            <OrderProcessing />
          </TabsContent>

          <TabsContent value="shopify">
            <ShopifyIntegration />
          </TabsContent>

          <TabsContent value="automation">
            <AutomationTools />
          </TabsContent>

          <TabsContent value="production">
            <ProductionSheets />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
