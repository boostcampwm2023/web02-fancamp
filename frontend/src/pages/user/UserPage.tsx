import { Link } from 'react-router-dom';

function UserPage() {
  return (
    <div>
      UserPage
      <Link to="/user/edit">수정</Link>
    </div>
  );
}

export default UserPage;
