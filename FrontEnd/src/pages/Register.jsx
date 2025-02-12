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
    <form onSubmit={handleSubmit} className="p-5">
      <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" />
      <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" />
      <button type="submit" className="bg-blue-500 text-white px-5 py-2">Register</button>
    </form>
  );
}
export default Register;