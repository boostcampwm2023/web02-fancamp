import Text from '../ui/Text';

interface UploadCardProps {
  onClick: () => void;
}

const cardClassName =
  'relative aspect-square h-full w-full ' +
  'cursor-pointer overflow-hidden border-sm border-point-blue';

function UploadCard({ onClick }: UploadCardProps) {
  return (
    <button type="button" className={cardClassName} onClick={onClick}>
      <Text size={14} color="point-blue">
        + 포스트 업로드
      </Text>
    </button>
  );
}

export default UploadCard;
