"use client";
import { useState } from 'react';
import Link from 'next/link';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-white dark:bg-primary-dark py-4 shadow-md">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center">
        <Link href="/" className="text-xl font-bold text-gray-800 dark:text-primary-light">
            Phygitals
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-4">
          <Link href="#features" className="text-gray-800 dark:text-primary-light hover:text-blue-500 dark:hover:text-secondary">Features</Link>
            <Link href="#about" className="text-gray-800 dark:text-primary-light hover:text-blue-500 dark:hover:text-secondary">About</Link>
            <Link href="#contact" className="text-gray-800 dark:text-primary-light hover:text-blue-500 dark:hover:text-secondary">Contact</Link>
          </div>

          {/* Mobile Navigation Button */}
          <button
            className="md:hidden text-gray-800 dark:text-primary-light hover:text-blue-500 dark:hover:text-secondary focus:outline-none"
            onClick={() => setIsOpen(!isOpen)}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>

        {/* Mobile Dropdown */}
        {isOpen && (
          <div className="md:hidden mt-2 space-y-2">
          <Link href="#features" className="block text-gray-800 dark:text-primary-light hover:text-blue-500 dark:hover:text-secondary">Features</Link>
          <Link href="#about" className="block text-gray-800 dark:text-primary-light hover:text-blue-500 dark:hover:text-secondary">About</Link>
          <Link href="#contact" className="block text-gray-800 dark:text-primary-light hover:text-blue-500 dark:hover:text-secondary">Contact</Link>
        </div>
        )}
      </div>
    </nav>
  );
}