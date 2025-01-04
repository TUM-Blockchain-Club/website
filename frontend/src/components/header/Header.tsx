import React, { forwardRef, useState } from "react";
import { Button, ButtonProps } from "../button";
import Link from "next/link";
import { Cross1Icon, HamburgerMenuIcon } from "@radix-ui/react-icons";
import classNames from "classnames";

export interface MenuLink extends Pick<ButtonProps, "buttonType"> {
    name: string;
    url: string;
}

export interface MenuProps extends React.ComponentPropsWithoutRef<"div"> {
    menuLinks: MenuLink[];
    onClose?: () => void;
}

export const FullScreenMenu = forwardRef<HTMLDivElement, MenuProps>((props, ref) => {
    const { menuLinks, className, onClose, ...rest } = props;

    return (
        <div ref={ref} className={classNames("fixed inset-0 z-50 bg-accent flex justify-center items-center w-screen h-screen", className)} {...rest}>
            <div className="fixed top-0 right-0 m-4 text-foreground">
                <button onClick={onClose}>
                    <Cross1Icon className="w-6 h-6"/>
                </button>
            </div>
            <div className="flex flex-col gap-4 w-48 max-w-4/5 bg-accent">
                {menuLinks.map((link) => (
                    <Button asChild key={link.name} buttonType={link.buttonType}>
                        <Link href={link.url} className={`text-sm w-full`} onClick={onClose}>{link.name}</Link>            
                    </Button>
                ))}
            </div>
        </div>
    );
});
FullScreenMenu.displayName = "FullScreenMenu";

interface HeaderElement extends React.ComponentRef<"header"> {}
export interface HeaderProps extends React.ComponentPropsWithoutRef<"header"> {
    logo?: string;
    menuLinks?: MenuLink[];
}

export const Header = forwardRef<HeaderElement, HeaderProps>((props, ref) => {
    const { logo, menuLinks = [], className, ...rest } = props;
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    return (
        <header 
            ref={ref} 
            className={classNames(
                "w-full relative",
                "dark:bg-header-gradient fixed md:top-0 md:left-0 md:right-0",
                "md:py-4",
                className
            )} 
            {...rest}
        >
            <div className="max-w-5xl mx-auto px-4 py-4 flex justify-between items-center">
                {logo && (
                    <Link href="/" className="flex items-center">
                        <img src={logo} alt="Logo" className="h-8" />
                    </Link>
                )}
                {!logo && (
                    <h1 className="text-heading text-foreground font-bold"> 
                        TUM Blockchain Club
                    </h1>
                )}
                
                {/* Mobile menu button */}
                <button 
                    className="md:hidden text-foreground"
                    onClick={() => setIsMobileMenuOpen(true)}
                >
                    <HamburgerMenuIcon className="w-6 h-6" />
                </button>

                {/* Desktop navigation */}
                <nav className="hidden md:flex items-center gap-12">
                    {menuLinks.map((link) => (
                        <Button
                            key={link.name}
                            buttonType={link.buttonType || "link"}
                            asChild
                        >
                            <Link href={link.url} className="text-sm">
                                {link.name}
                            </Link>
                        </Button>
                    ))}
                </nav>

                {/* Mobile menu */}
                {isMobileMenuOpen && (
                    <FullScreenMenu 
                        menuLinks={menuLinks} 
                        className="md:hidden"
                        onClose={() => setIsMobileMenuOpen(false)}
                    />
                )}
            </div>
        </header>
    );
});
Header.displayName = "Header";