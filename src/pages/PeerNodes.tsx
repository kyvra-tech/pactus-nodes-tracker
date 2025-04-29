import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import Container from "../components/shared/Container";
import Title from "../components/shared/Title";
import Paragraph from "../components/shared/Paragraph";
import peerNodes from "../data/peer_nodes.json";
import Stats from "../components/sections/Stats";

// CUSTOM MARKER ICON
const nodeIcon = new L.Icon({
  iconUrl: "https://unpkg.com/leaflet@1.9.3/dist/images/marker-icon.png",
  iconSize: [30, 45],
  iconAnchor: [15, 45],
});

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

        <div className="rounded-lg shadow-lg overflow-hidden border border-gray-300 dark:border-gray-700">
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

            {peerNodes.map((node, index) => (
              <Marker
                key={index}
                position={node.coordinates as [number, number]}
                icon={nodeIcon}
              >
                <Popup className="text-sm">
                  <div className="font-semibold text-blue-600">
                    {node.country}
                  </div>
                  <div>Status: {node.status}</div>
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
