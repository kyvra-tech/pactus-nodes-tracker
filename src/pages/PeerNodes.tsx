import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import Container from "../components/shared/Container";
import Title from "../components/shared/Title";
import Paragraph from "../components/shared/Paragraph";
//import peerNodes from "../data/peer_nodes.json";
import Stats from "../components/sections/Stats";

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

const API_URL = "http://127.0.0.1:4622/api/v1/peers";

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

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <section className="mt-16 min-h-screen">
      <Container>
        <div className="max-w-6xl text-left space-y-3 mb-6">
          <Title style="font-bold text-gray-800 dark:text-white text-2xl">
            Global Peer Node Visibility
          </Title>
          <Paragraph className="text-gray-600 dark:text-gray-300">
            Explore real-time geographic distribution and health status of
            active Pactus peer nodes around the world. Each marker represents a
            node's location and operational state.
          </Paragraph>
        </div>

        <div className="mb-6">
          <Stats />
        </div>

        <div className="relative z-0 rounded-lg shadow-lg overflow-hidden border border-gray-300 dark:border-gray-700">
          <MapContainer
            center={[20, 0]}
            zoom={2}
            scrollWheelZoom={true}
            style={{ height: "600px", width: "100%" }}
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
  );
};

export default PeerNodesMap;
