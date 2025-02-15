import React, { forwardRef, useState } from "react";
import { Button, ButtonProps } from "../button";
import Link from "next/link";
import { Cross1Icon } from "@radix-ui/react-icons";
import classNames from "classnames";

export interface MenuLink extends Pick<ButtonProps, "buttonType"> {
    name: string;
    url: string;
}

export interface MenuProps extends React.ComponentPropsWithoutRef<"div"> {
    menuLinks: MenuLink[];
}

export const FullScreenMenu = forwardRef<HTMLDivElement, MenuProps>((props, ref) => {
    const { menuLinks, className, ...rest } = props;
    const [isOpen, setIsOpen] = useState(false);

    if (!isOpen) return null;

    return (
        <div ref={ref} className={classNames("fixed inset-0 z-50 bg-accent flex justify-center items-center w-screen h-screen", className)} {...rest}>
            <div className="fixed top-0 right-0 m-4 text-foreground">
                <button onClick={() => setIsOpen(false)}>
                    <Cross1Icon />
                </button>
            </div>
            <div className="flex flex-col gap-4 w-48 max-w-4/5 bg-accent">
                {menuLinks.map((link) => (
                    <Button asChild key={link.name} buttonType={link.buttonType}>
                        <Link href={link.url} className={`text-sm w-full`}>{link.name}</Link>
                    </Button>
                ))}
            </div>
        </div>
    );
});
FullScreenMenu.displayName = "FullScreenMenu";

interface HeaderElement extends React.ComponentRef<"header"> { }
export interface HeaderProps extends React.ComponentPropsWithoutRef<"header"> {
    logo?: string;
    menuLinks?: MenuLink[];
}

export const Header = forwardRef<HeaderElement, HeaderProps>(() => {
    return (
        <header>
            
        </header>
    );
});
Header.displayName = "Header";