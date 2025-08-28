
import React from 'react';

export const Input = ({ className, ...props }) => (
    <input
        className={`mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm ${className}`}
        {...props}
    />
);
