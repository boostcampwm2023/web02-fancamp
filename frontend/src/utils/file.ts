import { UploadedImage } from '../type/client/image';

export const fileToImage = (file: File): Promise<UploadedImage> => {
  return new Promise((resolve) => {
    if (file.type.match('image.*')) {
      const fileReader = new FileReader();
      fileReader.onload = () => {
        const newUploadedImage = {
          name: file.name,
          type: file.type,
          size: file.size,
          buffer: fileReader.result as string,
        };
        resolve(newUploadedImage);
      };
      fileReader.readAsDataURL(file);
    }
  });
};
