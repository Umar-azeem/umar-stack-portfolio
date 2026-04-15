'use client'
import React, { useEffect, useState } from "react";
import { BrowserCard } from "../../components/BrowserCard";
import Image from "next/image";

const data = [
   { 
    id: 1, 
    name: "Group Sharing",
    image: "/assets/imag/group-sharing.png",
    description: "A collaborative platform that allows users to share tasks and manage activities with others in real time. Focuses on teamwork, task organization, and seamless communication.",
    live: "https://group-sharing-frontend.vercel.app/",
    github: "https://github.com/Umar-azeem/GroupSharing-frontend",
    techStack: ["React", "Node.js", "Express", "MongoDB"],
  },
  { 
    id: 2, 
    name: "Ascent Garments",
    image: "/assets/imag/ascent.png",
    description: "A professional business website for a garments brand showcasing products, company information, and services with a clean user experience.",
    live: "https://www.ascentgarments.com/",
    github: "https://github.com/Umar-azeem/ASCENT",
    techStack: ["HTML", "CSS", "JavaScript", "Responsive"],
  },
  { 
    id: 3, 
    name: "Today Todo",
    image: "/assets/imag/todo.png",
    description: "A simple and efficient task management application to create, manage, and track daily tasks with filtering options.",
    live: "https://todaytodo-sooty.vercel.app/today",
    github: "https://github.com/Umar-azeem/TodayTodo",
    techStack: ["React", "Tailwind", "Local Storage"],
  },
  { 
    id: 4, 
    name: "WeatherApp",
    image: "/assets/imag/wa.png",
    description: "Built this weather app with Next.js as part of my frontend showcase — real-time data, client-side rendering",
    live: "https://weatherweb1app.netlify.app/",
    github: "https://github.com/Umar-azeem/cards-github.io",
    techStack: ["Next.js", "API", "Tailwind"],
  },
  { 
    id: 5, 
    name: "Kanban Board",
    image: "/assets/imag/kb.png",
    description: "A Kanban app to organize tasks visually with drag-and-drop support for better workflow management.",
    live: "https://kaanban-board.netlify.app/",
    github: "https://github.com/Umar-azeem/invoices.git",
    techStack: ["React", "Drag & Drop", "Tailwind"],
  },
 
  { 
    id: 6,
    name: "Invoices App",
    image: "/assets/imag/in.png",
    description: "Streamline billing with dynamic forms and real-time calculations for professional invoicing.",
    live: "https://melodic-gumdrop-8cf605.netlify.app/",
    github: "https://github.com/Umar-azeem/invoices",
    techStack: ["React", "Forms", "Calculations"],
  },
  { 
    id: 7, 
    name: "MobApp Landing",
    image: "/assets/imag/mob.png",
    description: "A responsive Mobile App Landing Page with fully functional components and optimized JavaScript logic.",
    live: "https://mobappres.netlify.app/",
    github: "https://github.com/Umar-azeem/mobresponsiveapp.github.io.git",
    techStack: ["React", "Tailwind", "SCSS"],
  },
  // { 
  //   id: 6, 
  //   name: "Comment Sections",
  //   image: "/assets/imag/comt.png",
  //   description: "A responsive comment section component with real-time updates and user interactions.",
  //   live: "https://comment-sections.netlify.app/",
  //   github: "https://github.com/Umar-azeem/comment-sections",
  //   techStack: ["React", "Comments", "Real-time"],
  // },
  //  { 
  //   id: 6, 
  //   name: "Devlink",
  //   image: "/assets/imag/dl.png",
  //   description: "A developer tool app to streamline billing with dynamic forms and real-time calculations.",
  //   live: "https://dev-linked.netlify.app/",
  //   github: "https://github.com/Umar-azeem/devlink.git-io.git",
  //   techStack: ["React", "Forms", "API"],
  // },
 
];

export default function Page() {
  const [scrolling, setScrolling] = useState(false);

  const onPageScroll = () => {
    if (window.pageYOffset > 200) {
      setScrolling(true);
    } else {
      setScrolling(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", onPageScroll);
    return () => {
      window.removeEventListener("scroll", onPageScroll);
    };
  }, []);

  return (
    <div className="bg-gradient-to-b from-black via-gray-900 to-black min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      {/* Header Section */}
      <div className="text-center my-10 max-w-7xl mx-auto">
        <h1 className="text-4xl sm:text-5xl font-bold bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text text-transparent mb-4">
          My Projects
        </h1>
        <p className="text-gray-400 text-lg max-w-2xl mx-auto">
          Explore my collection of web applications built with modern technologies
        </p>
        <div className="flex flex-wrap justify-center gap-2 mt-6">
          <span className="px-3 py-1.5 bg-blue-500/10 text-blue-400 rounded-full text-sm border border-blue-500/20">
            {data.length}+ Projects
          </span>
          <span className="px-3 py-1.5 bg-purple-500/10 text-purple-400 rounded-full text-sm border border-purple-500/20">
            MERN Stack 
          </span>
          
          <span className="px-3  py-1.5 bg-green-500/10 text-green-400 rounded-full text-sm border border-green-500/20">
            React.js & Next.js
          </span>
        </div>
      </div>

      {/* Browser Card Grid - Keeping the original browser view style */}
      <div className="flex justify-center items-center container mx-auto px-4">
        <div className="grid lg:grid-cols-2 md:grid-cols-2 grid-cols-1 gap-7 lg:gap-10">
          {data.map((item) => (
            <BrowserCard
              key={item.id}
              name={item.name}
              image={item.image}
              rotationIntensity={20}
              glareIntensity={0.4}
              description={item.description}
              live={item.live}
              github={item.github}
              techStack={item.techStack}
              className="border bg-black/80 text-white p-4 hover:border-blue-500/50 transition-all duration-300"
              borderRadius="1rem"
            />
          ))}
        </div>
      </div>

      {/* Scroll to Top Button */}
       {
                              scrolling && (
                                <button className="fixed block right-8 bottom-10 w-16 sm:w-24" onClick={() => {
                                  window.scrollTo(0,0);
                                }}>
                                  <Image
                src="/assets/imag/arrow-down.svg"
                alt="Arrow Down"
                width={100}
                height={100}
              />
                                </button>
                              )
                            }
    </div>
  );
}