import React, { useState } from "react";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";

const neonPinkGlow = "shadow-[0_0_10px_#ff00ff,0_0_20px_#ff00ff,0_0_30px_#ff00ff]";
const inputStyle = "w-full px-4 py-2 rounded-lg border border-pink-400 text-white bg-transparent placeholder-pink-300 focus:outline-none focus:ring-2 focus:ring-pink-500";
const buttonStyle = "w-full bg-pink-500 hover:bg-pink-400 text-black font-bold py-2 rounded-lg transition shadow-[0_0_20px_#ff00ff]";

function Signup() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const { email, password, confirmPassword } = formData;

    if (!email || !password || !confirmPassword) {
      toast.error("All fields are required.");
      return;
    }

    if (password !== confirmPassword) {
      toast.error("Passwords do not match.");
      return;
    }

    const userData = { email, password };
    localStorage.setItem("registeredUser", JSON.stringify(userData));
    localStorage.setItem("isLoggedIn", "true");

    toast.success("Account created successfully!");
    setTimeout(() => navigate("/dashboard"), 1000);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black p-4">
      <Toaster position="top-center" />
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className={`w-full max-w-md p-8 border border-pink-400 bg-black rounded-2xl ${neonPinkGlow}`}
      >
        <h2 className="text-3xl font-bold text-pink-300 text-center mb-6">Sign Up</h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          <input type="email" name="email" placeholder="Email" className={inputStyle} value={formData.email} onChange={handleChange} required />
          <input type="password" name="password" placeholder="Password" className={inputStyle} value={formData.password} onChange={handleChange} required />
          <input type="password" name="confirmPassword" placeholder="Confirm Password" className={inputStyle} value={formData.confirmPassword} onChange={handleChange} required />

          <motion.button whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.95 }} type="submit" className={buttonStyle}>
            Sign Up
          </motion.button>
        </form>

        <div className="text-center mt-6">
          <Link to="/" className="text-pink-300 hover:underline text-sm">
            Already have an account? Login
          </Link>
        </div>
      </motion.div>
    </div>
  );
}

export default Signup;
