const API_BASE = "http://localhost:8080";

export interface User {
  id: number;
  username: string;
  email: string;
  created_at: string;
  updated_at: string;
}

export interface Artwork {
  id: number;
  user_id: number;
  title: string;
  description: string;
  filename: string;
  cloudflare_image_id: string;
  file_path: string;
  file_size: number;
  width: number;
  height: number;
  format: string;
  mime_type: string;
  software: string;
  tags: string;
  copyright_registered: boolean;
  ai_protection_enabled: boolean;
  image_url: string;
  image_variants: {
    thumbnail: string;
    medium: string;
    large: string;
    original: string;
  };
  created_at: string;
  updated_at: string;
}

export interface Portfolio {
  id: number;
  user_id: number;
  artwork_id: number;
  portfolio_name: string;
  position: number;
  created_at: string;
  updated_at: string;
  artwork: Artwork;
}

// Auth helper
function getAuthHeaders(): HeadersInit {
  const token = localStorage.getItem("art-guard-token");
  return {
    "Content-Type": "application/json",
    ...(token && { Authorization: `Bearer ${token}` }),
  };
}

// Artwork service
export const artworkService = {
  async getAll(): Promise<{ artworks: Artwork[]; count: number }> {
    const response = await fetch(`${API_BASE}/api/artworks`, {
      headers: getAuthHeaders(),
    });
    if (!response.ok) throw new Error("Failed to fetch artworks");
    return response.json();
  },

  async getById(id: number): Promise<Artwork> {
    const response = await fetch(`${API_BASE}/api/artworks/${id}`, {
      headers: getAuthHeaders(),
    });
    if (!response.ok) throw new Error("Failed to fetch artwork");
    return response.json();
  },

  async upload(
    formData: FormData
  ): Promise<{ message: string; artwork: Artwork }> {
    const token = localStorage.getItem("art-guard-token");
    const response = await fetch(`${API_BASE}/api/artworks/upload`, {
      method: "POST",
      headers: { Authorization: `Bearer ${token}` },
      body: formData,
    });
    if (!response.ok) throw new Error("Upload failed");
    return response.json();
  },

  async update(
    id: number,
    updates: {
      title?: string;
      description?: string;
      software?: string;
      tags?: string;
      ai_protection_enabled?: boolean;
    }
  ): Promise<{ message: string; artwork: Artwork }> {
    const response = await fetch(`${API_BASE}/api/artworks/${id}`, {
      method: "PUT",
      headers: getAuthHeaders(),
      body: JSON.stringify(updates),
    });
    if (!response.ok) throw new Error("Failed to update artwork");
    return response.json();
  },

  async delete(id: number): Promise<{ message: string }> {
    const response = await fetch(`${API_BASE}/api/artworks/${id}`, {
      method: "DELETE",
      headers: getAuthHeaders(),
    });
    if (!response.ok) throw new Error("Failed to delete artwork");
    return response.json();
  },

  getFileUrl(artwork: Artwork, variant: string = "public"): string {
    const deliveryHash = "YOUR_DELIVERY_HASH"; // You might want to get this from config
    return `https://imagedelivery.net/${deliveryHash}/${artwork.cloudflare_image_id}/${variant}`;
  },
};

export const portfolioService = {
  async getPortfolio(portfolioName = "Main Portfolio"): Promise<Portfolio[]> {
    const response = await fetch(
      `${API_BASE}/api/portfolio?name=${portfolioName}`,
      {
        headers: getAuthHeaders(),
      }
    );
    if (!response.ok) throw new Error("Failed to fetch portfolio");
    return response.json();
  },

  async addToPortfolio(
    artworkId: number,
    portfolioName = "Main Portfolio"
  ): Promise<Portfolio> {
    const response = await fetch(`${API_BASE}/api/portfolio`, {
      method: "POST",
      headers: getAuthHeaders(),
      body: JSON.stringify({
        artwork_id: artworkId,
        portfolio_name: portfolioName,
      }),
    });
    if (!response.ok) throw new Error("Failed to add to portfolio");
    return response.json();
  },

  async removeFromPortfolio(portfolioId: number): Promise<{ message: string }> {
    const response = await fetch(`${API_BASE}/api/portfolio/${portfolioId}`, {
      method: "DELETE",
      headers: getAuthHeaders(),
    });
    if (!response.ok) throw new Error("Failed to remove from portfolio");
    return response.json();
  },

  async reorderPortfolio(
    portfolioItems: { id: number; position: number }[]
  ): Promise<void> {
    const response = await fetch(`${API_BASE}/api/portfolio/reorder`, {
      method: "PUT",
      headers: getAuthHeaders(),
      body: JSON.stringify({ items: portfolioItems }),
    });
    if (!response.ok) throw new Error("Failed to reorder portfolio");
  },
};
