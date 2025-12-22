
import React, { useState } from 'react';
import { Bot, Plus, Search, ShieldAlert } from 'lucide-react';

type UserTab = 'roles' | 'list' | 'access';

export const UserManagement: React.FC = () => {
  const [activeTab, setActiveTab] = useState<UserTab>('roles');

  return (
    <div className="bg-white border border-gray-300 rounded-xl shadow-sm overflow-hidden animate-in fade-in duration-500">
      {/* Tab Navigation */}
      <div className="flex border-b border-gray-200">
        <button 
          onClick={() => setActiveTab('roles')}
          className={`px-6 py-4 font-bold text-sm transition-colors ${activeTab === 'roles' ? 'text-blue-600 border-b-2 border-blue-600 bg-blue-50/50' : 'text-gray-500 hover:text-gray-700'}`}
        >
          Role Configuration
        </button>
        <button 
          onClick={() => setActiveTab('list')}
          className={`px-6 py-4 font-bold text-sm transition-colors ${activeTab === 'list' ? 'text-blue-600 border-b-2 border-blue-600 bg-blue-50/50' : 'text-gray-500 hover:text-gray-700'}`}
        >
          User List
        </button>
        <button 
          onClick={() => setActiveTab('access')}
          className={`px-6 py-4 font-bold text-sm transition-colors ${activeTab === 'access' ? 'text-blue-600 border-b-2 border-blue-600 bg-blue-50/50' : 'text-gray-500 hover:text-gray-700'}`}
        >
          Revoke / Access
        </button>
      </div>

      {/* Role Configuration */}
      {activeTab === 'roles' && (
        <div>
          <div className="p-6 border-b border-gray-200 flex justify-between items-center bg-gray-50">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                <Bot className="h-5 w-5 text-white" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-gray-800">Role Configuration</h2>
                <p className="text-sm text-gray-500">Edit role-based permissions</p>
              </div>
            </div>
            <button className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 shadow-sm transition-colors">
              Save Changes
            </button>
          </div>
          <div className="p-6">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-gray-100">
                  <th className="pb-3 text-sm font-bold text-gray-500 uppercase">Module Function</th>
                  <th className="pb-3 text-center text-sm font-bold text-gray-500 uppercase">Admin</th>
                  <th className="pb-3 text-center text-sm font-bold text-gray-500 uppercase">Manager</th>
                  <th className="pb-3 text-center text-sm font-bold text-gray-500 uppercase">Staff</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-gray-50 hover:bg-gray-50">
                  <td className="py-4 text-gray-700 font-medium">Manage User Accounts</td>
                  <td className="py-4 text-center"><input type="checkbox" defaultChecked className="w-5 h-5 accent-blue-600 cursor-pointer" /></td>
                  <td className="py-4 text-center"><input type="checkbox" defaultChecked className="w-5 h-5 accent-blue-600 cursor-pointer" /></td>
                  <td className="py-4 text-center"><input type="checkbox" className="w-5 h-5 accent-blue-600 cursor-pointer" /></td>
                </tr>
                <tr className="border-b border-gray-50 hover:bg-gray-50">
                  <td className="py-4 text-gray-700 font-medium">View System Reports</td>
                  <td className="py-4 text-center"><input type="checkbox" defaultChecked className="w-5 h-5 accent-blue-600 cursor-pointer" /></td>
                  <td className="py-4 text-center"><input type="checkbox" defaultChecked className="w-5 h-5 accent-blue-600 cursor-pointer" /></td>
                  <td className="py-4 text-center"><input type="checkbox" defaultChecked className="w-5 h-5 accent-blue-600 cursor-pointer" /></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* User List */}
      {activeTab === 'list' && (
        <div>
          <div className="p-6 border-b border-gray-200 bg-gray-50 flex justify-between items-center">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                <Bot className="h-5 w-5 text-white" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-gray-800">User Account List</h2>
                <p className="text-sm text-gray-500">View all registered users</p>
              </div>
            </div>
            <button className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 flex items-center gap-2 transition-colors">
              <Plus className="w-4 h-4" /> Add User
            </button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-200">
                  <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">User</th>
                  <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Role</th>
                  <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider text-right">Action</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                <tr className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-900">John Doe</td>
                  <td className="px-6 py-4 whitespace-nowrap"><span className="px-2 py-1 bg-purple-100 text-purple-700 rounded-md text-xs font-bold">Admin</span></td>
                  <td className="px-6 py-4 whitespace-nowrap"><span className="text-green-600 text-xs font-bold bg-green-50 px-2 py-1 rounded">Active</span></td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button className="text-blue-600 hover:text-blue-900">Edit</button>
                  </td>
                </tr>
                <tr className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-900">Alice Smith</td>
                  <td className="px-6 py-4 whitespace-nowrap"><span className="px-2 py-1 bg-gray-100 text-gray-700 rounded-md text-xs font-bold">Staff</span></td>
                  <td className="px-6 py-4 whitespace-nowrap"><span className="text-green-600 text-xs font-bold bg-green-50 px-2 py-1 rounded">Active</span></td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button className="text-blue-600 hover:text-blue-900">Edit</button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Access Control */}
      {activeTab === 'access' && (
        <div>
          <div className="bg-red-50 border-l-4 border-red-500 p-4 m-6 rounded-r-lg flex items-start gap-3">
            <ShieldAlert className="w-6 h-6 text-red-600 mt-0.5" />
            <div>
              <h3 className="text-red-800 font-bold">Access Control Zone</h3>
              <p className="text-red-600 text-sm">Actions taken here will immediately suspend user access.</p>
            </div>
          </div>

          <div className="p-6 border-b border-gray-200 bg-gray-50 flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-red-600 rounded-lg flex items-center justify-center">
                <Bot className="h-5 w-5 text-white" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-gray-800">Revoke / Give Access</h2>
                <p className="text-sm text-gray-500">Security clearance management</p>
              </div>
            </div>
            <div className="relative w-full md:w-64">
              <Search className="absolute left-3 top-2.5 w-4 h-4 text-gray-400" />
              <input type="text" placeholder="Search user ID..." className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg text-sm w-full focus:ring-2 focus:ring-red-500 outline-none transition-all" />
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-200">
                  <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">User Identity</th>
                  <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Company</th>
                  <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider text-right">Security Action</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                <tr className="bg-red-50/30 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="h-10 w-10 rounded-full bg-red-100 flex items-center justify-center text-red-600 font-bold mr-3 text-sm">X</div>
                      <div>
                        <div className="font-bold text-gray-900 text-sm">Suspicious User</div>
                        <div className="text-gray-500 text-xs">ID: 99420</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">McDonald</td>
                  <td className="px-6 py-4 whitespace-nowrap"><span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold bg-red-100 text-red-800">Revoked</span></td>
                  <td className="px-6 py-4 whitespace-nowrap text-right">
                    <button className="bg-green-600 text-white px-3 py-1.5 rounded text-xs font-bold hover:bg-green-700 shadow-sm transition-colors">Restore Access</button>
                  </td>
                </tr>
                <tr className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold mr-3 text-sm">JD</div>
                      <div>
                        <div className="font-bold text-gray-900 text-sm">John Doe</div>
                        <div className="text-gray-500 text-xs">ID: 10023</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">Grab</td>
                  <td className="px-6 py-4 whitespace-nowrap"><span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold bg-green-100 text-green-800">Active</span></td>
                  <td className="px-6 py-4 whitespace-nowrap text-right">
                    <button className="bg-white border border-red-200 text-red-600 px-3 py-1.5 rounded text-xs font-bold hover:bg-red-50 transition-colors">Revoke Access</button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};
