import { useRef } from 'react';
import Text from '../text/text';

interface SubmitButtonProps {
  text: string;
  width?: number;
  height?: number;
  handleOnClick?: () => void;
}

/**
 * @param text 버튼의 텍스트
 */
const SubmitButton = ({ text, handleOnClick }: SubmitButtonProps) => {
  const submitButtonRef = useRef<HTMLButtonElement>(null);

  const handleMouseOver = () => {
    if (submitButtonRef.current) {
      submitButtonRef.current.classList.add('submit__button--animation');
    }
  };

  return (
    <button
      type="submit"
      className="submit__button"
      ref={submitButtonRef}
      onClick={handleOnClick}
      onMouseOver={handleMouseOver}
    >
      <div className="submit__button__content">
        <Text size={14} color="text-primary">
          {text}
        </Text>
      </div>
    </button>
  );
};

export default SubmitButton;
