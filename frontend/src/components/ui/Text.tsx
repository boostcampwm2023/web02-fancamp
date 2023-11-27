import { COLORS } from '@constants/colors';
import React from 'react';

interface TextProps extends React.HtmlHTMLAttributes<HTMLSpanElement> {
  children: React.ReactNode;
  size?: 12 | 14 | 20;
  weight?: 400 | 300;
  color?: keyof typeof COLORS;
  className?: string;
}

const font = {
  12: {
    300: 'display-light-12',
    400: 'display-regular-12',
  },
  14: {
    300: 'display-light-14',
    400: 'display-regular-14',
  },
  20: {
    300: 'display-light-20',
    400: 'display-regular-20',
  },
};

const fontColors = {
  transparent: 'text-transparent',
  'text-primary': 'text-text-primary',
  'text-secondary': 'text-text-secondary',
  'contour-primary': 'text-contour-primary',
  'point-green': 'text-point-green',
  'point-yellow': 'text-point-yellow',
  'point-blue': 'text-point-blue',
  'point-lavender': 'text-point-lavender',
  'point-red': 'text-point-red',
  'surface-primary': 'text-surface-primary',
};

function Text(props: TextProps) {
  const { children, size, weight, color, className, ...textProps } = props;

  return (
    <span
      {...textProps}
      className={`smooth-transition ${font[size || 14][weight || 400]} ${
        fontColors[color || 'text-primary']
      } ${className || ''} `}
    >
      {children}
    </span>
  );
}

export default Text;
