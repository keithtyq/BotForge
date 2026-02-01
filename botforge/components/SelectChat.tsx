import React from 'react';
import { useNavigate } from 'react-router-dom';

export const SelectChat: React.FC = () => {
    const navigate = useNavigate();

    // Mock data for industries and organisations
    // In a real scenario, this would come from an API endpoint like /api/public/organisations
    const industries = [
        {
            title: 'Retail',
            orgs: [
                { name: 'Retail Store 1', company_id: '1' },
                { name: 'Fashion Boutique A', company_id: '2' },
                { name: 'Bookshop X', company_id: '3' },
                { name: 'Grocery Market B', company_id: '4' },
                { name: 'Electronics Depot Y', company_id: '5' },
            ]
        },
        {
            title: 'F&B',
            orgs: [
                { name: 'Restaurant 1', company_id: '6' },
                { name: 'Cafe & Bakery C', company_id: '7' },
                { name: 'Pizzeria Z', company_id: '8' },
                { name: 'Fine Dining D', company_id: '9' },
                { name: 'Food Court E', company_id: '10' },
            ]
        },
        {
            title: 'Education',
            orgs: [
                { name: 'Institute 1', company_id: '11' },
                { name: 'University G', company_id: '12' },
                { name: 'Online Course H', company_id: '13' },
                { name: 'Language School I', company_id: '14' },
                { name: 'Training Center J', company_id: '15' },
            ]
        }
    ];

    const handleSelect = (companyId: string) => {
        // Navigate to the chat page with the selected company_id
        // Assuming the chat page route is /chatPage?company_id=...
        navigate(`/chatPage?company_id=${companyId}`);
    };

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col items-center py-12 px-4 sm:px-6 lg:px-8 font-sans">
            <h1 className="text-3xl font-bold text-gray-900 mb-12 tracking-tight">Select Chat</h1>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl w-full">
                {industries.map((industry) => (
                    <div key={industry.title} className="bg-white rounded-lg border border-gray-200 shadow-sm flex flex-col h-full">
                        {/* Header */}
                        <div className="py-4 border-b border-gray-100">
                            <h2 className="text-xl font-semibold text-center text-gray-800">{industry.title}</h2>
                        </div>

                        {/* List */}
                        <div className="p-4 flex flex-col gap-3 flex-grow">
                            {industry.orgs.map((org) => (
                                <button
                                    key={org.company_id}
                                    onClick={() => handleSelect(org.company_id)}
                                    className="w-full py-3 px-4 bg-white border border-gray-200 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 hover:border-gray-300 transition-all shadow-sm text-center"
                                >
                                    {org.name}
                                </button>
                            ))}
                            {/* Empty state filler if needed to match height visually, 
                                but flex-grow handles it nicely */}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};
