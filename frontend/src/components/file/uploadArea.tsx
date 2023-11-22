import { DragEvent, useEffect, useState } from 'react';
import { UploadedImage } from '../../types/client/image';
import Image from '../image/image';

interface UploadAreaProps {
  files: File[];
  setFiles: React.Dispatch<React.SetStateAction<any[]>>;
}

function UploadArea({ files, setFiles }: UploadAreaProps) {
  const [images, setImages] = useState<UploadedImage[]>([]);
  const [dragging, setDragging] = useState<boolean>(false);

  const handleDrop = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setDragging(false);
    const { files: newFiles } = event.dataTransfer;
    if (!newFiles) {
      return;
    }
    setFiles((_) => [..._, ...newFiles]);
  };

  useEffect(() => {
    Array.from(files).forEach((file) => {
      if (file.type.match('image.*')) {
        const fileReader = new FileReader();
        fileReader.onload = () => {
          const newUploadedImage: UploadedImage = {
            name: file.name,
            type: file.type,
            size: file.size,
            buffer: fileReader.result as string,
          };
          setImages((_) => [..._, newUploadedImage]);
        };
        fileReader.readAsDataURL(file);
      }
    });
  }, [files]);

  const handleDragOver = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
  };

  const handleImageDragStart = (event: DragEvent<HTMLImageElement>) => {
    event.preventDefault();
  };

  const handleStartDrag = () => {
    setDragging(true);
  };

  const handleFinishDrag = () => {
    setDragging(false);
  };

  const handleImageClick = (index: number) => {
    setImages(images.filter((_, i) => i !== index));
    setFiles(files.filter((_, i) => i !== index));
  };

  return (
    // eslint-disable-next-line jsx-a11y/no-static-element-interactions
    <div
      className={`h-[10rem] w-full border-sm ${
        dragging ? 'border-point-green' : 'border-text-primary'
      }`}
      onDrag={(e) => {
        e.preventDefault();
      }}
      onDrop={handleDrop}
      onDragOver={handleDragOver}
      onDragEnter={handleStartDrag}
      onDragLeave={handleFinishDrag}
      onDragEnd={handleFinishDrag}
      onMouseUp={handleFinishDrag}
    >
      <div className="flex h-full w-full gap-md overflow-x-scroll p-lg">
        {images.map((image, index) => {
          const { name, buffer } = image;
          return (
            <Image
              src={buffer}
              alt={name}
              key={`uploaded-image-${name}`}
              className="no-drag aspect-square h-full object-cover"
              onDragStart={handleImageDragStart}
              onClick={() => handleImageClick(index)}
            />
          );
        })}
      </div>
    </div>
  );
}

export default UploadArea;
