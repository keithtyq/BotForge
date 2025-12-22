import React from 'react';
import { Calendar } from 'lucide-react';

interface ChatHistoryProps {
  onBack: () => void;
}

export const ChatHistory: React.FC<ChatHistoryProps> = ({ onBack }) => {
  return (
    <div className="animate-in fade-in duration-500">
        <button onClick={onBack} className="flex items-center text-gray-500 hover:text-blue-600 mb-6 transition-colors text-sm">
            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path></svg> 
            Back to Dashboard
        </button>

        <h2 className="text-2xl font-bold text-center text-gray-800 mb-8">Chat History</h2>

        <div className="bg-white border border-gray-300 rounded-xl p-6 shadow-sm mb-6">
            <label className="block text-sm font-bold text-gray-700 mb-2">Search Chats :</label>
            <div className="flex gap-4">
                <input type="text" placeholder="Enter keyword or phrase" className="flex-1 border border-gray-300 rounded-lg px-4 py-2 outline-none focus:border-blue-500 text-sm" />
                <button className="bg-gray-300 hover:bg-gray-400 text-gray-700 font-bold py-2 px-8 rounded-lg text-sm transition-colors">
                    Search
                </button>
            </div>
        </div>

        <div className="bg-white border border-gray-300 rounded-xl p-6 shadow-sm mb-6">
            <label className="block text-sm font-bold text-gray-700 mb-2">Date Range :</label>
             <div className="flex items-center gap-4">
                <span className="text-sm text-gray-600">From</span>
                <div className="relative">
                    <input type="text" placeholder="dd-----yyyy" className="border border-gray-300 rounded px-3 py-2 text-sm w-36 outline-none focus:border-blue-500" />
                    <Calendar className="w-4 h-4 text-gray-400 absolute right-3 top-2.5 pointer-events-none" />
                </div>
                <span className="text-gray-400">-</span>
                <div className="relative">
                    <input type="text" placeholder="dd-----yyyy" className="border border-gray-300 rounded px-3 py-2 text-sm w-36 outline-none focus:border-blue-500" />
                    <Calendar className="w-4 h-4 text-gray-400 absolute right-3 top-2.5 pointer-events-none" />
                </div>
                <button className="bg-gray-300 hover:bg-gray-400 text-gray-700 font-bold py-2 px-6 rounded-lg text-sm transition-colors ml-2">
                    Apply
                </button>
            </div>
        </div>

        <div className="bg-white border border-gray-300 rounded-xl p-6 shadow-sm mb-8">
            <label className="block text-sm font-bold text-gray-700 mb-4">Chat History List :</label>
            <div className="space-y-4">
                {/* Chat Item 1 */}
                <div className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                    <div className="flex justify-between items-start">
                        <div>
                            <p className="text-sm font-bold text-gray-800 mb-1">User: <span className="font-normal text-gray-600">John Tan</span></p>
                            <p className="text-sm text-gray-500">"How do I reset my password"</p>
                        </div>
                        <div className="text-right">
                            <p className="text-xs font-bold text-gray-600 mb-1">Date: 12 Nov 2025</p>
                            <p className="text-xs font-bold text-gray-600">Time: 2:01 PM</p>
                        </div>
                    </div>
                </div>
                {/* Chat Item 2 */}
                <div className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                    <div className="flex justify-between items-start">
                        <div>
                            <p className="text-sm font-bold text-gray-800 mb-1">User: <span className="font-normal text-gray-600">Lim Kai Xuan</span></p>
                            <p className="text-sm text-gray-500">"I can't log in to my account"</p>
                        </div>
                        <div className="text-right">
                            <p className="text-xs font-bold text-gray-600 mb-1">Date: 12 Nov 2025</p>
                            <p className="text-xs font-bold text-gray-600">Time: 2:01 PM</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div className="flex justify-center">
             <button className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-8 rounded-lg text-sm transition-colors">
                Export Report
            </button>
        </div>
    </div>
  );
};