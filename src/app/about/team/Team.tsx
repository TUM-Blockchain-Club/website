import React from 'react';
import { text } from 'stream/consumers';

const teamMembers = [
  {
    name: 'Name 1',
    role: 'External Affairs',
    image: '/profile_pic.jpg',
    text: 'We connect with industry leaders and form blockchain partnerships.',
  },
  {
    name: 'Name 2',
    role: 'IT & Development',
    image: '/profile_pic.jpg',
    text: 'We build dApps and smart contracts for real blockchain use cases.',
  },
  {
    name: 'Name 3',
    role: 'Marketing',
    image: '/profile_pic.jpg',
    text: 'We promote blockchain ideas through creative campaigns.',
  },
  {
    name: 'Name 4',
    role: 'Community',
    image: '/profile_pic.jpg',
    text: 'We grow a strong, active blockchain community on and offline.',
  },
  {
    name: 'Name 5',
    role: 'Education',
    image: '/profile_pic.jpg',
    text: 'We teach blockchain through workshops, talks, and content.',
  },
  {
    name: 'Name 6',
    role: 'Industry',
    image: '/profile_pic.jpg',
    text: 'We explore blockchain trends and connect with real-world projects.',
  },
];

const LinkldnIcon = ({ href, children }) => (
  <a
    href={href}
    className="w-10 h-10 flex items-center justify-center rounded-full bg-white bg-opacity-20 hover:bg-[rgb(2,116,179)] transition-colors"
    target="_blank"
    rel="noopener noreferrer"
  >
    {children}
  </a>
);

const InstagramIcon = ({ href, children }) => (
  <a
    href={href}
    className="w-10 h-10 flex items-center justify-center rounded-full bg-white bg-opacity-20 hover:bg-[rgb(188,42,141)] transition-colors"
    target="_blank"
    rel="noopener noreferrer"
  >
    {children}
  </a>
);

const TwitterIcon = ({ href, children }) => (
  <a
    href={href}
    className="w-10 h-10 flex items-center justify-center rounded-full bg-white bg-opacity-20 hover:bg-[rgb(0,0,0)] transition-colors"
    target="_blank"
    rel="noopener noreferrer"
  >
    {children}
  </a>
);

const OurTeam = () => {
  return (
    <div className="px-6 md:px-12 lg:px-20 py-12">
      <div className="text-center max-w-xl mx-auto mb-12">
        <h2 className="text-3xl font-semibold border-b-2 inline-block pb-2 mb-2">Meet Our Team</h2>
      </div>

      <div className="flex flex-wrap -mx-4 justify-center">
        {teamMembers.map((member, idx) => (
          <div key={idx} className="w-full sm:w-1/2 md:w-1/3 px-4 mb-10">
            <div className="text-center">
              <div className="relative group w-32 h-32 mx-auto rounded-full overflow-hidden">
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-full h-full object-cover rounded-full transition-transform duration-300 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black bg-opacity-70 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-center items-center text-white px-4 text-center">
                  <p className="text-sm mb-4">
                    {member.text}
                  </p>
                  <div className="flex space-x-3 mt-2">
                    {/* LinkedIn */}
                    <LinkldnIcon href="#">
                      <svg fill="currentColor" viewBox="0 0 24 24" className="w-5 h-5 text-white">
                        <path d="M4.98 3.5C4.98 4.88 3.88 6 2.5 6S0 4.88 0 3.5 1.12 1 2.5 1s2.48 1.12 2.48 2.5zM.5 8h4V24h-4V8zm7.5 0h3.7v2.2h.05c.52-1 1.8-2.2 3.7-2.2 3.95 0 4.7 2.6 4.7 6V24h-4v-7.5c0-1.8-.03-4.1-2.5-4.1-2.5 0-2.9 1.95-2.9 4v7.6h-4V8z" />
                      </svg>
                    </LinkldnIcon>
                    {/* Twitter */}
                    <TwitterIcon href="#">
                      <svg fill="currentColor" viewBox="0 0 24 24" className="w-5 h-5 text-white">
                        <path d="M20.39 3H16.3L12.94 8.24 9.14 3H2.57l7.55 10.46L2.15 21h4.1l3.64-5.37 3.98 5.37h6.57l-7.96-10.9L20.39 3z" />
                      </svg>
                    </TwitterIcon>
                    {/* Instagram */}
                    <InstagramIcon href="#">
                      <svg fill="currentColor" viewBox="0 0 24 24" className="w-5 h-5 text-white">
                        <path d="M7.75 2h8.5A5.75 5.75 0 0 1 22 7.75v8.5A5.75 5.75 0 0 1 16.25 22h-8.5A5.75 5.75 0 0 1 2 16.25v-8.5A5.75 5.75 0 0 1 7.75 2zm0 1.5A4.25 4.25 0 0 0 3.5 7.75v8.5A4.25 4.25 0 0 0 7.75 20.5h8.5A4.25 4.25 0 0 0 20.5 16.25v-8.5A4.25 4.25 0 0 0 16.25 3.5h-8.5zM12 7a5 5 0 1 1 0 10 5 5 0 0 1 0-10zm0 1.5a3.5 3.5 0 1 0 0 7 3.5 3.5 0 0 0 0-7zm4.75-.88a.88.88 0 1 1 0 1.76.88.88 0 0 1 0-1.76z" />
                      </svg>
                    </InstagramIcon>
                  </div>
                </div>
              </div>
              <h6 className="text-lg font-semibold mt-6">{member.name}</h6>
              <span className="text-gray-500">{member.role}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OurTeam;
