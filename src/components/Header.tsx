"use client";

import Link from "next/link";
import React, { useState, useEffect } from "react";
import {  X } from "lucide-react";
import { Facebook, Github, Instagram, Linkedin, Snapchat } from "../../public/assets/icons/icons";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (
        isOpen &&
        !target.closest(".mobile-menu") &&
        !target.closest(".menu-button")
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, [isOpen]);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Prevent body scroll when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Portfolio", href: "/portfolio" },
    { name: "Projects", href: "/projects" },
    { name: "GitHub", href: "/github" },
    { name: "Contact", href: "/contact" },
  ];

  const NavLink = ({ name, href }: { name: string; href: string }) => (
    <Link href={href} onClick={() => setIsOpen(false)}>
      <div className="relative inline-flex group">
        <div className="absolute opacity-0 group-hover:opacity-100 transition-all duration-300 -inset-px bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-700 hover:to-cyan-700 rounded-full blur-lg"></div>
        <span className="relative inline-flex items-center justify-center bg-transparent transition-all duration-200 font-pj rounded-full focus:ring-gray-900 text-gray-500 hover:text-cyan-500 cursor-pointer">
          {name}
        </span>
      </div>
    </Link>
  );

  return (
    <>
      <div
        className={`bg-black w-full m-auto fixed top-0 z-50 transition-all duration-300 ${
          isScrolled
            ? "bg-black/90 backdrop-blur-md border-b border-gray-800"
            : ""
        }`}
      >
        <div className="container m-auto px-4 py-4 sm:py-6 max-w-4xl bg-transparent">
          <div className="flex justify-between items-center">
            {/* Logo */}
            <div>
              <h1 className="font-extrabold text-xl sm:text-2xl bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
                Umar{`'`}s portfolio
              </h1>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden sm:block">
              <ul className="flex gap-6 lg:gap-10">
                {navLinks.map((link) => (
                  <li key={link.name}>
                    <NavLink name={link.name} href={link.href} />
                  </li>
                ))}
              </ul>
            </div>

            {/* Mobile Menu Button (Three Lines / Hamburger) */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="menu-button sm:hidden relative w-10 h-10 flex items-center justify-center rounded-lg bg-gray-900/50 backdrop-blur-sm border border-gray-700 hover:border-cyan-500 transition-all duration-300 group"
              aria-label="Toggle menu"
            >
              {isOpen ? (
                <X className="w-5 h-5 text-white group-hover:text-cyan-400 transition-colors" />
              ) : (
                <div className="flex flex-col gap-1.5">
                  <span className="w-5 h-0.5 bg-white group-hover:bg-cyan-400 transition-all duration-300"></span>
                  <span className="w-5 h-0.5 bg-white group-hover:bg-cyan-400 transition-all duration-300"></span>
                  <span className="w-5 h-0.5 bg-white group-hover:bg-cyan-400 transition-all duration-300"></span>
                </div>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <div
        className={`fixed inset-0 bg-black/95 backdrop-blur-md z-40 transition-all duration-500 sm:hidden ${
          isOpen ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
      >
        <div className="flex flex-col items-center justify-center min-h-screen px-6">
          {/* Animated Mobile Navigation */}
          <div className="mobile-menu flex flex-col items-center gap-8 w-full max-w-sm">
            {navLinks.map((link, index) => (
              <div
                key={link.name}
                className={`transform transition-all duration-500 delay-${
                  index * 100
                } ${
                  isOpen
                    ? "translate-x-0 opacity-100"
                    : "translate-x-10 opacity-0"
                }`}
              >
                <Link
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className="block"
                >
                  <div className="relative group">
                    <div className="absolute opacity-0 group-hover:opacity-100 transition-all duration-300 -inset-x-4 -inset-y-2 bg-gradient-to-r from-blue-500/20 to-cyan-500/20 rounded-xl blur-lg"></div>
                    <span className="relative text-2xl font-semibold text-gray-400 group-hover:text-cyan-400 transition-all duration-300">
                      {link.name}
                    </span>
                  </div>
                </Link>
              </div>
            ))}
             <div className=" flex justify-center items-center  ">
                 <div>
                   <ul className="flex gap-4 justify-center items-center">
                     <li>
                       <a href="https://web.facebook.com/" target="_blank">
                         <Facebook className="w-5 h-5 text-gray-500 hover:text-cyan-500" />
                       </a>
                     </li>
                     <li>
                       <a
                         href="https://www.linkedin.com/in/umar-azeem-9a24b9386/"
                         target="_blank"
                       >
                         <Linkedin className="w-5 h-5  text-gray-500 hover:text-cyan-500" />
                       </a>
                     </li>
                     <li>
                       <a
                         href="https://www.instagram.com/umar_azeem.64/"
                         target="_blank"
                       >
                         <Instagram  className="w-5 h-5  text-gray-500 hover:text-cyan-500"/>
                       </a>
                     </li>
                     <li>
                       <a
                         href="https://www.snapchat.com/add/mianu2398?share_id=tu1C5egnfBw&locale=en-US"
                         target="_blank"
                       >
                         <Snapchat className="w-5 h-5 text-gray-500 hover:text-cyan-500" />
                       </a>
                     </li>
                     <li>
                       <a href="https://github.com/" target="_blank">
                         <Github className="w-5 h-5 text-gray-500 hover:text-cyan-500"/>
                       </a>
                     </li>
                   </ul>
                 </div>
               </div>
          </div>

          {/* Social Links in Mobile Menu */}
         
        </div>
          
      </div>

      {/* Spacer to prevent content from hiding under fixed header */}
     
    </>
  );
}
