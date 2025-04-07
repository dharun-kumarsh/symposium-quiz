import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import toast, { Toaster } from "react-hot-toast";

const neonPinkGlow = "shadow-[0_0_10px_#ff00ff,0_0_20px_#ff00ff,0_0_30px_#ff00ff]";
const buttonStyle = "mt-6 w-full bg-pink-500 hover:bg-pink-400 text-black font-bold py-2 rounded-lg transition shadow-[0_0_20px_#ff00ff]";

function Profile() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("registeredUser"));

  useEffect(() => {
    const isLoggedIn = localStorage.getItem("isLoggedIn");
    if (!isLoggedIn || !user) {
      toast.error("Please log in first.");
      navigate("/");
    }
  }, [navigate, user]);

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    toast.success("Logged out successfully!");
    setTimeout(() => navigate("/"), 1000);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black p-4">
      <Toaster position="top-center" />
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className={`w-full max-w-md p-8 border border-pink-400 bg-black rounded-2xl text-white text-center ${neonPinkGlow}`}
      >
        <h2 className="text-3xl font-bold text-pink-300 mb-4">Welcome!</h2>
        <p className="text-pink-200">Logged in as:</p>
        <p className="text-lg text-white font-semibold">{user?.email}</p>

        <motion.button
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.95 }}
          className={buttonStyle}
          onClick={handleLogout}
        >
          Logout
        </motion.button>
      </motion.div>
    </div>
  );
}

export default Profile;
