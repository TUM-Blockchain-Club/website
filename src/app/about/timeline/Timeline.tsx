"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

const timelineData = [
  {
    year: "Founding",
    title: "e.V. Founding",
    desc: "TUM Blockchain has set up the legal entity e.V. for funding.",
  },
  {
    year: "June 2022",
    title: "Batch 1 (SS 22)",
    desc: "Organised the first Blockchain 101 event and workshops, attended and won 4 Ethereum Hackathons. TUM accreditation.",
  },
  {
    year: "Dec 2022",
    title: "Batch 2 (WS 22/23)",
    desc: "Organised Digital Euro Event, created partnerships, launched TBC MOOC #1.",
  },
  {
    year: "Apr 2023",
    title: "Batch 3 (SS 23)",
    desc: "Organising the TUM Blockchain Conference, DAO development.",
  },
  {
    year: "Sep 2023",
    title: "TUM Blockchain Conference",
    desc: "Organized the biggest student-led blockchain conference in Europe.",
  },
  {
    year: "Nov 2023",
    title: "Batch 4 (WiSe23/24)",
    desc: "Advanced Cryptography Lecture, Internal Bootcamp, Industry projects kick-off.",
  },
  {
    year: "May 2024",
    title: "Batch 5 (SoSe24)",
    desc: "Onboarding weekend in Bad Tölz, co-hosted 0xCastle retreat, Blocksprint Phase 1.",
  },
  {
    year: "Present",
    title: "TUM Blockchain Conference 24",
    desc: "Organising the 2024 conference, DAO delegators, winning hackathons, new partnerships. 😎",
  },
];

// const placeholderImage = "/img-13.png";

/* ---------------- MOBILE CARD MOTION ---------------- */
const cardVariants = {
  hiddenL: { opacity: 0, x: -50 },
  hiddenR: { opacity: 0, x: 50 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

/* ===================================================================================== */
const Timeline: React.FC = () => {

  const [activeIndex, setActiveIndex] = useState(0);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const pauseRef = useRef(false);

  useEffect(() => {
    startAutoSlide();
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, []);

  const startAutoSlide = () => {
    timerRef.current = setInterval(() => {
      if (!pauseRef.current) {
        setActiveIndex((prev) => (prev + 1) % timelineData.length);
      }
    }, 4000);
  };

  const handleMouseEnter = () => (pauseRef.current = true);
  const handleMouseLeave = () => (pauseRef.current = false);
  const handleClick = (index: number) => setActiveIndex(index);

  return (
    <section className="relative w-full max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 text-white">
      {/* Heading */}
      <header className="text-center mb-16">
        <h3 className="text-accent uppercase tracking-widest font-semibold text-sm mb-1">
          From Idea to Impact
        </h3>
        <h1 className="text-4xl sm:text-5xl font-bold">Our Story So Far</h1>
      </header>

      {/* ========================================================================= */}
      {/* MOBILE (< md)  –  Vertical Alternating Cards                              */}
      {/* ========================================================================= */}
      <div className="md:hidden relative flex flex-col gap-20">
        {/* vertical spine */}
        <div className="absolute left-1/2 -translate-x-1/2 top-0 h-full w-px bg-[#672EB3]/50" />

        {timelineData.map((item, idx) => {
          const isLeft = idx % 2 === 0;
          return (
            <motion.div
              key={idx}
              className={`relative ${isLeft ? "text-right" : "text-left"}`}
              initial={isLeft ? "hiddenL" : "hiddenR"}
              whileInView="visible"
              viewport={{ once: true, amount: 0.6 }}
              variants={cardVariants}
            >
              {/* dot */}
              <span className="absolute top-5 left-1/2 z-10 -translate-x-1/2 w-4 h-4 rounded-full bg-[#A37BFF] shadow-[0_0_15px_rgba(163,123,255,1)] animate-pulse" />

              {/* card */}
              <article className="relative bg-black/80 border border-[#672EB3] rounded-2xl p-6 sm:p-8 overflow-hidden">

                <div className="relative z-10">
                  <h3 className="text-accent text-sm font-medium tracking-wider mb-1">
                    {item.year}
                  </h3>
                  <h4 className="text-2xl font-semibold mb-2">{item.title}</h4>
                  <p className="text-sm leading-relaxed">{item.desc}</p>
                </div>
              </article>
            </motion.div>
          );
        })}
      </div>

      {/* ========================================================================= */}
      {/* DESKTOP (≥ md)  –  Original Horizontal Timeline                           */}
      {/* ========================================================================= */}
      <div
        className="hidden md:flex justify-center items-center gap-4 overflow-hidden max-w-[100vw] xl:max-w-[1600px] w-full"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {timelineData.map((item, idx) => {
          const isActive = idx === activeIndex;
          return (
            <div
              key={idx}
              role="button"
              onClick={() => handleClick(idx)}
              className={`relative transition-all duration-500 ease-in-out group rounded-3xl cursor-pointer ${
                isActive ? 'w-[60%] xl:w-[64%]' : 'w-[8%]'
              }`}
            >
              <div
                className={`h-[500px] xl:h-[560px] rounded-3xl overflow-hidden border-2 ${
                  isActive
                    ? 'border-[#672EB3] shadow-[0_0_40px_rgba(255,0,255,0.4)]'
                    : 'border-[#672EB3] grayscale hover:grayscale-0 hover:shadow-lg'
                } transition-all duration-300 relative bg-black`}
              >

                <div
                  className={`absolute inset-0 ${
                    isActive ? 'bg-black/80' : 'bg-black/60'
                  } p-6 sm:p-8 lg:p-10 flex flex-col justify-center text-white`}
                >
                  <h3
                    className={`text-lg sm:text-xl lg:text-2xl font-bold ${
                      isActive ? 'text-[#672EB3]' : 'text-[#672EB3]'
                    }`}
                  >
                    {item.year}
                  </h3>
                  {isActive && (
                    <>
                      <h4 className="text-xl sm:text-2xl font-semibold mt-2 mb-2">
                        {item.title}
                      </h4>
                      <p className="text-sm sm:text-base leading-relaxed">{item.desc}</p>
                    </>
                  )}
                </div>

                {isActive ? (
                  
                  
                  <div className="" /> 
                ) : (
                  <div className="absolute inset-0 bg-black" />
                )}

                {!isActive && (
                  <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
                    <div className="bg-black px-2 py-1 rounded-md shadow-md transform -rotate-90 text-lg sm:text-xl lg:text-2xl font-bold tracking-wide whitespace-nowrap">
                      {item.year}
                    </div>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default Timeline;
