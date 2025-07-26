import {
  Workflow,
  Settings,
  DollarSign,
  Eye,
  FileText,
  Palette,
  CheckCircle,
  Edit3,
  Send,
  ArrowRight,
  ArrowDown,
  Clock,
  User,
  Image,
  Download,
  CogIcon,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Link, Navigate } from "react-router-dom";
import { cn } from "@/lib/utils";

// Mock pricing data
const pricingTiers = [
  {
    id: 1,
    name: "Character Portrait",
    basePrice: 150,
    description: "Single character, bust or full body",
    turnaround: "5-7 days",
    revisions: 2,
  },
  {
    id: 2,
    name: "Character Design",
    basePrice: 300,
    description: "Complete character sheet with turnarounds",
    turnaround: "10-14 days",
    revisions: 3,
  },
  {
    id: 3,
    name: "Environment Art",
    basePrice: 400,
    description: "Detailed landscape or interior scene",
    turnaround: "14-21 days",
    revisions: 2,
  },
];

// Mock active commissions
const activeCommissions = [
  {
    id: 1,
    clientName: "Sarah Martinez",
    projectTitle: "Fantasy Character Design",
    currentStep: 4,
    totalSteps: 8,
    status: "waiting_approval",
    price: 300,
    deadline: "2024-02-15",
    lastUpdate: "2 hours ago",
  },
  {
    id: 2,
    clientName: "Alex Chen",
    projectTitle: "Logo Design",
    currentStep: 6,
    totalSteps: 8,
    status: "in_progress",
    price: 250,
    deadline: "2024-02-20",
    lastUpdate: "1 day ago",
  },
];

const commissionSteps = [
  {
    id: 1,
    title: "Portfolio Access",
    icon: Eye,
    description: "Client views your work",
  },
  {
    id: 2,
    title: "Request Submitted",
    icon: FileText,
    description: "Client submits commission request",
  },
  {
    id: 3,
    title: "Concept & Pricing",
    icon: DollarSign,
    description: "Agree on concept and final price",
  },
  {
    id: 4,
    title: "Create Thumbnails",
    icon: Palette,
    description: "Create initial design concepts",
  },
  {
    id: 5,
    title: "Thumbnail Approval",
    icon: CheckCircle,
    description: "Client reviews and approves direction",
  },
  {
    id: 6,
    title: "Create Draft",
    icon: Edit3,
    description: "Develop the chosen concept",
  },
  {
    id: 7,
    title: "Draft Approval",
    icon: CheckCircle,
    description: "Client reviews and approves draft",
  },
  {
    id: 8,
    title: "Final Delivery",
    icon: Send,
    description: "Complete and deliver final artwork",
  },
];

const getStatusColor = (status: string) => {
  switch (status) {
    case "waiting_approval":
      return "bg-yellow-100 text-yellow-700 border-yellow-200";
    case "in_progress":
      return "bg-blue-100 text-blue-700 border-blue-200";
    case "completed":
      return "bg-green-100 text-green-700 border-green-200";
    default:
      return "bg-gray-100 text-gray-700 border-gray-200";
  }
};

