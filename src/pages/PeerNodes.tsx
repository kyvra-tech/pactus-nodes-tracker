import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import Container from "../components/shared/Container";
import { SkeletonLoader } from "../components/shared/SkeletonLoader";
import Stats from "../components/sections/Stats";
import { apiConfig } from "../config/api";

type PeerNode = {
  name: string;
  country: string;
  city: string;
  coordinates: [number, number];
  online_score: number;
};

// CUSTOM MARKER ICON
const nodeIcon = new L.Icon({
  iconUrl: "https://unpkg.com/leaflet@1.9.3/dist/images/marker-icon.png",
  iconSize: [30, 45],
  iconAnchor: [15, 45],
});

const API_URL = apiConfig.endpoints.peers;

const PeerNodesMap: React.FC = () => {
  // START CHANGE THEME ON LOAD
  const [theme, setTheme] = useState<"light" | "dark">("light");

  useEffect(() => {
    const updateTheme = () => {
      if (document.documentElement.classList.contains("dark")) {
        setTheme("dark");
      } else {
        setTheme("light");
      }
    };

    updateTheme(); // SET INITIAL THEME

    const observer = new MutationObserver(updateTheme);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    return () => {
      observer.disconnect();
    };
  }, []);
  // END CHANGE THEME ON LOAD

  const tileLayerUrl =
    theme === "dark"
      ? "https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
      : "https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png";

  const [nodes, setNodes] = useState<PeerNode[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  useEffect(() => {
    fetch(API_URL)
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch bootstrap nodes");
        return res.json();
      })
      .then((data) => {
        console.log("API response:", data); // Add this line
        // If data is { data: [...] }, use setNodes(data.data)
        // If data is [...], use setNodes(data)
        setNodes(Array.isArray(data) ? data : data.data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading) return <SkeletonLoader variant="map" />;
  if (error) return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="text-center">
        <p className="text-gray-600 dark:text-gray-400">{error}</p>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-800 dark:to-gray-900 py-16">
        <Container>
          <div className="max-w-4xl mx-auto text-center space-y-6">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white">
              Global Peer Node Visibility
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Explore real-time geographic distribution and health status of
              active Pactus peer nodes around the world. Each marker represents a
              node's location and operational state.
            </p>
          </div>
        </Container>
      </section>

      {/* Stats Section */}
      <section className="py-12 bg-white dark:bg-gray-800">
        <Container>
          <Stats />
        </Container>
      </section>

      {/* Map Section */}
      <section className="py-12 bg-gray-50 dark:bg-gray-900">
        <Container>
          <div className="relative z-0 rounded-2xl shadow-2xl overflow-hidden border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
            <MapContainer
              center={[20, 0]}
              zoom={2}
              scrollWheelZoom={true}
              style={{ height: "600px", width: "100%" }}
              className="rounded-2xl"
            >
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a>'
                url={tileLayerUrl}
              />

              {nodes.map((node, index) => (
                <Marker
                  key={index}
                  position={node.coordinates as [number, number]}
                  icon={nodeIcon}
                >
                  <Popup className="text-sm">
                    <div className="text-gray-800 font-semibold">
                      {"Node Name: "}
                      <span className="text-gray-500font-semibold text-blue-600">
                        {node.name}
                      </span>
                    </div>
                    <div className="text-gray-800 font-semibold">
                      {"Country: "}
                      <span className="text-gray-500font-semibold text-blue-600">
                        {node.city ? node.city : "Unknown City"}
                        {", "}
                        {node.country}
                      </span>
                    </div>
                    <div className="text-gray-800 font-semibold">
                      {"Online Score: "}
                      <span
                        style={{
                          color:
                            node.online_score > 80
                              ? "green"
                              : node.online_score >= 50
                              ? "orange"
                              : "red",
                        }}
                      >
                        {node.online_score.toFixed(2)} %
                      </span>
                    </div>
                  </Popup>
                </Marker>
              ))}
            </MapContainer>
          </div>
        </Container>
      </section>
    </div>
  );
};

export default PeerNodesMap;
