import React, { useState, useEffect } from 'react';
import { ArrowLeft, Search, Download } from 'lucide-react';
import { orgAdminService, operatorService } from '../../api';
import { API_URL } from '../../api'; // export it

interface ViewChatHistoryProps {
    onBack: () => void;
    organisationId?: number;
    role?: string;
}

export const ViewChatHistory: React.FC<ViewChatHistoryProps> = ({
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
            const service = role === 'STAFF'
                ? operatorService
                : orgAdminService;

            const res = await service.getChatHistory(
                organisationId,
                {
                    ...filters,
                    page: 1,
                    page_size: 50,
                }
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

    const handleApply = () => {
        fetchHistory();
    };

    // CSV EXPORT
const handleExport = () => {
    if (!organisationId) return;

    const params = new URLSearchParams();
    params.append('organisation_id', organisationId.toString());

    if (filters.q) params.append('q', filters.q);
    if (filters.from) params.append('from', filters.from);
    if (filters.to) params.append('to', filters.to);

    const endpoint =
        role === 'STAFF'
            ? '/api/operator/chat-history/export'
            : '/api/org-admin/chat-history/export';

    const url = `${API_URL}${endpoint}?${params.toString()}`;

    window.open(url, '_blank');
};

    return (
        <div className="animate-in fade-in duration-500 pb-10">
            {/* Back */}
            <button
                onClick={onBack}
                className="text-gray-500 hover:text-gray-900 text-sm flex items-center mb-6 font-medium transition-colors"
            >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Dashboard
            </button>

            <h2 className="text-2xl font-bold text-gray-800 mb-6">
                Chat Logs
            </h2>

            <div className="max-w-4xl mx-auto space-y-6">
                {/* Filters */}
                <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
                    <div className="flex flex-col md:flex-row gap-4">
                        {/* Keyword */}
                        <div className="flex-1">
                            <label className="block text-xs font-bold text-gray-500 uppercase mb-2">
                                Search
                            </label>
                            <div className="relative">
                                <Search className="w-4 h-4 text-gray-400 absolute left-3 top-3" />
                                <input
                                    type="text"
                                    placeholder="Search keywords..."
                                    value={filters.q}
                                    onChange={(e) =>
                                        setFilters((prev) => ({
                                            ...prev,
                                            q: e.target.value,
                                        }))
                                    }
                                    className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:border-blue-500"
                                />
                            </div>
                        </div>

                        {/* Date range */}
                        <div>
                            <label className="block text-xs font-bold text-gray-500 uppercase mb-2">
                                Date Range
                            </label>
                            <div className="flex items-center gap-2">
                                <input
                                    type="date"
                                    value={filters.from}
                                    onChange={(e) =>
                                        setFilters((prev) => ({
                                            ...prev,
                                            from: e.target.value,
                                        }))
                                    }
                                    className="border border-gray-300 rounded-lg px-3 py-2.5 text-sm text-gray-600 w-36 outline-none focus:border-blue-500"
                                />
                                <span className="text-gray-400">-</span>
                                <input
                                    type="date"
                                    value={filters.to}
                                    onChange={(e) =>
                                        setFilters((prev) => ({
                                            ...prev,
                                            to: e.target.value,
                                        }))
                                    }
                                    className="border border-gray-300 rounded-lg px-3 py-2.5 text-sm text-gray-600 w-36 outline-none focus:border-blue-500"
                                />
                                <button
                                    onClick={handleApply}
                                    className="bg-gray-800 text-white px-4 py-2.5 rounded-lg text-sm font-bold hover:bg-gray-700 transition-colors"
                                >
                                    Apply
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Results */}
                <div className="bg-white border border-gray-200 rounded-xl p-0 overflow-hidden shadow-sm">
                    <div className="bg-gray-50 px-6 py-3 border-b border-gray-200 flex justify-between items-center">
                        <span className="text-xs font-bold text-gray-500 uppercase">
                            Recent Sessions
                        </span>
                        <button
                            onClick={handleExport}
                            className="text-blue-600 text-xs font-bold hover:underline flex items-center gap-1"
                        >
                            <Download className="w-3 h-3" />
                            Export
                        </button>
                    </div>

                    <div className="divide-y divide-gray-100 max-h-[600px] overflow-y-auto">
                        {loading ? (
                            <div className="p-6 text-center text-gray-500">
                                Loading history...
                            </div>
                        ) : history.length === 0 ? (
                            <div className="p-6 text-center text-gray-500">
                                No chat history found.
                            </div>
                        ) : (
                            history.map((msg: any) => (
                                <div
                                    key={msg.message_id}
                                    className="p-6 hover:bg-gray-50 transition-colors"
                                >
                                    <div className="flex justify-between items-start mb-2">
                                        <div className="flex items-center gap-3">
                                            <div
                                                className={`w-2 h-2 rounded-full ${
                                                    msg.sender === 'user'
                                                        ? 'bg-green-500'
                                                        : 'bg-blue-500'
                                                }`}
                                            />
                                            <span className="text-sm font-bold text-gray-800">
                                                {msg.sender === 'bot'
                                                    ? 'Chatbot'
                                                    : msg.sender_name || 'Guest'}
                                            </span>
                                        </div>
                                        <span className="text-xs text-gray-400">
                                            {msg.timestamp
                                                ? new Date(
                                                      msg.timestamp
                                                  ).toLocaleString()
                                                : ''}
                                        </span>
                                    </div>
                                    <p className="text-sm text-gray-600 italic">
                                        "{msg.message}"
                                    </p>
                                </div>
                            ))
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};