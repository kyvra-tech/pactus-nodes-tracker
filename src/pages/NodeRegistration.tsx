import React from "react";
import Container from "../components/shared/Container";
import Title from "../components/shared/Title";
import Paragraph from "../components/shared/Paragraph";
import NodeRegistrationForm from "../components/forms/NodeRegistrationForm";

const NodeRegistration: React.FC = () => {
    return (
        <section className="mt-16 min-h-screen">
            <Container>
                {/* Header */}
                <div className="text-left max-w-7xl mx-auto mb-6">
                    <Title style="font-bold text-gray-800 dark:text-white text-2xl">
                        Register Your Node
                    </Title>
                    <Paragraph className="text-gray-600 dark:text-gray-300 mt-2">
                        Add your gRPC or JSON-RPC node to the Pactus network tracker.
                    </Paragraph>
                </div>

                {/* Benefits */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                    {[
                        {
                            icon: "🌍",
                            title: "Global Visibility",
                            description: "Your node will appear on the global network map",
                        },
                        {
                            icon: "📊",
                            title: "Daily Monitoring",
                            description: "Automated health checks with 30-day history",
                        },
                        {
                            icon: "🏆",
                            title: "Uptime Tracking",
                            description: "Build reputation with high availability scores",
                        },
                    ].map((benefit) => (
                        <div
                            key={benefit.title}
                            className="bg-gray-100 dark:bg-gray-800 rounded-md border border-gray-300 dark:border-gray-700 p-4 text-center"
                        >
                            <span className="text-3xl mb-2 block">{benefit.icon}</span>
                            <h3 className="text-sm font-semibold text-gray-800 dark:text-white mb-1">
                                {benefit.title}
                            </h3>
                            <p className="text-gray-600 dark:text-gray-400 text-xs">
                                {benefit.description}
                            </p>
                        </div>
                    ))}
                </div>

                {/* Registration Form */}
                <div className="max-w-lg mx-auto bg-gray-100 dark:bg-gray-800 rounded-md border border-gray-300 dark:border-gray-700 p-6">
                    <h2 className="text-lg font-semibold text-gray-800 dark:text-white mb-4 text-center">
                        Node Registration Form
                    </h2>
                    <NodeRegistrationForm
                        onSuccess={(id) => {
                            console.log("Registration successful:", id);
                        }}
                    />
                </div>

                {/* Requirements */}
                <div className="max-w-lg mx-auto mt-8">
                    <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">
                        Requirements
                    </h3>
                    <div className="bg-gray-100 dark:bg-gray-800 rounded-md border border-gray-300 dark:border-gray-700 p-4">
                        <ul className="space-y-2">
                            {[
                                "Your node must be publicly accessible from the internet",
                                "gRPC nodes should expose port 50051 (or custom port)",
                                "JSON-RPC endpoints must support HTTPS",
                                "Node should be running the latest stable Pactus version",
                                "Provide a valid email for status notifications",
                            ].map((req, index) => (
                                <li key={index} className="flex items-start gap-2 text-sm">
                                    <span className="text-green-500">✓</span>
                                    <span className="text-gray-700 dark:text-gray-300">{req}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                {/* FAQ */}
                <div className="max-w-lg mx-auto mt-8 mb-8">
                    <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">
                        Frequently Asked Questions
                    </h3>
                    <div className="space-y-2">
                        {[
                            {
                                question: "How long does approval take?",
                                answer:
                                    "Most registrations are reviewed within 24-48 hours. You'll receive an email notification once approved.",
                            },
                            {
                                question: "What happens after approval?",
                                answer:
                                    "Your node will appear in the network tracker and be monitored daily for availability.",
                            },
                            {
                                question: "Can I update my node information?",
                                answer:
                                    "Yes, contact us or submit a new registration with updated details.",
                            },
                            {
                                question: "Is there a cost to register?",
                                answer:
                                    "No, registration and monitoring are completely free for the Pactus community.",
                            },
                        ].map((faq, index) => (
                            <details
                                key={index}
                                className="bg-gray-100 dark:bg-gray-800 rounded-md border border-gray-300 dark:border-gray-700 group"
                            >
                                <summary className="px-4 py-3 cursor-pointer text-sm font-medium text-gray-800 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 transition-colors list-none flex items-center justify-between">
                                    {faq.question}
                                    <svg
                                        className="w-4 h-4 text-gray-400 group-open:rotate-180 transition-transform"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M19 9l-7 7-7-7"
                                        />
                                    </svg>
                                </summary>
                                <div className="px-4 pb-3 text-sm text-gray-600 dark:text-gray-400">
                                    {faq.answer}
                                </div>
                            </details>
                        ))}
                    </div>
                </div>
            </Container>
        </section>
    );
};

export default NodeRegistration;
