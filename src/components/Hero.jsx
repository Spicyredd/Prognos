import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { isAuthenticated } from "../utils/auth"; // ✅ import auth check

export default function Hero() {
  const navigate = useNavigate(); // ✅ add useNavigate hook

  const handleStart = () => {
    if (isAuthenticated()) {
      navigate("/chat");
    } else {
      navigate("/login");
    }
  };

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center text-center px-6 pt-32 pb-24 overflow-hidden">
      {/* Floating glow shapes */}
      <div className="absolute top-10 left-10 w-32 h-32 bg-purple-500 opacity-10 blur-3xl rounded-full animate-float-slow z-0"></div>
      <div className="absolute bottom-10 right-10 w-40 h-40 bg-pink-500 opacity-10 blur-3xl rounded-full animate-float-slow z-0"></div>

      {/* Main content */}
      <motion.h1
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="text-5xl md:text-7xl font-extrabold bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 bg-clip-text text-transparent leading-tight z-10"
      >
        Launch a Smart<br /> AI Medical Assistant
      </motion.h1>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 1 }}
        className="mt-6 max-w-2xl text-lg md:text-xl text-gray-300 z-10"
      >
        Fast, secure, and intuitive. Capture patient data and get instant LLM-powered medical insights.
      </motion.p>

      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="mt-10 px-8 py-4 bg-gradient-to-r from-pink-500 to-purple-600 text-white text-lg font-semibold rounded-xl shadow-xl transition z-10"
        onClick={handleStart} // ✅ changed this line
      >
        🚀 Start New Case
      </motion.button>
    </section>
  );
}
