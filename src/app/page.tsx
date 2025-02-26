import { Button } from "@/components/button";
import { Container } from "@/components/container";
import { ThreeJSGlobe } from "@/components/globe";
import Link from "next/link";
import { SponsorList } from "./sponsor_list";
import { SlideShow } from "./slideshow";
import Image from "next/image";
export default function Home() {
  return (
    <main className="text-foreground">
      <ThreeJSGlobe className="absolute left-1/2 top-0 -translate-x-1/2 -translate-y-1/2 mix-blend-screen -z-10"/>
      <Container asChild className="min-h-[75vh] pt-96 lg:pt-[550px] relative text-foreground flex flex-col gap-28">
        <section>
          <div className="flex flex-col gap-2 lg:gap-4">
            <h1 className="text-4xl text-center lg:text-start lg:text-[64px] font-heading font-bold leading-tight">
              Empowering<br />People's Technology
            </h1>
            <p className="font-body text-center lg:text-start text-md lg:text-xl">
              TUM Blockchain Club is fostering innovation through education,
              <br className="hidden lg:block" />collaboration, and the transformative power of blockchain.
            </p>
            <div className="flex gap-6 flex-col lg:flex-row items-center mt-10 lg:mt-3">
              <Button asChild buttonType="cta" className="w-fit">
                <Link href={"#"}>Join Us</Link>
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
            <SponsorList/>
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
            <p className="font-body text-center lg:text-start text-md lg:text-lg">
              TUM Blockchain Club is a legally registered non-profit organization under German law and an officially accredited student club at the 
              Technical University of Munich. Our mission extends beyond academics—we are committed to shaping the future of blockchain 
              technology through impactful education, events, and collaborations. With a strong foundation and serious intent, we aim to leave a 
              lasting mark on the global blockchain ecosystem.
            </p>
          </div>
          <div className="relative w-full h-[720px] mt-20 filter grayscale hover:grayscale-0 transition-all duration-150">
            <Image src="/group_photo.webp" alt="Our group photo" fill className="object-cover"/>
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
              <br/>various aspect of blockchain realm.
            </p>
          </div>
          <div className="w-full h-[500px] mt-20">
            <SlideShow/>
          </div>
        </section>
      </Container>
      <Container asChild className="py-12 mt-12 xl:mt-24">
        <section>
          <div className="flex flex-col gap-4 lg:gap-6">
            <div className="flex">
              <div className="flex flex-col gap-4 lg:gap-6 w-1/2 lg:ps-20">
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
                    <Link href={"#"}>Be a part</Link>
                  </Button>
                </div>
              </div>
              <div className="w-1/2 flex flex-col gap-4 lg:gap-6">
                <div className="flex gap-4 lg:gap-6">
                  <div></div>
                </div>
              </div>
            </div>          
          </div>
        </section>
      </Container>
    </main>
  );
}
