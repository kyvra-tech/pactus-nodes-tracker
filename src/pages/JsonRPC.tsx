import React, { useEffect, useState } from "react";
import Container from "../components/shared/Container";
import Title from "../components/shared/Title";
import Paragraph from "../components/shared/Paragraph";
import { apiService, JsonRPCNode } from "../services/api";
import { SkeletonLoader } from "../components/shared/SkeletonLoader";

const getStatusColor = (code: number): string => {
  switch (code) {
    case 0:
      return "bg-red-500"; // Failed
    case 1:
    case 2:
      return "bg-green-500"; // Healthy
    default:
      return "bg-gray-400 dark:bg-gray-500"; // No data
  }
};

// Helper function to generate last 30 days
const getLast30Days = (): string[] => {
  const days: string[] = [];
  const today = new Date();
  
  for (let i = 29; i >= 0; i--) {
    const date = new Date(today);
    date.setDate(date.getDate() - i);
    const dateStr = date.toISOString().split('T')[0];
    days.push(dateStr);
  }
  
  return days;
};

// Helper function to map status data to 30-day array
const mapStatusToLast30Days = (status: Array<{ date: string; color: number }>) => {
  const last30Days = getLast30Days();
  const statusMap = new Map(status.map(s => [s.date, s.color]));
  
  return last30Days.map(date => ({
    date,
    color: statusMap.get(date) ?? -1, // -1 means no data
  }));
};

const JsonRPC: React.FC = () => {
  const [nodes, setNodes] = useState<JsonRPCNode[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchNodes = async () => {
      try {
        const data = await apiService.getGRPCNodes();
        const nodesWithStatus = data.map((node) => ({
          ...node,
          status: mapStatusToLast30Days(node.status || []),
        }));
        setNodes(nodesWithStatus.filter((node) => node.network === "mainnet"));
      } catch (err) {
        const errorMsg = err instanceof Error ? err.message : "Failed to fetch GRPC nodes";
        setError(errorMsg);
      } finally {
        setLoading(false);
      }
    };
    fetchNodes();
  }, []);

  if (error)
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-gray-600 dark:text-gray-400">{error}</div>
      </div>
    );
  return (
    <section className="mt-16 min-h-screen">
      <Container>
        <div className="text-left max-w-7xl mx-auto mb-6">
          <Title style="font-bold text-gray-800 dark:text-white text-2xl">
            JSON RPC Health Status
          </Title>
          <Paragraph className="text-gray-600 dark:text-gray-300 mt-2">
            Visual representation of JSON-RPC health status.
          </Paragraph>
        </div>

        {loading ? (
          <SkeletonLoader variant="status-bar" count={5} />
        ) : error ? (
          <div className="flex justify-center items-center py-12">
            <div className="text-center">
              <div className="text-red-500 text-lg font-semibold mb-2">Error loading nodes</div>
              <p className="text-gray-600 dark:text-gray-400">{error}</p>
              <button
                onClick={() => window.location.reload()}
                className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                Retry
              </button>
            </div>
          </div>
        ) : (
        <div className="space-y-1">
          {nodes.map((node, id) => (
            <div
              key={id}
              className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 px-5 py-4 bg-gray-100 dark:bg-gray-800 rounded-md border border-gray-300 dark:border-gray-700"
            >
              {/* LEFT: NODE NAME & STATUS BARS */}
              <div className="flex w-full items-center gap-4">
                <span className="w-[160px] text-sm text-gray-800 dark:text-gray-300 font-semibold truncate">
                  {node.name}
                </span>

                {/* FLEXIBLE STATUS BAR - Always 30 indicators */}
                <div className="flex flex-1 gap-[1px]">
                  {node.status?.map((stat: { color: number; date: string; }, i: number) => {
                    const statusText =
                      stat.color === 1 || stat.color === 2
                        ? "Healthy"
                        : stat.color === 0
                        ? "Failed"
                        : "No data";
                    return (
                      <div
                        key={i}
                        className={`group relative flex-1 h-[36px] rounded-xs ${getStatusColor(
                          stat.color
                        )} cursor-pointer transition-transform hover:scale-105`}
                      >
                        <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-2 bg-gray-900 dark:bg-gray-700 text-white text-xs rounded-md shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 whitespace-nowrap z-10 pointer-events-none">
                          <div className="font-semibold">{stat.date}</div>
                          <div className="text-gray-300">{statusText}</div>
                          <div className="absolute top-full left-1/2 -translate-x-1/2 -mt-px">
                            <div className="border-4 border-transparent border-t-gray-900 dark:border-t-gray-700"></div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
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
                      node.status?.some((s: { color: number; }) => s.color >= 0)
                        ? "bg-green-500"
                        : "bg-gray-400"
                    }`}
                  />
                  <span
                    className={`text-sm font-medium ${
                      node.status?.some((s: { color: number; }) => s.color >= 0)
                        ? "text-green-600 dark:text-green-500"
                        : "text-gray-500 dark:text-gray-400"
                    }`}
                  >
                    {node.status?.some((s: { color: number; }) => s.color >= 0) ? "Up" : "Pending"}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
         )}
      </Container>
    </section>
  );
};

export default JsonRPC;