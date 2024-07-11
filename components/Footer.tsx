"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  bgsvg,
  emailFooter,
  locationFooter,
  penguin,
  phoneFooter,
} from "@/public";

interface Navigation {
  id:number; 
  path:string; 
  title:string; 
}

const Navigation:Navigation[] = [
  {
    id:1 , path:"/", title:"HOME"
  }, 
  {
    id:2 , path:"/about", title:"ABOUT US"
  }, 
  {
    id:3 , path:"/services", title:"SERVICES"
  }, 
  {
    id:4 , path:"/contact", title:"CONTACT US "
  }, 
]



const Footer = () => {
  const navItems = ["HOME", "ABOUT US", "SERVICES", "Contact-Us"];
  const lotteryLinks = [
    "How to Play",
    "Results",
    "Winners",
    "Responsible Gaming",
  ];
  const legalLinks = [
    "Terms & Conditions",
    "Privacy Policy",
    "Cookie Policy",
    "Disclaimer",
  ];

  return (
    <footer className="relative   overflow-hidden">
      {/* New SVG Background */}
      <div className="absolute inset-0 opacity-10 -z-20">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern
              id="grid"
              width="40"
              height="40"
              patternUnits="userSpaceOnUse"
            >
              <path
                d="M 40 0 L 0 0 0 40"
                fill="none"
                stroke="currentColor"
                strokeWidth="1"
              />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>

      <div className="container mx-auto px-6 py-12 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Logo Section */}
          <Link href="/" className="flex flex-col items-center md:items-start">
            <Image
              src={penguin}
              height={80}
              width={80}
              alt="Jackpot Logo"
              className="mb-4"
            />
            <h1 className="text-2xl font-bold text-yellow-400">Jackpot</h1>
          </Link>

          {/* Navigation Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <h2 className="text-xl font-semibold mb-4 text-yellow-400">
              Navigation
            </h2>
            <ul className="space-y-2">
              {Navigation.map((item) => (
                <motion.li
                  key={item.id}
                  whileHover={{ x: 5 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <Link
                    href={item.path}
                    className="text-indigo-600 hover:text-yellow-400 transition duration-300"
                  >
                    {item.title}
                  </Link>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Lottery Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h2 className="text-xl font-semibold mb-4 text-yellow-400">
              Lottery Info
            </h2>
            <ul className="space-y-2">
              {lotteryLinks.map((item) => (
                <motion.li
                  key={item}
                  whileHover={{ x: 5 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <Link
                    href={`/#${item.toLowerCase().replace(" ", "-")}`}
                    className="text-indigo-600 hover:text-yellow-400 transition duration-300"
                  >
                    {item}
                  </Link>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <h2 className="text-xl font-semibold mb-4 text-yellow-400">
              Contact Us
            </h2>
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <Image src={phoneFooter} alt="Phone" height={24} width={24} />
                <p>
                  <span className="block text-sm text-indigo-600">Call us</span>
                  +919889989898
                </p>
              </div>
              <div className="flex items-center space-x-3">
                <Image src={emailFooter} alt="Email" height={24} width={24} />
                <p>
                  <span className="block text-sm text-indigo-600">Email</span>
                  startmarketing@gmail.com
                </p>
              </div>
              <div className="flex items-center space-x-3">
                <Image
                  src={locationFooter}
                  alt="Location"
                  height={24}
                  width={24}
                />
                <p>
                  <span className="block text-sm text-indigo-600">Address</span>
                  123 Lottery Lane, Jackpot City
                </p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Legal Links */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-12 pt-8 border-t border-indigo-700"
        >
          <ul className="flex flex-wrap justify-center gap-x-8 gap-y-2">
            {legalLinks.map((item) => (
              <motion.li
                key={item}
                whileHover={{ y: -2 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <Link
                  href={`/${item.toLowerCase().replace(/&|\s+/g, "-")}`}
                  className="text-sm text-indigo-300 hover:text-yellow-400 transition duration-300"
                >
                  {item}
                </Link>
              </motion.li>
            ))}
          </ul>
          <p className="mt-8 text-center text-sm text-indigo-300">
            © {new Date().getFullYear()} Jackpot Lottery. All rights reserved.
          </p>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;
