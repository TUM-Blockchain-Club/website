"use client";

// Add these to the top of your file
import React, { useState, useMemo } from 'react';
import { MemberCard } from '@/components/member_card/MemberCard';
import { Member, Department } from '@/service/memberStrapi';

export interface OurTeamProps {
  members: Member[];
  departments: Department[];
}

export const OurTeam = ({ members, departments }: OurTeamProps) => {
  const [selectedDepartment, setSelectedDepartment] = useState('');

  // Extract all departments
  const allDepartments: string[] = useMemo(() => {
    const deps: Set<string> = new Set();
    members.forEach(member =>
      member.departments?.forEach((dep: Department) => deps.add(dep.name))
    );
    return Array.from(deps).sort();
  }, [members]);

  const filteredMembers = useMemo(() => {
    return members.filter(member => {
      const isMemberActive = member.membership_status === 'core' || member.membership_status === 'trainees' ;
      const memberDepartments = member.departments?.map(dep => dep.name) || [];
      const matchesDepartment = selectedDepartment
        ? memberDepartments.includes(selectedDepartment)
        : true;
      return isMemberActive && matchesDepartment;
    });
  }, [selectedDepartment, members]);

  return (
    <div className="flex flex-col gap-6 justify-center items-center text-foreground">
      <div className="flex flex-col gap-2 w-full justify-center items-center">
        <h3 className="text-accent text-center uppercase font-heading font-bold tracking-widest">
          Creating Together
        </h3>
        <h1 className="text-3xl text-center lg:text-5xl font-heading font-bold leading-tight">
          Meet the Team
        </h1>
      </div>

      {/* FILTERS */}
      <div className="flex flex-col lg:flex-row items-center justify-between gap-4">

        <div className="flex flex-wrap justify-center gap-2">
          <button
            onClick={() => setSelectedDepartment('')}
            className={`px-4 py-2 rounded-full text-sm font-medium border transition-all ${
              selectedDepartment === ''
                ? 'bg-accent text-white shadow-md'
                : 'border-gray-600 text-gray-300 hover:bg-zinc-700'
            }`}
          >
            All
          </button>
          {allDepartments.map((dep: string, i: number) => (
            <button
              key={i}
              onClick={() => setSelectedDepartment(dep)}
              className={`px-4 py-2 rounded-full text-sm font-medium border transition-all ${
                selectedDepartment === dep
                  ? 'bg-accent text-white shadow-md'
                  : 'border-gray-600 text-gray-300 hover:bg-zinc-700'
              }`}
            >
              {dep}
            </button>
          ))}
        </div>
      </div>

      {/* TEAM GRID */}
      <div className="flex flex-wrap justify-center gap-4 w-full">
        {filteredMembers.map(member => (
          <MemberCard key={member.id} member={member} />
        ))}
      </div>
    </div>
  );
};

export default OurTeam;
