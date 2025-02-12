import { useState } from "react";
import { useParams} from "react-router-dom";
import API from "../api/api";

const ResetPassword = () => {
 const {token}=useParams(); // Extract token from URL
  const [newPassword, setNewPassword] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleResetPassword = async (e) => {
    e.preventDefault();
    console.log(token, newPassword);
    try {
      const { data } = await API.post("/auth/reset-password", { token, newPassword });
      setMessage(data.message);
    } catch (err) {
      setError(err.response?.data?.error || "Reset password failed.");
    }
  };

  return (
    <div className="p-5">
      <h1 className="text-2xl font-bold">Reset Password</h1>
      <form onSubmit={handleResetPassword} className="border p-5 my-3 bg-gray-100 rounded-lg">
        <input
          type="password"
          placeholder="Enter new password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          className="w-full p-2 my-2 border rounded"
          required
        />
        <button type="submit" className="bg-green-500 text-white px-5 py-2 rounded">
          Reset Password
        </button>
      </form>
      {message && <p className="text-green-500">{message}</p>}
      {error && <p className="text-red-500">{error}</p>}
    </div>
  );
};

export default ResetPassword;
