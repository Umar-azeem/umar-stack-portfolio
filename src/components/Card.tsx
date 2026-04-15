import Image from "next/image";
import React, { useRef, useState } from "react";

interface CardProps {
  name: string;
  image: string;
  rotationIntensity?: number;
  glareIntensity?: number;
  className?: string;
  borderRadius?: string;
  live:string,
 github:string,
 dicription:string,
}

export function Card({
  dicription,
  live,
 github,
  name,
  image,
  rotationIntensity = 15,
  glareIntensity = 0.3,
  className = "border bg-gray-600 p-4",
  borderRadius = "12px",
}: CardProps) {
  const [rotation, setRotation] = useState({ x: 0, y: 0 });
  const [glarePosition, setGlarePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;

    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;

    setRotation({
      x: -y * rotationIntensity,
      y: x * rotationIntensity,
    });

    setGlarePosition({ x, y });
  };

  return (
    <div className="relative w-[320px] h-[320px] md:w-[350px] md:h-[350px] lg:w-[400px] lg:h-[400px] group">
      {/* 🔥 Glow Background (only visible on hover) */}
      <div
        className={`absolute transition-all duration-1000 opacity-0 -inset-px bg-gradient-to-r from-[#44BCFF] via-[#FF44EC] to-[#FF675E] rounded-[12px] blur-lg 
        group-hover:opacity-100 group-hover:-inset-1 group-hover:duration-200 animate-tilt z-0`}
      ></div>

      {/* ✨ 3D Card Content */}
      <div
        ref={cardRef}
        className={`relative z-10 transition-transform duration-200 overflow-hidden ${className} w-full h-full`}
        style={{
          transformStyle: "preserve-3d",
          transform: isHovering
            ? `perspective(1000px) rotateX(${rotation.x}deg) rotateY(${rotation.y}deg) scale3d(1.05, 1.05, 1.05)`
            : "perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)",
          borderRadius,
        }}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => {
          setIsHovering(false);
          setRotation({ x: 0, y: 0 });
        }}
      >
        {/* Background Image */}
        <Image
          src={image}
          alt={name}
          className="absolute inset-0 h-full w-full object-cover"
          width={400}
          height={400}
        />

        {/* Hover Text */}
        <div
          className="absolute inset-0 flex flex-col items-center justify-center text-center px-4 transition-all duration-300 opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 z-10 bg-black/50 text-white"
          style={{ borderRadius }}
        >
          <h1 className="text-xl font-bold">{name}</h1>
          <p className="mt-2 text-sm">{dicription}</p>
        </div>

        {/* Optional Glare */}
        {isHovering && (
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              borderRadius,
              background: `radial-gradient(
                circle at 
                ${50 + glarePosition.x * 100}% 
                ${50 + glarePosition.y * 100}%,
                rgba(255, 255, 255, ${glareIntensity}),
                transparent
              )`,
              transform: "translateZ(20px)",
            }}
          />
        )}

        {/* Buttons */}
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-4 z-10">
           <a href={live} target="_blank"><button  className="px-6 py-2 min-w-[120px] text-sm text-center text-white bg-cyan-600 border border-cyan-600 rounded-full active:text-cyan-500 hover:bg-transparent hover:text-cyan-600 focus:outline-none focus:ring    ">
       Live view   </button>
          </a>
         <a href={github} target="_blank"> <button className="px-6 py-2 min-w-[120px] text-sm text-center text-cyan-500 border border-cyan-600 rounded-full hover:bg-cyan-600 hover:text-white active:bg-cyan-500 focus:outline-none focus:ring">
        Repository    
          </button></a>
        </div>
      </div>
    </div>
  );
}
