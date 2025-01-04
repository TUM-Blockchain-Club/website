import { forwardRef } from "react";
import { Slot } from "@radix-ui/react-slot";
import classNames from "classnames";

export interface ContainerProps {
  children?: React.ReactNode;
  asChild?: boolean;
  className?: string;
}

export const Container = forwardRef<HTMLDivElement, ContainerProps>(
  ({ children, asChild = false, className = "" }, ref) => {
    const Comp = asChild ? Slot : "div";

    return (
      <Comp
        ref={ref}
        className={classNames(
          "mx-auto max-w-5xl",
          "lg:overflow-visible overflow-hidden",
          className
        )}
      >
        {children}
      </Comp>
    );
  }
);

Container.displayName = "Container";