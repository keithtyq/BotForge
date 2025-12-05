import React from 'react';
import { ArrowLeft } from 'lucide-react';

interface ManageAccountProps {
  onBack: () => void;
}

export const ManageAccount: React.FC<ManageAccountProps> = ({ onBack }) => {
  return (
    <div className="animate-in fade-in duration-500">
        <button onClick={onBack} className="text-gray-500 hover:text-gray-900 text-sm flex items-center mb-6 font-medium transition-colors">
            <ArrowLeft className="w-4 h-4 mr-2" /> Back to Dashboard
        </button>
        
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-10">Manage Account</h2>

        <div className="max-w-2xl mx-auto">
            <div className="bg-white border border-gray-300 rounded-xl p-8 mb-8 shadow-sm">
                <h3 className="text-sm font-bold text-gray-700 mb-6">Account Information</h3>
                
                <div className="space-y-6">
                    <div className="flex items-center border border-gray-300 rounded-lg p-1 bg-gray-50">
                        <label className="w-24 pl-4 text-sm font-bold text-gray-700">Name :</label>
                        <input type="text" value="Robby Teo" readOnly className="flex-1 p-2 text-sm text-right text-gray-700 outline-none bg-transparent font-medium" />
                    </div>
                    <div className="flex items-center border border-gray-300 rounded-lg p-1 bg-gray-50">
                        <label className="w-24 pl-4 text-sm font-bold text-gray-700">Email :</label>
                        <input type="text" value="RobbyTeo@gmail.com" readOnly className="flex-1 p-2 text-sm text-right text-gray-700 outline-none bg-transparent font-medium" />
                    </div>
                    <div className="flex items-center border border-gray-300 rounded-lg p-1 bg-gray-50">
                        <label className="w-24 pl-4 text-sm font-bold text-gray-700">Role :</label>
                        <input type="text" value="Org Admin" readOnly className="flex-1 p-2 text-sm text-right text-gray-700 outline-none bg-transparent font-medium" />
                    </div>
                </div>
            </div>

            <div className="bg-white border border-gray-300 rounded-xl p-8 shadow-sm">
                <h3 className="text-sm font-bold text-gray-700 mb-6">Account Actions</h3>
                <div className="flex justify-center gap-6">
                    <button className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-2 px-8 rounded-lg text-sm transition-colors border border-gray-300">
                        Update Account
                    </button>
                    <button className="bg-red-50 hover:bg-red-100 text-red-600 font-bold py-2 px-8 rounded-lg text-sm transition-colors border border-red-200">
                        Delete Account
                    </button>
                </div>
            </div>
        </div>
    </div>
  );
};