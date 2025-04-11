import { motion } from "framer-motion";

const features = [
  {
    icon: "⚡",
    title: "Real-time AI Reports",
    description: "Instant LLM-powered medical summaries with differential diagnosis, prescription, and treatment suggestions.",
  },
  {
    icon: "🔐",
    title: "Secure & Private",
    description: "Patient data handled with end-to-end encryption and designed to comply with privacy standards.",
  },
  {
    icon: "🧠",
    title: "Adaptive Conversation",
    description: "Smart chatbot dynamically adjusts based on patient inputs and context to streamline data gathering.",
  },
  {
    icon: "📊",
    title: "Visual Summaries",
    description: "Generated reports are structured, styled in markdown, and easy to review and share.",
  },
];

export default function Features() {
  return (
    <section className="py-20 px-6 max-w-6xl mx-auto text-center">
      <motion.h2
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-4xl md:text-5xl font-bold text-white mb-12"
      >
        Core Features
      </motion.h2>

      <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
        {features.map((feature, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: index * 0.2 }}
            className="bg-white/5 backdrop-blur-md border border-white/10 p-6 rounded-2xl shadow-xl"
          >
            <div className="text-4xl mb-3">{feature.icon}</div>
            <h3 className="text-xl font-semibold text-purple-300 mb-2">{feature.title}</h3>
            <p className="text-gray-300 text-sm">{feature.description}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
