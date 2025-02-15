import { Button } from "@/components/button";
import { Container } from "@/components/container";
import { ThreeJSGlobe } from "@/components/globe";
import { ChevronRightIcon } from "@radix-ui/react-icons";
import Link from "next/link";

export default function Home() {
  return (
    <main>
      <ThreeJSGlobe className="absolute left-0 top-0 mix-blend-screen -translate-y-1/2 -z-10 translate-x-1/2" height={1000} width={1000}/>
      <Container asChild className="min-h-[75vh] pt-96 lg:pt-80 relative text-foreground">
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
        </section>
      </Container>
      <Container asChild className="py-12">
        <section>
          <div className="flex flex-row">
            <h3 className="text-accent uppercase font-heading font-bold tracking-widest text-sm text-center lg:text-start">Collaborated with</h3>
            <div className="grid grid-flow-row grid-cols-2 lg:grid-cols-5">
              <div></div>
            </div>
          </div>
        </section>
      </Container>
    </main>
  );
}
