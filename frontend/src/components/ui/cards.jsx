

import React from 'react';

export const Card = ({ children, className }) => (
    <div className={`bg-white rounded-xl shadow-lg ${className}`}>
        {children}
    </div>
);

export const CardHeader = ({ children, className }) => (
    <div className={`p-6 ${className}`}>
        {children}
    </div>
);

export const CardTitle = ({ children, className }) => (
    <h3 className={`text-2xl font-semibold ${className}`}>
        {children}
    </h3>
);

export const CardDescription = ({ children, className }) => (
    <p className={`text-sm text-gray-500 ${className}`}>
        {children}
    </p>
);

export const CardContent = ({ children, className }) => (
    <div className={`p-6 ${className}`}>
        {children}
    </div>
);

export const CardFooter = ({ children, className }) => (
    <div className={`p-6 flex ${className}`}>
        {children}
    </div>
);
