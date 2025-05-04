'use client';

import React, { useRef, useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { Department } from '@/service/memberStrapi';
import { Accordion } from '@/components/accordion/Accordion';
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
      
      >
        {departments.map((dept, index) => (
          <Accordion.Item
            key={index}
            value={`item-${index}`}
          >
            <Accordion.Trigger
            >
              {dept.name}
            </Accordion.Trigger>

            <Accordion.Content
            >
              <p>
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