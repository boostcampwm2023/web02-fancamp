import React from 'react';
import Image from './image';

interface ProfileImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {}

function ProfileImage(props: ProfileImageProps) {
  const { className, ...profileImageProps } = props;

  return (
    <Image
      {...profileImageProps}
      width={100}
      height={100}
      className={`aspect-square rounded-full border-sm border-text-primary object-cover ${
        className || ''
      }`}
    />
  );
}

export default ProfileImage;
