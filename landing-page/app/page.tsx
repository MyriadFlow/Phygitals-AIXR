import Image from "next/image";
import heroImage from '../public/hero-image.webp';

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-between p-24 bg-background-light dark:bg-background-dark text-primary-dark dark:text-primary-light">

      {/* Hero Section */}
      <section className="text-center lg:w-1/2 mb-16 md:mb-32">
        <h1 className="text-4xl md:text-6xl font-bold mb-4">Empower Your Brand with AI-Powered NFTs</h1>
        <p className="text-lg md:text-xl mb-8">Create, launch, and manage unique NFT avatars and virtual environments to build thriving communities for your brand.</p>
        <button className="bg-accent hover:bg-secondary text-white font-bold py-2 px-4 rounded mb-8">
          Launch Your Brand
        </button>
        {/* Hero Image */}
        <div className="order-1 md:order-2 mt-8 md:mt-0">
          <Image
            src={heroImage}
            alt="Hero Image"
            width={720}
            height={540}
            className="shadow-lg rounded-md max-w-full h-auto"
          />
        </div>
      </section>

      {/* Features Section */}
      <section className="mb-16 md:mb-32">
        <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center">Key Features</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Feature Cards */}
          <div className="bg-primary-light dark:bg-primary-dark rounded-lg shadow-md p-6">
            Marketplace
          </div>
          <div className="bg-primary-light dark:bg-primary-dark rounded-lg shadow-md p-6">
            WebXR
          </div>
          <div className="bg-primary-light dark:bg-primary-dark rounded-lg shadow-md p-6">
            Leaderboard
          </div>
        </div>
      </section>

      {/* About Section */}
      {/* <section className="mb-16 md:mb-32">
        <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center">About</h2>
      </section> */}

      {/* Call to Action Section */}
      <section className="text-center">
        <h3 className="text-2xl md:text-3xl font-bold mb-4">Ready to Get Started?</h3>
        <button className="bg-accent hover:bg-secondary text-white font-bold py-2 px-4 rounded">
          Launch Your Brand
        </button>
      </section>
    </div>
  );
}