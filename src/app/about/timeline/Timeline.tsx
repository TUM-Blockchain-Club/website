import React, { useEffect, useState, useRef } from 'react';

const timelineData = [
  { year: 2021, season: 'Season 13', img: 'https://raw.githubusercontent.com/SochavaAG/example-mycode/master/pens/timeline/images/img-13.png', desc: 'This season marked major strides in our blockchain research and innovation.' },
  { year: 2020, season: 'Season 12', img: 'https://raw.githubusercontent.com/SochavaAG/example-mycode/master/pens/timeline/images/img-12.png', desc: 'We launched our first decentralized voting system.' },
  { year: 2020, season: 'Season 11', img: 'https://raw.githubusercontent.com/SochavaAG/example-mycode/master/pens/timeline/images/img-11.png', desc: 'Workshops on smart contracts and Solidity grew our dev community.' },
  { year: 2019, season: 'Season 10', img: 'https://raw.githubusercontent.com/SochavaAG/example-mycode/master/pens/timeline/images/img-10.png', desc: 'Partnerships with industry players kickstarted real-world collaboration.' },
  { year: 2019, season: 'Season 9', img: 'https://raw.githubusercontent.com/SochavaAG/example-mycode/master/pens/timeline/images/img-9.png', desc: 'A vibrant blockchain learning space took shape this season.' },
  { year: 2018, season: 'Season 8', img: 'https://raw.githubusercontent.com/SochavaAG/example-mycode/master/pens/timeline/images/img-8.png', desc: 'Our journey into blockchain started here.' }
];

const Timeline = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const timerRef = useRef(null);
  const pauseRef = useRef(false);

  // Auto-transition
  useEffect(() => {
    startAutoSlide();
    return () => clearInterval(timerRef.current);
  }, []);

  const startAutoSlide = () => {
    timerRef.current = setInterval(() => {
      if (!pauseRef.current) {
        setActiveIndex((prev) => (prev + 1) % timelineData.length);
      }
    }, 4000);
  };

  const handleMouseEnter = () => {
    pauseRef.current = true;
  };

  const handleMouseLeave = () => {
    pauseRef.current = false;
  };

  const handleClick = (index) => {
    setActiveIndex(index);
  };

  return (
    <div className="py-20 px-4 md:px-12 lg:px-24 text-white">
      <div className="flex flex-col gap-2 w-full justify-center items-center">
        <h3 className="text-accent text-center uppercase font-heading font-bold tracking-widest">
          From Idea to Impact
        </h3>
        <h1 className="text-3xl text-center lg:text-5xl font-heading font-bold leading-tight mb-12">
          Our Story So Far
        </h1>
      </div>

      <div
        className="flex gap-4 justify-center items-center overflow-hidden w-full max-w-7xl mx-auto"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {timelineData.map((item, idx) => {
          const isActive = idx === activeIndex;
          return (
            <div
              key={idx}
              className={`relative transition-all duration-500 ease-in-out cursor-pointer group ${
                isActive ? 'w-1/2 lg:w-2/5' : 'w-20 lg:w-24'
              }`}
              onClick={() => handleClick(idx)}
            >
              <div
                className={`h-[300px] lg:h-[360px] rounded-2xl overflow-hidden border-2 ${
                  isActive
                    ? 'border-fuchsia-500 shadow-[0_0_20px_rgba(255,0,255,0.3)]'
                    : 'border-fuchsia-800/30 grayscale hover:grayscale-0 hover:scale-[1.02]'
                } transition-all duration-300 ease-in-out relative`}
              >
                <img
                  src={item.img}
                  alt={item.season}
                  className={`object-cover w-full h-full ${
                    isActive ? '' : 'opacity-60'
                  } transition-opacity duration-300`}
                />

                {isActive && (
                  <div className="absolute inset-0 bg-black/60 p-6 flex flex-col justify-end text-white">
                    <h3 className="text-xl font-bold text-fuchsia-400 mb-2">{item.season}</h3>
                    <p className="text-sm leading-relaxed">{item.desc}</p>
                  </div>
                )}
              </div>

              {/* Year Tag */}
              <div
                className={`absolute -top-4 left-1/2 transform -translate-x-1/2 bg-fuchsia-500 text-black text-xs font-bold px-3 py-1 rounded-full shadow-lg ${
                  isActive ? 'scale-110' : 'opacity-80'
                }`}
              >
                {item.year}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Timeline;
