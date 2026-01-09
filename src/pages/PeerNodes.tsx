import React, { useEffect, useState } from "react";

import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import Container from "../components/shared/Container";
import Title from "../components/shared/Title";
import Paragraph from "../components/shared/Paragraph";
import { apiService, NetworkStats, MapNode } from "../services/api";
import { SkeletonLoader } from "../components/shared/SkeletonLoader";

// Custom node icon
const createIcon = (type: string, status: string) => {
  const colors: Record<string, string> = {
    bootstrap: "#8B5CF6",
    grpc: "#10B981",
    jsonrpc: "#3B82F6",
    peer: "#6B7280",
  };
  const color = colors[type] || colors.peer;
  const opacity = status === "online" ? 1 : 0.5;

  return L.divIcon({
    className: "custom-marker",
    html: `
      <div style="
        width: 12px;
        height: 12px;
        background-color: ${color};
        border-radius: 50%;
        border: 2px solid white;
        box-shadow: 0 2px 4px rgba(0,0,0,0.3);
        opacity: ${opacity};
      "></div>
    `,
    iconSize: [12, 12],
    iconAnchor: [6, 6],
  });
};

// Stat Card Component
const StatCard: React.FC<{
  title: string;
  value: string | number;
  icon: string;
}> = ({ title, value, icon }) => (
  <div className="bg-gray-100 dark:bg-gray-800 rounded-md border border-gray-300 dark:border-gray-700 p-4">
    <div className="flex items-center justify-between">
      <div>
        <p className="text-sm text-gray-600 dark:text-gray-400">{title}</p>
        <p className="text-2xl font-bold text-gray-800 dark:text-white">{value}</p>
      </div>
      <span className="text-2xl">{icon}</span>
    </div>
  </div>
);

