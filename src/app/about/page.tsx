"use client";
import React, { useEffect, useState } from "react";

import { Button } from "@/components/button";
import { Container } from "@/components/container";
import { TeamConstellation } from "@/components/constellar";
import Link from "next/link";
import Image from "next/image";
import Timeline from "./timeline/Timeline";
import OurTeam from "./team/Team";

export default function Home() {
  const galleryImageWidth = 350 * 3 / 4;
  const galleryImageHeight = 264 * 3 / 4;

  return (
    <div>
      {/* <TeamConstellation className="absolute left-1/2 pt-[0px] -translate-x-1/2 -translate-y-1/4 mix-blend-screen -z-0" /> */}
      <Container asChild className="pt-[200px] relative text-foreground flex flex-col ">
        <section>
          <div className="flex flex-col gap-2 lg:gap-4">
            <h1 className="text-4xl text-left lg:text-start lg:text-[64px] font-heading font-bold leading-tight">
              About Us
            </h1>
            <p className="font-body text-left lg:text-start text-md lg:text-xl">
              Advancing the student blockchain ecosystem and creating a <br />
              community of academics, students and professionals supporting <br />
              each other on their missions to use blockchain for good.
            </p>
          </div>
        </section>
      </Container>
      <Container asChild className="py-12 mt-12 xl:mt-24 w-full">
        <section>
          <Timeline />
        </section>
      </Container>
      <Container asChild className="py-12 mt-12 xl:mt-24">
        <section>
          <OurTeam />
        </section>
      </Container>
    </div>
  );
}
