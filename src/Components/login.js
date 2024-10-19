// Login.js
import React, { useState } from "react";
import axios from "axios"; // Import axios
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate =useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(""); // State for error handling
  const [loading, setLoading] = useState(false); // State for loading indication

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // Start loading

    try {
      const response = await axios.post('http://localhost:5000/api/login', {
        email,
        password,
      });

      // Handle successful login (e.g., redirect or store token)
      console.log("Login successful:", response.data);
      localStorage.setItem('userEmail', email);

      navigate("/");
      // Optionally, redirect the user or save a token here

    } catch (error) {
      console.error("Login error:", error.response?.data || error.message);
      setError(error.response?.data?.message || 'Something went wrong'); // Set error message for display
    } finally {
      setLoading(false); // Stop loading
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form className="max-w-sm w-full p-6 bg-white rounded-lg shadow-md" onSubmit={handleSubmit}>
        <h2 className="text-2xl font-bold mb-6 text-center text-blue-600">Login</h2>

        {error && <p className="text-red-500 mb-4">{error}</p>} {/* Error message */}

        <div className="mb-5">
          <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 text-left">Your email</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 text-left"
            placeholder="name@flowbite.com"
            required
          />
        </div>
        
        <div className="mb-5">
          <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 text-left">Your password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 text-left"
            required
          />
        </div>
        
        <div className="flex items-start mb-5">
          <div className="flex items-center h-5">
            <input
              id="terms"
              type="checkbox"
              className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300"
              required
            />
          </div>
          <label htmlFor="terms" className="ml-2 text-sm font-medium text-gray-900">
            I agree with the <a href="#" className="text-blue-600 hover:underline">terms and conditions</a>
          </label>
        </div>
        
        <button
          type="submit"
          className={`w-full text-white ${loading ? 'bg-gray-400' : 'bg-blue-700 hover:bg-blue-800'} focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center`}
          disabled={loading} // Disable button while loading
        >
          {loading ? 'Logging in...' : 'Login'}
        </button>
      </form>
    </div>
  );
};

export default Login;
