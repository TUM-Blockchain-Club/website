import Image from "next/image";
import Link from "next/link";

export interface SponsorLogoProps {
    image: string,
    name: string,
    link?: string,
}

export const SponsorLogo: React.FC<SponsorLogoProps> = ({ image, name, link }) => {
    const LogoContent = () => (
        <div className="flex justify-center items-center h-full">
            <div className="relative w-32 h-10 lg:w-36 lg:h-12">
                <Image
                    src={image}
                    alt={name}
                    fill
                    className="object-contain flex justify-content-center transition-all duration-150 opacity-50 hover:opacity-100 filter grayscale hover:grayscale-0"
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