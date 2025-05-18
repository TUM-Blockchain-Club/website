import { Container } from "@/components/container";
import Image from 'next/image';
import  MembershipInfo from "./info/info";
import FAQ from "./faq/faq";
// import ContactPage from "./contact/contact_page";

import { Button } from "@/components/button";


export default async function MembershipPage() {
    return (
      <div>
        {/* <TeamConstellation className="absolute left-1/2 pt-[0px] -translate-x-1/2 -translate-y-1/4 mix-blend-screen -z-0" /> */}
        <Container asChild className="pt-[200px] lg:mb-12 relative text-foreground flex flex-col">
          <section>
            <div className="flex flex-col gap-4 lg:gap-2">
              <h1 className="text-4xl text-center lg:text-center lg:text-[64px] font-heading font-bold leading-tight">
                Become a Member
              </h1>
              <p className="text-white text-md lg:text-lg text-center font-body tracking-wide">
              Our membership is open to all university students in Munich!
            </p>
            <div className="relative pb-12 w-full h-[450px] hidden lg:block mt-8 filter grayscale hover:grayscale-0 transition-all duration-150">
            <Image
                src={"/membership.png"}
                alt="text" 
                fill
                className="object-cover mx-auto" />
            </div>
            <div className="elative mb-12 w-full lg:hidden h-[160px] filter grayscale hover:grayscale-0 transition-all duration-150">
            <Image
                src={"/membership.png"}
                alt="text" 
                fill
                className="object-cover mx-auto" />
            </div>
            </div>
          </section>
        </Container>
        <Button buttonType="cta" className="px-8 py-4 text-xl justify-center mx-auto">
            APPLY NOW
        </Button>
        <Container asChild className="py-0 mt-0 xl:mt-24">
          <section>
            <MembershipInfo />
          </section>
        </Container>
        <Container asChild className="py-0 mt-12 xl:mt-24">
          <section>
            <FAQ/>
          </section>
        </Container>
        {/* <Container asChild className="py-0 mt-12 xl:mt-24">
          <section>
            <ContactPage/>
          </section>
        </Container> */}
      </div>
    );
  }