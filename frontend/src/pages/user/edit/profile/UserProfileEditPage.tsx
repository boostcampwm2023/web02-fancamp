import { FormEvent, Suspense, useState } from 'react';
import Text from '@components/ui/Text';
import Input from '@components/input/Input';
import SubmitButton from '@components/button/SubmitButton';
import Spinner from '@components/loading/Spinner';
import {
  getProfileQuery,
  updateProfileMutation,
} from '@hooks/api/useUserQuery';
import UploadableImage from '@components/image/UploadableImage';

function UserProfileEditPage() {
  return (
    <Suspense
      fallback={
        <div className="h-[10rem] w-full">
          <Spinner className="center" />
        </div>
      }
    >
      <UserProfileEditPageTemplate />
    </Suspense>
  );
}

function UserProfileEditPageTemplate() {
  const { data: profile } = getProfileQuery();
  const {
    mutate: updateProfile,
    isPending: isUpdateProfilePending,
    isError: isUpdateProfileError,
    isSuccess: isUpdateProfileSuccess,
  } = updateProfileMutation({
    onSuccess: () => {
      setNewProfileImage(null);
    },
  });

  const [newProfileImage, setNewProfileImage] = useState<File | null>(null);
  const [chatName, setChatName] = useState<string>(profile.chatName);

  const handleEditProfile = (event: FormEvent) => {
    event.preventDefault();
    const formData = new FormData();
    if (newProfileImage) {
      formData.append('file', newProfileImage);
    }
    if (chatName !== profile.chatName) {
      formData.append('chatName', chatName);
    }
    const isFormDataEmpty = formData.keys().next().done;
    if (!isFormDataEmpty && !isUpdateProfilePending) {
      updateProfile({ formData });
    }
  };

  return (
    <div className="flex flex-col gap-xl pl-[10rem] pr-[10rem]">
      <Text size={20} className="text-center">
        프로필 변경
      </Text>
      <form
        className="flex flex-col items-center gap-lg"
        onSubmit={handleEditProfile}
      >
        <UploadableImage
          newFile={newProfileImage}
          setNewFile={setNewProfileImage}
          src={profile.profileImage || ''}
          alt="camp-profile-image"
          width={100}
          height={100}
          className="relative aspect-square rounded-full border-sm border-text-primary h-center"
        />
        <Input
          label="이름"
          type="text"
          setValue={setChatName}
          value={chatName}
          placeholder="이름을 입력해주세요."
        />
        <SubmitButton
          text="프로필 변경"
          isPending={isUpdateProfilePending}
          isError={isUpdateProfileError}
          isSuccess={isUpdateProfileSuccess}
        />
      </form>
    </div>
  );
}

export default UserProfileEditPage;
