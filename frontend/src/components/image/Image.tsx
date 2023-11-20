import React from 'react';

interface ImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {}

function Image(props: ImageProps) {
  const { className, ...imageProps } = props;

  const handleImageLoaded = ({
    currentTarget,
  }: React.SyntheticEvent<HTMLImageElement, Event>) => {
    currentTarget.classList.remove('opacity-0');
    currentTarget.classList.add('smooth-transition');
  };

  return (
    <img
      {...imageProps}
      className={`opacity-0 ${className || ''}`}
      onLoad={handleImageLoaded}
      alt=""
    />
  );
}

export default Image;
