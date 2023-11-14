export default function SignupFooter() {
  return (
    <div className='flex justify-center align-center gap-2 p-8 m-4 border'>
      <span>계정이 있으신가요? </span>
      <a className='text-green-700' href='/auth/signin'>
        로그인
      </a>
    </div>
  );
}
