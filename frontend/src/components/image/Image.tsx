import { useRef } from 'react';

interface ImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {}

const Image = (props: ImageProps) => {
  const imageRef = useRef<HTMLImageElement>(null);

  const handleImageLoaded = () => {
    if (imageRef.current) {
      imageRef.current.classList.remove('opacity-0');
      imageRef.current.classList.add('smooth-transition');
    }
  };

  return (
    <img
      {...props}
      className={`opacity-0 ${props.className || ''}`}
      ref={imageRef}
      onLoad={handleImageLoaded}
    />
  );
};

export default Image;
