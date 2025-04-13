import { motion } from "framer-motion";

const users = [
  {
    title: "👨‍⚕️ Doctors",
    description: "Instantly generate structured reports, saving time during patient intake and improving accuracy.",
  },
  {
    title: "🏥 Hospitals",
    description: "Standardize patient case documentation across departments and improve patient flow efficiency.",
  },
  {
    title: "💊 Clinics & Pharmacies",
    description: "Get AI-verified prescription suggestions and streamline medication planning.",
  },
  {
    title: "🧪 Health Startups",
    description: "Integrate smart intake modules for health tracking, symptom checkers, or telehealth services.",
  },
];

export default function Users() {
  return (
    <section className="py-20 px-6 max-w-6xl mx-auto text-center">
      <motion.h2
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-4xl md:text-5xl font-bold text-white mb-12"
      >
        Who is this for?
      </motion.h2>

      <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
        {users.map((user, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: index * 0.2 }}
            className="bg-white/5 backdrop-blur-md border border-white/10 p-6 rounded-2xl shadow-xl"
          >
            <h3 className="text-xl font-semibold text-purple-300 mb-2">{user.title}</h3>
            <p className="text-gray-300 text-sm">{user.description}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
