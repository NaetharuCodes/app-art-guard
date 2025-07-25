import { AlertTriangle, X } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import type { Artwork } from "@/services/api";

interface ConfirmDeleteModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  artwork: Artwork | null;
  isDeleting?: boolean;
}

export const ConfirmDeleteModal = ({
  isOpen,
  onClose,
  onConfirm,
  artwork,
  isDeleting = false,
}: ConfirmDeleteModalProps) => {
  if (!isOpen || !artwork) return null;

  return (
    <div className="fixed inset-0 modal-backdrop flex items-center justify-center z-50">
      <Card className="w-full max-w-md">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-destructive/10 rounded-full flex items-center justify-center">
                <AlertTriangle className="h-5 w-5 text-destructive" />
              </div>
              <CardTitle className="text-lg">Remove from Portfolio</CardTitle>
            </div>
            <Button variant="ghost" size="sm" onClick={onClose}>
              <X className="h-4 w-4" />
            </Button>
          </div>
        </CardHeader>

        <CardContent className="space-y-4">
          <div className="flex gap-4">
            {/* Thumbnail */}
            <div className="w-16 h-16 bg-muted rounded-lg overflow-hidden flex-shrink-0">
              <img
                src={artwork.image_variants.thumbnail}
                alt={artwork.title}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Details */}
            <div className="flex-1 min-w-0">
              <h3 className="font-semibold text-foreground truncate">
                {artwork.title}
              </h3>
              <p className="text-sm text-muted-foreground">
                {artwork.format} • {artwork.filename}
              </p>
              <p className="text-xs text-muted-foreground mt-1">
                Created {new Date(artwork.created_at).toLocaleDateString()}
              </p>
            </div>
          </div>

          <div className="text-sm text-muted-foreground">
            <p>
              Are you sure you want to remove <strong>"{artwork.title}"</strong>{" "}
              from your portfolio?
            </p>
            <p className="mt-2 text-xs">
              This will only remove it from your portfolio display. The artwork
              will remain in your library.
            </p>
          </div>

          <div className="flex gap-3 pt-2">
            <Button
              variant="outline"
              onClick={onClose}
              className="flex-1"
              disabled={isDeleting}
            >
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={onConfirm}
              className="flex-1"
              disabled={isDeleting}
            >
              {isDeleting ? "Removing..." : "Remove from Portfolio"}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