const CommissionFlowPage = () => {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">
            Commission Flow
          </h1>
          <p className="text-muted-foreground mt-2">
            Manage your commission process and pricing to ensure smooth client
            relationships
          </p>
        </div>
        <Link
          to="/app/commission-flow-builder"
          className={cn(
            "group items-center px-2 py-2 text-sm font-medium rounded-md bg-primary text-secondary flex gap-2"
          )}
        >
          <CogIcon />
          Configure Flow
        </Link>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <Workflow className="h-8 w-8 text-primary" />
              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  Active Commissions
                </p>
                <p className="text-xl font-bold text-foreground">
                  {activeCommissions.length}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <DollarSign className="h-8 w-8 text-green-600" />
              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  Monthly Revenue
                </p>
                <p className="text-xl font-bold text-foreground">$2,340</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <Clock className="h-8 w-8 text-blue-600" />
              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  Avg. Turnaround
                </p>
                <p className="text-xl font-bold text-foreground">12 days</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <CheckCircle className="h-8 w-8 text-green-600" />
              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  Completed
                </p>
                <p className="text-xl font-bold text-foreground">47</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Commission Process Timeline */}
      <Card>
        <CardHeader>
          <CardTitle>Your Commission Process</CardTitle>
          <CardDescription>
            The standardized 8-step process that ensures professional results
            and happy clients
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="relative">
            {/* Timeline container */}
            <div className="space-y-0">
              {commissionSteps.map((step, index) => (
                <div key={step.id}>
                  <div className="relative flex items-start gap-4 py-4">
                    {/* Timeline node */}
                    <div className="relative flex-shrink-0">
                      <div className="w-12 h-12 bg-primary/10 border-2 border-primary/20 rounded-full flex items-center justify-center">
                        <step.icon className="h-5 w-5 text-primary" />
                      </div>
                      <Badge
                        variant="secondary"
                        className="absolute -top-1 -right-1 text-xs w-5 h-5 p-0 flex items-center justify-center"
                      >
                        {step.id}
                      </Badge>
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <h3 className="font-semibold text-foreground">
                            {step.title}
                          </h3>
                          <p className="text-sm text-muted-foreground mt-1">
                            {step.description}
                          </p>

                          {/* Additional step details */}
                          <div className="mt-3 text-xs text-muted-foreground">
                            {step.id === 1 &&
                              "Setup: Configure portfolio access settings"}
                            {step.id === 2 &&
                              "Client action: Submit detailed project requirements"}
                            {step.id === 3 &&
                              "Negotiation: Finalize scope, timeline, and budget"}
                            {step.id === 4 &&
                              "Creation: 2-3 thumbnail concepts (2-3 days)"}
                            {step.id === 5 &&
                              "Review: Client selects preferred direction"}
                            {step.id === 6 &&
                              "Development: Create detailed draft (5-7 days)"}
                            {step.id === 7 &&
                              "Approval: Final review and sign-off"}
                            {step.id === 8 &&
                              "Delivery: High-res files and usage rights"}
                          </div>
                        </div>

                        {/* Step status indicator */}
                        <div className="ml-4">
                          {step.id <= 3 ? (
                            <Badge className="bg-green-100 text-green-700 border-green-200">
                              <CheckCircle className="h-3 w-3 mr-1" />
                              Setup
                            </Badge>
                          ) : step.id <= 5 ? (
                            <Badge className="bg-blue-100 text-blue-700 border-blue-200">
                              <Palette className="h-3 w-3 mr-1" />
                              Concept
                            </Badge>
                          ) : step.id <= 7 ? (
                            <Badge className="bg-purple-100 text-purple-700 border-purple-200">
                              <Edit3 className="h-3 w-3 mr-1" />
                              Creation
                            </Badge>
                          ) : (
                            <Badge className="bg-orange-100 text-orange-700 border-orange-200">
                              <Send className="h-3 w-3 mr-1" />
                              Delivery
                            </Badge>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Arrow between circles on the left */}
                  {index < commissionSteps.length - 1 && (
                    <div className="flex">
                      <div className="w-12 flex justify-center">
                        <ArrowDown className="h-4 w-4 text-muted-foreground" />
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Two Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Pricing Configuration */}
        <Card>
          <CardHeader>
            <CardTitle>Pricing Tiers</CardTitle>
            <CardDescription>
              Configure your standard pricing for different types of work
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {pricingTiers.map((tier) => (
                <div
                  key={tier.id}
                  className="flex items-center justify-between p-4 border border-border rounded-lg"
                >
                  <div className="flex-1">
                    <h3 className="font-semibold text-foreground">
                      {tier.name}
                    </h3>
                    <p className="text-sm text-muted-foreground mb-2">
                      {tier.description}
                    </p>
                    <div className="flex gap-4 text-xs text-muted-foreground">
                      <span>⏱ {tier.turnaround}</span>
                      <span>🔄 {tier.revisions} revisions</span>
                    </div>
                  </div>
                  <div className="text-right ml-4">
                    <p className="text-xl font-bold text-foreground">
                      ${tier.basePrice}
                    </p>
                    <Button variant="ghost" size="sm" className="mt-1">
                      <Edit3 className="h-3 w-3 mr-1" />
                      Edit
                    </Button>
                  </div>
                </div>
              ))}
              <Button variant="outline" className="w-full">
                Add Pricing Tier
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Active Commissions */}
        <Card>
          <CardHeader>
            <CardTitle>Active Commissions</CardTitle>
            <CardDescription>
              Track progress on your current client projects
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {activeCommissions.map((commission) => (
                <div
                  key={commission.id}
                  className="p-4 border border-border rounded-lg"
                >
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3 className="font-semibold text-foreground">
                        {commission.projectTitle}
                      </h3>
                      <p className="text-sm text-muted-foreground flex items-center gap-1">
                        <User className="h-3 w-3" />
                        {commission.clientName}
                      </p>
                    </div>
                    <Badge className={getStatusColor(commission.status)}>
                      {commission.status.replace("_", " ")}
                    </Badge>
                  </div>

                  <div className="space-y-2 mb-3">
                    <div className="flex justify-between text-sm">
                      <span>Progress</span>
                      <span>
                        {commission.currentStep}/{commission.totalSteps} steps
                      </span>
                    </div>
                    <Progress
                      value={
                        (commission.currentStep / commission.totalSteps) * 100
                      }
                    />
                  </div>

                  <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <span>${commission.price}</span>
                    <span>
                      Due {new Date(commission.deadline).toLocaleDateString()}
                    </span>
                    <span>Updated {commission.lastUpdate}</span>
                  </div>

                  <div className="flex gap-2 mt-3">
                    <Button variant="outline" size="sm" className="flex-1">
                      <Eye className="h-3 w-3 mr-1" />
                      View
                    </Button>
                    <Button variant="outline" size="sm" className="flex-1">
                      <Edit3 className="h-3 w-3 mr-1" />
                      Update
                    </Button>
                  </div>
                </div>
              ))}
              <Button variant="outline" className="w-full">
                View All Commissions
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Process Configuration */}
      <Card>
        <CardHeader>
          <CardTitle>Process Settings</CardTitle>
          <CardDescription>
            Customize your commission workflow and client communication
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 border border-border rounded-lg">
              <div className="flex items-center gap-3 mb-3">
                <Eye className="h-5 w-5 text-primary" />
                <h3 className="font-semibold text-foreground">
                  Portfolio Access
                </h3>
              </div>
              <p className="text-sm text-muted-foreground mb-3">
                Control how clients view your work
              </p>
              <div className="space-y-2">
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full justify-start"
                >
                  Private (Generate Links)
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  className="w-full justify-start"
                >
                  Public Portfolio
                </Button>
              </div>
            </div>

            <div className="p-4 border border-border rounded-lg">
              <div className="flex items-center gap-3 mb-3">
                <FileText className="h-5 w-5 text-primary" />
                <h3 className="font-semibold text-foreground">
                  Contract Templates
                </h3>
              </div>
              <p className="text-sm text-muted-foreground mb-3">
                Standardize your agreements
              </p>
              <Button variant="outline" size="sm" className="w-full">
                <Download className="h-3 w-3 mr-1" />
                Manage Templates
              </Button>
            </div>

            <div className="p-4 border border-border rounded-lg">
              <div className="flex items-center gap-3 mb-3">
                <Clock className="h-5 w-5 text-primary" />
                <h3 className="font-semibold text-foreground">
                  Timeline Settings
                </h3>
              </div>
              <p className="text-sm text-muted-foreground mb-3">
                Set default turnaround times
              </p>
              <Button variant="outline" size="sm" className="w-full">
                <Settings className="h-3 w-3 mr-1" />
                Configure
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CommissionFlowPage;
