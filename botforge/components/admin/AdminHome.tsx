import React from 'react';
import { Shield, Users, BarChart3, Lock, Settings, FileText, Cpu, MessageSquare, CreditCard, Layers } from 'lucide-react';
import { AdminView } from '../SystemAdminDashboard';
import { Bot } from 'lucide-react';

interface AdminHomeProps {
  onViewChange: (view: AdminView) => void;
}

export const AdminHome: React.FC<AdminHomeProps> = ({ onViewChange }) => {
  const cards = [
    {
      title: "User Administration",
      subtitle: "Edit Role Permissions",
      icon: <Shield className="w-8 h-8 text-blue-600" />,
      action: () => onViewChange('user-admin'),
      bg: "bg-blue-50",
      hover: "group-hover:bg-blue-100"
    },
    {
      title: "Manage User Accounts",
      subtitle: "Search & View Users",
      icon: <Users className="w-8 h-8 text-blue-600" />,
      action: () => onViewChange('user-admin'), // Opens user admin module
      bg: "bg-blue-50",
      hover: "group-hover:bg-blue-100"
    },
    {
      title: "View Statistics",
      subtitle: "System Analytics",
      icon: <BarChart3 className="w-8 h-8 text-blue-600" />,
      // Fixed: 'analytics' is not a valid AdminView, changed to 'stats'
      action: () => onViewChange('stats'),
      bg: "bg-blue-50",
      hover: "group-hover:bg-blue-100"
    },
    {
      title: "Revoke Access",
      subtitle: "Security Controls",
      icon: <Lock className="w-8 h-8 text-red-600" />,
      action: () => onViewChange('user-admin'), // Opens user admin module
      bg: "bg-red-50",
      hover: "group-hover:bg-red-100"
    },
    {
      title: "AI Model Management",
      subtitle: "Models & Fine-Tuning",
      icon: <Cpu className="w-8 h-8 text-purple-600" />,
      action: () => onViewChange('ai-model'),
      bg: "bg-purple-50",
      hover: "group-hover:bg-purple-100"
    },
    {
      title: "System Maintenance",
      subtitle: "Logs, Backup, Bugs",
      icon: <Settings className="w-8 h-8 text-gray-600" />,
      action: () => onViewChange('maintenance'),
      bg: "bg-gray-50",
      hover: "group-hover:bg-gray-100"
    },
    {
      title: "Manage Feedback",
      subtitle: "Inquiries & Testimonials",
      icon: <MessageSquare className="w-8 h-8 text-green-600" />,
      action: () => onViewChange('feedback'),
      bg: "bg-green-50",
      hover: "group-hover:bg-green-100"
    },
    {
      title: "Change Pricing",
      subtitle: "Subscription Plans",
      icon: <CreditCard className="w-8 h-8 text-yellow-600" />,
      action: () => onViewChange('pricing'),
      bg: "bg-yellow-50",
      hover: "group-hover:bg-yellow-100"
    },
    {
      title: "Change Features",
      subtitle: "Feature Management",
      icon: <Layers className="w-8 h-8 text-indigo-600" />,
      action: () => onViewChange('features'),
      bg: "bg-indigo-50",
      hover: "group-hover:bg-indigo-100"
    },
  ];

  return (
    <div className="animate-in fade-in duration-500">
      <div className="flex items-center gap-3 mb-8">
        <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center shadow-sm">
          <Bot className="h-6 w-6 text-white" />
        </div>
        <h2 className="text-2xl font-bold text-gray-800">Admin Dashboard</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {cards.map((card, idx) => (
          <button 
            key={idx}
            onClick={card.action} 
            className="bg-white border border-gray-300 rounded-lg p-8 flex flex-col items-center justify-center h-48 shadow-sm hover:shadow-md hover:border-blue-400 transition-all group"
          >
            <div className={`mb-4 p-3 rounded-full transition-colors ${card.bg} ${card.hover}`}>
              {card.icon}
            </div>
            <h3 className="text-gray-800 font-bold text-lg mb-1">{card.title}</h3>
            <p className="text-gray-500 text-xs uppercase tracking-wide">{card.subtitle}</p>
          </button>
        ))}
      </div>
    </div>
  );
};