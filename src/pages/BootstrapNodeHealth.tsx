import React, { useEffect, useState } from "react";
import Container from "../components/shared/Container";
import Title from "../components/shared/Title";
import Paragraph from "../components/shared/Paragraph";

type DailyStatus = {
  color: number;
  date: string;
};

type BootstrapNode = {
  name: string;
  email: string;
  website: string;
  address: string;
  status: DailyStatus[];
  overallScore: number;
};

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

const API_URL = "http://127.0.0.1:4622/api/v1/bootstrap";

const BootstrapNodeHealth: React.FC = () => {
  //const nodes: Node[] = bootstrapNodes;
  const [nodes, setNodes] = useState<BootstrapNode[]>([]);
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
      {/* <section className="mt-16 bg-[#0d1117] min-h-screen text-white"> */}
      <Container>
        <div className="text-left max-w-7xl mx-auto mb-6">
          <Title style="font-bold text-gray-800 dark:text-white text-2xl">
            Bootstrap Node Health
          </Title>
          <Paragraph className="text-gray-600 dark:text-gray-300 mt-2">
            Visual representation of bootstrap node health.
          </Paragraph>
        </div>

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
                  {node.status.map((stat, i) => (
                    <div
                      key={i}
                      title={stat.date ? `Date: ${stat.date}` : "No date"}
                      className={`flex-1 h-[36px] rounded-xs ${getStatusColor(
                        stat.color
                      )}`}
                    />
                  ))}
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

export default BootstrapNodeHealth;