const PeerNodesPage: React.FC = () => {
  const [stats, setStats] = useState<NetworkStats | null>(null);
  const [mapNodes, setMapNodes] = useState<MapNode[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [theme, setTheme] = useState<"light" | "dark">("light");

  // Theme detection
  useEffect(() => {
    const updateTheme = () => {
      if (document.documentElement.classList.contains("dark")) {
        setTheme("dark");
      } else {
        setTheme("light");
      }
    };

    updateTheme();

    const observer = new MutationObserver(updateTheme);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [statsData, nodesData] = await Promise.all([
          apiService.getNetworkStats(),
          apiService.getMapNodes(),
        ]);
        setStats(statsData);
        setMapNodes(nodesData);
      } catch (err) {
        console.error("Failed to fetch data:", err);
        setError(err instanceof Error ? err.message : "Failed to load data");
        // Set default values on error
        setStats({
          totalNodes: 0,
          reachableNodes: 0,
          countriesCount: 0,
          avgUptime: 0,
          topCountries: [],
          grpcNodes: 0,
          jsonrpcNodes: 0,
          bootstrapNodes: 0,
        });
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const tileLayerUrl =
    theme === "dark"
      ? "https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
      : "https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png";

  return (
    <section className="mt-16 min-h-screen">
      <Container>
        {/* Header */}
        <div className="text-left max-w-7xl mx-auto mb-6">
          <Title style="font-bold text-gray-800 dark:text-white text-2xl">
            Network Nodes Map
          </Title>
          <Paragraph className="text-gray-600 dark:text-gray-300 mt-2">
            Explore real-time geographic distribution of active Pactus nodes
            around the world.
          </Paragraph>
        </div>

        {/* Stats Grid */}
        {loading ? (
          <SkeletonLoader variant="card" count={4} />
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            <StatCard
              title="Total Nodes"
              value={stats?.totalNodes.toLocaleString() || 0}
              icon="🌐"
            />
            <StatCard
              title="Reachable"
              value={stats?.reachableNodes.toLocaleString() || 0}
              icon="✅"
            />
            <StatCard
              title="Countries"
              value={stats?.countriesCount || 0}
              icon="🗺️"
            />
            <StatCard
              title="Avg Uptime"
              value={`${(stats?.avgUptime || 0).toFixed(1)}%`}
              icon="📊"
            />
          </div>
        )}

        {/* Error Message */}
        {error && (
          <div className="mb-6 bg-yellow-100 dark:bg-yellow-900/30 border border-yellow-400 dark:border-yellow-700 rounded-md p-4">
            <p className="text-yellow-700 dark:text-yellow-300 text-sm">
              Note: Some data may be unavailable. {error}
            </p>
          </div>
        )}

        {/* Map */}
        <MapContainer
          center={[20, 0]}
          zoom={2}
          scrollWheelZoom={true}
          style={{ height: "500px", width: "100%" }}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a>'
            url={tileLayerUrl}
          />

          {mapNodes.map((node, index) => {
            // Simple jittering for overlapping nodes
            const overlapCount = mapNodes.filter((n, i) =>
              i < index &&
              n.coordinates[0] === node.coordinates[0] &&
              n.coordinates[1] === node.coordinates[1]
            ).length;

            let position = node.coordinates;
            if (overlapCount > 0) {
              // Spiral out based on overlap count to avoid stacking
              // Approx 0.5 degree offset for visibility at world scale
              // Using golden angle 2.4 radians for nice distribution
              const angle = overlapCount * 2.4;
              const radius = 0.5 + (0.1 * overlapCount);
              position = [
                node.coordinates[0] + Math.sin(angle) * radius,
                node.coordinates[1] + Math.cos(angle) * radius
              ];
            }

            return (
              <Marker
                key={`${node.type}-${node.id}-${index}`}
                position={position}
                icon={createIcon(node.type, node.status)}
                zIndexOffset={node.type === 'bootstrap' ? 100 : node.type === 'grpc' ? 200 : 300} // Bring user nodes to front
              >
                <Popup>
                  <div className="text-sm">
                    <div className="font-semibold text-gray-800">{node.name}</div>
                    <div className="text-gray-600">
                      {node.city ? `${node.city}, ` : ""}{node.country}
                    </div>
                    <div className="mt-1">
                      <span className={`inline-block px-2 py-0.5 text-xs rounded ${node.type === 'bootstrap' ? 'bg-purple-100 text-purple-700' :
                        node.type === 'grpc' ? 'bg-green-100 text-green-700' :
                          node.type === 'jsonrpc' ? 'bg-blue-100 text-blue-700' :
                            'bg-gray-100 text-gray-700'
                        }`}>
                        {node.type.toUpperCase()}
                      </span>
                      <span className={`inline-block ml-1 px-2 py-0.5 text-xs rounded ${node.status === 'online' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                        }`}>
                        {node.status}
                      </span>
                    </div>
                  </div>
                </Popup>
              </Marker>
            );
          })}
        </MapContainer>

        {/* Legend */}
        <div className="mt-4 flex flex-wrap gap-4 justify-center">
          {[
            { type: "bootstrap", label: "Bootstrap", color: "bg-purple-500" },
            { type: "grpc", label: "gRPC", color: "bg-green-500" },
            { type: "jsonrpc", label: "JSON-RPC", color: "bg-blue-500" },
            { type: "peer", label: "Peer", color: "bg-gray-500" },
          ].map((item) => (
            <div key={item.type} className="flex items-center gap-2">
              <div className={`w-3 h-3 rounded-full ${item.color}`} />
              <span className="text-sm text-gray-600 dark:text-gray-400">
                {item.label}
              </span>
            </div>
          ))}
        </div>

        {/* Node Type Summary */}
        <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-gray-100 dark:bg-gray-800 rounded-md border border-gray-300 dark:border-gray-700 p-4 text-center">
            <span className="text-2xl">🔗</span>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">Bootstrap</p>
            <p className="text-xl font-bold text-gray-800 dark:text-white">
              {stats?.bootstrapNodes || 0}
            </p>
          </div>
          <div className="bg-gray-100 dark:bg-gray-800 rounded-md border border-gray-300 dark:border-gray-700 p-4 text-center">
            <span className="text-2xl">⚡</span>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">gRPC</p>
            <p className="text-xl font-bold text-gray-800 dark:text-white">
              {stats?.grpcNodes || 0}
            </p>
          </div>
          <div className="bg-gray-100 dark:bg-gray-800 rounded-md border border-gray-300 dark:border-gray-700 p-4 text-center">
            <span className="text-2xl">🌐</span>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">JSON-RPC</p>
            <p className="text-xl font-bold text-gray-800 dark:text-white">
              {stats?.jsonrpcNodes || 0}
            </p>
          </div>
          <div className="bg-gray-100 dark:bg-gray-800 rounded-md border border-gray-300 dark:border-gray-700 p-4 text-center">
            <span className="text-2xl">👥</span>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">Peers</p>
            <p className="text-xl font-bold text-gray-800 dark:text-white">
              {stats?.reachableNodes || 0}
            </p>
          </div>
        </div>

        {/* Country Distribution */}
        {stats?.topCountries && stats.topCountries.length > 0 && (
          <div className="mt-8">
            <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">
              Country Distribution
            </h3>
            <div className="bg-gray-100 dark:bg-gray-800 rounded-md border border-gray-300 dark:border-gray-700 p-4">
              <div className="space-y-3">
                {stats.topCountries
                  .slice()
                  .sort((a, b) => b.count - a.count)
                  .map((country, _, array) => {
                    const maxCount = array[0]?.count || 1;
                    const barWidth = (country.count / maxCount) * 100;
                    return (
                      <div key={country.countryCode}>
                        <div className="flex justify-between text-sm mb-1">
                          <span className="text-gray-700 dark:text-gray-300">
                            {getFlagEmoji(country.countryCode)} {country.country}
                          </span>
                          <span className="text-gray-600 dark:text-gray-400">
                            {country.count}
                          </span>
                        </div>
                        <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full">
                          <div
                            className="h-2 bg-blue-500 rounded-full transition-all duration-500"
                            style={{ width: `${barWidth}%` }}
                          />
                        </div>
                      </div>
                    );
                  })}
              </div>
            </div>
          </div>
        )}

        {/* CTA */}
        <div className="mt-8 text-center bg-gray-100 dark:bg-gray-800 rounded-md border border-gray-300 dark:border-gray-700 p-6">
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">
            Want to Add Your Node?
          </h3>
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            Register your public gRPC or JSON-RPC node to be listed and monitored.
          </p>
          <a
            href="/register"
            className="inline-block px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Register Your Node
          </a>
        </div>
      </Container>
    </section>
  );
};

// Helper function to convert country code to flag emoji
function getFlagEmoji(countryCode: string): string {
  if (!countryCode || countryCode.length !== 2) return "🌍";
  const codePoints = countryCode
    .toUpperCase()
    .split("")
    .map((char) => 127397 + char.charCodeAt(0));
  return String.fromCodePoint(...codePoints);
}

export default PeerNodesPage;
