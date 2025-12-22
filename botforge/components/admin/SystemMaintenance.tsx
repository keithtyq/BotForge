
import React, { useState } from 'react';
import { Bot, Search, AlertTriangle, FileText, Upload, Trash2, RefreshCcw } from 'lucide-react';

type MaintenanceTab = 'logs' | 'backup' | 'bugs' | 'notifications';

export const SystemMaintenance: React.FC = () => {
  const [activeTab, setActiveTab] = useState<MaintenanceTab>('logs');

  return (
    <div className="bg-white border border-gray-300 rounded-xl shadow-sm overflow-hidden animate-in fade-in duration-500">
       <div className="flex border-b border-gray-200 overflow-x-auto">
         {['logs', 'backup', 'bugs', 'notifications'].map((tab) => (
             <button 
                key={tab}
                onClick={() => setActiveTab(tab as MaintenanceTab)} 
                className={`px-6 py-4 font-bold text-sm capitalize whitespace-nowrap transition-colors ${activeTab === tab ? 'text-blue-600 border-b-2 border-blue-600 bg-blue-50/50' : 'text-gray-500 hover:text-gray-700'}`}
             >
                {tab === 'logs' ? 'Troubleshooting Log' : tab === 'backup' ? 'Backup & Recovery' : tab === 'bugs' ? 'Bug Tracking' : 'Notifications/Alerts'}
             </button>
         ))}
       </div>

       <div className="p-6">
          {activeTab === 'logs' && (
             <div>
                 <div className="flex items-center gap-3 mb-6">
                     <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                        <Bot className="h-5 w-5 text-white" />
                     </div>
                     <h2 className="text-xl font-bold text-gray-900">Troubleshooting Log</h2>
                 </div>
                 <div className="border border-gray-300 rounded-lg overflow-hidden">
                     <table className="w-full text-left">
                         <thead className="bg-gray-50 border-b border-gray-300 text-xs uppercase text-gray-500">
                             <tr>
                                 <th className="p-3 border-r border-gray-300 w-12 text-center">0</th>
                                 <th className="p-3 border-r border-gray-300 font-bold"># Task Name</th>
                                 <th className="p-3 border-r border-gray-300 font-bold w-32">Assignee</th>
                                 <th className="p-3 border-r border-gray-300 font-bold w-32">Date Created</th>
                                 <th className="p-3 border-r border-gray-300 font-bold w-24">Impact</th>
                                 <th className="p-3 border-r border-gray-300 font-bold w-24">Status</th>
                             </tr>
                         </thead>
                         <tbody className="text-sm font-medium text-gray-700 divide-y divide-gray-300">
                             <tr>
                                 <td className="p-3 border-r border-gray-300 text-center">1</td>
                                 <td className="p-3 border-r border-gray-300">Fix bug preventing user access</td>
                                 <td className="p-3 border-r border-gray-300"></td>
                                 <td className="p-3 border-r border-gray-300">12 May</td>
                                 <td className="p-3 border-r border-gray-300 text-red-600 font-bold">High</td>
                                 <td className="p-3 border-r border-gray-300 text-green-600 font-bold">Complete</td>
                             </tr>
                             <tr>
                                 <td className="p-3 border-r border-gray-300 text-center">2</td>
                                 <td className="p-3 border-r border-gray-300">Fix bug User setting</td>
                                 <td className="p-3 border-r border-gray-300"></td>
                                 <td className="p-3 border-r border-gray-300">14 June</td>
                                 <td className="p-3 border-r border-gray-300">Normal</td>
                                 <td className="p-3 border-r border-gray-300 text-green-600 font-bold">Complete</td>
                             </tr>
                             <tr>
                                 <td className="p-3 border-r border-gray-300 text-center">3</td>
                                 <td className="p-3 border-r border-gray-300">Fix typo on homepage</td>
                                 <td className="p-3 border-r border-gray-300"></td>
                                 <td className="p-3 border-r border-gray-300">11 June</td>
                                 <td className="p-3 border-r border-gray-300">Normal</td>
                                 <td className="p-3 border-r border-gray-300 text-blue-600 font-bold">In progress</td>
                             </tr>
                             {[4,5,6].map(i => (
                                 <tr key={i} className="h-10">
                                     <td className="p-3 border-r border-gray-300 text-center">{i}</td>
                                     <td className="p-3 border-r border-gray-300"></td>
                                     <td className="p-3 border-r border-gray-300"></td>
                                     <td className="p-3 border-r border-gray-300"></td>
                                     <td className="p-3 border-r border-gray-300"></td>
                                     <td className="p-3 border-r border-gray-300"></td>
                                 </tr>
                             ))}
                         </tbody>
                     </table>
                 </div>
             </div>
          )}

          {activeTab === 'backup' && (
             <div>
                <div className="flex items-center gap-3 mb-6">
                     <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                        <Bot className="h-5 w-5 text-white" />
                     </div>
                     <h2 className="text-xl font-bold text-gray-900">Backup & recovery</h2>
                </div>
                <div className="flex items-center border border-gray-300 rounded-lg p-1 mb-6 bg-gray-50">
                    <span className="font-bold px-3 text-gray-600">Search:</span>
                    <input type="text" className="flex-1 outline-none bg-transparent" />
                    <button className="bg-gray-600 text-white px-6 py-1.5 rounded-md text-sm font-bold hover:bg-gray-700">Search</button>
                </div>

                <div className="border border-gray-300 rounded-lg min-h-[300px] mb-6 divide-y divide-gray-200">
                     {['System_Backup_v1.0', 'System_Backup_v1.1', 'UserData_2025_05', 'Config_Dump_Latest'].map((f, i) => (
                         <div key={i} className="p-4 flex justify-between items-center hover:bg-gray-50">
                             <div className="flex items-center gap-2">
                                <FileText className="text-gray-400" />
                                <span className="font-bold text-gray-700">{f}</span>
                             </div>
                             <div className="flex items-center gap-6">
                                 <span className="font-mono text-sm text-gray-500">4.2 MB</span>
                                 <div className="flex items-center gap-2">
                                     <span className="text-sm font-bold text-gray-600">select</span>
                                     <div className="w-5 h-5 rounded-full border-2 border-gray-400 cursor-pointer hover:border-blue-500"></div>
                                 </div>
                             </div>
                         </div>
                     ))}
                </div>

                <div className="flex flex-wrap gap-4 justify-between">
                    <button className="bg-gray-600 text-white font-bold py-2 px-6 rounded-lg text-sm flex items-center gap-2 hover:bg-gray-700"><Upload className="w-4 h-4" /> upload file</button>
                    <div className="flex gap-4">
                        <button className="bg-white border border-gray-300 text-red-600 font-bold py-2 px-6 rounded-lg text-sm hover:bg-red-50">Delete file</button>
                        <button className="bg-white border border-gray-300 text-gray-700 font-bold py-2 px-6 rounded-lg text-sm hover:bg-gray-50">Back up file</button>
                        <button className="bg-blue-600 text-white font-bold py-2 px-6 rounded-lg text-sm hover:bg-blue-700">Recover file</button>
                    </div>
                </div>
             </div>
          )}

          {activeTab === 'notifications' && (
             <div>
                 <div className="flex items-center gap-3 mb-6">
                     <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                        <Bot className="h-5 w-5 text-white" />
                     </div>
                     <h2 className="text-xl font-bold text-gray-900">Notifications/Alerts</h2>
                 </div>

                 <div className="border border-gray-300 rounded-lg p-6 mb-6 shadow-sm">
                     <h4 className="font-bold text-gray-800 mb-4 border-b border-gray-100 pb-2">Notification Types</h4>
                     <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                         {['System Alerts', 'Inquiry Updates', 'Booking Updates', 'Performance'].map((n, i) => (
                             <div key={i} className="border border-gray-200 p-3 rounded-lg text-sm font-bold text-gray-700 bg-gray-50 flex items-center gap-2">
                                <div className="w-2 h-2 rounded-full bg-blue-500"></div> {n}
                             </div>
                         ))}
                     </div>

                     <div className="space-y-4">
                        <div className="flex gap-4">
                            <div className="border border-gray-300 rounded-lg flex items-center justify-between p-2.5 w-1/2 bg-white">
                                <span className="text-sm font-bold text-gray-500">[Select alert]</span>
                                <span className="text-gray-400">▼</span>
                            </div>
                            <button className="bg-red-500 text-white font-bold px-6 rounded-lg text-sm hover:bg-red-600 transition-colors">Remove alert</button>
                        </div>
                        
                        <div className="flex gap-4">
                            <div className="border border-gray-300 rounded-lg flex items-center justify-between p-2.5 w-1/2 bg-white">
                                <input type="text" placeholder="[input new alert]" className="w-full text-sm font-bold outline-none" />
                            </div>
                            <button className="bg-gray-600 text-white font-bold px-6 rounded-lg text-sm hover:bg-gray-700 transition-colors">Add new alert</button>
                        </div>
                     </div>
                 </div>
                 
                 <button className="bg-blue-600 text-white px-8 py-2.5 rounded-lg font-bold hover:bg-blue-700 transition-colors">Save Configuration</button>
             </div>
          )}
           
          {activeTab === 'bugs' && (
             <div>
                 <div className="flex items-center gap-3 mb-6">
                     <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                        <Bot className="h-5 w-5 text-white" />
                     </div>
                     <h2 className="text-xl font-bold text-gray-900">Bug tracking & updates</h2>
                 </div>

                 {/* Grid Style Table */}
                 <div className="border-2 border-gray-400 rounded-lg bg-white overflow-hidden">
                    <table className="w-full border-collapse">
                        <tbody>
                            {/* Header */}
                            <tr className="h-10 border-b-2 border-gray-400">
                                <td className="w-12 border-r-2 border-gray-400 p-2 font-bold text-gray-800 text-center text-sm bg-white">0</td>
                                <td className="border-r-2 border-gray-400 p-2 font-bold text-gray-800 text-sm bg-white"># Subject</td>
                                <td className="w-48 border-r-2 border-gray-400 p-2 font-bold text-gray-800 text-sm bg-white">Status</td>
                                <td className="w-48 p-2 font-bold text-gray-800 text-sm bg-white">Start Date</td>
                            </tr>
                            
                            {/* Data Row 1 */}
                            <tr className="h-10 border-b border-gray-400">
                                <td className="border-r-2 border-gray-400 p-2 font-bold text-gray-800 text-center text-sm">1</td>
                                <td className="border-r-2 border-gray-400 p-2 font-bold text-gray-800 text-sm">release view issue</td>
                                <td className="border-r-2 border-gray-400 p-2 font-bold text-gray-800 text-sm">Closed</td>
                                <td className="p-2 font-bold text-gray-800 text-sm">12 July</td>
                            </tr>

                            {/* Data Row 2 */}
                            <tr className="h-10 border-b border-gray-400">
                                <td className="border-r-2 border-gray-400 p-2 font-bold text-gray-800 text-center text-sm">2</td>
                                <td className="border-r-2 border-gray-400 p-2 font-bold text-gray-800 text-sm">release user setting</td>
                                <td className="border-r-2 border-gray-400 p-2 font-bold text-gray-800 text-sm">In progress</td>
                                <td className="p-2 font-bold text-gray-800 text-sm">16 July</td>
                            </tr>

                            {/* Empty Grid Rows to match image */}
                            {[3, 4, 5, 6, 7, 8].map((i) => (
                                <tr key={i} className="h-10 border-b border-gray-400">
                                    <td className="border-r-2 border-gray-400 p-2 font-bold text-gray-800 text-center text-sm">{i}</td>
                                    <td className="border-r-2 border-gray-400 p-2"></td>
                                    <td className="border-r-2 border-gray-400 p-2"></td>
                                    <td className="p-2"></td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                 </div>
             </div>
          )}
       </div>
    </div>
  );
};
