'use client'
import React, { useRef, useState } from "react";

interface BrowserCardProps {
  name: string;
  image: string;
  description: string;
  live: string;
  github: string;
  rotationIntensity?: number;
  glareIntensity?: number;
  className?: string;
  borderRadius?: string;
  techStack?: string[];
}

export function BrowserCard({
  name,
  image,
  live,
  github,
  className = "border bg-gray-600 p-4",
}: BrowserCardProps) {
  const [iframeLoaded, setIframeLoaded] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  const getDomain = (url: string) => {
    try {
      const domain = new URL(url).hostname.replace("www.", "");
      return domain;
    } catch {
      return url;
    }
  };

  return (
    <div className="relative w-full my-4 h-auto md:w-[350px] md:h-[500px] lg:w-[420px] lg:h-[550px]">
      {/* Browser Card Container */}
              <h3 className="text-white my-4 font-bold text-lg">{name}</h3>

      <div
        ref={cardRef}
        className={`relative z-10 overflow-hidden ${className} w-full h-full flex flex-col bg-gradient-to-b from-gray-900 to-black rounded-lg`}
      >
        {/* Browser Chrome - Top Bar */}
        <div className="bg-gradient-to-r from-gray-800 to-gray-700 px-4 py-3 flex items-center gap-3 border-b border-gray-600">
          {/* Window Controls */}
          <div className="flex gap-2">
            <div className="w-2 h-2 md:w-4 md:h-4  rounded-full bg-red-500 hover:bg-red-600 cursor-pointer transition"></div>
            <div className="w-2 h-2 md:w-4 md:h-4  rounded-full bg-yellow-500 hover:bg-yellow-600 cursor-pointer transition"></div>
            <div className="w-2 h-2 md:w-4 md:h-4  rounded-full bg-green-500 hover:bg-green-600 cursor-pointer transition"></div>
          </div>

          {/* URL Bar */}
          <div className="flex-1 ml-1 md:ml-4 bg-gray-900 px-3 py-1 rounded-md border border-gray-600 flex items-center overflow-hidden">
            <span className="text-xs text-gray-400">🔒</span>
            <span className="text-xs text-gray-300 ml-2 truncate">{getDomain(live)}</span>
          </div>
        </div>

        {/* Browser Content Area */}
        <div className="flex-1 bg-white overflow-hidden relative flex flex-col">
          {/* Loading State */}
          {!iframeLoaded && (
            <div className="absolute inset-0 bg-gray-100 flex items-center justify-center z-20">
              <div className="flex flex-col items-center gap-2">
                <div className="animate-spin w-8 h-8 border-4 border-cyan-600 border-t-transparent rounded-full"></div>
                <p className="text-sm text-gray-600">Loading preview...</p>
              </div>
            </div>
          )}

          {/* Iframe */}
          <iframe
            src={live}
            title={name}
            className="w-full h-full border-0"
            sandbox="allow-same-origin allow-scripts allow-popups allow-forms"
            onLoad={() => setIframeLoaded(true)}
          />

          {/* Fallback Image - shown if iframe fails */}
          <noscript>
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: `url(${image})` }}
            />
          </noscript>
        </div>

        {/* Bottom Action Buttons */}
        <div className="bg-gray-900 border-t border-gray-700 px-4 py-4 flex gap-3 justify-between">
          <a href={live} target="_blank" rel="noopener noreferrer" className="flex-1">
            <button className="w-full px-4 py-2 text-sm text-center text-white bg-cyan-600 border border-cyan-600 rounded-full hover:bg-cyan-700 active:bg-cyan-800 focus:outline-none transition duration-200">
              Live view
            </button>
          </a>
          <a href={github} target="_blank" rel="noopener noreferrer" className="flex-1">
            <button className="w-full px-4 py-2 text-sm text-center text-cyan-500 border border-cyan-600 rounded-full hover:bg-cyan-600 hover:text-white active:bg-cyan-700 focus:outline-none transition duration-200">
              Repository
            </button>
          </a>
        </div>
      </div>

      {/* Project Info - Below Browser Card */}
      {/* <div className="mt-4 ">
        <p className="text-gray-400 text-sm mt-2 line-clamp-2">{description}</p>
      </div> */}
    </div>
  );
}
