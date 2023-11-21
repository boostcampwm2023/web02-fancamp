import { DragEvent, useState } from 'react';
import { UploadedImage } from '../../types/client/image';
import Image from '../image/Image';

function UploadArea() {
  const [uploadedImages, setUploadedImages] = useState<UploadedImage[]>([]);
  const [dragging, setDragging] = useState<boolean>(false);

  const handleDrop = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setDragging(false);
    const { files } = event.dataTransfer;
    if (!files) {
      return;
    }
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
          setUploadedImages((images) => [...images, newUploadedImage]);
        };
        fileReader.readAsDataURL(file);
      }
    });
  };

  const handleDragOver = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
  };

  const handleImageDragStart = (event: DragEvent<HTMLImageElement>) => {
    event.preventDefault();
  };

  const handleFinishDrag = () => {
    setDragging(false);
  };

  const handleImageClick = (name: string) => {
    setUploadedImages((images) =>
      images.filter((image) => image.name !== name)
    );
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
      onDragEnter={handleFinishDrag}
      onDragLeave={handleFinishDrag}
      onDragEnd={handleFinishDrag}
      onMouseUp={handleFinishDrag}
    >
      <div className="flex h-full w-full gap-md overflow-x-scroll p-lg">
        {uploadedImages.map((image) => {
          const { name, buffer } = image;
          return (
            <Image
              src={buffer}
              alt={name}
              key={`uploaded-image-${name}`}
              className="no-drag aspect-square h-full object-cover"
              onDragStart={handleImageDragStart}
              onClick={() => handleImageClick(name)}
            />
          );
        })}
      </div>
    </div>
  );
}

export default UploadArea;
