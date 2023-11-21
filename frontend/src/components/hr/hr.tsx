import { colors } from '../../utils/constants';

interface HrProps extends React.HtmlHTMLAttributes<HTMLHRElement> {
  color?: keyof typeof colors;
  className?: string;
}

const hrColors = {
  transparent: 'bg-transparent',
  'text-primary': 'bg-text-primary',
  'text-secondary': 'bg-text-secondary',
  'contour-primary': 'bg-contour-primary',
  'point-green': 'bg-point-green',
  'point-yellow': 'bg-point-yellow',
  'point-blue': 'bg-point-blue',
  'point-lavender': 'bg-point-lavender',
  'point-red': 'bg-point-red',
  'surface-primary': 'bg-surface-primary',
};

function Hr(props: HrProps) {
  const { color, className, ...hrProps } = props;

  return (
    <hr
      {...hrProps}
      className={`h-[0.0625rem] w-full border-[0] ${
        hrColors[color || 'text-primary']
      } ${className || ''}`}
    />
  );
}

export default Hr;
