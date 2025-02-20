import { Button } from "@/components/button";
import { Container } from "@/components/container";
import { ThreeJSGlobe } from "@/components/globe";
import Link from "next/link";
import { SponsorList } from "./sponsor_list";

export default function Home() {
  return (
    <main>
      <ThreeJSGlobe className="absolute left-0 top-0 mix-blend-screen -translate-y-1/2 -z-10"/>
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
      <Container asChild className="py-12">
        <section>
          
        </section>
      </Container>
    </main>
  );
}
