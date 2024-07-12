"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import { Menu, X } from "lucide-react";
import { penguin } from "@/public";
import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import { cn } from "@/lib/utils";

interface NavlinksInterface {
  id: number;
  title: string;
  path: string;
}

const Navlinks: NavlinksInterface[] = [
  {
    id: 1,
    title: "HOME",
    path: "/",
  },
  {
    id: 2,
    title: "ABOUT",
    path: "/about",
  },
  {
    id: 3,
    title: "CONTACT US",
    path: "/contact",
  },
  {
    id: 4,
    title: "SERVICES",
    path: "/services",
  },
];

interface MobileNavProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

const MobileNav = ({ isOpen, setIsOpen }: MobileNavProps) => {
  return (
    <section>
      <motion.div
        className={cn("md:hidden", isOpen ? "my-4" : "")}
        initial={{ opacity: 0, height: 0 }}
        animate={{
          opacity: isOpen ? 1 : 0,
          height: isOpen ? "auto" : 0,
        }}
        transition={{ duration: 0.3 }}
      >
        <nav className="bg-gray-100 rounded-lg p-4">
          <ul className="space-y-2">
            {Navlinks.map((item) => (
              <motion.li key={item.id} whileTap={{ scale: 0.95 }}>
                <Link
                  href={item.path}
                  className="text-gray-700 hover:text-purple-600 transition duration-300 block py-2"
                >
                  {item.title}
                </Link>
              </motion.li>
            ))}
          </ul>
        </nav>

        <div className="">
          <SignedOut>
            <div className="grid grid-cols-2 gap-4 px-10 pt-6">
              <Link
                href="/sign-in"
                className="block text-center bg-gray-200 text-gray-700 px-4 py-2 rounded-full hover:bg-gray-300 transition duration-300"
              >
                Log In
              </Link>
              <Link
                href="/sign-up"
                className="block text-center bg-gray-200 text-gray-700 px-4 py-2 rounded-full hover:bg-gray-300 transition duration-300"
              >
                Register
              </Link>
            </div>
          </SignedOut>

          <SignedIn>
            <div className="flex justify-center">
              <UserButton />
            </div>
          </SignedIn>
        </div>
      </motion.div>
    </section>
  );
};

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    if (latest > 300) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  });

  const navItems = ["HOME", "ABOUT US", "SERVICES", "Contact-Us"];

  return (
    <motion.header
      className="fixed  top-0 left-0 right-0  bg-white shadow-md z-50"
      initial={{ opacity: 0, y: -100 }}
      animate={{
        opacity: isVisible ? 1 : 0,
        y: isVisible ? 0 : -100,
      }}
      transition={{ duration: 0.5, ease: "easeInOut" }}
    >
      <div className="container mx-auto px-4 py-1">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <Image
              src={penguin}
              alt="Jackpot Logo"
              width={60}
              height={60}
              className="mr-3"
            />
            <h1 className="text-2xl font-bold text-gray-800">Jackpot</h1>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:block">
            <div className="relative">
              <div className="bg-gray-100 rounded-full px-4 py-2">
                <ul className="flex space-x-6">
                  {navItems.map((item) => (
                    <motion.li
                      key={item}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Link
                        href={`/${item.toLowerCase().replace(" ", "-")}`}
                        className="text-gray-700 hover:text-purple-600 transition duration-300"
                      >
                        {item}
                      </Link>
                    </motion.li>
                  ))}
                </ul>
              </div>
            </div>
          </nav>

          {/* Mobile Navigation Toggle */}
          <div className="md:hidden">
            <motion.button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-700 hover:text-purple-600 transition duration-300"
              whileTap={{ scale: 0.95 }}
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </motion.button>
          </div>

          {/* Authentication Buttons */}
          <div className="hidden md:block">
            <SignedOut>
              <Link
                href="/sign-up"
                className="text-gray-700 border-purple-600 border px-6 py-1 rounded-full lg:border-2 hover:text-purple-600 transition duration-300 mr-4"
              >
                Register
              </Link>
            </SignedOut>
            <SignedIn>
              <UserButton />
            </SignedIn>
          </div>
        </div>

        <MobileNav isOpen={isOpen} setIsOpen={setIsOpen} />
      </div>
    </motion.header>
  );
};

export default Navbar;

