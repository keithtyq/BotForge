import React from 'react';
import { Wand2, X, ChevronDown } from 'lucide-react';

interface CustomizeChatbotProps {
  onBack: () => void;
}

export const CustomizeChatbot: React.FC<CustomizeChatbotProps> = ({ onBack }) => {
  return (
    <div className="animate-in fade-in duration-500">
         <div className="flex items-center justify-center min-h-[60vh]">
             <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-8 w-full max-w-lg text-center relative">
                 <button onClick={onBack} className="absolute top-4 left-4 text-gray-400 hover:text-gray-600"><X className="w-5 h-5" /></button>
                 
                 <div className="w-12 h-12 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                     <Wand2 className="w-6 h-6" />
                 </div>
                 
                 <h2 className="text-xl font-bold text-gray-800 mb-8">Chatbot Settings</h2>

                 <div className="space-y-6 text-left">
                     <div>
                         <label className="block font-bold text-sm text-gray-700 mb-2">Select Chatbot</label>
                         <div className="relative">
                             <select className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm appearance-none bg-white focus:ring-2 focus:ring-purple-500 outline-none">
                                 <option>Main Customer Support</option>
                                 <option>Internal HR Bot</option>
                             </select>
                             <ChevronDown className="absolute right-4 top-3 w-4 h-4 text-gray-500 pointer-events-none" />
                         </div>
                     </div>

                     <div>
                        <label className="block font-bold text-sm text-gray-700 mb-2">Personality</label>
                        <div className="relative">
                            <select className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm appearance-none bg-white font-medium focus:ring-2 focus:ring-purple-500 outline-none">
                                <option>Friendly & Casual</option>
                                <option>Professional & Formal</option>
                                <option>Concise & Direct</option>
                            </select>
                            <ChevronDown className="absolute right-4 top-3 w-4 h-4 text-gray-500 pointer-events-none" />
                        </div>
                    </div>
                 </div>

                 <div className="mt-8 pt-6 border-t border-gray-100 flex justify-center gap-3">
                    <button onClick={onBack} className="px-6 py-2 bg-gray-100 text-gray-700 rounded-lg text-sm font-bold hover:bg-gray-200 transition-colors">Cancel</button>
                    <button onClick={onBack} className="px-6 py-2 bg-purple-600 text-white rounded-lg text-sm font-bold hover:bg-purple-700 shadow-md transition-colors">Save Changes</button>
                 </div>
             </div>
         </div>
    </div>
  );
};