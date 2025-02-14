import { useState } from "react";
import { useParams } from "react-router-dom";
import API from "../api/api";
import { useNavigate } from "react-router-dom";

const ResetPassword = () => {
  const navigate = useNavigate();
  const { token } = useParams(); // Extract token from URL
  const [newPassword, setNewPassword] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleResetPassword = async (e) => {
    e.preventDefault();
    try {
      const { data } = await API.post("/auth/reset-password", { token, newPassword });
      setMessage(data.message);
      setError(""); // Clear any previous errors
      setTimeout(() => navigate('/login'), 2000); // Redirect to login after 2 seconds
    } catch (err) {
      setError(err.response?.data?.error || "Reset password failed.");
      setMessage(""); // Clear any previous messages
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-md rounded-lg p-8 w-full max-w-sm">
        <h1 className="text-2xl font-bold mb-5 text-center">Reset Password</h1>
        <form onSubmit={handleResetPassword} className="space-y-4">
          <div>
            <input
              type="password"
              placeholder="Enter new password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="w-full p-2 border rounded-md"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white px-5 py-2 rounded hover:bg-blue-600"
          >
            Reset Password
          </button>
        </form>
        {message && <p className="text-green-500 text-sm mt-3 text-center">{message}</p>}
        {error && <p className="text-red-500 text-sm mt-3 text-center">{error}</p>}
      </div>
    </div>
  );
};

export default ResetPassword;