import * as React from 'react';
import * as SelectPrimitive from '@radix-ui/react-select';
import { cn } from '../../lib/utils';
import { ChevronDown, ChevronUp } from 'lucide-react';

export const Select = SelectPrimitive.Root;
export const SelectGroup = SelectPrimitive.Group;
export const SelectItem = React.forwardRef(({ className, ...props }, ref) => (
  <SelectPrimitive.Item
    ref={ref}
    className={cn("px-2 py-1 rounded-md text-sm text-gray-700 hover:bg-gray-100", className)}
    {...props}
  />
));
export const SelectLabel = React.forwardRef(({ className, ...props }, ref) => (
  <SelectPrimitive.Label
    ref={ref}
    className={cn("px-2 py-1 text-xs font-semibold uppercase text-gray-500", className)}
    {...props}
  />
));
export const SelectTrigger = React.forwardRef(({ className, children, ...props }, ref) => (
  <SelectPrimitive.Trigger
    ref={ref}
    className={cn(
      "flex items-center justify-between w-full rounded-md border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary",
      className
    )}
    {...props}
  >
    {children}
    <ChevronDown className="ml-2 h-4 w-4 text-gray-500" />
  </SelectPrimitive.Trigger>
));
export const SelectValue = SelectPrimitive.Value;
export const SelectContent = React.forwardRef(({ className, children, ...props }, ref) => (
  <SelectPrimitive.Content
    ref={ref}
    className={cn("mt-1 rounded-md border bg-white p-1 shadow-lg", className)}
    {...props}
  >
    <SelectPrimitive.Viewport>{children}</SelectPrimitive.Viewport>
  </SelectPrimitive.Content>
));
export const SelectScrollUpButton = SelectPrimitive.ScrollUpButton;
export const SelectScrollDownButton = SelectPrimitive.ScrollDownButton;
