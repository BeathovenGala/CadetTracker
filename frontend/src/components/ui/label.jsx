import React from 'react';

export const Label = ({ children, htmlFor }) => (
    <label htmlFor={htmlFor} className="block text-sm font-medium text-gray-700">
        {children}
    </label>
);
