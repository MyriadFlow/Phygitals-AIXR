"use client"
import Link from "next/link";
import { usePathname } from 'next/navigation';
import { ConnectWallet } from "./ConnectWallet";
import clsx from "clsx";

export default function Header() {
  const pathname = usePathname();

  return (
    <header className="bg-primary-dark text-primary-light p-4 flex justify-between items-center">
      <h1 className="text-2xl font-bold">Nero Marketplace</h1>
      <nav>
        <ul className="flex space-x-4">
          <li>
            <Link href="/explore" className={clsx("hover:text-secondary", {"text-secondary": pathname === '/explore'})}>
              Explore
            </Link>
          </li>
          <li>
              <Link  href="/launch" className={clsx("hover:text-secondary", {"text-secondary" : pathname === "/launch"})}>
                Launch
              </Link>
          </li>
          <li>
              <Link href="/dashboard" className={clsx("hover:text-secondary", {"text-secondary": pathname === "/dashboard"})}>
                Dashboard
              </Link>
            
          </li>
        </ul>
      </nav>
      <ConnectWallet />
    </header>
  );
}
