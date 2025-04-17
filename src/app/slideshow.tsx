"use client"

import { AccordionRoot, AccordionItem, AccordionContent } from "@/components/accordion";
import { useEffect, useState } from "react";

const items = [
  {
    title: 'TUM Blockchain Conference',
    image: '/conference.jpg',
    content: (
      <>
        At TUM Blockchain Club, we host conferences, workshops, and 
        events to educate and inspire the next generation of blockchain enthusiasts.
        One of our flagship events is the annual <span className="font-bold">TUM Blockchain Conference</span>,
        which brings together experts, enthusiasts, and professionals to discuss the
        latest trends and developments in the blockchain space.
      </>
    )
  },
  {
    title: 'Industry Project',
    image: '/industry_kickoff.jpg',
    content: (
      <>
        Every semester, we host an Industry Project event to connect students with industry professionals.
        This event is a great opportunity for students to learn and apply their knowledge in blockchain
        to real-world problems.
      </>
    )
  },
  {
    title: 'Blockchain Bootcamp',
    image: '/bootcamp.jpg',
    content: (
      <>
        We offer a bootcamp to introduce students to the basics of blockchain technology.
        This bootcamp is a great way to get started with blockchain and learn about the latest trends and developments in the industry.
        The topics can range from basic concepts to more advanced topics like smart contracts and decentralized applications.
      </>
    )
  },
  {
    title: 'Hackathon',
    image: '/hackathon.webp',
    content: (
      <>
        We also actively participate in hackathons to showcase our skills and to learn from other participants.
        Such events are a great way to network and to learn about the latest trends and developments in the industry.
      </>
    )
  }
]

export const SlideShow = () => {
  const [orientation, setOrientation] = useState<"vertical" | "horizontal">("horizontal");

  useEffect(() => {
    // Function to update orientation based on screen size
    const updateOrientation = () => {
      setOrientation(window.innerWidth < 768 ? "vertical" : "horizontal");
    };

    // Set initial orientation
    updateOrientation();

    // Add event listener for resize events
    window.addEventListener("resize", updateOrientation);

    // Clean up event listener
    return () => window.removeEventListener("resize", updateOrientation);
  }, []);

  return (
    <AccordionRoot orientation={orientation}>
      {items.map((item, index) => (
        <AccordionItem key={index} index={index} title={item.title} image={item.image}>
          <AccordionContent>
            <div className='absolute w-full overflow-x-hidden h-full bottom-0 left-0 z-10 p-4 flex items-end' style={{ background: 'linear-gradient(0deg, rgba(10, 0, 22, 0.75) 30%, rgba(10, 0, 22, 0.00) 100%)' }}>
                <div className='flex min-w-96 w-[360px] flex-col gap-4 justify-end'>
                  <h3 className='font-heading font-bold lg:text-2xl'>{item.title}</h3>
                  <p className='text-md'>
                    {item.content}
                  </p>
                </div>
            </div>  
          </AccordionContent>
        </AccordionItem>
      ))}
    </AccordionRoot>
  )
}