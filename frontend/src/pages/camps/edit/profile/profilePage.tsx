import { useMutation, useSuspenseQuery } from '@tanstack/react-query';
import { FormEvent, Suspense, useState } from 'react';
import { useParams } from 'react-router-dom';
import SubmitButton from '../../../../components/button/submitButton';
import Image from '../../../../components/image/Image';
import Input from '../../../../components/input/input';
import Text from '../../../../components/text/text';
import { CampEditable } from '../../../../types/api/camp';
import Spinner from '../../../../components/loading/spinner';
import { queryClient } from '../../../../main';

function ProfilePage() {
  return (
    <Suspense
      fallback={
        <div className="h-[10rem] w-full">
          <Spinner className="center" />
        </div>
      }
    >
      <ProfilePageTemplate />
    </Suspense>
  );
}

function ProfilePageTemplate() {
  const { campId } = useParams();

  const { data: camp } = useSuspenseQuery<CampEditable>({
    queryKey: ['camp-info', campId],
    queryFn: () => fetch(`/api/users/${campId}`).then((res) => res.json()),
    gcTime: 0,
    staleTime: 0,
  });

  const editProfileMutation = useMutation({
    mutationFn: (profile: Partial<CampEditable>) =>
      fetch(`/api/users/${campId}`, {
        method: 'patch',
        body: JSON.stringify(profile),
      }).then((res) => res.json()),
    onSuccess: (data: Partial<CampEditable>) => {
      queryClient.setQueryData(['camp-info', campId], {
        ...camp,
        ...data,
      });
    },
  });

  const [newUserName, setNewUserName] = useState<string>(camp.userName);

  const handleEditProfile = (event: FormEvent) => {
    event.preventDefault();
    if (editProfileMutation.isPending) {
      return;
    }
    const newProfile: Partial<CampEditable> = {};
    if (newUserName !== camp.userName) {
      newProfile.userName = newUserName;
    }
    editProfileMutation.mutate(newProfile);
  };

  return (
    <div className="flex flex-col gap-xl pl-[10rem] pr-[10rem]">
      <Text size={20} className="text-center">
        프로필 변경
      </Text>
      <form className="flex flex-col gap-lg" onSubmit={handleEditProfile}>
        <Image
          src={camp.profileUrl}
          alt="camp-profile-image"
          className="relative rounded-full border-sm border-text-primary h-center"
          width={128}
          height={128}
        />
        <Input
          label="이름"
          type="text"
          setValue={setNewUserName}
          defaultValue={newUserName}
          placeholder="이름을 입력해주세요."
        />
        <SubmitButton
          text="프로필 변경"
          isPending={editProfileMutation.isPending}
          isError={editProfileMutation.isError}
          isSuccess={editProfileMutation.isSuccess}
        />
      </form>
    </div>
  );
}

export default ProfilePage;
