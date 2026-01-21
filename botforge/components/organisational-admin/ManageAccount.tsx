import React, { useState, useRef } from 'react';
import { Upload } from 'lucide-react';

interface ManageAccountProps {
    onBack: () => void;
}

export const ManageAccount: React.FC<ManageAccountProps> = ({ onBack }) => {
    // Personal Info State
    const [name, setName] = useState('Sophie Chamberlain');
    const [email, setEmail] = useState('hi@sophiechamberlain.co');

    const [isEditingName, setIsEditingName] = useState(false);
    const [isEditingEmail, setIsEditingEmail] = useState(false);

    // Temporary state for inline editing
    const [tempName, setTempName] = useState(name);
    const [tempEmail, setTempEmail] = useState(email);

    // Company Profile State
    const [companyName, setCompanyName] = useState('xxxxx');
    const [industry, setIndustry] = useState('F&B');
    const [companySize, setCompanySize] = useState('11-50');
    const [logoPreview, setLogoPreview] = useState<string | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    // Handlers for Personal Info
    const handleEditName = () => {
        setTempName(name);
        setIsEditingName(true);
    };

    const handleSaveName = () => {
        setName(tempName);
        setIsEditingName(false);
    };

    const handleCancelName = () => {
        setIsEditingName(false);
    }

    const handleEditEmail = () => {
        setTempEmail(email);
        setIsEditingEmail(true);
    };

    const handleSaveEmail = () => {
        setEmail(tempEmail);
        setIsEditingEmail(false);
    };

    const handleCancelEmail = () => {
        setIsEditingEmail(false);
    }

    // Handlers for Company Profile
    const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            setLogoPreview(URL.createObjectURL(file));
        }
    };

    const triggerFileInput = () => {
        fileInputRef.current?.click();
    };

    return (
        <div className="animate-in fade-in duration-500 max-w-7xl mx-auto px-6 py-8 font-sans text-gray-900">

            {/* Header Section */}
            <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-16 gap-4">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight mb-2 text-black">{name}</h1>
                    <p className="text-gray-500 text-base">Manage your details and personal preferences here.</p>
                </div>

                <div className="flex items-center gap-4">
                    <div className="relative">
                        {/* Avatar Placeholder */}
                        <img
                            src=""
                            alt="Profile"
                            className="w-10 h-10 rounded-full border border-gray-200 object-cover"
                        />
                        {/* Verified Badge */}
                        <div className="absolute bottom-0 right-0 bg-blue-500 text-white rounded-full p-[2px] border-2 border-white">
                            <svg width="8" height="8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round">
                                <polyline points="20 6 9 17 4 12"></polyline>
                            </svg>
                        </div>
                    </div>
                </div>
            </div>

            {/* Basics Section */}
            <h2 className="text-lg font-bold mb-6 text-black border-b border-gray-100 pb-4">Basics</h2>

            <div className="space-y-0 mb-12">

                {/* Photo Row */}
                <div className="flex items-center justify-between py-6 border-b border-gray-100">
                    <div className="w-1/3">
                        <span className="text-sm font-bold text-black">Photo</span>
                    </div>
                    <div className="w-1/3 flex justify-start">
                        <img
                            src=""
                            alt="Profile"
                            className="w-12 h-12 rounded-full object-cover"
                        />
                    </div>
                    <div className="w-1/3 flex justify-end">
                        <button className="px-6 py-2 border border-gray-300 rounded-lg text-sm font-bold text-gray-700 hover:bg-gray-50 transition-colors">
                            Edit
                        </button>
                    </div>
                </div>

                {/* Name Row */}
                <div className="flex items-center justify-between py-8 border-b border-gray-100">
                    <div className="w-1/3">
                        <span className="text-sm font-bold text-black">Name</span>
                    </div>
                    <div className="w-1/3 text-left w-full mr-4">
                        {isEditingName ? (
                            <input
                                type="text"
                                value={tempName}
                                onChange={(e) => setTempName(e.target.value)}
                                className="w-full p-2 border border-gray-300 rounded text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-200"
                                autoFocus
                            />
                        ) : (
                            <span className="text-sm font-medium text-gray-900">{name}</span>
                        )}
                    </div>
                    <div className="w-1/3 flex justify-end gap-2">
                        {isEditingName ? (
                            <>
                                <button onClick={handleCancelName} className="px-4 py-2 text-gray-500 hover:text-gray-700 text-sm font-medium transition-colors">
                                    Cancel
                                </button>
                                <button onClick={handleSaveName} className="px-6 py-2 bg-black text-white rounded-lg text-sm font-bold hover:bg-gray-800 transition-colors">
                                    Save
                                </button>
                            </>
                        ) : (
                            <button onClick={handleEditName} className="px-6 py-2 border border-gray-300 rounded-lg text-sm font-bold text-gray-700 hover:bg-gray-50 transition-colors">
                                Edit
                            </button>
                        )}
                    </div>
                </div>

                {/* Email Row */}
                <div className="flex items-center justify-between py-8 border-b border-gray-100">
                    <div className="w-1/3">
                        <span className="text-sm font-bold text-black">Email address</span>
                    </div>
                    <div className="w-1/3 text-left w-full mr-4">
                        {isEditingEmail ? (
                            <input
                                type="email"
                                value={tempEmail}
                                onChange={(e) => setTempEmail(e.target.value)}
                                className="w-full p-2 border border-gray-300 rounded text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-200"
                                autoFocus
                            />
                        ) : (
                            <span className="text-sm font-medium text-gray-900">{email}</span>
                        )}
                    </div>
                    <div className="w-1/3 flex justify-end gap-2">
                        {isEditingEmail ? (
                            <>
                                <button onClick={handleCancelEmail} className="px-4 py-2 text-gray-500 hover:text-gray-700 text-sm font-medium transition-colors">
                                    Cancel
                                </button>
                                <button onClick={handleSaveEmail} className="px-6 py-2 bg-black text-white rounded-lg text-sm font-bold hover:bg-gray-800 transition-colors">
                                    Save
                                </button>
                            </>
                        ) : (
                            <button onClick={handleEditEmail} className="px-6 py-2 border border-gray-300 rounded-lg text-sm font-bold text-gray-700 hover:bg-gray-50 transition-colors">
                                Edit
                            </button>
                        )}
                    </div>
                </div>

            </div>

            {/* Company Profile Section */}
            <div className="max-w-md">
                <h2 className="text-lg font-bold mb-6 text-black">Company Profile</h2>

                <div className="space-y-6">

                    {/* Company Name */}
                    <div>
                        <label className="block text-sm font-bold text-gray-900 mb-2">Company:</label>
                        <input
                            type="text"
                            value={companyName}
                            onChange={(e) => setCompanyName(e.target.value)}
                            className="w-full p-3 border border-gray-400 rounded text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-200"
                        />
                    </div>

                    {/* Industry */}
                    <div>
                        <label className="block text-sm font-bold text-gray-900 mb-2">Industry:</label>
                        <div className="relative">
                            <select
                                value={industry}
                                onChange={(e) => setIndustry(e.target.value)}
                                className="w-full p-3 border border-gray-400 rounded text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-200 appearance-none bg-white"
                            >
                                <option>F&B</option>
                                <option>Technology</option>
                                <option>Retail</option>
                            </select>
                            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-gray-900">
                                <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" /></svg>
                            </div>
                        </div>
                    </div>

                    {/* Company Size */}
                    <div>
                        <label className="block text-sm font-bold text-gray-900 mb-2">Company Size:</label>
                        <div className="relative">
                            <select
                                value={companySize}
                                onChange={(e) => setCompanySize(e.target.value)}
                                className="w-full p-3 border border-gray-400 rounded text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-200 appearance-none bg-white"
                            >
                                <option>1-10</option>
                                <option>11-50</option>
                                <option>51-200</option>
                                <option>200+</option>
                            </select>
                            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-gray-900">
                                <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" /></svg>
                            </div>
                        </div>
                    </div>

                    {/* Company Logo */}
                    <div>
                        <label className="block text-sm font-bold text-gray-900 mb-2">Company Logo:</label>
                        <div
                            className="border border-gray-400 rounded-lg p-8 flex flex-col items-center justify-center cursor-pointer hover:bg-gray-50 transition-colors h-48"
                            onClick={triggerFileInput}
                        >
                            <input
                                type="file"
                                ref={fileInputRef}
                                onChange={handleLogoUpload}
                                className="hidden"
                                accept="image/*"
                            />

                            {logoPreview ? (
                                <img src={logoPreview} alt="Logo Preview" className="h-full w-auto object-contain" />
                            ) : (
                                <div className="flex flex-col items-center">
                                    <div className="bg-blue-500 rounded-lg p-4 mb-4">
                                        <Upload className="w-8 h-8 text-white" />
                                    </div>
                                    <button className="px-4 py-2 border border-gray-400 rounded font-bold text-sm text-gray-800 bg-white">
                                        Upload file
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Subscription Button */}
                    <div className="pt-4">
                        <button className="w-full bg-gray-300 hover:bg-gray-400 text-gray-900 font-bold py-3 px-4 rounded transition-colors text-base shadow-sm">
                            Choose Subscription Plan
                        </button>
                    </div>

                </div>
            </div>

        </div>
    );
};