import React from 'react';

const teamMembers = [
  {
    name: 'Name 1',
    role: 'External Affairs',
    image: '/profile_pic.jpg',
  },
  {
    name: 'Name 2',
    role: 'IT & Development',
    image: '/profile_pic.jpg',
  },
  {
    name: 'Name 3',
    role: 'Marketing',
    image: '/profile_pic.jpg',
  },
  {
    name: 'Name 4',
    role: 'Community',
    image: '/profile_pic.jpg',
  },
  {
    name: 'Name 5',
    role: 'Education',
    image: '/profile_pic.jpg',
  },
  {
    name: 'Name 6',
    role: 'Industry',
    image: '/profile_pic.jpg',
  },
];

const SocialIcon = ({ href, children, bgColor }) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className={`w-8 h-8 flex items-center justify-center rounded-full ${bgColor} text-white hover:scale-110 transition-transform duration-200`}
  >
    {children}
  </a>
);

const OurTeam = () => {
  return (
    <div className="px-4 md:px-8 lg:px-16 py-16 text-white">
      <div className="text-center max-w-xl mx-auto mb-12">
        <h3 className="text-accent text-center uppercase font-heading font-bold tracking-widest">
          Together, We Create
        </h3>
        <h1 className="text-3xl text-center lg:text-5xl font-heading font-bold leading-tight">
          Meet the Team
        </h1>
      </div>

      <div className="flex flex-wrap -mx-4 justify-center">
        {teamMembers.map((member, idx) => (
          <div key={idx} className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 px-4 mb-8">
            <div className="relative rounded-3xl bg-white/5 border border-white/10 backdrop-blur-md overflow-hidden shadow-lg hover:-translate-y-1 transition-transform duration-300 flex flex-col items-center text-center p-5">
              
              {/* Side stripe */}
              <div className="absolute left-0 top-0 h-full w-2 bg-gradient-to-b from-blue-500 via-purple-500 to-pink-500 rounded-tr-3xl rounded-br-3xl"></div>
              
              {/* Role label */}
              <span className="absolute left-4 top-4 text-xs uppercase tracking-wider text-blue-300 font-semibold">
                {member.role}
              </span>

              {/* Profile Image */}
              <div className="w-24 h-24 mt-8 mb-3 rounded-full overflow-hidden border-4 border-white/20 shadow-md">
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Name */}
              <h6 className="text-lg font-semibold">{member.name}</h6>

              {/* Socials */}
              <div className="flex space-x-3 mt-4">
                <SocialIcon href="#" bgColor="bg-blue-600">
                  {/* LinkedIn */}
                  <svg fill="currentColor" viewBox="0 0 24 24" className="w-4 h-4">
                    <path d="M4.98 3.5C4.98 4.88 3.88 6 2.5 6S0 4.88 0 3.5 1.12 1 2.5 1s2.48 1.12 2.48 2.5zM.5 8h4V24h-4V8zm7.5 0h3.7v2.2h.05c.52-1 1.8-2.2 3.7-2.2 3.95 0 4.7 2.6 4.7 6V24h-4v-7.5c0-1.8-.03-4.1-2.5-4.1-2.5 0-2.9 1.95-2.9 4v7.6h-4V8z" />
                  </svg>
                </SocialIcon>
                <SocialIcon href="#" bgColor="bg-black">
                  {/* Twitter */}
                  <svg fill="currentColor" viewBox="0 0 24 24" className="w-5 h-5">
                    <path d="M20.39 3H16.3L12.94 8.24 9.14 3H2.57l7.55 10.46L2.15 21h4.1l3.64-5.37 3.98 5.37h6.57l-7.96-10.9L20.39 3z" />
                  </svg>
                </SocialIcon>
                <SocialIcon href="#" bgColor="bg-pink-600">
                  {/* Instagram */}
                  <svg fill="currentColor" viewBox="0 0 24 24" className="w-4 h-4">
                    <path d="M7.75 2h8.5A5.75 5.75 0 0 1 22 7.75v8.5A5.75 5.75 0 0 1 16.25 22h-8.5A5.75 5.75 0 0 1 2 16.25v-8.5A5.75 5.75 0 0 1 7.75 2zm0 1.5A4.25 4.25 0 0 0 3.5 7.75v8.5A4.25 4.25 0 0 0 7.75 20.5h8.5A4.25 4.25 0 0 0 20.5 16.25v-8.5A4.25 4.25 0 0 0 16.25 3.5h-8.5zM12 7a5 5 0 1 1 0 10 5 5 0 0 1 0-10zm0 1.5a3.5 3.5 0 1 0 0 7 3.5 3.5 0 0 0 0-7zm4.75-.88a.88.88 0 1 1 0 1.76.88.88 0 0 1 0-1.76z" />
                  </svg>
                </SocialIcon>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OurTeam;
