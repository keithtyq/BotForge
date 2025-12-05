import React from 'react';

export const FAQPage: React.FC = () => {
  const faqs = [
    "How does the conversation limit work?",
    "Do I need technical knowledge to build a chatbot?",
    "Can I customize the chatbot to fit my company branding?",
    "What integrations are supported?",
    "Is my data secure?"
  ];

  return (
    <div className="py-20 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      <h1 className="text-4xl font-medium text-center text-gray-900 mb-20">Frequently Asked Questions</h1>
      
      <h2 className="text-2xl font-normal text-gray-800 mb-8">Top 5 FAQ</h2>
      
      <div className="space-y-8">
        {faqs.map((question, idx) => (
          <div key={idx} className="border-b border-gray-400 pb-2">
            <p className="text-gray-800 text-lg hover:text-blue-600 cursor-pointer transition-colors">
              {question}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};