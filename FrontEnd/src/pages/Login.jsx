import { useState, useContext } from 'react';
import API from '../api/api';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({}); // State to store backend errors

  const { setRole } = useContext(AuthContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({}); // Clear previous errors

    try {
      const { data } = await API.post('/auth/login', { email, password });
      localStorage.setItem('token', data.token);
      localStorage.setItem('role', data.role);
      setRole(data.role);
      // console.log('Login Success:', data);
      navigate('/');
    } catch (error) {
      if (error.response && error.response.data) {
        // Assuming backend sends an error object like { error: "User not found" }
        setErrors({ backend: error.response.data.error });
        console.error('Backend error:', error.response.data.error);
      } else {
        console.error('An unexpected error occurred:', error);
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-md rounded-lg p-8 w-full max-w-sm">
        <h2 className="text-2xl font-bold mb-5 text-center">Login</h2>
        <div className="mb-4">
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            className="w-full p-2 border rounded-md"
          />
          {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
        </div>
        <div className="mb-4">
          <input
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            className="w-full p-2 border rounded-md"
          />
          {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
        </div>
        {errors.backend && <p className="text-red-500 text-sm mt-1 text-center">{errors.backend}</p>}
        <button
          type="submit"
          className="w-full bg-blue-500 text-white px-5 py-2 rounded mb-2 hover:bg-blue-600"
        >
          Login
        </button>
        <button
          onClick={() => navigate('/forgot-password')}
          type="button"
          className="w-full bg-gray-500 text-white px-5 py-2 rounded hover:bg-gray-600"
        >
          Forgot Password
        </button>
        <p className="text-center mt-4">
          Don't have an account?{' '}
          <button
            onClick={() => navigate('/register')}
            className="text-blue-500 hover:underline"
          >
            Register
          </button>
        </p>
      </div>
    </form>
  );
}

export default Login;