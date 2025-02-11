import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <nav className="bg-gray-800 p-4 text-white flex justify-between">
      <h1 className="text-xl font-bold">Learning Platform</h1>
      <div>
        <Link to="/" className="mx-2">Home</Link>
        <Link to="/login" className="mx-2">Login</Link>
        <Link to="/register" className="mx-2">Register</Link>
        <Link to="/courses" className="mx-2">Courses</Link>
        <Link to="/subscribe" className="mx-2">Subscribe</Link>
      </div>
    </nav>
  );
}
export default Navbar;
