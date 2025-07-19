import {
  Shield,
  Upload,
  FileText,
  Calendar,
  Hash,
  Search,
  Filter,
  Download,
  Eye,
  AlertTriangle,
  CheckCircle,
  Clock,
  ImageIcon,
  MoreHorizontal,
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

// Mock copyright registrations data
const registrations = [
  {
    id: 1,
    title: "Mystical Forest Concept",
    filename: "forest_concept_final.psd",
    registeredDate: "2024-01-15T10:30:00Z",
    fileSize: "45.2 MB",
    dimensions: "3840 x 2160",
    format: "PSD",
    hash: "sha256:a1b2c3d4e5f6...",
    status: "protected",
    aiDetections: 0,
    takedownRequests: 3,
    metadata: {
      software: "Adobe Photoshop",
      camera: null,
      colorSpace: "sRGB",
      layers: 23,
    },
  },
  {
    id: 2,
    title: "Character Design - Aria",
    filename: "aria_character_sheet.png",
    registeredDate: "2024-01-12T14:22:00Z",
    fileSize: "12.8 MB",
    dimensions: "2480 x 3508",
    format: "PNG",
    hash: "sha256:b2c3d4e5f6g7...",
    status: "protected",
    aiDetections: 2,
    takedownRequests: 1,
    metadata: {
      software: "Clip Studio Paint",
      camera: null,
      colorSpace: "sRGB",
      layers: null,
    },
  },
  {
    id: 3,
    title: "Digital Portrait Study #47",
    filename: "portrait_study_47.jpg",
    registeredDate: "2024-01-10T09:15:00Z",
    fileSize: "8.4 MB",
    dimensions: "2048 x 2048",
    format: "JPEG",
    hash: "sha256:c3d4e5f6g7h8...",
    status: "processing",
    aiDetections: 0,
    takedownRequests: 0,
    metadata: {
      software: "Procreate",
      camera: null,
      colorSpace: "Display P3",
      layers: null,
    },
  },
  {
    id: 4,
    title: "Logo Design - TechStart",
    filename: "techstart_logo_variants.ai",
    registeredDate: "2024-01-08T16:45:00Z",
    fileSize: "2.1 MB",
    dimensions: "1000 x 1000",
    format: "AI",
    hash: "sha256:d4e5f6g7h8i9...",
    status: "protected",
    aiDetections: 1,
    takedownRequests: 0,
    metadata: {
      software: "Adobe Illustrator",
      camera: null,
      colorSpace: "CMYK",
      layers: null,
    },
  },
];

const getStatusColor = (status: string) => {
  switch (status) {
    case "protected":
      return "bg-green-100 text-green-700 border-green-200";
    case "processing":
      return "bg-yellow-100 text-yellow-700 border-yellow-200";
    case "warning":
      return "bg-red-100 text-red-700 border-red-200";
    default:
      return "bg-gray-100 text-gray-700 border-gray-200";
  }
};

const getStatusIcon = (status: string) => {
  switch (status) {
    case "protected":
      return <CheckCircle className="h-4 w-4" />;
    case "processing":
      return <Clock className="h-4 w-4" />;
    case "warning":
      return <AlertTriangle className="h-4 w-4" />;
    default:
      return <FileText className="h-4 w-4" />;
  }
};

const CopyrightPage = () => {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">
            Copyright Registry
          </h1>
          <p className="text-muted-foreground mt-2">
            Register and protect all your creative work with cryptographic proof
            of ownership
          </p>
        </div>
        <Button>
          <Upload className="h-4 w-4 mr-2" />
          Register New Work
        </Button>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <Shield className="h-8 w-8 text-primary" />
              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  Total Registered
                </p>
                <p className="text-xl font-bold text-foreground">
                  {registrations.length}
                </p>
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
                  Protected
                </p>
                <p className="text-xl font-bold text-foreground">
                  {registrations.filter((r) => r.status === "protected").length}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <AlertTriangle className="h-8 w-8 text-red-600" />
              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  AI Detections
                </p>
                <p className="text-xl font-bold text-foreground">
                  {registrations.reduce((sum, r) => sum + r.aiDetections, 0)}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <FileText className="h-8 w-8 text-blue-600" />
              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  Takedown Requests
                </p>
                <p className="text-xl font-bold text-foreground">
                  {registrations.reduce(
                    (sum, r) => sum + r.takedownRequests,
                    0
                  )}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Upload Section */}
      <Card className="border-2 border-dashed border-border hover:border-primary transition-colors">
        <CardContent className="p-8">
          <div className="text-center">
            <Shield className="h-12 w-12 text-primary mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-foreground mb-2">
              Register New Artwork
            </h3>
            <p className="text-muted-foreground mb-4">
              Upload your creative work to establish legal proof of ownership
              and enable AI protection
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Button>
                <Upload className="h-4 w-4 mr-2" />
                Upload Files
              </Button>
              <Button variant="outline">
                <FileText className="h-4 w-4 mr-2" />
                Bulk Register
              </Button>
            </div>
            <p className="text-xs text-muted-foreground mt-3">
              Supported formats: JPG, PNG, PSD, AI, SVG, TIFF • Max size: 100MB
              per file
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Search and Filter */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1">
          <Input
            placeholder="Search by title, filename, or hash..."
            className="w-full"
          />
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <Filter className="h-4 w-4 mr-2" />
            Filter
          </Button>
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
        </div>
      </div>

      {/* Registrations Table */}
      <Card>
        <CardHeader>
          <CardTitle>Registered Works</CardTitle>
          <CardDescription>
            All your creative work with cryptographic proof of ownership
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {registrations.map((item) => (
              <div
                key={item.id}
                className="flex items-center gap-4 p-4 border border-border rounded-lg hover:bg-muted/50 transition-colors"
              >
                {/* Thumbnail */}
                <div className="w-16 h-16 bg-muted rounded-lg flex items-center justify-center flex-shrink-0">
                  <ImageIcon className="h-8 w-8 text-muted-foreground" />
                </div>

                {/* Main Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between">
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-foreground truncate">
                        {item.title}
                      </h3>
                      <p className="text-sm text-muted-foreground truncate">
                        {item.filename}
                      </p>

                      <div className="flex items-center gap-4 mt-2 text-xs text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <Calendar className="h-3 w-3" />
                          {new Date(item.registeredDate).toLocaleDateString()}
                        </span>
                        <span>{item.fileSize}</span>
                        <span>{item.dimensions}</span>
                        <span className="uppercase">{item.format}</span>
                      </div>

                      <div className="flex items-center gap-1 mt-2">
                        <Hash className="h-3 w-3 text-muted-foreground" />
                        <code className="text-xs font-mono text-muted-foreground">
                          {item.hash.substring(0, 20)}...
                        </code>
                      </div>
                    </div>

                    {/* Status and Actions */}
                    <div className="flex items-center gap-3 ml-4">
                      <div className="text-right">
                        <Badge
                          className={`${getStatusColor(item.status)} mb-2`}
                        >
                          {getStatusIcon(item.status)}
                          <span className="ml-1 capitalize">{item.status}</span>
                        </Badge>

                        {item.aiDetections > 0 && (
                          <div className="text-xs text-red-600">
                            {item.aiDetections} AI detection
                            {item.aiDetections !== 1 ? "s" : ""}
                          </div>
                        )}

                        {item.takedownRequests > 0 && (
                          <div className="text-xs text-blue-600">
                            {item.takedownRequests} takedown
                            {item.takedownRequests !== 1 ? "s" : ""}
                          </div>
                        )}
                      </div>

                      <div className="flex gap-1">
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-8 w-8 p-0"
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-8 w-8 p-0"
                        >
                          <Download className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-8 w-8 p-0"
                        >
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CopyrightPage;
