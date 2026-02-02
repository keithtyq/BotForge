import React, { useEffect, useState } from 'react';
import { Calendar, Download } from 'lucide-react';
import { orgAdminService, operatorService } from '../../api';

interface ChatHistoryProps {
    onBack: () => void;
    organisationId?: number;
    role?: string;
}

export const ChatHistory: React.FC<ChatHistoryProps> = ({
    onBack,
    organisationId,
    role,
}) => {
    const [history, setHistory] = useState<any[]>([]);
    const [loading, setLoading] = useState(false);
    const [filters, setFilters] = useState({
        q: '',
        from: '',
        to: '',
    });

    useEffect(() => {
        if (organisationId) {
            fetchHistory();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [organisationId]);

    const fetchHistory = async () => {
        if (!organisationId) return;

        setLoading(true);
        try {
            const service =
                role === 'STAFF' ? operatorService : orgAdminService;

            const res = await service.getChatHistory(
                organisationId,
                filters
            );

            if (res?.ok) {
                setHistory(res.messages || []);
            } else {
                setHistory([]);
            }
        } catch (err) {
            console.error(err);
            setHistory([]);
        }
        setLoading(false);
    };

    const handleExport = () => {
        if (!organisationId) return;

        const params = new URLSearchParams();
        params.append('organisation_id', organisationId.toString());

        if (filters.q) params.append('q', filters.q);
        if (filters.from) params.append('from', filters.from);
        if (filters.to) params.append('to', filters.to);

        const baseUrl =
            role === 'STAFF'
                ? '/api/operator/chat-history/export'
                : '/api/org-admin/chat-history/export';

        window.open(`${baseUrl}?${params.toString()}`, '_blank');
    };

    return (
        <div className="animate-in fade-in duration-500">
            {/* Back */}
            <button
                onClick={onBack}
                className="flex items-center text-gray-500 hover:text-blue-600 mb-6 transition-colors text-sm"
            >
                <svg
                    className="w-4 h-4 mr-1"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M15 19l-7-7 7-7"
                    />
                </svg>
                Back to Dashboard
            </button>

            <h2 className="text-2xl font-bold text-center text-gray-800 mb-8">
                Chat History
            </h2>

            {/* Keyword filter */}
            <div className="bg-white border border-gray-300 rounded-xl p-6 shadow-sm mb-6">
                <label className="block text-sm font-bold text-gray-700 mb-2">
                    Search Chats :
                </label>
                <div className="flex gap-4">
                    <input
                        type="text"
                        placeholder="Enter keyword or phrase"
                        value={filters.q}
                        onChange={(e) =>
                            setFilters((prev) => ({
                                ...prev,
                                q: e.target.value,
                            }))
                        }
                        className="flex-1 border border-gray-300 rounded-lg px-4 py-2 outline-none focus:border-blue-500 text-sm"
                    />
                    <button
                        onClick={fetchHistory}
                        className="bg-gray-300 hover:bg-gray-400 text-gray-700 font-bold py-2 px-8 rounded-lg text-sm transition-colors"
                    >
                        Search
                    </button>
                </div>
            </div>

            {/* Date range */}
            <div className="bg-white border border-gray-300 rounded-xl p-6 shadow-sm mb-6">
                <label className="block text-sm font-bold text-gray-700 mb-2">
                    Date Range :
                </label>
                <div className="flex items-center gap-4">
                    <span className="text-sm text-gray-600">From</span>
                    <div className="relative">
                        <input
                            type="date"
                            value={filters.from}
                            onChange={(e) =>
                                setFilters((prev) => ({
                                    ...prev,
                                    from: e.target.value,
                                }))
                            }
                            className="border border-gray-300 rounded px-3 py-2 text-sm w-36 outline-none focus:border-blue-500"
                        />
                        <Calendar className="w-4 h-4 text-gray-400 absolute right-3 top-2.5 pointer-events-none" />
                    </div>
                    <span className="text-gray-400">-</span>
                    <div className="relative">
                        <input
                            type="date"
                            value={filters.to}
                            onChange={(e) =>
                                setFilters((prev) => ({
                                    ...prev,
                                    to: e.target.value,
                                }))
                            }
                            className="border border-gray-300 rounded px-3 py-2 text-sm w-36 outline-none focus:border-blue-500"
                        />
                        <Calendar className="w-4 h-4 text-gray-400 absolute right-3 top-2.5 pointer-events-none" />
                    </div>
                    <button
                        onClick={fetchHistory}
                        className="bg-gray-300 hover:bg-gray-400 text-gray-700 font-bold py-2 px-6 rounded-lg text-sm transition-colors ml-2"
                    >
                        Apply
                    </button>
                </div>
            </div>

            {/* Chat list */}
            <div className="bg-white border border-gray-300 rounded-xl p-6 shadow-sm mb-8">
                <label className="block text-sm font-bold text-gray-700 mb-4">
                    Chat History List :
                </label>

                {loading ? (
                    <div className="text-center text-gray-500 py-6">
                        Loading chats...
                    </div>
                ) : history.length === 0 ? (
                    <div className="text-center text-gray-500 py-6">
                        No chat history found.
                    </div>
                ) : (
                    <div className="space-y-4">
                        {history.map((msg) => (
                            <div
                                key={msg.message_id}
                                className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
                            >
                                <div className="flex justify-between items-start">
                                    <div>
                                        <p className="text-sm font-bold text-gray-800 mb-1">
                                            {msg.sender === 'bot'
                                                ? 'Chatbot'
                                                : 'User'}:{' '}
                                            <span className="font-normal text-gray-600">
                                                {msg.sender_name || 'Guest'}
                                            </span>
                                        </p>
                                        <p className="text-sm text-gray-500">
                                            "{msg.message}"
                                        </p>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-xs font-bold text-gray-600 mb-1">
                                            {msg.timestamp
                                                ? new Date(
                                                      msg.timestamp
                                                  ).toLocaleDateString()
                                                : ''}
                                        </p>
                                        <p className="text-xs font-bold text-gray-600">
                                            {msg.timestamp
                                                ? new Date(
                                                      msg.timestamp
                                                  ).toLocaleTimeString()
                                                : ''}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* Export */}
            <div className="flex justify-center">
                <button
                    onClick={handleExport}
                    className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-8 rounded-lg text-sm transition-colors flex items-center gap-2"
                >
                    <Download className="w-4 h-4" />
                    Export Report
                </button>
            </div>
        </div>
    );
};