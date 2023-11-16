import { Link } from 'react-router-dom';

export default function SigninFooter() {
  return (
    <div className='flex justify-center align-center gap-xs p-[2rem] border display-regular-14'>
      <span>계정이 없으신가요? </span>
      <Link className='text-point-blue ml-2' to='/auth/signup'>
        회원가입
      </Link>
    </div>
  );
}
