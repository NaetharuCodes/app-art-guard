import {
  Plus,
  Upload,
  Edit3,
  Trash2,
  Eye,
  Share2,
  ExternalLink,
  ImageIcon,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import {
  artworkService,
  portfolioService,
  type Artwork,
  type Portfolio,
} from "@/services/api";
import { AddArtworkModal } from "@/components/modals/AddArtworkModal";

const PortfolioPage = () => {
  const [portfolioItems, setPortfolioItems] = useState<Portfolio[]>([]);
  const [availableArtworks, setAvailableArtworks] = useState<Artwork[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedPosition, setSelectedPosition] = useState<number | null>(null);

  useEffect(() => {
    fetchPortfolioData();
  }, []);

  const fetchPortfolioData = async () => {
    try {
      const [portfolioData, artworksData] = await Promise.all([
        portfolioService.getPortfolio(),
        artworkService.getAll(),
      ]);
      setPortfolioItems(portfolioData.portfolio);
      setAvailableArtworks(artworksData.artworks);
    } catch (error) {
      console.error("Error fetching portfolio data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddArtworkClick = (position: number) => {
    setSelectedPosition(position);
    setShowAddModal(true);
  };

  const handleModalClose = () => {
    setShowAddModal(false);
    setSelectedPosition(null);
  };

  const handleArtworkAdded = () => {
    fetchPortfolioData(); // Refresh data
  };

  // Filter out artworks already in portfolio
  const portfolioArtworkIds = portfolioItems.map((item) => item.artwork_id);
  const availableForPortfolio = availableArtworks.filter(
    (artwork) => !portfolioArtworkIds.includes(artwork.id)
  );

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="text-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading portfolio...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Portfolio</h1>
          <p className="text-muted-foreground mt-2">
            Curate up to 12 pieces that best showcase your artistic capabilities
          </p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" size="sm">
            <Share2 className="h-4 w-4 mr-2" />
            Share Portfolio
          </Button>
          <Button variant="outline" size="sm">
            <Eye className="h-4 w-4 mr-2" />
            Preview
          </Button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <ImageIcon className="h-8 w-8 text-primary" />
              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  Portfolio Items
                </p>
                <p className="text-xl font-bold text-foreground">
                  {portfolioItems.length}/12
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <Share2 className="h-8 w-8 text-primary" />
              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  Available Artworks
                </p>
                <p className="text-xl font-bold text-foreground">
                  {availableArtworks.length}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <ExternalLink className="h-8 w-8 text-primary" />
              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  Empty Slots
                </p>
                <p className="text-xl font-bold text-foreground">
                  {12 - portfolioItems.length}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Add New Item */}
      <Card className="border-2 border-dashed border-border hover:border-primary transition-colors">
        <CardContent className="p-8">
          <div className="text-center">
            <Upload className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-foreground mb-2">
              Add New Artwork
            </h3>
            <p className="text-muted-foreground mb-4">
              Upload a new piece to showcase your skills and artistic range
            </p>
            <Button
              onClick={() => handleAddArtworkClick(portfolioItems.length + 1)}
            >
              <Plus className="h-4 w-4 mr-2" />
              Upload Artwork
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Portfolio Grid - All 12 positions */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {Array.from({ length: 12 }).map((_, index) => {
          const position = index + 1;
          const portfolioItem = portfolioItems.find(
            (item) => item.position === position
          );

          if (portfolioItem) {
            // Show existing portfolio item
            return (
              <Card
                key={portfolioItem.id}
                className="overflow-hidden group flex flex-col h-full"
              >
                <div className="relative flex-shrink-0">
                  {/* Image */}
                  <div className="aspect-[4/5] bg-muted flex items-center justify-center">
                    <img
                      className="w-full h-full object-cover"
                      src={portfolioItem.artwork.image_variants.medium}
                      alt={portfolioItem.artwork.title}
                    />
                  </div>

                  {/* Hover actions */}
                  <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="flex gap-1">
                      <Button
                        size="sm"
                        variant="secondary"
                        className="h-8 w-8 p-0"
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button
                        size="sm"
                        variant="secondary"
                        className="h-8 w-8 p-0"
                      >
                        <Edit3 className="h-4 w-4" />
                      </Button>
                      <Button
                        size="sm"
                        variant="destructive"
                        className="h-8 w-8 p-0"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>

                <CardContent className="p-4 flex-1 flex flex-col justify-end">
                  <div className="space-y-3">
                    {/* Title and software */}
                    <div>
                      <h3 className="font-semibold text-foreground">
                        {portfolioItem.artwork.title}
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        {portfolioItem.artwork.format} •{" "}
                        {portfolioItem.artwork.software}
                      </p>
                    </div>

                    {/* Description */}
                    {portfolioItem.artwork.description && (
                      <p className="text-sm text-muted-foreground line-clamp-3">
                        {portfolioItem.artwork.description}
                      </p>
                    )}

                    {/* Footer */}
                    <div className="flex items-center justify-between pt-2 text-xs text-muted-foreground">
                      <span>
                        Added{" "}
                        {new Date(
                          portfolioItem.created_at
                        ).toLocaleDateString()}
                      </span>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-auto p-0 text-xs"
                      >
                        View Details
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          } else {
            // Show empty slot
            return (
              <Card
                key={`empty-${position}`}
                className="border-2 border-dashed border-border flex flex-col h-full"
              >
                <CardContent className="p-8 flex-1 flex flex-col justify-center">
                  <div className="text-center">
                    <div className="w-16 h-16 bg-muted rounded-lg flex items-center justify-center mx-auto mb-3">
                      <Plus className="h-8 w-8 text-muted-foreground" />
                    </div>
                    <p className="text-sm text-muted-foreground mb-3">
                      Position {position}
                    </p>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleAddArtworkClick(position)}
                    >
                      Add Artwork
                    </Button>
                  </div>
                </CardContent>
              </Card>
            );
          }
        })}
      </div>

      {/* Add Artwork Modal */}
      <AddArtworkModal
        isOpen={showAddModal}
        onClose={handleModalClose}
        selectedPosition={selectedPosition}
        availableArtworks={availableForPortfolio}
        onArtworkAdded={handleArtworkAdded}
      />
    </div>
  );
};

export default PortfolioPage;
