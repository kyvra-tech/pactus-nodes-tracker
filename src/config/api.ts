// src/config/api.ts
interface ApiConfig {
    baseUrl: string;
    version: string;
    endpoints: {
      bootstrap: string;
      peers: string;
      grpc: string;
      jsonRpc: string;
      health: string;
    };
  }
  
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://127.0.0.1:4622';
  const API_VERSION = import.meta.env.VITE_API_VERSION || 'v1';
  
  export const apiConfig: ApiConfig = {
    baseUrl: API_BASE_URL,
    version: API_VERSION,
    endpoints: {
      bootstrap: `${API_BASE_URL}/api/${API_VERSION}/bootstrap`,
      peers: `${API_BASE_URL}/api/${API_VERSION}/peers`,
      grpc: `${API_BASE_URL}/api/${API_VERSION}/grpc`,
      jsonRpc: `${API_BASE_URL}/api/${API_VERSION}/json-rpc`,
      health: `${API_BASE_URL}/api/${API_VERSION}/health`,
    },
  };
  
  // Helper function for building custom endpoints
  export const buildApiUrl = (endpoint: string): string => {
    return `${API_BASE_URL}/api/${API_VERSION}/${endpoint}`;
  };
  
  // Environment check
  export const isDevelopment = import.meta.env.DEV;
  export const isProduction = import.meta.env.PROD;
  
  // Debug logging in development
  if (isDevelopment) {
    console.log('🔧 API Configuration:', {
      baseUrl: apiConfig.baseUrl,
      version: apiConfig.version,
      endpoints: apiConfig.endpoints,
    });
  }