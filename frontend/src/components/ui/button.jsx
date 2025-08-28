import React from 'react';

export const Button = ({ children, className, variant, ...props }) => (
    <button
        className={`inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 ${variant === 'link' ? 'text-blue-600 hover:underline' : 'bg-blue-600 text-white hover:bg-blue-700'} ${className}`}
        {...props}
    >
        {children}
    </button>
);