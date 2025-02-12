import { useState } from "react";
import API from "../api/api"; // Ensure your API is correctly configured

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleForgotPassword = async (e) => {
    e.preventDefault();
    try {
      // Send forgot password request to the backend
      const { data } = await API.post("/auth/forgot-password", { email });

      // Display success message to the user
      setMessage("Password reset email sent successfully!");
      setError(""); // Clear any previous errors
    } catch (err) {
      setMessage(""); // Clear previous success message
      setError(err.response?.data?.error || "Forgot password request failed.");
    }
  };

  return (
    <div className="p-5">
      <h1 className="text-2xl font-bold">Forgot Password</h1>
      <form onSubmit={handleForgotPassword} className="border p-5 my-3 bg-gray-100 rounded-lg">
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-2 my-2 border rounded"
          required
        />
        <button type="submit" className="bg-blue-500 text-white px-5 py-2 rounded">
          Submit
        </button>
      </form>

      {/* Display success or error message */}
      {message && <p className="text-green-500">{message}</p>}
      {error && <p className="text-red-500">{error}</p>}
    </div>
  );
};

export default ForgotPassword;
