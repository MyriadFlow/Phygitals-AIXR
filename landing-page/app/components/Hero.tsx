"use client";
import { motion } from "framer-motion";
import Link from "next/link";

export default function HeroSection() {
  return (
    <section className="relative h-screen flex items-center justify-center text-center overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-pink-900 via-purple-900 to-pink-900 animate-gradient-x"></div>
      <div className="particle-container"></div>
      <div className="relative z-10 mx-8 mb-16">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-5xl md:text-7xl font-extrabold text-white mb-4 font-orbitron" // Futuristic font
        >
          Empower Your Brand <br /> with AI-Powered NFTs
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-xl md:text-2xl text-white mb-8 text-shadow" // Text shadow
        >
          Discover, create, and trade phygital NFTs with AI-powered avatars
        </motion.p>
        <Link href="https://nero-marketplace.on-fleek.app/" target="_blank">
          <motion.button
            whileHover={{
              scale: 1.1,
              boxShadow: "0px 0px 20px rgba(255, 255, 255, 0.8)",
            }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
            className="bg-accent hover:bg-secondary text-white font-extrabold py-3 px-8 rounded-full text-lg md:text-xl"
          >
            Launch Your Brand
          </motion.button>
        </Link>
      </div>
    </section>
  );
}
