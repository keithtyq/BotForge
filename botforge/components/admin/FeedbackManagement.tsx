
import React from 'react';
import { Bot, FileText } from 'lucide-react';

export const FeedbackManagement: React.FC = () => {
  return (
    <div className="bg-white border border-gray-300 rounded-xl shadow-sm overflow-hidden animate-in fade-in duration-500">
      <div className="p-6">
        <div className="flex gap-4 mb-6">
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
            <Bot className="h-5 w-5 text-white" />
          </div>
          <h2 className="text-xl font-bold text-gray-900">Inquiry Form</h2>
        </div>

        <div className="flex border border-gray-300 rounded-lg min-h-[500px] overflow-hidden">
          {/* List */}
          <div className="w-1/3 border-r border-gray-300 bg-gray-50">
            {[1, 2, 3, 4, 5].map((i) => (
              <div 
                key={i} 
                className="border-b border-gray-200 p-4 flex justify-between items-center hover:bg-white cursor-pointer transition-colors"
              >
                <div className="flex items-center gap-2">
                  <FileText className="text-gray-400 w-5 h-5" />
                  <span className="font-medium text-gray-800">Inquiry Form #{100+i}</span>
                </div>
                <span className="text-sm text-gray-500">13 May</span>
              </div>
            ))}
          </div>
          
          {/* Content */}
          <div className="flex-1 flex flex-col">
              <div className="p-8 flex-1 flex items-center justify-center border-b border-gray-200">
                <div className="text-center">
                    <FileText className="w-16 h-16 text-gray-200 mx-auto mb-4" />
                    <span className="font-bold text-xl text-gray-400">[Select an Inquiry to View Content]</span>
                </div>
              </div>
              <div className="p-4 bg-gray-50 flex justify-end gap-3">
                  <button className="text-red-600 font-bold text-sm px-4 py-2 hover:bg-red-50 rounded">Delete</button>
                  <button className="bg-blue-600 text-white font-bold text-sm px-6 py-2 rounded hover:bg-blue-700">Reply</button>
              </div>
          </div>
        </div>
      </div>
    </div>
  );
};
