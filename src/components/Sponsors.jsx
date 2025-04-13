import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import Image1 from "../assets/1.png";
import Image2 from "../assets/2.png";
import Image3 from "../assets/3.png";
import Image4 from "../assets/4.png";

const sponsors = [
  { name: "OpenMed AI", logo: Image1 },
  { name: "HealthHack Labs", logo: Image2 },
  { name: "DocuFlow", logo: Image3 },
  { name: "MedChainX", logo: Image4 },
];

export default function Sponsors() {
  const containerRef = useRef(null);
  const scrollRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const scrollEl = scrollRef.current;
    if (!scrollEl) return;

    let scrollAmount = 0;
    let animationFrame;

    const animate = () => {
      if (!isHovered) {
        scrollAmount += 0.5;
        scrollEl.style.transform = `translateX(-${scrollAmount}px)`;

        if (scrollAmount >= scrollEl.scrollWidth / 2) {
          scrollAmount = 0;
        }
      }
      animationFrame = requestAnimationFrame(animate);
    };

    animate();
    return () => cancelAnimationFrame(animationFrame);
  }, [isHovered]);

  return (
    <section className="py-16 px-4 text-center text-white overflow-hidden relative">
      <motion.h2
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-3xl md:text-4xl font-bold mb-10"
      >
        Trusted by Innovators
      </motion.h2>

      <div
        className="relative max-w-4xl mx-auto overflow-hidden"
        ref={containerRef}
      >
        <div
          className="flex gap-16 whitespace-nowrap py-4 px-2 will-change-transform"
          ref={scrollRef}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          style={{ display: 'inline-flex' }}
        >
          {[...sponsors, ...sponsors].map((sponsor, idx) => (
            <img
              key={idx}
              src={sponsor.logo}
              alt={sponsor.name}
              className="w-28 h-28 object-contain"
            />
          ))}
        </div>
      </div>
    </section>
  );
}