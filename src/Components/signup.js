// Signup.js
import React, { useState } from "react";
import axios from "axios"; // Import axios for making HTTP requests

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Handle signup logic here
    try {
      const response = await axios.post('http://localhost:5000/api/signUp', {
        name,
        email,
        password,
      });
      console.log("Signup successful:", response.data);
      // You can redirect or perform additional actions here
    } catch (error) {
      console.error("Error signing up:", error);
      // Handle error response here
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full">
        <h2 className="text-2xl font-bold mb-6 text-blue-600 text-center">Signup</h2>

        <div className="mb-4">
          <label className="block mb-2 text-sm font-bold text-gray-700 text-left">Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full p-2 border rounded-md focus:ring-blue-500 focus:border-blue-500 text-left"
            placeholder="Enter your name"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block mb-2 text-sm font-bold text-gray-700 text-left">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-2 border rounded-md focus:ring-blue-500 focus:border-blue-500 text-left"
            placeholder="Enter your email"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block mb-2 text-sm font-bold text-gray-700 text-left">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-2 border rounded-md focus:ring-blue-500 focus:border-blue-500 text-left"
            placeholder="Enter your password"
            required
          />
        </div>

        <button
          type="submit"
          className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition duration-200 w-full"
        >
          Signup
        </button>
      </form>
    </div>
  );
};

export default Signup;
