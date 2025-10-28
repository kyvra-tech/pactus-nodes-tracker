// src/services/api.ts
import { apiConfig } from '../config/api';

// ========== INTERFACES ==========

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
}

export interface JsonRPCNode {
  name: string;
  email: string;
  website: string;
  status: DailyStatus[] | null;
  overallScore: number;
  address: string;
  network: string;
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

export interface HealthResponse {
  status: string;
  timestamp: string;
  version: string;
}

export interface CountResponse {
  total: number;
  timestamp: string;
}

export interface SyncResponse {
  message: string;
  total_servers: number;
  timestamp: string;
}

export interface StatusResponse {
  status: string;
  timestamp: string;
}

// ========== JSON-RPC TYPES ==========

interface JSONRPCRequest {
  jsonrpc: string;
  method: string;
  params: unknown; 
  id: number;
}

interface JSONRPCResponse<T> {
  jsonrpc: string;
  result?: T;
  error?: {
    code: number;
    message: string;
    data?: unknown;
  };
  id: number;
}

// ========== API SERVICE CLASS ==========

class ApiService {
  private requestId = 1;

  /**
   * Generic JSON-RPC request method
   */
  private async jsonRpcRequest<T>(method: string, params: unknown = {}): Promise<T> {
    try {
      const request: JSONRPCRequest = {
        jsonrpc: '2.0',
        method,
        params,
        id: this.requestId++,
      };

      const response = await fetch(apiConfig.endpoints.jsonRpc, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(request),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data: JSONRPCResponse<T> = await response.json();

      if (data.error) {
        throw new Error(`JSON-RPC error: ${data.error.message}`);
      }

      if (!data.result) {
        throw new Error('No result in JSON-RPC response');
      }

      return data.result;
    } catch (error) {
      console.error(`JSON-RPC request failed for method "${method}":`, error);
      throw error;
    }
  }
  

  /**
   * Legacy REST request method (for backward compatibility)
   * TODO: Remove once all endpoints are migrated to JSON-RPC
   */
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

  // ========== NODE METHODS (JSON-RPC) ==========

  /**
   * Get all gRPC nodes with their status
   */
  async getGRPCNodes(): Promise<GRPCNode[]> {
    return this.jsonRpcRequest<GRPCNode[]>('getNodes');
  }

  /**
   * Get all JSON-RPC nodes (alias for getGRPCNodes)
   */
  async getJsonRPCNodes(): Promise<JsonRPCNode[]> {
    return this.jsonRpcRequest<JsonRPCNode[]>('getNodes');
  }

  /**
   * Get all bootstrap nodes with their status
   */
  async getBootstrapNodes(): Promise<BootstrapNode[]> {
    return this.jsonRpcRequest<BootstrapNode[]>('getBootstrapNodes');
  }

  /**
   * Check all gRPC nodes health
   */
  async checkAllNodes(): Promise<StatusResponse> {
    return this.jsonRpcRequest<StatusResponse>('checkAllNodes');
  }

  /**
   * Check all bootstrap nodes health
   */
  async checkAllBootstrapNodes(): Promise<StatusResponse> {
    return this.jsonRpcRequest<StatusResponse>('checkAllBootstrapNodes');
  }

  /**
   * Get count of active gRPC nodes
   */
  async getNodeCount(): Promise<CountResponse> {
    return this.jsonRpcRequest<CountResponse>('getNodeCount');
  }

  /**
   * Get count of active bootstrap nodes
   */
  async getBootstrapNodeCount(): Promise<CountResponse> {
    return this.jsonRpcRequest<CountResponse>('getBootstrapNodeCount');
  }

  /**
   * Sync gRPC nodes from source
   */
  async syncNodes(): Promise<SyncResponse> {
    return this.jsonRpcRequest<SyncResponse>('syncNodes');
  }

  /**
   * Sync bootstrap nodes from source
   */
  async syncBootstrapNodes(): Promise<SyncResponse> {
    return this.jsonRpcRequest<SyncResponse>('syncBootstrapNodes');
  }

  /**
   * Get health status
   */
  async getHealth(): Promise<HealthResponse> {
    return this.jsonRpcRequest<HealthResponse>('getHealth');
  }

  // ========== LEGACY METHODS (Keep for peer nodes) ==========

  /**
   * Get peer nodes (still using REST)
   * TODO: Migrate to JSON-RPC if needed
   */
  async getPeerNodes(): Promise<PeerNode[]> {
    return this.request<PeerNode[]>(apiConfig.endpoints.peers);
  }
}

export const apiService = new ApiService();