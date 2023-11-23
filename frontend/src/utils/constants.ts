export const colors = {
  'text-primary': '#111111',
  'text-secondary': '#777777',
  'contour-primary': '#DFDFDF',
  'point-green': '#ADFF00',
  'point-yellow': '#FFC044',
  'point-blue': '#0087E9',
  'point-lavender': '#D4AAFF',
  transparent: 'transparent',
  'surface-primary': '#FFFFFF',
  'point-red': '#FF5044',
};

export const campCategorys = [
  {
    text: '포스트',
    path: 'post',
  },
  {
    text: '커뮤니티',
    path: 'community',
  },
  {
    text: '채팅',
    path: 'chat',
  },
];

export const campEditCategorys = [
  {
    text: '프로필',
    path: 'profile',
  },
  {
    text: '비밀번호',
    path: 'password',
  },
];

export const auth = {
  signin: {
    title: '로그인',
    error: {
      email: '이메일의 형식이 맞지 않아요!',
      password: '비밀번호의 글자 수는 4~20 사이여야 합니다!',
    },
    induce: {
      signup: {
        text: '계정이 없으신가요?',
        link: '회원가입',
      },
    },
  },
  signup: {
    step: {
      email: {
        title: '회원가입',
        apply: '다음',
        stepIndex: 0,
      },
      password: {
        title: '비밀번호 설정',
        apply: '다음',
        stepIndex: 1,
      },
      profile: {
        title: '프로필 설정',
        apply: '완료',
        stepIndex: 2,
      },
      finish: {
        title: '회원가입 완료',
        apply: '시작하기',
        stepIndex: 3,
      },
    },
    error: {
      email: {
        format: '이메일의 형식이 맞지 않아요!',
        duplicated: '중복된 이메일이에요!',
      },
      password: '비밀번호의 글자 수는 4~20 사이여야 합니다!',
      confirmPassword: '동일한 비밀번호를 입력해주세요!',
    },
    induce: {
      signin: {
        text: '이미 계정을 만드셨나요?',
        link: '로그인',
      },
    },
  },
};
