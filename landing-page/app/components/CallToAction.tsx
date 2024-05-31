"use client";
import { motion } from "framer-motion";
import Link from "next/link";

export default function CallToActionSection() {
  return (
    <section className="py-20 bg-gradient-to-r from-pink-900 via-purple-900 to-pink-900 animate-gradient-x bg-cover bg-center text-center relative overflow-hidden">
      <div className="absolute inset-0 bg-black bg-opacity-50"></div>
      <div className="relative z-10 mx-8">
        <motion.h3
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-4xl md:text-5xl font-extrabold text-white mb-8" // Removed text gradient
        >
          Ready to Get Started?
        </motion.h3>
        <Link href={"https://nero-marketplace.on-fleek.app/"} target="_blank">
          <motion.button
            whileHover={{
              scale: 1.1,
              boxShadow: "0px 0px 20px rgba(255, 255, 255, 0.8)",
            }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
            className="bg-secondary hover:bg-accent text-white font-extrabold py-3 px-8 rounded-full text-lg md:text-xl"
          >
            Launch Your Brand
          </motion.button>
        </Link>
      </div>
    </section>
  );
}
