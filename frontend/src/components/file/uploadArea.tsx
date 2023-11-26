import { ChangeEvent, DragEvent, createRef, useEffect, useState } from 'react';
import { UploadedImage } from '../../types/client/image';
import Image from '../ui/Image';
import Text from '../ui/Text';

interface UploadAreaProps {
  files: File[];
  setFiles: React.Dispatch<React.SetStateAction<any[]>>;
}

function UploadArea({ files, setFiles }: UploadAreaProps) {
  const [images, setImages] = useState<UploadedImage[]>([]);
  const [dragging, setDragging] = useState<boolean>(false);
  const fileInputRef = createRef<HTMLInputElement>();

  const handleDrop = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setDragging(false);
    const { files: newFiles } = event.dataTransfer;
    if (!newFiles) {
      return;
    }
    setFiles((_) => [..._, ...newFiles]);
  };

  const handleFileInputChange = ({
    currentTarget,
  }: ChangeEvent<HTMLInputElement>) => {
    const { files: newFiles } = currentTarget;
    if (!newFiles) {
      return;
    }
    setFiles((_) => [..._, ...newFiles]);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  useEffect(() => {
    // 추후에 최적화 필요
    setImages(() => []);
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
    // eslint-disable-next-line jsx-a11y/no-static-element-interactions, jsx-a11y/click-events-have-key-events
    <div
      className={`relative h-[5rem] w-full cursor-pointer border-sm ${
        dragging ? 'border-point-green' : 'border-text-primary'
      }`}
      onClick={() => {
        if (fileInputRef.current) {
          fileInputRef.current.click();
        }
      }}
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
      <div className="cool-scrollbar flex h-full w-full gap-md overflow-x-scroll p-lg">
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
      <input
        type="file"
        ref={fileInputRef}
        className="hidden"
        onChange={handleFileInputChange}
      />
      <Text size={14} color="text-secondary" className="absolute center">
        파일 업로드
      </Text>
    </div>
  );
}

export default UploadArea;
