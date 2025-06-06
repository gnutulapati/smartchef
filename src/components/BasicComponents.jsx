import React from 'react';

// Basic Button Component
export const BasicButton = ({ 
  children, 
  onClick, 
  disabled = false, 
  variant = 'primary', 
  size = 'md',
  className = '',
  ...props 
}) => {
  const baseClasses = 'inline-flex items-center justify-center rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none';
  
  const variants = {
    primary: 'bg-blue-600 text-white hover:bg-blue-700',
    secondary: 'bg-gray-600 text-gray-100 hover:bg-gray-500',
    outline: 'border border-gray-500 bg-transparent text-gray-200 hover:bg-gray-700',
    destructive: 'bg-red-600 text-white hover:bg-red-700'
  };
  
  const sizes = {
    sm: 'h-9 px-3 text-sm',
    md: 'h-10 px-4 py-2',
    lg: 'h-11 px-8'
  };
  
  return (
    <button
      className={`${baseClasses} ${variants[variant]} ${sizes[size]} ${className}`}
      onClick={onClick}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
};

// Basic Input Component
export const BasicInput = ({
  type = 'text',
  placeholder,
  value,
  onChange,
  className = '',
  ...props
}) => {
  return (
    <input
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      className={`flex h-10 w-full rounded-md border border-gray-600 bg-gray-800 text-gray-100 px-3 py-2 text-sm ring-offset-gray-800 file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-gray-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 ${className}`}
      {...props}
    />
  );
};

// Basic Textarea Component
export const BasicTextarea = ({
  placeholder,
  value,
  onChange,
  rows = 3,
  className = '',
  ...props
}) => {
  return (
    <textarea
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      rows={rows}
      className={`flex min-h-[80px] w-full rounded-md border border-gray-600 bg-gray-800 text-gray-100 px-3 py-2 text-sm ring-offset-gray-800 placeholder:text-gray-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 ${className}`}
      {...props}
    />
  );
};

// Basic Select Component
export const BasicSelect = ({
  value,
  onChange,
  children,
  className = '',
  ...props
}) => {
  return (
    <select
      value={value}
      onChange={onChange}
      className={`flex h-10 w-full rounded-md border border-gray-600 bg-gray-800 text-gray-100 px-3 py-2 text-sm ring-offset-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 ${className}`}
      {...props}
    >
      {children}
    </select>
  );
};

// Basic Card Component
export const BasicCard = ({ children, className = '', ...props }) => {
  return (
    <div
      className={`rounded-lg border border-gray-700 bg-gray-800 text-gray-100 shadow-sm ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};

export const BasicCardHeader = ({ children, className = '', ...props }) => {
  return (
    <div className={`flex flex-col space-y-1.5 p-6 ${className}`} {...props}>
      {children}
    </div>
  );
};

export const BasicCardTitle = ({ children, className = '', ...props }) => {
  return (
    <h3 className={`text-2xl font-semibold leading-none tracking-tight text-gray-100 ${className}`} {...props}>
      {children}
    </h3>
  );
};

export const BasicCardContent = ({ children, className = '', ...props }) => {
  return (
    <div className={`p-6 pt-0 ${className}`} {...props}>
      {children}
    </div>
  );
};

// Basic Dialog Component
export const BasicDialog = ({
  open,
  onOpenChange,
  children
}) => {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div
        className="fixed inset-0 bg-black bg-opacity-70"
        onClick={() => onOpenChange(false)}
      />
      <div className="relative bg-gray-800 border border-gray-700 rounded-lg shadow-lg max-w-md w-full mx-4">
        {children}
      </div>
    </div>
  );
};

export const BasicDialogContent = ({ children, className = '', ...props }) => {
  return (
    <div className={`p-6 ${className}`} {...props}>
      {children}
    </div>
  );
};

export const BasicDialogHeader = ({ children, className = '', ...props }) => {
  return (
    <div className={`flex flex-col space-y-1.5 text-center sm:text-left ${className}`} {...props}>
      {children}
    </div>
  );
};

export const BasicDialogTitle = ({ children, className = '', ...props }) => {
  return (
    <h2 className={`text-lg font-semibold leading-none tracking-tight text-gray-100 ${className}`} {...props}>
      {children}
    </h2>
  );
};

export const BasicDialogFooter = ({ children, className = '', ...props }) => {
  return (
    <div className={`flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2 ${className}`} {...props}>
      {children}
    </div>
  );
};
