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

  /**
   * Get peer nodes (still using REST)
   * TODO: Migrate to JSON-RPC if needed
   */
  async getPeerNodes(): Promise<PeerNode[]> {
    return this.request<PeerNode[]>(apiConfig.endpoints.peers);
  }

  // ========== PHASE 2 METHODS ==========

  /**
   * Get all JSON-RPC nodes with their status
   */
  async getJSONRPCNodesFull(network?: string): Promise<JSONRPCNodeFull[]> {
    return this.jsonRpcRequest<JSONRPCNodeFull[]>('getJSONRPCNodes', { network });
  }

  /**
   * Get network statistics
   */
  async getNetworkStats(): Promise<NetworkStats> {
    return this.jsonRpcRequest<NetworkStats>('getNetworkStats');
  }

  /**
   * Get nodes formatted for map display
   */
  async getMapNodes(): Promise<MapNode[]> {
    return this.jsonRpcRequest<MapNode[]>('getMapNodes');
  }

  /**
   * Get network snapshots
   */
  async getSnapshots(limit?: number): Promise<Snapshot[]> {
    return this.jsonRpcRequest<Snapshot[]>('getSnapshots', { limit: limit || 10 });
  }

  /**
   * Register a new public node
   */
  async registerNode(request: RegistrationRequest): Promise<RegistrationResponse> {
    return this.jsonRpcRequest<RegistrationResponse>('registerNode', request);
  }

  /**
   * Get registration status
   */
  async getRegistrationStatus(id: number): Promise<NodeRegistration> {
    return this.jsonRpcRequest<NodeRegistration>('getRegistrationStatus', { id });
  }
}

// ========== PHASE 2 INTERFACES ==========

export interface JSONRPCNodeFull {
  id: number;
  name: string;
  address: string;
  network: string;
  email: string;
  website: string;
  country: string;
  city: string;
  latitude: number;
  longitude: number;
  status: DailyStatus[] | null;
  overallScore: number;
}

export interface NetworkStats {
  totalNodes: number;
  reachableNodes: number;
  countriesCount: number;
  avgUptime: number;
  topCountries: Array<{ country: string; countryCode: string; count: number }>;
  grpcNodes: number;
  jsonrpcNodes: number;
  bootstrapNodes: number;
}

export interface MapNode {
  id: number;
  name: string;
  type: 'bootstrap' | 'grpc' | 'jsonrpc' | 'peer';
  coordinates: [number, number];
  status: 'online' | 'offline' | 'unknown';
  country: string;
  city?: string;
}

export interface Snapshot {
  id: number;
  timestamp: string;
  totalNodes: number;
  reachableNodes: number;
  countriesCount: number;
  grpcNodes: number;
  jsonrpcNodes: number;
  bootstrapNodes: number;
}

export interface RegistrationRequest {
  nodeType: 'grpc' | 'jsonrpc';
  name: string;
  address: string;
  network: 'mainnet' | 'testnet';
  email: string;
  website?: string;
}

export interface RegistrationResponse {
  id: number;
  status: string;
  message: string;
}

export interface NodeRegistration {
  id: number;
  nodeType: string;
  name: string;
  address: string;
  network: string;
  email: string;
  website: string;
  status: string;
  rejectionReason?: string;
  createdAt: string;
  reviewedAt?: string;
  reviewedBy?: string;
}

export const apiService = new ApiService();