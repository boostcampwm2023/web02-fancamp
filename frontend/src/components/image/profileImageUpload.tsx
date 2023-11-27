import React, { ChangeEvent, useEffect } from 'react';
import Image from './image';
import CameraIcon from '../../assets/icons/cameraIcon.svg?react';
import { fileToImage } from '../../utils/file';
import { UploadedImage } from '../../types/client/image';

interface ProfileImageUploadProps
  extends React.ImgHTMLAttributes<HTMLImageElement> {
  newFile: File | null;
  setNewFile: React.Dispatch<React.SetStateAction<File | null>>;
}

function ProfileImageUpload(props: ProfileImageUploadProps) {
  const {
    newFile,
    setNewFile,
    src,
    width,
    height,
    className,
    ...profileImageProps
  } = props;
  const fileInputRef = React.useRef<HTMLInputElement>(null);
  const [newImage, setNewImage] = React.useState<UploadedImage | null>(null);

  const handleUploadButtonClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileInputChange = async ({
    currentTarget,
  }: ChangeEvent<HTMLInputElement>) => {
    const { files: uploadedFiles } = currentTarget;
    const uploadedFile = uploadedFiles?.[0];
    if (!uploadedFile) {
      return;
    }
    setNewFile(uploadedFile);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  useEffect(() => {
    const setNewImageByFile = async () => {
      if (!newFile) {
        return;
      }
      const newImageFile = await fileToImage(newFile);
      setNewImage(newImageFile);
    };
    setNewImageByFile();
  }, [newFile]);

  return (
    <div className="relative w-fit">
      <Image
        {...profileImageProps}
        src={
          newImage?.buffer ||
          src ||
          'https://images.pexels.com/photos/18963468/pexels-photo-18963468.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
        }
        width={width || 100}
        height={height || 100}
        className={`aspect-square rounded-full border-sm border-text-primary object-cover ${
          className || ''
        }`}
      />
      <button
        type="button"
        className="absolute bottom-[0.125rem] right-[0.125rem] rounded-full border-sm bg-surface-primary p-xs"
        aria-label="change profile image"
        onClick={handleUploadButtonClick}
      >
        <CameraIcon width={16} height={16} />
      </button>
      <input
        type="file"
        ref={fileInputRef}
        className="hidden"
        onChange={handleFileInputChange}
      />
    </div>
  );
}

export default ProfileImageUpload;
