import { FormEvent, useState } from 'react';
import Text from '@components/ui/Text';
import TextArea from '@components/ui/TextArea';
import SubmitButton from '@components/button/SubmitButton';
import UploadArea from '@components/file/UploadArea';
import { postPostMutation } from '@hooks/api/usePostQuery';
import { useParams } from 'react-router-dom';

interface UploadModalProps {
  handleCloseModal: () => void;
}

function UploadModal({ handleCloseModal }: UploadModalProps) {
  const [content, setContent] = useState<string>('');
  const [files, setFiles] = useState<File[]>([]);
  const { campId } = useParams();

  const {
    mutate: postPost,
    isPending,
    isError,
    isSuccess,
  } = postPostMutation({
    onSuccess: () => {
      handleCloseModal();
    },
  });

  const handleUpload = (event: FormEvent) => {
    event.preventDefault();
    const formData = new FormData();
    files.forEach((file) => {
      formData.append('files', file);
    });
    formData.append('content', content);
    formData.append('campName', campId!);
    postPost({ formData });
  };

  return (
    <div className="flex h-[31.25rem] w-[17.5rem] flex-col gap-sm p-sm">
      <Text size={20} className="p-md text-center">
        포스트 업로드
      </Text>
      <form className="flex flex-1 flex-col gap-sm" onSubmit={handleUpload}>
        <TextArea
          placeholder="원하는 내용을 적어보세요!"
          setValue={setContent}
          value={content}
          className="flex-1"
        />
        <UploadArea files={files} setFiles={setFiles} />
        <SubmitButton
          isPending={isPending}
          isError={isError}
          isSuccess={isSuccess}
          text="업로드"
        />
      </form>
    </div>
  );
}

export default UploadModal;
