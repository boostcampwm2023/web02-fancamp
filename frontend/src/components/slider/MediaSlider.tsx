/* eslint-disable jsx-a11y/media-has-caption */

import { memo, useRef, useState } from 'react';
import Image from '@components/ui/Image';
import Text from '@components/ui/Text';
import LeftArrowIcon from '@assets/icons/leftArrowIcon.svg?react';
import RightArrowIcon from '@assets/icons/rightArrowIcon.svg?react';
import { PostFile } from '@type/api/post';
import { checkFileType } from '@utils/file';
import { optimizedImageURL } from '@utils/imageURL';

interface ImageSliderProps {
  width?: number;
  medias: PostFile[];
}

const preButtonClassName =
  'absolute left-[0] ml-[-0.25rem] flex justify-center opacity-0 v-center z-10' +
  'smooth-transition group-hover:ml-[0] group-hover:opacity-100';
const nextButtonClassName =
  'absolute right-[0] mr-[-0.25rem] flex justify-center opacity-0 v-center z-10' +
  'smooth-transition group-hover:mr-[0] group-hover:opacity-100';
const indexClassName =
  'absolute bottom-sm mb-[-0.25rem] flex justify-center border-sm border-text-primary bg-surface-primary p-xs z-10' +
  'smooth-transition opacity-0 h-center group-hover:mb-[0] group-hover:flex group-hover:opacity-100';

function MediaSlider({ width = 37.5, medias }: ImageSliderProps) {
  const [imageIndex, setImageIndex] = useState(0);
  const sliderRef = useRef<HTMLDivElement>(null);

  const handleImageIndex = (direction: 'PRE' | 'NEXT') => {
    if (direction === 'PRE' && imageIndex !== 0) {
      setImageIndex(imageIndex - 1);
    } else if (direction === 'NEXT' && imageIndex < medias.length - 1) {
      setImageIndex(imageIndex + 1);
    }
  };

  return (
    <div
      className="group relative h-full w-full overflow-x-hidden"
      ref={sliderRef}
    >
      <div
        className="relative flex h-full w-max select-none smooth-transition"
        style={{ transform: `translateX(${-imageIndex * width}rem)` }}
      >
        {medias.map((media, i) => {
          const fileType = checkFileType(media.mimetype);
          if (fileType === 'image') {
            return (
              <div
                className="bg-text-primary"
                key={`image-slider-${media.fileUrl}`}
                style={{ width: `${width}rem` }}
              >
                <Image
                  src={optimizedImageURL(media.fileUrl, 'post-large')}
                  className="relative h-full w-full object-contain center"
                  loading={`${
                    i === 0 || imageIndex + 1 === i ? 'eager' : 'lazy'
                  }`}
                  alt={`media image ${i}`}
                />
              </div>
            );
          }
          if (fileType === 'video') {
            return (
              <div
                className="bg-text-primary"
                key={`image-slider-${media.fileUrl}`}
                style={{ width: `${width}rem` }}
              >
                <video
                  src={media.fileUrl}
                  className="relative h-full w-full object-contain center"
                  style={{ width: `${width}rem` }}
                  key={`image-slider-${media.fileUrl}`}
                  controls={i === imageIndex}
                />
              </div>
            );
          }
          return null;
        })}
      </div>

      {medias.length > 1 && (
        <>
          <button
            type="button"
            className={preButtonClassName}
            onClick={() => handleImageIndex('PRE')}
            aria-label="slide previous button"
          >
            <LeftArrowIcon />
          </button>
          <button
            type="button"
            className={nextButtonClassName}
            onClick={() => handleImageIndex('NEXT')}
            aria-label="slide next button"
          >
            <RightArrowIcon />
          </button>
          <div className={indexClassName}>
            <Text size={13} color="text-primary">
              {imageIndex + 1}/{medias.length}
            </Text>
          </div>
        </>
      )}
    </div>
  );
}

export default memo(MediaSlider);
