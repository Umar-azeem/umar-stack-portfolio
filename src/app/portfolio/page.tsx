'use client'
import React, { useEffect, useState } from 'react';
import Image from "next/image";
const skills = [
  { name: "CSS & Bootstrap", level: "Advanced", width: "75%" },
  { name: "JavaScript", level: "Advanced", width: "45%" },
  { name: "Tailwind CSS v3.4", level: "Advanced", width: "67%" },
  { name: "UI design", level: "Advanced", width: "85%" },
  { name: "React", level: "Advanced", width: "70%" },
  { name: "Polaris", level: "Advanced", width: "58%" },
  { name: "Next.js", level: "Advanced", width: "60%" },
  { name: "typeScript", level: "Advanced", width: "40%" },
];
export default function Page() {
  const [animatedWidths, setAnimatedWidths] = useState(Array(skills.length).fill("0%"));
  const [scrolling, setScrolling] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setAnimatedWidths(skills.map(skill => skill.width));
    }, 100); // delay helps with animation

    return () => clearTimeout(timeout);
  }, []);
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
    <div className="max-w-4xl m-auto relative">
      <main className="relative mt-28">
      <section className="mt-12" id="technologies">
      <h2 className="text-2xl font-semibold">
      Technologies
              </h2>
      {skills.map((skill, index) => (
        <div className="mt-6" key={skill.name}>
          <div className="flex justify-between items-center">
            <h2 className="font-semibold">{skill.name}</h2>
            <p className="text-gray-500 hover:text-cyan-500">{skill.level}</p>
          </div>
          <div className="w-full h-2 mt-2 bg-gray-300 rounded-md overflow-hidden">
            <span
              className="block h-full bg-gradient-to-t from-blue-700 to-cyan-700 rounded-md transition-all duration-[5000ms] ease-in-out"
              style={{ width: animatedWidths[index] }}
            />
          </div>
        </div>
      ))}
      </section >
      <section>
            <div className="container m-auto px-4 py-14">
              <h2 className="text-2xl font-semibold">
                Additional technologies and skills
              </h2>
              <div className="flex flex-col sm:flex-row gap-4 sm:gap-28 mt-12 w-[80%]">
                <div>
                  <p className="font-bold before:w-4 before:h-4 before:bg-gradient-to-t before:from-blue-500 before:to-cyan-500 before:block before:rounded-full before:mt-1 before:-left-6 before:absolute relative left-5">
                    Lens Studio - Snap AR
                  </p>
                </div>
                <div>
                  <p className="font-bold before:w-4 before:h-4 before:bg-gradient-to-t before:from-blue-500 before:to-cyan-500 before:block before:rounded-full before:mt-1 before:-left-6 before:absolute relative left-5">
                    Social media marketing
                  </p>
                </div>
                <div>
                  <p className="font-bold before:w-4 before:h-4 before:bg-gradient-to-t before:from-blue-500 before:to-cyan-500 before:block before:rounded-full before:mt-1 before:-left-6 before:absolute relative left-5">
                    Canva
                  </p>
                </div>
                <div>
                  <p className="font-bold before:w-4 before:h-4 before:bg-gradient-to-t before:from-blue-500 before:to-cyan-500 before:block before:rounded-full before:mt-1 before:-left-6 before:absolute relative left-5">
                    Quick learning
                  </p>
                </div>
              </div>
              <div className="flex flex-col sm:flex-row gap-4 sm:gap-36 mt-4 sm:mt-6 w-[80%]">
                <div>
                  <p className="font-bold before:w-4 before:h-4 before:bg-gradient-to-t before:from-blue-500 before:to-cyan-500 before:block before:rounded-full before:mt-1 before:-left-6 before:absolute relative left-5">
                    create your on nfts
                  </p>
                </div>
                <div>
                  <p className="font-bold before:w-4 before:h-4 before:bg-gradient-to-t before:from-blue-500 before:to-cyan-500 before:block before:rounded-full before:mt-1 before:-left-6 before:absolute relative left-5">
                    B2B B2C C2C
                  </p>
                </div>
              </div>
            </div>
          </section>
          <section className="py-8" id="aboutme">
          <div className="container m-auto px-4">
            <h2 className="text-2xl font-semibold">About me</h2>
            <div className="mt-12 relative before:absolute before:top-0 before:left-16 before:rounded-full before:bottom-10 sm:before:bottom-2 before:w-1 before:bg-white">
              <div className="pl-24 mt- relative before:w-4 before:h-4 before:bg-gradient-to-t before:from-blue-500 before:to-cyan-500 before:absolute before:rounded-full before:left-[58px]">
                <h3 className="absolute left-0 text-lg font-semibold">2025</h3>
                <p>
                Internship As a Front and developer ==== Fillinx Solutions pvt LTD Company
                </p>
              </div>
              <div className="pl-24 mt-24 relative before:w-4 before:h-4 before:bg-gradient-to-t before:from-blue-500 before:to-cyan-500 before:absolute before:rounded-full before:left-[58px]">
                <h3 className="absolute left-0 text-lg font-semibold">2024</h3>
                <p>
                  Internship As a UI Developer ==== Wixpa pvt LTD Company
                </p>
              </div>
              <div className="pl-24 mt-24 relative before:w-4 before:h-4 before:bg-gradient-to-t before:from-blue-500 before:to-cyan-500 before:absolute before:rounded-full before:left-[58px]">
                <h3 className="absolute left-0 text-l font-semibold">2023</h3>
                <p>
                  Computer Operator & Management ==== shangrilla bakery and
                  departmental store <br></br>
                  Computer Operater ==== New Awami general store
                </p>
              </div>
              <div className="pl-24 mt-24 relative before:w-4 before:h-4 before:bg-gradient-to-t before:from-blue-500 before:to-cyan-500 before:absolute before:rounded-full before:left-[58px]">
                <h3 className="absolute left-0 text-lg font-semibold">2022</h3>
                <p>
                  Customer care service ==== Brit site telemarketing Call center
                </p>
              </div>
              <div className="pl-24 mt-24 relative before:w-4 before:h-4 before:bg-gradient-to-t before:from-blue-500 before:to-cyan-500 before:absolute before:rounded-full before:left-[58px]">
                <h3 className="absolute left-0 text-lg font-semibold">2021</h3>
                <p>Coordinator & computer Operator ==== Radio FM 104 bhalwal</p>
              </div>
            </div>
          </div>
        </section>
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
    </main>
    </div>
  );
}
