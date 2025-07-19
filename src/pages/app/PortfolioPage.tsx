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
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

// Mock portfolio data
const portfolioItems = [
  {
    id: 1,
    title: "Digital Portrait Study",
    medium: "Digital Art",
    software: "Procreate",
    description:
      "A character portrait created using pencil brushes in Procreate. This piece demonstrates my ability to capture emotion and personality through facial expressions and lighting.",
    notes:
      "I specialize in realistic portraits with a focus on dramatic lighting. Can work in various styles from photorealistic to stylized illustrations.",
    imageUrl: "/api/placeholder/300/400",
    tags: ["Portrait", "Digital", "Character Design"],
    createdAt: "2 days ago",
  },
  {
    id: 2,
    title: "Fantasy Landscape",
    medium: "Digital Painting",
    software: "Photoshop",
    description:
      "An environment concept piece showing a mystical forest clearing. Created for a fantasy game concept, showcasing atmospheric lighting and detailed foliage work.",
    notes:
      "I excel at creating immersive environments with strong mood and atmosphere. Experience with both realistic and stylized approaches.",
    imageUrl: "/api/placeholder/400/300",
    tags: ["Environment", "Concept Art", "Fantasy"],
    createdAt: "1 week ago",
  },
  {
    id: 3,
    title: "Character Design Sheet",
    medium: "Digital Illustration",
    software: "Clip Studio Paint",
    description:
      "Complete character turnaround and expression sheet for an animated series. Shows my process for developing consistent, appealing character designs.",
    notes:
      "Strong foundation in character design principles, anatomy, and creating designs that work for animation production pipelines.",
    imageUrl: "/api/placeholder/350/450",
    tags: ["Character Design", "Animation", "Reference"],
    createdAt: "2 weeks ago",
  },
];

const PortfolioPage = () => {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Portfolio</h1>
          <p className="text-muted-foreground mt-2">
            Curate up to 10 pieces that best showcase your artistic capabilities
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
                  Portfolio Views
                </p>
                <p className="text-xl font-bold text-foreground">247</p>
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
                  Shared Links
                </p>
                <p className="text-xl font-bold text-foreground">12</p>
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
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Upload Artwork
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Portfolio Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {portfolioItems.map((item) => (
          <Card key={item.id} className="overflow-hidden group">
            <div className="relative">
              {/* Image placeholder */}
              <div className="aspect-[4/5] bg-muted flex items-center justify-center">
                <ImageIcon className="h-16 w-16 text-muted-foreground" />
              </div>

              {/* Hover actions */}
              <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <div className="flex gap-1">
                  <Button size="sm" variant="secondary" className="h-8 w-8 p-0">
                    <Eye className="h-4 w-4" />
                  </Button>
                  <Button size="sm" variant="secondary" className="h-8 w-8 p-0">
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

            <CardContent className="p-4">
              <div className="space-y-3">
                {/* Title and medium */}
                <div>
                  <h3 className="font-semibold text-foreground">
                    {item.title}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {item.medium} • {item.software}
                  </p>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-1">
                  {item.tags.map((tag) => (
                    <Badge key={tag} variant="secondary" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>

                {/* Description */}
                <p className="text-sm text-muted-foreground line-clamp-3">
                  {item.description}
                </p>

                {/* Notes preview */}
                {item.notes && (
                  <div className="pt-2 border-t border-border">
                    <p className="text-xs text-muted-foreground font-medium mb-1">
                      Artist Notes:
                    </p>
                    <p className="text-xs text-muted-foreground line-clamp-2">
                      {item.notes}
                    </p>
                  </div>
                )}

                {/* Footer */}
                <div className="flex items-center justify-between pt-2 text-xs text-muted-foreground">
                  <span>Added {item.createdAt}</span>
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
        ))}
      </div>

      {/* Empty slots */}
      {portfolioItems.length < 10 && (
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {Array.from({ length: 12 - portfolioItems.length }).map(
            (_, index) => (
              <Card
                key={`empty-${index}`}
                className="border-2 border-dashed border-border"
              >
                <CardContent className="p-8">
                  <div className="text-center">
                    <div className="w-16 h-16 bg-muted rounded-lg flex items-center justify-center mx-auto mb-3">
                      <Plus className="h-8 w-8 text-muted-foreground" />
                    </div>
                    <p className="text-sm text-muted-foreground mb-3">
                      Empty slot
                    </p>
                    <Button variant="outline" size="sm">
                      Add Artwork
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )
          )}
        </div>
      )}
    </div>
  );
};

export default PortfolioPage;
