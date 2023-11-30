import Image from '@components/ui/Image';
import React from 'react';

interface ProfileImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {}

function ProfileImage(props: ProfileImageProps) {
  const { src, width, height, className, ...profileImageProps } = props;

  return (
    <Image
      {...profileImageProps}
      src={
        src ||
        'https://kr.object.ncloudstorage.com/fancamp/default/profileImage.png'
      }
      width={width || 100}
      height={height || 100}
      className={`aspect-square rounded-full border-sm border-text-primary object-cover ${
        className || ''
      }`}
    />
  );
}

export default ProfileImage;
