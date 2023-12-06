interface IconProps {
  width?: number;
  height?: number;
  className?: string;
  children: React.ReactNode;
}

const iconClassName = 'bg-surface-primary flex items-center justify-center';

function Icon({
  width = 28,
  height = 28,
  className = '',
  children,
}: IconProps) {
  return (
    <div className={`${iconClassName} ${className}`} style={{ width, height }}>
      {children}
    </div>
  );
}

export default Icon;
