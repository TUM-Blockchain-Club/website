"use client";

import atRestaurant1 from "@/images/family_photos/at_restaurant_1.png";
import ethLondon from "@/images/family_photos/eth_london.jpeg";
import ethBerlin from "@/images/family_photos/eth_berlin.jpeg";
import onboarding2017 from "@/images/family_photos/onboarding_2017.png";
import onboardingWeekend from "@/images/family_photos/onboarding_weekend.jpg";
import parisBlockchainWeek from "@/images/family_photos/paris_blockchain_week.jpeg";
import algorand from "@/images/family_photos/algorand.jpeg";
import conference from "@/images/family_photos/conference.jpeg";
import { useState, useEffect } from "react";
import Image from "next/image";
import { Button } from "@/components/button";
import Link from "next/link";

export const Gallery = () => {
    const [galleryImageWidth, setGalleryImageWidth] = useState(350 * 3 / 4);
    const [galleryImageHeight, setGalleryImageHeight] = useState(264 * 3 / 4);
    
    useEffect(() => {
      const handleResize = () => {
        const isMobile = window.innerWidth < 768;
        setGalleryImageWidth(isMobile ? (350 * 3 / 4) * 0.7 : 350 * 3 / 4);
        setGalleryImageHeight(isMobile ? (264 * 3 / 4) * 0.7 : 264 * 3 / 4);
      };
      
      handleResize(); // Set initial size
      window.addEventListener('resize', handleResize);
      return () => window.removeEventListener('resize', handleResize);
    }, []);

    return (
        <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-8 lg:gap-0 lg:flex-row">
              <div className="flex flex-col gap-4 lg:gap-6 w-full lg:w-1/2 lg:pt-12">
                <div className="flex flex-col gap-2">
                  <h3 className="text-accent text-center uppercase font-heading font-bold tracking-widest lg:text-start">
                    More than a group of students
                  </h3>
                  <h1 className="text-3xl text-center lg:text-start lg:text-[48px] font-heading font-bold leading-tight">
                    A Growing Family
                  </h1>
                </div>
                <p className="font-body text-center lg:text-start text-md lg:text-lg">
                  With 57 active members, we are the biggest student-run
                  blockchain club in Germany.
                </p>
                <div className="flex gap-6 flex-col lg:flex-row items-center mt-10 lg:mt-3">
                  <Button asChild buttonType="cta" className="w-fit">
                    <Link href={"#"}>Take Part</Link>
                  </Button>
                </div>
              </div>
              <div className="w-full lg:w-1/2 flex flex-col gap-4" id={"side-gallery"}>
                <div className="flex gap-4 overflow-x-hidden justify-center lg:justify-start lg:ps-8">
                  <Image src={algorand} width={galleryImageWidth} height={galleryImageHeight} alt="" className="object-cover"/>
                  <Image src={atRestaurant1} width={galleryImageWidth} height={galleryImageHeight} alt="" className="object-cover"/>
                  <Image src={parisBlockchainWeek} width={galleryImageWidth} height={galleryImageHeight} alt="" className="object-cover block lg:hidden"/>
                </div>
                <div className="flex gap-4 overflow-x-hidden justify-center lg:justify-start">
                  <Image src={conference} width={galleryImageWidth} height={galleryImageHeight} alt="" className="object-cover"/>
                  <Image src={ethLondon} width={galleryImageWidth} height={galleryImageHeight} alt="" className="object-cover"/>
                </div>
              </div>
            </div>
            <div className="flex gap-4 overflow-x-hidden justify-center" id="bottom-gallery">
              <Image src={ethBerlin} width={galleryImageWidth} height={galleryImageHeight} alt="" className="object-cover"/>
              <Image src={onboarding2017} width={galleryImageWidth} height={galleryImageHeight} alt="" className="object-cover"/>
              <Image src={onboardingWeekend} width={galleryImageWidth} height={galleryImageHeight} alt="" className="object-cover"/>
              <Image src={parisBlockchainWeek} width={galleryImageWidth} height={galleryImageHeight} alt="" className="object-cover hidden lg:block"/>
            </div>
          </div>
    )
}