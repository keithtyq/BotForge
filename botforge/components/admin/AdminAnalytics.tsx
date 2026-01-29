import React, { useState, useEffect } from 'react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, 
  PieChart, Pie, Cell, LineChart, Line 
} from 'recharts';
import { Users, Building2, CreditCard, Activity, Download, Loader2 } from 'lucide-react';
import { sysAdminService } from '../../api'; //

const COLORS = ['#2563eb', '#10b981', '#f59e0b', '#ef4444'];

export const AdminAnalytics: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState({
    totalUsers: 0,
    activeUsers: 0,
    totalOrgs: 0,
    roleDistribution: [] as any[],
    subscriptionStats: [] as any[]
  });

  useEffect(() => {
    fetchStatistics();
  }, []);

  const fetchStatistics = async () => {
    setLoading(true);
    try {
      // Connects to existing @sysadmin_bp.get("/users")
      const userRes = await sysAdminService.listUsers();
      // Connects to existing @sysadmin_bp.get("/subscriptions")
      const subRes = await sysAdminService.listSubscriptions();

      if (userRes.ok && subRes.ok) {
        processData(userRes.users, subRes.subscriptions);
      }
    } catch (err) {
      console.error("Failed to fetch stats:", err);
    } finally {
      setLoading(false);
    }
  };

  const processData = (users: any[], subs: any[]) => {
    const active = users.filter(u => u.status).length;
    
    // Process Role Distribution
    const roles: Record<string, number> = {};
    users.forEach(u => {
      const roleName = u.system_role_name || u.org_role_name || 'Unknown';
      roles[roleName] = (roles[roleName] || 0) + 1;
    });

    const roleData = Object.keys(roles).map(name => ({ name, value: roles[name] }));

    // Process Organisation metrics
    const uniqueOrgs = new Set(users.map(u => u.organisation_id).filter(id => id !== null));

    setData({
      totalUsers: users.length,
      activeUsers: active,
      totalOrgs: uniqueOrgs.size,
      roleDistribution: roleData,
      subscriptionStats: subs.map(s => ({
        name: s.name,
        price: s.price,
        status: s.status === 0 ? 'Active' : 'Inactive'
      }))
    });
  };

  if (loading) {
    return (
      <div className="flex h-96 items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6 bg-gray-50 min-h-screen">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-800">System Statistics & Reporting</h1>
        <button 
          className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          onClick={() => window.print()}
        >
          <Download className="h-4 w-4" /> Export Report
        </button>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <StatCard title="Total Users" value={data.totalUsers} icon={<Users />} color="blue" />
        <StatCard title="Active Now" value={data.activeUsers} icon={<Activity />} color="green" />
        <StatCard title="Organisations" value={data.totalOrgs} icon={<Building2 />} color="purple" />
        <StatCard title="Active Plans" value={data.subscriptionStats.length} icon={<CreditCard />} color="orange" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* User Role Distribution */}
        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
          <h3 className="text-lg font-semibold mb-4 text-gray-700">User Role Distribution</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={data.roleDistribution}
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {data.roleDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Subscription Pricing Overview */}
        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
          <h3 className="text-lg font-semibold mb-4 text-gray-700">Plan Pricing Overview ($)</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data.subscriptionStats}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="price" fill="#2563eb" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

const StatCard = ({ title, value, icon, color }: any) => (
  <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm flex items-center gap-4">
    <div className={`p-3 rounded-lg bg-${color}-50 text-${color}-600`}>
      {React.cloneElement(icon, { className: 'h-6 w-6' })}
    </div>
    <div>
      <p className="text-sm text-gray-500 font-medium">{title}</p>
      <p className="text-2xl font-bold text-gray-800">{value}</p>
    </div>
  </div>
);
