// AuthForm.jsx
import React, { useState } from "react";
import { motion } from "framer-motion";

const neonGlow = "shadow-[0_0_10px_#00ffff,0_0_20px_#00ffff,0_0_30px_#00ffff]";

const AuthForm = () => {
  const [formType, setFormType] = useState("login");
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");

  const toggleForm = () => {
    setFormType((prev) => (prev === "login" ? "signup" : "login"));
    setFormData({ email: "", password: "" });
    setError("");
  };

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.email || !formData.password) {
      setError("Please fill in all fields.");
      return;
    }

    console.log(`${formType === "login" ? "Logging in" : "Signing up"} with:`, formData);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black p-6">
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.6, type: "spring" }}
        className={`w-full max-w-md bg-black border border-cyan-400 p-8 rounded-2xl ${neonGlow}`}
      >
        <h2 className={`text-3xl font-bold text-cyan-400 text-center mb-6 uppercase`}>
          {formType === "login" ? "Login" : "Sign Up"}
        </h2>

        {error && <p className="text-red-400 text-sm text-center mb-4">{error}</p>}

        <form onSubmit={handleSubmit} className="space-y-5">
          <motion.div whileFocus={{ scale: 1.02 }}>
            <label className="block text-sm text-cyan-300">Email</label>
            <input
              type="email"
              name="email"
              placeholder="you@example.com"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded-lg bg-black text-cyan-100 border border-cyan-500 placeholder-cyan-600 focus:outline-none focus:ring-2 focus:ring-cyan-400"
            />
          </motion.div>

          <motion.div whileFocus={{ scale: 1.02 }}>
            <label className="block text-sm text-cyan-300">Password</label>
            <input
              type="password"
              name="password"
              placeholder="••••••••"
              value={formData.password}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded-lg bg-black text-cyan-100 border border-cyan-500 placeholder-cyan-600 focus:outline-none focus:ring-2 focus:ring-cyan-400"
            />
          </motion.div>

          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.96 }}
            type="submit"
            className={`w-full py-2 rounded-lg font-semibold text-black bg-cyan-400 hover:bg-cyan-300 transition duration-300`}
          >
            {formType === "login" ? "Login" : "Sign Up"}
          </motion.button>
        </form>

        <div className="text-center mt-5 text-cyan-300">
          {formType === "login" ? (
            <>
              Don’t have an account?{" "}
              <button
                onClick={toggleForm}
                className="underline hover:text-cyan-200 transition"
              >
                Sign Up
              </button>
            </>
          ) : (
            <>
              Already have an account?{" "}
              <button
                onClick={toggleForm}
                className="underline hover:text-cyan-200 transition"
              >
                Login
              </button>
            </>
          )}
        </div>
      </motion.div>
    </div>
  );
};

export default AuthForm;
