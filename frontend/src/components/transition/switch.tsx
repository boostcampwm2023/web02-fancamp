import { useEffect, useRef, useState } from 'react';
import {
  leftFadeinAnimation,
  leftFadeoutAnimation,
  rightFadeinAnimation,
  rightFadeoutAnimation,
  topFadeinAnimation,
  topFadeoutAnimation,
  bottomFadeinAnimation,
  bottomFadeoutAnimation,
} from './animation';

interface TransitionProps {
  children: React.ReactNode;
  className?: string;
  direction?: 'right' | 'left' | 'bottom' | 'top';
  dynamic?: any;
}

function Switch({
  children,
  className = '',
  direction = 'right',
  dynamic,
}: TransitionProps) {
  const [currIndex, setCurrIndex] = useState<number>(0);
  const [children1, setChildren1] = useState<React.ReactNode>(null);
  const [children2, setChildren2] = useState<React.ReactNode>(null);
  const ref1 = useRef<HTMLDivElement>(null);
  const ref2 = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (currIndex === 0) {
      setCurrIndex(1);
      setChildren1(children);
      if (ref1.current && ref2.current) {
        if (direction === 'right') {
          ref1.current.animate(...rightFadeinAnimation);
          ref2.current.animate(...rightFadeoutAnimation);
        } else if (direction === 'left') {
          ref1.current.animate(...leftFadeinAnimation);
          ref2.current.animate(...leftFadeoutAnimation);
        } else if (direction === 'bottom') {
          ref1.current.animate(...bottomFadeinAnimation);
          ref2.current.animate(...bottomFadeoutAnimation);
        } else if (direction === 'top') {
          ref1.current.animate(...topFadeinAnimation);
          ref2.current.animate(...topFadeoutAnimation);
        }
        ref2.current.addEventListener('animationend', () => {
          setChildren2(null);
        });
      }
    } else {
      setCurrIndex(0);
      setChildren2(children);
      if (ref1.current && ref2.current) {
        if (direction === 'right') {
          ref1.current.animate(...rightFadeoutAnimation);
          ref2.current.animate(...rightFadeinAnimation);
        } else if (direction === 'left') {
          ref1.current.animate(...leftFadeoutAnimation);
          ref2.current.animate(...leftFadeinAnimation);
        } else if (direction === 'bottom') {
          ref1.current.animate(...bottomFadeoutAnimation);
          ref2.current.animate(...bottomFadeinAnimation);
        } else if (direction === 'top') {
          ref1.current.animate(...topFadeoutAnimation);
          ref2.current.animate(...topFadeinAnimation);
        }
        ref1.current.addEventListener('animationend', () => {
          setChildren1(null);
        });
      }
    }
  }, [dynamic || children]);

  return (
    <div className={`flex flex-row flex-nowrap ${className}`}>
      <div ref={ref1} className="border-box w-[100%] flex-none">
        {children1}
      </div>
      <div ref={ref2} className="border-box ml-[-100%] w-[100%] flex-none">
        {children2}
      </div>
    </div>
  );
}

export default Switch;
