import React, { useEffect, useRef } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

interface MapNode {
    id: number;
    name: string;
    type: "bootstrap" | "grpc" | "jsonrpc" | "peer";
    coordinates: [number, number];
    status: "online" | "offline" | "unknown";
    country: string;
    city?: string;
}

interface WorldMapProps {
    nodes: MapNode[];
    onNodeClick?: (node: MapNode) => void;
    theme?: "light" | "dark";
    height?: string;
}

const NODE_COLORS = {
    bootstrap: "#8B5CF6", // Purple
    grpc: "#10B981", // Green
    jsonrpc: "#3B82F6", // Blue
    peer: "#6B7280", // Gray
};

const createIcon = (type: string, status: string) => {
    const color = NODE_COLORS[type as keyof typeof NODE_COLORS] || NODE_COLORS.peer;
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

export const WorldMap: React.FC<WorldMapProps> = ({
    nodes,
    onNodeClick,
    theme = "dark",
    height = "500px",
}) => {
    const mapRef = useRef<L.Map | null>(null);
    const mapContainerRef = useRef<HTMLDivElement>(null);
    const markersRef = useRef<L.LayerGroup | null>(null);

    useEffect(() => {
        if (!mapContainerRef.current || mapRef.current) return;

        // Initialize map
        mapRef.current = L.map(mapContainerRef.current, {
            center: [20, 0],
            zoom: 2,
            scrollWheelZoom: true,
        });

        // Add tile layer
        const tileUrl =
            theme === "dark"
                ? "https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
                : "https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png";

        L.tileLayer(tileUrl, {
            attribution:
                '&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a>',
        }).addTo(mapRef.current);

        // Create markers layer group
        markersRef.current = L.layerGroup().addTo(mapRef.current);

        return () => {
            if (mapRef.current) {
                mapRef.current.remove();
                mapRef.current = null;
            }
        };
    }, [theme]);

    useEffect(() => {
        if (!markersRef.current || !mapRef.current) return;

        // Clear existing markers
        markersRef.current.clearLayers();

        // Add new markers
        nodes.forEach((node) => {
            if (
                node.coordinates &&
                node.coordinates[0] !== 0 &&
                node.coordinates[1] !== 0
            ) {
                const marker = L.marker(node.coordinates, {
                    icon: createIcon(node.type, node.status),
                });

                marker.bindPopup(`
          <div style="padding: 4px; min-width: 120px;">
            <div style="font-weight: 600; color: #1f2937; margin-bottom: 4px;">${node.name}</div>
            <div style="font-size: 12px; color: #6b7280; margin-bottom: 4px;">
              ${node.city ? `${node.city}, ` : ""}${node.country}
            </div>
            <div style="display: flex; gap: 4px;">
              <span style="
                padding: 2px 6px;
                font-size: 10px;
                border-radius: 4px;
                background-color: ${node.type === "bootstrap" ? "#f3e8ff" : node.type === "grpc" ? "#d1fae5" : node.type === "jsonrpc" ? "#dbeafe" : "#f3f4f6"};
                color: ${node.type === "bootstrap" ? "#7c3aed" : node.type === "grpc" ? "#059669" : node.type === "jsonrpc" ? "#2563eb" : "#4b5563"};
              ">
                ${node.type.toUpperCase()}
              </span>
              <span style="
                padding: 2px 6px;
                font-size: 10px;
                border-radius: 4px;
                background-color: ${node.status === "online" ? "#d1fae5" : "#fee2e2"};
                color: ${node.status === "online" ? "#059669" : "#dc2626"};
              ">
                ${node.status}
              </span>
            </div>
          </div>
        `);

                if (onNodeClick) {
                    marker.on("click", () => onNodeClick(node));
                }

                marker.addTo(markersRef.current!);
            }
        });
    }, [nodes, onNodeClick]);

    return (
        <div className="relative rounded-md shadow-lg overflow-hidden border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800">
            <div
                ref={mapContainerRef}
                style={{ height, width: "100%" }}
                className="rounded-md"
            />

            {/* Legend */}
            <div className="absolute bottom-3 left-3 bg-white dark:bg-gray-800 p-3 rounded-md shadow-md z-[1000] border border-gray-200 dark:border-gray-700">
                <h4 className="text-xs font-semibold mb-2 text-gray-700 dark:text-gray-300">
                    Legend
                </h4>
                <div className="space-y-1">
                    {[
                        { type: "bootstrap", label: "Bootstrap", color: NODE_COLORS.bootstrap },
                        { type: "grpc", label: "gRPC", color: NODE_COLORS.grpc },
                        { type: "jsonrpc", label: "JSON-RPC", color: NODE_COLORS.jsonrpc },
                        { type: "peer", label: "Peer", color: NODE_COLORS.peer },
                    ].map((item) => (
                        <div key={item.type} className="flex items-center gap-2">
                            <div
                                className="w-2 h-2 rounded-full"
                                style={{ backgroundColor: item.color }}
                            />
                            <span className="text-xs text-gray-600 dark:text-gray-400">
                                {item.label}
                            </span>
                        </div>
                    ))}
                </div>
            </div>

            {/* Node count */}
            <div className="absolute top-3 right-3 bg-white dark:bg-gray-800 px-3 py-1 rounded-md shadow-md z-[1000] border border-gray-200 dark:border-gray-700">
                <span className="text-xs text-gray-600 dark:text-gray-400">Nodes: </span>
                <span className="text-xs font-semibold text-gray-800 dark:text-white">
                    {nodes.length}
                </span>
            </div>
        </div>
    );
};

export default WorldMap;
