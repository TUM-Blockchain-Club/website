import React, { useEffect } from "react";

const timelineData = [
  { year: 2021, season: "Season 13", img: "https://raw.githubusercontent.com/SochavaAG/example-mycode/master/pens/timeline/images/img-13.png", desc: "This season marked major strides in our blockchain research and innovation." },
  { year: 2020, season: "Season 12", img: "https://raw.githubusercontent.com/SochavaAG/example-mycode/master/pens/timeline/images/img-12.png", desc: "We launched our first decentralized voting system." },
  { year: 2020, season: "Season 11", img: "https://raw.githubusercontent.com/SochavaAG/example-mycode/master/pens/timeline/images/img-11.png", desc: "Workshops on smart contracts and Solidity grew our dev community." },
  { year: 2019, season: "Season 10", img: "https://raw.githubusercontent.com/SochavaAG/example-mycode/master/pens/timeline/images/img-10.png", desc: "Partnerships with industry players kickstarted real-world collaboration." },
  { year: 2019, season: "Season 9", img: "https://raw.githubusercontent.com/SochavaAG/example-mycode/master/pens/timeline/images/img-9.png", desc: "A vibrant blockchain learning space took shape this season." },
  { year: 2018, season: "Season 8", img: "https://raw.githubusercontent.com/SochavaAG/example-mycode/master/pens/timeline/images/img-8.png", desc: "Our journey into blockchain started here." }
];

const Timeline = () => {
  useEffect(() => {
    const handleScroll = () => {
      const items = document.querySelectorAll(".timeline-item");
      items.forEach(item => {
        const rect = item.getBoundingClientRect();
        const inView = rect.top < window.innerHeight * 0.85;
        item.classList.toggle("opacity-100", inView);
        item.classList.toggle("translate-y-0", inView);
      });
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="relative max-w-6xl mx-auto px-4 py-20">
      {/* Vertical timeline line */}
      <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-gray-300 z-0"></div>

      <div className="space-y-16 relative z-10">
        {timelineData.map((item, idx) => {
          const isLeft = idx % 2 === 0;
          return (
            <div
              key={idx}
              className={`timeline-item opacity-0 translate-y-12 transition-all duration-700 ease-out`}
            >
              <div className={`flex flex-col md:flex-row ${isLeft ? "md:flex-row" : "md:flex-row-reverse"} items-center md:items-start gap-6 relative`}>
                
                {/* Connector dot */}
                <div className="absolute left-1/2 transform -translate-x-1/2 md:translate-x-0 md:left-auto md:top-1/2 md:-translate-y-1/2 bg-yellow-400 border-4 border-white w-6 h-6 rounded-full shadow z-20"></div>

                {/* Year */}
                <div className="bg-yellow-400 text-black font-bold rounded-full w-14 h-14 flex items-center justify-center border-4 border-black text-sm shadow-md z-10">
                  {item.year}
                </div>

                {/* Content card */}
                <div className="bg-gray-800 text-white rounded-xl shadow-lg overflow-hidden w-full md:w-1/2">
                  <img src={item.img} alt={item.season} className="w-full h-48 object-cover" />
                  <div className="p-4">
                    <h3 className="text-yellow-400 text-xl font-bold mb-2">{item.season}</h3>
                    <p className="text-sm leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Timeline;
