"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Zap, Settings, Play, CheckCircle, Clock, AlertTriangle, FileText, Webhook } from "lucide-react"

const automationTools = [
  {
    name: "Zapier",
    description: "Connect Shopify to 5000+ apps",
    status: "connected",
    workflows: 3,
    icon: Zap,
    color: "bg-orange-500",
  },
  {
    name: "Make (Integromat)",
    description: "Advanced automation scenarios",
    status: "connected",
    workflows: 2,
    icon: Settings,
    color: "bg-blue-500",
  },
  {
    name: "Shopify Flow",
    description: "Native Shopify automation",
    status: "connected",
    workflows: 4,
    icon: Webhook,
    color: "bg-green-500",
  },
  {
    name: "Google Sheets",
    description: "Automated spreadsheet updates",
    status: "connected",
    workflows: 1,
    icon: FileText,
    color: "bg-emerald-500",
  },
]

const workflows = [
  {
    id: 1,
    name: "Order Processing Workflow",
    description: "Automatically process orders with dietary filtering",
    status: "active",
    trigger: "Order Created",
    actions: ["Filter by dietary requirements", "Generate production sheet", "Send notification"],
    lastRun: "2 minutes ago",
    successRate: 99.8,
  },
  {
    id: 2,
    name: "NDIS Validation Workflow",
    description: "Validate NDIS eligibility and update billing",
    status: "active",
    trigger: "Customer Created/Updated",
    actions: ["Check NDIS status", "Update customer tags", "Set billing method"],
    lastRun: "15 minutes ago",
    successRate: 100,
  },
  {
    id: 3,
    name: "Production Sheet Generator",
    description: "Generate formatted production sheets",
    status: "active",
    trigger: "Order Pull Requested",
    actions: ["Compile orders", "Apply dietary filters", "Format for production", "Email to kitchen"],
    lastRun: "1 hour ago",
    successRate: 99.5,
  },
  {
    id: 4,
    name: "Customer Profile Sync",
    description: "Sync customer dietary preferences",
    status: "paused",
    trigger: "Customer Updated",
    actions: ["Extract dietary info", "Update profile", "Sync with CRM"],
    lastRun: "3 hours ago",
    successRate: 98.2,
  },
]

export default function AutomationTools() {
  const [selectedWorkflow, setSelectedWorkflow] = useState(workflows[0])

  return (
    <div className="space-y-6">
      {/* Connected Tools */}
      <Card>
        <CardHeader>
          <CardTitle>Connected Automation Tools</CardTitle>
          <CardDescription>Third-party integrations powering your automation</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {automationTools.map((tool) => (
              <div key={tool.name} className="border rounded-lg p-4">
                <div className="flex items-center gap-3 mb-3">
                  <div className={`p-2 rounded-lg ${tool.color}`}>
                    <tool.icon className="h-4 w-4 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-sm">{tool.name}</h3>
                    <Badge className="bg-green-600 text-xs">
                      <CheckCircle className="h-3 w-3 mr-1" />
                      Connected
                    </Badge>
                  </div>
                </div>
                <p className="text-xs text-gray-600 mb-2">{tool.description}</p>
                <div className="flex justify-between items-center text-xs">
                  <span className="text-gray-500">{tool.workflows} workflows</span>
                  <Button variant="outline" size="sm">
                    Configure
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Workflow Management */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Workflow List */}
        <div className="lg:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle>Active Workflows</CardTitle>
              <CardDescription>Manage your automation workflows</CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              {workflows.map((workflow) => (
                <div
                  key={workflow.id}
                  className={`p-3 border rounded-lg cursor-pointer transition-colors ${
                    selectedWorkflow.id === workflow.id ? "border-blue-500 bg-blue-50" : "hover:bg-gray-50"
                  }`}
                  onClick={() => setSelectedWorkflow(workflow)}
                >
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-medium text-sm">{workflow.name}</h4>
                    <Badge className={workflow.status === "active" ? "bg-green-600" : "bg-yellow-600"}>
                      {workflow.status}
                    </Badge>
                  </div>
                  <p className="text-xs text-gray-600 mb-2">{workflow.description}</p>
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-gray-500">{workflow.lastRun}</span>
                    <span className="text-green-600">{workflow.successRate}%</span>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Workflow Details */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>{selectedWorkflow.name}</CardTitle>
                  <CardDescription>{selectedWorkflow.description}</CardDescription>
                </div>
                <div className="flex gap-2">
                  <Button size="sm" variant="outline">
                    <Settings className="h-4 w-4 mr-1" />
                    Edit
                  </Button>
                  <Button size="sm">
                    <Play className="h-4 w-4 mr-1" />
                    Run Now
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Workflow Stats */}
              <div className="grid grid-cols-3 gap-4">
                <div className="text-center p-4 bg-green-50 rounded-lg">
                  <div className="text-2xl font-bold text-green-600">{selectedWorkflow.successRate}%</div>
                  <div className="text-sm text-gray-600">Success Rate</div>
                </div>
                <div className="text-center p-4 bg-blue-50 rounded-lg">
                  <div className="text-2xl font-bold text-blue-600">247</div>
                  <div className="text-sm text-gray-600">Total Runs</div>
                </div>
                <div className="text-center p-4 bg-purple-50 rounded-lg">
                  <div className="text-2xl font-bold text-purple-600">{selectedWorkflow.lastRun}</div>
                  <div className="text-sm text-gray-600">Last Run</div>
                </div>
              </div>

              {/* Workflow Steps */}
              <div>
                <h4 className="font-semibold mb-3">Workflow Steps</h4>
                <div className="space-y-3">
                  <div className="flex items-center gap-3 p-3 border rounded-lg">
                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                      <Zap className="h-4 w-4 text-blue-600" />
                    </div>
                    <div>
                      <h5 className="font-medium">Trigger: {selectedWorkflow.trigger}</h5>
                      <p className="text-sm text-gray-600">Initiates the workflow</p>
                    </div>
                  </div>
                  {selectedWorkflow.actions.map((action, index) => (
                    <div key={index} className="flex items-center gap-3 p-3 border rounded-lg">
                      <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                        <CheckCircle className="h-4 w-4 text-green-600" />
                      </div>
                      <div>
                        <h5 className="font-medium">
                          Action {index + 1}: {action}
                        </h5>
                        <p className="text-sm text-gray-600">Automated step</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Recent Runs */}
              <div>
                <h4 className="font-semibold mb-3">Recent Runs</h4>
                <div className="space-y-2">
                  {[
                    { time: "2 minutes ago", status: "success", duration: "1.2s" },
                    { time: "15 minutes ago", status: "success", duration: "0.8s" },
                    { time: "1 hour ago", status: "success", duration: "1.5s" },
                    { time: "2 hours ago", status: "warning", duration: "3.2s" },
                    { time: "3 hours ago", status: "success", duration: "1.1s" },
                  ].map((run, index) => (
                    <div key={index} className="flex items-center justify-between p-2 border rounded">
                      <div className="flex items-center gap-2">
                        {run.status === "success" ? (
                          <CheckCircle className="h-4 w-4 text-green-500" />
                        ) : run.status === "warning" ? (
                          <AlertTriangle className="h-4 w-4 text-yellow-500" />
                        ) : (
                          <Clock className="h-4 w-4 text-gray-500" />
                        )}
                        <span className="text-sm">{run.time}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs text-gray-500">{run.duration}</span>
                        <Badge
                          className={
                            run.status === "success"
                              ? "bg-green-600"
                              : run.status === "warning"
                                ? "bg-yellow-600"
                                : "bg-gray-600"
                          }
                        >
                          {run.status}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
