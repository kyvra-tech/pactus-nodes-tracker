import React from "react";
import Container from "../components/shared/Container";
import Title from "../components/shared/Title";
import Paragraph from "../components/shared/Paragraph";
import bootstrapNodes from "../data/bootstrap_nodes.json";

interface StatusItem {
  id: number;
  color: number; // 0 = red, 1 = yellow, 2 = green
}

interface Node {
  name: string;
  status: StatusItem[];
  overallScore: number;
}

const getStatusColor = (code: number): string => {
  switch (code) {
    case 0:
      return "bg-red-600";
    case 1:
      return "bg-yellow-400";
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
            Visual representation of node health & daily connectivity status.
          </Paragraph>
        </div>

        <div className="space-y-1">
          {nodes.map((node, idx) => (
            <div
              key={idx}
              className="flex justify-between items-center px-5 py-3 bg-gray-800 rounded-md border border-gray-700"
            >
              {/* LEFT: UPTIME & STATUS BARS */}
              <div className="flex items-center gap-4">
                <span className="text-sm text-green-400 w-[60px] font-semibold">
                  {node.overallScore.toFixed(3)}%
                </span>
                <div className="flex gap-[2px] overflow-hidden">
                  {node.status.map((stat, i) => (
                    <div
                      key={i}
                      className={`w-[4px] h-[16px] rounded-xs ${getStatusColor(
                        stat.color
                      )}`}
                    />
                  ))}
                </div>
              </div>

              {/* RIGHT: NODE NAME AND STATUS */}
              <div className="flex items-center gap-3">
                <span className="text-sm text-gray-300 truncate max-w-[150px]">
                  {node.name}
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
