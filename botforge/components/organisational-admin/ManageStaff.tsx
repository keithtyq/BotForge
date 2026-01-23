import React, { useState, useEffect } from 'react';
import { orgAdminService } from '../../api';
import { User } from '../../types';
import { Loader2, Trash2, UserCog } from 'lucide-react';

interface ManageStaffProps {
    user: User; // Current logged in admin
}

export const ManageStaff: React.FC<ManageStaffProps> = ({ user }) => {
    const [staff, setStaff] = useState<any[]>([]);
    const [roles, setRoles] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [message, setMessage] = useState<string | null>(null);

    useEffect(() => {
        loadData();
    }, []);

    const loadData = async () => {
        setIsLoading(true);
        try {
            // Fetch Staff and Roles in parallel
            const [staffRes, rolesRes] = await Promise.all([
                orgAdminService.listStaff(user.organisation_id),
                orgAdminService.listRoles(user.organisation_id)
            ]);

            if (staffRes.ok) setStaff(staffRes.staff);
            if (rolesRes.ok) setRoles(rolesRes.roles);
        } catch (error) {
            console.error("Failed to load staff data", error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleRoleChange = async (targetUserId: number, newRoleId: number) => {
        try {
            const res = await orgAdminService.assignRole({
                user_id: targetUserId,
                role_id: newRoleId
            });
            if (res.ok) {
                setMessage("Role updated successfully.");
                loadData(); // Refresh list
            } else {
                setMessage(`Error: ${res.error}`);
            }
        } catch (error) {
            setMessage("Failed to update role.");
        }
    };

    const handleRemoveStaff = async (targetUserId: number) => {
        if(!confirm("Are you sure you want to remove this staff member?")) return;
        
        try {
            const res = await orgAdminService.removeStaff(targetUserId);
            if (res.ok) {
                setStaff(staff.filter(s => s.user_id !== targetUserId));
                setMessage("Staff removed.");
            }
        } catch (error) {
            setMessage("Failed to remove staff.");
        }
    };

    return (
        <div className="p-6">
            <h2 className="text-2xl font-bold mb-6 flex items-center">
                <UserCog className="mr-2" /> Manage Staff
            </h2>

            {message && (
                <div className="bg-blue-50 text-blue-700 p-3 rounded mb-4">
                    {message}
                </div>
            )}

            {isLoading ? (
                <Loader2 className="animate-spin" />
            ) : (
                <div className="bg-white shadow rounded-lg overflow-hidden">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Role</th>
                                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {staff.map((s) => (
                                <tr key={s.user_id}>
                                    <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-900">{s.username}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-gray-500">{s.email}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <select 
                                            value={s.role_id || ''}
                                            onChange={(e) => handleRoleChange(s.user_id, parseInt(e.target.value))}
                                            className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
                                        >
                                            <option value="" disabled>No Role</option>
                                            {roles.map(r => (
                                                <option key={r.role_id} value={r.role_id}>{r.name}</option>
                                            ))}
                                        </select>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                        <button 
                                            onClick={() => handleRemoveStaff(s.user_id)}
                                            className="text-red-600 hover:text-red-900 flex items-center justify-end w-full"
                                        >
                                            <Trash2 size={16} /> Remove
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};
