import { Link } from 'react-router-dom';

export default function SignupFooter() {
  return (
    <div className='flex justify-center align-center gap-xs p-[2rem] border display-regular-14'>
      <span>계정이 있으신가요? </span>
      <Link className='text-point-blue ml-2' to='/auth/signin'>
        로그인
      </Link>
    </div>
  );
}
