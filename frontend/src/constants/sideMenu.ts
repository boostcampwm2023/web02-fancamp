export const mainMenu = [
  { to: '/', text: 'Home' },
  { to: '/search', text: 'Search' },
  { to: '/explore', text: 'Explore' },
  { to: '/feed', text: 'Feed' },
];

export const authMenu = [
  { to: '/auth/signin', text: '로그인' },
  { to: '/auth/signup', text: '회원가입' },
];

export const camperMenu = [
  {
    to: '/subscriptions',
    text: '구독한 캠프',
  },
  {
    to: '/user',
    text: '마이페이지',
  },
];

export const masterMenu = [
  {
    to: `/camps/:campId/post`,
    text: '캠프',
  },
  { to: `/camps/:campId/chat`, text: '> 채팅' },
  {
    to: `/camps/:campId/post`,
    text: '> 포스트',
  },
  {
    to: `/camps/edit`,
    text: '> 캠프 수정',
  },
  {
    to: `/camps/:campId/upload`,
    text: '> 캠프 업로드',
  },
];
