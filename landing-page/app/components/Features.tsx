"use client";
import Image from "next/image";
import { motion } from "framer-motion";

export default function FeaturesSection() {
  return (
    <section className="py-20 bg-gradient-to-br from-purple-900 via-blue-900 to-purple-900 text-white relative">
      <div className="container mx-auto px-4">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-4xl md:text-5xl font-bold text-center mb-12"
        >
          Key Features
        </motion.h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <FeatureCard
            imageSrc="/icons/ape.png"
            title="Marketplace"
            description="Buy, sell, and trade phygital NFTs easily and securely."
          />
          <FeatureCard
            imageSrc="/icons/astronaut.png"
            title="WebXR"
            description="Experience your avatars in augmented and virtual reality."
          />
          <FeatureCard
            imageSrc="/icons/podium.png"
            title="Leaderboard"
            description="Compete with others and rise to the top of the leaderboard."
          />
        </div>
      </div>
    </section>
  );
}

function FeatureCard({
  imageSrc,
  title,
  description,
}: {
  imageSrc: string;
  title: string;
  description: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.2 }}
      whileHover={{
        scale: 1.05,
        boxShadow: "0px 0px 15px rgba(255, 255, 255, 0.5)",
      }}
      className="bg-gray-900 rounded-lg p-6 text-center"
    >
      <div className="relative w-16 h-16 mx-auto mb-4">
        <Image src={imageSrc} alt={title} layout="fill" objectFit="contain" />
      </div>
      <h3 className="text-2xl font-extrabold text-accent mb-2">{title}</h3>
      <p className="text-gray-300">{description}</p>
    </motion.div>
  );
}
