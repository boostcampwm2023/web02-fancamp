import { COLORS } from '@constants/colors';
import React from 'react';

interface TextProps extends React.HtmlHTMLAttributes<HTMLSpanElement> {
  children?: React.ReactNode;
  size?: 13 | 14 | 16 | 20;
  weight?: 100 | 300 | 400;
  color?: keyof typeof COLORS;
  className?: string;
}

const font = {
  '13/100': 'display-thin-13',
  '13/300': 'display-light-13',
  '13/400': 'display-regular-13',
  '14/100': 'display-thin-14',
  '14/300': 'display-light-14',
  '14/400': 'display-regular-14',
  '16/100': 'display-thin-16',
  '16/300': 'display-light-16',
  '16/400': 'display-regular-16',
  '20/100': 'display-thin-20',
  '20/300': 'display-light-20',
  '20/400': 'display-regular-20',
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
  const {
    children,
    size = 14,
    weight = 400,
    color,
    className,
    ...textProps
  } = props;
  const fontClass = font[`${size}/${weight}`];

  return (
    <span
      {...textProps}
      className={`w-fit smooth-transition ${fontClass} ${
        fontColors[color || 'text-primary']
      } ${className || ''} `}
    >
      {children}
    </span>
  );
}

export default Text;
