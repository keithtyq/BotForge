
import React, { useState } from 'react';
import { Bot, CheckCircle } from 'lucide-react';

export const AIModelManagement: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'active' | 'tuning'>('active');

  return (
    <div className="bg-white border border-gray-300 rounded-xl shadow-sm overflow-hidden animate-in fade-in duration-500">
      <div className="flex border-b border-gray-200">
        <button onClick={() => setActiveTab('active')} className={`px-6 py-4 font-bold text-sm ${activeTab === 'active' ? 'text-blue-600 border-b-2 border-blue-600 bg-blue-50/50' : 'text-gray-500 hover:text-gray-700'}`}>Active Model</button>
        <button onClick={() => setActiveTab('tuning')} className={`px-6 py-4 font-bold text-sm ${activeTab === 'tuning' ? 'text-blue-600 border-b-2 border-blue-600 bg-blue-50/50' : 'text-gray-500 hover:text-gray-700'}`}>Fine Tuning</button>
      </div>

      <div className="p-6">
        {activeTab === 'active' && (
          <div>
            <div className="flex items-center gap-4 mb-8">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                <Bot className="h-5 w-5 text-white" />
              </div>
              <h2 className="text-xl font-bold text-gray-900">Active Model</h2>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              <div className="border border-gray-300 p-6 rounded-lg relative bg-white shadow-sm">
                <div className="space-y-3 font-mono text-sm text-gray-800">
                    <p><span className="font-bold border-l-2 border-black pl-2">Model Name:</span> <span className="float-right">GPT-Model-v3.2</span></p>
                    <p><span className="font-bold border-l-2 border-black pl-2">Version:</span> <span className="float-right">3.2.0</span></p>
                    <p><span className="font-bold border-l-2 border-black pl-2">Status:</span> <span className="float-right flex items-center gap-1">ACTIVE <span className="w-3 h-3 bg-blue-600 rounded-full"></span></span></p>
                    <p><span className="font-bold border-l-2 border-black pl-2">Last Updated:</span> <span className="float-right">12 Nov 2025</span></p>
                    <div className="my-4 border-b border-gray-200"></div>
                    <p className="font-bold border-l-2 border-black pl-2">Performance Metrics:</p>
                    <p className="pl-4">• Response Accuracy: <span className="float-right">92%</span></p>
                    <p className="pl-4">• Latency: <span className="float-right">180ms</span></p>
                    <p className="pl-4">• Uptime: <span className="float-right">99.8%</span></p>
                </div>
              </div>

              <div className="border border-gray-300 p-6 rounded-lg bg-white shadow-sm">
                <label className="block text-sm font-bold mb-2 text-gray-700">Choose Provider</label>
                <div className="border border-gray-300 rounded-lg p-2.5 mb-4 flex justify-between items-center text-sm bg-white">
                    <span>Gemini</span> <span className="text-gray-400">▼</span>
                </div>
                <p className="text-xs font-bold mb-4 text-gray-500">Provider Selected : Gemini</p>
                
                <label className="block text-sm font-bold mb-1 text-gray-700">Input API key</label>
                <input type="password" value="sk-***************************" readOnly className="w-full border border-gray-300 rounded-lg p-2.5 mb-6 text-sm bg-gray-50" />

                <h4 className="font-bold text-sm mb-2 text-gray-700">Model Parameters</h4>
                <div className="space-y-1 text-sm font-mono border-l-2 border-gray-800 pl-2 text-gray-600">
                    <p>| Temperature: [ 0.7 ]</p>
                    <p>| Max Tokens: [ 2048 ]</p>
                    <p>| Top_p:     [ 1.0 ]</p>
                </div>

                <div className="mt-6 space-y-2">
                    <button className="w-full bg-gray-700 text-white text-sm font-bold py-2.5 rounded-lg hover:bg-gray-800 transition-colors">Verify API Key & Connection</button>
                    <button className="w-full bg-gray-500 text-white text-sm font-bold py-2.5 rounded-lg hover:bg-gray-600 transition-colors">Retry</button>
                </div>
              </div>

              <div className="border border-gray-300 p-6 rounded-lg font-mono text-sm bg-white shadow-sm">
                 <h4 className="font-bold mb-4 uppercase text-green-600">Deployment Successful</h4>
                 <div className="space-y-2 text-gray-800">
                     <p>| • New Model Activated: GPT-Model-v3.3</p>
                     <p>| • Deployment Time: 12 seconds</p>
                     <p>| • Logs saved to: system/logs/model_deploy_2025.log</p>
                     <p className="text-gray-300 my-2">------------------------------------</p>
                     <p className="flex items-center gap-2 font-bold"><CheckCircle className="h-4 w-4 text-green-600" /> API Key Valid</p>
                     <p className="flex items-center gap-2 font-bold"><CheckCircle className="h-4 w-4 text-green-600" /> Connection Successful</p>
                     <p className="flex items-center gap-2 font-bold"><CheckCircle className="h-4 w-4 text-green-600" /> Provider Ready for Use</p>
                 </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'tuning' && (
           <div>
              <div className="flex items-center gap-4 mb-8">
                  <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                    <Bot className="h-5 w-5 text-white" />
                  </div>
                  <h2 className="text-xl font-bold text-gray-900">Adjust Tuning Parameters</h2>
              </div>

              <div className="grid md:grid-cols-2 gap-8">
                  <div className="border border-gray-200 p-6 rounded-lg">
                      <div className="border-2 border-dashed border-gray-300 h-48 flex items-center justify-center mb-6 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors cursor-pointer">
                          <p className="font-bold text-gray-500">[choose a csv file or drag and drop]</p>
                      </div>

                      <h4 className="font-bold text-gray-600 mb-4 uppercase text-sm">Model Fine-Tuning Overview</h4>
                      <div className="font-mono text-sm space-y-2 border-l-2 border-gray-800 pl-4 mb-8 text-gray-700">
                          <p>| Base Model:      GPT-Model-v3.2</p>
                          <p>| Fine-Tuning Status: <span className="text-green-600 font-bold">READY</span></p>
                          <p>| Last Calibration: 09 Nov 2025</p>
                      </div>

                      <div className="flex gap-3">
                          <button className="flex-1 bg-gray-700 text-white text-sm font-bold py-2.5 rounded-lg hover:bg-gray-800 transition-colors">Retrain</button>
                          <button className="flex-1 bg-white border border-gray-300 text-gray-700 text-sm font-bold py-2.5 rounded-lg hover:bg-gray-50 transition-colors">View Training History</button>
                      </div>
                  </div>

                  {/* Test Panel */}
                  <div className="border border-gray-300 rounded-lg p-4 min-h-[400px] flex flex-col relative bg-gray-50">
                      <p className="absolute -top-3 left-4 text-xs font-bold bg-white px-2 text-gray-500">Test Chatbot Responses</p>
                      
                      <div className="flex items-start gap-2 mb-4 mt-2">
                          <div className="w-6 h-6 bg-blue-600 rounded flex items-center justify-center flex-shrink-0">
                              <Bot className="h-3 w-3 text-white" />
                          </div>
                          <div className="bg-white border border-gray-200 p-3 rounded-lg rounded-tl-none shadow-sm text-sm font-medium text-gray-700">
                              sending a test message...
                          </div>
                      </div>
                      
                      <div className="mt-auto">
                        <div className="flex gap-2 bg-white border border-gray-300 p-2 rounded-lg shadow-sm">
                            <input type="text" placeholder="Type a test message..." className="flex-1 outline-none text-sm px-2 font-medium bg-transparent" />
                            <button className="bg-gray-700 text-white text-xs px-4 py-1.5 rounded-md font-bold uppercase hover:bg-gray-800 transition-colors">send</button>
                        </div>
                      </div>
                  </div>
              </div>
           </div>
        )}
      </div>
    </div>
  );
};
