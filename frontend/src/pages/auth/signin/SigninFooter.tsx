export default function SigninFooter() {
  return (
    <div className='flex justify-center align-center gap-xs p-sm m-xs border border-text-secondary'>
      <span>계정이 없으신가요? </span>
      <a className='text-green-700' href='/auth/signup'>
        회원가입
      </a>
    </div>
  );
}
