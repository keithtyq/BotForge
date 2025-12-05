import React from 'react';
import { ArrowLeft, Mail, Search, Eye, Edit2, Shield, User } from 'lucide-react';

interface ManageStaffProps {
  onBack: () => void;
  onCreateRole: () => void; // Callback to switch to a Create Role view if we implemented it fully
}

export const ManageStaff: React.FC<ManageStaffProps> = ({ onBack, onCreateRole }) => {
  return (
    <div className="animate-in fade-in duration-500">
        <button onClick={onBack} className="text-gray-500 hover:text-gray-900 text-sm flex items-center mb-6 font-medium transition-colors">
            <ArrowLeft className="w-4 h-4 mr-2" /> Back to Dashboard
        </button>

        <h2 className="text-2xl font-bold text-gray-800 mb-6">Manage Staff & Roles</h2>

        <div className="max-w-4xl mx-auto space-y-6">
            
            {/* Block 1: Search & List */}
            <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
                <div className="flex justify-between items-center mb-6">
                    <h3 className="text-lg font-bold text-gray-800">Staff Directory</h3>
                    <button className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-bold hover:bg-blue-700 shadow-sm flex items-center gap-2 transition-colors">
                        <Mail className="w-4 h-4" /> Invite User
                    </button>
                </div>

                <div className="flex gap-2 mb-6">
                    <div className="relative flex-1">
                        <Search className="w-4 h-4 text-gray-400 absolute left-3 top-3" />
                        <input type="text" placeholder="Search by name or email..." className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:border-blue-500" />
                    </div>
                    <button className="bg-gray-800 text-white px-6 py-2.5 rounded-lg text-sm font-bold hover:bg-gray-700 transition-colors">Search</button>
                </div>

                <div className="space-y-3">
                    {/* User Item */}
                    <div className="border border-gray-200 rounded-lg p-4 flex justify-between items-center hover:bg-gray-50 transition-colors">
                        <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-bold text-xs">JT</div>
                            <div className="text-sm">
                                <p className="font-bold text-gray-800">John Tan</p>
                                <p className="text-xs text-gray-500">Role: Staff</p>
                            </div>
                        </div>
                        <div className="flex gap-2">
                            <button className="text-gray-500 hover:text-blue-600 p-2"><Eye className="w-4 h-4" /></button>
                            <button className="text-gray-500 hover:text-blue-600 p-2"><Edit2 className="w-4 h-4" /></button>
                        </div>
                    </div>
                    {/* User Item */}
                    <div className="border border-gray-200 rounded-lg p-4 flex justify-between items-center hover:bg-gray-50 transition-colors">
                        <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full bg-purple-100 text-purple-600 flex items-center justify-center font-bold text-xs">LK</div>
                            <div className="text-sm">
                                <p className="font-bold text-gray-800">Lim Kai Xuan</p>
                                <p className="text-xs text-gray-500">Role: Admin</p>
                            </div>
                        </div>
                        <div className="flex gap-2">
                            <button className="text-gray-500 hover:text-blue-600 p-2"><Eye className="w-4 h-4" /></button>
                            <button className="text-gray-500 hover:text-blue-600 p-2"><Edit2 className="w-4 h-4" /></button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Block 2: Roles */}
            <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
                <div className="flex justify-between items-center mb-6">
                    <h3 className="text-lg font-bold text-gray-800">Defined Roles</h3>
                    <button onClick={onCreateRole} className="bg-gray-200 text-gray-800 px-4 py-2 rounded-lg text-sm font-bold hover:bg-gray-300 transition-colors">
                        Create New Role
                    </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="border border-gray-200 rounded-lg p-4 bg-gray-50">
                        <div className="flex justify-between items-start mb-2">
                            <span className="font-bold text-gray-800 flex items-center gap-2"><Shield className="w-4 h-4 text-blue-500" /> Admin</span>
                        </div>
                        <p className="text-xs text-gray-500 mb-4">Full access to all system settings.</p>
                        <div className="flex gap-2 text-xs font-bold text-blue-600">
                            <span className="cursor-pointer hover:underline">Edit</span>
                            <span className="text-gray-300">|</span>
                            <span className="cursor-pointer hover:underline text-red-600">Delete</span>
                        </div>
                    </div>
                    <div className="border border-gray-200 rounded-lg p-4 bg-gray-50">
                        <div className="flex justify-between items-start mb-2">
                            <span className="font-bold text-gray-800 flex items-center gap-2"><User className="w-4 h-4 text-gray-500" /> Staff</span>
                        </div>
                        <p className="text-xs text-gray-500 mb-4">Limited access to chat history.</p>
                        <div className="flex gap-2 text-xs font-bold text-blue-600">
                            <span className="cursor-pointer hover:underline">Edit</span>
                            <span className="text-gray-300">|</span>
                            <span className="cursor-pointer hover:underline text-red-600">Delete</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
  );
};