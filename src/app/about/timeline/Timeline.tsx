import React, { useEffect, useState, useRef } from 'react';

const timelineData = [
  {
    year: 'Aug 2023',
    title: 'e.V. Founding',
    desc: 'TUM Blockchain has set up the legal entity e.V. for funding.'
  },
  {
    year: 'June 2022',
    title: 'Batch 1 (SS 22)',
    desc: 'Organised the first Blockchain 101 event and workshops, attended and won 4 Ethereum Hackathons. TUM accreditation.'
  },
  {
    year: 'Dec 2022',
    title: 'Batch 2 (WS 22/23)',
    desc: 'Organised Digital Euro Event, created partnerships, launched TBC MOOC #1.'
  },
  {
    year: 'Apr 2023',
    title: 'Batch 3 (SS 23)',
    desc: 'Organising the TUM Blockchain Conference, DAO development.'
  },
  {
    year: 'Sep 2023',
    title: 'TUM Blockchain Conference',
    desc: 'Organized the biggest student-led blockchain conference in Europe.'
  },
  {
    year: 'Nov 2023',
    title: 'Batch 4 (WiSe23/24)',
    desc: 'Advanced Cryptography Lecture, Internal Bootcamp, Industry projects kick-off.'
  },
  {
    year: 'May 2024',
    title: 'Batch 5 (SoSe24)',
    desc: 'Onboarding weekend in Bad Tölz, co-hosted 0xCastle retreat, Blocksprint Phase 1.'
  },
  {
    year: 'Present',
    title: 'TUM Blockchain Conference 24',
    desc: 'Organising the 2024 conference, DAO delegators, winning hackathons, new partnerships. 😎'
  }
];

const placeholderImage = 'https://raw.githubusercontent.com/SochavaAG/example-mycode/master/pens/timeline/images/img-13.png';

const Timeline = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const timerRef = useRef(null);
  const pauseRef = useRef(false);

  useEffect(() => {
    startAutoSlide();
    return () => clearInterval(timerRef.current);
  }, []);

  const startAutoSlide = () => {
    timerRef.current = setInterval(() => {
      if (!pauseRef.current) {
        setActiveIndex((prev) => (prev + 1) % timelineData.length);
      }
    }, 6000);
  };

  const handleMouseEnter = () => (pauseRef.current = true);
  const handleMouseLeave = () => (pauseRef.current = false);
  const handleClick = (index) => setActiveIndex(index);

  return (
    <div className="py-0 text-white">
      <div className="text-center mb-16">
        <h3 className="text-fuchsia-500 uppercase tracking-widest font-bold text-sm mb-2">
          From Idea to Impact
        </h3>
        <h1 className="text-4xl sm:text-5xl font-bold">Our Story So Far</h1>
      </div>

      <div
        className="flex justify-center items-center gap-4 overflow-hidden max-w-[100vw] xl:max-w-[1600px] w-full"
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
                    ? 'border-fuchsia-500 shadow-[0_0_40px_rgba(255,0,255,0.4)]'
                    : 'border-fuchsia-800/30 grayscale hover:grayscale-0 hover:shadow-lg'
                } transition-all duration-300 relative bg-black`}
              >
                <img
                  src={placeholderImage}
                  alt={item.title}
                  className={`object-cover w-full h-full absolute inset-0 ${
                    isActive ? 'opacity-100' : 'opacity-30'
                  }`}
                />

                <div
                  className={`absolute inset-0 ${
                    isActive ? 'bg-black/80' : 'bg-black/60'
                  } p-6 sm:p-8 lg:p-10 flex flex-col justify-center text-white`}
                >
                  <h3
                    className={`text-lg sm:text-xl lg:text-2xl font-bold ${
                      isActive ? 'text-fuchsia-400' : 'text-fuchsia-300'
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
                  <div className="" /> // absolute inset-0 bg-gradient-to-t from-fuchsia-500/50 to-transparent
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
    </div>
  );
};

export default Timeline;
