"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, AlertTriangle, Zap, FileText, Download, Play } from "lucide-react"

export default function AutomationDashboard() {
  return (
    <div className="space-y-6">
      {/* Before vs After */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="border-red-200 bg-red-50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-red-700">
              <AlertTriangle className="h-5 w-5" />
              Current Manual Process
            </CardTitle>
            <CardDescription>Time-consuming and error-prone workflow</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                <span className="text-sm">Export orders from Shopify</span>
                <Badge variant="secondary" className="ml-auto">
                  30 min
                </Badge>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                <span className="text-sm">Manually check dietary requirements</span>
                <Badge variant="secondary" className="ml-auto">
                  90 min
                </Badge>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                <span className="text-sm">Sort and filter products</span>
                <Badge variant="secondary" className="ml-auto">
                  60 min
                </Badge>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                <span className="text-sm">Format for production</span>
                <Badge variant="secondary" className="ml-auto">
                  45 min
                </Badge>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                <span className="text-sm">Double-check for errors</span>
                <Badge variant="secondary" className="ml-auto">
                  30 min
                </Badge>
              </div>
            </div>
            <div className="pt-4 border-t">
              <div className="flex justify-between items-center">
                <span className="font-semibold">Total Time:</span>
                <Badge variant="destructive">4+ hours</Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-green-200 bg-green-50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-green-700">
              <Zap className="h-5 w-5" />
              Automated Process
            </CardTitle>
            <CardDescription>One-click order pull generation</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="text-sm">Auto-sync orders with dietary tags</span>
                <Badge variant="secondary" className="ml-auto">
                  Real-time
                </Badge>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="text-sm">Filter by customer preferences</span>
                <Badge variant="secondary" className="ml-auto">
                  Instant
                </Badge>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="text-sm">Generate production sheets</span>
                <Badge variant="secondary" className="ml-auto">
                  30 sec
                </Badge>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="text-sm">Quality assurance checks</span>
                <Badge variant="secondary" className="ml-auto">
                  30 sec
                </Badge>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="text-sm">Export ready-to-use files</span>
                <Badge variant="secondary" className="ml-auto">
                  30 sec
                </Badge>
              </div>
            </div>
            <div className="pt-4 border-t">
              <div className="flex justify-between items-center">
                <span className="font-semibold">Total Time:</span>
                <Badge className="bg-green-600">2 minutes</Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Automation Workflow */}
      <Card>
        <CardHeader>
          <CardTitle>Automation Workflow</CardTitle>
          <CardDescription>How the system eliminates manual work</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            <div className="text-center">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-2">
                <FileText className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="font-semibold text-sm">Order Placed</h3>
              <p className="text-xs text-gray-600">Shopify captures dietary preferences</p>
            </div>
            <div className="flex items-center justify-center">
              <ArrowRight className="h-4 w-4 text-gray-400" />
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-2">
                <Zap className="h-6 w-6 text-purple-600" />
              </div>
              <h3 className="font-semibold text-sm">Auto Processing</h3>
              <p className="text-xs text-gray-600">System filters by dietary tags</p>
            </div>
            <div className="flex items-center justify-center">
              <ArrowRight className="h-4 w-4 text-gray-400" />
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-2">
                <Download className="h-6 w-6 text-green-600" />
              </div>
              <h3 className="font-semibold text-sm">Production Ready</h3>
              <p className="text-xs text-gray-600">Formatted sheets generated</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Demo Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Try the Demo</CardTitle>
          <CardDescription>Experience the one-click order pull workflow</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Button className="h-20 flex flex-col gap-2" size="lg">
              <Play className="h-6 w-6" />
              <span>Simulate Order Pull</span>
              <span className="text-xs opacity-75">Generate production sheets</span>
            </Button>
            <Button variant="outline" className="h-20 flex flex-col gap-2" size="lg">
              <FileText className="h-6 w-6" />
              <span>View Sample Output</span>
              <span className="text-xs opacity-75">See formatted results</span>
            </Button>
            <Button variant="outline" className="h-20 flex flex-col gap-2" size="lg">
              <Download className="h-6 w-6" />
              <span>Download Templates</span>
              <span className="text-xs opacity-75">Get automation templates</span>
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* ROI Calculator */}
      <Card>
        <CardHeader>
          <CardTitle>Return on Investment</CardTitle>
          <CardDescription>Calculate your time and cost savings</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-red-600 mb-2">240 hrs</div>
              <p className="text-sm text-gray-600">Manual work per month</p>
              <p className="text-xs text-gray-500">(4 hrs × 60 orders)</p>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-green-600 mb-2">2 hrs</div>
              <p className="text-sm text-gray-600">Automated work per month</p>
              <p className="text-xs text-gray-500">(2 min × 60 orders)</p>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600 mb-2">238 hrs</div>
              <p className="text-sm text-gray-600">Time saved per month</p>
              <p className="text-xs text-gray-500">99.2% reduction</p>
            </div>
          </div>
          <div className="mt-6 p-4 bg-blue-50 rounded-lg">
            <div className="flex justify-between items-center">
              <span className="font-semibold">Monthly Cost Savings:</span>
              <span className="text-2xl font-bold text-blue-600">$5,950</span>
            </div>
            <p className="text-sm text-gray-600 mt-1">Based on $25/hour labor cost</p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
