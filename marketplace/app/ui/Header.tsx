import Link from "next/link";
import { ConnectWallet } from "./ConnectWallet";

export default function Header() {
  return (
    <header className="bg-primary-dark text-primary-light p-4 flex justify-between items-center">
      <h1 className="text-2xl font-bold">Nero Marketplace</h1>
      <nav>
        <ul className="flex space-x-4">
          <li>
            <Link href="/marketplace" className="hover:underline">
              Marketplace
            </Link>
          </li>
          <li>
            <Link href="/create-avatar" className="hover:underline">
              Create Avatar
            </Link>
          </li>
        </ul>
      </nav>
      <ConnectWallet />
    </header>
  );
}
