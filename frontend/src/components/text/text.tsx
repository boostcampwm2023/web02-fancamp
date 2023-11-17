import React from 'react';
import { colors } from '../../utils/constants';

interface TextProps extends React.HtmlHTMLAttributes<HTMLSpanElement> {
  children: React.ReactNode;
  size?: 12 | 14 | 20;
  color?: keyof typeof colors;
  classList?: string;
}

const fontSizes = {
  12: 'display-regular-12',
  14: 'display-regular-14',
  20: 'display-regular-20',
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
  'surface-primary': 'text-surface-primary',
};

const Text = (props: TextProps) => {
  const { children, size, color, ...textProps } = props;

  return (
    <span
      className={`smooth-transition ${fontSizes[size || 14]} ${
        fontColors[color || 'text-primary']
      } ${textProps.classList || ''} `}
    >
      {children}
    </span>
  );
};

export default Text;
