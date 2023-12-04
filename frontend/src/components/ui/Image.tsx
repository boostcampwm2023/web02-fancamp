import React from 'react';

interface ImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {}

function Image(props: ImageProps) {
  const { src, className, ...imageProps } = props;

  const handleImageLoaded = ({
    currentTarget,
  }: React.SyntheticEvent<HTMLImageElement, Event>) => {
    currentTarget.classList.remove('opacity-0');
    currentTarget.classList.add('smooth-transition');
  };

  return (
    <img
      src={
        src ||
        'https://kr.object.ncloudstorage.com/fancamp/default/profileImage.png'
      }
      className={`opacity-0 ${className || ''}`}
      onLoad={handleImageLoaded}
      alt=""
      {...imageProps}
    />
  );
}

export default Image;
