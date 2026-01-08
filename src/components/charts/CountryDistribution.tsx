import React from "react";

interface CountryDistributionProps {
    data: Array<{ country: string; countryCode: string; count: number }>;
    loading?: boolean;
}

export const CountryDistribution: React.FC<CountryDistributionProps> = ({
    data,
    loading,
}) => {
    if (loading) {
        return (
            <div className="bg-gray-100 dark:bg-gray-800 rounded-md border border-gray-300 dark:border-gray-700 p-4">
                <div className="animate-pulse space-y-3">
                    <div className="h-5 bg-gray-200 dark:bg-gray-700 rounded w-1/3" />
                    {[1, 2, 3, 4, 5].map((i) => (
                        <div key={i} className="flex items-center gap-3">
                            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-16" />
                            <div className="flex-1 h-3 bg-gray-200 dark:bg-gray-700 rounded" />
                        </div>
                    ))}
                </div>
            </div>
        );
    }

    const maxCount = Math.max(...data.map((item) => item.count), 1);

    return (
        <div className="bg-gray-100 dark:bg-gray-800 rounded-md border border-gray-300 dark:border-gray-700 p-4">
            <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">
                Top Countries
            </h3>

            <div className="space-y-3">
                {data.slice(0, 10).map((item) => {
                    const barWidth = (item.count / maxCount) * 100;

                    return (
                        <div key={item.countryCode}>
                            <div className="flex items-center justify-between mb-1">
                                <div className="flex items-center gap-2">
                                    <span className="text-base">{getFlagEmoji(item.countryCode)}</span>
                                    <span className="text-sm text-gray-700 dark:text-gray-300">
                                        {item.country}
                                    </span>
                                </div>
                                <span className="text-sm text-gray-600 dark:text-gray-400">
                                    {item.count}
                                </span>
                            </div>
                            <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                                <div
                                    className="h-full bg-blue-500 rounded-full transition-all duration-500 ease-out"
                                    style={{ width: `${barWidth}%` }}
                                />
                            </div>
                        </div>
                    );
                })}
            </div>

            {data.length === 0 && (
                <div className="text-center py-6 text-gray-500 dark:text-gray-400">
                    No geographic data available
                </div>
            )}
        </div>
    );
};

// Helper function to convert country code to flag emoji
function getFlagEmoji(countryCode: string): string {
    if (!countryCode || countryCode.length !== 2) return "🌍";

    const codePoints = countryCode
        .toUpperCase()
        .split("")
        .map((char) => 127397 + char.charCodeAt(0));
    return String.fromCodePoint(...codePoints);
}

export default CountryDistribution;
