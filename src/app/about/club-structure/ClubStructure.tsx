'use client';

import React, { useRef, useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { Department } from '@/service/memberStrapi';
import * as Accordion from '@radix-ui/react-accordion';
import ClubStructureDiagram from './diagram';


export interface ClubStructureProps {
  departments: Department[];
}

const ClubStructure = ({ departments }: ClubStructureProps) => {

  const [activeItem, setActiveItem] = useState<string | undefined>();
  const accordionRef = useRef<HTMLDivElement>(null);

  const handleSelect = (deptName: string) => {

    const idx = departments.findIndex((d) => d.name === deptName);
    if (idx === -1) return;                // Filter out invalid items

    setActiveItem(`item-${idx}`);

    setTimeout(() => {
      accordionRef.current?.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    }, 0);
  };


  return (
    <div className="px-4 md:px-8 lg:px-16 py-4 text-white">
      {/* Page Title */}
      <div className="flex flex-col gap-2 w-full justify-center items-center mb-12">
        <h3 className="text-accent text-center uppercase font-heading font-bold tracking-widest">
          How We Work
        </h3>
        <h1 className="text-3xl text-center lg:text-5xl font-heading font-bold leading-tight">
          Club Structure
        </h1>
      </div>
      <ClubStructureDiagram className="pb-32 lg:pb-12 club-diagram" onSelect={handleSelect} />

      {/* Accordion */}
      <Accordion.Root 
        ref={accordionRef}

        type="single"
        collapsible
      
        /* Give control to handleSelect */
        value={activeItem}
        onValueChange={setActiveItem}
      
        className="space-y-4"
      >
        {departments.map((dept, index) => (
          <Accordion.Item
            key={index}
            value={`item-${index}`}
            className="border border-accent rounded-lg overflow-hidden transition-all duration-300 bg-gradient-to-r from-zinc-900/50 to-zinc-800/50 shadow-[0_0_20px_rgba(168,85,247,0.2)]"
          >
            <Accordion.Trigger
              className="w-full flex justify-between items-center px-6 py-4 text-left font-semibold text-lg uppercase tracking-wide hover:bg-zinc-800 transition group"
            >
              {dept.name}
              <ChevronDown
                className="w-5 h-5 transition-transform duration-300 group-data-[state=open]:rotate-180 group-data-[state=open]:text-accent text-white"
              />
            </Accordion.Trigger>

            <Accordion.Content
              className="overflow-hidden data-[state=open]:animate-slideDown data-[state=closed]:animate-slideUp p-6"
            >
              <p className="text-gray-300 leading-relaxed">
                {dept.description || 'No description available.'}
              </p>
            </Accordion.Content>
          </Accordion.Item>
        ))}
      </Accordion.Root>
    </div>
  );
};

export default ClubStructure;