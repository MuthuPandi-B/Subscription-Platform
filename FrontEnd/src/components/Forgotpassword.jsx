import { useState } from 'react';
import API from '../api/api';

function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false); // Loading state

  const handleForgotPassword = async (e) => {
    e.preventDefault();
    setLoading(true); // Set loading to true
    setError(''); // Clear previous errors
    setMessage(''); // Clear previous messages

    try {
      const { data } = await API.post('/auth/forgot-password', { email });
      setMessage(data.message || 'Password reset email sent successfully!');
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to send password reset email. Please try again.');
    } finally {
      setLoading(false); // Set loading to false
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-md rounded-lg p-8 w-full max-w-sm">
        <h1 className="text-2xl font-bold mb-5 text-center">Forgot Password</h1>
        <form onSubmit={handleForgotPassword} className="space-y-4">
          <div>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-2 border rounded-md"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white px-5 py-2 rounded hover:bg-blue-600"
            disabled={loading} // Disable button when loading
          >
            {loading ? 'Sending...' : 'Submit'}
          </button>
        </form>
        {message && <p className="text-green-500 text-sm mt-3 text-center">{message}</p>}
        {error && <p className="text-red-500 text-sm mt-3 text-center">{error}</p>}
      </div>
    </div>
  );
}

export default ForgotPassword;