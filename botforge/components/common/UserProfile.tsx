import React, { useState, useEffect } from 'react';
import { Loader2, Save, X } from 'lucide-react';
import { sysAdminService, operatorService } from '../../api';

interface UserProfileProps {
    role: 'sysadmin' | 'operator';
    user: any;
    onBack?: () => void;
}

export const UserProfile: React.FC<UserProfileProps> = ({ role, user: initialUser, onBack }) => {
    const [user, setUser] = useState(initialUser);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');

    // Password fields
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const [isLoading, setIsLoading] = useState(false);
    const [isSaving, setIsSaving] = useState(false);
    const [msg, setMsg] = useState<{ type: 'success' | 'error', text: string } | null>(null);

    const service = role === 'sysadmin' ? sysAdminService : operatorService;

    useEffect(() => {
        if (initialUser) {
            setName(initialUser.username || '');
            setEmail(initialUser.email || '');
            setUser(initialUser);
        }
    }, [initialUser]);

    const handleUpdateProfile = async () => {
        setIsSaving(true);
        setMsg(null);
        try {
            const res = await service.updateProfile({
                user_id: user.user_id,
                username: name,
                email: email
            });

            if (res.error) {
                setMsg({ type: 'error', text: res.error });
            } else {
                setMsg({ type: 'success', text: 'Profile updated successfully' });
                // Update local storage if needed
                if (role === 'sysadmin') { // Or generic check
                    const stored = localStorage.getItem('user');
                    if (stored) {
                        const parsed = JSON.parse(stored);
                        const updated = { ...parsed, username: res.username || name, email: res.email || email };
                        localStorage.setItem('user', JSON.stringify(updated));
                    }
                }
            }
        } catch (e) {
            setMsg({ type: 'error', text: 'Failed to update profile' });
        } finally {
            setIsSaving(false);
        }
    };

    const handleChangePassword = async () => {
        if (!oldPassword || !newPassword || !confirmPassword) {
            setMsg({ type: 'error', text: 'All password fields are required' });
            return;
        }
        if (newPassword !== confirmPassword) {
            setMsg({ type: 'error', text: 'New passwords do not match' });
            return;
        }

        setIsSaving(true);
        setMsg(null);
        try {
            const res = await service.changePassword({
                user_id: user.user_id,
                old_password: oldPassword,
                new_password: newPassword,
                confirm_password: confirmPassword
            });

            if (res.error) {
                setMsg({ type: 'error', text: res.error });
            } else {
                setMsg({ type: 'success', text: 'Password changed successfully' });
                setOldPassword('');
                setNewPassword('');
                setConfirmPassword('');
            }
        } catch (e) {
            setMsg({ type: 'error', text: 'Failed to change password' });
        } finally {
            setIsSaving(false);
        }
    };

    return (
        <div className="animate-in fade-in duration-500 max-w-4xl mx-auto px-6 py-8 font-sans text-gray-900">
            <div className="mb-8">
                <h1 className="text-3xl font-bold tracking-tight mb-2">My Profile</h1>
                <p className="text-gray-500">Manage your account details and security.</p>
            </div>

            {msg && (
                <div className={`p-4 rounded mb-6 flex justify-between ${msg.type === 'success' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                    <span>{msg.text}</span>
                    <button onClick={() => setMsg(null)}><X size={16} /></button>
                </div>
            )}

            <div className="space-y-8">
                {/* Profile Details */}
                <section>
                    <h2 className="text-lg font-bold mb-4 pb-2 border-b border-gray-100">Details</h2>
                    <div className="grid gap-4 max-w-md">
                        <div>
                            <label className="block text-sm font-bold mb-1">Username</label>
                            <input
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className="w-full p-2 border border-gray-300 rounded"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-bold mb-1">Email</label>
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full p-2 border border-gray-300 rounded"
                            />
                        </div>
                        <div>
                            <button
                                onClick={handleUpdateProfile}
                                disabled={isSaving}
                                className="px-4 py-2 bg-blue-600 text-white rounded font-bold hover:bg-blue-700 disabled:opacity-50 flex items-center gap-2"
                            >
                                {isSaving && <Loader2 className="animate-spin h-4 w-4" />}
                                Save Details
                            </button>
                        </div>
                    </div>
                </section>

                {/* Security */}
                <section>
                    <h2 className="text-lg font-bold mb-4 pb-2 border-b border-gray-100">Security</h2>
                    <div className="grid gap-4 max-w-md">
                        <div>
                            <label className="block text-sm font-bold mb-1">Current Password</label>
                            <input
                                type="password"
                                value={oldPassword}
                                onChange={(e) => setOldPassword(e.target.value)}
                                className="w-full p-2 border border-gray-300 rounded"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-bold mb-1">New Password</label>
                            <input
                                type="password"
                                value={newPassword}
                                onChange={(e) => setNewPassword(e.target.value)}
                                className="w-full p-2 border border-gray-300 rounded"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-bold mb-1">Confirm New Password</label>
                            <input
                                type="password"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                className="w-full p-2 border border-gray-300 rounded"
                            />
                        </div>
                        <div>
                            <button
                                onClick={handleChangePassword}
                                disabled={isSaving}
                                className="px-4 py-2 bg-black text-white rounded font-bold hover:bg-gray-800 disabled:opacity-50 flex items-center gap-2"
                            >
                                {isSaving && <Loader2 className="animate-spin h-4 w-4" />}
                                Change Password
                            </button>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
};
