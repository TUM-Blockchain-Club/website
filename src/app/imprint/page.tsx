import { Container } from "@/components/container";

export default function Imprint() {
    return (
        <div>
            <Container asChild className="pt-[200px] relative text-foreground flex flex-col">
                <section>
                    <div className="flex flex-col gap-8 lg:gap-12">
                        <h1 className="text-4xl text-left lg:text-start lg:text-[64px] font-heading font-bold leading-tight">
                            Imprint
                        </h1>
                        
                        <div className="flex flex-col gap-1 lg:gap-2">
                            <h2 className="font-heading text-2xl font-bold">Information in accordance with § 5 DDG</h2>
                            <p className="font-body text-left lg:text-start text-md lg:text-lg">
                                TUM Blockchain Club e.V.<br />
                                Arcisstraße 21<br />
                                80333 Munich<br />
                                Germany
                            </p>
                        </div>
                        
                        <div className="flex flex-col gap-1 lg:gap-2">
                            <h2 className="font-heading text-2xl font-bold">Contact</h2>
                            <p className="font-body text-left lg:text-start text-md lg:text-lg">
                                info@tum-blockchain.com
                            </p>
                        </div>
                        
                        <div className="flex flex-col gap-1 lg:gap-2">
                            <h2 className="font-heading text-2xl font-bold">Represented by</h2>
                            <ul className="list-disc pl-6 font-body text-left lg:text-start text-md lg:text-lg">
                                <li>Yudhistira Arief Wibowo (IT and Development)</li>
                                <li>Rami Ezzeddine (Legal and Finance)</li>
                                <li>Tobias Kotzian (Public Relations)</li>
                                <li>Gopi Mehta (Education)</li>
                                <li>Eva Freiberger (Marketing)</li>
                                <li>Salan Isaqzoi (Community and Human Resources)</li>
                                <li>Ayşenur Özbek (Events)</li>
                            </ul>
                        </div>
                        
                        <div className="flex flex-col gap-1 lg:gap-2">
                            <h2 className="font-heading text-2xl font-bold">Registry Entry</h2>
                            <p className="font-body text-left lg:text-start text-md lg:text-lg">
                                Register court: München<br />
                                Register number: VR210111<br />
                                VAT-ID in accordance with § 27a UStG: DE365534593
                            </p>
                        </div>
                        
                        <div className="flex flex-col gap-1 lg:gap-2">
                            <h2 className="font-heading text-2xl font-bold">Donations</h2>
                            <p className="font-body text-left lg:text-start text-md lg:text-lg">
                                We have Non-profit status and can issue donation receipts. We promote the following charitable purposes:
                            </p>
                            <ul className="list-disc pl-6 font-body text-left lg:text-start text-md lg:text-lg">
                                <li>Promotion of science and research</li>
                                <li>Promotion of student aid</li>
                            </ul>
                        </div>
                        
                        <div className="flex flex-col gap-1 lg:gap-2">
                            <h2 className="font-heading text-2xl font-bold">Bank Account Details</h2>
                            <p className="font-body text-left lg:text-start text-md lg:text-lg">
                                Recipient: TUM Blockchain Club e.V.<br />
                                IBAN: DE34 7025 0150 0023 1659 47<br />
                                SWIFT/BIC: BYLADEM1KMS<br />
                                Bank: Kreissparkasse München Starnberg Ebersberg<br />
                                Reference: Donation
                            </p>
                        </div>
                        
                        <div className="flex flex-col gap-1 lg:gap-2">
                            <h2 className="font-heading text-2xl font-bold">Disclaimer</h2>
                            
                            <div className="flex flex-col gap-1">
                                <h3 className="font-heading text-xl font-bold">Liability for Content</h3>
                                <p className="font-body text-left lg:text-start text-md lg:text-lg">
                                    The content of our pages was created with the utmost care. However, we cannot take over any guarantee for the correctness, completeness, and actuality of the content. According to § 7 Abs.1 TMG, as a service provider, we are responsible for our own content on these pages in accordance with general laws. According to §§ 8 to 10 TMG, however, we are not obliged to monitor transmitted or stored third-party information or to investigate circumstances that indicate illegal activity. Obligations to remove or block the use of information in accordance with general laws remain unaffected by this. However, liability in this respect is only possible starting from the time of knowledge of a concrete violation of the law. As soon as we become aware of such infringements, we will remove these contents immediately.
                                </p>
                            </div>
                            
                            <div className="flex flex-col gap-1 mt-4">
                                <h3 className="font-heading text-xl font-bold">Liability for Links</h3>
                                <p className="font-body text-left lg:text-start text-md lg:text-lg">
                                    Our website contains links to third-party websites over whose content we have no control. Therefore, we cannot take any responsibility for those external contents. The respective provider or operator of the websites is always responsible for its content. The linked websites were checked for possible legal infringements at the time of the linking. Illegal contents were not identifiable at the time of the linking. However, permanent control of the content of the linked websites is not reasonable without concrete evidence of an infringement. We will remove such links immediately upon becoming aware of any violations of the law.
                                </p>
                            </div>
                            
                            <div className="flex flex-col gap-1 mt-4">
                                <h3 className="font-heading text-xl font-bold">Copyright</h3>
                                <p className="font-body text-left lg:text-start text-md lg:text-lg">
                                    The content and works on this website created by the site operators are subject to German copyright law. Duplication, processing, distribution, and any form of commercialization of such material beyond the scope of the copyright law shall require the prior written consent of its respective author or creator. Downloads and copies of this website are only permitted for private, non-commercial use. Insofar as the content on this website was not created by the operator, the copyrights of third parties are respected. In particular, the contents of third parties are marked as such. Should you become aware of a copyright infringement, please inform us about it. As soon as we become aware of any law infringements, we will remove such content immediately.
                                </p>
                            </div>
                            
                            <div className="flex flex-col gap-1 mt-4">
                                <h3 className="font-heading text-xl font-bold">Privacy</h3>
                                <p className="font-body text-left lg:text-start text-md lg:text-lg">
                                    The use of our website is generally possible without providing personal data. If personal data (e.g., name, address, or e-mail address) is collected on our website, this is always done voluntarily to the extent possible. This data will not be passed on to third parties without your explicit consent. We would like to point out that data transmission over the Internet (e.g., communication by e-mail) can be subject to security vulnerabilities. Complete protection of the data against access by third parties is not possible. Using published postal addresses, telephone or fax numbers, and email addresses for marketing purposes is prohibited. The operators of this website explicitly reserve the right to take legal action against unsolicited mailing or e-mailing of spam and other similar advertising materials.
                                </p>
                            </div>
                        </div>
                    </div>
                </section>
            </Container>
        </div>
    )
}