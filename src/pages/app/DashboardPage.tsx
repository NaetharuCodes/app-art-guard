import {
  Image,
  FileText,
  Workflow,
  TrendingUp,
  Users,
  Shield,
  AlertCircle,
  Plus,
  ExternalLink,
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

const DashboardPage = () => {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
        <p className="text-muted-foreground mt-2">
          Welcome back! Here's an overview of your Art Guard account.
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  Portfolio Items
                </p>
                <p className="text-2xl font-bold text-foreground">12</p>
              </div>
              <Image className="h-8 w-8 text-primary" />
            </div>
            <p className="text-xs text-muted-foreground mt-2">
              <span className="text-green-600">+2</span> from last month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  Active Commissions
                </p>
                <p className="text-2xl font-bold text-foreground">5</p>
              </div>
              <Workflow className="h-8 w-8 text-primary" />
            </div>
            <p className="text-xs text-muted-foreground mt-2">
              <span className="text-blue-600">3</span> in progress
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  Copyright Registrations
                </p>
                <p className="text-2xl font-bold text-foreground">28</p>
              </div>
              <FileText className="h-8 w-8 text-primary" />
            </div>
            <p className="text-xs text-muted-foreground mt-2">
              <span className="text-green-600">All protected</span>
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  Monthly Revenue
                </p>
                <p className="text-2xl font-bold text-foreground">$2,340</p>
              </div>
              <TrendingUp className="h-8 w-8 text-primary" />
            </div>
            <p className="text-xs text-muted-foreground mt-2">
              <span className="text-green-600">+12%</span> from last month
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Button variant="outline" className="h-auto p-4 justify-start">
              <div className="flex items-center gap-3">
                <Plus className="h-5 w-5" />
                <div className="text-left">
                  <p className="font-medium">Add Artwork</p>
                  <p className="text-sm text-muted-foreground">
                    Upload new pieces to your portfolio
                  </p>
                </div>
              </div>
            </Button>

            <Button variant="outline" className="h-auto p-4 justify-start">
              <div className="flex items-center gap-3">
                <Shield className="h-5 w-5" />
                <div className="text-left">
                  <p className="font-medium">Register Copyright</p>
                  <p className="text-sm text-muted-foreground">
                    Protect your latest work
                  </p>
                </div>
              </div>
            </Button>

            <Button variant="outline" className="h-auto p-4 justify-start">
              <div className="flex items-center gap-3">
                <Users className="h-5 w-5" />
                <div className="text-left">
                  <p className="font-medium">Share Portfolio</p>
                  <p className="text-sm text-muted-foreground">
                    Generate client access link
                  </p>
                </div>
              </div>
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Two Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Activity */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="bg-green-100 rounded-full p-2">
                  <FileText className="h-4 w-4 text-green-600" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-foreground">
                    Copyright registered
                  </p>
                  <p className="text-xs text-muted-foreground">
                    "Digital Portrait #15" protected • 2 hours ago
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="bg-blue-100 rounded-full p-2">
                  <Workflow className="h-4 w-4 text-blue-600" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-foreground">
                    Commission updated
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Sarah M. approved thumbnails • 4 hours ago
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="bg-purple-100 rounded-full p-2">
                  <Image className="h-4 w-4 text-purple-600" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-foreground">
                    Portfolio updated
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Added 3 new artwork pieces • Yesterday
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="bg-orange-100 rounded-full p-2">
                  <Users className="h-4 w-4 text-orange-600" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-foreground">
                    Portfolio shared
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Generated link for Alex K. • 2 days ago
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* AI Protection Status */}
        <Card>
          <CardHeader>
            <CardTitle>AI Protection Status</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg border border-green-200">
                <div className="flex items-center gap-3">
                  <Shield className="h-5 w-5 text-green-600" />
                  <div>
                    <p className="text-sm font-medium text-green-800">
                      Anti-Scraping Active
                    </p>
                    <p className="text-xs text-green-600">
                      All portfolio images protected
                    </p>
                  </div>
                </div>
                <Badge
                  variant="secondary"
                  className="bg-green-100 text-green-700"
                >
                  Active
                </Badge>
              </div>

              <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg border border-blue-200">
                <div className="flex items-center gap-3">
                  <FileText className="h-5 w-5 text-blue-600" />
                  <div>
                    <p className="text-sm font-medium text-blue-800">
                      Takedown Requests
                    </p>
                    <p className="text-xs text-blue-600">
                      12 submitted this month
                    </p>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-blue-600 hover:text-blue-800"
                >
                  View <ExternalLink className="h-3 w-3 ml-1" />
                </Button>
              </div>

              <div className="flex items-center justify-between p-3 bg-amber-50 rounded-lg border border-amber-200">
                <div className="flex items-center gap-3">
                  <AlertCircle className="h-5 w-5 text-amber-600" />
                  <div>
                    <p className="text-sm font-medium text-amber-800">
                      Poison Data Injection
                    </p>
                    <p className="text-xs text-amber-600">
                      Last updated 3 days ago
                    </p>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-amber-600 hover:text-amber-800"
                >
                  Update
                </Button>
              </div>

              <div className="mt-4 pt-4 border-t border-border">
                <div className="flex items-center justify-between mb-2">
                  <p className="text-sm font-medium text-foreground">
                    Protection Score
                  </p>
                  <Badge variant="secondary">Very Good</Badge>
                </div>
                <Progress value={85} className="mb-2" />
                <p className="text-xs text-muted-foreground">
                  85% • Consider enabling additional protection
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default DashboardPage;
