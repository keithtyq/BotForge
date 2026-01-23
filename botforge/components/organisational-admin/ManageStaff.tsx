import React, { useEffect, useState } from 'react';
import { orgAdminService, orgRoleService } from '../../api';
import { User, Loader2, Trash2, Save } from 'lucide-react';

interface ManageStaffProps {
    onBack: () => void;
    onCreateRole: () => void;
}

export const ManageStaff: React.FC<ManageStaffProps> = ({ onBack, onCreateRole }) => {
    const [users, setUsers] = useState<any[]>([]);
    const [roles, setRoles] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [currentUser, setCurrentUser] = useState<any>(null);

    // Load data on mount
    useEffect(() => {
        const loadData = async () => {
            const stored = localStorage.getItem('user');
            if (!stored) return;
            const userObj = JSON.parse(stored);
            setCurrentUser(userObj);

            if (userObj.organisation_id) {
                try {
                    const [usersRes, rolesRes] = await Promise.all([
                        orgAdminService.listOrgUsers(userObj.organisation_id),
                        orgRoleService.listRoles(userObj.organisation_id)
                    ]);
                    if (Array.isArray(usersRes)) setUsers(usersRes);
                    if (Array.isArray(rolesRes)) setRoles(rolesRes);
                } catch (e) {
                    console.error("Failed to load data", e);
                } finally {
                    setIsLoading(false);
                }
            }
        };
        loadData();
    }, []);

    const handleDeleteRole = async (roleId: number) => {
        if (!window.confirm("Are you sure? This action cannot be undone.")) return;
        try {
            await orgRoleService.deleteRole(roleId);
            setRoles(roles.filter(r => r.id !== roleId));
        } catch (e) {
            alert("Failed to delete role. It may be assigned to active users.");
        }
    };

    const handleUserRoleChange = async (userId: number, newRoleId: number) => {
        try {
            const res = await orgAdminService.updateUserRole(userId, newRoleId);
            if (res.user_id) {
                // Update local state
                setUsers(users.map(u => u.user_id === userId ? { ...u, org_role_id: newRoleId, org_role_name: res.org_role_name } : u));
                alert("User role updated!");
            }
        } catch (e) {
            console.error("Update failed", e);
            alert("Failed to update user role.");
        }
    };

    if (isLoading) return <div className="p-10 flex justify-center"><Loader2 className="animate-spin" /></div>;

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

            <h2 className="text-3xl font-bold text-center text-gray-900 mb-10">Manage Staff & Roles</h2>

            <div className="max-w-6xl mx-auto space-y-8">

                {/* VIEW STAFF SECTION */}
                <div className="bg-white border border-gray-300 rounded-xl p-8 shadow-sm">
                    <h3 className="text-base font-bold text-gray-700 mb-4">View Staff</h3>

                    <div className="space-y-4 mb-8">
                        {users.map((u) => (
                            <div key={u.user_id} className="border border-gray-300 rounded-lg p-4 flex flex-col sm:flex-row justify-between items-center gap-4">
                                <div className="text-sm text-gray-800 font-bold">
                                    User: <span className="font-normal">{u.username} ({u.email})</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <span className="text-sm text-gray-600">Role:</span>
                                    <select 
                                        value={u.org_role_id || ''}
                                        onChange={(e) => handleUserRoleChange(u.user_id, Number(e.target.value))}
                                        className="border border-gray-300 rounded px-2 py-1 text-sm bg-gray-50"
                                    >
                                        {roles.map(r => (
                                            <option key={r.id} value={r.id}>{r.name}</option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                        ))}
                        {users.length === 0 && <p className="text-gray-500 italic">No staff members found.</p>}
                    </div>
                </div>

                {/* MANAGE ROLES SECTION */}
                <div className="bg-white border border-gray-300 rounded-xl p-8 shadow-sm">
                    <h3 className="text-base font-bold text-gray-700 mb-4">Manage Roles</h3>

                    <div className="space-y-4 mb-8">
                        {roles.map((role) => (
                            <div key={role.id} className="border border-gray-300 rounded-lg p-4 flex flex-col sm:flex-row justify-between items-center">
                                <div className="text-sm text-gray-800 font-bold">
                                    Role: <span className="font-normal">{role.name}</span>
                                    {role.description && <span className="text-gray-500 font-normal text-xs ml-2">- {role.description}</span>}
                                </div>
                                <div className="flex gap-3">
                                    <button 
                                        onClick={() => handleDeleteRole(role.id)}
                                        className="bg-red-50 hover:bg-red-100 text-red-600 px-4 py-1.5 rounded text-sm font-bold transition-colors flex items-center gap-2"
                                    >
                                        <Trash2 size={16} /> Delete
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="flex justify-center">
                        <button
                            onClick={onCreateRole}
                            className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-2.5 rounded-lg text-sm font-bold transition-colors shadow-md"
                        >
                            + Create New Role
                        </button>
                    </div>
                </div>

            </div>
        </div>
    );
};
