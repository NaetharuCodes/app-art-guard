import {
  User,
  Bell,
  Shield,
  CreditCard,
  Palette,
  Globe,
  Lock,
  Mail,
  Phone,
  MapPin,
  Camera,
  Save,
  Trash2,
  Eye,
  EyeOff,
  Download,
  Upload,
  Settings as SettingsIcon,
  CheckCircle,
  AlertTriangle,
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
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";

const SettingsPage = () => {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-foreground">Settings</h1>
        <p className="text-muted-foreground mt-2">
          Manage your account, preferences, and Art Guard configuration
        </p>
      </div>

      {/* Two Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Settings Navigation */}
        <div className="space-y-2">
          <Card>
            <CardContent className="p-4">
              <nav className="space-y-1">
                <Button variant="secondary" className="w-full justify-start">
                  <User className="h-4 w-4 mr-2" />
                  Profile
                </Button>
                <Button variant="ghost" className="w-full justify-start">
                  <Shield className="h-4 w-4 mr-2" />
                  Privacy & Security
                </Button>
                <Button variant="ghost" className="w-full justify-start">
                  <Bell className="h-4 w-4 mr-2" />
                  Notifications
                </Button>
                <Button variant="ghost" className="w-full justify-start">
                  <CreditCard className="h-4 w-4 mr-2" />
                  Billing
                </Button>
                <Button variant="ghost" className="w-full justify-start">
                  <Palette className="h-4 w-4 mr-2" />
                  Portfolio Settings
                </Button>
                <Button variant="ghost" className="w-full justify-start">
                  <SettingsIcon className="h-4 w-4 mr-2" />
                  Commission Settings
                </Button>
              </nav>
            </CardContent>
          </Card>
        </div>

        {/* Main Settings Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Profile Settings */}
          <Card>
            <CardHeader>
              <CardTitle>Profile Information</CardTitle>
              <CardDescription>
                Update your personal information and public profile
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Profile Photo */}
              <div className="flex items-center gap-4">
                <div className="w-20 h-20 bg-muted rounded-full flex items-center justify-center">
                  <User className="h-10 w-10 text-muted-foreground" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-foreground">
                    Profile Photo
                  </h3>
                  <p className="text-sm text-muted-foreground mb-2">
                    JPG, PNG or GIF. Max size 2MB.
                  </p>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">
                      <Upload className="h-3 w-3 mr-1" />
                      Upload
                    </Button>
                    <Button variant="ghost" size="sm">
                      <Trash2 className="h-3 w-3 mr-1" />
                      Remove
                    </Button>
                  </div>
                </div>
              </div>

              {/* Basic Information */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-foreground mb-2 block">
                    Display Name
                  </label>
                  <Input
                    placeholder="Your display name"
                    defaultValue="Alex Morgan"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-foreground mb-2 block">
                    Username
                  </label>
                  <Input placeholder="username" defaultValue="alexmorgan" />
                </div>
              </div>

              <div>
                <label className="text-sm font-medium text-foreground mb-2 block">
                  Bio
                </label>
                <textarea
                  className="w-full min-h-[100px] px-3 py-2 border border-border rounded-md bg-background text-foreground"
                  placeholder="Tell people about yourself and your art..."
                  defaultValue="Digital artist specializing in character design and fantasy illustrations. 5+ years of professional experience working with indie game studios."
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-foreground mb-2 block">
                    Email
                  </label>
                  <Input type="email" defaultValue="alex@example.com" />
                </div>
                <div>
                  <label className="text-sm font-medium text-foreground mb-2 block">
                    Location
                  </label>
                  <Input
                    placeholder="City, Country"
                    defaultValue="Portland, OR"
                  />
                </div>
              </div>

              <div className="flex justify-end">
                <Button>
                  <Save className="h-4 w-4 mr-2" />
                  Save Changes
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Privacy & Security */}
          <Card>
            <CardHeader>
              <CardTitle>Privacy & Security</CardTitle>
              <CardDescription>
                Manage your account security and privacy preferences
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Password */}
              <div>
                <h3 className="font-semibold text-foreground mb-4">
                  Password & Authentication
                </h3>
                <div className="space-y-4">
                  <Button variant="outline">
                    <Lock className="h-4 w-4 mr-2" />
                    Change Password
                  </Button>

                  <div className="flex items-center justify-between p-3 border border-border rounded-lg">
                    <div>
                      <p className="font-medium text-foreground">
                        Two-Factor Authentication
                      </p>
                      <p className="text-sm text-muted-foreground">
                        Add an extra layer of security
                      </p>
                    </div>
                    <Switch />
                  </div>
                </div>
              </div>

              {/* Portfolio Privacy */}
              <div>
                <h3 className="font-semibold text-foreground mb-4">
                  Portfolio Privacy
                </h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 border border-border rounded-lg">
                    <div>
                      <p className="font-medium text-foreground">
                        Public Portfolio
                      </p>
                      <p className="text-sm text-muted-foreground">
                        Allow anyone to view your portfolio
                      </p>
                    </div>
                    <Switch />
                  </div>

                  <div className="flex items-center justify-between p-3 border border-border rounded-lg">
                    <div>
                      <p className="font-medium text-foreground">
                        Search Engine Indexing
                      </p>
                      <p className="text-sm text-muted-foreground">
                        Allow search engines to find your work
                      </p>
                    </div>
                    <Switch />
                  </div>

                  <div className="flex items-center justify-between p-3 border border-border rounded-lg">
                    <div>
                      <p className="font-medium text-foreground">
                        Download Protection
                      </p>
                      <p className="text-sm text-muted-foreground">
                        Prevent right-click downloading
                      </p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* AI Protection Settings */}
          <Card>
            <CardHeader>
              <CardTitle>AI Protection</CardTitle>
              <CardDescription>
                Configure how Art Guard protects your work from AI training
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center gap-3 p-4 bg-green-50 border border-green-200 rounded-lg">
                <CheckCircle className="h-5 w-5 text-green-600" />
                <div>
                  <p className="font-medium text-green-800">
                    Protection Active
                  </p>
                  <p className="text-sm text-green-600">
                    Your work is actively protected from AI scraping
                  </p>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between p-3 border border-border rounded-lg">
                  <div>
                    <p className="font-medium text-foreground">
                      Anti-Scraping Protection
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Prevent automated downloading of your images
                    </p>
                  </div>
                  <Switch defaultChecked />
                </div>

                <div className="flex items-center justify-between p-3 border border-border rounded-lg">
                  <div>
                    <p className="font-medium text-foreground">
                      Poison Data Injection
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Inject noise to damage AI training on your work
                    </p>
                  </div>
                  <Switch defaultChecked />
                </div>

                <div className="flex items-center justify-between p-3 border border-border rounded-lg">
                  <div>
                    <p className="font-medium text-foreground">
                      Automatic Takedown Requests
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Automatically submit DMCA takedowns when detected
                    </p>
                  </div>
                  <Switch defaultChecked />
                </div>

                <div className="flex items-center justify-between p-3 border border-border rounded-lg">
                  <div>
                    <p className="font-medium text-foreground">
                      AI Detection Alerts
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Get notified when your work is found in AI datasets
                    </p>
                  </div>
                  <Switch defaultChecked />
                </div>
              </div>

              <div className="pt-4 border-t border-border">
                <Button variant="outline" className="w-full">
                  <Download className="h-4 w-4 mr-2" />
                  Download Protection Report
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Notification Settings */}
          <Card>
            <CardHeader>
              <CardTitle>Notifications</CardTitle>
              <CardDescription>
                Choose what notifications you want to receive
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 border border-border rounded-lg">
                  <div>
                    <p className="font-medium text-foreground">
                      Commission Updates
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Client messages and status changes
                    </p>
                  </div>
                  <Switch defaultChecked />
                </div>

                <div className="flex items-center justify-between p-3 border border-border rounded-lg">
                  <div>
                    <p className="font-medium text-foreground">
                      AI Detection Alerts
                    </p>
                    <p className="text-sm text-muted-foreground">
                      When your work is detected in AI datasets
                    </p>
                  </div>
                  <Switch defaultChecked />
                </div>

                <div className="flex items-center justify-between p-3 border border-border rounded-lg">
                  <div>
                    <p className="font-medium text-foreground">
                      Portfolio Views
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Weekly summary of portfolio activity
                    </p>
                  </div>
                  <Switch />
                </div>

                <div className="flex items-center justify-between p-3 border border-border rounded-lg">
                  <div>
                    <p className="font-medium text-foreground">
                      Marketing Updates
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Product news and feature announcements
                    </p>
                  </div>
                  <Switch />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Danger Zone */}
          <Card className="border-red-200">
            <CardHeader>
              <CardTitle className="text-red-600">Danger Zone</CardTitle>
              <CardDescription>
                Irreversible and destructive actions
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between p-4 border border-red-200 rounded-lg bg-red-50">
                <div>
                  <p className="font-medium text-red-800">Delete Account</p>
                  <p className="text-sm text-red-600">
                    Permanently delete your account and all associated data
                  </p>
                </div>
                <Button variant="destructive" size="sm">
                  <Trash2 className="h-4 w-4 mr-2" />
                  Delete Account
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;
