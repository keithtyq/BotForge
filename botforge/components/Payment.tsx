import React from 'react';
import { PageView } from '../types';
import { Bot, CreditCard } from 'lucide-react';

interface PaymentProps {
  onPaymentSuccess: () => void;
}

export const Payment: React.FC<PaymentProps> = ({ onPaymentSuccess }) => {
  return (
    <div className="py-12 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex flex-col items-center mb-10">
        <div className="flex items-center gap-2 mb-4">
          <div className="bg-blue-600 p-2 rounded-lg">
            <Bot className="h-8 w-8 text-white" />
          </div>
          <span className="text-3xl font-bold text-gray-900">BotForge</span>
        </div>
        <h1 className="text-3xl text-gray-900">Choose Your Subscription Plan</h1>
      </div>

      {/* Plan Cards */}
      <div className="grid md:grid-cols-3 gap-6 mb-12">
        {/* Standard */}
        <div className="border border-gray-400 p-6 rounded bg-white flex flex-col items-center">
          <h2 className="text-xl font-bold text-gray-900 mb-1">Standard</h2>
          <div className="flex items-baseline mb-4">
            <span className="text-4xl font-light text-gray-900">$10</span>
            <span className="text-gray-600 ml-1">monthly</span>
          </div>
          <button className="w-full bg-blue-400 text-white font-medium py-2 px-4 rounded mb-4 text-sm">Subscribe</button>
          <ul className="text-xs text-gray-700 space-y-1 w-full">
            <li>• 300 conversations/month</li>
            <li>• Best for small teams or startups</li>
            <li>• Covers essential chatbot features</li>
          </ul>
        </div>

        {/* Pro */}
        <div className="border-2 border-blue-400 p-6 rounded bg-white flex flex-col items-center transform scale-105 shadow-xl relative z-10">
          <h2 className="text-xl font-bold text-gray-900 mb-1">Pro</h2>
          <div className="flex items-baseline mb-4">
            <span className="text-4xl font-light text-gray-900">$25</span>
            <span className="text-gray-600 ml-1">monthly</span>
          </div>
          <button className="w-full bg-blue-400 text-white font-medium py-2 px-4 rounded mb-4 text-sm">Subscribe</button>
          <ul className="text-xs text-gray-700 space-y-1 w-full">
            <li>• 1500 conversations/month</li>
            <li>• Ideal for growing businesses</li>
            <li>• Includes enhanced analytics</li>
          </ul>
        </div>

        {/* Deluxe */}
        <div className="border border-gray-400 p-6 rounded bg-white flex flex-col items-center">
          <h2 className="text-xl font-bold text-gray-900 mb-1">Deluxe</h2>
          <div className="flex items-baseline mb-4">
            <span className="text-4xl font-light text-gray-900">$50</span>
            <span className="text-gray-600 ml-1">monthly</span>
          </div>
          <button className="w-full bg-blue-400 text-white font-medium py-2 px-4 rounded mb-4 text-sm">Subscribe</button>
          <ul className="text-xs text-gray-700 space-y-1 w-full">
            <li>• 5000 conversations/month</li>
            <li>• Designed for large organizations</li>
            <li>• Full access to premium & enterprise features</li>
          </ul>
        </div>
      </div>

      {/* Payment Form */}
      <div className="max-w-md mx-auto border border-gray-400 rounded-lg bg-white overflow-hidden">
        <div className="py-4 border-b border-gray-300 text-center">
          <h2 className="text-xl font-normal text-gray-800">Your Payment Details</h2>
        </div>
        
        <div className="p-8">
            <div className="flex justify-center gap-4 mb-6">
                <div className="text-blue-900 font-bold italic text-2xl">VISA</div>
                <div className="relative h-8 w-12 bg-gray-100 rounded">
                    <div className="absolute top-2 left-2 w-4 h-4 rounded-full bg-red-500 opacity-75"></div>
                    <div className="absolute top-2 right-4 w-4 h-4 rounded-full bg-yellow-500 opacity-75"></div>
                </div>
            </div>

            <div className="space-y-4">
                <div>
                    <label className="block text-xs font-semibold text-gray-600 uppercase mb-1">Name on Card:</label>
                    <input type="text" className="w-full border border-gray-400 rounded p-1.5" />
                </div>
                <div>
                    <label className="block text-xs font-semibold text-gray-600 uppercase mb-1">Card Number:</label>
                    <input type="text" className="w-full border border-gray-400 rounded p-1.5" />
                </div>
                
                <div className="flex gap-4">
                    <div className="w-1/2">
                        <label className="block text-xs font-semibold text-gray-600 uppercase mb-1">Expiry Date:</label>
                        <input type="text" placeholder="MM/YY" className="w-full border border-gray-400 rounded p-1.5" />
                    </div>
                    <div className="w-1/2">
                        <label className="block text-xs font-semibold text-gray-600 uppercase mb-1">CVV:</label>
                        <input type="text" className="w-full border border-gray-400 rounded p-1.5" />
                    </div>
                </div>

                <div className="flex justify-between items-center pt-4 pb-4">
                    <div>
                        <p className="font-bold text-gray-800">Plan: Standard</p>
                    </div>
                    <div>
                        <p className="font-bold text-gray-800">Price: $10</p>
                    </div>
                </div>

                <div className="flex justify-center">
                    <button 
                        onClick={onPaymentSuccess}
                        className="bg-white border border-gray-600 text-gray-800 font-bold py-2 px-10 rounded text-sm hover:bg-gray-50 transition-colors"
                    >
                        Pay Now
                    </button>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
};