import Button from '@components/ui/Button';
import SendIcon from '@assets/icons/sendIcon.svg?react';
import ErrorIcon from '@assets/icons/errorIcon.svg?react';
import Spinner from '@components/loading/Spinner';

interface InputCommentProps {
  comment: string;
  setComment: React.Dispatch<React.SetStateAction<string>>;
  handleCommentSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  status: {
    isError: boolean;
    isPending: boolean;
  };
}

function InputComment({
  comment,
  setComment,
  handleCommentSubmit,
  status,
}: InputCommentProps) {
  return (
    <form
      className="relative flex gap-sm bg-surface-primary p-sm"
      onSubmit={handleCommentSubmit}
    >
      <input
        type="text"
        className="flex-1 bg-transparent display-regular-14 placeholder:display-regular-14 focus:outline-none"
        placeholder="코멘트 남기기"
        value={comment}
        onChange={(event) => setComment(event.target.value)}
      />
      <div className="h-[2.25rem] w-[2.25rem]">
        <Button
          type="submit"
          className={
            status.isError
              ? '!bg-point-red'
              : status.isPending
                ? '!bg-point-green'
                : '!bg-point-yellow'
          }
        >
          {status.isError ? (
            <ErrorIcon width={16} height={16} />
          ) : status.isPending ? (
            <Spinner width={16} height={16} color="#111111" />
          ) : (
            <SendIcon className="h-md w-md" />
          )}
        </Button>
      </div>
    </form>
  );
}

export default InputComment;
