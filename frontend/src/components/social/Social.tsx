import Link, { LinkProps } from "next/link";
import { forwardRef } from "react";
import classNames from "classnames";
import { FontAwesomeIcon, FontAwesomeIconProps } from "@fortawesome/react-fontawesome";
import { icon } from "@fortawesome/fontawesome-svg-core";

export interface SocialProps extends Pick<LinkProps, "href">, Pick<FontAwesomeIconProps, "icon"> {
    title?: string
    className?: string
}

export const Social = forwardRef<HTMLAnchorElement, SocialProps>(
    ({ href, icon, title, className }, ref) => {
        return (
            <Link
                href={href}
                ref={ref}
                target="_blank"
                rel="noopener noreferrer"
                title={title}
                className={classNames(
                    "inline-flex items-center justify-center w-10 h-10 rounded-full duration-150 transition-all",
                    "bg-white text-accent hover:bg-violet-100",
                    "transition-colors duration-200",
                    className
                )}
            >
                <FontAwesomeIcon icon={icon}/>
            </Link>
        );
    }
);
Social.displayName = "Social";