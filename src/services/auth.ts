// src/services/auth.ts

const API_BASE_URL = "http://localhost:8080";

export interface User {
  id: number;
  username: string;
  email: string;
  created_at: string;
  updated_at: string;
}

export interface RegisterRequest {
  username: string;
  email: string;
  password: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface AuthResponse {
  message: string;
  token: string;
  user: User;
}

export interface RegisterResponse {
  message: string;
  user: User;
}

// Token management
const TOKEN_KEY = "art-guard-token";
const USER_KEY = "art-guard-user";

export const tokenStorage = {
  get: (): string | null => localStorage.getItem(TOKEN_KEY),
  set: (token: string): void => localStorage.setItem(TOKEN_KEY, token),
  remove: (): void => localStorage.removeItem(TOKEN_KEY),
};

export const userStorage = {
  get: (): User | null => {
    const user = localStorage.getItem(USER_KEY);
    return user ? JSON.parse(user) : null;
  },
  set: (user: User): void =>
    localStorage.setItem(USER_KEY, JSON.stringify(user)),
  remove: (): void => localStorage.removeItem(USER_KEY),
};

// API call helper
async function apiCall<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  const token = tokenStorage.get();

  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    headers: {
      "Content-Type": "application/json",
      ...(token && { Authorization: `Bearer ${token}` }),
      ...options.headers,
    },
    ...options,
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error || `HTTP error! status: ${response.status}`);
  }

  return data;
}

// Auth API functions
export const authService = {
  async register(
    username: string,
    email: string,
    password: string
  ): Promise<RegisterResponse> {
    const response = await apiCall<RegisterResponse>("/auth/register", {
      method: "POST",
      body: JSON.stringify({ username, email, password }),
    });

    // Note: Register doesn't return a token in your current API
    // User will need to log in after registering
    return response;
  },

  async login(email: string, password: string): Promise<AuthResponse> {
    const response = await apiCall<AuthResponse>("/auth/login", {
      method: "POST",
      body: JSON.stringify({ email, password }),
    });

    // Store token and user data
    tokenStorage.set(response.token);
    userStorage.set(response.user);

    return response;
  },

  logout(): void {
    tokenStorage.remove();
    userStorage.remove();
  },

  getCurrentUser(): User | null {
    return userStorage.get();
  },

  getToken(): string | null {
    return tokenStorage.get();
  },

  isAuthenticated(): boolean {
    const token = tokenStorage.get();
    if (!token) return false;

    try {
      // Basic JWT expiration check
      const payload = JSON.parse(atob(token.split(".")[1]));
      const isExpired = payload.exp * 1000 < Date.now();

      if (isExpired) {
        this.logout();
        return false;
      }

      return true;
    } catch {
      // Invalid token format
      this.logout();
      return false;
    }
  },

  // Test protected endpoint (optional - for testing)
  async getProfile(): Promise<any> {
    return apiCall("/api/profile");
  },
};
