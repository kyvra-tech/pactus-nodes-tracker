// src/services/api.ts
import { apiConfig } from '../config/api';

export interface ApiResponse<T> {
  data: T;
  success: boolean;
  message?: string;
}

export interface BootstrapNode {
  name: string;
  email: string;
  website: string;
  address: string;
  status: DailyStatus[] | null;
  overallScore: number;
}

export interface GRPCNode {
  name: string;
  email: string;
  website: string;
  status: DailyStatus[] | null;
  overallScore: number;
  address: string;
  network: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}
export interface JsonRPCNode {
  name: string;
  email: string;
  status: DailyStatus[] | null;
  overallScore: number;
  address: string;
  network: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}


export interface PeerNode {
    name: string;
    country: string;
    city: string;
    coordinates: [number, number];
    online_score: number;
  }

export interface DailyStatus {
  color: number;
  date: string;
}

class ApiService {
  private async request<T>(url: string, options?: RequestInit): Promise<T> {
    try {
      const response = await fetch(url, {
        headers: {
          'Content-Type': 'application/json',
          ...options?.headers,
        },
        ...options,
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error('API request failed:', error);
      throw error;
    }
  }

  // Bootstrap nodes
  async getBootstrapNodes(): Promise<BootstrapNode[]> {
    return this.request<BootstrapNode[]>(apiConfig.endpoints.bootstrap);
  }
  // GRPC nodes
  async getGRPCNodes(): Promise<GRPCNode[]> {
    return this.request<GRPCNode[]>(apiConfig.endpoints.grpc);
  }
  async getPeerNodes(): Promise<PeerNode[]> { //
    return this.request< PeerNode[]>(apiConfig.endpoints.peers);
  }

  // JsonRPC nodes
  async getJsonRPCNodes(): Promise<JsonRPCNode[]> {
    return this.request<JsonRPCNode[]>(apiConfig.endpoints.jsonRpc);
  }

  // Health check
  async getHealth(): Promise<{ status: string; timestamp: string; version: string }> {
    return this.request(apiConfig.endpoints.health);
  }

  // Generic method for custom endpoints
  async get<T>(endpoint: string): Promise<T> {
    const url = `${apiConfig.baseUrl}/api/${apiConfig.version}/${endpoint}`;
    return this.request<T>(url);
  }
}

export const apiService = new ApiService();