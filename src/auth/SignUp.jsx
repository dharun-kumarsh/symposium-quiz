import React, { useState } from "react";
import { motion } from "framer-motion";

const neonInput =
  "w-full px-4 py-2 rounded-lg border border-cyan-400 text-white bg-transparent placeholder-cyan-300 focus:outline-none focus:ring-2 focus:ring-cyan-500 shadow-[0_0_10px_#0ff]";

const neonButton =
  "w-full bg-cyan-500 hover:bg-cyan-400 text-black font-bold py-2 rounded-lg shadow-[0_0_15px_#0ff] transition";

function Signup() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.email || !formData.password || !formData.confirmPassword) {
      setError("All fields are required.");
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    console.log("Signing up with:", formData);
    // 🔐 Add your Firebase signup logic here
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black p-4">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="w-full max-w-md p-8 border border-cyan-400 rounded-2xl bg-black shadow-[0_0_40px_#0ff]"
      >
        <h2 className="text-3xl font-bold text-cyan-300 text-center mb-6">
          Sign Up
        </h2>

        {error && (
          <p className="text-red-400 text-sm text-center mb-4">{error}</p>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <input
              type="email"
              name="email"
              placeholder="Email"
              className={neonInput}
              value={formData.email}
              onChange={handleChange}
            />
          </div>
          <div>
            <input
              type="password"
              name="password"
              placeholder="Password"
              className={neonInput}
              value={formData.password}
              onChange={handleChange}
            />
          </div>
          <div>
            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirm Password"
              className={neonInput}
              value={formData.confirmPassword}
              onChange={handleChange}
            />
          </div>

          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            type="submit"
            className={neonButton}
          >
            Sign Up
          </motion.button>
        </form>

        <div className="text-center mt-6">
          <a href="/login" className="text-cyan-300 hover:underline text-sm">
            Already have an account? Login
          </a>
        </div>
      </motion.div>
    </div>
  );
}

export default Signup;
