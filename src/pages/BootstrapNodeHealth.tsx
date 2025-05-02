import React from "react";
import Container from "../components/shared/Container";
import Title from "../components/shared/Title";
import Paragraph from "../components/shared/Paragraph";
import bootstrapNodes from "../data/bootstrap_nodes.json";

interface StatusItem {
  id: number;
  color: number; // 0 = red, 1 = yellow, 2 = green
  date?: string;
}

interface Node {
  name: string;
  status: StatusItem[];
  overallScore: number;
}

const getStatusColor = (code: number): string => {
  switch (code) {
    case 0:
      return "bg-gray-500";
    case 1:
    case 2:
      return "bg-green-500";
    default:
      return "bg-gray-500";
  }
};

const BootstrapNodeHealth: React.FC = () => {
  const nodes: Node[] = bootstrapNodes;

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
          {nodes.map((node, idx) => (
            <div
              key={idx}
              className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 px-5 py-4 bg-gray-800 rounded-md border border-gray-700"
            >
              {/* LEFT: NODE NAME & STATUS BARS */}
              <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 w-full">
                <span className="text-sm text-gray-300 font-semibold truncate max-w-full sm:max-w-[200px]">
                  {node.name}
                </span>
                <div className="flex w-full max-w-full sm:max-w-[1000px] gap-[1px]">
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

              {/* RIGHT: OVERALL SCORE AND STATUS */}
              <div className="flex items-center justify-between sm:justify-end gap-3">
                <span className="text-sm text-gray-300 text-right max-w-full sm:max-w-[150px]">
                  {node.overallScore.toFixed(2)}%
                </span>
                <div className="flex items-center gap-1">
                  <div className="w-3 h-3 rounded-full bg-green-500 shadow-md" />
                  <span className="text-green-500 text-sm font-medium">Up</span>
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
