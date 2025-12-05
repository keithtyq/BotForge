import React from 'react';
import { Database, Cpu, ArrowRight, ArrowLeft } from 'lucide-react';

interface BuildChatbotProps {
  onBack: () => void;
  onNavigateNext: () => void;
}

export const BuildChatbot: React.FC<BuildChatbotProps> = ({ onBack, onNavigateNext }) => {
  return (
    <div className="animate-in fade-in duration-500">
        <button onClick={onBack} className="text-gray-500 hover:text-gray-900 text-sm flex items-center mb-6 font-medium transition-colors">
            <ArrowLeft className="w-4 h-4 mr-2" /> Back to Dashboard
        </button>

        <h2 className="text-2xl font-bold text-gray-800 mb-6">Build Chatbot</h2>

        <div className="max-w-4xl mx-auto space-y-6">
            {/* Block 1: Data Source */}
            <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
                <div className="flex items-center gap-3 mb-6 border-b border-gray-100 pb-4">
                    <div className="p-2 bg-blue-50 text-blue-600 rounded-lg"><Database className="w-5 h-5" /></div>
                    <h3 className="text-lg font-bold text-gray-800">1. Select Data Source</h3>
                </div>
                
                {/* Upload */}
                <div className="flex items-center gap-4 mb-6">
                    <span className="text-sm font-bold text-gray-700 w-32">Upload File :</span>
                    <div className="flex-1 flex gap-2">
                        <div className="flex-1 border border-gray-300 rounded-lg px-4 py-2 text-sm text-gray-500 bg-gray-50 flex items-center justify-between">
                            <span className="italic">No file chosen</span>
                            <button className="text-blue-600 font-bold text-xs hover:underline">Browse</button>
                        </div>
                        <button className="bg-gray-800 text-white px-5 py-2 rounded-lg text-sm font-bold hover:bg-gray-700 transition-colors">Upload</button>
                    </div>
                </div>

                <div className="flex items-center gap-4 mb-2">
                        <div className="w-32"></div>
                        <div className="text-xs text-gray-400 uppercase font-bold tracking-wider">- OR -</div>
                </div>

                {/* URL */}
                <div className="flex items-center gap-4">
                    <span className="text-sm font-bold text-gray-700 w-32">Website URL :</span>
                    <div className="flex-1 flex gap-2">
                        <input type="text" placeholder="https://example.com" className="flex-1 border border-gray-300 rounded-lg px-4 py-2 text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none" />
                        <button className="bg-gray-800 text-white px-5 py-2 rounded-lg text-sm font-bold hover:bg-gray-700 transition-colors">Fetch</button>
                    </div>
                </div>
            </div>

            {/* Block 2: Training */}
            <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
                <div className="flex items-center justify-between mb-4 border-b border-gray-100 pb-4">
                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-green-50 text-green-600 rounded-lg"><Cpu className="w-5 h-5" /></div>
                        <h3 className="text-lg font-bold text-gray-800">2. Training Process</h3>
                    </div>
                    <button className="bg-green-600 text-white px-6 py-2 rounded-lg text-sm font-bold hover:bg-green-700 shadow-sm transition-colors">Start Training</button>
                </div>
                
                <div className="bg-gray-50 rounded-xl p-4 border border-gray-200">
                    <div className="flex justify-between text-xs font-bold text-gray-500 mb-2">
                        <span>Progress</span>
                        <span>70%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-3 mb-2">
                        <div className="bg-green-500 h-3 rounded-full relative" style={{ width: '70%' }}>
                            <div className="absolute right-0 top-0 bottom-0 w-3 bg-white/30 animate-pulse"></div>
                        </div>
                    </div>
                    <p className="text-xs text-gray-500 italic">Processing uploaded documents...</p>
                </div>
            </div>

            {/* Next Step */}
            <div className="flex justify-end">
                <button onClick={onNavigateNext} className="flex items-center gap-2 text-blue-600 font-bold hover:underline">
                    Next: Customise Chatbot <ArrowRight className="w-4 h-4" />
                </button>
            </div>
        </div>
    </div>
  );
};