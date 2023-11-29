import { TailSpin } from 'react-loader-spinner';

interface SpinnerProps {
  width?: number;
  height?: number;
  className?: string;
  color?: string;
}

function Spinner({ width, height, className, color }: SpinnerProps) {
  return (
    <TailSpin
      height={height || '32'}
      width={width || '32'}
      color={color || '#0087E9'}
      ariaLabel="loading-spinner"
      radius="1"
      wrapperStyle={{}}
      wrapperClass={`relative w-fit ${className || ''}`}
      visible
    />
  );
}

export default Spinner;
