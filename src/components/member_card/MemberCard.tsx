import React from "react";
import { Member } from "@/service/memberStrapi";
import Image from "next/image";
import Link from "next/link";
import * as Avatar from "@radix-ui/react-avatar";
import { faGithub, faLinkedin, faXTwitter, faFacebook, faInstagram, faYoutube, faTiktok } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon, FontAwesomeIconProps } from "@fortawesome/react-fontawesome";
import classNames from "classnames";
import { cva } from "class-variance-authority";

export interface MemberCardProps {
    member: Member;
}

const getInitials = (name: string): string => {
    const names = name.trim().split(' ');
    if (names.length === 1) return names[0].charAt(0).toUpperCase();
    return (names[0].charAt(0) + names[names.length - 1].charAt(0)).toUpperCase();
};

const socialMediaIcons : Record<string, FontAwesomeIconProps["icon"]> = {
    github: faGithub,
    linkedin: faLinkedin,
    twitter: faXTwitter,
    x: faXTwitter,
    'x (twitter)': faXTwitter,
    facebook: faFacebook,
    instagram: faInstagram,
    youtube: faYoutube,
    tiktok: faTiktok,
}

const ribbonVariants = cva("", {
    variants: {
        backgroundColor: {
            blue: "bg-blue-600",
            green: "bg-green-600",
            yellow: "bg-yellow-600",
        },
        borderColor: {
            blue: "border-blue-600",
            green: "border-green-600",
            yellow: "border-yellow-600",
        }
    }
})

interface RibbonProps {
    text: string;
    color: "blue" | "green" | "yellow";
}   

const Ribbon = React.forwardRef<HTMLDivElement, RibbonProps>(({ text, color }, ref) => {
    return (
        <div className={classNames(`relative text-foreground px-2 py-0.5 text-sm text-end w-fit overflow-visible`, ribbonVariants({ backgroundColor: color, borderColor: color }))} ref={ref}>
            <div className="relative z-10">{text}</div>
            <div className={`absolute -left-2 top-0 w-2 h-full bg-transparent`}>
                {/* Top triangle */}
                <div className={classNames(`absolute bottom-0 left-0 w-[10px] h-1/2 border-r-[10px] border-t-[10px] border-t-transparent`, ribbonVariants({ borderColor: color }))}></div>
                {/* Bottom triangle */}
                <div className={classNames(`absolute top-0 left-0 w-[10px] h-1/2¥ border-r-[10px] border-b-[10px] border-b-transparent`, ribbonVariants({ borderColor: color }))}></div>
            </div>
        </div>
    )
})
Ribbon.displayName = "Ribbon";

export const MemberCard = React.forwardRef<HTMLDivElement, MemberCardProps>(({ member }, ref) => {
    return (
        <div className="flex flex-row lg:flex-col items-center w-64 lg:w-60 h-auto lg:h-96 relative lg:opacity-60 hover:opacity-100 lg:scale-95 hover:scale-100 transition-all duration-200 font-body text-foreground ease-in-out border p-4 rounded-xl lg:pt-16 before:none lg:before:content-[''] lg:before:absolute lg:before:top-4 lg:before:left-1/2 lg:before:w-10 lg:before:h-2 lg:before:bg-background lg:before:border lg:before:rounded-full lg:before:scale-x-[-1] lg:before:scale-y-100 lg:before:translate-x-[-50%] lg:before:translate-y-[-50%] lg:before:z-[-1] gap-6" ref={ref}>
            {/* Ribbons */}
            <div className="absolute top-3 right-0 flex flex-col gap-1 items-end justify-end">
            </div>
            
            {/* Left column for mobile (Avatar) */}
            <div className="flex-shrink-0">
                <Avatar.Root className="w-20 h-20 lg:w-36 lg:h-36 rounded-full border flex items-center justify-center relative">
                    {member.profile_picture && 
                        <Avatar.Image asChild src={member.profile_picture.url} alt={member.name}>
                            <Image src={member.profile_picture.url} alt={member.name} fill sizes="(max-width: 124px), (max-height: 124px)" className="object-cover rounded-full" />
                        </Avatar.Image>
                    }
                    <Avatar.Fallback className="text-xl lg:text-3xl font-bold">{getInitials(member.name)}</Avatar.Fallback>
                </Avatar.Root>
            </div>
            
            {/* Right column for mobile (Name, Position, Social) */}
            <div className="flex flex-col justify-between h-full w-full lg:w-auto lg:items-center">
                {/* Name and Position section */}
                <div className="flex flex-col lg:items-center justify-center">
                    <h1 className="text-lg lg:text-xl font-bold lg:text-center">{member.name}</h1>
                    <h2 className="text-sm lg:text-md text-gray-500 lg:text-center">{member.departments?.map(department => department.short_name ?? department.name).join(', ')}</h2>
                </div>
                
                {/* Social Media Links */}
                <div className="flex items-center mt-4 lg:mt-0 justify-start lg:justify-center gap-2">
                    {member.social_media?.filter(social => social.platform !== null && socialMediaIcons[social.platform!.toLowerCase()] !== undefined).slice(0, 3).map(social => (
                        <Link href={social.link} key={social.id} target="_blank" rel="noopener noreferrer" className="text-foreground border rounded-full p-2 lg:p-3 w-8 h-8 lg:w-10 lg:h-10 flex items-center justify-center hover:bg-accent hover:text-white transition-all duration-300">
                            <FontAwesomeIcon icon={socialMediaIcons[social.platform!.toLowerCase()]} />
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    )
})
MemberCard.displayName = "MemberCard";