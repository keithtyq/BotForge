
import React, { useState } from 'react';
import { Bot, Trash2, Edit2, Plus, X } from 'lucide-react';

export const PricingManagement: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="animate-in fade-in duration-500">
      {/* List View */}
      <div className="bg-white border border-gray-300 rounded-xl shadow-sm p-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
            <Bot className="h-5 w-5 text-white" />
          </div>
          <h2 className="text-xl font-bold text-gray-900">Subscription Plans</h2>
          <div className="ml-auto">
            <button 
                onClick={() => setIsModalOpen(true)}
                className="bg-gray-700 text-white px-4 py-2 rounded-lg text-sm font-bold flex items-center gap-2 hover:bg-gray-800 transition-colors"
            >
              <Plus className="w-4 h-4" /> Add Plan
            </button>
          </div>
        </div>

        <div className="border border-gray-200 rounded-lg overflow-hidden">
            <table className="w-full text-left">
            <thead>
                <tr className="bg-gray-50 border-b border-gray-200">
                <th className="p-4 text-sm font-bold text-gray-600 uppercase">Name</th>
                <th className="p-4 text-sm font-bold text-gray-600 uppercase">Price</th>
                <th className="p-4 text-sm font-bold text-gray-600 uppercase">Feature Count</th>
                <th className="p-4 text-sm font-bold text-gray-600 uppercase">Status</th>
                <th className="p-4 text-sm font-bold text-gray-600 uppercase">Actions</th>
                </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
                <tr className="hover:bg-gray-50 transition-colors">
                <td className="p-4 font-bold text-gray-800">Standard</td>
                <td className="p-4 font-bold text-gray-600">$10</td>
                <td className="p-4 font-medium text-gray-600">3 items</td>
                <td className="p-4"><span className="bg-green-100 text-green-700 px-2 py-1 rounded text-xs font-bold">active</span></td>
                <td className="p-4 flex gap-3">
                    <Trash2 className="h-5 w-5 text-red-400 cursor-pointer hover:text-red-600" />
                    <Edit2 className="h-5 w-5 text-blue-400 cursor-pointer hover:text-blue-600" />
                </td>
                </tr>
                <tr className="hover:bg-gray-50 transition-colors">
                <td className="p-4 font-bold text-gray-800">Pro</td>
                <td className="p-4 font-bold text-gray-600">$30</td>
                <td className="p-4 font-medium text-gray-600">5 items</td>
                <td className="p-4"><span className="bg-green-100 text-green-700 px-2 py-1 rounded text-xs font-bold">active</span></td>
                <td className="p-4 flex gap-3">
                    <Trash2 className="h-5 w-5 text-red-400 cursor-pointer hover:text-red-600" />
                    <Edit2 className="h-5 w-5 text-blue-400 cursor-pointer hover:text-blue-600" />
                </td>
                </tr>
                <tr className="hover:bg-gray-50 transition-colors">
                <td className="p-4 font-bold text-gray-800">Deluxe</td>
                <td className="p-4 font-bold text-gray-600">$50</td>
                <td className="p-4 font-medium text-gray-600">10 items</td>
                <td className="p-4"><span className="bg-green-100 text-green-700 px-2 py-1 rounded text-xs font-bold">active</span></td>
                <td className="p-4 flex gap-3">
                    <Trash2 className="h-5 w-5 text-red-400 cursor-pointer hover:text-red-600" />
                    <Edit2 className="h-5 w-5 text-blue-400 cursor-pointer hover:text-blue-600" />
                </td>
                </tr>
            </tbody>
            </table>
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
                        <h2 className="text-xl font-bold text-gray-900">New Subscription Plan</h2>
                    </div>
                    <button onClick={() => setIsModalOpen(false)} className="text-gray-400 hover:text-gray-600">
                        <X className="w-6 h-6" />
                    </button>
                </div>
                
                <div className="p-6 space-y-6">
                     <div>
                        <label className="block text-xs font-bold mb-2 text-gray-700 uppercase">Plan Name</label>
                        <input type="text" className="w-full bg-blue-50 border border-blue-200 rounded p-2.5 text-sm font-medium focus:ring-2 focus:ring-blue-500 outline-none" />
                    </div>
                    <div>
                        <label className="block text-xs font-bold mb-2 text-gray-700 uppercase">Price</label>
                        <input type="text" className="w-1/2 bg-blue-50 border border-blue-200 rounded p-2.5 text-sm font-medium focus:ring-2 focus:ring-blue-500 outline-none" placeholder="$0.00" />
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
