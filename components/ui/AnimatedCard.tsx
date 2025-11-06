// Animated Card Component gemäß Masterplan

'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardHeader, CardTitle, CardDescription } from './Card';

interface AnimatedCardProps {
  children: React.ReactNode;
  hover?: boolean;
  className?: string;
}

export const AnimatedCard: React.FC<AnimatedCardProps> = ({
  children,
  hover = false,
  className = '',
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      whileHover={hover ? { scale: 1.02, y: -5 } : {}}
      className={className}
    >
      <Card className="h-full">{children}</Card>
    </motion.div>
  );
};

