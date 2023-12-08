import HomeIcon from '@assets/icons/homeIcon.svg?react';
import PostIcon from '@assets/icons/postIcon.svg?react';
import ProfileIcon from '@assets/icons/profileIcon.svg?react';
import SigninIcon from '@assets/icons/signinIcon.svg?react';
import SignupIcon from '@assets/icons/signupIcon.svg?react';
import NotionIcon from '@assets/icons/notionIcon.svg?react';
import GithubIcon from '@assets/icons/githubIcon.svg?react';
import CampIcon from '@assets/icons/campIcon.svg?react';
import EditIcon from '@assets/icons/editIcon.svg?react';
import ChatIcon from '@assets/icons/chatIcon.svg?react';

export const COMMON_MENU = [
  { to: '/', text: '홈', icon: <HomeIcon width={28} /> },
  { to: '/feed', text: '최신 포스트', icon: <PostIcon width={28} /> },
];

export const AUTH_MENU = [
  { to: '/auth/signin', text: '로그인', icon: <SigninIcon width={28} /> },
  { to: '/auth/signup', text: '회원가입', icon: <SignupIcon width={28} /> },
];

export const CAMPER_MENU = [
  {
    to: '/user/edit',
    text: '마이페이지',
    icon: <ProfileIcon width={28} />,
  },
];

export const MASTER_MENU = [
  {
    to: `/camps/:campId/post`,
    text: '내 캠프',
    icon: <CampIcon width={28} />,
  },
  {
    to: `/camps/edit`,
    text: '캠프 수정',
    icon: <EditIcon width={28} />,
  },
];

export const DOC_MENU = [
  {
    to: 'https://github.com/boostcampwm2023/web02-fancamp/wiki',
    text: '개발 문서',
    icon: <NotionIcon width={28} />,
  },
  {
    to: 'https://github.com/boostcampwm2023/web02-fancamp',
    text: '깃허브',
    icon: <GithubIcon width={28} />,
  },
];
