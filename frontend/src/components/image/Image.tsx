import React from 'react';

interface ImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {}

const Image = (props: ImageProps) => {
  const handleImageLoaded = ({
    currentTarget,
  }: React.SyntheticEvent<HTMLImageElement, Event>) => {
    currentTarget.classList.remove('opacity-0');
    currentTarget.classList.add('smooth-transition');
  };

  return (
    <img
      {...props}
      className={`opacity-0 ${props.className || ''}`}
      onLoad={handleImageLoaded}
    />
  );
};

export default Image;
