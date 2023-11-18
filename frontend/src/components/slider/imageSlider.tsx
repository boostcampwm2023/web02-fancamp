import { useRef, useState } from 'react';
import LeftArrowIcon from '../../assets/icons/leftArrowIcon.svg?react';
import RightArrowIcon from '../../assets/icons/rightArrowIcon.svg?react';
import Text from '../text/text';
import Image from '../image/Image';

interface ImageSliderProps {
  width: number;
  images: string[];
}

const sliderControllerClassName =
  'smooth-transition absolute bottom-[0] left-[0] right-[0] top-[0] h-full ' +
  'opacity-0 group-hover:opacity-100';

const ImageSlider = ({ width = 37.5, images }: ImageSliderProps) => {
  const [imageIndex, setImageIndex] = useState(0);
  const sliderRef = useRef<HTMLDivElement>(null);

  const handleImageIndex = (direction: 'PRE' | 'NEXT') => {
    if (direction === 'PRE' && imageIndex !== 0) {
      setImageIndex(imageIndex - 1);
    } else if (direction === 'NEXT' && imageIndex < images.length - 1) {
      setImageIndex(imageIndex + 1);
    }
  };

  return (
    <div
      className="group relative h-full w-full overflow-x-hidden border-sm border-text-primary"
      ref={sliderRef}
    >
      <div
        className="smooth-transition flex h-full w-max"
        style={{ transform: `translateX(${-imageIndex * width}rem)` }}
      >
        {images.map((image, index) => (
          <Image
            src={image}
            className="object-cover"
            key={`image-slider-${index}`}
            style={{ width: `${width}rem` }}
          />
        ))}
      </div>
      <div className={sliderControllerClassName}>
        <button
          className="v-center absolute left-[0] flex justify-center"
          onClick={() => handleImageIndex('PRE')}
        >
          <LeftArrowIcon />
        </button>
        <button
          className="v-center absolute right-[0] flex justify-center"
          onClick={() => handleImageIndex('NEXT')}
        >
          <RightArrowIcon />
        </button>
        <div className="h-center absolute bottom-sm flex justify-center border-sm border-text-primary bg-surface-primary p-xs">
          <Text size={12} color="text-primary">
            {imageIndex + 1}/{images.length}
          </Text>
        </div>
      </div>
    </div>
  );
};

export default ImageSlider;
