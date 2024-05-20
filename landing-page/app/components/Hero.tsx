import Image from 'next/image';
import heroImage from '../../public/hero-image.webp';

export default function Hero() {
  return (
    <div className="relative bg-gradient-to-r from-purple-600 to-blue-500 py-20 md:py-40">
      <div className="container mx-auto px-4 md:px-8 flex flex-col md:flex-row items-center">
        {/* Text Container */}
        <div className="md:w-1/2 text-center md:text-left md:order-1">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Empower Your Brand with AI-Powered NFTs
          </h1>
          <p className="text-lg md:text-xl text-white mb-8">
            Create, launch, and manage unique NFT avatars and virtual environments to build thriving communities and monetize your brand.
          </p>
          <button className="bg-white text-purple-600 font-bold py-2 px-4 rounded hover:bg-opacity-90 transition duration-300">
            Launch Your Brand
          </button>
        </div>
        {/* Image Container */}
        <div className="md:w-1/2 order-1 md:order-2 mt-8 md:mt-0 md:ml-8">
          <Image
            src={heroImage}
            alt="Hero Image"
            width={720}
            height={540}
            className="shadow-lg rounded-md max-w-full h-auto"
          />
        </div>
      </div>
      {/* Gradient Overlay */}
      <div className="absolute bottom-0 right-0 w-full md:w-1/2 h-1/2 bg-gradient-to-t from-blue-500 to-transparent animate-pulse opacity-50"></div>
    </div>
  );
}
