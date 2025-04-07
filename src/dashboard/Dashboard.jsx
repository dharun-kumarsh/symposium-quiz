import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Play, PlusCircle, User } from "lucide-react"; // 👈 Lucide icons

const neon = "shadow-[0_0_10px_#ff00ff,0_0_20px_#ff00ff]";

const Card = ({ title, icon: Icon, description, link }) => (
  <motion.div
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.95 }}
    className={`bg-black border border-pink-500 rounded-xl p-6 text-center text-white ${neon} transition-all`}
  >
    <div className="flex justify-center mb-4 text-pink-300">
      <Icon size={40} />
    </div>
    <h3 className="text-xl font-semibold mb-2 text-pink-200">{title}</h3>
    <p className="text-sm text-pink-100 mb-4">{description}</p>
    {link && (
      <Link
        to={link}
        className="inline-block mt-2 bg-pink-500 text-black font-bold px-4 py-2 rounded-lg w-full hover:bg-pink-400 transition"
      >
        Go
      </Link>
    )}
  </motion.div>
);

function Dashboard() {
  return (
    <div className="min-h-screen bg-black px-4 py-8 flex flex-col items-center text-white">
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-4xl font-bold text-pink-400 mb-8 text-center"
      >
        Neon Quiz Dashboard 💡
      </motion.h1>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 w-full max-w-6xl">
        <Card
          title="Start Quiz"
          icon={Play}
          description="Jump into quiz mode and test your knowledge!"
          link="/start-quiz"
        />
        <Card
          title="Create Quiz"
          icon={PlusCircle}
          description="Craft your own quiz and challenge others!"
          link="/create-quiz"
        />
        <Card
          title="My Profile"
          icon={User}
          description="View your stats, badges, and progress."
          link="/profile"
        />
      </div>
    </div>
  );
}

export default Dashboard;
