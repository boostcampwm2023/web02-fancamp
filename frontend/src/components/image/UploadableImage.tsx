import React, { ChangeEvent, useEffect } from 'react';
import Image from '@components/ui/Image';
import { UploadedImage } from '@type/client/image';
import { fileToImage } from '@utils/file';
import CameraIcon from '@assets/icons/cameraIcon.svg?react';

interface UploadableImagedProps
  extends React.ImgHTMLAttributes<HTMLImageElement> {
  newFile: File | null;
  setNewFile: React.Dispatch<React.SetStateAction<File | null>>;
}

function UploadableImage(props: UploadableImagedProps) {
  const { newFile, setNewFile, src, className, ...UploadableImageProps } =
    props;
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
    <div className="relative">
      <Image
        {...UploadableImageProps}
        src={
          newImage?.buffer ||
          src ||
          'https://images.pexels.com/photos/19247146/pexels-photo-19247146.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
        }
        className={`object-cover ${className || ''}`}
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

export default UploadableImage;
