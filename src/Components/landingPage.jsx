// src/LandingPage.js
import React from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate

const LandingPage = () => {
  const navigate = useNavigate(); // Initialize useNavigate

  return (
    <div>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-blue-600 to-blue-400 text-white text-center py-28">
        <div className="absolute inset-0">
          <img
            src="./Group.jpeg" // Image of a group listening to music
            alt="Group Listening to Music"
            className="object-cover w-full h-full opacity-30"
          />
        </div>
        <div className="relative z-10">
          <h1 className="text-6xl font-bold mb-6 drop-shadow-lg">SyncTunes</h1>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Listen to music with friends, in perfect sync, no matter where you
            are!
          </p>
          <button
            onClick={() => navigate("/play")}
            className="bg-white text-blue-600 font-semibold px-8 py-4 rounded-lg shadow-lg transition-transform transform hover:scale-105 hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-opacity-50"
          >
            Get Started
          </button>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-gray-100">
        <div className="container mx-auto text-center">
          <h2 className="text-5xl font-bold mb-12">Why Use SyncTunes?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            <div className="bg-white p-8 rounded-lg shadow-lg transition-transform transform hover:scale-105">
              <h3 className="text-3xl font-semibold mb-4">🎶 Real-Time Sync</h3>
              <p className="text-gray-700">
                Experience seamless, synchronized music playback with friends
                across devices.
              </p>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-lg transition-transform transform hover:scale-105">
              <h3 className="text-3xl font-semibold mb-4">
                📱 Cross-Device Compatibility
              </h3>
              <p className="text-gray-700">
                Sync music on any device—mobile, tablet, or desktop—without
                interruptions.
              </p>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-lg transition-transform transform hover:scale-105">
              <h3 className="text-3xl font-semibold mb-4">
                🔒 Private Listening Rooms
              </h3>
              <p className="text-gray-700">
                Create secure, private rooms and enjoy your own virtual concert,
                just for you and your friends.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto text-center">
          <h2 className="text-5xl font-bold mb-12">What Our Users Say</h2>
          <div className="flex flex-wrap justify-center">
            <div className="bg-gray-100 p-6 m-4 rounded-lg shadow-lg max-w-xs">
              <p className="italic text-gray-800">
                “SyncTunes made it easy for me and my friends to enjoy music
                together, even from different places!”
              </p>
              <p className="font-semibold mt-4 text-blue-600">- Shiva V.</p>
            </div>
            <div className="bg-gray-100 p-6 m-4 rounded-lg shadow-lg max-w-xs">
              <p className="italic text-gray-800">
                “Finally, I can share my favorite playlists with my friends in
                real-time!”
              </p>
              <p className="font-semibold mt-4 text-blue-600">- Akhil K.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="bg-blue-600 text-white text-center py-20">
        <h2 className="text-4xl font-bold mb-4">
          Start Your SyncTunes Experience Now!
        </h2>
        <p className="mb-6 text-lg">
          Bring your friends together with music, no matter where they are.
        </p>
        <button
          onClick={() => navigate("/play")}
          className="bg-white text-blue-600 font-semibold px-6 py-3 rounded-lg shadow-lg transition-transform transform hover:scale-105 hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-opacity-50"
        >
          Join Now
        </button>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-white text-center py-4">
        <div className="container mx-auto">
          <p>&copy; 2024 SyncTunes. All rights reserved.</p>
          <div className="mt-2">
            <a href="#features" className="text-white hover:underline mx-2">
              Features
            </a>
            <a href="#testimonials" className="text-white hover:underline mx-2">
              Testimonials
            </a>
            <a href="#" className="text-white hover:underline mx-2">
              Contact
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
