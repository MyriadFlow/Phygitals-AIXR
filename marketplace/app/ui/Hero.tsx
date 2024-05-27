import Link from "next/link";

export default function Hero() {
  return (
    <div className="text-primary-light p-20 text-center h-screen w-full">
      <h2 className="text-4xl font-bold mb-4">Welcome to Nero Marketplace</h2>
      <p className="text-xl mb-8">
        Discover, create, and trade unique AI-powered NFT avatars.
      </p>
      <div className="flex justify-center space-x-4">
        <Link
          href="/explore"
          className="bg-primary-dark text-primary-light py-2 px-4 rounded"
        >
          Explore Marketplace
        </Link>
        <Link
          href="/launch"
          className="bg-secondary text-primary-dark py-2 px-4 rounded"
        >
          Create Avatar
        </Link>
      </div>
    </div>
  );
}
