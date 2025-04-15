import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Globe, Code, Users, Megaphone, BookOpen, Briefcase, Gavel } from 'lucide-react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLinkedin, faXTwitter, faInstagram } from '@fortawesome/free-brands-svg-icons';

// Icons for departments (adjust as needed)
const roleIcons = {
  'Ext. Relations': <Globe className="w-4 h-4" />,
  'IT & Dev': <Code className="w-4 h-4" />,
  'Marketing': <Megaphone className="w-4 h-4" />,
  'Community': <Users className="w-4 h-4" />,
  'Education': <BookOpen className="w-4 h-4" />,
  'Industry': <Briefcase className="w-4 h-4" />,
  'Legal & Fi.': <Gavel className="w-4 h-4" />,
};

const SocialIcon = ({ href, icon, bgColor }) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className={`w-8 h-8 flex items-center justify-center rounded-full ${bgColor} text-white hover:scale-110 transition-transform duration-200`}
  >
    <FontAwesomeIcon icon={icon} className="w-4 h-4" />
  </a>
);

const OurTeam = () => {
  const [teamMembers, setTeamMembers] = useState([]);

  useEffect(() => {
    const fetchMembers = async () => {
      try {
        const res = await axios.get(
          `https://strapi.rbg.tum-blockchain.com/api/Members?populate=*&pagination[pageSize]=95&sort=name:asc`,
          {
            headers: {
              Authorization: `Bearer ${process.env.NEXT_PUBLIC_STRAPI_API_TOKEN}`,
            },
          }
        );
        console.log(res.data);
        setTeamMembers(res.data.data);
      } catch (error) {
        console.error('Failed to fetch team members:', error);
      }
    };

    fetchMembers();
  }, []);

  const getIconColorFromPlatform = (platform) => {
    if (!platform) return 'text-white';
    switch (platform.toLowerCase()) {
      case 'linkedin':
        return 'text-blue-700';
      case 'twitter':
      case 'x':
      case 'x (twitter)':
        return 'text-blue-400';
      case 'instagram':
        return 'text-pink-500';
      default:
        return 'text-white';
    }
  };

  const getIconBgColorFromPlatform = (platform) => {
    if (!platform) return 'bg-blue-600';
    switch (platform.toLowerCase()) {
      case 'linkedin':
        return 'bg-blue-700';
      case 'twitter':
      case 'x':
      case 'x (twitter)':
        return 'bg-black-400';
      case 'instagram':
        return 'bg-pink-500';
      default:
        return 'bg-blue-600';
    }
  };

  const getIconFromPlatform = (platform) => {
    if (!platform) return null;
    switch (platform.toLowerCase()) {
      case 'linkedin':
        return faLinkedin;
      case 'twitter':
      case 'x':
      case 'x (twitter)':
        return faXTwitter;
      case 'instagram':
        return faInstagram;
      default:
        return null;
    }
  };

  return (
    <div className="px-4 md:px-8 lg:px-16 py-0 text-white">
      <div className="flex flex-col gap-2 w-full justify-center items-center mb-12">
        <h3 className="text-accent text-center uppercase font-heading font-bold tracking-widest">
          Together, We Create
        </h3>
        <h1 className="text-3xl text-center lg:text-5xl font-heading font-bold leading-tight">
          Meet the Team
        </h1>
      </div>

      <div className="flex flex-wrap -mx-4 justify-center">
        {teamMembers.map((member, idx) => {
          const name = member.name;
          const departments = member.departments?.map(dep => dep.name).join(', ') || 'Member';
          const departmentNames = member.departments?.map(dep => dep.name) || [];
          const icon = roleIcons[departmentNames[0]] || null;

          const profilePicture = member.profile_picture;
          const imageUrl =
            profilePicture?.formats?.small?.url || profilePicture?.url;
          const fullImageUrl = imageUrl?.startsWith('http')
            ? imageUrl
            : `https://strapi.rbg.tum-blockchain.com${imageUrl}` || '';


          const socials = member.social_media || [];

          return (
            <div key={idx} className="w-1/2 sm:w-1/3 lg:w-1/4 px-4 mb-8">
              <div className="relative group p-5 rounded-3xl border border-accent bg-[radial-gradient(circle_at_top_left,_rgba(255,255,255,0.05),_transparent)] shadow-[0_0_20px_rgba(255,0,255,0.15)] hover:shadow-[0_0_30px_rgba(255,0,255,0.3)] transition-shadow duration-300 overflow-hidden" 
                style={{minHeight: '300px', minWidth: '200px', maxWidth: '200px', maxHeight: '300px'}}>
                <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(180deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:20px_20px] pointer-events-none rounded-3xl z-0" />
                <div className="relative z-10 flex flex-col items-center">
                {fullImageUrl != "https://strapi.rbg.tum-blockchain.comundefined" && (
                  <div className="flex pb-4 items-center justify-center text-sm text-fuchsia-400 font-medium gap-1 mb-4">
                    {icon}
                    {departments}
                  </div>
                )}
                  {fullImageUrl == "https://strapi.rbg.tum-blockchain.comundefined" && (
                    <div className="flex pb-4 items-center justify-center text-sm text-fuchsia-400 font-medium gap-1 mb-12">
                    {icon}
                    {departments}
                    </div>
                  )}

                  {fullImageUrl != "https://strapi.rbg.tum-blockchain.comundefined" && (
                    <div>
                      <div className="relative mb-w pb-4">
                        <div className="absolute inset-0 rounded-full bg-accent blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                        <div className="w-24 h-24 rounded-full overflow-hidden border-2 border-accent relative z-10 shadow-md">
                          <img
                            src={fullImageUrl}
                            alt={fullImageUrl}
                            className="w-full h-full object-cover"
                          />
                        </div>                   
                      </div>
                      
                    </div>
                  )}

                  {fullImageUrl != "https://strapi.rbg.tum-blockchain.comundefined" && (
                  <div className="w-full flex flex-col items-center justify-start">
                    <h6 className="text-lg font-semibold text-center">{name}</h6>
                    <div className="flex space-x-3 mt-2">
                      {socials.map((social, i) => {
                        const icon = getIconFromPlatform(social.platform);
                        const bgColor = getIconBgColorFromPlatform(social.platform);
                        if (!icon) return null;
                        return (
                          <SocialIcon
                            key={i}
                            href={social.link}
                            icon={icon}
                            bgColor={bgColor}
                          />
                        );
                      })}
                    </div>
                  </div>
                  )}
                  

                  {fullImageUrl == "https://strapi.rbg.tum-blockchain.comundefined" && (
                    <div className="w-full h-full flex flex-col items-center justify-center space-y-8">
                    <h6 className="text-lg font-semibold text-center">{name}</h6>
                    <div className="flex">
                      {socials.map((social, i) => {
                        const icon = getIconFromPlatform(social.platform);
                        const bgColor = getIconBgColorFromPlatform(social.platform);
                        if (!icon) return null;
                        return (
                          <SocialIcon
                            key={i}
                            href={social.link}
                            icon={icon}
                            bgColor={bgColor}
                          />
                        );
                      })}
                    </div>
                  </div>
                  )}
                  </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default OurTeam;
