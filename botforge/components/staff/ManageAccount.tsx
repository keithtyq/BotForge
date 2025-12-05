import React from 'react';
import { UserRole } from '../../types';

interface ManageAccountProps {
  onBack: () => void;
  role: string;
}

export const ManageAccount: React.FC<ManageAccountProps> = ({ onBack, role }) => {
  return (
    <div className="animate-in fade-in duration-500">
        <button onClick={onBack} className="flex items-center text-gray-500 hover:text-blue-600 mb-6 transition-colors text-sm">
            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path></svg> 
            Back to Dashboard
        </button>
        
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-10">Manage Account</h2>

        <div className="border border-gray-300 rounded-xl p-8 mb-8">
            <h3 className="text-sm font-bold text-gray-700 mb-6">Account Information</h3>
            
            <div className="space-y-6">
                <div className="flex items-center border border-gray-300 rounded-lg p-1">
                    <label className="w-24 pl-4 text-sm font-bold text-gray-700">Name :</label>
                    <input type="text" value={role === UserRole.ADMIN ? "Robby Teo" : "user1"} readOnly className="flex-1 p-2 text-sm text-right text-gray-700 outline-none bg-transparent" />
                </div>
                <div className="flex items-center border border-gray-300 rounded-lg p-1">
                    <label className="w-24 pl-4 text-sm font-bold text-gray-700">Email :</label>
                    <input type="text" value={role === UserRole.ADMIN ? "RobbyTeo@gmail.com" : "user1@company.com"} readOnly className="flex-1 p-2 text-sm text-right text-gray-700 outline-none bg-transparent" />
                </div>
                <div className="flex items-center border border-gray-300 rounded-lg p-1">
                    <label className="w-24 pl-4 text-sm font-bold text-gray-700">Role :</label>
                    <input type="text" value={role === UserRole.ADMIN ? "Org Admin" : "Staff"} readOnly className="flex-1 p-2 text-sm text-right text-gray-700 outline-none bg-transparent" />
                </div>
            </div>
        </div>

        <div className="border border-gray-300 rounded-xl p-8">
            <h3 className="text-sm font-bold text-gray-700 mb-6">Account Actions</h3>
            <div className="flex justify-center gap-6">
                <button className="bg-gray-300 hover:bg-gray-400 text-gray-700 font-bold py-2 px-8 rounded-lg text-sm transition-colors">
                    Update Account
                </button>
                <button className="bg-red-300 hover:bg-red-400 text-red-800 font-bold py-2 px-8 rounded-lg text-sm transition-colors">
                    Delete Account
                </button>
            </div>
        </div>
    </div>
  );
};