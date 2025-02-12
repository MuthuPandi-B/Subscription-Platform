import { useState } from 'react';
import API from '../api/api';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import{ useNavigate} from 'react-router-dom';

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const { setRole } = useContext(AuthContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { data } = await API.post('/auth/login', { email, password });
    localStorage.setItem('token', data.token);
    localStorage.setItem('role', data.role);
    setRole(data.role);
    console.log('Login Success:', data);
    navigate('/reset-password');

  };


  return (
    <form onSubmit={handleSubmit} className="p-5">
      <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" />
      <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" />
      <button type="submit" className="bg-blue-500 text-white px-5 py-2">Login</button>
      <button onClick={() => navigate('/forgot-password')} className="bg-blue-500 text-white px-5 py-2">Forgot Password</button>
    </form>
  );
}
export default Login;