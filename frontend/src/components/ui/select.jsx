

import React, { useState } from 'react';

export const Select = ({ onValueChange, children, ...props }) => {
    const [open, setOpen] = useState(false);
    const [value, setValue] = useState(props.value || '');
    return (
        <div className="relative">
            <SelectTrigger onClick={() => setOpen(!open)} className="w-full">
                <SelectValue placeholder={props.placeholder} value={value} />
            </SelectTrigger>
            {open && (
                <SelectContent className="absolute z-10 w-full bg-white border border-gray-200 rounded-md shadow-lg mt-1">
                    {React.Children.map(children, child =>
                        React.cloneElement(child, {
                            onClick: () => {
                                setValue(child.props.value);
                                onValueChange(child.props.value);
                                setOpen(false);
                            }
                        })
                    )}
                </SelectContent>
            )}
        </div>
    );
};

export const SelectTrigger = ({ children, onClick, className }) => (
    <button type="button" onClick={onClick} className={`flex items-center justify-between w-full px-3 py-2 text-sm border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${className}`}>
        {children}
    </button>
);

export const SelectValue = ({ placeholder, value }) => (
    <span>{value || placeholder}</span>
);

export const SelectContent = ({ children, className }) => (
    <div className={`py-1 ${className}`}>
        {children}
    </div>
);

export const SelectItem = ({ value, children, onClick }) => (
    <div onClick={onClick} className="py-2 px-3 text-sm hover:bg-gray-100 cursor-pointer">
        {children}
    </div>
);
