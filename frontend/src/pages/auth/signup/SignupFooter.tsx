import { Link } from 'react-router-dom';

export default function SignupFooter() {
  return (
    <div className="align-center display-regular-14 flex justify-center gap-xs border p-[2rem]">
      <span>계정이 있으신가요? </span>
      <Link className="ml-2 text-point-blue" to="/auth/signin">
        로그인
      </Link>
    </div>
  );
}
