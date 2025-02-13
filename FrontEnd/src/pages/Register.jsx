import { useState } from 'react';
import API from '../api/api';
import { useNavigate } from 'react-router-dom';

function Register() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { data } = await API.post('/auth/register', { email, password });
    console.log('Registration Success:', data);
    navigate('/login');

  };

  return (
<form onSubmit={handleSubmit} className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
  <div className="bg-white shadow-md rounded-lg p-8 w-full max-w-sm">
    <h2 className="text-2xl font-bold mb-5 text-center">Register</h2>
    <input
      type="email"
      value={email}
      onChange={(e) => setEmail(e.target.value)}
      placeholder="Email"
      className="w-full p-2 mb-4 border rounded-md"
    />
    <input
      type="password"
      value={password}
      onChange={(e) => setPassword(e.target.value)}
      placeholder="Password"
      className="w-full p-2 mb-4 border rounded-md"
    />
    <button
      type="submit"
      className="w-full bg-blue-500 text-white px-5 py-2 rounded hover:bg-blue-600"
    >
      Register
    </button>
  </div>
</form>

  );
}
export default Register;