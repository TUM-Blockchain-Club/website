import React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, VariantProps } from "class-variance-authority";
import classNames from "classnames";

import "./button.css";

const buttonVariants = cva(
  "button font-sans flex justify-center items-center gap-2 transition-all duration-200 ",
  {
    variants: {
      buttonType: {
        cta: "tbc-button-cta",
        primary: "tbc-button-primary",
        secondary: "tbc-button-secondary",
        link: "tbc-button-link",
      },
    },
    defaultVariants: {
      buttonType: "primary",
    },
  },
);
type ButtonVariantProps = VariantProps<typeof buttonVariants>;

type ButtonElement = React.ComponentRef<"button">;
export interface ButtonProps
  extends React.ComponentPropsWithoutRef<"button">,
    ButtonVariantProps {
  asChild?: undefined | true;
  Icon?: React.ComponentType;
}

export const Button = React.forwardRef<ButtonElement, ButtonProps>(
  (props, ref) => {
    const { asChild, buttonType, disabled, className, children, Icon, ...buttonProps } = props;

    const content = asChild ? children : <>{children} {Icon && <Icon />}</>;

    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        data-disabled={disabled || undefined}
        {...buttonProps}
        disabled={disabled}
        className={buttonVariants({
          className: classNames(className, {
            "opacity-50 cursor-not-allowed": disabled,
            "with-icon": Boolean(Icon),
          }),
          buttonType,
        })}
        ref={ref}
      >
        {content}
      </Comp>
    );
  },
);
Button.displayName = "Button";