"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CheckCircle, AlertCircle, Zap, Database, Webhook, Key, Globe } from "lucide-react"

export default function ShopifyIntegration() {
  const [isConnected, setIsConnected] = useState(true)
  const [webhooksEnabled, setWebhooksEnabled] = useState(true)
  const [autoSync, setAutoSync] = useState(true)

  return (
    <div className="space-y-6">
      {/* Connection Status */}
      <Card className={isConnected ? "border-green-200 bg-green-50" : "border-red-200 bg-red-50"}>
        <CardHeader>
          <CardTitle className={`flex items-center gap-2 ${isConnected ? "text-green-700" : "text-red-700"}`}>
            {isConnected ? <CheckCircle className="h-5 w-5" /> : <AlertCircle className="h-5 w-5" />}
            Shopify Connection Status
          </CardTitle>
          <CardDescription>
            {isConnected ? "Successfully connected to your Shopify store" : "Connection to Shopify store failed"}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="flex items-center gap-2">
              <Globe className="h-4 w-4 text-gray-500" />
              <div>
                <p className="text-sm font-medium">Store URL</p>
                <p className="text-sm text-gray-600">your-store.myshopify.com</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Database className="h-4 w-4 text-gray-500" />
              <div>
                <p className="text-sm font-medium">API Version</p>
                <p className="text-sm text-gray-600">2024-01</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Webhook className="h-4 w-4 text-gray-500" />
              <div>
                <p className="text-sm font-medium">Webhooks</p>
                <Badge className={webhooksEnabled ? "bg-green-600" : "bg-red-600"}>
                  {webhooksEnabled ? "Active" : "Inactive"}
                </Badge>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Integration Settings */}
      <Tabs defaultValue="api" className="space-y-4">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="api">API Settings</TabsTrigger>
          <TabsTrigger value="webhooks">Webhooks</TabsTrigger>
          <TabsTrigger value="automation">Automation</TabsTrigger>
          <TabsTrigger value="mapping">Field Mapping</TabsTrigger>
        </TabsList>

        <TabsContent value="api" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Key className="h-5 w-5" />
                API Configuration
              </CardTitle>
              <CardDescription>Configure your Shopify API credentials</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="store-url">Store URL</Label>
                  <Input id="store-url" placeholder="your-store.myshopify.com" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="api-key">API Key</Label>
                  <Input id="api-key" type="password" placeholder="••••••••••••••••" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="api-secret">API Secret</Label>
                  <Input id="api-secret" type="password" placeholder="••••••••••••••••" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="access-token">Access Token</Label>
                  <Input id="access-token" type="password" placeholder="••••••••••••••••" />
                </div>
              </div>
              <div className="flex gap-2">
                <Button>Test Connection</Button>
                <Button variant="outline">Save Settings</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="webhooks" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Webhook className="h-5 w-5" />
                Webhook Configuration
              </CardTitle>
              <CardDescription>Set up real-time order notifications</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <h4 className="font-medium">Order Created</h4>
                    <p className="text-sm text-gray-600">Triggers when a new order is placed</p>
                  </div>
                  <Switch checked={true} />
                </div>
                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <h4 className="font-medium">Order Updated</h4>
                    <p className="text-sm text-gray-600">Triggers when order details change</p>
                  </div>
                  <Switch checked={true} />
                </div>
                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <h4 className="font-medium">Customer Created</h4>
                    <p className="text-sm text-gray-600">Triggers when new customer registers</p>
                  </div>
                  <Switch checked={true} />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="webhook-url">Webhook Endpoint URL</Label>
                <Input id="webhook-url" value="https://your-automation.com/webhooks/shopify" />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="automation" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Zap className="h-5 w-5" />
                Automation Settings
              </CardTitle>
              <CardDescription>Configure automated workflows</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <h4 className="font-medium">Auto Order Processing</h4>
                    <p className="text-sm text-gray-600">Automatically process orders when received</p>
                  </div>
                  <Switch checked={autoSync} onCheckedChange={setAutoSync} />
                </div>
                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <h4 className="font-medium">Dietary Filtering</h4>
                    <p className="text-sm text-gray-600">Auto-filter products by customer dietary requirements</p>
                  </div>
                  <Switch checked={true} />
                </div>
                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <h4 className="font-medium">NDIS Validation</h4>
                    <p className="text-sm text-gray-600">Automatically validate NDIS eligibility</p>
                  </div>
                  <Switch checked={true} />
                </div>
                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <h4 className="font-medium">Production Sheet Generation</h4>
                    <p className="text-sm text-gray-600">Auto-generate production sheets</p>
                  </div>
                  <Switch checked={true} />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="mapping" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Field Mapping</CardTitle>
              <CardDescription>Map Shopify fields to your system</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Dietary Requirements Field</Label>
                  <select className="w-full p-2 border rounded-md">
                    <option>customer.tags</option>
                    <option>customer.metafields.dietary</option>
                    <option>order.note_attributes</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <Label>NDIS Number Field</Label>
                  <select className="w-full p-2 border rounded-md">
                    <option>customer.metafields.ndis_number</option>
                    <option>customer.tags</option>
                    <option>order.note_attributes</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <Label>Special Instructions Field</Label>
                  <select className="w-full p-2 border rounded-md">
                    <option>order.note</option>
                    <option>order.note_attributes</option>
                    <option>customer.note</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <Label>Delivery Day Field</Label>
                  <select className="w-full p-2 border rounded-md">
                    <option>order.note_attributes.delivery_day</option>
                    <option>customer.metafields.delivery_day</option>
                    <option>order.tags</option>
                  </select>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
