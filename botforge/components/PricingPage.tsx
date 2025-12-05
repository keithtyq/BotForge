import React from 'react';
import { PageView } from '../types';

interface PricingPageProps {
  onNavigate: (page: PageView) => void;
}

export const PricingPage: React.FC<PricingPageProps> = ({ onNavigate }) => {
  return (
    <div className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <h1 className="text-4xl font-bold text-center text-gray-900 mb-16">Plans & Pricing</h1>

      <div className="grid md:grid-cols-3 gap-8">
        {/* Standard */}
        <div className="border border-gray-400 p-8 rounded bg-white flex flex-col items-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Standard</h2>
          <div className="flex items-baseline mb-8">
            <span className="text-5xl font-light text-gray-900">$10</span>
            <span className="text-gray-600 ml-2">monthly</span>
          </div>

          <button 
            onClick={() => onNavigate(PageView.REGISTER)}
            className="w-full bg-blue-400 hover:bg-blue-500 text-white font-bold py-3 px-4 rounded mb-8 transition-colors"
          >
            Get Started
          </button>

          <ul className="text-sm text-gray-700 space-y-2 w-full">
            <li className="flex items-start">• <span className="ml-2">300 conversations/month</span></li>
            <li className="flex items-start">• <span className="ml-2">Best for small teams or startups</span></li>
            <li className="flex items-start">• <span className="ml-2">Covers essential chatbot features</span></li>
          </ul>
        </div>

        {/* Pro */}
        <div className="border border-gray-400 p-8 rounded bg-white flex flex-col items-center relative transform md:-translate-y-4 shadow-lg">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Pro</h2>
          <div className="flex items-baseline mb-8">
            <span className="text-5xl font-light text-gray-900">$25</span>
            <span className="text-gray-600 ml-2">monthly</span>
          </div>

          <button 
            onClick={() => onNavigate(PageView.REGISTER)}
            className="w-full bg-blue-400 hover:bg-blue-500 text-white font-bold py-3 px-4 rounded mb-8 transition-colors"
          >
            Get Started
          </button>

          <ul className="text-sm text-gray-700 space-y-2 w-full">
            <li className="flex items-start">• <span className="ml-2">1500 conversations/month</span></li>
            <li className="flex items-start">• <span className="ml-2">Ideal for growing businesses</span></li>
            <li className="flex items-start">• <span className="ml-2">Includes enhanced analytics</span></li>
          </ul>
        </div>

        {/* Deluxe */}
        <div className="border border-gray-400 p-8 rounded bg-white flex flex-col items-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Deluxe</h2>
          <div className="flex items-baseline mb-8">
            <span className="text-5xl font-light text-gray-900">$50</span>
            <span className="text-gray-600 ml-2">monthly</span>
          </div>

          <button 
            onClick={() => onNavigate(PageView.REGISTER)}
            className="w-full bg-blue-400 hover:bg-blue-500 text-white font-bold py-3 px-4 rounded mb-8 transition-colors"
          >
            Get Started
          </button>

          <ul className="text-sm text-gray-700 space-y-2 w-full">
            <li className="flex items-start">• <span className="ml-2">5000 conversations/month</span></li>
            <li className="flex items-start">• <span className="ml-2">Designed for large organizations</span></li>
            <li className="flex items-start">• <span className="ml-2">Full access to premium & enterprise features</span></li>
          </ul>
        </div>
      </div>
    </div>
  );
};