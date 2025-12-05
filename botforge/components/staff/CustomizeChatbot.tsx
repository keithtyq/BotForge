import React from 'react';

interface CustomizeChatbotProps {
  onBack: () => void;
}

export const CustomizeChatbot: React.FC<CustomizeChatbotProps> = ({ onBack }) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[600px] animate-in fade-in duration-500">
        <div className="w-full max-w-lg space-y-8">
            <div className="text-center mb-10">
                <div className="inline-block border-2 border-gray-400 rounded-lg py-2 px-10 text-gray-700 font-bold bg-white mb-4">
                    Customize Chatbot
                </div>
            </div>

            <div className="space-y-6">
                <div className="flex items-center">
                    <label className="w-40 text-gray-700 font-medium text-right mr-4">Select Chatbot:</label>
                    <div className="relative flex-1">
                        <select className="w-full appearance-none border-2 border-gray-400 rounded-lg py-2 px-4 text-gray-700 font-bold text-center bg-white outline-none focus:border-blue-500">
                            <option>--- Select Chatbot ---</option>
                            <option>Customer Service Bot</option>
                            <option>Sales Assistant</option>
                        </select>
                        <div className="absolute right-3 top-3 pointer-events-none">
                            <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                        </div>
                    </div>
                </div>

                <div className="flex items-center">
                    <label className="w-40 text-gray-700 font-medium text-right mr-4">Personality Setting:</label>
                    <div className="relative flex-1">
                        <select className="w-full appearance-none border-2 border-gray-400 rounded-lg py-2 px-4 text-gray-700 font-bold text-center bg-white outline-none focus:border-blue-500">
                            <option>Friendly</option>
                            <option>Professional</option>
                            <option>Humorous</option>
                        </select>
                         <div className="absolute right-3 top-3 pointer-events-none">
                            <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                        </div>
                    </div>
                </div>
            </div>

            <div className="flex justify-center mt-12">
                <button 
                    onClick={onBack}
                    className="border-2 border-gray-600 bg-white hover:bg-gray-50 text-gray-700 font-medium py-2 px-10 rounded-lg transition-colors"
                >
                    Back to Dashboard
                </button>
            </div>
        </div>
    </div>
  );
};