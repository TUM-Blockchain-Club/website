import Image from "next/image";
import { StaticImageData } from "next/image";
import Link from "next/link";

export interface SponsorLogoProps {
    image: string,
    name: string,
    link?: string,
}

export const SponsorLogo: React.FC<SponsorLogoProps> = ({ image, name, link }) => {
    const LogoContent = () => (
        <div className="relative border border-accent">
            <div className="w-full aspect-video  transition-all duration-300 opacity-50 hover:opacity-100">
                <Image
                    src={image}
                    alt={name}
                    fill
                    className="px-8 py-6 object-contain"
                />
            </div>
        </div>
    );

    return link ? (
        <Link href={link} target="_blank" rel="noopener noreferrer" title={name}>
            <LogoContent />
        </Link>
    ) : (
        <LogoContent />
    );
}