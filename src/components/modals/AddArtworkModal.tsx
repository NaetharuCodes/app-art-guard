import { Plus, Upload, X, ImageIcon } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState, useRef } from "react";
import { artworkService, portfolioService, type Artwork } from "@/services/api";

interface AddArtworkModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedPosition: number | null;
  availableArtworks: Artwork[];
  onArtworkAdded: () => void;
  uploadOnly?: boolean;
}

export const AddArtworkModal = ({
  isOpen,
  onClose,
  selectedPosition,
  availableArtworks,
  onArtworkAdded,
  uploadOnly = false,
}: AddArtworkModalProps) => {
  const [modalTab, setModalTab] = useState<"existing" | "upload">(
    uploadOnly ? "upload" : "existing"
  );
  const [isUploading, setIsUploading] = useState(false);
  const [isAdding, setIsAdding] = useState(false);
  const [error, setError] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Upload form state
  const [uploadForm, setUploadForm] = useState({
    title: "",
    description: "",
    software: "",
    tags: "",
    aiProtection: false,
  });

  const handleSelectExistingArtwork = async (artworkId: number) => {
    if (!selectedPosition) return;

    setIsAdding(true);
    try {
      await portfolioService.addToPortfolio(artworkId, selectedPosition);
      onArtworkAdded();
      handleClose();
    } catch (error) {
      console.error("Error adding to portfolio:", error);
      setError("Failed to add artwork to portfolio");
    } finally {
      setIsAdding(false);
    }
  };

  const handleUploadNewArtwork = async (e: React.FormEvent) => {
    e.preventDefault();
    const file = fileInputRef.current?.files?.[0];
    if (!file) {
      setError("Please select a file to upload");
      return;
    }

    setIsUploading(true);
    setError("");

    const formData = new FormData();
    formData.append("file", file);
    formData.append("title", uploadForm.title || file.name);
    formData.append("description", uploadForm.description);
    formData.append("software", uploadForm.software);
    formData.append("tags", uploadForm.tags);
    formData.append("ai_protection", uploadForm.aiProtection.toString());

    try {
      // Upload the artwork
      const uploadResponse = await artworkService.upload(formData);

      if (uploadOnly) {
        // If upload only, just notify of the upload success
        onArtworkAdded();
      } else {
        // If portfolio mode, add it to the portfolio
        if (selectedPosition) {
          await portfolioService.addToPortfolio(
            uploadResponse.artwork.id,
            selectedPosition
          );
        }
        onArtworkAdded();
      }

      handleClose();
    } catch (error) {
      console.error("Error uploading artwork:", error);
      setError(error instanceof Error ? error.message : "Upload failed");
    } finally {
      setIsUploading(false);
    }
  };

  const resetUploadForm = () => {
    setUploadForm({
      title: "",
      description: "",
      software: "",
      tags: "",
      aiProtection: false,
    });
    setError("");
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleClose = () => {
    if (!isUploading && !isAdding) {
      resetUploadForm();
      setModalTab(uploadOnly ? "upload" : "existing");
      onClose();
    }
  };

  const getModalTitle = () => {
    if (uploadOnly) {
      return "Upload New Artwork";
    }
    return `Add Artwork to Position ${selectedPosition}`;
  };

  const getModalDescription = () => {
    if (uploadOnly) {
      return "Upload your artwork to automatically register copyright and enable protection";
    }
    return "Choose an existing artwork or upload a new one";
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Modal */}
      <div className="fixed inset-0 modal-backdrop flex items-center justify-center z-50">
        <Card className="w-full max-w-4xl max-h-[90vh] overflow-hidden">
          <div className="flex items-center justify-between p-6 border-b border-border">
            <div>
              <h2 className="text-xl font-bold text-foreground">
                {getModalTitle()}
              </h2>
              <p className="text-sm text-muted-foreground">
                {getModalDescription()}
              </p>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleClose}
              disabled={isUploading || isAdding}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>

          {/* Tabs - only show if not uploadOnly */}
          {!uploadOnly && (
            <div className="flex border-b border-border">
              <button
                className={`px-6 py-3 text-sm font-medium transition-colors ${
                  modalTab === "existing"
                    ? "border-b-2 border-primary text-primary"
                    : "text-muted-foreground hover:text-foreground"
                }`}
                onClick={() => setModalTab("existing")}
              >
                Choose Existing ({availableArtworks.length})
              </button>
              <button
                className={`px-6 py-3 text-sm font-medium transition-colors ${
                  modalTab === "upload"
                    ? "border-b-2 border-primary text-primary"
                    : "text-muted-foreground hover:text-foreground"
                }`}
                onClick={() => setModalTab("upload")}
              >
                Upload New
              </button>
            </div>
          )}

          <div className="p-6 overflow-y-auto max-h-[60vh]">
            {/* Error message */}
            {error && (
              <div className="p-3 text-sm text-red-600 bg-red-50 border border-red-200 rounded-md mb-4">
                {error}
              </div>
            )}

            {uploadOnly || modalTab === "upload" ? (
              <form onSubmit={handleUploadNewArtwork} className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-foreground mb-2 block">
                    Select File
                  </label>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    required
                    className="w-full px-3 py-2 border border-border rounded-md bg-background text-foreground"
                    disabled={isUploading}
                  />
                </div>

                <div>
                  <label className="text-sm font-medium text-foreground mb-2 block">
                    Title
                  </label>
                  <Input
                    value={uploadForm.title}
                    onChange={(e) =>
                      setUploadForm({ ...uploadForm, title: e.target.value })
                    }
                    placeholder="Leave blank to use filename"
                    disabled={isUploading}
                  />
                </div>

                <div>
                  <label className="text-sm font-medium text-foreground mb-2 block">
                    Description
                  </label>
                  <textarea
                    value={uploadForm.description}
                    onChange={(e) =>
                      setUploadForm({
                        ...uploadForm,
                        description: e.target.value,
                      })
                    }
                    className="w-full min-h-[80px] px-3 py-2 border border-border rounded-md bg-background text-foreground"
                    placeholder="Describe your artwork..."
                    disabled={isUploading}
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-foreground mb-2 block">
                      Software Used
                    </label>
                    <Input
                      value={uploadForm.software}
                      onChange={(e) =>
                        setUploadForm({
                          ...uploadForm,
                          software: e.target.value,
                        })
                      }
                      placeholder="e.g., Photoshop"
                      disabled={isUploading}
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-foreground mb-2 block">
                      Tags
                    </label>
                    <Input
                      value={uploadForm.tags}
                      onChange={(e) =>
                        setUploadForm({ ...uploadForm, tags: e.target.value })
                      }
                      placeholder="e.g., portrait, digital"
                      disabled={isUploading}
                    />
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <input
                    id="aiProtection"
                    type="checkbox"
                    checked={uploadForm.aiProtection}
                    onChange={(e) =>
                      setUploadForm({
                        ...uploadForm,
                        aiProtection: e.target.checked,
                      })
                    }
                    className="h-4 w-4 rounded border border-border text-primary focus:ring-primary"
                    disabled={isUploading}
                  />
                  <label
                    htmlFor="aiProtection"
                    className="text-sm text-foreground"
                  >
                    Enable AI protection
                  </label>
                </div>

                <div className="flex gap-3 pt-4">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={handleClose}
                    className="flex-1"
                    disabled={isUploading}
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    disabled={isUploading}
                    className="flex-1"
                  >
                    {isUploading
                      ? "Uploading..."
                      : uploadOnly
                      ? "Upload Artwork"
                      : "Upload & Add to Portfolio"}
                  </Button>
                </div>
              </form>
            ) : (
              <div>
                {availableArtworks.length === 0 ? (
                  <div className="text-center py-8">
                    <ImageIcon className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                    <h3 className="text-lg font-semibold text-foreground mb-2">
                      No Available Artworks
                    </h3>
                    <p className="text-muted-foreground mb-4">
                      All your artworks are already in your portfolio or you
                      haven't uploaded any yet.
                    </p>
                    <Button onClick={() => setModalTab("upload")}>
                      Upload New Artwork
                    </Button>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {availableArtworks.map((artwork) => (
                      <div
                        key={artwork.id}
                        className="border border-border rounded-lg overflow-hidden hover:border-primary transition-colors cursor-pointer"
                        onClick={() => handleSelectExistingArtwork(artwork.id)}
                      >
                        <div className="aspect-[4/5] bg-muted flex items-center justify-center">
                          <img
                            className="w-full h-full object-cover"
                            src={artwork.image_variants.medium}
                            alt={artwork.title}
                          />
                        </div>
                        <div className="p-3">
                          <h4 className="font-semibold text-foreground truncate">
                            {artwork.title}
                          </h4>
                          <p className="text-sm text-muted-foreground">
                            {artwork.format} •{" "}
                            {new Date(artwork.created_at).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Footer - only show for existing tab when not uploadOnly */}
          {!uploadOnly &&
            modalTab === "existing" &&
            availableArtworks.length > 0 && (
              <div className="p-6 border-t border-border">
                <div className="flex gap-3">
                  <Button
                    variant="outline"
                    onClick={handleClose}
                    className="flex-1"
                    disabled={isAdding}
                  >
                    Cancel
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => setModalTab("upload")}
                    className="flex-1"
                    disabled={isAdding}
                  >
                    Upload New Instead
                  </Button>
                </div>
              </div>
            )}
        </Card>
      </div>

      {/* Loading overlay when adding */}
      {isAdding && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-40">
          <div className="bg-card p-6 rounded-lg border border-border">
            <div className="flex items-center gap-3">
              <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-primary"></div>
              <p className="text-foreground">Adding to portfolio...</p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
