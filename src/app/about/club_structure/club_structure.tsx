import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';

const departments = [
  'Community',
  'Legal',
  'Industry',
  'External Affairs',
  'IT & Development',
  'Marketing',
  'Education',
];
 // Unfinished code
const descriptions = {
    Community: `The Community Department at the TUM Blockchain Club is dedicated to 
                creating an engaging environment for all members passionate about blockchain 
                technology and its potential. Our main objective is to build a strong, supportive 
                network that not only connects members within the club but also extends to the 
                broader blockchain community.Our department is structured around three core 
                areas of responsibility: Community Network Management, Personal Development, 
                and Process Management. Our tasks include distributing informative as well as 
                fun newsletters, organizing meetups, and hosting internal club events to keep 
                our members connected and informed. For Personal Development, we focus on 
                maintaining an up-to-date members list, managing a helpbox for queries and 
                support, and moderating and preparing for core team meetings and informational 
                sessions. Process Management involves the creation and continual updating of 
                club processes, such as recruiting, onboarding, and meeting procedures, 
                maintaining the members list on platforms like Notion, and moderating our 
                Discord channel to ensure a productive and welcoming environment.
                ‍Who we are looking for: We are on the lookout for individuals who are passionate 
                about building a thriving community centered around blockchain technology. Ideal 
                candidates are proactive, reliable, and possess strong organizational and personal 
                skills. We value members who are eager to take on responsibility, effectively execute 
                tasks, and contribute innovative ideas for enhancing our community's engagement and 
                growth. If you have an interest in blockchain and are excited about the prospect of 
                shaping the community journey of the TUM Blockchain Club in Munich and beyond, we would 
                love to have you on our team. Your involvement will play a pivotal role in organizing 
                community activities, personal development initiatives, and refining our internal 
                processes to support our mission of empowering our members and strengthening our 
                blockchain community.`,
    Legal: `The Legal & Finance department at the TUM Blockchain Club is dedicated to ensuring financial integrity and regulatory compliance, which stabilizes our operations. We oversee all aspects of financial management, including budgeting and accounting, and handle legal matters such as contracts with our sponsors and partners and taxation. Additionally, our department consults other departments on internal spending in both fiat and cryptocurrencies for club-related activities. We are also responsible for entity maintenance and managing bank accounts. Join us to gain valuable insights into entity management, the composition of legal contracts, and crypto regulation in Germany and beyond, as well as to contribute to our professional environment.
            ‍Who we are looking for:
            We are seeking individuals who excel in organization, have a talent for numbers, and possess strong communication skills. While bookkeeping experience is a plus, it is not required. Ideal candidates are proactive, reliable, and ready to take on the responsibility of maintaining order and structure within our team. This is the perfect opportunity for you if you are interested in the legal maintenance of a non-profit entity and crypto regulation/taxation. Join us in tackling financial and administrative challenges and supporting the long-term growth of the TUM Blockchain Club.`
            ,
}
const ClubStructure = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggle = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="px-4 md:px-8 lg:px-16 py-4 text-white min-h-screen">
      {/* Page Title */}
      <div className="flex flex-col gap-2 w-full justify-center items-center mb-12">
        <h3 className="text-accent text-center uppercase font-heading font-bold tracking-widest">
          How We Work
        </h3>
        <h1 className="text-3xl text-center lg:text-5xl font-heading font-bold leading-tight">
          Club Structure
        </h1>
      </div>

      {/* Image */}
      {/* <div className="w-full flex justify-center mb-12">
        <img
          src="/0459309c-8c9a-46ee-9d5d-8069e6c68474.png"
          alt="Club Structure Diagram"
          className="max-w-full rounded-xl border border-accent shadow-[0_0_30px_rgba(168,85,247,0.25)]"
        />
      </div> */}

      {/* Accordion Panels */}
      <div className="space-y-4">
        {departments.map((dept, index) => (
          <div
            key={index}
            className="border border-accent rounded-lg overflow-hidden transition-all duration-300 bg-gradient-to-r from-zinc-900/50 to-zinc-800/50 shadow-[0_0_20px_rgba(168,85,247,0.2)]"
          >
            <button
              onClick={() => toggle(index)}
              className="w-full flex justify-between items-center px-6 py-4 text-left font-semibold text-lg uppercase tracking-wide hover:bg-zinc-800 transition"
            >
              {dept}
              <ChevronDown
                className={`w-5 h-5 transition-transform duration-300 ${
                  openIndex === index ? 'rotate-180 text-accent' : 'text-white'
                }`}
              />
            </button>

            {/* Accordion Content */}
            <div
              className={`overflow-hidden transition-all duration-300 px-6 ${
                openIndex === index ? 'max-h-[200px] py-4' : 'max-h-0'
              }`}
            >
              <p className="text-sm text-gray-300 leading-relaxed">
                {descriptions[dept] || 'No description available.'}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ClubStructure;
