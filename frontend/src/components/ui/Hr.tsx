import { COLORS } from '@constants/colors';

interface HrProps extends React.HtmlHTMLAttributes<HTMLHRElement> {
  color?: keyof typeof COLORS;
  className?: string;
  children?: React.ReactNode;
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
  const { color, className, children, ...hrProps } = props;

  return (
    <div className="flex items-center gap-md">
      <div
        {...hrProps}
        className={`h-[0.0625rem] flex-1 ${hrColors[color || 'text-primary']} ${
          className || ''
        }`}
      />
      {children}
      <div
        {...hrProps}
        className={`h-[0.0625rem] flex-1 ${hrColors[color || 'text-primary']} ${
          className || ''
        }`}
      />
    </div>
  );
}

export default Hr;
