import { FormEvent, useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import SubmitButton from '../../../components/button/SubmitButton';
import TextArea from '../../../components/ui/TextArea';
import Text from '../../../components/ui/Text';
import UploadArea from '../../../components/file/UploadArea';
import useFetch from '../../../hooks/useFetch';

interface UploadModalProps {
  handleCloseModal: () => void;
}

function UploadModal({ handleCloseModal }: UploadModalProps) {
  const [content, setContent] = useState<string>('');
  const [files, setFiles] = useState<File[]>([]);

  const {
    mutate: uploadMutate,
    isPending: isUploadPending,
    isError: isUploadError,
    isSuccess: isUploadSuccess,
  } = useMutation({
    mutationFn: (formData: FormData) =>
      useFetch(`/api/posts/`, {
        method: 'POST',
        body: formData,
        credentials: 'include',
      }),
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

    uploadMutate(formData);
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
          isPending={isUploadPending}
          isError={isUploadError}
          isSuccess={isUploadSuccess}
          text="업로드"
        />
      </form>
    </div>
  );
}

export default UploadModal;
