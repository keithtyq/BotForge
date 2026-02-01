import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { patronService } from '../api';

type DirectoryOrg = {
  bot_id: number;
  company_id: number;
  name: string; 
};

type DirectoryIndustry = {
  title: string;
  orgs: DirectoryOrg[];
};

export const SelectChat: React.FC = () => {
    const navigate = useNavigate();

    const [industries, setIndustries] = useState<DirectoryIndustry[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const load = async () => {
        setLoading(true);
        setError(null);

        try {
            const res = await patronService.getChatDirectory();
            if (res.ok && res.industries) {
            setIndustries(res.industries);
            } else {
            setError(res.error || 'Failed to load chat directory');
            }
        } catch {
            setError('Network error or server unreachable');
        } finally {
            setLoading(false);
        }
        };

        load();
    }, []);

    const handleSelect = (companyId: number) => {
        navigate(`/chatPage?company_id=${companyId}`);
    };

    if (loading) {
        return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
            <div className="text-gray-600 font-medium">Loading...</div>
        </div>
        );
    }

    if (error) {
        return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
            <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm max-w-md w-full">
            <h2 className="text-lg font-bold text-gray-900 mb-2">Failed to load</h2>
            <p className="text-gray-600 text-sm mb-4">{error}</p>
            <button
                onClick={() => window.location.reload()}
                className="w-full py-2 px-4 bg-blue-600 text-white rounded-md font-semibold hover:bg-blue-700 transition-colors"
            >
                Retry
            </button>
            </div>
        </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col items-center py-12 px-4 sm:px-6 lg:px-8 font-sans">
        <h1 className="text-3xl font-bold text-gray-900 mb-12 tracking-tight">Select Chat</h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl w-full">
            {industries.map((industry) => (
            <div
                key={industry.title}
                className="bg-white rounded-lg border border-gray-400 shadow-md flex flex-col h-full"

            >
                {/* Header */}
                <div className="py-4 border-b border-gray-100">
                <h2 className="text-xl font-semibold text-center text-gray-800">
                    {industry.title}
                </h2>
                </div>

                {/* List */}
                <div className="p-4 flex flex-col gap-3 flex-grow">
                {industry.orgs.map((org) => (
                    <button
                    key={org.bot_id}
                    onClick={() => handleSelect(org.company_id)}
                    className="w-full py-3 px-4 bg-white border border-gray-300 rounded-md text-sm font-medium text-gray-800 hover:bg-gray-50 hover:border-gray-400 transition-all shadow"
                    >
                    {org.name}
                    </button>
                ))}

                {industry.orgs.length === 0 && (
                    <div className="text-sm text-gray-500 text-center py-6">
                    No bots available
                    </div>
                )}
                </div>
            </div>
            ))}
        </div>

        {industries.length === 0 && (
            <div className="mt-10 text-gray-600 text-sm">
            No available chatbots yet.
            </div>
        )}
        </div>
    );
    };

export default SelectChat;