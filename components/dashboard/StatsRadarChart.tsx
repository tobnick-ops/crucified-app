// Stats Radar Chart - Visualisierung der 5 Character Stats
// Besser als Table-View, visuell ansprechend

'use client';

import React from 'react';

interface StatsRadarChartProps {
  stats: {
    faith: number;
    wisdom: number;
    knowledge: number;
    service: number;
    leadership: number;
  };
  maxValue?: number;
  size?: number;
  showLabels?: boolean;
}

export const StatsRadarChart: React.FC<StatsRadarChartProps> = ({
  stats,
  maxValue = 100,
  size = 300,
  showLabels = true,
}) => {
  const statLabels = [
    { key: 'faith', label: 'Faith', color: '#D4AF37' },
    { key: 'wisdom', label: 'Wisdom', color: '#3B82F6' },
    { key: 'knowledge', label: 'Knowledge', color: '#8B5CF6' },
    { key: 'service', label: 'Service', color: '#10B981' },
    { key: 'leadership', label: 'Leadership', color: '#EF4444' },
  ];

  const center = size / 2;
  const radius = (size / 2) - 40;
  const angleStep = (2 * Math.PI) / 5;

  // Calculate points for the polygon
  const getPoint = (value: number, index: number) => {
    const angle = angleStep * index - Math.PI / 2; // Start from top
    const normalizedValue = (value / maxValue) * radius;
    const x = center + normalizedValue * Math.cos(angle);
    const y = center + normalizedValue * Math.sin(angle);
    return { x, y };
  };

  // Generate polygon points
  const polygonPoints = statLabels.map((stat, index) => {
    const value = stats[stat.key as keyof typeof stats];
    const point = getPoint(value, index);
    return `${point.x},${point.y}`;
  }).join(' ');

  // Generate background grid circles
  const gridCircles = [0.2, 0.4, 0.6, 0.8, 1.0].map(scale => (
    <circle
      key={scale}
      cx={center}
      cy={center}
      r={radius * scale}
      fill="none"
      stroke="currentColor"
      strokeWidth="1"
      className="text-gray-200 dark:text-gray-700"
      opacity="0.3"
    />
  ));

  // Generate axis lines
  const axisLines = statLabels.map((_, index) => {
    const point = getPoint(maxValue, index);
    return (
      <line
        key={index}
        x1={center}
        y1={center}
        x2={point.x}
        y2={point.y}
        stroke="currentColor"
        strokeWidth="1"
        className="text-gray-300 dark:text-gray-600"
        opacity="0.5"
      />
    );
  });

  return (
    <div className="flex flex-col items-center">
      <svg width={size} height={size} className="overflow-visible">
        {/* Background Grid */}
        {gridCircles}
        {axisLines}

        {/* Stats Polygon */}
        <polygon
          points={polygonPoints}
          fill="url(#radarGradient)"
          fillOpacity="0.3"
          stroke="var(--color-temple-gold)"
          strokeWidth="2"
        />

        {/* Stat Points */}
        {statLabels.map((stat, index) => {
          const value = stats[stat.key as keyof typeof stats];
          const point = getPoint(value, index);
          return (
            <circle
              key={stat.key}
              cx={point.x}
              cy={point.y}
              r="5"
              fill={stat.color}
              stroke="white"
              strokeWidth="2"
            />
          );
        })}

        {/* Labels */}
        {showLabels && statLabels.map((stat, index) => {
          const labelPoint = getPoint(maxValue * 1.2, index); // Outside the chart
          const value = stats[stat.key as keyof typeof stats];
          
          return (
            <g key={`label-${stat.key}`}>
              <text
                x={labelPoint.x}
                y={labelPoint.y}
                textAnchor="middle"
                dominantBaseline="middle"
                className="text-sm font-medium fill-current"
                style={{ color: stat.color }}
              >
                {stat.label}
              </text>
              <text
                x={labelPoint.x}
                y={labelPoint.y + 16}
                textAnchor="middle"
                className="text-xs fill-current text-gray-600 dark:text-gray-400"
              >
                {value}
              </text>
            </g>
          );
        })}

        {/* Gradient Definition */}
        <defs>
          <linearGradient id="radarGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="var(--color-temple-gold)" stopOpacity="0.6" />
            <stop offset="100%" stopColor="var(--color-temple-blue-light)" stopOpacity="0.4" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
};

