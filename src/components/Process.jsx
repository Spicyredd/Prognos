import { motion } from "framer-motion";

const steps = [
  {
    title: "🗣️ Doctor Starts New Case",
    description: "The doctor simply types 'New case' to begin the intake process.",
  },
  {
    title: "🤖 AI Gathers Patient Info",
    description: "The chatbot asks key questions and stores clinical observations securely.",
  },
  {
    title: "🧠 LLM Generates Report",
    description: "A structured summary is generated with Rx, Dx, Tx & management advice.",
  },
  {
    title: "✅ Doctor Reviews & Acts",
    description: "The report is shown for the doctor to review, update, and take next steps.",
  },
];

export default function Process() {
  return (
    <section className="py-20 px-6 max-w-6xl mx-auto text-center">
      <motion.h2
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-4xl md:text-5xl font-bold text-white mb-12"
      >
        How It Works
      </motion.h2>

      <div className="grid md:grid-cols-2 gap-10">
        {steps.map((step, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: idx * 0.2 }}
            className="bg-white/5 backdrop-blur-lg border border-white/10 p-6 rounded-2xl shadow-xl"
          >
            <h3 className="text-xl font-semibold text-purple-300 mb-2">{step.title}</h3>
            <p className="text-gray-300 text-sm">{step.description}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
