"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import { Menu, X } from "lucide-react";
import { penguin } from "@/public";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const navItems = ["HOME", "ABOUT US", "SERVICES", "Contact-Us"];

  return (
    <header className="bg-white shadow-md">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center">
            <Image
              src={penguin}
              alt="Jackpot Logo"
              width={60}
              height={60}
              className="mr-3"
            />
            <h1 className="text-2xl font-bold text-gray-800">Jackpot</h1>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:block">
            <div className="relative">
              <div className="bg-gray-100 rounded-full px-4 py-2">
                <ul className="flex space-x-6">
                  {navItems.map((item) => (
                    <li key={item}>
                      <Link
                        href={`/${item.toLowerCase().replace(" ", "-")}`}
                        className="text-gray-700 hover:text-purple-600 transition duration-300"
                      >
                        {item}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </nav>

          {/* Mobile Navigation Toggle */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-700 hover:text-purple-600 transition duration-300"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

          {/* Authentication Buttons */}
          <div className="hidden md:block">
            <SignedOut>
              <Link
                href="/sign-in"
                className="text-gray-700 hover:text-purple-600 transition duration-300 mr-4"
              >
                Sign in
              </Link>
              <Link
                href="/sign-up"
                className="bg-purple-600 text-white px-4 py-2 rounded-full hover:bg-purple-700 transition duration-300"
              >
                Sign up
              </Link>
            </SignedOut>
            <SignedIn>
              <UserButton />
            </SignedIn>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        {isOpen && (
          <div className="md:hidden mt-4">
            <nav className="bg-gray-100 rounded-lg p-4">
              <ul className="space-y-2">
                {navItems.map((item) => (
                  <li key={item}>
                    <Link
                      href={`/${item.toLowerCase().replace(" ", "-")}`}
                      className="text-gray-700 hover:text-purple-600 transition duration-300 block py-2"
                    >
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
            <div className="mt-4 space-y-2">
              <SignedOut>
                <Link
                  href="/sign-in"
                  className="block text-center bg-gray-200 text-gray-700 px-4 py-2 rounded-full hover:bg-gray-300 transition duration-300"
                >
                  Sign in
                </Link>
                <Link
                  href="/sign-up"
                  className="block text-center bg-purple-600 text-white px-4 py-2 rounded-full hover:bg-purple-700 transition duration-300"
                >
                  Sign up
                </Link>
              </SignedOut>
              <SignedIn>
                <div className="flex justify-center">
                
                </div>
              </SignedIn>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Navbar;
