import { Container } from "@/components/container";

export default function AboutUs() {
    return (
        <main>
            <Container asChild className="py-12 mt-12 xl:mt-24">
                <section>
                    <h1>About Us</h1>
                    <p>
                        TUM Blockchain Club is a student-led organization at the Technical University of Munich (TUM) that focuses on blockchain technology and its applications.
                    </p>
                </section>
            </Container>
            <Container asChild className="py-12 mt-12 xl:mt-24">
                <section>
                    <h1>Our Team</h1>
                    <p>
                        We strive to create meaningful and sustainable impact by connecting best-in mind students with 
                        <br/>various aspect of blockchain realm.
                    </p>
                </section>
            </Container>
        </main>
    )
}