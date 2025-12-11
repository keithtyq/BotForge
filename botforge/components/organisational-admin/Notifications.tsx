
import React from 'react';
import { ArrowLeft, AlertTriangle, User, Sparkles } from 'lucide-react';

interface NotificationsProps {
  onBack: () => void;
}

export const Notifications: React.FC<NotificationsProps> = ({ onBack }) => {
  return (
    <div className="animate-in fade-in duration-500">
      <div className="mb-6">
          <button 
            onClick={onBack} 
            className="text-gray-500 hover:text-gray-900 text-sm flex items-center font-medium transition-colors"
          >
            <span className="text-lg mr-2 leading-none">‹</span> Back to Dashboard
          </button>
      </div>

      <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">Notifications</h2>

      <div className="space-y-6 max-w-7xl mx-auto">
        {/* Card 1 */}
        <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
             <div className="flex gap-4">
                <div className="mt-1 flex-shrink-0">
                    <AlertTriangle className="w-5 h-5 text-orange-400" />
                </div>
                <div>
                    <h3 className="font-bold text-gray-800 text-base">System Update Scheduled</h3>
                    <p className="text-gray-500 text-sm mt-1">The chatbot service will undergo maintenance on 15 Nov 2025 – 4 AM.</p>
                    <button className="bg-gray-200 hover:bg-gray-300 text-gray-600 font-bold px-6 py-1.5 rounded text-sm transition-colors mt-4">
                        Delete
                    </button>
                </div>
             </div>
        </div>

        {/* Card 2 */}
        <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
             <div className="flex gap-4">
                <div className="mt-1 flex-shrink-0">
                    <User className="w-5 h-5 text-red-400" />
                </div>
                <div>
                    <h3 className="font-bold text-gray-800 text-base">Account Information Updated</h3>
                    <p className="text-gray-500 text-sm mt-1">Your account details were successfully updated on 12 Nov 2025.</p>
                    <button className="bg-gray-200 hover:bg-gray-300 text-gray-600 font-bold px-6 py-1.5 rounded text-sm transition-colors mt-4">
                        Delete
                    </button>
                </div>
             </div>
        </div>

        {/* Card 3 */}
        <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
             <div className="flex gap-4">
                <div className="mt-1 flex-shrink-0">
                    <Sparkles className="w-5 h-5 text-blue-500" />
                </div>
                <div>
                    <h3 className="font-bold text-gray-800 text-base">Chatbot Personality Updated</h3>
                    <p className="text-gray-500 text-sm mt-1">Personality settings were updated by Admin.</p>
                    <button className="bg-gray-200 hover:bg-gray-300 text-gray-600 font-bold px-6 py-1.5 rounded text-sm transition-colors mt-4">
                        Delete
                    </button>
                </div>
             </div>
        </div>
      </div>
    </div>
  );
};
