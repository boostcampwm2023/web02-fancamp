import { FormEvent, Suspense, useState } from 'react';
import Text from '@components/ui/Text';
import SubmitButton from '@components/button/SubmitButton';
import Spinner from '@components/loading/Spinner';
import UploadableImage from '@components/image/UploadableImage';
import { getCampQuery, updateCampMutation } from '@hooks/api/useCampQuery';
import useAuth from '@hooks/useAuth';
import {
  getProfileQuery,
  updateProfileMutation,
} from '@hooks/api/useUserQuery';

function CampProfileEditPage() {
  return (
    <Suspense
      fallback={
        <div className="h-[10rem] w-full">
          <Spinner className="center" />
        </div>
      }
    >
      <CampProfileEditPageTemplate />
    </Suspense>
  );
}

function CampProfileEditPageTemplate() {
  const { auth } = useAuth();
  const chatName = auth?.chatName as string;
  const { data: camp } = getCampQuery(chatName);
  const { data: profile } = getProfileQuery();
  const [newProfileImage, setNewProfileImage] = useState<File | null>(null);
  const [newBannerImage, setNewBannerImage] = useState<File | null>(null);
  const [newCampName] = useState<string>(camp.campName);

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

  const {
    mutate: updateCamp,
    isPending: isUpdateCampPending,
    isError: isUpdateCampError,
    isSuccess: isUpdateCampSuccess,
  } = updateCampMutation({
    onSuccess: () => {
      setNewProfileImage(null);
    },
  });

  const handleEditProfile = (event: FormEvent) => {
    event.preventDefault();
    const profileFormData = new FormData();
    const campFormData = new FormData();
    if (newProfileImage) {
      profileFormData.append('file', newProfileImage);
    }
    const isProfileFormDataEmpty = profileFormData.keys().next().done;
    if (newCampName !== camp.campName) {
      campFormData.append('campName', newCampName);
    }
    if (newBannerImage) {
      campFormData.append('file', newBannerImage);
    }
    const isCampFormDataEmpty = campFormData.keys().next().done;
    if (!isUpdateProfilePending && !isUpdateCampPending) {
      if (!isProfileFormDataEmpty) {
        updateProfile({ formData: profileFormData });
      }
      if (!isCampFormDataEmpty) {
        updateCamp({ campName: camp.campName, formData: campFormData });
      }
    }
  };

  return (
    <form
      className="relative flex flex-col justify-center border-sm border-text-primary"
      onSubmit={handleEditProfile}
    >
      <div className="w-full gap-sm border-b-sm border-text-primary">
        <UploadableImage
          newFile={newBannerImage}
          setNewFile={setNewBannerImage}
          src={camp.bannerImage || ''}
          alt="camp-banner-image"
          className="relative h-[14rem] w-full h-center"
        />
      </div>
      <div className="relative z-10 flex w-full flex-col gap-xl bg-surface-primary p-xl">
        <Text size={20} className="text-center">
          캠프 프로필 변경
        </Text>
        <div className="relative flex flex-col items-center gap-lg">
          <UploadableImage
            newFile={newProfileImage}
            setNewFile={setNewProfileImage}
            src={profile.profileImage || ''}
            alt="camp-profile-image"
            width={100}
            height={100}
            className="relative aspect-square rounded-full border-sm border-text-primary h-center"
          />
          {/* <Input
            label="캠프명"
            type="text"
            setValue={setNewCampName}
            value={newCampName}
            placeholder="캠프명을 입력해주세요."
          /> */}
          {/* <Input
            label="상태 메시지"
            type="text"
            setValue={setNewUserName}
            value={newUserName}
            placeholder="상태 메시지를 입력해주세요."
          /> */}

          <SubmitButton
            text="프로필 변경"
            isPending={isUpdateProfilePending || isUpdateCampPending}
            isError={isUpdateProfileError || isUpdateCampError}
            isSuccess={isUpdateProfileSuccess && isUpdateCampSuccess}
          />
        </div>
      </div>
    </form>
  );
}

export default CampProfileEditPage;
