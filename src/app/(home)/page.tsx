"use client";
import Image from "next/image";
import React from "react";
import { Typewriter } from 'react-simple-typewriter';
import { motion } from "framer-motion";

export default function Main() {
  return (
    <div className="max-w-6xl mx-auto px-4 my-0 lg:my-10">
      <main className="mt-20 sm:mt-28">
        <section>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="flex flex-col sm:flex-row gap-10 text-center sm:text-left items-center"
          >
            {/* Left Content */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="flex-1"
            >
              <h1 className="font-bold text-2xl sm:text-3xl md:text-4xl lg:text-5xl">
                Hello, I{"’"}m Umar Azeem
              </h1>

              <h2 className="font-bold text-xl sm:text-2xl md:text-3xl lg:text-4xl mt-2 text-cyan-500 gradiant-text">
                <Typewriter
                  words={['front-end developer']}
                  cursor
                  cursorStyle="_"
                  typeSpeed={100}
                  deleteSpeed={50}
                  delaySpeed={1000}
                />
              </h2>

              <p className="mt-4 text-gray-400 hover:text-cyan-500 text-sm sm:text-base leading-relaxed">
                Former digital-marketing specialist, seeking to apply competent <br className="hidden sm:block" />
                development skills with focus on collaboration, communication, <br className="hidden sm:block" />
                and passion
              </p>

              {/* Resume Button */}
              <div className="relative inline-flex mt-6 group">
                <div className="absolute transition-all duration-1000 opacity-70 -inset-px bg-gradient-to-r from-[#44BCFF] via-[#FF44EC] to-[#FF675E] rounded-full blur-lg group-hover:opacity-100 group-hover:-inset-1 group-hover:duration-200 animate-tilt"></div>
                <a
                  href="https://drive.google.com/file/d/1oqGi7DXULYdTi0rvi5omf_M8ez5gxLz1/view?usp=sharing"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="relative text-gray-500 hover:text-cyan-500 inline-flex items-center justify-center px-6 py-3 sm:px-8 sm:py-4 text-base sm:text-lg font-semibold transition-all duration-200 bg-gray-950 rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900"
                >
                  Download Resume
                </a>
              </div>
            </motion.div>

            {/* Right Image */}
            <motion.div
              className="flex-1 flex justify-center"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <div className="relative w-[180px] sm:w-[200px] md:w-[220px] h-[180px] sm:h-[200px] md:h-[220px]">
                <div className="relative inline-flex group">
                  <div className="absolute transition-all duration-1000 opacity-70 -inset-px bg-gradient-to-r from-[#44BCFF] via-[#FF44EC] to-[#FF675E] rounded-full blur-lg group-hover:opacity-100 group-hover:-inset-1 group-hover:duration-200 animate-tilt" />
                  <Image
                    src="/assets/imag/umer.png"
                    alt="Umar Azeem"
                    className="relative z-10 h-[150px] sm:h-[200px]  w-[150px] sm:w-[200px] rounded-full"
                    width={180}
                    height={180}
                  />
                </div>

                {/* Decorative Image */}
                <Image
                  src="/assets/imag/small.png"
                  alt="Decor"
                  className="absolute top-[-10px] left-10 sm:left-14 z-0 w-[180px] sm:w-[220px]"
                  width={200}
                  height={200}
                />
              </div>
            </motion.div>
          </motion.div>
        </section>
      </main>
    </div>
  );
}
