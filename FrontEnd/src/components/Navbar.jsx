import { Link, useNavigate } from 'react-router-dom';

function Navbar() {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');
  const role = localStorage.getItem('role');

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    navigate('/login');
  };

  return (
    <nav className="bg-gray-800 p-4 text-white flex justify-between">
      <h1 className="text-xl font-bold">Learning Platform</h1>
      <div>
        {token ? (
          <>
            <Link to="/" className="mx-2">Home</Link>
            {role === 'student' && (
              <>
                <Link to="/courses" className="mx-2">Courses</Link>
                <Link to="/subscribe" className="mx-2">Subscribe</Link>
                <Link to="/my-courses" className="mx-2">My Courses</Link>
              </>
            )}
            {role === 'admin' && (
              <Link to="/courses" className="mx-2">Courses</Link>
            )}
            <button onClick={handleLogout} className="mx-2">Logout</button>
          </>
        ) : (
          <>
            <Link to="/" className="mx-2">Home</Link>
            <Link to="/login" className="mx-2">Login</Link>
            <Link to="/register" className="mx-2">Register</Link>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
