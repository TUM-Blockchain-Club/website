import { Container } from "@/components/container";
import Link from "next/link";
import { Button } from "@/components/button";

export default function InfoEventPage() {
    return (
      <Container asChild className="pt-[200px] relative text-foreground flex flex-col">
        <section>
          <div className="flex flex-col items-center gap-4 lg:gap-6 text-center">
            <p className="text-sm text-accent font-heading font-bold uppercase tracking-wide">
              Online Info Event
            </p>
            <h1 className="text-4xl lg:text-[64px] font-heading font-bold leading-tight">
              Coming Soon
            </h1>
            <p className="text-white text-md lg:text-lg font-body tracking-wide">
              Registration coming soon! Check again in a day!
            </p>
            <Button asChild buttonType="cta" className="px-8 py-4 text-xl justify-center mt-4">
              <Link href="/membership">Back to Membership</Link>
            </Button>
          </div>
        </section>
      </Container>
    );
}
