import {
  X,
  ChevronLeft,
  ChevronRight,
  Download,
  Share2,
  Info,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useState, useEffect } from "react";
import type { Artwork } from "@/services/api";

interface FullScreenArtworkModalProps {
  isOpen: boolean;
  onClose: () => void;
  artwork: Artwork | null;
  allArtworks?: Artwork[];
  currentIndex?: number;
  onNavigate?: (direction: "prev" | "next") => void;
}

export const FullScreenArtworkModal = ({
  isOpen,
  onClose,
  artwork,
  allArtworks = [],
  currentIndex = 0,
  onNavigate,
}: FullScreenArtworkModalProps) => {
  const [showInfo, setShowInfo] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  // Reset state when modal opens/closes
  useEffect(() => {
    if (isOpen) {
      setImageLoaded(false);
      setShowInfo(false);
      // Prevent body scroll
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  // Handle keyboard navigation
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      switch (e.key) {
        case "Escape":
          onClose();
          break;
        case "ArrowLeft":
          if (onNavigate && currentIndex > 0) {
            onNavigate("prev");
          }
          break;
        case "ArrowRight":
          if (onNavigate && currentIndex < allArtworks.length - 1) {
            onNavigate("next");
          }
          break;
        case "i":
        case "I":
          setShowInfo(!showInfo);
          break;
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose, onNavigate, currentIndex, allArtworks.length, showInfo]);

  if (!isOpen || !artwork) return null;

  const canNavigatePrev = onNavigate && currentIndex > 0;
  const canNavigateNext = onNavigate && currentIndex < allArtworks.length - 1;

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  };

  return (
    <div className="fixed inset-0 modal-backdrop-fullscreen z-50 flex items-center justify-center">
      {/* Background overlay - close on click */}
      <div className="absolute inset-0" onClick={onClose} />

      {/* Navigation arrows */}
      {canNavigatePrev && (
        <Button
          variant="secondary"
          size="sm"
          className="absolute left-4 top-1/2 transform -translate-y-1/2 z-10 opacity-70 hover:opacity-100"
          onClick={() => onNavigate?.("prev")}
        >
          <ChevronLeft className="h-6 w-6" />
        </Button>
      )}

      {canNavigateNext && (
        <Button
          variant="secondary"
          size="sm"
          className="absolute right-4 top-1/2 transform -translate-y-1/2 z-10 opacity-70 hover:opacity-100"
          onClick={() => onNavigate?.("next")}
        >
          <ChevronRight className="h-6 w-6" />
        </Button>
      )}

      {/* Top controls */}
      <div className="absolute top-4 left-4 right-4 flex items-center justify-between z-10">
        <div className="flex items-center gap-2">
          {allArtworks.length > 1 && (
            <Badge variant="secondary" className="text-white bg-black/50">
              {currentIndex + 1} of {allArtworks.length}
            </Badge>
          )}
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="secondary"
            size="sm"
            className="opacity-70 hover:opacity-100"
            onClick={() => setShowInfo(!showInfo)}
          >
            <Info className="h-4 w-4" />
          </Button>
          <Button
            variant="secondary"
            size="sm"
            className="opacity-70 hover:opacity-100"
          >
            <Share2 className="h-4 w-4" />
          </Button>
          <Button
            variant="secondary"
            size="sm"
            className="opacity-70 hover:opacity-100"
          >
            <Download className="h-4 w-4" />
          </Button>
          <Button
            variant="secondary"
            size="sm"
            className="opacity-70 hover:opacity-100"
            onClick={onClose}
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Main image container */}
      <div className="relative flex items-center justify-center w-full h-full p-16">
        {!imageLoaded && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
          </div>
        )}

        <img
          src={artwork.image_variants.large || artwork.image_url}
          alt={artwork.title}
          className={`max-w-full max-h-full object-contain transition-opacity duration-300 ${
            imageLoaded ? "opacity-100" : "opacity-0"
          }`}
          onLoad={() => setImageLoaded(true)}
          onError={() => setImageLoaded(true)}
        />
      </div>

      {/* Info panel */}
      {showInfo && (
        <div className="absolute bottom-0 left-0 right-0 bg-black/90 text-white p-6 transform transition-transform duration-300">
          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h2 className="text-2xl font-bold mb-2">{artwork.title}</h2>
                {artwork.description && (
                  <p className="text-gray-300 mb-4">{artwork.description}</p>
                )}

                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-gray-400">Format:</span>
                    <span className="ml-2">{artwork.format}</span>
                  </div>
                  {artwork.software && (
                    <div>
                      <span className="text-gray-400">Software:</span>
                      <span className="ml-2">{artwork.software}</span>
                    </div>
                  )}
                  <div>
                    <span className="text-gray-400">Size:</span>
                    <span className="ml-2">
                      {formatFileSize(artwork.file_size)}
                    </span>
                  </div>
                  <div>
                    <span className="text-gray-400">Dimensions:</span>
                    <span className="ml-2">
                      {artwork.width} × {artwork.height}
                    </span>
                  </div>
                </div>
              </div>

              <div>
                <div className="flex flex-wrap gap-2 mb-4">
                  {artwork.copyright_registered && (
                    <Badge className="bg-green-600">Copyright Protected</Badge>
                  )}
                  {artwork.ai_protection_enabled && (
                    <Badge className="bg-blue-600">AI Protection</Badge>
                  )}
                </div>

                <div className="text-sm text-gray-400">
                  <div className="mb-1">
                    Created: {new Date(artwork.created_at).toLocaleDateString()}
                  </div>
                  <div>Filename: {artwork.filename}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Keyboard shortcuts hint */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-white/50 text-xs text-center">
        <div>Press 'I' for info • Arrow keys to navigate • Esc to close</div>
      </div>
    </div>
  );
};
