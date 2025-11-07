// Button Component - ENHANCED mit Micro-Interactions
// Hover, Click, Loading States für bessere UX

'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'disabled' | 'danger' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
  isLoading?: boolean;
  icon?: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  children,
  className = '',
  disabled,
  isLoading = false,
  icon,
  ...props
}) => {
  const baseStyles = 'font-semibold rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 inline-flex items-center justify-center gap-2';
  
  const isDisabled = disabled || isLoading || variant === 'disabled';
  
  const variantStyles = {
    primary: isDisabled
      ? 'bg-gray-400 text-gray-600 cursor-not-allowed' 
      : 'bg-[var(--color-temple-gold)] text-white hover:bg-[var(--color-temple-gold-dark)] focus:ring-[var(--color-temple-gold)] temple-shadow',
    secondary: isDisabled
      ? 'bg-gray-400 text-gray-600 cursor-not-allowed'
      : 'bg-[var(--color-temple-blue)] text-white hover:bg-[var(--color-temple-blue-dark)] focus:ring-[var(--color-temple-blue)]',
    danger: isDisabled
      ? 'bg-gray-400 text-gray-600 cursor-not-allowed'
      : 'bg-red-600 text-white hover:bg-red-700 focus:ring-red-600',
    ghost: isDisabled
      ? 'bg-gray-400 text-gray-600 cursor-not-allowed'
      : 'bg-transparent text-[var(--text-primary)] hover:bg-gray-100 dark:hover:bg-gray-800',
    disabled: 'bg-gray-400 text-gray-600 cursor-not-allowed',
  };
  
  const sizeStyles = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-base',
    lg: 'px-6 py-3 text-lg',
  };
  
  return (
    <motion.button
      whileHover={!isDisabled ? { scale: 1.05 } : {}}
      whileTap={!isDisabled ? { scale: 0.95 } : {}}
      className={`${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${className}`}
      disabled={isDisabled}
      {...props}
    >
      {isLoading ? (
        <>
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
            className="w-5 h-5 border-2 border-current border-t-transparent rounded-full"
          />
          <span>Lädt...</span>
        </>
      ) : (
        <>
          {icon}
          {children}
        </>
      )}
    </motion.button>
  );
};

