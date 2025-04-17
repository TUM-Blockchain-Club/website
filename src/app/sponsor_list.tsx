"use client"

import { SponsorLogo, SponsorLogoProps } from "@/components/sponsors_logo"

// Must be exactly 10 sponsors
const sponsors: SponsorLogoProps[] = [
    {
        image: "/sui_logo.svg",
        name: "Sui",
        link: "https://sui.io"
    },
    {
        image: "/1inch_logo.png",
        name: "1inch",
        link: "https://1inch.io"
    },
    {
        image: "/filecoin_foundation_logo.png",
        name: "Filecoin Foundation",
        link: "https://fil.org"
    },
    {
        image: "/polkadot_logo.png",
        name: "Polkadot",
        link: "https://polkadot.com"
    },
    {
        image: "/superteam_germany_logo.svg",
        name: "Superteam Germany",
        link: "https://de.superteam.fun"
    },
    {
        image: "/stacking_facility_logo.svg",
        name: "Stacking Facility",
        link: "https://stakingfacilities.com"
    },
    {
        image: "/internet_comp_logo.svg",
        name: "Internet Computer",
        link: "https://internetcomputer.org"
    },
    {
        image: "/wormhole_logo.svg",
        name: "Wormhole",
        link: "https://wormhole.com"
    },
    {
        image: "/scroll_logo.svg",
        name: "Scroll",
        link: "https://scroll.io"
    },
    {
        image: "/solana_logo.svg",
        name: "Solana",
        link: "https://solana.com"
    }
]

const SponsorListLarge = () => {
    // Sort the sponsors by name
    sponsors.sort((a, b) => a.name.localeCompare(b.name));

    return (
        <div className="flex flex-col w-full py-5 gap-10">
            <div className="flex w-full justify-between">
                {sponsors.slice(0, 5).map((sponsor) => (
                    <SponsorLogo
                        key={sponsor.name}
                        image={sponsor.image}
                        name={sponsor.name}
                        link={sponsor.link}
                    />
                ))}
            </div>
            <div className="flex w-full justify-between">
                {sponsors.slice(5, 10).map((sponsor) => (
                    <SponsorLogo
                        key={sponsor.name}
                        image={sponsor.image}
                        name={sponsor.name}
                        link={sponsor.link}
                    />
                ))}
            </div>
        </div>
    )
}

const SponsorListMobile = () => {
    // Sort the sponsors by name
    sponsors.sort((a, b) => a.name.localeCompare(b.name));

    return (
        <div className="flex flex-col w-full py-5 gap-12">
            {[0, 2, 4, 6, 8].map((index) => (
                <div key={index} className="flex w-full gap-12 justify-center">
                    {sponsors.slice(index, index + 2).map((sponsor) => (
                        <SponsorLogo
                            key={sponsor.name}
                            image={sponsor.image}
                            name={sponsor.name}
                            link={sponsor.link}
                        />
                    ))}
                </div>
            ))}
        </div>
    )
}

export const SponsorList = () => {

    return (
        <>
            <div className="hidden lg:block">
                <SponsorListLarge/>
            </div>
            <div className="lg:hidden">
                <SponsorListMobile/>
            </div>
        </>
    )
}