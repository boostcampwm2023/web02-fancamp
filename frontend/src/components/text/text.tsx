import { colors } from '../../utils/constants';

interface TextProps {
  children: React.ReactNode;
  size?: 12 | 14 | 20;
  color?: keyof typeof colors;
  classList?: string;
}

const Text = ({
  children,
  size = 14,
  color = 'text-primary',
  classList,
}: TextProps) => {
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

  return (
    <span
      className={`${fontSizes[size]} ${fontColors[color]} ${classList} smooth-transition`}
    >
      {children}
    </span>
  );
};

export default Text;
