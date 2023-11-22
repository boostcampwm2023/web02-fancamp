/* eslint-disable no-nested-ternary */
import { useEffect, useState } from 'react';
import Spinner from '../loading/spinner';
import Text from '../text/text';

interface SubmitButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  text?: string;
  isPending?: boolean;
  isError?: boolean;
  isSuccess?: boolean;
  errorMessage?: string;
}

const buttonClassName =
  'smooth-transition h-[3.125rem] w-full shadow-[0_0_0_0_#111111] ' +
  'hover:translate-x-[-0.125rem] hover:translate-y-[-0.125rem] hover:shadow-[0.25rem_0.25rem_0_0_#111111] ';
const buttonInnerClassName =
  'h-full box-border flex items-center justify-center border-sm border-text-primary';

function SubmitButton(props: SubmitButtonProps) {
  const {
    text,
    isPending,
    isError,
    isSuccess,
    errorMessage,
    ...submitButtonProps
  } = props;
  const [isInit, setInit] = useState(true);

  const hasStatusProps = () => {
    return (
      isPending !== undefined ||
      isError !== undefined ||
      isSuccess !== undefined
    );
  };

  const elementByStatus =
    !hasStatusProps() || isInit ? (
      <Text size={14} color="text-primary">
        {text}
      </Text>
    ) : isPending ? (
      <Spinner width={24} height={24} />
    ) : isError ? (
      <Text size={14} color="surface-primary">
        {errorMessage || '처리할 수 없습니다.'}
      </Text>
    ) : isSuccess ? (
      <Text size={14} color="text-primary">
        완료
      </Text>
    ) : (
      // eslint-disable-next-line react/jsx-no-useless-fragment
      <></>
    );

  useEffect(() => {
    if (isPending || isError || isSuccess) {
      setInit(false);
    } else {
      setInit(true);
    }
  }, [isPending, isError, isSuccess]);

  useEffect(() => {
    if (isSuccess) {
      setTimeout(() => {
        setInit(true);
      }, 1000);
    }
  }, [isSuccess]);

  return (
    <button
      {...submitButtonProps}
      type="submit"
      className={buttonClassName + (props?.className || '')}
    >
      <div
        className={`${buttonInnerClassName} ${
          isError
            ? 'bg-point-red'
            : isSuccess
              ? 'bg-point-green'
              : 'bg-point-lavender'
        }`}
      >
        {elementByStatus}
      </div>
    </button>
  );
}

export default SubmitButton;
