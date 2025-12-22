
import React, { useState } from 'react';
import { Bot, Trash2, Edit2, Plus, X } from 'lucide-react';

export const FeatureManagement: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="animate-in fade-in duration-500">
      {/* List View */}
      <div className="bg-white border border-gray-300 rounded-xl shadow-sm p-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
            <Bot className="h-5 w-5 text-white" />
          </div>
          <h2 className="text-xl font-bold text-gray-900">Feature Management</h2>
          <div className="ml-auto">
            <button 
                onClick={() => setIsModalOpen(true)}
                className="bg-gray-700 text-white px-4 py-2 rounded-lg text-sm font-bold flex items-center gap-2 hover:bg-gray-800 transition-colors"
            >
              <Plus className="w-4 h-4" /> Add Feature
            </button>
          </div>
        </div>

        <div className="space-y-4">
          {['AI Model management', 'Subscription Management', 'User administration', 'Analytics Dashboard'].map((f, i) => (
            <div key={i} className="border border-gray-300 p-4 rounded-lg flex justify-between items-center hover:bg-gray-50 transition-colors shadow-sm">
              <span className="font-bold text-gray-700 text-lg">{f}</span>
              <div className="flex gap-3">
                <Trash2 className="h-5 w-5 text-red-400 cursor-pointer hover:text-red-600 transition-colors" />
                <Edit2 className="h-5 w-5 text-blue-400 cursor-pointer hover:text-blue-600 transition-colors" />
              </div>
            </div>
          ))}
        </div>
      </div>

       {/* Modal Overlay */}
       {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 backdrop-blur-sm transition-all animate-in fade-in duration-200">
            <div className="bg-white rounded-xl shadow-2xl w-full max-w-lg overflow-hidden animate-in zoom-in-95 duration-200">
                <div className="p-6 border-b border-gray-100 flex justify-between items-center">
                    <div className="flex items-center gap-2">
                         <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                            <Bot className="h-5 w-5 text-white" />
                        </div>
                        <h2 className="text-xl font-bold text-gray-900">New Feature</h2>
                    </div>
                    <button onClick={() => setIsModalOpen(false)} className="text-gray-400 hover:text-gray-600">
                        <X className="w-6 h-6" />
                    </button>
                </div>
                
                <div className="p-6 space-y-6">
                     <div>
                        <label className="block text-xs font-bold mb-2 text-gray-700 uppercase">Feature Name</label>
                        <input type="text" className="w-full bg-blue-50 border border-blue-200 rounded p-2.5 text-sm font-medium focus:ring-2 focus:ring-blue-500 outline-none" />
                    </div>
                    <div>
                        <label className="block text-xs font-bold mb-2 text-gray-700 uppercase">Category</label>
                        <div className="relative">
                            <select className="w-full bg-gray-600 border border-gray-600 rounded p-2.5 text-sm font-bold text-white appearance-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-gray-400">
                                <option>Core Functionality</option>
                                <option>UI/UX</option>
                                <option>Backend</option>
                            </select>
                            <span className="absolute right-3 top-3 text-white text-xs pointer-events-none">▼</span>
                        </div>
                    </div>
                    <div>
                        <label className="block text-xs font-bold mb-2 text-gray-700 uppercase">Description</label>
                        <textarea className="w-full bg-blue-50 border border-blue-200 rounded p-2.5 h-32 text-sm font-medium focus:ring-2 focus:ring-blue-500 outline-none resize-none"></textarea>
                    </div>
                </div>

                <div className="p-6 pt-0 flex justify-end gap-4">
                     <button 
                        onClick={() => setIsModalOpen(false)}
                        className="text-gray-600 font-bold text-sm hover:text-gray-900 px-4 py-2"
                     >
                        Cancel
                    </button>
                    <button 
                        onClick={() => setIsModalOpen(false)}
                        className="bg-gray-600 text-white font-bold px-8 py-2 rounded-lg text-sm hover:bg-gray-700 shadow-md transition-colors"
                    >
                        Save
                    </button>
                </div>
            </div>
        </div>
      )}
    </div>
  );
};
