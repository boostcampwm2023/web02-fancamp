import { FormEvent, useState } from 'react';
import SubmitButton from '../../../components/button/submitButton';
import TextArea from '../../../components/input/textarea';
import Text from '../../../components/text/text';
import UploadArea from '../../../components/file/uploadArea';

function UploadPage() {
  const [content, setContent] = useState<string>('');
  const [files, setFiles] = useState<File[]>([]);

  const handleUpload = (event: FormEvent) => {
    event.preventDefault();
    const formData = new FormData();
    files.forEach((file) => {
      formData.append('files', file);
    });

    fetch('http://localhost:3000/file/upload', {
      method: 'POST',
      body: formData,
    });
  };

  return (
    <div className="flex min-h-full flex-col gap-md">
      <div className="flex flex-col gap-xl pl-[10rem] pr-[10rem]">
        <Text size={20} className="text-center">
          포스트 업로드
        </Text>
        <form className="flex flex-col gap-lg" onSubmit={handleUpload}>
          <TextArea
            placeholder="원하는 내용을 적어보세요!"
            setValue={setContent}
            value={content}
          />
          <UploadArea files={files} setFiles={setFiles} />
          <SubmitButton text="업로드" />
        </form>
      </div>
    </div>
  );
}

export default UploadPage;
