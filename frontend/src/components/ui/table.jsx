import React from 'react';

export const Table = ({ children, className }) => <table className={`w-full ${className}`}>{children}</table>;
export const TableBody = ({ children, className }) => <tbody className={className}>{children}</tbody>;
export const TableCell = ({ children, className }) => <td className={`p-2 border-b ${className}`}>{children}</td>;
export const TableHead = ({ children, className }) => <th className={`p-2 border-b text-left font-semibold ${className}`}>{children}</th>;
export const TableHeader = ({ children, className }) => <thead className={className}>{children}</thead>;
export const TableRow = ({ children, className }) => <tr className={className}>{children}</tr>;
