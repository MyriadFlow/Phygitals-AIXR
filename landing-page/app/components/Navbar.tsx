"use client";
import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";
import Image from "next/image";
import { motion } from "framer-motion";

export default function Navbar() {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <header className="bg-background-dark py-4 shadow-md">
      <div className="container mx-auto px-4 flex justify-between items-center">
        <Link href="/">
          <div className="relative w-32 h-8 md:w-48 md:h-12">
            <Image
              src="/logo.svg"
              alt="NeroXperience Logo"
              layout="fill"
              className="cursor-pointer object-contain"
            />
          </div>
        </Link>
        <nav className="hidden md:flex space-x-8">
          <ul className="flex space-x-8">
            <li>
              <Link
                href="#features"
                className={clsx(
                  "text-white hover:text-accent transition-colors duration-300",
                  {
                    "text-accent": pathname === "#features",
                  }
                )}
              >
                Features
              </Link>
            </li>
            <li>
              <Link
                href="#how-it-works"
                className={clsx(
                  "text-white hover:text-accent transition-colors duration-300",
                  {
                    "text-accent": pathname === "#about",
                  }
                )}
              >
                About
              </Link>
            </li>
            <li>
              <Link
                href="#contact"
                className={clsx(
                  "text-white hover:text-accent transition-colors duration-300",
                  {
                    "text-accent": pathname === "#contact",
                  }
                )}
              >
                Contact
              </Link>
            </li>
          </ul>
        </nav>
        <div className="md:hidden flex items-center">
          <button onClick={toggleMobileMenu} className="focus:outline-none">
            <svg
              className="w-6 h-6 text-white"
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
      </div>

      {isMobileMenuOpen && (
        <motion.nav
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="absolute top-16 left-0 w-full bg-background-dark text-white flex flex-col items-center space-y-4 sm:pb-4 pb-6 pt-2 shadow-lg md:hidden z-50"
        >
          <Link
            href="#features"
            className="hover:text-accent transition-colors duration-300"
            onClick={toggleMobileMenu}
          >
            Features
          </Link>
          <Link
            href="#how-it-works"
            className="hover:text-accent transition-colors duration-300"
            onClick={toggleMobileMenu}
          >
            About
          </Link>
          <Link
            href="#contact"
            className="hover:text-accent transition-colors duration-300"
            onClick={toggleMobileMenu}
          >
            Contact
          </Link>
        </motion.nav>
      )}
    </header>
  );
}
