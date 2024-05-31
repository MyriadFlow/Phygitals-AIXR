"use client";
import { useState } from "react";
import { Avatar } from "@readyplayerme/visage";
import { motion } from "framer-motion";
import Image from "next/image";

export default function AvatarShowcase() {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <section className="py-32 bg-gradient-to-br from-purple-900 via-blue-900 to-purple-900 text-white relative">
      <div className="container mx-auto px-4 text-center">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-4xl md:text-5xl font-extrabold mb-12"
        >
          Your Custom Avatar
        </motion.h2>
        <div className="flex justify-center items-center mx-auto relative">
          <motion.div
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            className="w-[350px] h-[350px]"
          >
            {/* {isHovered ? ( */}
            <Image
              src="/avatar.gif"
              alt="Avatar GIF"
              layout="fill"
              objectFit="contain"
            />
            {/* ) : (
              <Avatar modelSrc="https://models.readyplayer.me/6659a3e0b490861c5f2b755d.glb" scale={1.3} halfBody={false} cameraInitialDistance={4} cameraTarget={1.55} />
           )} */}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
