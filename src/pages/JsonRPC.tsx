import React, { useEffect, useState } from "react";
import Container from "../components/shared/Container";
import Title from "../components/shared/Title";
import Paragraph from "../components/shared/Paragraph";
import { apiService, JsonRPCNode } from "../services/api";
// import NodeInputForm from "../components/shared/NodeInputForm";
const getStatusColor = (code: number): string => {
  switch (code) {
    case 0:
      return "bg-gray-400 dark:bg-gray-500";
    case 1:
    case 2:
      return "bg-green-500";
    default:
      return "bg-gray-400 dark:bg-gray-500";
  }
};

const JsonRPC: React.FC = () => {
  const [nodes, setNodes] = useState<JsonRPCNode[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchNodes = async () => {
      try {
        const data = await apiService.getGRPCNodes();
        setNodes(data.filter((node) => node.network === "mainnet"));
        setLoading(false);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to fetch GRPC nodes");
        setLoading(false);
      }
    };
    fetchNodes();
  }, []);

  if (loading)
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-lg text-white">Loading json rpc nodes...</div>
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
      {/* <section className="mt-16 bg-[#0d1117] min-h-screen text-white"> */}
      <Container>
        <div className="text-left max-w-7xl mx-auto mb-6">
          <Title style="font-bold text-gray-800 dark:text-white text-2xl">
            JSON RPC Health Status
          </Title>
          <Paragraph className="text-gray-600 dark:text-gray-300 mt-2">
            Visual representation of json rpc health status.
          </Paragraph>
        </div>

        {/* <div className="my-6">
          <NodeInputForm
            onSubmit={(data) => {
              console.log(data);
            }}
          />
        </div> */}

        <div className="space-y-1">
          {nodes.map((node, id) => (
            <div
              key={id}
              className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 px-5 py-4 bg-gray-100 dark:bg-gray-800 rounded-md border border-gray-300 dark:border-gray-700"
            >
              {/* LEFT: NODE NAME & STATUS BARS */}
              <div className="flex w-full items-center gap-4">
                {/* FIXED WIDTH FOR NAME */}
                <span className="w-[160px] text-sm text-gray-800 dark:text-gray-300 font-semibold truncate">
                  {node.name}
                </span>

                {/* FLEXIBLE STATUS BAR */}
                <div className="flex flex-1 gap-[1px]">
                  {node.status && node.status.length > 0 ? node.status.map((stat, i) => (
                    <div
                      key={i}
                      title={stat.date ? `Date: ${stat.date}` : "No date"}
                      className={`flex-1 h-[36px] rounded-xs ${getStatusColor(
                        stat.color
                      )}`}
                    />
                  )) : (
                    <div className="flex-1 h-[36px] rounded-xs bg-gray-300 dark:bg-gray-600 flex items-center justify-center">
                      <span className="text-xs text-gray-500">No status data</span>
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
                  <div className="w-3 h-3 rounded-full bg-green-500 shadow-md" />
                  <span className="text-green-600 dark:text-green-500 text-sm font-medium">
                    Up
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
};

export default JsonRPC;
