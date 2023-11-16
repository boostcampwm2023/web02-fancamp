import { useEffect, useRef, useState } from 'react'
import LeftArrowIcon from '../../assets/icons/leftArrowIcon.svg?react'
import RightArrowIcon from '../../assets/icons/rightArrowIcon.svg?react'
import { pxToRem } from '../../utils/unit'
import Text from '../text/text'
import Image from '../image/Image'
interface ImageSliderProps {
  images: string[]
}

type SlideDirection = 'PRE' | 'NEXT'

const ImageSlider = ({ images }: ImageSliderProps) => {
  const [imageIndex, setImageIndex] = useState(0)
  const [sliderWidth, setSliderWidth] = useState(0)
  const sliderRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (sliderRef.current) {
      setSliderWidth(
        sliderRef.current.clientWidth || sliderRef.current.getBoundingClientRect().width
      )
    }
  }, [])

  const handleImageIndex = (direction: SlideDirection) => {
    if (direction === 'PRE' && imageIndex !== 0) {
      setImageIndex(imageIndex - 1)
    } else if (direction === 'NEXT' && imageIndex < images.length - 1) {
      setImageIndex(imageIndex + 1)
    }
  }

  return (
    <div className="image__slider__wrapper" ref={sliderRef}>
      <div
        className="image__slider__scroll"
        style={{ transform: `translateX(${-imageIndex * 37.5}rem)` }}
      >
        {images.map((image, index) => (
          <Image
            src={image}
            className="image__slider__image"
            key={`image-slider-${index}`}
            style={{ width: `${37.5}rem` }}
          />
        ))}
      </div>
      <div className="image__slider__controller">
        <button className="image__slider__button--pre" onClick={() => handleImageIndex('PRE')}>
          <LeftArrowIcon />
        </button>
        <button className="image__slider__button--next" onClick={() => handleImageIndex('NEXT')}>
          <RightArrowIcon />
        </button>
        <div className="image__slider__index">
          <Text size={12} color="text-primary">
            {imageIndex + 1}/{images.length}
          </Text>
        </div>
      </div>
    </div>
  )
}

export default ImageSlider
