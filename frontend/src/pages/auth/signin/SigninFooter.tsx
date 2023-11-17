import { Link } from 'react-router-dom';

export default function SigninFooter() {
  return (
    <div className="align-center display-regular-14 flex justify-center gap-xs border p-[2rem]">
      <span>계정이 없으신가요? </span>
      <Link className="ml-2 text-point-blue" to="/auth/signup">
        회원가입
      </Link>
    </div>
  );
}
