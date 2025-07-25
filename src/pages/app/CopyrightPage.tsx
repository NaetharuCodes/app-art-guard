import {
  Shield,
  Upload,
  FileText,
  Calendar,
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
import { useEffect, useState } from "react";
import { artworkService, type Artwork } from "@/services/api";
import { AddArtworkModal } from "@/components/modals/AddArtworkModal";

const CopyrightPage = () => {
  const [artworks, setArtworks] = useState<Artwork[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetchArtworks();
  }, []);

  const fetchArtworks = async () => {
    try {
      const data = await artworkService.getAll();
      setArtworks(data.artworks || []);
    } catch (error) {
      console.error("Error fetching artworks:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleArtworkUploaded = () => {
    fetchArtworks(); // Refresh the artworks list
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  };

  const filteredArtworks = artworks.filter(
    (artwork) =>
      artwork.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      artwork.filename.toLowerCase().includes(searchTerm.toLowerCase()) ||
      artwork.tags.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">
            My Artwork Library
          </h1>
          <p className="text-muted-foreground mt-2">
            All your creative work with automatic copyright registration and AI
            protection
          </p>
        </div>
        <Button onClick={() => setShowUploadModal(true)}>
          <Upload className="h-4 w-4 mr-2" />
          Upload New Work
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
                  Total Works
                </p>
                <p className="text-xl font-bold text-foreground">
                  {artworks.length}
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
                  Copyright Protected
                </p>
                <p className="text-xl font-bold text-foreground">
                  {artworks.filter((a) => a.copyright_registered).length}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <AlertTriangle className="h-8 w-8 text-blue-600" />
              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  AI Protection
                </p>
                <p className="text-xl font-bold text-foreground">
                  {artworks.filter((a) => a.ai_protection_enabled).length}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <FileText className="h-8 w-8 text-purple-600" />
              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  Total Size
                </p>
                <p className="text-xl font-bold text-foreground">
                  {formatFileSize(
                    artworks.reduce((sum, a) => sum + a.file_size, 0)
                  )}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Search and Filter */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1">
          <Input
            placeholder="Search by title, filename, or tags..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
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

      {/* Artworks Display */}
      {isLoading ? (
        <div className="text-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">
            Loading your artwork library...
          </p>
        </div>
      ) : filteredArtworks.length === 0 ? (
        <Card className="border-2 border-dashed border-border">
          <CardContent className="p-8">
            <div className="text-center">
              <ImageIcon className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-foreground mb-2">
                {searchTerm ? "No artworks found" : "No artworks yet"}
              </h3>
              <p className="text-muted-foreground mb-4">
                {searchTerm
                  ? "Try adjusting your search terms"
                  : "Upload your first artwork to get started with copyright protection"}
              </p>
              {!searchTerm && (
                <Button onClick={() => setShowUploadModal(true)}>
                  <Upload className="h-4 w-4 mr-2" />
                  Upload Your First Artwork
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      ) : (
        <Card>
          <CardHeader>
            <CardTitle>Your Artwork Library</CardTitle>
            <CardDescription>
              {filteredArtworks.length} artwork
              {filteredArtworks.length !== 1 ? "s" : ""}
              {searchTerm && ` matching "${searchTerm}"`}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {filteredArtworks.map((artwork) => (
                <div
                  key={artwork.id}
                  className="flex items-center gap-4 p-4 border border-border rounded-lg hover:bg-muted/50 transition-colors"
                >
                  {/* Thumbnail */}
                  <div className="w-16 h-16 bg-muted rounded-lg flex items-center justify-center flex-shrink-0 overflow-hidden">
                    <img
                      src={artwork.image_variants.thumbnail}
                      alt={artwork.title}
                    />
                    <ImageIcon
                      className="h-8 w-8 text-muted-foreground fallback-icon"
                      style={{ display: "none" }}
                    />
                  </div>

                  {/* Main Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between">
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-foreground truncate">
                          {artwork.title}
                        </h3>
                        <p className="text-sm text-muted-foreground truncate">
                          {artwork.filename}
                        </p>

                        <div className="flex items-center gap-4 mt-2 text-xs text-muted-foreground">
                          <span className="flex items-center gap-1">
                            <Calendar className="h-3 w-3" />
                            {new Date(artwork.created_at).toLocaleDateString()}
                          </span>
                          <span>{formatFileSize(artwork.file_size)}</span>
                          <span>
                            {artwork.width} × {artwork.height}
                          </span>
                          <span className="uppercase">{artwork.format}</span>
                        </div>

                        {artwork.description && (
                          <p className="text-xs text-muted-foreground mt-1 truncate">
                            {artwork.description}
                          </p>
                        )}

                        {artwork.software && (
                          <p className="text-xs text-muted-foreground">
                            Created with {artwork.software}
                          </p>
                        )}
                      </div>

                      {/* Status and Actions */}
                      <div className="flex items-center gap-3 ml-4">
                        <div className="text-right">
                          <Badge
                            className={
                              artwork.copyright_registered
                                ? "bg-green-100 text-green-700 border-green-200"
                                : "bg-yellow-100 text-yellow-700 border-yellow-200"
                            }
                          >
                            {artwork.copyright_registered ? (
                              <CheckCircle className="h-4 w-4" />
                            ) : (
                              <Clock className="h-4 w-4" />
                            )}
                            <span className="ml-1">
                              {artwork.copyright_registered
                                ? "Protected"
                                : "Processing"}
                            </span>
                          </Badge>

                          {artwork.ai_protection_enabled && (
                            <div className="text-xs text-blue-600 mt-1">
                              AI Protection ON
                            </div>
                          )}
                        </div>

                        <div className="flex gap-1">
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-8 w-8 p-0"
                            onClick={() =>
                              window.open(
                                artworkService.getFileUrl(artwork),
                                "_blank"
                              )
                            }
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
      )}

      {/* Upload Modal */}
      <AddArtworkModal
        isOpen={showUploadModal}
        onClose={() => setShowUploadModal(false)}
        selectedPosition={null}
        availableArtworks={[]}
        onArtworkAdded={handleArtworkUploaded}
        uploadOnly={true}
      />
    </div>
  );
};

export default CopyrightPage;
