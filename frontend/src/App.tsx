import { Link } from 'react-router-dom';

function App() {
  return (
    <main className='flex flex-col'>
      <Link to='/auth/signin'>로그인</Link>
      <Link to='/auth/signup'>회원가입</Link>
      <Link to='/camps/1/chat'>채팅</Link>
      <Link to='/components/demo'>컴포넌트 데모</Link>
    </main>
  );
}

export default App;
