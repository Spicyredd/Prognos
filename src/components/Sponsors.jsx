import { motion } from "framer-motion";

const sponsors = [
  { name: "OpenMed AI", logo: "https://dummyimage.com/120x40/8a2be2/ffffff&text=OpenMed" },
  { name: "HealthHack Labs", logo: "https://dummyimage.com/120x40/8a2be2/ffffff&text=HealthHack" },
  { name: "DocuFlow", logo: "https://dummyimage.com/120x40/8a2be2/ffffff&text=DocuFlow" },
  { name: "MedChainX", logo: "https://dummyimage.com/120x40/8a2be2/ffffff&text=MedChainX" },
];

export default function Sponsors() {
  return (
    <section className="py-20 px-6 max-w-5xl mx-auto text-center">
      <motion.h2
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-4xl md:text-5xl font-bold text-white mb-12"
      >
        Trusted by Innovators
      </motion.h2>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-8 items-center justify-center">
        {sponsors.map((sponsor, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: idx * 0.2 }}
            className="flex justify-center"
          >
            <img
              src={sponsor.logo}
              alt={sponsor.name}
              className="w-full max-w-[120px] object-contain opacity-80 hover:opacity-100 transition"
            />
          </motion.div>
        ))}
      </div>
    </section>
  );
}
