// components/ui/Milestone.js
import React from 'react';

export const Milestone = ({ title, description, completed, date }) => {
  return (
    <div className="flex items-start space-x-4 p-4">
      <div className={`rounded-full p-2 ${completed ? 'bg-green-100' : 'bg-gray-100'}`}>
        {completed ? (
          <svg className="w-6 h-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        ) : (
          <div className="w-6 h-6 rounded-full border-2 border-gray-300" />
        )}
      </div>
      <div className="flex-1">
        <h4 className="text-lg font-semibold text-gray-900">{title}</h4>
        <p className="text-gray-600 mt-1">{description}</p>
        <span className="text-sm text-gray-500 mt-2 block">{date}</span>
      </div>
    </div>
  );
};
