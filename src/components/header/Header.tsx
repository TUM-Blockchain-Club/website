import React, { ComponentProps, forwardRef, useState, useEffect } from "react";
import { Button, ButtonProps } from "../button";
import Link from "next/link";
import { Cross1Icon, HamburgerMenuIcon } from "@radix-ui/react-icons";
import classNames from "classnames";
import Image from "next/image";
import "./Header.css";

export interface MenuLink extends Pick<ButtonProps, "buttonType">, Pick<ComponentProps<"a">, "target"> {
    name: string;
    url: string;
}

export interface MenuProps extends React.ComponentPropsWithoutRef<"div"> {
    menuLinks: MenuLink[];
}

export const FullScreenMenu = forwardRef<HTMLDivElement, MenuProps>((props, ref) => {
    const { menuLinks, className, ...rest } = props;
    const [isOpen, setIsOpen] = useState(false);

    if (!isOpen) {
        return (
            <button 
                onClick={() => setIsOpen(true)}
                className="lg:hidden text-foreground p-2"
                aria-label="Open menu"
            >
                <HamburgerMenuIcon />
            </button>
        );
    }

    return (
        <div ref={ref} className={classNames("fixed inset-0 z-50 bg-accent flex justify-center items-center w-screen h-screen", className)} {...rest}>
            <div className="fixed top-0 right-0 mt-[35px] me-4 text-foreground">
                <button onClick={() => setIsOpen(false)}
                    aria-label="Close menu"
                    className="p-2">
                    <Cross1Icon />
                </button>
            </div>
            <div className="flex flex-col gap-4 w-48 max-w-4/5 bg-accent">
                {menuLinks.map((link) => (
                    <Button asChild key={link.name} buttonType={link.buttonType}>
                        <Link href={link.url} className={`text-sm w-full`} target={link.target}>{link.name}</Link>
                    </Button>
                ))}
            </div>
        </div>
    );
});
FullScreenMenu.displayName = "FullScreenMenu";

export type HeaderElement = React.ComponentRef<"header">;
export interface HeaderProps extends React.ComponentPropsWithoutRef<"header"> {
    logo?: string;
    menuLinks?: MenuLink[];
}

export const Header = forwardRef<HeaderElement, HeaderProps>((props, ref) => {
    const { logo, menuLinks = [], className, ...rest } = props;

    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {

            // If we're scrolling down (currentScrollY > lastScrollY) then add padding.
            // If we're scrolling up (currentScrollY <= lastScrollY), remove padding.
            if (window.scrollY < 0) {
                setScrolled(true);
            } else {
                setScrolled(false);
            }

        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <header 
            ref={ref} 
            className={classNames(
                "web-header z-20 fixed w-screen",
                { 'pt-[35px]': scrolled, 'pt-[60px]': !scrolled },
                className
            )}
            {...rest}
        >
            <div className="container mx-auto lg:-translate-x-2 max-w-5xl flex items-center justify-between px-4 lg:px-0">
                {/* Logo */}
                <Link href="/" className="font-bold text-xl w-36 h-12 relative">
                    <Image src={logo ?? ""} alt="TUM Blockchain Club" fill className="object-contain"/>
                </Link>

                {/* Desktop Menu */}
                <nav className="hidden lg:flex gap-6 items-center">
                    {menuLinks.map((link) => (
                        <Button 
                            key={link.name} 
                            buttonType={link.buttonType} 
                            asChild
                        >
                            <Link href={link.url} target={link.target}>
                                {link.name}
                            </Link>
                        </Button>
                    ))}
                </nav>

                {/* Mobile Menu */}
                <div className="lg:hidden">
                    <FullScreenMenu menuLinks={menuLinks} />
                </div>
            </div>
        </header>
    );
});
Header.displayName = "Header";