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

const imageTypes = [
  'image/jpeg',
  'image/png',
  'image/gif',
  'image/bmp',
  'image/x-ms-bmp',
];

const videoTypes = [
  'video/mp4',
  'video/webm',
  'video/x-m4v',
  'video/quicktime',
  'video/x-msvideo',
  'video/mpeg',
  'video/ogg',
];

export const checkFileType = (mimetype: string) => {
  if (imageTypes.includes(mimetype)) {
    return 'image';
  }
  if (videoTypes.includes(mimetype)) {
    return 'video';
  }
  return 'other';
};
