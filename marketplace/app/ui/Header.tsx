"use client";
import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ConnectWallet } from "./ConnectWallet";
import clsx from "clsx";
import Image from "next/image";
import { motion } from "framer-motion";

export default function Header() {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <header className="bg-background-dark text-primary-light p-4 flex justify-between items-center">
      <Link href="/">
        <div className="relative w-32 h-6 md:w-48 md:h-10">
          <Image
            src="/logo.svg"
            alt="Nero Marketplace Logo"
            layout="fill"
            className="sm:block cursor-pointer"
          />
        </div>
      </Link>
      <nav className="hidden md:flex space-x-4">
        <ul className="flex space-x-4">
          <li>
            <Link
              href="/explore"
              className={clsx("hover:text-secondary", {
                "text-secondary": pathname === "/explore",
              })}
            >
              Explore
            </Link>
          </li>
          <li>
            <Link
              href="/launch"
              className={clsx("hover:text-secondary", {
                "text-secondary": pathname === "/launch",
              })}
            >
              Launch
            </Link>
          </li>
          <li>
            <Link
              href="/dashboard"
              className={clsx("hover:text-secondary", {
                "text-secondary": pathname === "/dashboard",
              })}
            >
              Dashboard
            </Link>
          </li>
        </ul>
      </nav>
      <ConnectWallet />
      <div className="md:hidden flex items-center">
        <button onClick={toggleMobileMenu} className="focus:outline-none">
          <svg
            className="w-6 h-6 text-primary-light"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d={
                isMobileMenuOpen
                  ? "M6 18L18 6M6 6l12 12"
                  : "M4 6h16M4 12h16M4 18h16"
              }
            ></path>
          </svg>
        </button>
      </div>
      
      {isMobileMenuOpen && (
        <motion.nav
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="absolute top-16 left-0 w-full bg-primary-dark text-primary-light flex flex-col items-center space-y-4 sm:pb-4 pb-6 pt-2 shadow-lg md:hidden"
        >
          <Link
            href="/explore"
            className={clsx("hover:text-secondary", {
              "text-secondary": pathname === "/explore",
            })}
            onClick={toggleMobileMenu}
          >
            Explore
          </Link>
          <Link
            href="/launch"
            className={clsx("hover:text-secondary", {
              "text-secondary": pathname === "/launch",
            })}
            onClick={toggleMobileMenu}
          >
            Launch
          </Link>
          <Link
            href="/dashboard"
            className={clsx("hover:text-secondary", {
              "text-secondary": pathname === "/dashboard",
            })}
            onClick={toggleMobileMenu}
          >
            Dashboard
          </Link>
        </motion.nav>
      )}
    </header>
  );
}
