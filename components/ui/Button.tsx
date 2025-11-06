// Button Component gemäß Masterplan Design System

import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'disabled';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  children,
  className = '',
  disabled,
  ...props
}) => {
  const baseStyles = 'font-semibold rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2';
  
  const variantStyles = {
    primary: disabled 
      ? 'bg-gray-400 text-gray-600 cursor-not-allowed' 
      : 'bg-[var(--color-temple-gold)] text-white hover:bg-[var(--color-temple-gold-dark)] focus:ring-[var(--color-temple-gold)] temple-shadow',
    secondary: disabled
      ? 'bg-gray-400 text-gray-600 cursor-not-allowed'
      : 'bg-[var(--color-temple-blue)] text-white hover:bg-[var(--color-temple-blue-dark)] focus:ring-[var(--color-temple-blue)]',
    disabled: 'bg-gray-400 text-gray-600 cursor-not-allowed',
  };
  
  const sizeStyles = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-base',
    lg: 'px-6 py-3 text-lg',
  };
  
  const finalVariant = disabled ? 'disabled' : variant;
  
  return (
    <button
      className={`${baseStyles} ${variantStyles[finalVariant]} ${sizeStyles[size]} ${className}`}
      disabled={disabled || variant === 'disabled'}
      {...props}
    >
      {children}
    </button>
  );
};

