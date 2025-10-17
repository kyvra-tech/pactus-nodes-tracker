import React, { useEffect, useState } from "react";
import Container from "../components/shared/Container";
import Title from "../components/shared/Title";
import Paragraph from "../components/shared/Paragraph";
import { apiService, BootstrapNode } from "../services/api";

const getStatusColor = (code: number): string => {
  switch (code) {
    case 0:
      return "bg-red-500"; // Failed/unhealthy
    case 1:
    case 2:
      return "bg-green-500"; // Healthy
    default:
      return "bg-gray-400 dark:bg-gray-500";
  }
};

const BootstrapNodeHealth: React.FC = () => {
  const [nodes, setNodes] = useState<BootstrapNode[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchNodes = async () => {
      try {
        const data = await apiService.getBootstrapNodes();

        // Handle null status arrays
        const nodesWithStatus = data.map((node) => ({
          ...node,
          status: node.status || [],
        }));
        setNodes(nodesWithStatus);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Failed to fetch bootstrap nodes"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchNodes();
  }, []);

  if (loading)
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-lg">Loading bootstrap nodes...</div>
      </div>
    );

  if (error)
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-red-500">Error: {error}</div>
      </div>
    );

  return (
    <section className="mt-16 min-h-screen">
      <Container>
        <div className="text-left max-w-7xl mx-auto mb-6">
          <Title style="font-bold text-gray-800 dark:text-white text-2xl">
            Bootstrap Node Health
          </Title>
          <Paragraph className="text-gray-600 dark:text-gray-300 mt-2">
            Visual representation of bootstrap node health. Health checks run
            daily.
          </Paragraph>
        </div>

        <div className="space-y-1">
          {nodes.length > 0 ? (
            nodes.map((node, id) => (
              <div
                key={id}
                className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 px-5 py-4 bg-gray-100 dark:bg-gray-800 rounded-md border border-gray-300 dark:border-gray-700"
              >
                {/* LEFT: NODE NAME & STATUS BARS */}
                <div className="flex w-full items-center gap-4">
                  {/* FIXED WIDTH FOR NAME */}
                  <span className="w-[160px] text-sm text-gray-800 dark:text-gray-300 font-semibold truncate">
                    {node.name} <br />
                    <span className="text-gray-500 dark:text-gray-400 text-xs">
                      {node.email}
                    </span>
                  </span>

                  {/* FLEXIBLE STATUS BAR */}
                  <div className="flex flex-1 gap-[1px]">
                    {node.status && node.status.length > 0 ? (
                      node.status.map((stat, i) => {
                        const statusText =
                          stat.color === 1 || stat.color === 2
                            ? "Healthy"
                            : stat.color === 0
                            ? "Failed"
                            : "Unknown";
                        return (
                          <div
                            key={i}
                            className={`group relative flex-1 h-[36px] rounded-xs ${getStatusColor(
                              stat.color
                            )} cursor-pointer transition-transform hover:scale-105`}
                          >
                            {/* Custom Tooltip */}
                            <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-2 bg-gray-900 dark:bg-gray-700 text-white text-xs rounded-md shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 whitespace-nowrap z-10 pointer-events-none">
                              <div className="font-semibold">
                                {stat.date || "No date"}
                              </div>
                              <div className="text-gray-300">{statusText}</div>
                              {/* Arrow */}
                              <div className="absolute top-full left-1/2 -translate-x-1/2 -mt-px">
                                <div className="border-4 border-transparent border-t-gray-900 dark:border-t-gray-700"></div>
                              </div>
                            </div>
                          </div>
                        );
                      })
                    ) : (
                      // Show placeholder when no status data
                      <div className="flex-1 h-[36px] rounded-xs bg-gray-300 dark:bg-gray-600 flex items-center justify-center">
                        <span className="text-xs text-gray-500">
                          No health data yet - checks run daily
                        </span>
                      </div>
                    )}
                  </div>
                </div>

                {/* RIGHT: SCORE AND STATUS */}
                <div className="flex items-center justify-end gap-3 w-full sm:w-auto mt-2 sm:mt-0">
                  <span className="text-sm text-gray-800 dark:text-gray-300 text-right w-[60px]">
                    {node.overallScore.toFixed(2)}%
                  </span>
                  <div className="flex items-center gap-1">
                    <div
                      className={`w-3 h-3 rounded-full shadow-md ${
                        node.status && node.status.length > 0
                          ? "bg-green-500"
                          : "bg-gray-400"
                      }`}
                    />
                    <span
                      className={`text-sm font-medium ${
                        node.status && node.status.length > 0
                          ? "text-green-600 dark:text-green-500"
                          : "text-gray-500 dark:text-gray-400"
                      }`}
                    >
                      {node.status && node.status.length > 0
                        ? "Monitored"
                        : "Pending"}
                    </span>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="flex justify-center items-center min-h-screen">
              <div className="text-gray-500">No bootstrap nodes found</div>
            </div>
          )}
        </div>
      </Container>
    </section>
  );
};
export default BootstrapNodeHealth;
