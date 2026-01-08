import React, { useState } from "react";
import { apiService, RegistrationRequest } from "../../services/api";

interface NodeRegistrationFormProps {
    onSuccess?: (id: number) => void;
}

export const NodeRegistrationForm: React.FC<NodeRegistrationFormProps> = ({
    onSuccess,
}) => {
    const [formData, setFormData] = useState<RegistrationRequest>({
        nodeType: "grpc",
        name: "",
        address: "",
        network: "mainnet",
        email: "",
        website: "",
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            const response = await apiService.registerNode(formData);
            setSuccess(true);
            onSuccess?.(response.id);
        } catch (err) {
            setError(
                err instanceof Error ? err.message : "Failed to submit registration"
            );
        } finally {
            setLoading(false);
        }
    };

    if (success) {
        return (
            <div className="bg-green-100 dark:bg-green-900/30 border border-green-400 dark:border-green-700 rounded-md p-6 text-center">
                <div className="text-green-500 text-4xl mb-3">✓</div>
                <h3 className="text-lg font-semibold text-green-700 dark:text-green-300 mb-2">
                    Registration Submitted!
                </h3>
                <p className="text-green-600 dark:text-green-400 text-sm">
                    Your node registration is pending review. You'll receive an email once
                    it's approved.
                </p>
                <button
                    onClick={() => {
                        setSuccess(false);
                        setFormData({
                            nodeType: "grpc",
                            name: "",
                            address: "",
                            network: "mainnet",
                            email: "",
                            website: "",
                        });
                    }}
                    className="mt-4 px-4 py-2 bg-green-600 text-white text-sm rounded-lg hover:bg-green-700 transition-colors"
                >
                    Register Another Node
                </button>
            </div>
        );
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Node Type
                </label>
                <select
                    value={formData.nodeType}
                    onChange={(e) =>
                        setFormData({
                            ...formData,
                            nodeType: e.target.value as "grpc" | "jsonrpc",
                        })
                    }
                    className="w-full px-3 py-2 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-800 dark:text-white focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors"
                >
                    <option value="grpc">gRPC</option>
                    <option value="jsonrpc">JSON-RPC</option>
                </select>
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Node Name
                </label>
                <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-3 py-2 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-800 dark:text-white placeholder-gray-400 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors"
                    placeholder="My Pactus Node"
                />
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Address
                </label>
                <input
                    type="text"
                    required
                    value={formData.address}
                    onChange={(e) =>
                        setFormData({ ...formData, address: e.target.value })
                    }
                    className="w-full px-3 py-2 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-800 dark:text-white placeholder-gray-400 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors"
                    placeholder={
                        formData.nodeType === "grpc"
                            ? "node.example.com:50051"
                            : "https://rpc.example.com"
                    }
                />
                <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                    {formData.nodeType === "grpc"
                        ? "gRPC endpoint (host:port format)"
                        : "JSON-RPC endpoint URL (https://...)"}
                </p>
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Network
                </label>
                <select
                    value={formData.network}
                    onChange={(e) =>
                        setFormData({
                            ...formData,
                            network: e.target.value as "mainnet" | "testnet",
                        })
                    }
                    className="w-full px-3 py-2 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-800 dark:text-white focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors"
                >
                    <option value="mainnet">Mainnet</option>
                    <option value="testnet">Testnet</option>
                </select>
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Email
                </label>
                <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-3 py-2 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-800 dark:text-white placeholder-gray-400 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors"
                    placeholder="admin@example.com"
                />
                <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                    We'll notify you when your node is approved
                </p>
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Website <span className="text-gray-400">(optional)</span>
                </label>
                <input
                    type="url"
                    value={formData.website}
                    onChange={(e) =>
                        setFormData({ ...formData, website: e.target.value })
                    }
                    className="w-full px-3 py-2 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-800 dark:text-white placeholder-gray-400 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors"
                    placeholder="https://example.com"
                />
            </div>

            {error && (
                <div className="bg-red-100 dark:bg-red-900/30 border border-red-400 dark:border-red-700 rounded-md p-3">
                    <p className="text-red-600 dark:text-red-400 text-sm">{error}</p>
                </div>
            )}

            <button
                type="submit"
                disabled={loading}
                className="w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white font-medium rounded-md transition-colors"
            >
                {loading ? (
                    <span className="flex items-center justify-center gap-2">
                        <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                            <circle
                                className="opacity-25"
                                cx="12"
                                cy="12"
                                r="10"
                                stroke="currentColor"
                                strokeWidth="4"
                                fill="none"
                            />
                            <path
                                className="opacity-75"
                                fill="currentColor"
                                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                            />
                        </svg>
                        Submitting...
                    </span>
                ) : (
                    "Submit Registration"
                )}
            </button>

            <p className="text-center text-xs text-gray-500 dark:text-gray-400">
                By submitting, you agree to have your node publicly listed and monitored
                daily
            </p>
        </form>
    );
};

export default NodeRegistrationForm;
