"use client";
import { motion } from "framer-motion";

export default function HowItWorksSection() {
  return (
    <section className="py-20 bg-background-dark text-primary-light">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-12">
          How It Works
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          <StepCard
            step="1"
            title="Create an Avatar"
            description="Use our AI-powered tools to create a custom avatar."
            //   imageSrc="/images/create_avatar.png"
          />
          <StepCard
            step="2"
            title="Mint as NFT"
            description="Mint your avatar as a phygital NFT on the blockchain."
            //   imageSrc="/images/mint_nft.png"
          />
          <StepCard
            step="3"
            title="Trade & Collect"
            description="Trade and collect phygital NFTs in our marketplace."
            //   imageSrc="/images/trade_collect.png"
          />
        </div>
      </div>
    </section>
  );
}

function StepCard({
  step,
  title,
  description,
}: {
  step: string;
  title: string;
  description: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.2 }} // Add a slight delay for a cascading effect
      whileHover={{ scale: 1.05 }} // Add a hover effect with a scale
      className="bg-gray-800 rounded-lg p-6 text-center"
    >
      <div className="text-4xl text-accent font-extrabold mb-4 rounded-full w-12 h-12 flex items-center justify-center mx-auto">
        {/* Larger step number with a circle background */}
        {step}
      </div>
      <h3 className="text-2xl font-extrabold mb-2">{title}</h3>
      <p className="text-gray-300">{description}</p>
    </motion.div>
  );
}
