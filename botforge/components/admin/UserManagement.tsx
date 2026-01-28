import React, { useState, useEffect } from 'react';
import { Bot, Plus, Search, ShieldAlert, Loader2 } from 'lucide-react';
import { sysAdminService } from '../../api'; //

type UserTab = 'roles' | 'list' | 'access';

export const UserManagement: React.FC = () => {
  const [activeTab, setActiveTab] = useState<UserTab>('roles');
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  // Fetch users when the component mounts or tabs change
  useEffect(() => {
    if (activeTab === 'list' || activeTab === 'access') {
      loadUsers();
    }
  }, [activeTab]);

  const loadUsers = async () => {
    setLoading(true);
    try {
      const res = await sysAdminService.listUsers(); //
      if (res.ok) {
        setUsers(res.users); //
      } else {
        console.error("Failed to load users:", res.error);
      }
    } catch (err) {
      console.error("API Error:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleToggleStatus = async (userId: number, currentStatus: boolean) => {
    // Backend expects 'status' boolean in payload
    const res = await sysAdminService.updateUserStatus(userId, !currentStatus);
    if (res.ok) {
      loadUsers(); // Refresh the list after update
    }
  };

  const filteredUsers = users.filter(u => 
    u.username.toLowerCase().includes(searchQuery.toLowerCase()) || 
    u.user_id.toString().includes(searchQuery)
  );

  return (
    <div className="bg-white border border-gray-300 rounded-xl shadow-sm overflow-hidden animate-in fade-in duration-500">
      {/* Tab Navigation */}
      <div className="flex border-b border-gray-200">
        {(['roles', 'list', 'access'] as UserTab[]).map((tab) => (
          <button 
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-6 py-4 font-bold text-sm transition-colors ${
              activeTab === tab 
                ? 'text-blue-600 border-b-2 border-blue-600 bg-blue-50/50' 
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            {tab === 'roles' ? 'Role Configuration' : tab === 'list' ? 'User List' : 'Revoke / Access'}
          </button>
        ))}
      </div>

      {/* Role Configuration - Placeholder for Role-Permission Matrix */}
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
          </div>
          <div className="p-6 text-center text-gray-500">
            Role and Permission matrix management can be implemented using the /api/sysadmin/role-permissions endpoint.
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
            {loading && <Loader2 className="w-5 h-5 animate-spin text-blue-600" />}
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-200">
                  <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">User</th>
                  <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">System Role</th>
                  <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Org Role</th>
                  <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider text-right">Action</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {users.map((user) => (
                  <tr key={user.user_id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-900">
                      {user.username}
                      <div className="text-xs text-gray-500">{user.email}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="px-2 py-1 bg-purple-100 text-purple-700 rounded-md text-xs font-bold">
                        {user.system_role_name || 'N/A'}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                      {user.organisation_name ? `${user.organisation_name} (${user.org_role_name})` : '-'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`text-xs font-bold px-2 py-1 rounded ${user.status ? 'text-green-600 bg-green-50' : 'text-red-600 bg-red-50'}`}>
                        {user.status ? 'Active' : 'Inactive'}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <button className="text-blue-600 hover:text-blue-900">Edit Role</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Access Control Zone */}
      {activeTab === 'access' && (
        <div>
          <div className="bg-red-50 border-l-4 border-red-500 p-4 m-6 rounded-r-lg flex items-start gap-3">
            <ShieldAlert className="w-6 h-6 text-red-600 mt-0.5" />
            <div>
              <h3 className="text-red-800 font-bold">Access Control Zone</h3>
              <p className="text-red-600 text-sm">Actions taken here will immediately affect user login capability.</p>
            </div>
          </div>

          <div className="p-6 border-b border-gray-200 bg-gray-50 flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-red-600 rounded-lg flex items-center justify-center">
                <Bot className="h-5 w-5 text-white" />
              </div>
              <h2 className="text-xl font-bold text-gray-800">Security Clearance</h2>
            </div>
            <div className="relative w-full md:w-64">
              <Search className="absolute left-3 top-2.5 w-4 h-4 text-gray-400" />
              <input 
                type="text" 
                placeholder="Search user..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg text-sm w-full focus:ring-2 focus:ring-red-500 outline-none transition-all" 
              />
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-200">
                  <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">User Identity</th>
                  <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Organisation</th>
                  <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider text-right">Security Action</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredUsers.map((user) => (
                  <tr key={user.user_id} className={!user.status ? "bg-red-50/30 transition-colors" : "hover:bg-gray-50 transition-colors"}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className={`h-10 w-10 rounded-full flex items-center justify-center font-bold mr-3 text-sm ${user.status ? 'bg-blue-100 text-blue-600' : 'bg-red-100 text-red-600'}`}>
                          {user.username.substring(0, 2).toUpperCase()}
                        </div>
                        <div>
                          <div className="font-bold text-gray-900 text-sm">{user.username}</div>
                          <div className="text-gray-500 text-xs">ID: {user.user_id}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                      {user.organisation_name || 'System Level'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold ${user.status ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                        {user.status ? 'Active' : 'Revoked'}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right">
                      <button 
                        onClick={() => handleToggleStatus(user.user_id, user.status)}
                        className={`px-3 py-1.5 rounded text-xs font-bold transition-colors shadow-sm ${
                          user.status 
                            ? 'bg-white border border-red-200 text-red-600 hover:bg-red-50' 
                            : 'bg-green-600 text-white hover:bg-green-700'
                        }`}
                      >
                        {user.status ? 'Revoke Access' : 'Restore Access'}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};
