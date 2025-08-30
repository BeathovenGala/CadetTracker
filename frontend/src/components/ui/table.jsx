import * as React from 'react';
import { cn } from '../../lib/utils';

// Wrap the table in a div to allow horizontal scrolling on small screens
export const Table = React.forwardRef(({ className, ...props }, ref) => (
  <div className={cn("w-full overflow-x-auto", className)} ref={ref} {...props} />
));

export const TableHeader = React.forwardRef(({ className, ...props }, ref) => (
  <thead className={cn("bg-gray-50", className)} ref={ref} {...props} />
));
export const TableBody = React.forwardRef(({ className, ...props }, ref) => (
  <tbody className={cn(className)} ref={ref} {...props} />
));
export const TableRow = React.forwardRef(({ className, ...props }, ref) => (
  <tr className={cn("border-b last:border-b-0", className)} ref={ref} {...props} />
));
export const TableHead = React.forwardRef(({ className, ...props }, ref) => (
  <th
    className={cn("px-4 py-2 text-left text-sm font-semibold text-gray-900", className)}
    ref={ref}
    {...props}
  />
));
export const TableCell = React.forwardRef(({ className, ...props }, ref) => (
  <td
    className={cn("px-4 py-2 text-sm text-gray-700", className)}
    ref={ref}
    {...props}
  />
));
