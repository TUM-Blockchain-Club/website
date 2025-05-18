import { Container } from "@/components/container";
import { forwardRef } from "react";
import { Social } from "@/components/social";
import { Button } from "@/components/button";
import { faDiscord, faGithub, faInstagram, faLinkedin, faMedium, faTelegram, faXTwitter } from "@fortawesome/free-brands-svg-icons";
import Link from "next/link";
import classNames from "classnames";

export type FooterElement = React.ComponentRef<"footer">
export type FooterProps = React.ComponentPropsWithoutRef<"footer"> 

export const Footer = forwardRef<FooterElement, FooterProps>((prop, ref) => {
    const { className, ...footerProps } = prop;
    return (
        <footer {...footerProps} className={classNames(className, "bg-accent px-4")} ref={ref}>
            <Container className="flex flex-col justify-between py-4 min-h-[480px] lg:min-h-[360px]">
                <div className="flex flex-col gap-1">
                    <span className="font-heading font-bold text-xl md:text-3xl lg:text-5xl text-white">TUM Blockchain Club <span title="eingetragener Verein" className="cursor-help">e.V.</span></span>
                    <p className="font-body leading-tight text-white">
                        Arcisstraße 21 (c/o AStA)
                        <br />80333 Munich
                        <br />Germany
                    </p>
                    <div className="flex gap-2 mt-4 flex-wrap">
                        <Social icon={faXTwitter} href="https://twitter.com/tbc_munich" title="X (Retarded Twitter)" />
                        <Social icon={faInstagram} href="https://www.instagram.com/tumblockchain/" title="Instagram" />
                        <Social icon={faLinkedin} href="https://www.linkedin.com/company/tum-blockchain-club/" title="LinkedIn" />
                        <Social icon={faDiscord} href="https://discord.gg/7V7KG8SESF" title="Discord" />
                        <Social icon={faTelegram} href="https://t.me/+6SMYu7pub0E1MGUy" title="Telegram" />
                        <Social icon={faGithub} href={"https://github.com/TUM-Blockchain-Club"} title="GitHub" />
                        <Social icon={faMedium} href={"https:/medium.com/@tumblockchainclub"} title="Medium" />
                    </div>
                </div>
                <div className="flex flex-col gap-2">
                    <div className="flex gap-6 font-body text-white">
                        <Button asChild buttonType="link">
                            <Link href="/imprint">Imprint</Link>
                        </Button>
                        <Button asChild buttonType="link">
                            <Link href="https://drive.google.com/file/d/1TcXdGF5jARyVKreqJ4ht3Q2ICGOEuyPt/view">Privacy Policy</Link>
                        </Button>
                        <Button asChild buttonType="link">
                            <Link href="https://forms.tum-blockchain.com/contact">Contact</Link>
                        </Button>
                    </div>
                    <div className="text-white font-body text-sm">
                        Copyright {new Date().getFullYear()} by TUM Blockchain Club
                    </div>
                </div>
            </Container>
        </footer>
    )
})
Footer.displayName = "Footer";