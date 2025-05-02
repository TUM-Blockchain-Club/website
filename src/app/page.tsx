"use client";

import { Button } from "@/components/button";
import { Container } from "@/components/container";
import { ThreeJSGlobe } from "@/components/globe";
import Link from "next/link";
import { SponsorList } from "./sponsor_list";
import { SlideShow } from "./slideshow";
import Image from "next/image";
import { useEffect, useState } from "react";

import atRestaurant1 from "@/images/family_photos/at_restaurant_1.png";
import ethLondon from "@/images/family_photos/eth_london.jpeg";
import ethBerlin from "@/images/family_photos/eth_berlin.jpeg";
import onboarding2017 from "@/images/family_photos/onboarding_2017.png";
import onboardingWeekend from "@/images/family_photos/onboarding_weekend.jpg";
import parisBlockchainWeek from "@/images/family_photos/paris_blockchain_week.jpeg";
import algorand from "@/images/family_photos/algorand.jpeg";
import conference from "@/images/family_photos/conference.jpeg";

export default function Home() {
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
    <div>
      <ThreeJSGlobe className="absolute left-1/2 top-0 -translate-x-1/2 -translate-y-1/2 mix-blend-screen -z-10" />
      <Container asChild className="min-h-[75vh] pt-96 lg:pt-[550px] relative text-foreground flex flex-col gap-28">
        <section>
          <div className="flex flex-col gap-2 lg:gap-4">
            <h1 className="text-4xl text-center lg:text-start lg:text-[64px] font-heading font-bold leading-tight">
              Empowering<br />People&apos;s Technology
            </h1>
            <p className="font-body text-center lg:text-start text-md lg:text-xl">
              TUM Blockchain Club is fostering innovation through education,
              <br className="hidden lg:block" />collaboration, and the transformative power of blockchain.
            </p>
            <div className="flex gap-6 flex-col lg:flex-row items-center mt-10 lg:mt-3">
              <Button asChild buttonType="cta" className="w-fit">
                <Link href={"/membership"}>Join Us</Link>
              </Button>
              <Button asChild buttonType="secondary" className="w-fit">
                <Link href={"#"}>Support our cause</Link>
              </Button>
            </div>
          </div>
          <div className="flex flex-col gap-4">
            <h3 className="text-accent uppercase font-heading font-bold tracking-widest text-sm text-center lg:text-start">
              Collaborated with
            </h3>
            <SponsorList />
          </div>
        </section>
      </Container>
      <Container asChild className="py-12 mt-12 xl:mt-24">
        <section>
          <div className="flex flex-col gap-4 lg:gap-6">
            <div className="flex flex-col gap-2">
              <h3 className="text-accent uppercase font-heading font-bold tracking-widest text-center lg:text-start">
                What we are
              </h3>
              <h1 className="text-3xl text-center lg:text-start lg:text-[48px] font-heading font-bold leading-tight">
                More than a student club,
                <br /> Less than a corporate
              </h1>
            </div>
            <div className="relative w-full lg:hidden h-[360px] filter grayscale hover:grayscale-0 transition-all duration-150">
              <Image src="/group_photo.webp" alt="Our group photo" fill className="object-cover" />
            </div>
            <p className="font-body text-center lg:text-start text-md lg:text-lg">
              TUM Blockchain Club is a legally registered non-profit organization under German law and an officially accredited student club at the
              Technical University of Munich. Our mission extends beyond academics—we are committed to shaping the future of blockchain
              technology through impactful education, events, and collaborations. With a strong foundation and serious intent, we aim to leave a
              lasting mark on the global blockchain ecosystem.
            </p>
          </div>
          <div className="relative w-full hidden lg:block h-[720px] mt-20 filter grayscale hover:grayscale-0 transition-all duration-150">
            <Image src="/group_photo.webp" alt="Our group photo" fill className="object-cover" />
          </div>
        </section>
      </Container>
      <Container asChild className="py-12 mt-12 xl:mt-24">
        <section>
          <div className="flex flex-col gap-4 lg:gap-6 w-full">
            <div className="flex flex-col gap-2 w-full justify-center items-center">
              <h3 className="text-accent text-center uppercase font-heading font-bold tracking-widest lg:text-start">
                Our Vision
              </h3>
              <h1 className="text-3xl text-center lg:text-start lg:text-[48px] font-heading font-bold leading-tight">
                Value-driven Community
              </h1>
            </div>
            <p className="font-body text-center text-md lg:text-lg">
              We strive to create meaningful and sustainable impact by connecting best-in mind students with
              <br />various aspect of blockchain realm.
            </p>
          </div>
          <div className="w-full h-[500px] mt-10 lg:mt-20">
            <SlideShow />
          </div>
        </section>
      </Container>
      <Container asChild className="py-12 mt-12 xl:mt-24">
        <section>
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
        </section>
      </Container>
      <Container asChild className="py-12 mt-12 xl:mt-24">
        <section>
          <div className="flex flex-col gap-4 lg:gap-6">
            <div className="flex flex-col gap-2">
              <h3 className="text-accent uppercase font-heading font-bold tracking-widest text-center lg:text-start">
                Open For Collaboration
              </h3>
              <h1 className="text-3xl text-center lg:text-start lg:text-[48px] font-heading font-bold leading-tight">
                From the best,
                <br />For the best
              </h1>
            </div>
            <p className="font-body text-center lg:text-start lg:text-lg">
              As an accredited student club at the Technical University of Munich (TUM), the TUM Blockchain Club is
              driven by a team of dedicated TUM students. Our members are distinguished by their excellence in the field,
              embodying the problem-solving spirit and innovative thinking that TUM is renowned for. Notably, TUM
              has been recognized as the top university in Germany, ranking 28th worldwide in the QS World University Rankings 2025.
            </p>
            <div className="flex gap-6 flex-col lg:flex-row items-center mt-10 lg:mt-3">
              <Button asChild buttonType="cta" className="w-fit">
                <Link href={"#"}>Collaborate Together</Link>
              </Button>
            </div>
          </div>
        </section>
      </Container>
    </div>
  );
}
