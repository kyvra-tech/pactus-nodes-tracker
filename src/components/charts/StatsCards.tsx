import React from "react";

interface StatCardProps {
    title: string;
    value: number | string;
    icon: React.ReactNode;
}

const StatCard: React.FC<StatCardProps> = ({ title, value, icon }) => (
    <div className="bg-gray-100 dark:bg-gray-800 rounded-md border border-gray-300 dark:border-gray-700 p-4">
        <div className="flex items-center justify-between">
            <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">{title}</p>
                <p className="text-2xl font-bold text-gray-800 dark:text-white">
                    {value}
                </p>
            </div>
            <div className="text-2xl">{icon}</div>
        </div>
    </div>
);

interface StatsCardsProps {
    stats: {
        totalNodes: number;
        reachableNodes: number;
        countriesCount: number;
        avgUptime: number;
        grpcNodes: number;
        jsonrpcNodes: number;
        bootstrapNodes: number;
    };
    loading?: boolean;
}

export const StatsCards: React.FC<StatsCardsProps> = ({ stats, loading }) => {
    if (loading) {
        return (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {[1, 2, 3, 4].map((i) => (
                    <div
                        key={i}
                        className="animate-pulse bg-gray-200 dark:bg-gray-700 rounded-md h-24"
                    />
                ))}
            </div>
        );
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <StatCard
                title="Total Nodes"
                value={stats.totalNodes.toLocaleString()}
                icon={<span>🌐</span>}
            />
            <StatCard
                title="Reachable"
                value={stats.reachableNodes.toLocaleString()}
                icon={<span>✅</span>}
            />
            <StatCard
                title="Countries"
                value={stats.countriesCount}
                icon={<span>🗺️</span>}
            />
            <StatCard
                title="Avg Uptime"
                value={`${stats.avgUptime.toFixed(1)}%`}
                icon={<span>📊</span>}
            />
        </div>
    );
};

export default StatsCards;
