import { useEffect, useRef, useState } from 'react';
import { AnimationObject } from './animation';

interface FadeProps {
  children: React.ReactNode;
  fadeIn: AnimationObject;
  fadeOut: AnimationObject;
}

function Fade(props: FadeProps) {
  const { children, fadeIn, fadeOut } = props;

  const [backupChildren, setBackupChildren] = useState<React.ReactNode>(null);
  const fadeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (fadeRef.current) {
      if (children && !backupChildren) {
        fadeRef.current.animate(...fadeIn);
        setBackupChildren(children);
      } else if (!children) {
        fadeRef.current.animate(...fadeOut);
        setTimeout(() => {
          setBackupChildren(null);
        }, 200);
      } else {
        setBackupChildren(children);
      }
    }
  }, [children]);

  return (
    <div className="relative h-full w-full" ref={fadeRef}>
      {backupChildren}
    </div>
  );
}

export default Fade;
