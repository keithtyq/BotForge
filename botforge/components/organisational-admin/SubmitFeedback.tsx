import React, { useState } from 'react';
import { ArrowLeft, Star, ChevronDown } from 'lucide-react';

interface SubmitFeedbackProps {
  onBack: () => void;
}

export const SubmitFeedback: React.FC<SubmitFeedbackProps> = ({ onBack }) => {
  const [rating, setRating] = useState(0);

  return (
    <div className="animate-in fade-in duration-500">
        <button onClick={onBack} className="text-gray-500 hover:text-gray-900 text-sm flex items-center mb-6 font-medium transition-colors">
            <ArrowLeft className="w-4 h-4 mr-2" /> Back to Dashboard
        </button>

        <h2 className="text-2xl font-bold text-center text-gray-800 mb-10">Submit Feedback</h2>

        <div className="bg-white border border-gray-300 rounded-xl p-6 mb-6 shadow-sm max-w-2xl mx-auto">
            <label className="block text-sm font-bold text-gray-700 mb-3">Feedback Purpose</label>
            <div className="relative">
                <select className="w-full appearance-none border border-gray-300 rounded-lg py-2 px-4 text-gray-500 text-sm bg-white outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500">
                    <option>--- Select Purpose ---</option>
                    <option>Bug Report</option>
                    <option>Feature Request</option>
                    <option>General Feedback</option>
                </select>
                <div className="absolute right-3 top-2.5 pointer-events-none">
                    <ChevronDown className="w-4 h-4 text-gray-400" />
                </div>
            </div>
        </div>

        <div className="bg-white border border-gray-300 rounded-xl p-6 mb-8 shadow-sm max-w-2xl mx-auto">
            <label className="block text-sm font-bold text-gray-700 mb-3">Comments</label>
            <textarea 
                className="w-full h-32 border border-gray-300 rounded-lg p-4 text-sm text-gray-600 outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 resize-none"
                placeholder="Write your comments here"
            ></textarea>
        </div>

        <div className="text-center mb-10">
            <p className="text-sm font-bold text-gray-700 mb-4">Rate your experience</p>
            <div className="flex justify-center gap-4">
                {[1, 2, 3, 4, 5].map((star) => (
                    <button 
                        key={star} 
                        onClick={() => setRating(star)}
                        className={`p-2 rounded-full border transition-all ${rating >= star ? 'border-yellow-400 bg-yellow-50' : 'border-gray-300 bg-white hover:border-gray-400'}`}
                    >
                        <Star className={`w-6 h-6 ${rating >= star ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`} />
                    </button>
                ))}
            </div>
        </div>

        <div className="flex justify-center">
             <button onClick={onBack} className="bg-gray-800 text-white font-bold py-2 px-8 rounded-lg text-sm hover:bg-gray-700 transition-colors shadow-md">
                Submit Feedback
            </button>
        </div>
    </div>
  );
};