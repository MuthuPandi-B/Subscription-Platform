import { useState } from 'react';
import API from '../api/api';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';


function Register() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState(''); // For success messages
  const [error, setError] = useState(''); // For backend error messages
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(''); // Clear previous errors
    setMessage(''); // Clear previous messages

    try {
      setLoading(true);
      const { data } = await API.post('/auth/register', { email, password });
      setLoading(false);
      setMessage(data.message || 'Registration successful!');
      setTimeout(() => navigate('/login'), 2000); // Redirect to login after 2 seconds
    } catch (err) {
      setLoading(false);
      setError(err.response?.data?.error || 'Registration failed. Please try again.');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-md rounded-lg p-8 w-full max-w-sm">
        <h2 className="text-2xl font-bold mb-5 text-center">Register</h2>
        <div className="mb-4">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            className="w-full p-2 border rounded-md"
            required
          />
        </div>
        <div className="mb-4">
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            className="w-full p-2 border rounded-md"
            required
          />
        </div>
        {message && <p className="text-green-500 text-sm mb-4 text-center">{message}</p>}
        {error && <p className="text-red-500 text-sm mb-4 text-center">{error}</p>}
        <button
          type="submit"
          className="w-full bg-blue-500 text-white px-5 py-2 rounded hover:bg-blue-600"
        >
          {loading ? 'Loading...' : 'Register'}
        </button>
        <p className="mt-4 text-center">
          Already have an account?{' '}
      <Link to="/login" className="text-blue-500 hover:underline">Login</Link> 
        </p>
      </div>
    </form>
  );
}

export default Register;